---
title: Polecenia CLI
description: Polecenia CLI MeshCore dla repeaterów, room serwerów i sensorów. Poznaj składnię komend, konfigurację radia, zarządzanie urządzeniem i diagnostykę sieci.
order: 2
sourceUrl: https://docs.meshcore.io/cli_commands
createdAt: 22.08.2026
updatedAt: 10.11.2026
---

# Polecenia CLI

Ten dokument zawiera listę poleceń CLI dostępnych dla repeaterów, room serwerów i czujników MeshCore.

Dostępność poleceń i wartości domyślne zależą od roli urządzenia oraz opcji kompilacji. Zakres przyjmowany przez CLI nie oznacza, że każdy układ radiowy obsłuży wszystkie te wartości.

## Nawigacja

- [Operacyjne](#operacyjne)
- [Sąsiedzi](#sasiedzi-tylko-repeater)
- [Statystyki](#statystyki)
- [Logowanie](#logowanie)
- [Informacje](#informacje)
- [Konfiguracja](#konfiguracja)
  - [Radio](#radio)
  - [System](#system)
  - [Routing](#routing)
  - [ACL](#acl)
  - [Zarządzanie regionami](#zarzadzanie-regionami-v110)
    - [Przykłady regionów](#przyklady-regionow)
  - [GPS](#gps-gdy-obsluga-gps-jest-wkompilowana)
  - [Czujniki](#czujniki-gdy-obsluga-czujnikow-jest-wkompilowana)
  - [Bridge](#bridge-gdy-obsluga-bridge-jest-wkompilowana)

---

## Operacyjne

### Restart węzła
**Użycie:**
- `reboot`

**Uwaga:** nie jest wysyłana żadna odpowiedź.

---

### Wyłączenie węzła
**Użycie:**
- `poweroff` lub `shutdown`

**Uwaga:** nie jest wysyłana żadna odpowiedź.

---

### Reset zegara i restart
**Użycie:**
- `clkreboot`

**Uwaga:** nie jest wysyłana żadna odpowiedź.

---

### Synchronizacja zegara ze zdalnym urządzeniem
**Użycie:**
- `clock sync`

Zegar jest aktualizowany tylko wtedy, gdy odebrany czas jest późniejszy od bieżącego.

---

### Wyświetlenie aktualnego czasu w UTC
**Użycie:**
- `clock`

---

### Ustawienie czasu na konkretny znacznik czasu
**Użycie:**
- `time <epoch_seconds>`

**Parametry:**
- `epoch_seconds`: czas w formacie epoch Unix; polecenie przesuwa zegar tylko do przodu

---

### Wysłanie advertu do wszystkich
**Użycie:**
- `advert`

---

### Wysłanie advertu 0-hop
**Użycie:**
- `advert.zerohop`

---

### Rozpoczęcie aktualizacji firmware przez OTA (Over-The-Air)
**Użycie:**
- `start ota`

---

### Wymazanie/przywrócenie ustawień fabrycznych
**Użycie:**
- `erase`

**Tylko przez port szeregowy:** Tak

**Ostrzeżenie:** _**To działanie jest nieodwracalne!**_

---

## Sąsiedzi (tylko Repeater)

### Lista pobliskich sąsiadów
**Użycie:**
- `neighbors`

**Uwaga:** sąsiedzi są sortowani od ostatnio słyszanych. Odpowiedź ma ograniczoną długość, więc liczba wpisów zależy od długości ich danych.

**Format:** `{pubkey-prefix}:{seconds-ago}:{snr*4}`. Prefiks ma 4 bajty zapisane jako 8 znaków hex. Drugie pole oznacza liczbę sekund od ostatniego odbioru, a nie znacznik czasu Unix.

---

### Usunięcie sąsiada
**Użycie:**
- `neighbor.remove <pubkey_prefix>`

**Parametry:**
- `pubkey_prefix`: klucz publiczny węzła do usunięcia z listy sąsiadów. Może to być krótki prefiks lub pełny klucz. Wszyscy sąsiedzi pasujący do podanego prefiksu zostaną usunięci.

**Uwaga:** możesz usunąć wszystkich sąsiadów, wysyłając znak spacji jako prefiks. Spacja oznacza pusty prefiks, który pasuje do wszystkich istniejących sąsiadów.

---

### Odkrywanie sąsiadów 0-hop

**Użycie:**
- `discover.neighbors`

---

## Statystyki

### Wyczyszczenie statystyk
**Użycie:** `clear stats`

---

### Statystyki systemowe - bateria, czas działania, długość kolejki i flagi debugowania
**Użycie:**
- `stats-core`

**Tylko przez port szeregowy:** Tak

---

### Statystyki radia - poziom szumu, ostatnie RSSI/SNR, czas nadawania, błędy odbioru
**Użycie:** `stats-radio`

**Tylko przez port szeregowy:** Tak

---

### Statystyki pakietów - liczniki pakietów: odebrane, wysłane
**Użycie:** `stats-packets`

**Tylko przez port szeregowy:** Tak

---

## Logowanie

### Rozpoczęcie zapisu logu rx do pamięci węzła
**Użycie:** `log start`

---

### Zakończenie zapisu logu rx do pamięci węzła
**Użycie:** `log stop`

---

### Wymazanie zapisanego logu
**Użycie:** `log erase`

---

### Wypisanie zapisanego logu w terminalu szeregowym
**Użycie:** `log`

**Tylko przez port szeregowy:** Tak

---

## Informacje

### Pobranie wersji
**Użycie:** `ver`

---

### Pokazanie nazwy sprzętu
**Użycie:** `board`

---

## Konfiguracja

### Radio

#### Podgląd lub zmiana parametrów radiowych tego węzła
**Użycie:**
- `get radio`
- `set radio <freq>,<bw>,<sf>,<cr>`

**Parametry:**
- `freq`: częstotliwość w MHz
- `bw`: szerokość pasma w kHz
- `sf`: współczynnik rozpraszania (5-12)
- `cr`: współczynnik kodowania (5-8)

**Ustawiane flagą kompilacji:** `LORA_FREQ`, `LORA_BW`, `LORA_SF`, `LORA_CR`

**Domyślnie:** `869.618,62.5,8,5`

**Uwaga:** wymaga restartu, aby zmiana zaczęła obowiązywać

---

#### Podgląd lub zmiana mocy nadawania tego węzła
**Użycie:**
- `get tx`
- `set tx <dbm>`

**Parametry:**
- `dbm`: ustawienie mocy w dBm. Dozwolony zakres i rzeczywista moc wyjściowa zależą od układu radiowego, płytki i ewentualnego wzmacniacza. CLI nie narzuca wspólnego limitu 1-22 dBm.

**Ustawiane flagą kompilacji:** `LORA_TX_POWER`

**Domyślnie:** zależy od płytki

**Uwagi:** to ustawienie określa wyłącznie moc układu LoRa. Niektóre urządzenia mają dodatkowy wzmacniacz zwiększający moc wyjściową. Właściwą wartość sprawdź w instrukcji urządzenia. **Ustawienie zbyt wysokiej wartości może naruszać przepisy prawa w Twoim kraju.**

---

#### Zmiana parametrów radiowych na określony czas
**Użycie:**
- `tempradio <freq>,<bw>,<sf>,<cr>,<timeout_mins>`

**Parametry:**
- `freq`: częstotliwość w MHz (walidacja CLI: 150-2500; sprzęt musi obsługiwać wybrane pasmo)
- `bw`: szerokość pasma w kHz (walidacja CLI: 7-500; wybierz wartość obsługiwaną przez radio)
- `sf`: współczynnik rozpraszania (5-12)
- `cr`: współczynnik kodowania (5-8)
- `timeout_mins`: czas trwania w minutach (musi być > 0)

**Uwaga:** to ustawienie jest tymczasowe i zostanie usunięte po restarcie

---

#### Podgląd lub zmiana częstotliwości tego węzła
**Użycie:**
- `get freq`
- `set freq <frequency>`

**Parametry:**
- `frequency`: częstotliwość w MHz

**Domyślnie:** `869.618`

**Uwaga:** wymaga restartu, aby zmiana zaczęła obowiązywać
**Tylko przez port szeregowy:** `set freq <frequency>`

---

#### Podgląd lub zmiana trybu wzmocnionego wzmocnienia odbioru (rx boosted gain) tego węzła (SX12xx i LR1110, v1.14.1+)
**Użycie:**
- `get radio.rxgain`
- `set radio.rxgain <state>`

**Parametry:**
  - `state`: `on`|`off`

**Domyślnie:** `on`

**Uwaga tymczasowa:** jeśli zaktualizowałeś ze starszej wersji do 1.14.1 bez wymazywania pamięci flash, to ustawienie będzie miało wartość `off` z powodu [#2118](https://github.com/meshcore-dev/MeshCore/issues/2118)

---

#### Podgląd lub zmiana stanu wzmocnienia toru odbiorczego LoRa FEM na obsługiwanych płytkach
**Użycie:**
- `get radio.fem.rxgain`
- `set radio.fem.rxgain <state>`

**Parametry:**
- `state`: `on`|`off`

**Uwagi:**
- Steruje zewnętrznym wzmacniaczem LNA toru odbiorczego LoRa FEM na płytkach, które go obsługują.
- To ustawienie jest niezależne od `radio.rxgain`, które steruje trybem wzmocnienia odbioru samego układu radiowego.

---

#### Podgląd lub zmiana stanu wzmocnienia toru nadawczego LoRa FEM na obsługiwanych płytkach
**Użycie:**
- `get radio.fem.txgain`
- `set radio.fem.txgain <state>`

**Parametry:**
- `state`: `on`|`off`

**Uwagi:**
- Steruje sterowanym programowo zewnętrznym wzmocnieniem nadawczym LoRa FEM na płytkach, które je obsługują.
- Na Station G3 usuń zworkę PA PL1, aby umożliwić sterowanie programowe. `on` wybiera PA PL1 wysoko/krótko, a `off` wybiera PA PL1 nisko/otwarcie. Sprzętowa zworka PA PL2 określa, czy przełącza się między poziomami mocy 1/3 czy 2/4.
- Wybierz poziom pracy oraz moc nadawania SX1262 zgodne z lokalnymi limitami RF i wymaganiami zasilania Station G3.
- Ustawienie jest zapisywane natychmiast, ale na Station G3 poziom jest stosowany do sprzętu dopiero na początku kolejnej transmisji, dzięki czemu szyna zasilania PA nigdy nie jest przełączana w trakcie sterowania PA. `get` zwraca skonfigurowany stan, który może wyprzedzać sprzęt do czasu następnej transmisji węzła.

---

### System

#### Podgląd lub zmiana nazwy tego węzła
**Użycie:**
- `get name`
- `set name <name>`

**Parametry:**
- `name`: nazwa węzła

**Ustawiane flagą kompilacji:** `ADVERT_NAME`

**Domyślnie:** zależy od płytki

**Uwaga:** nazwa może mieć do 24 bajtów, jeśli ustawiono lokalizację, lub do 32 bajtów bez lokalizacji. Polskie litery i emoji mogą zajmować więcej niż jeden bajt w UTF-8.

---

#### Podgląd lub zmiana szerokości geograficznej tego węzła
**Użycie:**
- `get lat`
- `set lat <degrees>`

**Ustawiane flagą kompilacji:** `ADVERT_LAT`

**Domyślnie:** `0`

**Parametry:**
- `degrees`: szerokość geograficzna w stopniach

---

#### Podgląd lub zmiana długości geograficznej tego węzła
**Użycie:**
- `get lon`
- `set lon <degrees>`

**Ustawiane flagą kompilacji:** `ADVERT_LON`

**Domyślnie:** `0`

**Parametry:**
- `degrees`: długość geograficzna w stopniach

---

#### Podgląd lub zmiana tożsamości (klucza prywatnego) tego węzła
**Użycie:**
- `get prv.key`
- `set prv.key <private_key>`

**Parametry:**
- `private_key`: klucz prywatny w formacie hex (64 znaki hex)

**Tylko przez port szeregowy:**
- `get prv.key`: Tak
- `set prv.key`: Nie

**Uwaga:** zmiana zaczyna obowiązywać po restarcie.

---

#### Zmiana hasła administratora tego węzła
**Użycie:**
- `password <new_password>`

**Parametry:**
- `new_password`: nowe hasło administratora

**Ustawiane flagą kompilacji:** `ADMIN_PASSWORD`

**Domyślnie:** `password`

**Uwaga:** odpowiedź na polecenie zawiera zaktualizowane hasło jako potwierdzenie.

**Uwaga:** każdy węzeł używający tego hasła zostanie dodany do listy ACL administratorów.

---

#### Podgląd lub zmiana hasła gościa tego węzła
**Użycie:**
- `get guest.password`
- `set guest.password <password>`

**Parametry:**
- `password`: hasło gościa

**Ustawiane flagą kompilacji:** `ROOM_PASSWORD` (tylko Room serwer)

**Domyślnie:** zależy od wariantu firmware. Standardowe warianty Room serwer używają `hello`; w repeaterze pole jest domyślnie puste.

---

#### Podgląd lub zmiana informacji o właścicielu tego węzła
**Użycie:**
- `get owner.info`
- `set owner.info <text>`

**Parametry:**
- `text`: tekst informacji o właścicielu

**Domyślnie:** `<puste>`

**Uwaga:** znaki `|` są zamieniane na znaki nowej linii

**Uwaga:** wymaga firmware 1.12+

---

#### Precyzyjne dostrojenie odczytu baterii
**Użycie:**
- `get adc.multiplier`
- `set adc.multiplier <value>`

**Parametry:**
- `value`: mnożnik ADC (0.0-10.0)

**Domyślnie:** `0.0` (wartość zdefiniowana przez płytkę)

**Uwaga:** zwraca „Error: unsupported by this board”, jeśli sprzęt tego nie obsługuje

---

#### Podgląd klucza publicznego tego węzła
**Użycie:** `get public.key`

---

#### Podgląd wersji firmware tego węzła
**Użycie:** `ver`

---

#### Podgląd skonfigurowanej roli tego węzła
**Użycie:** `get role`

---

#### Podgląd lub zmiana flagi oszczędzania energii tego węzła (tylko Repeater)
**Użycie:**
- `powersaving`
- `powersaving on`
- `powersaving off`

**Parametry:**
- `on`: włącza oszczędzanie energii
- `off`: wyłącza oszczędzanie energii

**Domyślnie:** `off`

**Uwaga:** po włączeniu tej opcji urządzenie usypia między transmisjami radiowymi.

---

### Routing

#### Podgląd lub zmiana flagi przekazywania (repeat) tego węzła
**Użycie:**
- `get repeat`
- `set repeat <state>`

**Parametry:**
  - `state`: `on`|`off`

**Domyślnie:** `on`

---

#### Podgląd lub zmiana rozmiaru hasha ścieżki advertu tego węzła
**Użycie:**
- `get path.hash.mode`
- `set path.hash.mode <value>`

**Parametry:**
- `value`: rozmiar hasha ścieżki (0-2)
  - `0`: rozmiar hasha 1 bajt (256 unikalnych ID) [maks. 64 flood]
  - `1`: rozmiar hasha 2 bajty (65 536 unikalnych ID) [maks. 32 flood]
  - `2`: rozmiar hasha 3 bajty (16 777 216 unikalnych ID) [maks. 21 flood]
  - `3`: NIE UŻYWAJ (zarezerwowane)

**Domyślnie:** `0`

**Uwaga:** `path.hash.mode` określa rozmiar identyfikatora (hasha) ścieżki we własnych advertach repeatera. Nie zmienia rozmiarów hashy obsługiwanych przy przekazywaniu cudzych pakietów. Firmware >= 1.14 powinien przekazywać pakiety ze wszystkimi obsługiwanymi rozmiarami hashy. Funkcję dodano w wersji 1.14.

**Zgodność ze starszym firmware:** wersje 1.13.0 i starsze obsługują wyłącznie 1-bajtowe hashe ścieżki i odrzucają pakiety z dłuższymi hashami. Adverty z hashami 2- lub 3-bajtowymi mogą więc mieć ograniczony zasięg. Przed ich włączeniem upewnij się, że wystarczająca liczba repeaterów w sieci korzysta z firmware >= 1.14.

---

#### Podgląd lub zmiana wykrywania pętli tego węzła
**Użycie:**
- `get loop.detect`
- `set loop.detect <state>`

**Parametry:**
- `state`:
  - `off`: nie jest wykonywane żadne wykrywanie pętli
  - `minimal`: pakiety są odrzucane, jeśli ID/hash repeatera pojawia się 4 lub więcej razy (1 bajt), 2 lub więcej (2 bajty), 1 lub więcej (3 bajty)
  - `moderate`: pakiety są odrzucane, jeśli ID/hash repeatera pojawia się 2 lub więcej razy (1 bajt), 1 lub więcej (2 bajty), 1 lub więcej (3 bajty)
  - `strict`: pakiety są odrzucane, jeśli ID/hash repeatera pojawia się 1 lub więcej razy (1 bajt), 1 lub więcej (2 bajty), 1 lub więcej (3 bajty)

**Domyślnie:** `off`

**Uwaga:** funkcja wykrywa pakiety flood krążące w pętli i je odrzuca. Takie pętle obserwowano w sieciach z repeaterami używającymi zmodyfikowanego firmware. Zmiana payloadu przed przekazaniem może uniemożliwić rozpoznanie duplikatu i wywołać burzę pakietów trwającą do wyczerpania limitu hopów. Funkcję dodano w firmware 1.14.

**Przykład:** w trybie `loop.detect minimal` repeater liczy wystąpienia własnego identyfikatora w ścieżce. Odrzuca pakiet, gdy identyfikator występuje co najmniej 4 razy dla hashy 1-bajtowych, 2 razy dla 2-bajtowych lub raz dla 3-bajtowych.

---

#### Podgląd lub zmiana współczynnika opóźnienia retransmisji dla ruchu flood
**Użycie:**
- `get txdelay`
- `set txdelay <value>`

**Parametry:**
- `value`: współczynnik opóźnienia transmisji (0-2)

**Domyślnie:** `0.5`

**Uwaga:** gdy wiele pobliskich repeaterów słyszy ten sam pakiet flood, każdy z nich czeka losowy czas przed retransmisją, aby uniknąć jednoczesnych kolizji. Ten współczynnik skaluje rozmiar tego losowego okna. Wyższe wartości zmniejszają ryzyko kolizji kosztem dodatkowego opóźnienia. `0` całkowicie wyłącza to okno.

---

#### Podgląd lub zmiana współczynnika opóźnienia retransmisji dla ruchu bezpośredniego
**Użycie:**
- `get direct.txdelay`
- `set direct.txdelay <value>`

**Parametry:**
- `value`: współczynnik opóźnienia transmisji bezpośredniej (0-2)

**Domyślnie:** `0.3` (Repeater), `0.2` (Room serwer i Sensor)

**Uwaga:** to samo losowe okno unikania kolizji co `txdelay`, ale zastosowane do ruchu bezpośredniego (nie-flood, trasowanego). Wartość domyślna jest niższa, ponieważ pakiety bezpośrednie są adresowane do konkretnego następnego hopa, więc dużo mniej węzłów konkuruje o ich retransmisję.

---

#### [Eksperymentalne] Podgląd lub zmiana opóźnienia przetwarzania odebranego ruchu
**Użycie:**
- `get rxdelay`
- `set rxdelay <value>`

**Parametry:**
- `value`: bazowe opóźnienie odbioru (0-20)

**Domyślnie:** `0.0`

**Uwaga:** funkcja opóźnia przetwarzanie pakietów flood odebranych ze słabym sygnałem. Pakiety z silnym sygnałem są przetwarzane od razu, więc trasy o lepszym sygnale mają pierwszeństwo. Zanim upłynie opóźnienie, węzeł może odebrać kolejną kopię pakietu i odrzucić oczekującą kopię jako duplikat. Ogranicza to zbędne retransmisje.

---

#### Podgląd lub zmiana limitu cyklu pracy (duty cycle)
**Użycie:**
- `get dutycycle`
- `set dutycycle <value>`

**Parametry:**
- `value`: duty cycle w procentach (1-100)

**Domyślnie:** `50%` (odpowiednik współczynnika czasu nadawania 1.0)

**Przykłady:**
- `set dutycycle 100` - brak limitu duty cycle
- `set dutycycle 50` - duty cycle 50% (domyślnie)
- `set dutycycle 10` - duty cycle 10%
- `set dutycycle 1` - duty cycle 1%

> **Uwaga:** dodane w firmware v1.15.0

---

#### Podgląd lub zmiana współczynnika czasu nadawania (limit duty cycle)
> **Przestarzałe** od firmware v1.15.0. Zamiast tego użyj [`get/set dutycycle`](#podglad-lub-zmiana-limitu-cyklu-pracy-duty-cycle).

**Użycie:**
- `get af`
- `set af <value>`

**Parametry:**
- `value`: współczynnik czasu nadawania (0-9). Po każdej transmisji repeater wymusza okres ciszy w przybliżeniu równy czasowi nadawania na antenie pomnożonemu przez tę wartość. Daje to długoterminowy duty cycle w przybliżeniu równy 1 podzielonemu przez (1 plus ta wartość). Na przykład:
  - `af = 1` → ~50% duty
  - `af = 2` → ~33% duty
  - `af = 3` → ~25% duty
  - `af = 9` → ~10% duty
  Dobierz limit do konkretnego pasma i lokalnych przepisów.

**Domyślnie:** `1.0`

---

#### Podgląd lub zmiana lokalnego progu zakłóceń
**Użycie:**
- `get int.thresh`
- `set int.thresh <value>`

**Parametry:**
- `value`: wartość progu zakłóceń

**Domyślnie:** `0.0`

---

#### Włączenie lub wyłączenie sprzętowego wykrywania aktywności kanału (CAD)
**Użycie:**
- `get cad`
- `set cad <on|off>`

Przed nadawaniem radio sprawdza, czy kanał jest zajęty. Jeśli wykryje aktywność, odkłada transmisję. CAD działa niezależnie od `int.thresh`: można włączyć jedną z tych funkcji, obie albo żadną.

**Parametry:**
- `on|off`: włącza lub wyłącza sprzętowe CAD

**Domyślnie:** `off`

---

#### Podgląd lub zmiana interwału resetu AGC
**Użycie:**
- `get agc.reset.interval`
- `set agc.reset.interval <value>`

**Parametry:**
- `value`: interwał w sekundach, od 0 do 1020. Wartość jest zaokrąglana w dół do wielokrotności 4, np. 17 do 16. Wartość `0` wyłącza resetowanie AGC.

**Domyślnie:** `0.0`

---

#### Włączenie lub wyłączenie obsługi Multi-Acks
**Użycie:**
- `get multi.acks`
- `set multi.acks <state>`

**Parametry:**
- `state`: `0` (wyłącz) lub `1` (włącz)

**Domyślnie:** `0`

---

#### Podgląd lub zmiana interwału advertu do wszystkich
**Użycie:**
- `get flood.advert.interval`
- `set flood.advert.interval <hours>`

**Parametry:**
- `hours`: interwał od 3 do 168 godzin; `0` wyłącza automatyczne adverty do wszystkich

**Domyślnie:** `47` godzin (Repeater i Room serwer), `0`, czyli wyłączone (Sensor)

---

#### Podgląd lub zmiana interwału advertu 0-hop
**Użycie:**
- `get advert.interval`
- `set advert.interval <minutes>`

**Parametry:**
- `minutes`: interwał od 60 do 240 minut, zaokrąglany w dół do wielokrotności 2, np. 61 do 60; `0` wyłącza automatyczne adverty 0-hop

**Domyślnie:** `2` minuty na urządzeniu z ustawieniami fabrycznymi, a po zapisaniu konfiguracji `0` (wyłączone).

**Uwaga:** zapis dowolnego ustawienia zeruje interwał krótszy niż wymagane minimum 60 minut. Aby zachować automatyczne adverty 0-hop, ustaw wartość od 60 do 240.

---

#### Ograniczenie liczby hopów dla wiadomości flood
**Użycie:**
- `get flood.max`
- `set flood.max <value>`

**Parametry:**
- `value`: maksymalna liczba hopów flood (0-64)

**Domyślnie:** `64`

---

#### Ograniczenie liczby hopów dla wiadomości flood bez przypisanego regionu (unscoped)
**Użycie:**
- `get flood.max.unscoped`
- `set flood.max.unscoped <value>`

**Parametry:**
- `value`: maksymalna liczba hopów flood (0-64) dla pakietu bez przypisanego regionu

**Domyślnie:** `64` - wartość `0xFF` oznacza brak osobnego ustawienia; używana jest wtedy wartość `flood.max`.

**Uwaga:** zamiast `region denyf *` można ustawić niski limit `flood.max.unscoped`, np. `3`. Pozwala to przekazywać lokalne wiadomości bez przypisanego regionu, a jednocześnie ogranicza napływ takiego ruchu z odległych węzłów.

---

#### Ograniczenie liczby hopów dla advertów do wszystkich
**Użycie:**
- `get flood.max.advert`
- `set flood.max.advert <value>`

**Parametry:**
- `value`: maksymalna liczba hopów flood (0-64) dla pakietu advertu

**Domyślnie:** `8`

---

### ACL

#### Dodanie, aktualizacja lub usunięcie uprawnień dla companiona
**Użycie:**
- `setperm <pubkey> <permissions>`

**Parametry:**
- `pubkey`: klucz publiczny companiona
- `permissions`:
  - `0`: Gość
  - `1`: Tylko do odczytu
  - `2`: Odczyt i zapis
  - `3`: Administrator

**Uwaga:** aby usunąć zapisane uprawnienia, podaj `0`. Samo pominięcie argumentu nie jest poprawną składnią polecenia.

---

#### Podgląd aktualnej listy ACL
**Użycie:**
- `get acl`

**Tylko przez port szeregowy:** Tak

---

#### Podgląd lub zmiana flagi „tylko do odczytu” tego room serwera
**Użycie:**
- `get allow.read.only`
- `set allow.read.only <state>`

**Parametry:**
- `state`: `on` (włącz) lub `off` (wyłącz)

**Domyślnie:** `off`

---

### Zarządzanie regionami (v1.10.+)

#### Zbiorcze wczytywanie list regionów
**Użycie:**
- `region load`

**Parametry:**
Po uruchomieniu polecenia wpisuj regiony w kolejnych liniach. Pierwszy poziom wymaga jednej spacji na początku linii, kolejne poziomy odpowiednio dwóch, trzech itd., do siedmiu spacji. Dodaj `F` po nazwie, aby zezwolić nowemu regionowi na flood. Pusta linia kończy import.

Import zastępuje listę regionów. Dla regionów o istniejących nazwach zachowywane są wcześniejsze identyfikatory i flagi. Pracuj przez konsolę lokalną; do zmian zdalnych używaj `region put`, `region def`, `region allowf` i `region denyf`.

---

#### Zapisanie wszelkich zmian w regionach dokonanych od restartu
**Użycie:**
- `region save`

---

#### Zezwolenie na region
**Użycie:**
- `region allowf <name>`

**Parametry:**
- `name`: nazwa regionu (lub `*` dla wildcard)

**Uwaga:** ustawienie na wildcard `*` zezwala na pakiety bez kodów transportu regionu

---

#### Zablokowanie regionu
**Użycie:**
- `region denyf <name>`

**Parametry:**
- `name`: nazwa regionu (lub `*` dla wildcard)

**Uwaga:** ustawienie na wildcard `*` odrzuca pakiety bez kodów transportu regionu

---

#### Pokazanie informacji o regionie
**Użycie:**
- `region get <name>`

**Parametry:**
- `name`: nazwa regionu (lub `*` dla wildcard)

---

#### Podgląd lub zmiana regionu macierzystego (home) tego węzła
**Użycie:**
- `region home`
- `region home <name>`

**Parametry:**
- `name`: nazwa regionu

---

#### Podgląd lub zmiana domyślnego regionu zasięgu (scope) tego węzła
**Użycie:**
- `region default`
- `region default {name|<null>}`

**Parametry:**
- `name`: nazwa regionu, lub <null>, aby zresetować/wyczyścić

---

#### Utworzenie nowego regionu
**Użycie:**
- `region put <name> [parent_name]`

**Parametry:**
- `name`: nazwa regionu
- `parent_name`: nazwa regionu nadrzędnego (opcjonalna, domyślnie wildcard)

---

#### Zdefiniowanie hierarchii regionów (jedna linia)
**Użycie:**
- `region def <token> [<token> ...]`

**Parametry:** tokeny oddzielone spacjami. **Kursor** wskazuje region, do którego dodawane są kolejne regiony podrzędne. Początkowo wskazuje korzeń `*`.

- **`name`** - tworzy `name` jako dziecko bieżącego kursora (odpowiednik `region put name` z kursorem jako rodzicem), a kursor przenosi się na `name`.
- **`name|jump`** *(lub `name,jump`)* - tworzy `name` jako dziecko bieżącego kursora, a następnie przenosi kursor na `jump` (musi on już istnieć na węźle albo zostać utworzony wcześniej w tym samym poleceniu). `jump` **nie** jest rodzicem `name` - użyj tej formy, aby cofnąć kursor wyżej i rozpocząć inną gałąź.

**Zachowanie:** nowe regiony domyślnie zezwalają na flood, tak jak przy `region put`. Polecenie zwraca drzewo regionów w formacie używanym przez `region`. Sprawdź wynik, a następnie zapisz zmiany poleceniem `region save`. W razie błędu otrzymasz `Err - ...`. Zmiany wykonane przed błędem pozostają na urządzeniu.

**Istniejące regiony:** `region def` zachowuje obecne drzewo. Jeśli region o danej nazwie już istnieje, przenosi go pod region wskazywany przez kursor. W przeciwnym razie tworzy nowy region. Niepotrzebne wpisy usuń poleceniem `region remove`.

**Limity:** repeater przez port szeregowy akceptuje jedną linię do **160 znaków**. Dla większych drzew podziel na wiele poleceń `region def`; kursor resetuje się do `*` między poleceniami, więc rozpocznij kolejne polecenie od `child|ancestor`, aby ustawić go ponownie. Każdy token dzieli się co najwyżej raz na znaku `|` - `region def a|b|c|d` nie jest skrótem płaskiej listy; patrz przykład płaskiej listy poniżej.

**Przykład - łańcuch liniowy** (każdy token staje się dzieckiem poprzedniego):
```mccli
region def a b c d e
region save
```

**Przykład - rozgałęzione drzewo** (odpowiednik `region put a`, `region put b a`, `region put c b`, `region put d c`, `region put e b`, `region put f e`):
```mccli
region def a b c d|b e f
region save
```

**Przykład - błąd i stan częściowy:**
```mccli
region def a b c|nope d
```
Odpowiedź to `Err - unknown jump: nope`. `a`, `b` i `c` zostały umieszczone przed błędem; `d` nie. Uruchom `region`, aby sprawdzić stan, a następnie uruchom ponownie z poprawionym `jump` lub napraw za pomocą `region remove` / `region put`.

**Przykład - płaska lista** (każdy region jako dziecko `*`). Użyj `|*` po każdym tokenie, aby cofnąć kursor do korzenia przed kolejnym tokenem:
```mccli
region def a|* b|* c|* d|* e|* f
region save
```

---

#### Usunięcie regionu
**Użycie:**
- `region remove <name>`

**Parametry:**
- `name`: nazwa regionu

**Uwaga:** przed usunięciem regionu należy usunąć wszystkie jego regiony podrzędne

---

#### Podgląd wszystkich regionów
**Użycie:**
- `region list <filter>`

**Tylko przez port szeregowy:** Tak

**Parametry:**
- `filter`: `allowed`|`denied`

**Uwaga:** wymaga firmware 1.12+

---

#### Zrzut wszystkich zdefiniowanych regionów i uprawnień flood
**Użycie:**
- `region`

**Tylko przez port szeregowy:** dla firmware starszego niż 1.12.0

---

### Przykłady regionów

**Import jednego regionu przez lokalną konsolę**

Pierwszy znak linii z nazwą regionu to spacja. Pusta linia kończy import; następne polecenie zapisuje wynik.

```mccli
region load
 #Europe F

region save
```

**Dodanie hierarchii bez importu**

`region def` nie wymaga interaktywnego wprowadzania. Poniższe polecenie tworzy `#UK` i `#France` jako regiony podrzędne `#Europe`. Każdy utworzony region zezwala na flood.

```mccli
region def #Europe #UK|#Europe #France
region save
```

**Ruch bez przypisanego regionu**

`*` dotyczy pakietów bez kodów transportu regionu. Nie oznacza automatycznego zezwolenia dla wszystkich nazwanych regionów.

```mccli
region allowf *
region save
```

Aby zablokować taki ruch, użyj `region denyf *`. Flagi regionów nazwanych ustawiaj oddzielnie; samo zagnieżdżenie nie powoduje dziedziczenia zezwolenia na flood.

### GPS (gdy obsługa GPS jest wkompilowana)

#### Podgląd lub zmiana stanu GPS
**Użycie:**
- `gps`
- `gps <state>`

**Parametry:**
- `state`: `on`|`off`

**Domyślnie:** `off`

**Uwaga:** format wyjścia:
- `off`, gdy sprzęt GPS jest wyłączony
- `on, {active|deactivated}, {fix|no fix}, {sat count} sats`, gdy sprzęt GPS jest włączony

---

#### Synchronizacja zegara tego węzła z czasem GPS
**Użycie:**
- `gps sync`

---

#### Ustawienie lokalizacji tego węzła na podstawie współrzędnych GPS
**Użycie:**
- `gps setloc`

---

#### Podgląd lub zmiana polityki advertu GPS
**Użycie:**
- `gps advert`
- `gps advert <policy>`

**Parametry:**
- `policy`: `none`|`share`|`prefs`
  - `none`: nie dołączaj lokalizacji do advertów
  - `share`: udostępniaj lokalizację GPS (z SensorManager)
  - `prefs`: lokalizacja przechowywana w ustawieniach lat i lon węzła

**Domyślnie:** `prefs`

---

### Czujniki (gdy obsługa czujników jest wkompilowana)

#### Podgląd listy czujników tego węzła
**Użycie:** `sensor list [start]`

**Parametry:**
- `start`: opcjonalny indeks początkowy (domyślnie 0)

**Format odpowiedzi:** najpierw liczba zmiennych (`<n> vars`), następnie linie `<var_name>=<value>`. Jeśli wynik się nie mieści, kończy się wpisem `... next:<index>`. Podaj ten indeks w następnym `sensor list`, aby kontynuować.

---

#### Podgląd lub zmiana wartości czujnika
**Użycie:**
- `sensor get <key>`
- `sensor set <key> <value>`

**Parametry:**
- `key`: nazwa ustawienia czujnika
- `value`: wartość do ustawienia dla czujnika

---

### Bridge (gdy obsługa bridge jest wkompilowana)

#### Podgląd wkompilowanego typu bridge
**Użycie:** `get bridge.type`

---

#### Podgląd lub zmiana flagi włączenia bridge
**Użycie:**
- `get bridge.enabled`
- `set bridge.enabled <state>`

**Parametry:**
- `state`: `on`|`off`

**Domyślnie:** `off`

---

#### Dodanie opóźnienia do pakietów trasowanych przez ten bridge
**Użycie:**
- `get bridge.delay`
- `set bridge.delay <ms>`

**Parametry:**
- `ms`: opóźnienie w milisekundach (0-10000)

**Domyślnie:** `500`

---

#### Podgląd lub zmiana źródła pakietów mostkowanych do interfejsu zewnętrznego
**Użycie:**
- `get bridge.source`
- `set bridge.source <source>`

**Parametry:**
- `source`:
  - `rx`: mostkuje odebrane pakiety
  - `tx`: mostkuje wysłane pakiety

`get bridge.source` zwraca odpowiednio `logRx` lub `logTx`. W poleceniu `set` używaj `rx` albo `tx`.

**Domyślnie:** `logTx`

---

#### Podgląd lub zmiana prędkości bridge (tylko RS-232)
**Użycie:**
- `get bridge.baud`
- `set bridge.baud <rate>`

**Parametry:**
- `rate`: prędkość transmisji od 9600 do wartości `BRIDGE_MAX_BAUD` z kompilacji. Wybierz prędkość obsługiwaną przez oba urządzenia.

**Domyślnie:** `115200`

---

#### Podgląd lub zmiana kanału używanego do mostkowania (tylko ESPNow)
**Użycie:**
- `get bridge.channel`
- `set bridge.channel <channel>`

**Parametry:**
- `channel`: numer kanału (1-14)

---

#### Ustawienie sekretu ESP-Now
**Użycie:**
- `get bridge.secret`
- `set bridge.secret <secret>`

**Parametry:**
- `secret`: sekret bridge ESP-NOW, do 15 znaków

**Domyślnie:** zależy od płytki

---

#### Podgląd wersji bootloadera (tylko nRF52)
**Użycie:** `get bootloader.ver`

---

#### Podgląd obsługi zarządzania zasilaniem
**Użycie:** `get pwrmgt.support`

---

#### Podgląd aktualnego źródła zasilania
**Użycie:** `get pwrmgt.source`

**Uwaga:** zwraca błąd na płytkach bez obsługi zarządzania zasilaniem.

---

#### Podgląd powodów resetu i wyłączenia
**Użycie:** `get pwrmgt.bootreason`

Działa także na płytkach bez obsługi zarządzania zasilaniem. Jeśli płytka nie udostępnia danej przyczyny, odpowiedź zawiera `Not available`. Na ESP32 dostępna jest przyczyna resetu, a przyczyna wyłączenia ma wartość `Not available`.

---

#### Podgląd napięcia przy starcie
**Użycie:** `get pwrmgt.bootmv`

**Uwaga:** zwraca błąd na płytkach bez obsługi zarządzania zasilaniem.

---

### Ethernet (gdy obsługa Ethernetu jest wkompilowana)

Obsługa Ethernetu jest dostępna na płytkach RAK4631 z modułem RAK13800 (W5100S) Ethernet. Aby włączyć tę funkcję, użyj wariantów firmware `_ethernet` (np. `RAK_4631_repeater_ethernet`).

---

#### Podgląd statusu połączenia Ethernet
**Użycie:**
- `eth.status`

**Wynik:**
- `ETH: <ip>:<port>` gdy połączono (np. `ETH: 192.168.1.50:23`)
- `ETH: not connected` gdy Ethernet nie jest aktywny

**Uwagi:**
- Dostępne tylko na firmware repeatera i room serwera. Firmware companion radio ethernet nie udostępnia CLI.
- Interfejs Ethernet automatycznie uzyskuje adres IP przez DHCP przy starcie.
- Serwer TCP nasłuchuje na porcie 23 (domyślnie) dla połączeń CLI.
- Połącz się dowolnym klientem TCP (np. `nc`, PuTTY), aby uzyskać dostęp do tego samego CLI co przez port szeregowy.

---
