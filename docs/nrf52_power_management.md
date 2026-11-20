---
title: Zarządzanie zasilaniem nRF52
description: Funkcje ochrony baterii i zarządzania zasilaniem w module nRF52 MeshCore.
order: 10
sourceUrl: https://docs.meshcore.io/nrf52_power_management
createdAt: 22.08.2026
updatedAt: 10.11.2026
---

# Zarządzanie zasilaniem nRF52

## Przegląd

Moduł zarządzania zasilaniem nRF52 sprawdza napięcie przy uruchomieniu i może zablokować rozruch przy zbyt słabej baterii. Ogranicza to ryzyko nieprawidłowej pracy i uszkodzenia pamięci flash przy spadkach napięcia (brownout). Obsługuje też zapis przyczyny wyłączenia oraz wybudzenie po wzroście napięcia lub podłączeniu zasilania. Nie zastępuje sprzętowego zabezpieczenia ogniwa przed nadmiernym rozładowaniem.

## Funkcje

### Ochrona napięcia przy starcie (Boot Voltage Protection)
- Sprawdza napięcie baterii natychmiast po starcie, jeszcze przed rozpoczęciem operacji sieci mesh
- Jeśli napięcie jest poniżej konfigurowalnego progu (np. 3300mV), urządzenie konfiguruje wybudzanie na podstawie napięcia (LPCOMP + VBUS) i przechodzi w ochronny stan wyłączenia (SYSTEMOFF)
- Zapobiega pętlom rozruchu przy krytycznie niskim poziomie baterii
- Pomijane, gdy wykryte zostanie zasilanie zewnętrzne (USB VBUS)

### Wybudzanie na podstawie napięcia (LPCOMP + VBUS)
- Konfiguruje komparator o niskim poborze mocy nRF52 (LPCOMP) przed przejściem w tryb SYSTEMOFF
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

Sama obecność kodu obsługi w wariancie nie oznacza, że funkcja jest włączona w gotowym firmware. Wymaga flagi `NRF52_POWER_MANAGEMENT` i konfiguracji pomiaru napięcia. Dostępność w swoim urządzeniu sprawdzisz poleceniem `get pwrmgt.support`.

Poniższe warianty mają w kodzie `checkBootVoltage()` i własną metodę `initiateShutdown()`:

| Wariant | Flaga w konfiguracji projektu |
|---------|-------------------------------|
| `xiao_nrf52` | wymaga włączenia |
| `rak4631` | wymaga włączenia |
| `rak3401` | wymaga włączenia |
| `heltec_t114` | wymaga włączenia |
| `heltec_t096` | wymaga włączenia |
| `heltec_t1` | włączona |
| `heltec_tower_v2` | włączona |
| `gat562_mesh_watch13` | wymaga włączenia |
| `gat562_mesh_evb_pro` | wymaga włączenia |
| `gat562_mesh_tracker_pro` | wymaga włączenia |
| `gat562_30s_mesh_kit` | wymaga włączenia |
| `sensecap_solar` | wymaga włączenia |
| `muziworks_r1_neo` | wymaga włączenia; próg blokady rozruchu ustawiony na 0 |
| `muzi_base` | włączona |

Stan tabeli dotyczy konfiguracji w sprawdzonym repozytorium firmware. Gotowy plik od innego dostawcy może mieć inne flagi.

Próg `voltage_bootlock = 0` wyłącza blokadę rozruchu. Kod pomija też odczyty nieprzekraczające 1000 mV, aby błędny pomiar nie wyłączał urządzenia. Wybudzanie przez LPCOMP i VBUS zależy od konfiguracji sprzętu. Na Heltec T114 zwykłe wyłączenie przez użytkownika nie włącza LPCOMP.

## Szczegóły techniczne

### Architektura

Zarządzanie zasilaniem jest częścią klasy bazowej `NRF52Board` w pliku `src/helpers/NRF52Board.cpp`. Każdy wariant płytki określa konfigurację sprzętu w strukturze `PowerMgtConfig` i nadpisuje metodę `initiateShutdown(uint8_t reason)`. Metoda ta przygotowuje płytkę do wyłączenia i w razie potrzeby włącza wybudzanie przez LPCOMP + VBUS.

### Wczesny odczyt przy starcie

Statyczny konstruktor z priorytetem 101 w `NRF52Board.cpp` odczytuje rejestry RESETREAS i GPREGRET2 przed:
- SystemInit() (priorytet 102) - który czyści RESETREAS
- Statycznymi konstruktorami C++ (domyślny priorytet 65535)

Pozwala to zachować przyczynę resetu, zanim kod inicjalizacyjny wyczyści rejestry.

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
     bool enable_lpcomp = (reason == SHUTDOWN_REASON_LOW_VOLTAGE || reason == SHUTDOWN_REASON_BOOT_PROTECT);
     if (enable_lpcomp) {
       configureVoltageWake(power_config.lpcomp_ain_channel, power_config.lpcomp_refsel);
     }

     enterSystemOff(reason);
   }
   #endif

   void MyBoard::begin() {
     NRF52Board::begin(); // lub NRF52BoardDCDC::begin()
     // ... konfiguracja płytki ...

   #ifdef NRF52_POWER_MANAGEMENT
     checkBootVoltage(&power_config);
   #endif
   }
   ```

   Obsługę wyłączenia przez użytkownika nadal zapewnia metoda `powerOff()` danej płytki. Zarządzanie zasilaniem włącza wybudzanie LPCOMP tylko przy automatycznym wyłączeniu z powodu zbyt niskiego napięcia podczas startu lub pracy urządzenia.

4. **Zadeklaruj nadpisanie w pliku .h płytki**:
   ```cpp
   #ifdef NRF52_POWER_MANAGEMENT
     void initiateShutdown(uint8_t reason) override;
   #endif
   ```

### Konfiguracja wybudzania na podstawie napięcia

LPCOMP (komparator o niskim poborze mocy) jest skonfigurowany, aby:
- Monitorować wskazany kanał AIN: AIN0-AIN3 to P0.02-P0.05, AIN4-AIN7 to P0.28-P0.31
- Porównywać z ułamkiem napięcia referencyjnego VDD (REFSEL: 0-6=1/8..7/8, 7=ARef, 8-15=1/16..15/16)
- Wykrywać zdarzenia UP (wzrost napięcia powyżej progu)
- Używać histerezy 50mV dla odporności na szumy
- Wybudzać urządzenie ze stanu SYSTEMOFF po wyzwoleniu

Funkcja `configureVoltageWake()` włącza też wybudzanie przez zdarzenie USBDETECTED modułu POWER. Wymaga to doprowadzenia sygnału USB VBUS do nRF52, co jest typowe dla płytek nRF52840 z natywnym USB.

**Wybór referencji LPCOMP (PWRMGT_LPCOMP_REFSEL)**:

| REFSEL | Ułamek | VBAT przy dzielniku 1M/1M (VDD=3,0-3,3) | VBAT przy dzielniku 1,5M/1M (VDD=3,0-3,3) |
|--------|--------|-----------------------------------------|-------------------------------------------|
| 0      | 1/8    | 0,75-0,83 V                             | 0,94-1,03 V                               |
| 1      | 2/8    | 1,50-1,65 V                             | 1,88-2,06 V                               |
| 2      | 3/8    | 2,25-2,48 V                             | 2,81-3,09 V                               |
| 3      | 4/8    | 3,00-3,30 V                             | 3,75-4,13 V                               |
| 4      | 5/8    | 3,75-4,13 V                             | 4,69-5,16 V                               |
| 5      | 6/8    | 4,50-4,95 V                             | 5,63-6,19 V                               |
| 6      | 7/8    | 5,25-5,78 V                             | 6,56-7,22 V                               |
| 7      | ARef   | -                                       | -                                         |
| 8      | 1/16   | 0,38-0,41 V                             | 0,47-0,52 V                               |
| 9      | 3/16   | 1,13-1,24 V                             | 1,41-1,55 V                               |
| 10     | 5/16   | 1,88-2,06 V                             | 2,34-2,58 V                               |
| 11     | 7/16   | 2,63-2,89 V                             | 3,28-3,61 V                               |
| 12     | 9/16   | 3,38-3,71 V                             | 4,22-4,64 V                               |
| 13     | 11/16  | 4,13-4,54 V                             | 5,16-5,67 V                               |
| 14     | 13/16  | 4,88-5,36 V                             | 6,09-6,70 V                               |
| 15     | 15/16  | 5,63-6,19 V                             | 7,03-7,73 V                               |

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

Na płytkach bez włączonego zarządzania zasilaniem polecenia `get pwrmgt.source` i `get pwrmgt.bootmv` zwracają:
```
ERROR: Power management not supported
```

`get pwrmgt.support` zwraca wtedy `unsupported`. Polecenie `get pwrmgt.bootreason` działa na każdej płytce. Jeśli płytka nie udostępnia przyczyny resetu lub wyłączenia, odpowiednie pole ma wartość `Not available`. Na ESP32 dostępna jest przyczyna resetu, a przyczyna wyłączenia pozostaje niedostępna.

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
