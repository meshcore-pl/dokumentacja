---
title: Polecenia CLI
description: Lista poleceń CLI wysyłanych do repeaterów, room serwerów i sensorów MeshCore.
order: 2
sourceUrl: https://docs.meshcore.io/cli_commands
createdAt: 22.08.2026
updatedAt: 04.09.2026
---

# Polecenia CLI

Ten dokument zawiera liste poleceń CLI, które można wysyłać do repeaterów, room serwerów i sensorów MeshCore.

## Nawigacja

- [Operacyjne](#operacyjne)
- [Sąsiedzi](#sąsiedzi-tylko-repeater)
- [Statystyki](#statystyki)
- [Logowanie](#logowanie)
- [Informacje](#informacje)
- [Konfiguracja](#konfiguracja)
  - [Radio](#radio)
  - [System](#system)
  - [Routing](#routing)
  - [ACL](#acl)
  - [Zarządzanie regionami](#zarządzanie-regionami-v110)
    - [Przykłady regionów](#przykłady-regionów)
  - [GPS](#gps-gdy-obsługa-gps-jest-wkompilowana)
  - [Czujniki](#czujniki-gdy-obsługa-czujników-jest-wkompilowana)
  - [Bridge](#bridge-gdy-obsługa-bridge-jest-wkompilowana)

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

---

### Wyświetlenie aktualnego czasu w UTC
**Użycie:**
- `clock`

---

### Ustawienie czasu na konkretny znacznik czasu
**Użycie:**
- `time <epoch_seconds>`

**Parametry:**
- `epoch_seconds`: czas w formacie epoch Unix

---

### Wysłanie advertu typu flood
**Użycie:**
- `advert`

---

### Wysłanie advertu typu zero-hop
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

**Uwaga:** wynik tego polecenia jest ograniczony do 8 najnowszych advertów.

**Uwaga:** każda linia jest zakodowana jako `{pubkey-prefix}:{timestamp}:{snr*4}`

---

### Usunięcie sąsiada
**Użycie:**
- `neighbor.remove <pubkey_prefix>`

**Parametry:**
- `pubkey_prefix`: klucz publiczny węzła do usunięcia z listy sąsiadów. Może to być krótki prefiks lub pełny klucz. Wszyscy sąsiedzi pasujący do podanego prefiksu zostaną usunięci.

**Uwaga:** możesz usunąć wszystkich sąsiadów, wysyłając znak spacji jako prefiks. Spacja oznacza pusty prefiks, który pasuje do wszystkich istniejących sąsiadów.

---

### Odkrywanie sąsiadów zero-hop

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

**Domyślnie:** `869.525,250,11,5`

**Uwaga:** wymaga restartu, aby zmiana zaczęła obowiązywać

---

#### Podgląd lub zmiana mocy nadawania tego węzła
**Użycie:**
- `get tx`
- `set tx <dbm>`

**Parametry:**
- `dbm`: poziom mocy w dBm (1-22)

**Ustawiane flagą kompilacji:** `LORA_TX_POWER`

**Domyślnie:** zależy od płytki

**Uwagi:** to ustawienie kontroluje wyłącznie poziom mocy chipu LoRa. Niektóre węzły mają dodatkowy stopień wzmacniacza mocy, który zwiększa całkowitą moc wyjściową. Sprawdź w instrukcji węzła prawidłową wartość do użycia. **Ustawienie zbyt wysokiej wartości może naruszać przepisy prawa w Twoim kraju.**

---

#### Zmiana parametrów radiowych na określony czas
**Użycie:**
- `tempradio <freq>,<bw>,<sf>,<cr>,<timeout_mins>`

**Parametry:**
- `freq`: częstotliwość w MHz (300-2500)
- `bw`: szerokość pasma w kHz (7.8-500)
- `sf`: współczynnik rozpraszania (5-12)
- `cr`: współczynnik kodowania (5-8)
- `timeout_mins`: czas trwania w minutach (musi być > 0)

**Uwaga:** to nie jest zapisywane w ustawieniach i zostanie wyczyszczone po restarcie

---

#### Podgląd lub zmiana częstotliwości tego węzła
**Użycie:**
- `get freq`
- `set freq <frequency>`

**Parametry:**
- `frequency`: częstotliwość w MHz

**Domyślnie:** `869.525`

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

**Uwaga:** maksymalna długość jest różna. Jeśli lokalizacja jest ustawiona, maksymalna długość to 24 bajty; w przeciwnym razie 32. Emoji i znaki unicode mogą zajmować więcej niż jeden bajt.

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

**Uwaga:** wymaga restartu, aby zmiana zaczęła obowiązywać po ustawieniu

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

**Ustawiane flagą kompilacji:** `ROOM_PASSWORD` (tylko Room Server)

**Domyślnie:** `<puste>`

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

**Uwaga:** gdy włączone, urządzenie przechodzi w tryb uśpienia między transmisjami radiowymi

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

**Uwaga:** `path.hash.mode` ustawia niskopoziomowy rozmiar kodowania ID/hasha używany, gdy repeater rozgłasza advert. To ustawienie nie ma wpływu na to, jaki rozmiar ID/hasha pakietu ten repeater przekazuje dalej - w firmware >= 1.14 wszystkie rozmiary powinny być przekazywane. Ta funkcja została dodana w firmware 1.14

**Uwaga tymczasowa:** adverty z rozmiarem ID/hasha 2 lub 3 bajty mogą mieć ograniczoną propagację flood w Twojej sieci, dopóki ta funkcja jest nowa, ponieważ firmware w wersji 1.13.0 i starszej odrzuca pakiety z wielobajtowymi ID/hashami ścieżki, obsługując wyłącznie hashe 1-bajtowe. Zanim zastosujesz większe rozmiary ID/hasha, upewnij się, że instalacja firmware >=1.14 w Twojej sieci osiągnęła masę krytyczną wystarczającą do skutecznego zalewania (flood) sieci.

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

**Uwaga:** gdy włączone, repeatery zaczynają odrzucać pakiety flood, które wyglądają, jakby znajdowały się w pętli. Zdarzało się to ostatnio w niektórych sieciach mesh, gdy w sieci pojawił się choć jeden repeater z „wadliwym” firmware (prawdopodobnie jakimś forkiem lub niestandardowym firmware). Jeśli payload zostanie zmodyfikowany, a następnie przekazany dalej, ten sam pakiet powoduje burzę pakietów, powtarzaną aż do maksymalnie 64 hopów. Ta funkcja została dodana w firmware 1.14

**Przykład:** jeśli ustawienie to `loop.detect minimal`, a odebrany zostanie pakiet o rozmiarze ścieżki 1 bajt, repeater sprawdzi, czy jego własny ID/hash już znajduje się w ścieżce. Jeśli jest już zakodowany 4 razy, odrzuci pakiet. Jeśli pakiet używa rozmiaru ścieżki 2 bajty, a własny ID/hash repeatera jest już zakodowany 2 razy, odrzuca go. Jeśli pakiet używa rozmiaru ścieżki 3 bajty, a własny ID/hash repeatera jest już zakodowany 1 raz, odrzuca go.

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

**Domyślnie:** `0.2`

**Uwaga:** to samo losowe okno unikania kolizji co `txdelay`, ale zastosowane do ruchu bezpośredniego (nie-flood, trasowanego). Wartość domyślna jest niższa, ponieważ pakiety bezpośrednie są adresowane do konkretnego następnego hopa, więc dużo mniej węzłów konkuruje o ich retransmisję.

---

#### [Eksperymentalne] Podgląd lub zmiana opóźnienia przetwarzania odebranego ruchu
**Użycie:**
- `get rxdelay`
- `set rxdelay <value>`

**Parametry:**
- `value`: bazowe opóźnienie odbioru (0-20)

**Domyślnie:** `0.0`

**Uwaga:** gdy włączone, repeatery, które odebrały pakiet flood ze słabym sygnałem, są wstrzymywane w kolejce opóźnień przed przetworzeniem, podczas gdy te, które odebrały go z silnym sygnałem, przetwarzają go od razu. Daje to priorytet przekazywania ścieżkom o silnym sygnale. Zanim węzły ze słabym sygnałem przetworzą swoją kopię, pakiet mógł już się rozprzestrzenić i zostanie potraktowany jako duplikat, co zmniejsza liczbę zbędnych retransmisji.

---

#### Podgląd lub zmiana limitu cyklu pracy (duty cycle)
**Użycie:**
- `get dutycycle`
- `set dutycycle <value>`

**Parametry:**
- `value`: procent cyklu pracy (1-100)

**Domyślnie:** `50%` (odpowiednik współczynnika czasu nadawania 1.0)

**Przykłady:**
- `set dutycycle 100` - brak limitu cyklu pracy
- `set dutycycle 50` - cykl pracy 50% (domyślnie)
- `set dutycycle 10` - cykl pracy 10%
- `set dutycycle 1` - cykl pracy 1% (najsurowszy wymóg UE)

> **Uwaga:** dodane w firmware v1.15.0

---

#### Podgląd lub zmiana współczynnika czasu nadawania (limit cyklu pracy)
> **Przestarzałe** od firmware v1.15.0. Zamiast tego użyj [`get/set dutycycle`](#podgląd-lub-zmiana-limitu-cyklu-pracy-duty-cycle).

**Użycie:**
- `get af`
- `set af <value>`

**Parametry:**
- `value`: współczynnik czasu nadawania (0-9). Po każdej transmisji repeater wymusza okres ciszy w przybliżeniu równy czasowi nadawania na antenie pomnożonemu przez tę wartość. Daje to długoterminowy cykl pracy w przybliżeniu równy 1 podzielonemu przez (1 plus ta wartość). Na przykład:
  - `af = 1` → ~50% duty
  - `af = 2` → ~33% duty
  - `af = 3` → ~25% duty
  - `af = 9` → ~10% duty
  Za dobór wartości odpowiedniej dla Twojej jurysdykcji i planu kanałów (np. regulacja 10% duty cycle dla EU 868 MHz) odpowiadasz Ty sam.

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

#### Podgląd lub zmiana interwału resetu AGC
**Użycie:**
- `get agc.reset.interval`
- `set agc.reset.interval <value>`

**Parametry:**
- `value`: interwał w sekundach zaokrąglany w dół do wielokrotności 4 (17 staje się 16). 0, aby wyłączyć.

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

#### Podgląd lub zmiana interwału advertu flood
**Użycie:**
- `get flood.advert.interval`
- `set flood.advert.interval <hours>`

**Parametry:**
- `hours`: interwał w godzinach (3-168)

**Domyślnie:** `12` (Repeater) - `0` (Sensor)

---

#### Podgląd lub zmiana interwału advertu zero-hop
**Użycie:**
- `get advert.interval`
- `set advert.interval <minutes>`

**Parametry:**
- `minutes`: interwał w minutach zaokrąglany w dół do najbliższej wielokrotności 2 (61 staje się 60) (60-240)

**Domyślnie:** `0`

---

#### Ograniczenie liczby hopów dla wiadomości flood
**Użycie:**
- `get flood.max`
- `set flood.max <value>`

**Parametry:**
- `value`: maksymalna liczba hopów flood (0-64)

**Domyślnie:** `64`

---

#### Ograniczenie liczby hopów dla wiadomości flood bez zasięgu (unscoped)
**Użycie:**
- `get flood.max.unscoped`
- `set flood.max.unscoped <value>`

**Parametry:**
- `value`: maksymalna liczba hopów flood (0-64) dla pakietu bez zasięgu (bez ustawionego regionu)

**Domyślnie:** `64` - (`0xFF` oznacza, że nie zostało ustawione, będzie podążać za flood.max, dopóki nie zostanie ustawione.)

**Uwaga:** alternatywa dla `region denyf *` - ustawienie `flood.max.unscoped` na niższą wartość, np. `3`, pozwoliłoby lokalnym wiadomościom bez zasięgu propagować się, jednocześnie zapobiegając zalewaniu lokalnego regionu przez hałaśliwych sąsiadów.

---

#### Ograniczenie liczby hopów dla wiadomości flood advertu
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

**Uwaga:** wpis zostaje usunięty, gdy `permissions` jest pominięte

---

#### Podgląd aktualnej listy ACL
**Użycie:**
- `get acl`

**Tylko przez port szeregowy:** Tak

---

#### Podgląd lub zmiana flagi „tylko do odczytu” tego room servera
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
- `region load <name> [flood_flag]`

**Parametry:**
- `name`: nazwa regionu. `*` oznacza region wieloznaczny (wildcard)

**Uwaga:** `flood_flag`: opcjonalne `F`, aby zezwolić na flood

**Uwaga:** wcięcie tworzy relacje rodzic-dziecko (maks. 8 poziomów)

**Uwaga:** `region load` z pustą nazwą nie zadziała zdalnie (jest interaktywne)

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

**Parametry (tokeny):** oddzielone spacjami. Logiczny **kursor** zaczyna na wildcard `*`.

- **`name`** - tworzy `name` jako dziecko bieżącego kursora (odpowiednik `region put name` z kursorem jako rodzicem), a kursor przenosi się na `name`.
- **`name|jump`** *(lub `name,jump`)* - tworzy `name` jako dziecko bieżącego kursora, a następnie przenosi kursor na `jump` (musi on już istnieć na węźle albo zostać utworzony wcześniej w tym samym poleceniu). `jump` **nie** jest rodzicem `name` - użyj tej formy, aby cofnąć kursor wyżej i rozpocząć inną gałąź.

**Zachowanie:** każdy utworzony region domyślnie ma zezwolenie na flood (tak samo jak `region put`). Odpowiedzią jest wynikowe drzewo regionów (w tym samym formacie co samo `region`); przejrzyj je przed uruchomieniem `region save`, aby zapisać zmiany na stałe. W razie błędu odpowiedź to `Err - ...`, a regiony umieszczone przed wystąpieniem błędu pozostają na węźle, tak samo jak przy częściowym łańcuchu `region put`.

**Istniejące regiony:** `region def` nie czyści istniejącego drzewa - jeśli nazwa już istnieje, jej rodzic zostaje zaktualizowany na bieżący kursor; w przeciwnym razie tworzony jest nowy region. Aby zacząć od nowa, najpierw usuń niechciane regiony poleceniem `region remove`.

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

**Przykład 1: użycie flagi F z nazwanym regionem publicznym**
```mccli
region load
#Europe F
<blank line to end region load>
region save
```

**Wyjaśnienie:**
- Tworzy region o nazwie `#Europe` z włączonym flood
- Pakiety z tego regionu będą rozsyłane metodą flood do innych węzłów

---

**Przykład 2: użycie wildcard z flagą F**
```mccli
region load
* F
<blank line to end region load>
region save
```

**Wyjaśnienie:**
- Tworzy region wildcard `*` z włączonym flood
- Automatycznie włącza flood dla wszystkich regionów
- Dotyczy wyłącznie pakietów bez kodów transportu

---

**Przykład 3: użycie wildcard bez flagi F**
```mccli
region load
*
<blank line to end region load>
region save
```
**Wyjaśnienie:**
- Tworzy region wildcard `*` bez flood
- Ten region istnieje, ale nie wpływa na dystrybucję pakietów
- Używany jako region domyślny/pusty

---

**Przykład 4: zagnieżdżony region publiczny z flagą F**
```mccli
region load
#Europe F
  #UK
    #London
    #Manchester
  #France
    #Paris
    #Lyon
<blank line to end region load>
region save
```

**Wyjaśnienie:**
- Tworzy region `#Europe` z włączonym flood
- Dodaje zagnieżdżone regiony podrzędne (`#UK`, `#France`)
- Wszystkie zagnieżdżone regiony dziedziczą flagę flood od rodzica

---

**Przykład 5: wildcard z zagnieżdżonymi regionami publicznymi**
```mccli
region load
* F
  #NorthAmerica
    #USA
      #NewYork
      #California
    #Canada
      #Ontario
      #Quebec
<blank line to end region load>
region save
```

**Wyjaśnienie:**
- Tworzy region wildcard `*` z włączonym flood
- Dodaje zagnieżdżoną hierarchię `#NorthAmerica`
- Automatycznie włącza flood dla wszystkich regionów podrzędnych
- Przydatne dla sieci globalnych z określonymi zasadami regionalnymi

---
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

**Uwaga:** format wyjścia: `<var_name>=<value>\n`

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
  - `logRx`: mostkuje odebrane pakiety
  - `logTx`: mostkuje wysłane pakiety

**Domyślnie:** `logTx`

---

#### Podgląd lub zmiana prędkości bridge (tylko RS-232)
**Użycie:**
- `get bridge.baud`
- `set bridge.baud <rate>`

**Parametry:**
- `rate`: prędkość transmisji (`9600`, `19200`, `38400`, `57600` lub `115200`)

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

**Uwaga:** zwraca błąd na płytkach bez obsługi zarządzania zasilaniem.

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
- Dostępne tylko na firmware repeatera i room servera. Firmware companion radio ethernet nie udostępnia CLI.
- Interfejs Ethernet automatycznie uzyskuje adres IP przez DHCP przy starcie.
- Serwer TCP nasłuchuje na porcie 23 (domyślnie) dla połączeń CLI.
- Połącz się dowolnym klientem TCP (np. `nc`, PuTTY), aby uzyskać dostęp do tego samego CLI co przez port szeregowy.

---
