---
title: Protokół modemu KISS
description: Protokół modemu KISS MeshCore: konfiguracja portu szeregowego, format ramek, standardowe polecenia TNC oraz sterowanie radiem przez SetHardware.
order: 5
sourceUrl: https://docs.meshcore.io/kiss_modem_protocol
createdAt: 22.08.2026
updatedAt: 10.11.2026
---

# Protokół modemu KISS MeshCore

Firmware TNC KISS pozwala wysyłać i odbierać surowe pakiety przez radio LoRa MeshCore. Współpracuje z klientami KISS, takimi jak Direwolf, APRSdroid i YAAC. Funkcje MeshCore, w tym kryptografia, konfiguracja radia i telemetria, są dostępne przez polecenie SetHardware (`0x06`).

## Konfiguracja portu szeregowego

115200 baud, 8N1, bez kontroli przepływu.

## Format ramki

Standardowe ramkowanie KISS zgodnie ze specyfikacją KA9Q/K3MC.

| Bajt   | Nazwa | Opis                                  |
|--------|-------|---------------------------------------|
| `0xC0` | FEND  | Ogranicznik ramki                     |
| `0xDB` | FESC  | Znak ucieczki (escape)                |
| `0xDC` | TFEND | Zakodowany FEND (FESC + TFEND = 0xC0) |
| `0xDD` | TFESC | Zakodowany FESC (FESC + TFESC = 0xDB) |

| FEND | Type Byte | Data (escaped) | FEND |
|------|-----------|----------------|------|
| 0xC0 | 1 byte    | 0-511 bytes    | 0xC0 |

### Bajt typu (Type Byte)

Bajt typu składa się z dwóch 4-bitowych części (nibble):

| Bity | Pole    | Opis                                   |
|------|---------|----------------------------------------|
| 7-4  | Port    | Numer portu (0 dla TNC jednoportowego) |
| 3-0  | Command | Numer polecenia                        |

Bufor odbiorczy mieści 512 bajtów po usunięciu kodowania escape, w tym bajt typu. Dla polecenia Data obowiązuje dodatkowy limit 255 bajtów danych.

## Standardowe polecenia KISS

### Host do TNC

| Polecenie   | Wartość | Dane                | Opis                                                                       |
|-------------|---------|---------------------|----------------------------------------------------------------------------|
| Data        | `0x00`  | Surowy pakiet       | Kolejkuje pakiet do transmisji                                             |
| TXDELAY     | `0x01`  | Opóźnienie (1 bajt) | Opóźnienie załączenia nadajnika w jednostkach 10ms (domyślnie: 50 = 500ms) |
| Persistence | `0x02`  | P (1 bajt)          | Parametr trwałości CSMA 0-255 (domyślnie: 63)                              |
| SlotTime    | `0x03`  | Interwał (1 bajt)   | Interwał slotu CSMA w jednostkach 10ms (domyślnie: 10 = 100ms)             |
| TXtail      | `0x04`  | Opóźnienie (1 bajt) | Parametr TXtail (domyślnie 0); obecny kod zapisuje go, ale nie stosuje przy nadawaniu          |
| FullDuplex  | `0x05`  | Tryb (1 bajt)       | 0 = half duplex, wartość niezerowa = full duplex (domyślnie: 0)            |
| SetHardware | `0x06`  | Subpolecenie + dane | Rozszerzenia MeshCore (patrz poniżej)                                      |
| Return      | `0xFF`  | -                   | Wyjście z trybu KISS (bez efektu)                                          |

### TNC do hosta

| Typ  | Wartość | Dane          | Opis                    |
|------|---------|---------------|-------------------------|
| Data | `0x00`  | Surowy pakiet | Pakiet odebrany z radia |

Ramki Data przenoszą surowe dane pakietu bez poprzedzających je metadanych. Payload może mieć najwyżej 255 bajtów, zgodnie z limitem MeshCore (`MAX_TRANS_UNIT`). Większe ramki są odrzucane bez powiadomienia. Specyfikacja KISS zaleca obsługę co najmniej 1024 bajtów w modemach TNC ogólnego przeznaczenia. Ten modem obsługuje wyłącznie pakiety MeshCore, dla których MTU wynosi 255 bajtów.

### Oczekiwanie na zakończenie transmisji

Jednocześnie tylko jeden pakiet może oczekiwać na zakończenie transmisji radiowej. Jeśli host wyśle kolejną ramkę Data wcześniej, modem odpowie ramką Error (`0xF1`) z kodem TxBusy (`0x07`).

### Kolejka danych wysyłanych do hosta

Modem zapisuje zakodowane ramki w kolejce mieszczącej dwie pozycje i wysyła je, gdy bufor portu szeregowego ma wolne miejsce. Funkcja `loop()` nie czeka na zakończenie zapisu, więc transmisja radiowa nie zależy od szybkości odczytu po stronie hosta. Powiadomienie TxDone jest przechowywane do czasu umieszczenia w kolejce. Gdy kolejka jest pełna, modem zgłasza Error (`0xF1`) z kodem TxBusy (`0x07`). Host powinien na bieżąco odczytywać port, aby nie opóźniać odpowiedzi.

### Dostęp do kanału (CSMA)

W trybie half-duplex TNC korzysta z algorytmu p-persistent CSMA:

1. Po zakolejkowaniu pakietu TNC sprawdza, czy kanał jest wolny.
2. Gdy kanał się zwolni, losuje wartość od 0 do 255.
3. Jeśli wartość jest mniejsza lub równa P (Persistence), czeka przez TXDELAY i rozpoczyna nadawanie.
4. W przeciwnym razie czeka przez SlotTime i wraca do kroku 1.

W trybie full-duplex CSMA jest pomijane, a pakiety są transmitowane po TXDELAY.

## Rozszerzenia SetHardware (0x06)

Funkcje MeshCore są dostępne przez standardowe polecenie KISS SetHardware. Pierwszy bajt jego danych określa subpolecenie. Klienci KISS bez obsługi tych rozszerzeń ignorują takie ramki.

### Format ramki

| FEND | 0x06 | Sub-command | Data (escaped) | FEND |
|------|------|-------------|-----------------|------|
| 0xC0 | | 1 byte | variable | 0xC0 |

### Subpolecenia żądań (Host do TNC)

| Subpolecenie    | Wartość | Dane                                                      |
|-----------------|---------|-----------------------------------------------------------|
| GetIdentity     | `0x01`  | -                                                         |
| GetRandom       | `0x02`  | Długość (1 bajt, 1-64)                                    |
| VerifySignature | `0x03`  | PubKey (32) + podpis (64) + dane                          |
| SignData        | `0x04`  | Dane do podpisania                                        |
| EncryptData     | `0x05`  | Klucz (32) + tekst jawny                                  |
| DecryptData     | `0x06`  | Klucz (32) + MAC (2) + szyfrogram                         |
| KeyExchange     | `0x07`  | Zdalny PubKey (32)                                        |
| Hash            | `0x08`  | Dane do zahaszowania                                      |
| SetRadio        | `0x09`  | Freq (4) + BW (4) + SF (1) + CR (1)                       |
| SetTxPower      | `0x0A`  | Moc w dBm (1)                                             |
| GetRadio        | `0x0B`  | -                                                         |
| GetTxPower      | `0x0C`  | -                                                         |
| GetCurrentRssi  | `0x0D`  | -                                                         |
| IsChannelBusy   | `0x0E`  | -                                                         |
| GetAirtime      | `0x0F`  | Długość pakietu (1)                                       |
| GetNoiseFloor   | `0x10`  | -                                                         |
| GetVersion      | `0x11`  | -                                                         |
| GetStats        | `0x12`  | -                                                         |
| GetBattery      | `0x13`  | -                                                         |
| GetMCUTemp      | `0x14`  | -                                                         |
| GetSensors      | `0x15`  | Uprawnienia (1)                                           |
| GetDeviceName   | `0x16`  | -                                                         |
| Ping            | `0x17`  | -                                                         |
| Reboot          | `0x18`  | -                                                         |
| SetSignalReport | `0x19`  | Włączenie (1): 0x00=wyłączone, wartość niezerowa=włączone |
| GetSignalReport | `0x1A`  | -                                                         |

### Subpolecenia odpowiedzi (TNC do hosta)

Kod odpowiedzi powstaje przez ustawienie najstarszego bitu kodu polecenia: `response = command | 0x80`. Odpowiedzi ogólne i niewywołane żądaniem używają zakresu `0xF0`+.

| Subpolecenie | Wartość | Dane                                           |
|--------------|---------|------------------------------------------------|
| Identity     | `0x81`  | PubKey (32)                                    |
| Random       | `0x82`  | Losowe bajty (1-64)                            |
| Verify       | `0x83`  | Wynik (1): 0x00=nieprawidłowy, 0x01=prawidłowy |
| Signature    | `0x84`  | Podpis (64)                                    |
| Encrypted    | `0x85`  | MAC (2) + szyfrogram                           |
| Decrypted    | `0x86`  | Tekst jawny                                    |
| SharedSecret | `0x87`  | Wspólny sekret (32)                            |
| Hash         | `0x88`  | Hash SHA-256 (32)                              |
| Radio        | `0x8B`  | Freq (4) + BW (4) + SF (1) + CR (1)            |
| TxPower      | `0x8C`  | Moc w dBm (1)                                  |
| CurrentRssi  | `0x8D`  | RSSI w dBm (1, ze znakiem)                     |
| ChannelBusy  | `0x8E`  | Wynik (1): 0x00=wolny, 0x01=zajęty             |
| Airtime      | `0x8F`  | Milisekundy (4)                                |
| NoiseFloor   | `0x90`  | dBm (2, ze znakiem)                            |
| Version      | `0x91`  | Wersja (1) + zarezerwowane (1)                 |
| Stats        | `0x92`  | RX (4) + TX (4) + błędy (4)                    |
| Battery      | `0x93`  | Miliwolty (2)                                  |
| MCUTemp      | `0x94`  | Temperatura (2, ze znakiem)                    |
| Sensors      | `0x95`  | Payload CayenneLPP                             |
| DeviceName   | `0x96`  | Nazwa (zmienna długość, UTF-8)                 |
| Pong         | `0x97`  | -                                              |
| SignalReport | `0x9A`  | Status (1): 0x00=wyłączony, 0x01=włączony      |
| OK           | `0xF0`  | -                                              |
| Error        | `0xF1`  | Kod błędu (1)                                  |
| TxDone       | `0xF8`  | Wynik (1): 0x00=niepowodzenie, 0x01=sukces     |
| RxMeta       | `0xF9`  | SNR (1) + RSSI (1)                             |

### Kody błędów

| Kod           | Wartość | Opis                             |
|---------------|---------|----------------------------------|
| InvalidLength | `0x01`  | Dane żądania zbyt krótkie        |
| InvalidParam  | `0x02`  | Nieprawidłowa wartość parametru  |
| NoCallback    | `0x03`  | Funkcja niedostępna              |
| MacFailed     | `0x04`  | Weryfikacja MAC nie powiodła się |
| UnknownCmd    | `0x05`  | Nieznane subpolecenie            |
| EncryptFailed | `0x06`  | Szyfrowanie nie powiodło się     |
| TxBusy        | `0x07`  | Zajęty nadajnik lub pełna kolejka danych do hosta |

### Zdarzenia niewywołane żądaniem

TNC wysyła te ramki SetHardware bez poprzedzającego żądania:

**TxDone (0xF8)**: informuje o zakończeniu transmisji radiowej. Zawiera jeden bajt: `0x01` oznacza powodzenie, a `0x00` niepowodzenie. Zajęty port szeregowy może opóźnić dostarczenie tego powiadomienia, ale nie powoduje jego odrzucenia.

**RxMeta (0xF9)**: metadane wysyłane po standardowej ramce danych (typ `0x00`). Zawiera SNR (1 bajt ze znakiem, wartość pomnożona przez 4) i RSSI (1 bajt ze znakiem, w dBm). Trafia do kolejki razem z ramką danych. Jeśli nie można zakolejkować danych, ich metadane również są pomijane. Funkcja jest domyślnie włączona; zmienia ją polecenie SetSignalReport. Klienci KISS bez obsługi tego rozszerzenia ignorują ramkę.

## Formaty danych

### Parametry radia (odpowiedź SetRadio / Radio)

Wszystkie wartości w formacie little-endian.

| Pole      | Rozmiar | Opis                             |
|-----------|---------|----------------------------------|
| Frequency | 4 bajty | Hz (np. 869618000)               |
| Bandwidth | 4 bajty | Hz (np. 62500)                   |
| SF        | 1 bajt  | Współczynnik rozpraszania (5-12) |
| CR        | 1 bajt  | Współczynnik kodowania (5-8)     |

### Wersja (odpowiedź Version)

| Pole     | Rozmiar | Opis            |
|----------|---------|-----------------|
| Version  | 1 bajt  | Wersja firmware |
| Reserved | 1 bajt  | Zawsze 0        |

### Zaszyfrowane (odpowiedź Encrypted)

| Pole       | Rozmiar         | Opis                                                   |
|------------|-----------------|--------------------------------------------------------|
| MAC        | 2 bajty         | HMAC-SHA256 obcięty do 2 bajtów                        |
| Ciphertext | zmienna długość | Dane zaszyfrowane blokowo AES-128 z zerowym paddingiem |

### Czas nadawania (odpowiedź Airtime)

Wszystkie wartości w formacie little-endian.

| Pole    | Rozmiar | Opis                                               |
|---------|---------|----------------------------------------------------|
| Airtime | 4 bajty | uint32_t, szacowany czas nadawania w milisekundach |

### Noise Floor (NF) - poziom szumu (odpowiedź NoiseFloor)

Wszystkie wartości w formacie little-endian.

| Pole        | Rozmiar | Opis                      |
|-------------|---------|---------------------------|
| Noise floor | 2 bajty | int16_t, dBm (ze znakiem) |

Modem rekalibruje Noise Floor (poziom szumu) co 2 sekundy, z resetem AGC co 30 sekund.

### Statystyki (odpowiedź Stats)

Wszystkie wartości w formacie little-endian.

| Pole   | Rozmiar | Opis             |
|--------|---------|------------------|
| RX     | 4 bajty | Odebrane pakiety |
| TX     | 4 bajty | Wysłane pakiety  |
| Errors | 4 bajty | Błędy odbioru    |

### Bateria (odpowiedź Battery)

Wszystkie wartości w formacie little-endian.

| Pole       | Rozmiar | Opis                            |
|------------|---------|---------------------------------|
| Millivolts | 2 bajty | uint16_t, napięcie baterii w mV |

### Temperatura MCU (odpowiedź MCUTemp)

Wszystkie wartości w formacie little-endian.

| Pole        | Rozmiar | Opis                                            |
|-------------|---------|-------------------------------------------------|
| Temperature | 2 bajty | int16_t, dziesiąte części °C (np. 253 = 25,3°C) |

Zwraca błąd `NoCallback`, jeśli płytka nie obsługuje odczytu temperatury.

### Nazwa urządzenia (odpowiedź DeviceName)

| Pole | Rozmiar         | Opis                                |
|------|-----------------|-------------------------------------|
| Name | zmienna długość | Ciąg UTF-8, bez znaku null na końcu |

### Reboot

Wysyła odpowiedź `OK`, opróżnia bufor portu szeregowego, a następnie restartuje urządzenie. Host powinien liczyć się z zerwaniem połączenia.

### Uprawnienia czujników (GetSensors)

| Bit | Wartość | Opis                                             |
|-----|---------|--------------------------------------------------|
| 0   | `0x01`  | Base (bateria)                                   |
| 1   | `0x02`  | Location (GPS)                                   |
| 2   | `0x04`  | Environment (temperatura, wilgotność, ciśnienie) |

Użyj `0x07`, aby uzyskać wszystkie uprawnienia.

### Dane czujników (odpowiedź Sensors)

Dane zwracane są w formacie CayenneLPP. Instrukcje parsowania znajdziesz w [dokumentacji CayenneLPP](https://docs.mydevices.com/docs/lorawan/cayenne-lpp).

## Algorytmy kryptograficzne

| Operacja                               | Algorytm                                                                                 |
|----------------------------------------|------------------------------------------------------------------------------------------|
| Tożsamość / podpisywanie / weryfikacja | Ed25519                                                                                  |
| Wymiana kluczy                         | X25519 (ECDH)                                                                            |
| Szyfrowanie                            | Szyfrowanie blokowe AES-128 z zerowym paddingiem + HMAC-SHA256 (MAC obcięty do 2 bajtów) |
| Haszowanie                             | SHA-256                                                                                  |

## Uwagi

- Limit payloadu danych (255 bajtów) odpowiada MAX_TRANS_UNIT z MeshCore; nie jest wymagana żadna zmiana w związku z zaleceniem KISS „1024+ zalecane” (dotyczy ono ogólnych TNC, nie MeshCore)
- Modem generuje tożsamość przy pierwszym uruchomieniu (przechowywana w pamięci flash)
- Wszystkie wartości wielobajtowe są little-endian, chyba że zaznaczono inaczej
- Wartości SNR w RxMeta są mnożone przez 4 dla precyzji 0,25 dB
- TxDone jest wysyłane jako zdarzenie SetHardware po każdej transmisji
- Standardowi klienci KISS odbierają wyłącznie ramki danych typu 0x00 i mogą bezpiecznie ignorować wszystkie ramki SetHardware (0x06)
- Format pakietu znajdziesz w [packet_format.md](./packet_format.md)
