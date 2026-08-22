---
title: Zarządzanie zasilaniem nRF52
description: Funkcje ochrony baterii i zarządzania zasilaniem w module nRF52 MeshCore.
order: 10
sourceUrl: https://docs.meshcore.io/nrf52_power_management
createdAt: 22.08.2026
---

# Zarządzanie zasilaniem nRF52

## Przegląd

Moduł zarządzania zasilaniem nRF52 zapewnia funkcje ochrony baterii, które zapobiegają nadmiernemu rozładowaniu, minimalizują ryzyko wystąpienia stanów brownout i uszkodzenia pamięci flash oraz umożliwiają bezpieczne wybudzanie na podstawie napięcia.

## Funkcje

### Ochrona napięcia przy starcie (Boot Voltage Protection)
- Sprawdza napięcie baterii natychmiast po starcie, jeszcze przed rozpoczęciem operacji sieci mesh
- Jeśli napięcie jest poniżej konfigurowalnego progu (np. 3300mV), urządzenie konfiguruje wybudzanie na podstawie napięcia (LPCOMP + VBUS) i przechodzi w ochronny stan wyłączenia (SYSTEMOFF)
- Zapobiega pętlom rozruchu przy krytycznie niskim poziomie baterii
- Pomijane, gdy wykryte zostanie zasilanie zewnętrzne (USB VBUS)

### Wybudzanie na podstawie napięcia (LPCOMP + VBUS)
- Konfiguruje komparator niskiego poboru mocy nRF52 (LPCOMP) przed przejściem w tryb SYSTEMOFF
- Włącza wykrywanie USB VBUS, dzięki czemu zasilanie zewnętrzne może wybudzić urządzenie
- Urządzenie automatycznie wybudza się, gdy napięcie baterii wzrośnie powyżej progu odzyskiwania lub gdy wykryte zostanie VBUS

### Wczesny odczyt rejestrów przy starcie
- Odczytuje rejestry RESETREAS (powód resetu) i GPREGRET2 (powód wyłączenia) zanim SystemInit() je wyczyści
- Pozwala firmware ustalić, dlaczego nastąpił rozruch (zimny start, watchdog, wybudzenie z LPCOMP itd.)
- Pozwala firmware ustalić, dlaczego nastąpiło ostatnie wyłączenie (żądanie użytkownika, niskie napięcie, ochrona przy starcie)

### Śledzenie powodu wyłączenia
Kody powodu wyłączenia (zapisywane w GPREGRET2):

| Kod  | Nazwa        | Opis                                                 |
|------|--------------|------------------------------------------------------|
| 0x00 | NONE         | Normalny rozruch / brak wcześniejszego wyłączenia    |
| 0x4C | LOW_VOLTAGE  | Osiągnięto próg niskiego napięcia w czasie działania |
| 0x55 | USER         | Użytkownik zażądał powerOff()                        |
| 0x42 | BOOT_PROTECT | Zadziałała ochrona napięcia przy starcie             |

## Obsługiwane płytki

| Płytka                                    | Zaimplementowane | Wybudzanie LPCOMP | Wybudzanie VBUS |
|-------------------------------------------|------------------|-------------------|-----------------|
| Seeed Studio XIAO nRF52840 (`xiao_nrf52`) | Tak              | Tak               | Tak             |
| RAK4631 (`rak4631`)                       | Tak              | Tak               | Tak             |
| Heltec T114 (`heltec_t114`)               | Tak              | Tak               | Tak             |
| GAT562 Mesh Watch13                       | Tak              | Tak               | Tak             |
| Promicro nRF52840                         | Nie              | Nie               | Nie             |
| RAK WisMesh Tag                           | Nie              | Nie               | Nie             |
| Heltec Mesh Solar                         | Nie              | Nie               | Nie             |
| LilyGo T-Echo / T-Echo Lite               | Nie              | Nie               | Nie             |
| SenseCAP Solar                            | Tak              | Tak               | Tak             |
| WIO Tracker L1 / L1 E-Ink                 | Nie              | Nie               | Nie             |
| WIO WM1110                                | Nie              | Nie               | Nie             |
| Mesh Pocket                               | Nie              | Nie               | Nie             |
| Nano G2 Ultra                             | Nie              | Nie               | Nie             |
| ThinkNode M1/M3/M6                        | Nie              | Nie               | Nie             |
| T1000-E                                   | Nie              | Nie               | Nie             |
| Ikoka Nano/Stick/Handheld (nRF)           | Nie              | Nie               | Nie             |
| Keepteen LT1                              | Nie              | Nie               | Nie             |
| Minewsemi ME25LS01                        | Nie              | Nie               | Nie             |

Uwagi:
- „Zaimplementowane” odnosi się do Fazy 1 (blokada rozruchu + odczyt powodu wyłączenia).
- Wyłączenie zainicjowane przez użytkownika na Heltec T114 nie włącza wybudzania LPCOMP.
- Wykrywanie VBUS służy do pomijania blokady rozruchu przy zasilaniu zewnętrznym, a wybudzanie VBUS jest konfigurowane razem z LPCOMP, gdy obsługiwany sprzęt udostępnia VBUS do nRF52.

## Szczegóły techniczne

### Architektura

Funkcjonalność zarządzania zasilaniem jest zintegrowana z klasą bazową `NRF52Board` w `src/helpers/NRF52Board.cpp`. Warianty płytek dostarczają konfigurację specyficzną dla sprzętu za pomocą struktury `PowerMgtConfig` i nadpisują `initiateShutdown(uint8_t reason)`, aby wykonać operacje wyłączania specyficzne dla danej płytki oraz warunkowo włączyć wybudzanie na podstawie napięcia (LPCOMP + VBUS).

### Wczesny odczyt przy starcie

Statyczny konstruktor z priorytetem 101 w `NRF52Board.cpp` odczytuje rejestry RESETREAS i GPREGRET2 przed:
- SystemInit() (priorytet 102) - który czyści RESETREAS
- Statycznymi konstruktorami C++ (domyślny priorytet 65535)

Zapewnia to odczyt prawdziwego powodu resetu, zanim uruchomi się jakikolwiek kod inicjalizacyjny.

### Implementacja na płytce

Aby włączyć zarządzanie zasilaniem w wariancie płytki:

1. **Włącz w platformio.ini**:
   ```ini
   -D NRF52_POWER_MANAGEMENT
   ```

2. **Zdefiniuj konfigurację w variant.h**:
   ```c
   #define PWRMGT_VOLTAGE_BOOTLOCK    3300   // Nie uruchomi się poniżej tego napięcia (mV)
   #define PWRMGT_LPCOMP_AIN          7      // Kanał AIN do pomiaru napięcia
   #define PWRMGT_LPCOMP_REFSEL       2      // REFSEL (0-6=1/8..7/8, 7=ARef, 8-15=1/16..15/16)
   ```

3. **Zaimplementuj w pliku .cpp płytki**:
   ```cpp
   #ifdef NRF52_POWER_MANAGEMENT
   const PowerMgtConfig power_config = {
     .lpcomp_ain_channel = PWRMGT_LPCOMP_AIN,
     .lpcomp_refsel = PWRMGT_LPCOMP_REFSEL,
     .voltage_bootlock = PWRMGT_VOLTAGE_BOOTLOCK
   };

   void MyBoard::initiateShutdown(uint8_t reason) {
     // Przygotowanie do wyłączenia specyficzne dla płytki (np. wyłączenie peryferiów)
     bool enable_lpcomp = (reason == SHUTDOWN_REASON_LOW_VOLTAGE ||
                           reason == SHUTDOWN_REASON_BOOT_PROTECT);

     if (enable_lpcomp) {
       configureVoltageWake(power_config.lpcomp_ain_channel, power_config.lpcomp_refsel);
     }

     enterSystemOff(reason);
   }
   #endif

   void MyBoard::begin() {
     NRF52Board::begin();  // lub NRF52BoardDCDC::begin()
     // ... konfiguracja płytki ...

   #ifdef NRF52_POWER_MANAGEMENT
     checkBootVoltage(&power_config);
   #endif
   }
   ```

   W przypadku wyłączeń zainicjowanych przez użytkownika, `powerOff()` pozostaje specyficzny dla płytki. Zarządzanie zasilaniem uzbraja LPCOMP wyłącznie dla automatycznych powodów wyłączenia (ochrona przy starcie/niskie napięcie).

4. **Zadeklaruj nadpisanie w pliku .h płytki**:
   ```cpp
   #ifdef NRF52_POWER_MANAGEMENT
     void initiateShutdown(uint8_t reason) override;
   #endif
   ```

### Konfiguracja wybudzania na podstawie napięcia

LPCOMP (komparator niskiego poboru mocy) jest skonfigurowany, aby:
- Monitorować wskazany kanał AIN (0-7 odpowiadający P0.02-P0.05, P0.28-P0.31)
- Porównywać z ułamkiem napięcia referencyjnego VDD (REFSEL: 0-6=1/8..7/8, 7=ARef, 8-15=1/16..15/16)
- Wykrywać zdarzenia UP (wzrost napięcia powyżej progu)
- Używać histerezy 50mV dla odporności na szumy
- Wybudzać urządzenie ze stanu SYSTEMOFF po wyzwoleniu

Wybudzanie VBUS jest włączane za pomocą zdarzenia USBDETECTED peryferium POWER, zawsze gdy używana jest funkcja `configureVoltageWake()`. Wymaga to doprowadzenia USB VBUS do nRF52 (typowe na płytkach nRF52840 z natywnym USB).

**Wybór referencji LPCOMP (PWRMGT_LPCOMP_REFSEL)**:

| REFSEL | Ułamek | VBAT przy dzielniku 1M/1M (VDD=3,0-3,3) | VBAT przy dzielniku 1,5M/1M (VDD=3,0-3,3) |
|--------|--------|-----------------------------------------|-------------------------------------------|
| 0      | 1/8    | 0,75-0,82 V                             | 0,94-1,03 V                               |
| 1      | 2/8    | 1,50-1,65 V                             | 1,88-2,06 V                               |
| 2      | 3/8    | 2,25-2,47 V                             | 2,81-3,09 V                               |
| 3      | 4/8    | 3,00-3,30 V                             | 3,75-4,12 V                               |
| 4      | 5/8    | 3,75-4,12 V                             | 4,69-5,16 V                               |
| 5      | 6/8    | 4,50-4,95 V                             | 5,62-6,19 V                               |
| 6      | 7/8    | 5,25-5,77 V                             | 6,56-7,22 V                               |
| 7      | ARef   | -                                       | -                                         |
| 8      | 1/16   | 0,38-0,41 V                             | 0,47-0,52 V                               |
| 9      | 3/16   | 1,12-1,24 V                             | 1,41-1,55 V                               |
| 10     | 5/16   | 1,88-2,06 V                             | 2,34-2,58 V                               |
| 11     | 7/16   | 2,62-2,89 V                             | 3,28-3,61 V                               |
| 12     | 9/16   | 3,38-3,71 V                             | 4,22-4,64 V                               |
| 13     | 11/16  | 4,12-4,54 V                             | 5,16-5,67 V                               |
| 14     | 13/16  | 4,88-5,36 V                             | 6,09-6,70 V                               |
| 15     | 15/16  | 5,62-6,19 V                             | 7,03-7,73 V                               |

**Ważne**: dla płytek z dzielnikiem napięcia na pinie pomiaru baterii, LPCOMP mierzy napięcie po podziale. Użyj:
`VBAT_threshold ≈ (VDD * fraction) * divider_scale`, gdzie `divider_scale = (Rtop + Rbottom) / Rbottom` (np. 2,0 dla 1M/1M, 2,5 dla 1,5M/1M, 3,0 dla XIAO).

### Kompatybilność z SoftDevice

Kod zarządzania zasilaniem sprawdza, czy SoftDevice jest włączony, i używa odpowiedniego API:
- Gdy SD jest włączony: funkcje `sd_power_*`
- Gdy SD jest wyłączony: bezpośredni dostęp do rejestrów (NRF_POWER->*)

Zapewnia to kompatybilność niezależnie od stanu stosu BLE.

## Polecenia CLI

Status zarządzania zasilaniem można sprawdzić za pomocą CLI:

| Polecenie               | Opis                                                                 |
|-------------------------|----------------------------------------------------------------------|
| `get pwrmgt.support`    | Zwraca „supported” lub „unsupported”                                 |
| `get pwrmgt.source`     | Zwraca aktualne źródło zasilania - „battery” lub „external” (5V/USB) |
| `get pwrmgt.bootreason` | Zwraca opis powodu resetu i wyłączenia                               |
| `get pwrmgt.bootmv`     | Zwraca napięcie przy starcie w miliwoltach                           |

Na płytkach bez włączonego zarządzania zasilaniem wszystkie polecenia oprócz `get pwrmgt.support` zwracają:
```
ERROR: Power management not supported
```

## Wyjście debugowania

Gdy włączone jest `MESH_DEBUG=1`, moduł zarządzania zasilaniem wypisuje:
```
DEBUG: PWRMGT: Reset = Wake from LPCOMP (0x20000); Shutdown = Low Voltage (0x4C)
DEBUG: PWRMGT: Boot voltage = 3450 mV (threshold = 3300 mV)
DEBUG: PWRMGT: LPCOMP wake configured (AIN7, ref=3/8 VDD)
```

## Faza 2 (planowana)

- Monitorowanie napięcia w czasie działania
- Maszyna stanów napięcia (Normalny -> Ostrzeżenie -> Krytyczny -> Wyłączenie)
- Konfigurowalne progi
- Callbacki odciążania (load shedding) w celu redukcji poboru mocy
- Integracja z głębokim uśpieniem (deep sleep)
- Planowane wybudzanie
- Wydłużone uśpienie z okresowym monitorowaniem

## Odnośniki

- [nRF52840 Product Specification - POWER](https://infocenter.nordicsemi.com/topic/ps_nrf52840/power.html)
- [nRF52840 Product Specification - LPCOMP](https://infocenter.nordicsemi.com/topic/ps_nrf52840/lpcomp.html)
- [SoftDevice S140 API - Power Management](https://infocenter.nordicsemi.com/topic/sdk_nrf5_v17.1.0/group__nrf__sdm__api.html)
