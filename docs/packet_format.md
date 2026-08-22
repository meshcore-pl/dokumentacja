---
title: Format pakietu
description: Opis formatu pakietu protokołu MeshCore.
order: 6
sourceUrl: https://docs.meshcore.io/packet_format
createdAt: 2026-08-22
---

# Format pakietu

Ten dokument opisuje format pakietu MeshCore.

- `0xYY` oznacza `YY` w notacji szesnastkowej.
- `0bYY` oznacza `YY` w notacji binarnej.
- Bit 0 oznacza bit najbardziej wysunięty na prawo: `0000000X`
- Bit 7 oznacza bit najbardziej wysunięty na lewo: `X0000000`

## Format pakietu w wersji 1

To jest struktura pakietu na poziomie protokołu, używana w firmware MeshCore v1.12.0

```
[header][transport_codes(opcjonalnie)][path_length][path][payload]
```

- [header](#format-nagłówka) - 1 bajt
    - Format 8-bitowy: `0bVVPPPPRR` - `V=Version` - `P=PayloadType` - `R=RouteType`
    - Bity 0-1 - 2 bity - [Route Type](#typy-trasowania)
        - `0x00`/`0b00` - `ROUTE_TYPE_TRANSPORT_FLOOD` - routing zalewowy (Flood) + kody transportu
        - `0x01`/`0b01` - `ROUTE_TYPE_FLOOD` - routing zalewowy (Flood)
        - `0x02`/`0b10` - `ROUTE_TYPE_DIRECT` - routing bezpośredni (Direct)
        - `0x03`/`0b11` - `ROUTE_TYPE_TRANSPORT_DIRECT` - routing bezpośredni (Direct) + kody transportu
    - Bity 2-5 - 4 bity - [Payload Type](#typy-payload)
        - `0x00`/`0b0000` - `PAYLOAD_TYPE_REQ` - żądanie (hashe celu/źródła + MAC)
        - `0x01`/`0b0001` - `PAYLOAD_TYPE_RESPONSE` - odpowiedź na `REQ` lub `ANON_REQ`
        - `0x02`/`0b0010` - `PAYLOAD_TYPE_TXT_MSG` - zwykła wiadomość tekstowa
        - `0x03`/`0b0011` - `PAYLOAD_TYPE_ACK` - potwierdzenie
        - `0x04`/`0b0100` - `PAYLOAD_TYPE_ADVERT` - advert węzła
        - `0x05`/`0b0101` - `PAYLOAD_TYPE_GRP_TXT` - grupowa wiadomość tekstowa (niezweryfikowana)
        - `0x06`/`0b0110` - `PAYLOAD_TYPE_GRP_DATA` - grupowy datagram (niezweryfikowany)
        - `0x07`/`0b0111` - `PAYLOAD_TYPE_ANON_REQ` - żądanie anonimowe
        - `0x08`/`0b1000` - `PAYLOAD_TYPE_PATH` - zwrócona ścieżka
        - `0x09`/`0b1001` - `PAYLOAD_TYPE_TRACE` - trasowanie ścieżki, zbierające SNR dla każdego hopa
        - `0x0A`/`0b1010` - `PAYLOAD_TYPE_MULTIPART` - pakiet jest częścią sekwencji pakietów
        - `0x0B`/`0b1011` - `PAYLOAD_TYPE_CONTROL` - dane pakietu kontrolnego (nieszyfrowane)
        - `0x0C`/`0b1100` - zarezerwowane
        - `0x0D`/`0b1101` - zarezerwowane
        - `0x0E`/`0b1110` - zarezerwowane
        - `0x0F`/`0b1111` - `PAYLOAD_TYPE_RAW_CUSTOM` - pakiet niestandardowy (surowe bajty, niestandardowe szyfrowanie)
    - Bity 6-7 - 2 bity - [Payload Version](#wersje-payload)
        - `0x00`/`0b00` - v1 - 1-bajtowe hashe src/dest, 2-bajtowy MAC
        - `0x01`/`0b01` - v2 - przyszła wersja (np. 2-bajtowe hashe, 4-bajtowy MAC)
        - `0x02`/`0b10` - v3 - przyszła wersja
        - `0x03`/`0b11` - v4 - przyszła wersja
- `transport_codes` - 4 bajty (opcjonalnie)
    - Obecne tylko dla `ROUTE_TYPE_TRANSPORT_FLOOD` i `ROUTE_TYPE_TRANSPORT_DIRECT`
    - `transport_code_1` - 2 bajty - `uint16_t` - obliczany na podstawie zasięgu regionu
    - `transport_code_2` - 2 bajty - `uint16_t` - zarezerwowane
- `path_length` - 1 bajt - zakodowane metadane ścieżki
    - Bity 0-5 przechowują liczbę hashy ścieżki / liczbę hopów (`0-63`)
    - Bity 6-7 przechowują rozmiar hasha ścieżki pomniejszony o 1
        - `0b00`: 1-bajtowe hashe ścieżki
        - `0b01`: 2-bajtowe hashe ścieżki
        - `0b10`: 3-bajtowe hashe ścieżki
        - `0b11`: zarezerwowane / nieobsługiwane
- `path` - `hop_count * hash_size` bajtów - ścieżka używana do routingu bezpośredniego (Direct) lub śledzenia ścieżki zalewowej (flood)
    - Maksymalnie do 64 bajtów, zdefiniowane przez `MAX_PATH_SIZE`
    - Efektywna długość w bajtach jest obliczana na podstawie zakodowanej liczby hopów i rozmiaru hasha, a nie pobierana bezpośrednio z `path_length`
    - Firmware w wersji v1.12.0 i starszy obsługiwał wyłącznie stare, 1-bajtowe hashe ścieżki i odrzucał pakiety, których bajty ścieżki przekraczały [64 bajty](https://github.com/meshcore-dev/MeshCore/blob/e812632235274ffd2382adf5354168aec765d416/src/Dispatcher.cpp#L144)
- `payload` - zmienna długość - dane payloadu
    - Maksymalnie do 184 bajtów, zdefiniowane przez `MAX_PACKET_PAYLOAD`
    - Zazwyczaj jest to pozostała część surowych danych pakietu
    - Firmware parsuje te dane na podstawie podanego Payload Type
    - Firmware w wersji v1.12.0 i starszy odrzuca pakiety, których `payload` jest [większy niż 184 bajty](https://github.com/meshcore-dev/MeshCore/blob/e812632235274ffd2382adf5354168aec765d416/src/Dispatcher.cpp#L152)

### Format pakietu

| Pole            | Rozmiar (bajty)               | Opis                                                                     |
|-----------------|-------------------------------|--------------------------------------------------------------------------|
| header          | 1                             | Zawiera typ trasowania, typ payloadu i wersję payloadu                   |
| transport_codes | 4 (opcjonalnie)               | 2x 16-bitowe kody transportu (jeśli ROUTE_TYPE_TRANSPORT_*)              |
| path_length     | 1                             | Koduje rozmiar hasha ścieżki w bitach 6-7 oraz liczbę hopów w bitach 0-5 |
| path            | do 64 (`MAX_PATH_SIZE`)       | Przechowuje `hop_count * hash_size` bajtów danych ścieżki, jeśli dotyczy |
| payload         | do 184 (`MAX_PACKET_PAYLOAD`) | Dane dla podanego Payload Type                                           |

> UWAGA: więcej informacji o zawartości poszczególnych typów payloadów znajdziesz w dokumentacji [Payloads](./payloads.md).

### Format nagłówka

Bit 0 oznacza najniższy bit (miejsce jedności)

| Bity | Maska  | Pole            | Opis                           |
|------|--------|-----------------|--------------------------------|
| 0-1  | `0x03` | Route Type      | Flood, Direct itd.             |
| 2-5  | `0x3C` | Payload Type    | Request, Response, ACK itd.    |
| 6-7  | `0xC0` | Payload Version | Wersjonowanie formatu payloadu |

### Typy trasowania

| Wartość | Nazwa                         | Opis                                           |
|---------|-------------------------------|------------------------------------------------|
| `0x00`  | `ROUTE_TYPE_TRANSPORT_FLOOD`  | Routing zalewowy (Flood) + kody transportu     |
| `0x01`  | `ROUTE_TYPE_FLOOD`            | Routing zalewowy (Flood)                       |
| `0x02`  | `ROUTE_TYPE_DIRECT`           | Routing bezpośredni (Direct)                   |
| `0x03`  | `ROUTE_TYPE_TRANSPORT_DIRECT` | Routing bezpośredni (Direct) + kody transportu |

### Kodowanie długości ścieżki (Path Length)

`path_length` nie jest surową liczbą bajtów. Zawiera w sobie zarówno rozmiar hasha, jak i liczbę hopów:

| Bity | Pole               | Znaczenie                          |
|------|--------------------|------------------------------------|
| 0-5  | Liczba hopów       | Liczba hashy ścieżki (`0-63`)      |
| 6-7  | Kod rozmiaru hasha | Przechowywany jako `hash_size - 1` |

Kody rozmiaru hasha:

| Bity 6-7 | Rozmiar hasha | Uwagi                          |
|----------|---------------|--------------------------------|
| `0b00`   | 1 bajt        | Tryb starszy / domyślny        |
| `0b01`   | 2 bajty       | Obsługiwane w obecnym firmware |
| `0b10`   | 3 bajty       | Obsługiwane w obecnym firmware |
| `0b11`   | 4 bajty       | Zarezerwowane / nieprawidłowe  |

Przykłady:

- `0x00`: pakiet zero-hop, brak bajtów ścieżki
- `0x05`: 5 hopów z użyciem 1-bajtowych hashy, więc ścieżka ma 5 bajtów
- `0x45`: 5 hopów z użyciem 2-bajtowych hashy, więc ścieżka ma 10 bajtów
- `0x8A`: 10 hopów z użyciem 3-bajtowych hashy, więc ścieżka ma 30 bajtów

### Typy payload

| Wartość | Nazwa                     | Opis                                                             |
|---------|---------------------------|------------------------------------------------------------------|
| `0x00`  | `PAYLOAD_TYPE_REQ`        | Żądanie (hashe celu/źródła + MAC)                                |
| `0x01`  | `PAYLOAD_TYPE_RESPONSE`   | Odpowiedź na `REQ` lub `ANON_REQ`                                |
| `0x02`  | `PAYLOAD_TYPE_TXT_MSG`    | Zwykła wiadomość tekstowa                                        |
| `0x03`  | `PAYLOAD_TYPE_ACK`        | Potwierdzenie                                                    |
| `0x04`  | `PAYLOAD_TYPE_ADVERT`     | Advert węzła                                                     |
| `0x05`  | `PAYLOAD_TYPE_GRP_TXT`    | Grupowa wiadomość tekstowa (niezweryfikowana)                    |
| `0x06`  | `PAYLOAD_TYPE_GRP_DATA`   | Grupowy datagram (niezweryfikowany)                              |
| `0x07`  | `PAYLOAD_TYPE_ANON_REQ`   | Żądanie anonimowe                                                |
| `0x08`  | `PAYLOAD_TYPE_PATH`       | Zwrócona ścieżka                                                 |
| `0x09`  | `PAYLOAD_TYPE_TRACE`      | Trasowanie ścieżki, zbierające SNR dla każdego hopa              |
| `0x0A`  | `PAYLOAD_TYPE_MULTIPART`  | Pakiet jest częścią sekwencji pakietów                           |
| `0x0B`  | `PAYLOAD_TYPE_CONTROL`    | Dane pakietu kontrolnego (nieszyfrowane)                         |
| `0x0C`  | zarezerwowane             | zarezerwowane                                                    |
| `0x0D`  | zarezerwowane             | zarezerwowane                                                    |
| `0x0E`  | zarezerwowane             | zarezerwowane                                                    |
| `0x0F`  | `PAYLOAD_TYPE_RAW_CUSTOM` | Pakiet niestandardowy (surowe bajty, niestandardowe szyfrowanie) |

### Wersje payload

| Wartość | Wersja | Opis                                                 |
|---------|--------|------------------------------------------------------|
| `0x00`  | 1      | 1-bajtowe hashe src/dest, 2-bajtowy MAC              |
| `0x01`  | 2      | Przyszła wersja (np. 2-bajtowe hashe, 4-bajtowy MAC) |
| `0x02`  | 3      | Przyszła wersja                                      |
| `0x03`  | 4      | Przyszła wersja                                      |
