---
title: Struktury binarnych ramek statystyk
navTitle: Ramki statystyk
description: Struktury binarnych ramek dla poleceń statystyk radia companiona MeshCore.
order: 9
sourceUrl: https://docs.meshcore.io/stats_binary_frames
createdAt: 22.08.2026
---

# Struktury binarnych ramek statystyk {toc: Ramki statystyk}

Struktury binarnych ramek dla poleceń statystyk radia companiona. Wszystkie wielobajtowe liczby całkowite używają kolejności bajtów little-endian.

## Kody poleceń

| Polecenie       | Kod | Opis                                                   |
|-----------------|-----|--------------------------------------------------------|
| `CMD_GET_STATS` | 56  | Pobierz statystyki (polecenie 2-bajtowe: kod + subtyp) |

### Subtypy statystyk

Polecenie `CMD_GET_STATS` używa 2-bajtowej struktury ramki:
- **Bajt 0:** `CMD_GET_STATS` (56)
- **Bajt 1:** subtyp statystyk:
  - `STATS_TYPE_CORE` (0) - pobierz podstawowe statystyki urządzenia
  - `STATS_TYPE_RADIO` (1) - pobierz statystyki radia
  - `STATS_TYPE_PACKETS` (2) - pobierz statystyki pakietów

## Kody odpowiedzi

| Odpowiedź         | Kod | Opis                                                          |
|-------------------|-----|---------------------------------------------------------------|
| `RESP_CODE_STATS` | 24  | Odpowiedź ze statystykami (odpowiedź 2-bajtowa: kod + subtyp) |

### Subtypy odpowiedzi statystyk

Odpowiedź `RESP_CODE_STATS` używa 2-bajtowej struktury nagłówka:
- **Bajt 0:** `RESP_CODE_STATS` (24)
- **Bajt 1:** subtyp statystyk (odpowiada subtypowi polecenia):
  - `STATS_TYPE_CORE` (0) - odpowiedź z podstawowymi statystykami urządzenia
  - `STATS_TYPE_RADIO` (1) - odpowiedź ze statystykami radia
  - `STATS_TYPE_PACKETS` (2) - odpowiedź ze statystykami pakietów

---

## RESP_CODE_STATS + STATS_TYPE_CORE (24, 0) {toc: STATS_TYPE_CORE (24, 0)}

**Całkowity rozmiar ramki:** 11 bajtów

| Offset | Rozmiar | Typ      | Nazwa pola    | Opis                                  | Zakres/Uwagi      |
|--------|---------|----------|---------------|---------------------------------------|-------------------|
| 0      | 1       | uint8_t  | response_code | Zawsze `0x18` (24)                    | -                 |
| 1      | 1       | uint8_t  | stats_type    | Zawsze `0x00` (STATS_TYPE_CORE)       | -                 |
| 2      | 2       | uint16_t | battery_mv    | Napięcie baterii w miliwoltach        | 0 - 65 535        |
| 4      | 4       | uint32_t | uptime_secs   | Czas działania urządzenia w sekundach | 0 - 4 294 967 295 |
| 8      | 2       | uint16_t | errors        | Maska bitowa flag błędów              | -                 |
| 10     | 1       | uint8_t  | queue_len     | Długość kolejki pakietów wychodzących | 0 - 255           |

### Przykładowa struktura (C/C++)

```c
struct StatsCore {
    uint8_t  response_code;  // 0x18
    uint8_t  stats_type;     // 0x00 (STATS_TYPE_CORE)
    uint16_t battery_mv;
    uint32_t uptime_secs;
    uint16_t errors;
    uint8_t  queue_len;
} __attribute__((packed));
```

---

## RESP_CODE_STATS + STATS_TYPE_RADIO (24, 1) {toc: STATS_TYPE_RADIO (24, 1)}

**Całkowity rozmiar ramki:** 14 bajtów

| Offset | Rozmiar | Typ      | Nazwa pola    | Opis                                    | Zakres/Uwagi                      |
|--------|---------|----------|---------------|-----------------------------------------|-----------------------------------|
| 0      | 1       | uint8_t  | response_code | Zawsze `0x18` (24)                      | -                                 |
| 1      | 1       | uint8_t  | stats_type    | Zawsze `0x01` (STATS_TYPE_RADIO)        | -                                 |
| 2      | 2       | int16_t  | noise_floor   | Poziom szumu radia w dBm                | od -140 do +10                    |
| 4      | 1       | int8_t   | last_rssi     | Ostatnia siła odbieranego sygnału w dBm | od -128 do +127                   |
| 5      | 1       | int8_t   | last_snr      | SNR przeskalowane przez 4               | podziel przez 4,0, aby uzyskać dB |
| 6      | 4       | uint32_t | tx_air_secs   | Skumulowany czas nadawania w sekundach  | 0 - 4 294 967 295                 |
| 10     | 4       | uint32_t | rx_air_secs   | Skumulowany czas odbioru w sekundach    | 0 - 4 294 967 295                 |

### Przykładowa struktura (C/C++)

```c
struct StatsRadio {
    uint8_t  response_code;  // 0x18
    uint8_t  stats_type;     // 0x01 (STATS_TYPE_RADIO)
    int16_t  noise_floor;
    int8_t   last_rssi;
    int8_t   last_snr;       // Podziel przez 4.0, aby uzyskać rzeczywiste SNR w dB
    uint32_t tx_air_secs;
    uint32_t rx_air_secs;
} __attribute__((packed));
```

---

## RESP_CODE_STATS + STATS_TYPE_PACKETS (24, 2) {toc: STATS_TYPE_PACKETS (24, 2)}

**Całkowity rozmiar ramki:** 26 bajtów (wersja starsza) lub 30 bajtów (zawiera `recv_errors`)

| Offset | Rozmiar | Typ      | Nazwa pola    | Opis                                                               | Zakres/Uwagi      |
|--------|---------|----------|---------------|--------------------------------------------------------------------|-------------------|
| 0      | 1       | uint8_t  | response_code | Zawsze `0x18` (24)                                                 | -                 |
| 1      | 1       | uint8_t  | stats_type    | Zawsze `0x02` (STATS_TYPE_PACKETS)                                 | -                 |
| 2      | 4       | uint32_t | recv          | Łączna liczba odebranych pakietów                                  | 0 - 4 294 967 295 |
| 6      | 4       | uint32_t | sent          | Łączna liczba wysłanych pakietów                                   | 0 - 4 294 967 295 |
| 10     | 4       | uint32_t | flood_tx      | Pakiety wysłane przez routing zalewowy (flood)                     | 0 - 4 294 967 295 |
| 14     | 4       | uint32_t | direct_tx     | Pakiety wysłane przez routing bezpośredni (direct)                 | 0 - 4 294 967 295 |
| 18     | 4       | uint32_t | flood_rx      | Pakiety odebrane przez routing zalewowy (flood)                    | 0 - 4 294 967 295 |
| 22     | 4       | uint32_t | direct_rx     | Pakiety odebrane przez routing bezpośredni (direct)                | 0 - 4 294 967 295 |
| 26     | 4       | uint32_t | recv_errors   | Błędy odbioru/CRC (RadioLib); obecne wyłącznie w 30-bajtowej ramce | 0 - 4 294 967 295 |

### Uwagi

- Liczniki są skumulowane od momentu uruchomienia i mogą się przepełnić.
- `recv = flood_rx + direct_rx`
- `sent = flood_tx + direct_tx`
- Klienci powinni akceptować ramki o długości ≥ 26; jeśli długość ≥ 30, sparsuj `recv_errors` z offsetu 26.

### Przykładowa struktura (C/C++)

```c
struct StatsPackets {
    uint8_t  response_code;  // 0x18
    uint8_t  stats_type;     // 0x02 (STATS_TYPE_PACKETS)
    uint32_t recv;
    uint32_t sent;
    uint32_t flood_tx;
    uint32_t direct_tx;
    uint32_t flood_rx;
    uint32_t direct_rx;
    uint32_t recv_errors;    // obecne, gdy rozmiar ramki wynosi 30
} __attribute__((packed));
```

---

## Przykład użycia polecenia (Python)

```python
# Wyślij polecenie CMD_GET_STATS
def send_get_stats_core(serial_interface):
    """Wysyła polecenie pobrania podstawowych statystyk"""
    cmd = bytes([56, 0])  # CMD_GET_STATS (56) + STATS_TYPE_CORE (0)
    serial_interface.write(cmd)

def send_get_stats_radio(serial_interface):
    """Wysyła polecenie pobrania statystyk radia"""
    cmd = bytes([56, 1])  # CMD_GET_STATS (56) + STATS_TYPE_RADIO (1)
    serial_interface.write(cmd)

def send_get_stats_packets(serial_interface):
    """Wysyła polecenie pobrania statystyk pakietów"""
    cmd = bytes([56, 2])  # CMD_GET_STATS (56) + STATS_TYPE_PACKETS (2)
    serial_interface.write(cmd)
```

---

## Przykład parsowania odpowiedzi (Python)

```python
import struct

def parse_stats_core(frame):
    """Parsuje ramkę RESP_CODE_STATS + STATS_TYPE_CORE (11 bajtów)"""
    response_code, stats_type, battery_mv, uptime_secs, errors, queue_len = \
        struct.unpack('<B B H I H B', frame)
    assert response_code == 24 and stats_type == 0, "Nieprawidłowy typ odpowiedzi"
    return {
        'battery_mv': battery_mv,
        'uptime_secs': uptime_secs,
        'errors': errors,
        'queue_len': queue_len
    }

def parse_stats_radio(frame):
    """Parsuje ramkę RESP_CODE_STATS + STATS_TYPE_RADIO (14 bajtów)"""
    response_code, stats_type, noise_floor, last_rssi, last_snr, tx_air_secs, rx_air_secs = \
        struct.unpack('<B B h b b I I', frame)
    assert response_code == 24 and stats_type == 1, "Nieprawidłowy typ odpowiedzi"
    return {
        'noise_floor': noise_floor,
        'last_rssi': last_rssi,
        'last_snr': last_snr / 4.0,  # Cofnięcie skalowania SNR
        'tx_air_secs': tx_air_secs,
        'rx_air_secs': rx_air_secs
    }

def parse_stats_packets(frame):
    """Parsuje ramkę RESP_CODE_STATS + STATS_TYPE_PACKETS (26 lub 30 bajtów)"""
    assert len(frame) >= 26, "Ramka STATS_TYPE_PACKETS jest zbyt krótka"
    response_code, stats_type, recv, sent, flood_tx, direct_tx, flood_rx, direct_rx = \
        struct.unpack('<B B I I I I I I', frame[:26])
    assert response_code == 24 and stats_type == 2, "Nieprawidłowy typ odpowiedzi"
    result = {
        'recv': recv,
        'sent': sent,
        'flood_tx': flood_tx,
        'direct_tx': direct_tx,
        'flood_rx': flood_rx,
        'direct_rx': direct_rx
    }
    if len(frame) >= 30:
        (recv_errors,) = struct.unpack('<I', frame[26:30])
        result['recv_errors'] = recv_errors
    return result
```

---

## Przykład użycia polecenia (JavaScript/TypeScript)

```typescript
// Wyślij polecenie CMD_GET_STATS
const CMD_GET_STATS = 56;
const STATS_TYPE_CORE = 0;
const STATS_TYPE_RADIO = 1;
const STATS_TYPE_PACKETS = 2;

function sendGetStatsCore(serialInterface: SerialPort): void {
    const cmd = new Uint8Array([CMD_GET_STATS, STATS_TYPE_CORE]);
    serialInterface.write(cmd);
}

function sendGetStatsRadio(serialInterface: SerialPort): void {
    const cmd = new Uint8Array([CMD_GET_STATS, STATS_TYPE_RADIO]);
    serialInterface.write(cmd);
}

function sendGetStatsPackets(serialInterface: SerialPort): void {
    const cmd = new Uint8Array([CMD_GET_STATS, STATS_TYPE_PACKETS]);
    serialInterface.write(cmd);
}
```

---

## Przykład parsowania odpowiedzi (JavaScript/TypeScript)

```typescript
interface StatsCore {
    battery_mv: number;
    uptime_secs: number;
    errors: number;
    queue_len: number;
}

interface StatsRadio {
    noise_floor: number;
    last_rssi: number;
    last_snr: number;
    tx_air_secs: number;
    rx_air_secs: number;
}

interface StatsPackets {
    recv: number;
    sent: number;
    flood_tx: number;
    direct_tx: number;
    flood_rx: number;
    direct_rx: number;
    recv_errors?: number;  // obecne, gdy ramka ma 30 bajtów
}

function parseStatsCore(buffer: ArrayBuffer): StatsCore {
    const view = new DataView(buffer);
    const response_code = view.getUint8(0);
    const stats_type = view.getUint8(1);
    if (response_code !== 24 || stats_type !== 0) {
        throw new Error('Nieprawidłowy typ odpowiedzi');
    }
    return {
        battery_mv: view.getUint16(2, true),
        uptime_secs: view.getUint32(4, true),
        errors: view.getUint16(8, true),
        queue_len: view.getUint8(10)
    };
}

function parseStatsRadio(buffer: ArrayBuffer): StatsRadio {
    const view = new DataView(buffer);
    const response_code = view.getUint8(0);
    const stats_type = view.getUint8(1);
    if (response_code !== 24 || stats_type !== 1) {
        throw new Error('Nieprawidłowy typ odpowiedzi');
    }
    return {
        noise_floor: view.getInt16(2, true),
        last_rssi: view.getInt8(4),
        last_snr: view.getInt8(5) / 4.0,  // Cofnięcie skalowania SNR
        tx_air_secs: view.getUint32(6, true),
        rx_air_secs: view.getUint32(10, true)
    };
}

function parseStatsPackets(buffer: ArrayBuffer): StatsPackets {
    const view = new DataView(buffer);
    if (buffer.byteLength < 26) {
        throw new Error('Ramka STATS_TYPE_PACKETS jest zbyt krótka');
    }
    const response_code = view.getUint8(0);
    const stats_type = view.getUint8(1);
    if (response_code !== 24 || stats_type !== 2) {
        throw new Error('Nieprawidłowy typ odpowiedzi');
    }
    const result: StatsPackets = {
        recv: view.getUint32(2, true),
        sent: view.getUint32(6, true),
        flood_tx: view.getUint32(10, true),
        direct_tx: view.getUint32(14, true),
        flood_rx: view.getUint32(18, true),
        direct_rx: view.getUint32(22, true)
    };
    if (buffer.byteLength >= 30) {
        result.recv_errors = view.getUint32(26, true);
    }
    return result;
}
```

---

## Uwagi dotyczące rozmiaru pól

- Liczniki pakietów (uint32_t): mogą się przepełnić po długotrwałej pracy przy dużym ruchu.
- Pola czasu (uint32_t): maksymalnie ~136 lat.
- SNR (int8_t, przeskalowane przez 4): zakres od -32 do +31,75 dB, precyzja 0,25 dB.

