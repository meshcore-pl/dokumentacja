---
title: Protokół Companion
description: Przewodnik po komunikacji z urządzeniami MeshCore przez Bluetooth Low Energy (BLE).
order: 4
sourceUrl: https://docs.meshcore.io/companion_protocol
createdAt: 22.08.2026
updatedAt: 10.11.2026
---

# Protokół Companion

- **Data podana w oryginale**: 2026-03-08
- **Wersja protokołu**: Firmware Companion v1.12.0+

> UWAGA: ten dokument jest wciąż w trakcie tworzenia. Niektóre informacje mogą być niedokładne.

Ten dokument opisuje komunikację z urządzeniami MeshCore przez Bluetooth Low Energy (BLE).

Opis protokołu jest niezależny od platformy. Można go wykorzystać m.in. w aplikacjach na Androida i iOS oraz w implementacjach w Pythonie i JavaScript z obsługą BLE.

## Oficjalne biblioteki

Istniejące biblioteki protokołu MeshCore Companion znajdziesz w poniższych repozytoriach.

- JavaScript: [https://github.com/meshcore-dev/meshcore.js](https://github.com/meshcore-dev/meshcore.js)
- Python: [https://github.com/meshcore-dev/meshcore_py](https://github.com/meshcore-dev/meshcore_py)

## Ważna uwaga dotycząca bezpieczeństwa

Klucze i sekrety w przykładach służą do demonstracji. Do własnych kanałów prywatnych generuj nowe, losowe klucze za pomocą generatora kryptograficznego. Przechowuj je bezpiecznie i nie zapisuj w logach.

Wyjątkiem jest opisany dalej klucz wbudowanego kanału „Public”: jest wspólny i publicznie znany.

## Spis treści

1. [Połączenie BLE](#polaczenie-ble)
2. [Struktura pakietu](#struktura-pakietu)
3. [Polecenia](#polecenia)
4. [Zarządzanie kanałami](#zarzadzanie-kanalami)
5. [Obsługa wiadomości](#obsluga-wiadomosci)
6. [Parsowanie odpowiedzi](#parsowanie-odpowiedzi)
7. [Przykładowy przebieg implementacji](#przykladowy-przebieg-implementacji)
8. [Dobre praktyki](#dobre-praktyki)
9. [Rozwiązywanie problemów](#rozwiazywanie-problemow)

---

## Połączenie BLE

### Usługa i charakterystyki

Urządzenia MeshCore Companion udostępniają usługę BLE z następującymi UUID:

- **UUID usługi**: `6E400001-B5A3-F393-E0A9-E50E24DCCA9E`
- **Charakterystyka RX** (aplikacja → firmware): `6E400002-B5A3-F393-E0A9-E50E24DCCA9E`
- **Charakterystyka TX** (firmware → aplikacja): `6E400003-B5A3-F393-E0A9-E50E24DCCA9E`

### Kroki połączenia

1. **Skanowanie urządzeń**
    - Skanuj urządzenia BLE rozgłaszające UUID usługi MeshCore
    - Opcjonalnie filtruj po nazwie urządzenia (zwykle zawiera prefiks „MeshCore”)
    - Zapisz adres MAC urządzenia w celu ponownego łączenia

2. **Połączenie z GATT**
    - Połącz się z urządzeniem, korzystając z odnalezionego adresu MAC
    - Poczekaj na ustanowienie połączenia

3. **Odkrywanie usług i charakterystyk**
    - Odkryj usługę o UUID `6E400001-B5A3-F393-E0A9-E50E24DCCA9E`
    - Odkryj charakterystykę RX `6E400002-B5A3-F393-E0A9-E50E24DCCA9E`
        - Twoja aplikacja zapisuje do niej dane, firmware je odczytuje
    - Odkryj charakterystykę TX `6E400003-B5A3-F393-E0A9-E50E24DCCA9E`
        - Firmware zapisuje do niej dane, Twoja aplikacja je odczytuje

4. **Włącz powiadomienia**
    - Subskrybuj powiadomienia na charakterystyce TX, aby otrzymywać dane z firmware

5. **Wyślij polecenia początkowe**
    - Wyślij `CMD_APP_START`, aby zidentyfikować swoją aplikację wobec firmware i pobrać ustawienia radia
    - Wyślij `CMD_DEVICE_QUERY`, aby pobrać informacje o urządzeniu i wynegocjować obsługiwane wersje protokołu
    - Wyślij `CMD_SET_DEVICE_TIME`, aby ustawić zegar firmware
    - Wyślij `CMD_GET_CONTACTS`, aby pobrać wszystkie kontakty
    - Wyślij `CMD_GET_CHANNEL` wielokrotnie, aby pobrać wszystkie sloty kanałów
    - Wyślij `CMD_SYNC_NEXT_MESSAGE`, aby pobrać kolejną wiadomość zapisaną w firmware
    - Skonfiguruj nasłuchiwanie kodów push, takich jak `PUSH_CODE_MSG_WAITING` czy `PUSH_CODE_ADVERT`
    - Więcej informacji o innych poleceniach znajdziesz w sekcji [Polecenia](#polecenia)

**Uwaga**: urządzenia MeshCore mogą rozłączać się po okresach bezczynności. Zaimplementuj logikę automatycznego ponownego łączenia z wykładniczym opóźnieniem (exponential backoff).

### Typ zapisu BLE

Wysyłając polecenia do charakterystyki RX, określ typ zapisu:

- **Write with Response** (domyślny): czeka na potwierdzenie od urządzenia
- **Write without Response**: szybszy, ale bez potwierdzenia

**Specyfika platformy**:

- **Android**: użyj `BluetoothGattCharacteristic.WRITE_TYPE_DEFAULT` lub `WRITE_TYPE_NO_RESPONSE`
- **iOS**: użyj `CBCharacteristicWriteType.withResponse` lub `.withoutResponse`
- **Python (bleak)**: użyj `write_gatt_char()` z `response=True` lub `False`

**Zalecenie**: dla niezawodności używaj write with response.

### MTU (Maximum Transmission Unit)

Domyślne MTU BLE wynosi 23 bajty, z czego 20 bajtów mieści dane. Większe polecenia, np. `SET_CHANNEL` (50 bajtów), wymagają odpowiednio większego limitu zapisu.

- Android: zażądaj większego MTU, np. `gatt.requestMtu(512)`, jeśli urządzenie je obsługuje.
- iOS: odczytaj limit zapisu przez `peripheral.maximumWriteValueLength(for:)`.
- Python (bleak): MTU jest negocjowane automatycznie.

### Kolejność poleceń

Połącz się z urządzeniem i włącz powiadomienia, zanim wyślesz pierwsze polecenie:

1. **Po połączeniu**:
    - Poczekaj na ustanowienie połączenia BLE
    - Poczekaj na odkrycie usług/charakterystyk
    - Poczekaj na włączenie powiadomień
    - Dopiero teraz możesz bezpiecznie wysyłać polecenia do firmware

2. **Dopasowywanie polecenie-odpowiedź**:
    - Wysyłaj jedno polecenie naraz
    - Czekaj na odpowiedź przed wysłaniem kolejnego polecenia
    - Użyj timeoutu (zwykle 5 sekund)
    - Dopasuj odpowiedź do polecenia na podstawie typu (np. `CMD_GET_CHANNEL` → `RESP_CODE_CHANNEL_INFO`)

### Zarządzanie kolejką poleceń

Użyj kolejki, aby wysyłać jedno polecenie naraz i czekać na jego odpowiedź.

**Struktura kolejki**:

- Utrzymuj kolejkę oczekujących poleceń
- Śledź, które polecenie aktualnie oczekuje na odpowiedź
- Wysyłaj kolejne polecenie dopiero po otrzymaniu odpowiedzi lub upływie timeoutu

**Obsługa błędów**:

- Przy timeoucie: wyczyść bieżące polecenie, przetwarzaj kolejne z kolejki
- Przy błędzie: zaloguj błąd, wyczyść bieżące polecenie, przetwarzaj kolejne

---

## Struktura pakietu

Protokół MeshCore wykorzystuje format binarny o następującej strukturze:

- **Polecenia**: wysyłane z aplikacji do firmware przez charakterystykę RX
- **Odpowiedzi**: odbierane z firmware przez powiadomienia charakterystyki TX
- **Wszystkie wielobajtowe liczby całkowite**: kolejność bajtów little-endian (poza CayenneLPP, który jest big-endian)
- **Wszystkie ciągi znaków**: kodowanie UTF-8

Większość pakietów ma następujący format:
```
[Packet Type (1 byte)] [Data (variable length)]
```

Pierwszy bajt określa typ pakietu (patrz [Parsowanie odpowiedzi](#parsowanie-odpowiedzi)).

---

## Polecenia

### 1. App Start

**Cel**: zainicjowanie komunikacji z urządzeniem. Musi zostać wysłane jako pierwsze po połączeniu.

**Format polecenia**:
```
Byte 0: 0x01
Bytes 1-7: Reserved (currently ignored by firmware)
Bytes 8+: Application name (UTF-8, optional)
```

**Przykład** (hex):
```
01 00 00 00 00 00 00 00 6d 63 63 6c 69
```

**Odpowiedź**: `PACKET_SELF_INFO` (0x05)

---

### 2. Device Query

**Cel**: pobranie informacji o urządzeniu.

**Format polecenia**:
```
Byte 0: 0x16
Byte 1: 0x03
```

**Przykład** (hex):
```
16 03
```

**Odpowiedź**: `PACKET_DEVICE_INFO` (0x0D) z informacjami o urządzeniu

---

### 3. Get Channel Info

**Cel**: pobranie informacji o konkretnym kanale.

**Format polecenia**:
```
Byte 0: 0x1F
Byte 1: Channel Index (0 .. max_channels-1)
```

**Przykład** (pobranie kanału 1):
```
1F 01
```

**Odpowiedź**: `PACKET_CHANNEL_INFO` (0x12) ze szczegółami kanału

---

### 4. Set Channel

**Cel**: utworzenie lub zaktualizowanie kanału na urządzeniu.

**Format polecenia**:
```
Byte 0: 0x20
Byte 1: Channel Index (0 .. max_channels-1)
Bytes 2-33: Channel Name (32 bytes, UTF-8, null-padded)
Bytes 34-49: Secret (16 bytes)
```

**Całkowita długość**: 50 bajtów

**Indeks kanału**:
- Dozwolony zakres to `0` do `max_channels - 1`. Odczytaj `max_channels` z bajtu 3 odpowiedzi `PACKET_DEVICE_INFO`. Nie zakładaj, że urządzenie obsługuje zawsze 8 kanałów: zależnie od płytki `MAX_GROUP_CHANNELS` wynosi 1, 8 lub 40.
- Pod indeksem 0 firmware domyślnie zapisuje kanał „Public”. Można go nadpisać tak samo jak pozostałe kanały.
- Indeks poza zakresem powoduje odpowiedź `PACKET_ERROR` z kodem `ERR_CODE_NOT_FOUND`.

**Nazwa kanału**:
- Kodowana w UTF-8
- Maksymalnie 32 bajty
- Dopełniana bajtami null (0x00), jeśli krótsza

**Pole Secret** (16 bajtów):
- Każdy kanał wymaga 16-bajtowego klucza. Firmware oblicza hash kanału na podstawie `SHA256(secret)`. Nie ma osobnego trybu „bez sekretu”.
- Nie używaj klucza złożonego z samych zer. Tworzy on kanał ze znanym kluczem AES i takim samym hashem na każdym urządzeniu. Jego wiadomości może odczytać każdy, kto zna ten klucz. Firmware pomija puste, nienazwane kanały przy odbiorze, ale nazwany kanał z zerowym kluczem będzie odbierać taki ruch.
- Wbudowany kanał „Public” używa znanego klucza `izOH6cXN6mrJ5e26oRXNcg==` w base64, czyli `8b3387e9c5cdea6ac9e5edbaa115cd72` w zapisie hex.

**Przykład** (utworzenie kanału „YourChannelName” pod indeksem 1 z sekretem):
```
20 01 53 4D 53 00 00 ... (name padded to 32 bytes)
    [16 bytes of secret]
```

**Uwaga**: wariant z 32-bajtowym sekretem nie jest obsługiwany i zwraca `PACKET_ERROR`.

**Odpowiedź**: `PACKET_OK` (0x00) po powodzeniu, `PACKET_ERROR` (0x01) w razie błędu

---

### 5. Send Channel Message

**Cel**: wysłanie wiadomości tekstowej na kanał.

**Format polecenia**:
```
Byte 0: 0x03
Byte 1: 0x00
Byte 2: Channel Index (0 .. max_channels-1)
Bytes 3-6: Timestamp (32-bit little-endian Unix timestamp, seconds)
Bytes 7+: Message Text (UTF-8, variable length)
```

**Timestamp**: znacznik czasu Unix w sekundach (32-bitowa liczba całkowita bez znaku, little-endian)

**Przykład** (wysłanie „Hello” na kanał 1 ze znacznikiem czasu 1234567890):
```
03 00 01 D2 02 96 49 48 65 6C 6C 6F
```

**Odpowiedź**: `PACKET_MSG_SENT` (0x06) po powodzeniu

---

### 6. Send Channel Data Datagram

**Cel**: wysłanie binarnego datagramu na kanał. W przeciwieństwie do wiadomości tekstowych kanału, datagramy nie zawierają wbudowanej tożsamości nadawcy ani znacznika czasu - aplikacje potrzebujące jednego lub drugiego muszą zakodować je wewnątrz binarnego payloadu.

**Format polecenia**:
```
Byte 0:                         0x3E
Byte 1:                         Channel Index (0 .. max_channels-1)
Byte 2:                         Path Length (0xFF = flood, otherwise actual path length)
Bytes 3 .. 2+path_len:          Path (omitted when path_len == 0xFF)
Next 2 bytes (little-endian):   Data Type (`data_type`, uint16)
Remaining bytes:                Binary payload (variable length)
```

**Przykład** (flood, `DATA_TYPE_DEV`, payload `A1 B2 C3`, kanał 1):
```
3E 01 FF FF FF A1 B2 C3
```

**Mapowanie Data Type / Transport**:
- `0x0000` (`DATA_TYPE_RESERVED`) jest nieprawidłowe i odrzucane z `PACKET_ERROR`.
- `0xFFFF` (`DATA_TYPE_DEV`) to przestrzeń deweloperska do eksperymentowania i tworzenia aplikacji.
- Wartości `0x0001`–`0xFFFE` są dostępne dla zarejestrowanych przestrzeni nazw aplikacji/społeczności. Zobacz tabelę [Zarejestrowane wartości data_type](#zarejestrowane-wartosci-data-type) poniżej.

**Limity**:
- Payload może mieć najwyżej **165 bajtów**: `MAX_GROUP_DATA_LENGTH = MAX_PACKET_PAYLOAD - CIPHER_BLOCK_SIZE - 3`. Aplikacja powinna sprawdzać ten limit przed wysłaniem.
- Większy payload jest odrzucany z `PACKET_ERROR` i kodem `ERR_CODE_ILLEGAL_ARG` (6).
- W starszym firmware payload o długości 166-167 bajtów mógł zwracać `ERR_CODE_TABLE_FULL` (3). Nie oznaczało to chwilowo zajętej kolejki: dane trzeba było skrócić. Poprawkę dodano w [commicie 0a82fcd2](https://github.com/meshcore-dev/MeshCore/commit/0a82fcd2).

**Odpowiedź**: `PACKET_OK` (0x00) po powodzeniu albo `PACKET_ERROR` (0x01) z kodem:
- `ERR_CODE_NOT_FOUND` (2) - nieznany `channel_idx`
- `ERR_CODE_ILLEGAL_ARG` (6) - nieprawidłowy `path_len`, zarezerwowany `data_type` (`0x0000`) lub payload dłuższy niż 165 bajtów
- `ERR_CODE_TABLE_FULL` (3) - brak miejsca na wysłanie datagramu; można spróbować później, o ile payload mieści się w limicie

**Przychodzące datagramy** są dostarczane do hosta za pomocą `RESP_CODE_CHANNEL_DATA_RECV` (0x1B); patrz [Receive Channel Data Datagram](#receive-channel-data-datagram).

#### Zarejestrowane wartości `data_type`

`data_type` wskazuje aplikację, która ma obsłużyć datagram. Format payloadu określa ta aplikacja. Firmware przekazuje identyfikator i dane bez interpretowania ich zawartości.

| Wartość         | Stała                | Przeznaczenie                                                                                     |
|-----------------|----------------------|---------------------------------------------------------------------------------------------------|
| 0x0000          | `DATA_TYPE_RESERVED` | Zarezerwowane; nieprawidłowe przy wysyłaniu                                                       |
| 0x0001 – 0x00FF | -                    | Zarezerwowane do użytku wewnętrznego                                                              |
| 0x0100 – 0xFEFF | -                    | Zarejestrowane przestrzenie nazw aplikacji (patrz [number_allocations.md](number_allocations.md)) |
| 0xFF00 – 0xFFFE | -                    | Testy/development; rejestracja niewymagana                                                        |
| 0xFFFF          | `DATA_TYPE_DEV`      | Przestrzeń deweloperska/eksperymentalna                                                           |

Aby zarejestrować aplikację, dodaj wiersz do tabeli [przydziałów identyfikatorów](number_allocations.md) w dokumentacji źródłowej MeshCore i zgłoś pull request. W obrębie przydzielonego identyfikatora aplikacja sama określa format danych.

---

### Receive Channel Data Datagram

Przychodzące datagramy grupowe (na poziomie radia `PAYLOAD_TYPE_GRP_DATA`, 0x06) są przekazywane do hosta jako powiadomienia `RESP_CODE_CHANNEL_DATA_RECV`.

**Format ramki** (`RESP_CODE_CHANNEL_DATA_RECV`, 0x1B):
```
Byte 0:                 0x1B (packet type)
Byte 1:                 SNR (signed int8, scaled ×4 - divide by 4.0 to recover dB)
Bytes 2-3:              Reserved (clients MUST ignore)
Byte 4:                 Channel Index (0 .. max_channels-1)
Byte 5:                 Path Length (actual path length when flooded, otherwise 0xFF for direct)
Bytes 6-7:              Data Type (uint16 little-endian)
Byte 8:                 Data Length
Bytes 9 .. 8+data_len:  Payload
```

**Bajty ścieżki nie są przekazywane**: w ramce odbiorczej raportowane jest tylko `path_len` - sama ścieżka nie jest kopiowana do hosta. Między bajtem 5 a polem data_type na bajtach 6-7 nie ma żadnych bajtów ścieżki, niezależnie od `path_len`.

**Znaczenie Path Length różni się między wysyłaniem a odbieraniem**:

| Kierunek   | `path_len = 0xFF`                | `path_len ≠ 0xFF`                                                                                                                                                    |
|------------|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Wysyłanie  | Rozsyłanie w trybie flood               | Trasa bezpośrednia; następuje zakodowana ścieżka (dolne 6 bitów = liczba hashy, górne 2 bity + 1 = rozmiar hasha; liczba bajtów na łączu = `hash_count × hash_size`) |
| Odbieranie | Pakiet dotarł trasą bezpośrednią | Pakiet dotarł w trybie flood; to zakodowane pole `pkt->path_len` w takiej postaci, w jakiej zostało zaobserwowane (bez następujących bajtów ścieżki)                 |

Wartość `0xFF` ma więc inne znaczenie przy wysyłaniu i odbieraniu. Przy odbiorze pole opisuje sposób dostarczenia pakietu i nie zawiera trasy, którą można wykorzystać do wysyłania. `path_len` to zakodowany bajt (patrz `Packet::isValidPathLen` / `Packet::writePath` w `src/Packet.cpp`), a nie surowa liczba bajtów.

**Uwaga**: urządzenie może również wysłać `PACKET_MESSAGES_WAITING` (0x83), aby poinformować hosta, że w kolejce znajdują się datagramy; odpytuj za pomocą `CMD_SYNC_NEXT_MESSAGE` (0x0A), aby je pobrać.

**Pseudokod parsowania**:
```python
def parse_channel_data_recv(data):
    if len(data) < 9:
        return None
    snr_byte = data[1]
    snr = (snr_byte if snr_byte < 128 else snr_byte - 256) / 4.0
    channel_idx = data[4]
    path_len = data[5]
    data_type = int.from_bytes(data[6:8], 'little')
    data_len = data[8]
    if 9 + data_len > len(data):
        return None
    payload = data[9:9 + data_len]
    return {
        'snr': snr,
        'channel_idx': channel_idx,
        'path_len': path_len,
        'data_type': data_type,
        'payload': bytes(payload),
    }
```

---

### 7. Get Message

**Cel**: zażądanie kolejnej zakolejkowanej wiadomości z urządzenia.

**Format polecenia**:
```
Byte 0: 0x0A
```

**Przykład** (hex):
```
0A
```

**Odpowiedź**:
- `PACKET_CHANNEL_MSG_RECV` (0x08) lub `PACKET_CHANNEL_MSG_RECV_V3` (0x11) dla wiadomości kanałowych
- `PACKET_CONTACT_MSG_RECV` (0x07) lub `PACKET_CONTACT_MSG_RECV_V3` (0x10) dla wiadomości od kontaktów
- `PACKET_CHANNEL_DATA_RECV` (0x1B) dla datagramów danych kanału
- `PACKET_NO_MORE_MSGS` (0x0A), jeśli brak dostępnych wiadomości

**Uwaga**: odpytuj to polecenie okresowo, aby pobierać zakolejkowane wiadomości. Urządzenie może też wysłać `PACKET_MESSAGES_WAITING` (0x83) jako powiadomienie, gdy dostępne są wiadomości.

---

### 8. Get Battery and Storage

**Cel**: odczyt napięcia baterii i wykorzystania pamięci.

**Format polecenia**:
```
Byte 0: 0x14
```

**Przykład** (hex):
```
14
```

**Odpowiedź**: `PACKET_BATTERY` (0x0C) z napięciem baterii w miliwoltach i informacjami o pamięci

---

## Zarządzanie kanałami

### Typy kanałów

1. **Kanał publiczny**
    - Wykorzystuje publicznie znany 16-bajtowy klucz: `8b3387e9c5cdea6ac9e5edbaa115cd72`
    - Każdy może dołączyć do tego kanału, wiadomości należy uznawać za publiczne
    - Używany jako domyślny publiczny czat grupowy
2. **Kanały hashtagowe**
    - Klucz jest wyprowadzany z nazwy kanału, więc zna go każdy, kto zna nazwę
    - To pierwsze 16 bajtów `sha256("#test")`
    - Na przykład kanał hashtagowy `#test` ma klucz: `9cd8fcf22a47333b591d96a2b848b73f`
    - Używane jako publiczny czat grupowy oparty na temacie, oddzielny od domyślnego kanału publicznego
3. **Kanały prywatne**
    - Wykorzystują losowo wygenerowany 16-bajtowy tajny klucz
    - Wiadomości należy uznawać za prywatne między osobami znającymi sekret
    - Użytkownicy powinni utrzymywać klucz w tajemnicy i udostępniać go wyłącznie osobom, z którymi chcą się komunikować
    - Używane jako bezpieczny, prywatny czat grupowy

### Cykl życia kanału

1. **Ustawienie kanału (Set Channel)**:
    - Pobierz wszystkie sloty kanałów i znajdź taki z pustą nazwą i zerowym sekretem
    - Wygeneruj lub podaj 16-bajtowy sekret
    - Wyślij `CMD_SET_CHANNEL` z nazwą i 16-bajtowym sekretem
2. **Pobranie kanału (Get Channel)**:
    - Wyślij `CMD_GET_CHANNEL` z indeksem kanału
    - Sparsuj odpowiedź `RESP_CODE_CHANNEL_INFO`
3. **Usunięcie kanału (Delete Channel)**:
    - Wyślij `CMD_SET_CHANNEL` z pustą nazwą i zerowym sekretem
    - Lub nadpisz nowym kanałem

---

## Obsługa wiadomości

### Odbieranie wiadomości

Wiadomości są odbierane przez charakterystykę TX (powiadomienia). Urządzenie wysyła:

1. **Wiadomości kanałowe**:
   - `PACKET_CHANNEL_MSG_RECV` (0x08) - format standardowy
   - `PACKET_CHANNEL_MSG_RECV_V3` (0x11) - wersja 3 z SNR

2. **Wiadomości od kontaktów**:
   - `PACKET_CONTACT_MSG_RECV` (0x07) - format standardowy
   - `PACKET_CONTACT_MSG_RECV_V3` (0x10) - wersja 3 z SNR

3. **Powiadomienia**:
   - `PACKET_MESSAGES_WAITING` (0x83) - wskazuje, że wiadomości są zakolejkowane

### Format wiadomości od kontaktu

**Format standardowy** (`PACKET_CONTACT_MSG_RECV`, 0x07):
```
Byte 0: 0x07 (packet type)
Bytes 1-6: Public Key Prefix (6 bytes, hex)
Byte 7: Path Length
Byte 8: Text Type
Bytes 9-12: Timestamp (32-bit little-endian)
Bytes 13-16: Signature (4 bytes, only if txt_type == 2)
Bytes 17+: Message Text (UTF-8)
```

**Format V3** (`PACKET_CONTACT_MSG_RECV_V3`, 0x10):
```
Byte 0: 0x10 (packet type)
Byte 1: SNR (signed byte, multiplied by 4)
Bytes 2-3: Reserved
Bytes 4-9: Public Key Prefix (6 bytes, hex)
Byte 10: Path Length
Byte 11: Text Type
Bytes 12-15: Timestamp (32-bit little-endian)
Bytes 16-19: Signature (4 bytes, only if txt_type == 2)
Bytes 20+: Message Text (UTF-8)
```

**Pseudokod parsowania**:
```python
def parse_contact_message(data):
    packet_type = data[0]
    offset = 1

    # Sprawdź, czy to format V3
    if packet_type == 0x10:  # V3
        snr_byte = data[offset]
        snr = ((snr_byte if snr_byte < 128 else snr_byte - 256) / 4.0)
        offset += 3  # Pomiń SNR + zarezerwowane

    pubkey_prefix = data[offset:offset+6].hex()
    offset += 6

    path_len = data[offset]
    txt_type = data[offset + 1]
    offset += 2

    timestamp = int.from_bytes(data[offset:offset+4], 'little')
    offset += 4

    # Jeśli txt_type == 2, pomiń 4-bajtowy podpis
    if txt_type == 2:
        offset += 4

    message = data[offset:].decode('utf-8')

    return {
        'pubkey_prefix': pubkey_prefix,
        'path_len': path_len,
        'txt_type': txt_type,
        'timestamp': timestamp,
        'message': message,
        'snr': snr if packet_type == 0x10 else None
    }
```

### Format wiadomości kanałowej

**Format standardowy** (`PACKET_CHANNEL_MSG_RECV`, 0x08):
```
Byte 0: 0x08 (packet type)
Byte 1: Channel Index (0 .. max_channels-1)
Byte 2: Path Length
Byte 3: Text Type
Bytes 4-7: Timestamp (32-bit little-endian)
Bytes 8+: Message Text (UTF-8)
```

**Format V3** (`PACKET_CHANNEL_MSG_RECV_V3`, 0x11):
```
Byte 0: 0x11 (packet type)
Byte 1: SNR (signed byte, multiplied by 4)
Bytes 2-3: Reserved
Byte 4: Channel Index (0 .. max_channels-1)
Byte 5: Path Length
Byte 6: Text Type
Bytes 7-10: Timestamp (32-bit little-endian)
Bytes 11+: Message Text (UTF-8)
```

**Pseudokod parsowania**:
```python
def parse_channel_message(data):
    packet_type = data[0]
    offset = 1

    # Sprawdź, czy to format V3
    if packet_type == 0x11:  # V3
        snr_byte = data[offset]
        snr = ((snr_byte if snr_byte < 128 else snr_byte - 256) / 4.0)
        offset += 3  # Pomiń SNR + zarezerwowane

    channel_idx = data[offset]
    path_len = data[offset + 1]
    txt_type = data[offset + 2]
    timestamp = int.from_bytes(data[offset+3:offset+7], 'little')
    message = data[offset+7:].decode('utf-8')

    return {
        'channel_idx': channel_idx,
        'timestamp': timestamp,
        'message': message,
        'snr': snr if packet_type == 0x11 else None
    }
```

### Wysyłanie wiadomości

Użyj polecenia `SEND_CHANNEL_MESSAGE` (patrz [Polecenia](#polecenia)).

**Ważne**:
- Wiadomości są ograniczone do 133 znaków zgodnie ze specyfikacją MeshCore
- Długie wiadomości powinny być dzielone na części
- Dołącz wskaźnik części (np. „[1/3] treść wiadomości”)

---

## Parsowanie odpowiedzi

### Terminologia

Ten dokument używa konwencji nazewnictwa na poziomie specyfikacji (`PACKET_*`) dla bajtów odsyłanych przez firmware do hosta. W kodzie źródłowym firmware te same wartości są podzielone na dwie rodziny `#define` według przeznaczenia:

- `RESP_CODE_*` - bezpośrednie odpowiedzi na polecenie (np. `RESP_CODE_CHANNEL_DATA_RECV` = `PACKET_CHANNEL_DATA_RECV` = 0x1B).
- `PUSH_CODE_*` - asynchroniczne powiadomienia niepowiązane z konkretnym poleceniem (np. `PUSH_CODE_MSG_WAITING` = `PACKET_MESSAGES_WAITING` = 0x83).

O typie pakietu decyduje wartość bajtu, a nazwy stałych są jej aliasami. Stałe `RESP_CODE_X` i `PUSH_CODE_X` w kodzie firmware odpowiadają nazwom `PACKET_X` z tego dokumentu, jeśli mają tę samą wartość liczbową.

### Typy pakietów

| Wartość | Nazwa                      | Opis                                       |
|---------|----------------------------|--------------------------------------------|
| 0x00    | PACKET_OK                  | Polecenie zakończone sukcesem              |
| 0x01    | PACKET_ERROR               | Polecenie zakończone niepowodzeniem        |
| 0x02    | PACKET_CONTACT_START       | Początek listy kontaktów                   |
| 0x03    | PACKET_CONTACT             | Informacje o kontakcie                     |
| 0x04    | PACKET_CONTACT_END         | Koniec listy kontaktów                     |
| 0x05    | PACKET_SELF_INFO           | Informacje o samym urządzeniu              |
| 0x06    | PACKET_MSG_SENT            | Potwierdzenie wysłania wiadomości          |
| 0x07    | PACKET_CONTACT_MSG_RECV    | Wiadomość od kontaktu (standardowa)        |
| 0x08    | PACKET_CHANNEL_MSG_RECV    | Wiadomość kanałowa (standardowa)           |
| 0x09    | PACKET_CURRENT_TIME        | Odpowiedź z aktualnym czasem               |
| 0x0A    | PACKET_NO_MORE_MSGS        | Brak dostępnych kolejnych wiadomości       |
| 0x0C    | PACKET_BATTERY             | Poziom baterii                             |
| 0x0D    | PACKET_DEVICE_INFO         | Informacje o urządzeniu                    |
| 0x10    | PACKET_CONTACT_MSG_RECV_V3 | Wiadomość od kontaktu (V3 z SNR)           |
| 0x11    | PACKET_CHANNEL_MSG_RECV_V3 | Wiadomość kanałowa (V3 z SNR)              |
| 0x12    | PACKET_CHANNEL_INFO        | Informacje o kanale                        |
| 0x1B    | PACKET_CHANNEL_DATA_RECV   | Datagram danych kanału                     |
| 0x80    | PACKET_ADVERTISEMENT       | Pakiet advertu                             |
| 0x82    | PACKET_ACK                 | Potwierdzenie                              |
| 0x83    | PACKET_MESSAGES_WAITING    | Powiadomienie o oczekujących wiadomościach |
| 0x88    | PACKET_LOG_DATA            | Dane logu RF (można zignorować)            |

### Parsowanie odpowiedzi

**PACKET_OK** (0x00):
```
Byte 0: 0x00
Bytes 1-4: Optional value (32-bit little-endian integer)
```

**PACKET_ERROR** (0x01):
```
Byte 0: 0x01
Byte 1: Error code (optional)
```

**PACKET_CHANNEL_INFO** (0x12):
```
Byte 0: 0x12
Byte 1: Channel Index
Bytes 2-33: Channel Name (32 bytes, null-terminated)
Bytes 34-49: Secret (16 bytes)
```

**Uwaga**: urządzenie zwraca w tej odpowiedzi 16-bajtowy sekret kanału.

**PACKET_DEVICE_INFO** (0x0D):
```
Byte 0: 0x0D
Byte 1: Firmware Version (uint8)
Bytes 2+: Variable length based on firmware version

For firmware version >= 3:
Byte 2: Max Contacts Raw (uint8, actual = value * 2)
Byte 3: Max Channels (uint8)
Bytes 4-7: BLE PIN (32-bit little-endian)
Bytes 8-19: Firmware Build (12 bytes, UTF-8, null-padded)
Bytes 20-59: Model (40 bytes, UTF-8, null-padded)
Bytes 60-79: Version (20 bytes, UTF-8, null-padded)
Byte 80: Client repeat enabled/preferred (firmware v9+)
Byte 81: Path hash mode (firmware v10+)
```

**Pseudokod parsowania**:
```python
def parse_device_info(data):
    if len(data) < 2:
        return None

    fw_ver = data[1]
    info = {'fw_ver': fw_ver}

    if fw_ver >= 3 and len(data) >= 80:
        info['max_contacts'] = data[2] * 2
        info['max_channels'] = data[3]
        info['ble_pin'] = int.from_bytes(data[4:8], 'little')
        info['fw_build'] = data[8:20].decode('utf-8').rstrip('\x00').strip()
        info['model'] = data[20:60].decode('utf-8').rstrip('\x00').strip()
        info['ver'] = data[60:80].decode('utf-8').rstrip('\x00').strip()

    return info
```

**PACKET_BATTERY** (0x0C):
```
Byte 0: 0x0C
Bytes 1-2: Battery Voltage (16-bit little-endian, millivolts)
Bytes 3-6: Used Storage (32-bit little-endian, KB)
Bytes 7-10: Total Storage (32-bit little-endian, KB)
```

**Pseudokod parsowania**:
```python
def parse_battery(data):
    if len(data) < 3:
        return None

    mv = int.from_bytes(data[1:3], 'little')
    info = {'battery_mv': mv}

    if len(data) >= 11:
        info['used_kb'] = int.from_bytes(data[3:7], 'little')
        info['total_kb'] = int.from_bytes(data[7:11], 'little')

    return info
```

**PACKET_SELF_INFO** (0x05):
```
Byte 0: 0x05
Byte 1: Advertisement Type
Byte 2: TX Power
Byte 3: Max TX Power
Bytes 4-35: Public Key (32 bytes, hex)
Bytes 36-39: Advertisement Latitude (32-bit little-endian, divided by 1e6)
Bytes 40-43: Advertisement Longitude (32-bit little-endian, divided by 1e6)
Byte 44: Multi ACKs
Byte 45: Advertisement Location Policy
Byte 46: Telemetry Mode (bitfield)
Byte 47: Manual Add Contacts (bool)
Bytes 48-51: Radio Frequency (32-bit little-endian, divided by 1000.0)
Bytes 52-55: Radio Bandwidth (32-bit little-endian, divided by 1000.0)
Byte 56: Radio Spreading Factor
Byte 57: Radio Coding Rate
Bytes 58+: Device Name (UTF-8, variable length, no null terminator required)
```

**Pseudokod parsowania**:
```python
def parse_self_info(data):
    if len(data) < 36:
        return None

    offset = 1
    info = {
        'adv_type': data[offset],
        'tx_power': data[offset + 1],
        'max_tx_power': data[offset + 2],
        'public_key': data[offset + 3:offset + 35].hex()
    }
    offset += 35

    lat = int.from_bytes(data[offset:offset+4], 'little') / 1e6
    lon = int.from_bytes(data[offset+4:offset+8], 'little') / 1e6
    info['adv_lat'] = lat
    info['adv_lon'] = lon
    offset += 8

    info['multi_acks'] = data[offset]
    info['adv_loc_policy'] = data[offset + 1]
    telemetry_mode = data[offset + 2]
    info['telemetry_mode_env'] = (telemetry_mode >> 4) & 0b11
    info['telemetry_mode_loc'] = (telemetry_mode >> 2) & 0b11
    info['telemetry_mode_base'] = telemetry_mode & 0b11
    info['manual_add_contacts'] = data[offset + 3] > 0
    offset += 4

    freq = int.from_bytes(data[offset:offset+4], 'little') / 1000.0
    bw = int.from_bytes(data[offset+4:offset+8], 'little') / 1000.0
    info['radio_freq'] = freq
    info['radio_bw'] = bw
    info['radio_sf'] = data[offset + 8]
    info['radio_cr'] = data[offset + 9]
    offset += 10

    if offset < len(data):
        name_bytes = data[offset:]
        info['name'] = name_bytes.decode('utf-8').rstrip('\x00').strip()

    return info
```

**PACKET_MSG_SENT** (0x06):
```
Byte 0: 0x06
Byte 1: Route Flag (0 = direct, 1 = flood)
Bytes 2-5: Tag / Expected ACK (4 bytes, little-endian)
Bytes 6-9: Suggested Timeout (32-bit little-endian, milliseconds)
```

**PACKET_ACK** (0x82):
```
Byte 0: 0x82
Bytes 1-6: ACK Code (6 bytes, hex)
```

### Kody błędów

`PACKET_ERROR` (0x01) niesie jednobajtowy kod błędu w bajcie 1. Wartości odpowiadają stałym `ERR_CODE_*` zdefiniowanym w `examples/companion_radio/MyMesh.cpp`:

| Kod | Stała (firmware)           | Opis                                                                                 |
|-----|----------------------------|--------------------------------------------------------------------------------------|
| 1   | `ERR_CODE_UNSUPPORTED_CMD` | Nieznany lub nieobsługiwany bajt polecenia / subpolecenie                            |
| 2   | `ERR_CODE_NOT_FOUND`       | Nie znaleziono celu (kanał, kontakt, wiadomość itd.)                                  |
| 3   | `ERR_CODE_TABLE_FULL`      | Pełna kolejka lub tabela; w starszym firmware także zbyt długi payload `SEND_CHANNEL_DATA` (patrz limity datagramów)                  |
| 4   | `ERR_CODE_BAD_STATE`       | Operacja nieprawidłowa w bieżącym stanie urządzenia (np. iterator już działa)        |
| 5   | `ERR_CODE_FILE_IO_ERROR`   | Błąd operacji wejścia/wyjścia systemu plików lub pamięci                             |
| 6   | `ERR_CODE_ILLEGAL_ARG`     | Nieprawidłowy argument (zła długość, wartość poza zakresem, zarezerwowane pole itd.) |

**Uwaga**: kody błędów mogą się różnić w zależności od wersji firmware. Zawsze sprawdzaj bajt 1 odpowiedzi `PACKET_ERROR` i traktuj nieznane kody jako błędy ogólne.

### Obsługa ramek

Implementacje BLE kolejkują i dostarczają jedną ramkę protokołu na jeden zapis/powiadomienie BLE na poziomie warstwy firmware.

- Aplikacje powinny traktować każdy zapis/powiadomienie charakterystyki jako dokładnie jedną ramkę protokołu companion
- Aplikacje powinny mimo to walidować długość ramki przed parsowaniem
- Przyszłe transporty lub wersje firmware mogą się różnić, więc unikaj zakładania stałych rozmiarów payloadu dla odpowiedzi o zmiennej długości

### Obsługa odpowiedzi

1. **Wzorzec polecenie-odpowiedź**:
   - Wyślij polecenie przez charakterystykę RX
   - Poczekaj na odpowiedź przez charakterystykę TX (powiadomienie)
   - Dopasuj odpowiedź do polecenia według oczekiwanego typu pakietu
   - Obsłuż timeout (zwykle 5 sekund)
   - Użyj kolejki poleceń, aby zapobiec równoczesnym poleceniom

2. **Wiadomości asynchroniczne**:
   - Urządzenie może wysłać wiadomość w dowolnym momencie przez charakterystykę TX
   - Obsłuż `PACKET_MESSAGES_WAITING` (0x83), odpytując polecenie `GET_MESSAGE`
   - Sparsuj przychodzące wiadomości i przekaż je do odpowiednich handlerów
   - Zwaliduj długość ramki przed dekodowaniem

3. **Dopasowywanie odpowiedzi**:
   - Dopasuj odpowiedzi do poleceń po oczekiwanym typie pakietu:
     - `APP_START` → `PACKET_SELF_INFO`
     - `DEVICE_QUERY` → `PACKET_DEVICE_INFO`
     - `GET_CHANNEL` → `PACKET_CHANNEL_INFO`
     - `SET_CHANNEL` → `PACKET_OK` lub `PACKET_ERROR`
     - `SEND_CHANNEL_MESSAGE` → `PACKET_MSG_SENT`
     - `GET_MESSAGE` → `PACKET_CHANNEL_MSG_RECV`, `PACKET_CONTACT_MSG_RECV`, `PACKET_CHANNEL_DATA_RECV` lub `PACKET_NO_MORE_MSGS`
     - `SEND_CHANNEL_DATA` → `PACKET_OK` lub `PACKET_ERROR`
     - `GET_BATTERY` → `PACKET_BATTERY`

4. **Obsługa timeoutu**:
   - Domyślny timeout: 5 sekund na polecenie
   - Przy timeoucie: zaloguj błąd, wyczyść bieżące polecenie, przejdź do kolejnego w kolejce
   - Niektóre polecenia mogą trwać dłużej (np. `SET_CHANNEL` może potrzebować 1-2 sekund)
   - Rozważ dłuższy timeout dla operacji na kanałach

5. **Odzyskiwanie po błędzie**:
   - Przy `PACKET_ERROR`: zaloguj kod błędu, wyczyść bieżące polecenie
   - Przy utracie połączenia: wyczyść kolejkę poleceń, spróbuj ponownie się połączyć
   - Przy nieprawidłowej odpowiedzi: zaloguj ostrzeżenie, wyczyść bieżące polecenie, kontynuuj

---

## Przykładowy przebieg implementacji

### Inicjalizacja

```python
# 1. Skanuj w poszukiwaniu urządzenia MeshCore
device = scan_for_device("MeshCore")

# 2. Połącz się z GATT BLE
gatt = connect_to_device(device)

# 3. Odkryj usługi i charakterystyki
service = discover_service(gatt, "6E400001-B5A3-F393-E0A9-E50E24DCCA9E")
rx_char = discover_characteristic(service, "6E400002-B5A3-F393-E0A9-E50E24DCCA9E")
tx_char = discover_characteristic(service, "6E400003-B5A3-F393-E0A9-E50E24DCCA9E")

# 4. Włącz powiadomienia na charakterystyce TX
enable_notifications(tx_char, on_notification_received)

# 5. Wyślij polecenie AppStart
send_command(rx_char, build_app_start())
wait_for_response(PACKET_SELF_INFO)
```

### Tworzenie kanału prywatnego

```python
# 1. Wygeneruj 16-bajtowy sekret
secret_16_bytes = generate_secret(16)  # Użyj CSPRNG
secret_hex = secret_16_bytes.hex()

# 2. Zbuduj polecenie SET_CHANNEL
channel_name = "YourChannelName"
channel_index = 1  # Sprawdź, czy indeks jest mniejszy od max_channels
command = build_set_channel(channel_index, channel_name, secret_16_bytes)

# 3. Wyślij polecenie
send_command(rx_char, command)
response = wait_for_response(PACKET_OK)

# 4. Zapisz sekret lokalnie
store_channel_secret(channel_index, secret_hex)
```

### Wysyłanie wiadomości

```python
# 1. Zbuduj polecenie wiadomości kanałowej
channel_index = 1
message = "Hello, MeshCore!"
timestamp = int(time.time())
command = build_channel_message(channel_index, message, timestamp)

# 2. Wyślij polecenie
send_command(rx_char, command)
response = wait_for_response(PACKET_MSG_SENT)
```

### Odbieranie wiadomości

```python
def on_notification_received(data):
    packet_type = data[0]

    if packet_type == PACKET_CHANNEL_MSG_RECV or packet_type == PACKET_CHANNEL_MSG_RECV_V3:
        message = parse_channel_message(data)
        handle_channel_message(message)
    elif packet_type == PACKET_MESSAGES_WAITING:
        # Odpytaj o wiadomości
        send_command(rx_char, build_get_message())
```

---

## Dobre praktyki

1. **Zarządzanie połączeniem**:
   - Zaimplementuj automatyczne ponowne łączenie z wykładniczym opóźnieniem
   - Zapisuj adres ostatnio połączonego urządzenia dla szybkiego ponownego połączenia

2. **Zarządzanie sekretami**:
   - Zawsze używaj kryptograficznie bezpiecznych generatorów liczb losowych
   - Przechowuj sekrety bezpiecznie (zaszyfrowana pamięć)
   - Nigdy nie loguj ani nie przesyłaj sekretów w postaci jawnego tekstu

3. **Obsługa wiadomości**:
   - Wyślij `CMD_SYNC_NEXT_MESSAGE`, gdy otrzymasz `PUSH_CODE_MSG_WAITING`
   - Zaimplementuj deduplikację wiadomości, aby uniknąć wyświetlenia tej samej wiadomości dwukrotnie

4. **Zarządzanie kanałami**:
    - Pobierz wszystkie sloty kanałów, nawet jeśli natrafisz na pusty slot
    - Najlepiej zapisuj nowe kanały w pierwszym pustym slocie

5. **Obsługa błędów**:
   - Zaimplementuj timeouty dla wszystkich poleceń (zwykle 5 sekund)
   - Odpowiednio obsługuj odpowiedzi `RESP_CODE_ERR`

---

## Rozwiązywanie problemów

### Problemy z połączeniem

- **Nie znaleziono urządzenia**: upewnij się, że urządzenie jest włączone i rozgłasza się
- **Timeout połączenia**: sprawdź uprawnienia Bluetooth i odległość od urządzenia
- **Błędy GATT**: upewnij się, że usługa/charakterystyki zostały prawidłowo odkryte

### Problemy z poleceniami

- **Brak odpowiedzi**: sprawdź, czy powiadomienia są włączone, sprawdź stan połączenia
- **Odpowiedzi błędów**: sprawdź format polecenia i kod błędu
- **Timeout**: zwiększ wartość timeoutu lub spróbuj ponownie

### Problemy z wiadomościami

- **Wiadomości nieodbierane**: odpytuj okresowo polecenie `GET_MESSAGE`
- **Zduplikowane wiadomości**: zaimplementuj deduplikację wiadomości, używając znacznika czasu/treści jako unikalnego identyfikatora
- **Ucinanie wiadomości**: wysyłaj długie wiadomości jako osobne, krótsze wiadomości
