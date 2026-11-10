---
title: FAQ
description: Najczęściej zadawane pytania i odpowiedzi dotyczące sieci MeshCore.
order: 1
sourceUrl: https://docs.meshcore.io/faq
createdAt: 22.08.2026
updatedAt: 10.11.2026
---

# Najczęściej zadawane pytania

Odpowiedzi na najczęściej zadawane pytania dotyczące MeshCore.

- [Najczęściej zadawane pytania](#najczesciej-zadawane-pytania)
- [1. Wprowadzenie](#1-wprowadzenie)
    - [1.1. Czym jest MeshCore?](#11-czym-jest-meshcore)
    - [1.2. Co jest potrzebne, aby zacząć korzystać z MeshCore?](#12-co-jest-potrzebne-aby-zaczac-korzystac-z-meshcore)
        - [1.2.1. Sprzęt](#121-sprzet)
        - [1.2.2. Firmware](#122-firmware)
        - [1.2.3. Firmware radia Companion](#123-firmware-radia-companion)
        - [1.2.4. Repeater](#124-repeater)
        - [1.2.5. Room serwer](#125-room-serwer)
- [2. Konfiguracja początkowa](#2-konfiguracja-poczatkowa)
    - [2.1. Ile urządzeń potrzebuję, aby zacząć korzystać z MeshCore?](#21-ile-urzadzen-potrzebuje-aby-zaczac-korzystac-z-meshcore)
    - [2.2. Czy MeshCore kosztuje jakieś pieniądze?](#22-czy-meshcore-kosztuje-jakies-pieniadze)
    - [2.3. Jakie częstotliwości są obsługiwane przez MeshCore?](#23-jakie-czestotliwosci-sa-obslugiwane-przez-meshcore)
    - [2.4. Czym jest „advert” w MeshCore?](#24-czym-jest-advert-w-meshcore)
    - [2.5. Czy istnieje limit hopów?](#25-czy-istnieje-limit-hopow)
- [3. Administracja serwerem](#3-administracja-serwerem)
    - [3.1. Jak skonfigurować repeatera lub room serwer?](#31-jak-skonfigurowac-repeatera-lub-room-serwer)
    - [3.2. Czy muszę ustawić lokalizację dla repeatera?](#32-czy-musze-ustawic-lokalizacje-dla-repeatera)
    - [3.3. Jakie jest hasło do administracji repeaterem lub room serwerem?](#33-jakie-jest-haslo-do-administracji-repeaterem-lub-room-serwerem)
    - [3.4. Jakie jest hasło do dołączenia do room serwera?](#34-jakie-jest-haslo-do-dolaczenia-do-room-serwera)
    - [3.5. Czy mogę odczytać lub ustawić klucz prywatny repeatera?](#35-czy-moge-odczytac-lub-ustawic-klucz-prywatny-repeatera)
    - [3.6. Jak zmienić pierwszy bajt identyfikatora repeatera, aby uniknąć kolizji?](#36-jak-zmienic-pierwszy-bajt-identyfikatora-repeatera-aby-uniknac-kolizji)
    - [3.7. Repeater nie odbiera pobliskich urządzeń po silnych zakłóceniach. Co zrobić?](#37-repeater-nie-odbiera-pobliskich-urzadzen-po-silnych-zakloceniach-co-zrobic)
    - [3.8. Jak zrobić z mojego repeatera obserwatora sieci mesh?](#38-jak-zrobic-z-mojego-repeatera-obserwatora-sieci-mesh)
    - [3.9. Czym jest obsługa multibyte? Co oznaczają adverty i wiadomości 1-, 2- i 3-bajtowe?](#39-czym-jest-obsluga-multibyte-co-oznaczaja-adverty-i-wiadomosci-1--2--i-3-bajtowe)
        - [3.9.1. Jakie rozmiary hashy ścieżki przekaże mój repeater?](#391-jakie-rozmiary-hashy-sciezki-przekaze-moj-repeater)
        - [3.9.2. Co decyduje o rozmiarze hasha ścieżki pakietu?](#392-co-decyduje-o-rozmiarze-hasha-sciezki-pakietu)
        - [3.9.3. Jak zmienić rozmiar hasha ścieżki mojego companiona?](#393-jak-zmienic-rozmiar-hasha-sciezki-mojego-companiona)
        - [3.9.4. Co robi polecenie CLI path.hash.mode na repeaterze?](#394-co-robi-polecenie-cli-pathhashmode-na-repeaterze)
        - [3.9.5. Dlaczego stosować 2- lub 3-bajtowy hash ścieżki dla advertów?](#395-dlaczego-stosowac-2--lub-3-bajtowy-hash-sciezki-dla-advertow)
        - [3.9.6. Kiedy możemy odejść od 1-bajtowego hasha ścieżki dla kanałów i wiadomości bezpośrednich?](#396-kiedy-mozemy-odejsc-od-1-bajtowego-hasha-sciezki-dla-kanalow-i-wiadomosci-bezposrednich)
- [4. T-Deck](#4-t-deck)
    - [4.1. Czy istnieje przewodnik użytkownika dla T-Deck, T-Pager, T-Watch lub T-Display Pro?](#41-czy-istnieje-przewodnik-uzytkownika-dla-t-deck-t-pager-t-watch-lub-t-display-pro)
    - [4.2. Jak przełączyć T-Deck w tryb DFU?](#42-jak-przelaczyc-t-deck-w-tryb-dfu)
    - [4.3. Dlaczego mój T-Deck Plus nie łapie sygnału satelitarnego?](#43-dlaczego-moj-t-deck-plus-nie-lapie-sygnalu-satelitarnego)
    - [4.4. Dlaczego mój podstawowy (nie-Plus) T-Deck nie łapie sygnału satelitarnego?](#44-dlaczego-moj-podstawowy-nie-plus-t-deck-nie-lapie-sygnalu-satelitarnego)
    - [4.5. Jaki rozmiar karty SD obsługuje T-Deck?](#45-jaki-rozmiar-karty-sd-obsluguje-t-deck)
    - [4.6. Jaki jest klucz publiczny domyślnego kanału publicznego?](#46-jaki-jest-klucz-publiczny-domyslnego-kanalu-publicznego)
    - [4.7. Jak zdobyć mapy na T-Deck?](#47-jak-zdobyc-mapy-na-t-deck)
    - [4.8. Gdzie umieścić kafelki mapy?](#48-gdzie-umiescic-kafelki-mapy)
    - [4.9. Jak odblokować większe przybliżenie mapy i funkcje zarządzania serwerem na T-Deck?](#49-jak-odblokowac-wieksze-przyblizenie-mapy-i-funkcje-zarzadzania-serwerem-na-t-deck)
    - [4.10. Jak odczytać ekran diagnostyczny na T-Deck?](#410-jak-odczytac-ekran-diagnostyczny-na-t-deck)
    - [4.11. Dźwięk na T-Deck jest zbyt głośny?](#411-dzwiek-na-t-deck-jest-zbyt-glosny)
    - [4.12. Czy można dostosować dźwięk?](#412-czy-mozna-dostosowac-dzwiek)
    - [4.13. Jak ręcznie dodać kontakt na T-Deck przez „Import from Clipboard”?](#413-jak-recznie-dodac-kontakt-na-t-deck-przez-import-from-clipboard)
    - [4.14. Jak zrobić zrzut ekranu na T-Deck?](#414-jak-zrobic-zrzut-ekranu-na-t-deck)
- [5. Ogólne](#5-ogolne)
    - [5.1. Czym są BW, SF i CR?](#51-czym-sa-bw-sf-i-cr)
    - [5.2. Czy klienci MeshCore przekazują pakiety dalej (repeat)?](#52-czy-klienci-meshcore-przekazuja-pakiety-dalej-repeat)
    - [5.3. Co się dzieje, gdy węzeł pozna trasę przez mobilnego repeatera, a ten repeater zniknie?](#53-co-sie-dzieje-gdy-wezel-pozna-trase-przez-mobilnego-repeatera-a-ten-repeater-zniknie)
    - [5.4. Jak MeshCore znajduje i zapamiętuje trasę do odbiorcy?](#54-jak-meshcore-znajduje-i-zapamietuje-trase-do-odbiorcy)
    - [5.5. Czy wiadomości na kanałach publicznych i prywatnych zawsze korzystają z trybu flood?](#55-czy-wiadomosci-na-kanalach-publicznych-i-prywatnych-zawsze-korzystaja-z-trybu-flood)
    - [5.6. Jaki jest klucz publiczny domyślnego kanału publicznego?](#56-jaki-jest-klucz-publiczny-domyslnego-kanalu-publicznego)
    - [5.7. Czy MeshCore jest open source?](#57-czy-meshcore-jest-open-source)
    - [5.8. Jak mogę wesprzeć MeshCore?](#58-jak-moge-wesprzec-meshcore)
    - [5.9. Jak zbudować firmware MeshCore ze źródeł?](#59-jak-zbudowac-firmware-meshcore-ze-zrodel)
    - [5.10. Czy istnieją inne projekty open source związane z MeshCore?](#510-czy-istnieja-inne-projekty-open-source-zwiazane-z-meshcore)
    - [5.11. Czy MeshCore obsługuje ATAK?](#511-czy-meshcore-obsluguje-atak)
    - [5.12. Jak dodać węzeł do Mapy MeshCore?](#512-jak-dodac-wezel-do-mapy-meshcore)
    - [5.13. Czy mogę użyć Raspberry Pi do aktualizacji radia MeshCore?](#513-czy-moge-uzyc-raspberry-pi-do-aktualizacji-radia-meshcore)
    - [5.14. Czy istnieją projekty budowane wokół MeshCore?](#514-czy-istnieja-projekty-budowane-wokol-meshcore)
    - [5.15. Czy istnieją aplikacje klienckie na Windows lub Mac?](#515-czy-istnieja-aplikacje-klienckie-na-windows-lub-mac)
    - [5.16. Czy istnieją materiały porównujące MeshCore z innymi systemami LoRa?](#516-czy-istnieja-materialy-porownujace-meshcore-z-innymi-systemami-lora)
- [6. Rozwiązywanie problemów](#6-rozwiazywanie-problemow)
    - [6.1. Dlaczego data ostatniego kontaktu z węzłem jest nieprawidłowa?](#61-dlaczego-data-ostatniego-kontaktu-z-wezlem-jest-nieprawidlowa)
    - [6.2. Dlaczego nie widzę węzła na liście kontaktów lub w Discover?](#62-dlaczego-nie-widze-wezla-na-liscie-kontaktow-lub-w-discover)
    - [6.3. Jak połączyć się z repeaterem przez BLE (Bluetooth)?](#63-jak-polaczyc-sie-z-repeaterem-przez-ble-bluetooth)
    - [6.4. Mój companion nie pojawia się przez Bluetooth?](#64-moj-companion-nie-pojawia-sie-przez-bluetooth)
    - [6.5. Nie mogę połączyć się przez Bluetooth, jaki jest kod parowania Bluetooth?](#65-nie-moge-polaczyc-sie-przez-bluetooth-jaki-jest-kod-parowania-bluetooth)
    - [6.6. Mój Heltec V3 ciągle rozłącza się ze smartfonem. Nie może utrzymać stabilnego połączenia Bluetooth.](#66-moj-heltec-v3-ciagle-rozlacza-sie-ze-smartfonem-nie-moze-utrzymac-stabilnego-polaczenia-bluetooth)
    - [6.7. Jak przywrócić ustawienia fabryczne urządzenia nRF52?](#67-jak-przywrocic-ustawienia-fabryczne-urzadzenia-nrf52)
    - [6.8. Co oznacza błąd „failed to open” we flasherze na Linuksie?](#68-co-oznacza-blad-failed-to-open-we-flasherze-na-linuksie)
- [7. Inne pytania](#7-inne-pytania)
    - [7.1. Jak zaktualizować urządzenie nRF52 przez Bluetooth (OTA DFU)?](#71-jak-zaktualizowac-urzadzenie-nrf52-przez-bluetooth-ota-dfu)
        - [7.1.1. Czy mogę zaktualizować Seeed Studio Wio Tracker L1 Pro przez OTA?](#711-czy-moge-zaktualizowac-seeed-studio-wio-tracker-l1-pro-przez-ota)
    - [7.2. Jak zaktualizować urządzenia oparte na ESP32 przez OTA?](#72-jak-zaktualizowac-urzadzenia-oparte-na-esp32-przez-ota)
    - [7.3. Czy istnieje sposób na zmniejszenie ryzyka nieudanej aktualizacji firmware przez OTA (DFU)?](#73-czy-istnieje-sposob-na-zmniejszenie-ryzyka-nieudanej-aktualizacji-firmware-przez-ota-dfu)
    - [7.4. Czy logo i czcionka MeshCore są dostępne?](#74-czy-logo-i-czcionka-meshcore-sa-dostepne)
    - [7.5. Jaki jest format kodu QR kontaktu lub kanału?](#75-jaki-jest-format-kodu-qr-kontaktu-lub-kanalu)
    - [7.6. Jak połączyć się z companionem przez Wi-Fi, np. na Heltec V3?](#76-jak-polaczyc-sie-z-companionem-przez-wi-fi-np-na-heltec-v3)
    - [7.7. Jak ustawić moc nadawania w Station G2, Heltec V4 i urządzeniach z modułami EByte?](#77-jak-ustawic-moc-nadawania-w-station-g2-heltec-v4-i-urzadzeniach-z-modulami-ebyte)
    - [7.8. Jak korzystać z Ethernetu na RAK4631?](#78-jak-korzystac-z-ethernetu-na-rak4631)

## 1. Wprowadzenie

### 1.1. Czym jest MeshCore?
MeshCore to wieloplatformowy system do bezpiecznej komunikacji tekstowej przez radio LoRa. Umożliwia komunikację bez dostępu do internetu (off-grid). Znajduje zastosowanie m.in. podczas wypraw terenowych, działań kryzysowych i usuwania skutków katastrof, a także w działaniach taktycznych, służbach porządkowych, ochronie i sieciach czujników IoT. ([źródło](https://meshcore.io/))

Podstawowe oprogramowanie MeshCore jest bezpłatne:

- Kod routingu i firmware MeshCore jest dostępny na GitHubie na licencji MIT.
- Społeczność tworzy bezpłatne aplikacje klienckie, np. aplikacje webowe. Część z nich ma otwarty kod źródłowy.
- Wieloplatformową aplikację [Liama Cottle'a](https://liamcottle.net) na Androida, iOS i komputery można pobrać i używać bezpłatnie.
- Firmware T-Deck, rozwijany przez Scotta z Ripple Radios, twórcę MeshCore, również można bezpłatnie wgrać i używać.

Na T-Deck część funkcji wymaga klucza rejestracyjnego. W aplikacjach na Androida i iOS/iPadOS można dokupić pomijanie czasu oczekiwania przy zdalnym zarządzaniu repeaterem i room serwerem przez radio.

Płatne funkcje są opcjonalne i nie są potrzebne do podstawowej komunikacji. Opłaty za ich odblokowanie wspierają dalszy rozwój oprogramowania.

Na bazie otwartego kodu MeshCore można tworzyć własne projekty bez opłat licencyjnych.

### 1.2. Co jest potrzebne, aby zacząć korzystać z MeshCore?
Przydatne strony i narzędzia:

- Główna strona: [https://meshcore.io](https://meshcore.io)
- Flasher firmware: [https://flasher.meshcore.io](https://flasher.meshcore.io)
- Firmware MeshCore na GitHubie: [https://github.com/meshcore-dev/MeshCore](https://github.com/meshcore-dev/MeshCore)
- Aplikacja webowa MeshCore Companion: [https://app.meshcore.nz](https://app.meshcore.nz)
- Mapa MeshCore: [https://map.meshcore.io](https://map.meshcore.io)
- [Prezentacja techniczna MeshCore](https://www.youtube.com/watch?v=OwmkVkZQTf4) Liama Cottle'a

Do uruchomienia MeshCore potrzebujesz obsługiwanego urządzenia LoRa. Zależnie od wgranego firmware może ono pełnić rolę klienta, repeatera lub room serwera.

#### 1.2.1. Sprzęt
MeshCore działa na wielu urządzeniach LoRa w pasmach 433, 868 i 915 MHz, m.in. Lilygo T-Deck, T-Pager, urządzenia RAK Wireless WisBlock RAK4631 (np. 19003, 19007, 19026), Heltec V3, Xiao S3 WIO, Xiao C3, Heltec T114, Station G2, Nano G2 Ultra, Seeed Studio T1000-E. Regularnie dodawane są kolejne urządzenia.

Aktualną listę obsługiwanych urządzeń znajdziesz pod adresem <https://flasher.meshcore.io>

Jeśli chcesz korzystać z MeshCore bez telefonu, wybierz LilyGo T-Deck, T-Deck Plus, T-Pager, T-Watch lub T-Display Pro z firmware MeshCore Ultra. Te urządzenia mają własny interfejs do wysyłania i odbierania wiadomości.

#### 1.2.2. Firmware
Poniżej opisano warianty firmware Companion oraz role repeatera i room serwera.

#### 1.2.3. Firmware radia Companion
Radio Companion łączy aplikację kliencką z siecią LoRa. Dwa podstawowe warianty firmware to:

1. **BLE Companion**
   Łączy radio LoRa z aplikacją MeshCore na Androida lub iOS przez Bluetooth Low Energy (BLE).
   <https://meshcore.io>

2. **USB Serial Companion**
   Łączy radio LoRa z komputerem lub urządzeniem mobilnym przez port szeregowy USB. Do obsługi służy klient webowy MeshCore.
   <https://app.meshcore.nz>

#### 1.2.4. Repeater
Repeatery służą do zwiększania zasięgu sieci MeshCore. Firmware repeatera działa na tych samych urządzeniach, na których działa firmware klienta. Zadaniem repeatera jest przekazywanie pakietów MeshCore do urządzenia docelowego. **Nie** przekazuje ani nie retransmituje każdego odebranego pakietu, w przeciwieństwie do innych systemów mesh LoRa.

Repeaterem można zarządzać zdalnie z T-Deck z odblokowaną administracją lub z aplikacji mobilnej MeshCore połączonej z radiem BLE Companion.

#### 1.2.5. Room serwer
Room serwer to serwer wiadomości działający podobnie do BBS. Można się z nim łączyć z T-Deck lub z aplikacji mobilnej MeshCore przez radio BLE Companion.

Room serwer przechowuje historię wiadomości, więc po powrocie do zasięgu można pobrać wiadomości wysłane podczas nieobecności. Działa to podobnie do poczty elektronicznej. Zwykłe kanały nie przechowują historii: wiadomość trzeba odebrać w chwili jej nadania.

Room serwerem można zarządzać zdalnie z T-Deck z odblokowaną administracją lub z aplikacji mobilnej MeshCore połączonej z radiem BLE Companion.

Gdy klient loguje się do room serwera, otrzymuje ostatnie 32 nieprzeczytane wiadomości.

Room serwer może również przekazywać pakiety po włączeniu tej funkcji poleceniem `set repeat on`. Takie połączenie obu ról nazywamy room-peaterem. Nie udostępnia wtedy pełnego zestawu funkcji repeatera ani wszystkich opcji zdalnej administracji dostępnych w firmware repeatera.

Zaleca się uruchamianie repeatera i room serwera na osobnych urządzeniach.

---

## 2. Konfiguracja początkowa

### 2.1. Ile urządzeń potrzebuję, aby zacząć korzystać z MeshCore?
Jeśli masz jedno obsługiwane urządzenie, wgraj firmware BLE Companion i połącz je przez Bluetooth z aplikacją na Androida lub iOS. Pozwoli to komunikować się z innymi użytkownikami MeshCore w okolicy.

Jeśli masz dwa obsługiwane urządzenia i niewielu użytkowników MeshCore w okolicy, wgraj na oba firmware BLE Companion, aby używać swoich urządzeń do komunikacji z bliskimi przyjaciółmi i rodziną.

Jeśli masz dwa obsługiwane urządzenia i w okolicy są inni użytkownicy MeshCore, możesz wgrać na jedno z urządzeń firmware BLE Companion, a na drugie obsługiwane urządzenie - firmware repeatera. Umieść repeatera wysoko nad ziemią, aby zwiększyć zasięg swojej sieci MeshCore.

Po wgraniu firmware repeatera pozostaw urządzenie podłączone do komputera przez USB. Otwórz konsolę w web flasherze i ustaw częstotliwość dla swojego regionu lub kraju, aby umożliwić zdalne zarządzanie przez radio:

`set freq {frequency}`

Dokumentacja poleceń CLI dla repeatera i room serwera znajduje się tutaj: <https://docs.meshcore.io/cli_commands>

Jeśli masz więcej urządzeń, na jednym z nich możesz uruchomić room serwer.

### 2.2. Czy MeshCore kosztuje jakieś pieniądze?
Wszystkie wersje firmware radia (np. dla Heltec V3, RAK, T-1000E itd.) są darmowe i open source, rozwijane przez Scotta z Ripple Radios.

Natywny klient na Androida i iOS wykorzystuje model freemium i jest rozwijany przez Liama Cottle'a, twórcę mapy Meshtastic pod adresem [meshtastic.liamcottle.net](https://meshtastic.liamcottle.net) na [GitHubie](https://github.com/liamcottle/meshtastic-map) oraz [reticulum-meshchat na GitHubie](https://github.com/liamcottle/reticulum-meshchat).

Firmware T-Deck można pobrać bezpłatnie, a większość funkcji nie wymaga opłat. Płatny klucz rejestracyjny odblokowuje większe przybliżenie mapy i zdalną administrację serwerami przez radio. Zakup wspiera rozwój firmware. Wysyłanie wiadomości bezpośrednich oraz łączenie się z repeaterami i room serwerami nie wymaga płatnej rejestracji.

### 2.3. Jakie częstotliwości są obsługiwane przez MeshCore?
MeshCore obsługuje m.in. pasmo 868 MHz używane w Wielkiej Brytanii i UE oraz pasmo 915 MHz używane w Nowej Zelandii, Australii i USA. Dostępność pasma zależy od sprzętu. Ustawienia dobierz do lokalnej sieci i obowiązujących przepisów.

Użyj klienta na smartfonie lub funkcji konfiguracji repeatera w web flasherze, aby ustawić parametry RF swoich radiów, wybierając preset dla swojego regionu.

Od października 2025 wiele lokalnych sieci przeszło na ustawienie „narrow”, czyli użycie BW62.5 i niższej wartości SF (zamiast pierwotnego SF11). Na przykład preset USA/Kanada (zalecany) to 910.525MHz, SF7, BW62.5, CR5.

Po intensywnych testach wiele regionów przeszło lub przechodzi na BW62.5 oraz SF7, 8 lub 9. Węższe pasmo i niższa wartość SF pozwalają sygnałom radiowym MeshCore zmieścić się między zakłóceniami w paśmie ISM, zapewniają niższy poziom szumu, lepsze SNR i szybszą transmisję.

Jeśli lokalna społeczność uzgodni zmianę presetu, zgłoś ją na kanale [#meshcore-app](https://discord.com/channels/1343693475589263471/1391681655911088241) na [Discordzie MeshCore](https://meshcore.gg). Zasady zgłaszania i format API opisano na stronie [Presety radiowe](./radio_presets.md).

### 2.4. Czym jest „advert” w MeshCore?
Advert to pakiet, w którym węzeł rozgłasza informacje o sobie. Odpowiada funkcji „announce” w Reticulum i „node info” w Meshtastic.

Po naciśnięciu przycisku advertu urządzenie wysyła przez LoRa swoją nazwę, pozycję i klucz publiczny. Podpis cyfrowy chroni te informacje przed podszywaniem się pod węzeł. W aplikacji dostępne są dwa warianty: „Advert 0-hop” i „Advert do wszystkich” (Flood Routed).

- **Advert 0-hop** - dociera tylko do urządzeń w bezpośrednim zasięgu. Repeatery nie przekazują go dalej.
- **Advert do wszystkich** - repeatery przekazują go dalej, dzięki czemu dociera poza bezpośredni zasięg radiowy.

Klienci MeshCore rozgłaszają się wyłącznie wtedy, gdy zainicjuje to użytkownik. Repeater domyślnie wysyła advert do wszystkich co 47 godzin. Ten interwał można skonfigurować za pomocą polecenia:

`set flood.advert.interval {hours}`

Polecenie `set advert.interval {minutes}` ustawia osobny interwał wysyłania lokalnych advertów 0-hop.

### 2.5. Czy istnieje limit hopów?
Firmware dopuszcza maksymalnie 64 hopy. W praktyce osiągnięcie tego limitu jest trudne ze względu na warunki radiowe i rosnący czas dostarczenia pakietów.

---

## 3. Administracja serwerem

### 3.1. Jak skonfigurować repeatera lub room serwer?
Po pierwszym wgraniu firmware ustaw częstotliwość zgodną z lokalną siecią i przepisami.

Repeaterem lub room serwerem można zarządzać, korzystając z jednej z poniższych opcji:

- Podłącz urządzenie przez USB i otwórz <https://config.meshcore.io>. W interfejsie webowym ustawisz nazwę, parametry radia, lokalizację i hasła.

![image](https://github.com/user-attachments/assets/2a9d9894-e34d-4dbe-b57c-fc3c250a2d34)

- Podłącz urządzenie przez USB, otwórz <https://flasher.meshcore.io> w Chrome i wybierz `Console`.

- Użyj smartfonowego klienta MeshCore, aby zdalnie zarządzać serwerami przez LoRa.

- Użyj T-Deck z odblokowaną zdalną administracją. Klucz rejestracyjny kupisz w Ripple Radios:

<https://buymeacoffee.com/ripplebiz/e/249834>

### 3.2. Czy muszę ustawić lokalizację dla repeatera?
Lokalizacja nie jest wymagana do działania repeatera. Pozwala jednak pokazać jego położenie na mapie MeshCore. Ustaw ją poleceniami:

`set lat <GPS Lat>`

`set lon <GPS Lon>`

Szerokość i długość geograficzną możesz uzyskać z Google Maps, klikając prawym przyciskiem myszy na lokalizację, w której się znajdujesz.

### 3.3. Jakie jest hasło do administracji repeaterem lub room serwerem?
Domyślne hasło administratora do repeatera i room serwera to `password`. Użyj poniższego polecenia, aby zmienić hasło administratora:

`password {new-password}`

### 3.4. Jakie jest hasło do dołączenia do room serwera?
Domyślne hasło gościa do room serwera to `hello`. Użyj poniższego polecenia, aby zmienić hasło gościa:

`set guest.password {guest-password}`

### 3.5. Czy mogę odczytać lub ustawić klucz prywatny repeatera?
Możesz wydać poniższe polecenia, aby odczytać lub ustawić klucz prywatny repeatera przy użyciu połączenia USB serial.

`get prv.key`, aby wypisać klucz prywatny repeatera w konsoli szeregowej
`set prv.key <hex>`, aby ustawić klucz prywatny repeatera w konsoli szeregowej

Zrestartuj repeatera po poleceniu `set prv.key <hex>`, aby nowy klucz prywatny zaczął obowiązywać.

### 3.6. Jak zmienić pierwszy bajt identyfikatora repeatera, aby uniknąć kolizji?
Możesz wygenerować nowy klucz prywatny i wskazać pierwszy bajt jego klucza publicznego tutaj: <https://gessaman.com/mc-keygen>

Repeatery o tym samym pierwszym bajcie identyfikatora nadal mogą przekazywać pakiety. Utrudnia to jednak analizę tras: traceroute i podobne narzędzia nie potrafią jednoznacznie wskazać, który z tych repeaterów znalazł się na ścieżce.

Dobrą praktyką jest, aby przy konfigurowaniu nowego repeatera wybrać klucz publiczny, który nie jest jeszcze używany. Jeśli nie da się znaleźć unikalnego pierwszego bajtu dla klucza publicznego repeatera, wybierz taki, który jest unikalny w promieniu około 16 km (10 mil), aby zminimalizować kolizje z pobliskimi repeaterami.

### 3.7. Repeater nie odbiera pobliskich urządzeń po silnych zakłóceniach. Co zrobić?
Może to wynikać z funkcji automatycznej regulacji wzmocnienia (AGC) radia SX1262. Możesz użyć tego polecenia, aby okresowo resetować jego AGC.

`set agc.reset.interval <number>`

Parametr `<number>` określa interwał od 0 do 1020 sekund, zaokrąglany w dół do wielokrotności 4. Wartość `0` wyłącza resetowanie AGC. Ustawienie `set agc.reset.interval 4` może pomóc przy problemach z odbiorem.

Reset AGC ma niewielki narzut: polega na ustawieniu `state = STATE_IDLE;` w funkcji `RadioLibWrapper::resetAGC()` w pliku `RadioLibWrappers.cpp`.

### 3.8. Jak zrobić z mojego repeatera obserwatora sieci mesh?
Instrukcja dotycząca obserwatora jest dostępna tutaj: <https://analyzer.letsmesh.net/observer/onboard>

### 3.9. Czym jest obsługa multibyte? Co oznaczają adverty i wiadomości 1-, 2- i 3-bajtowe?
Pierwotny projekt protokołu MeshCore wykorzystuje pierwszy bajt klucza publicznego repeatera do oznaczania repeatera w ścieżce. Przy 1 bajcie na każdy repeater w ścieżce, pakiety MeshCore mogą pokonać nawet 64 hopy.

Jeden bajt pozwala rozróżnić 254 identyfikatory (00 i FF są zarezerwowane). W wielu sieciach występują więc repeatery z takim samym pierwszym bajtem klucza publicznego. Nie zakłóca to przekazywania pakietów, ale utrudnia narzędziom rozróżnianie repeaterów podczas analizy ścieżek.

Firmware 1.14 i nowszy obsługuje adverty oraz wiadomości kanałowe i bezpośrednie z hashami ścieżki o długości 1, 2 lub 3 bajtów. Pakiety z hashami 1-bajtowymi są zgodne także ze starszym firmware repeaterów. Maksymalna długość trasy wynosi 64 hopy dla hashy 1-bajtowych, 32 dla 2-bajtowych i 21 dla 3-bajtowych.

#### 3.9.1. Jakie rozmiary hashy ścieżki przekaże mój repeater?
Repeatery z firmware 1.14+ przekazują dalej pakiety wysłane z 1-, 2- lub 3-bajtowym hashem ścieżki. Repeatery ze starszym firmware niż 1.14 przekazują dalej wyłącznie pakiety z 1-bajtowym hashem ścieżki, a pakiety 2- i 3-bajtowe po cichu odrzucają.

#### 3.9.2. Co decyduje o rozmiarze hasha ścieżki pakietu?
O rozmiarze hasha ścieżki decyduje nadawca pakietu, np. companion wysyłający wiadomość lub repeater rozgłaszający advert.

#### 3.9.3. Jak zmienić rozmiar hasha ścieżki mojego companiona?
W firmware 1.14+ i aplikacji MeshCore 1.41.0+ rozmiar hasha ścieżki ustawisz w `Ustawienia` (ikona koła zębatego) -> `Ustawienia eksperymentalne`.

Dopóki zdecydowana większość repeaterów w Twojej regionalnej sieci mesh nie zostanie zaktualizowana do firmware 1.14+, zaleca się pozostawienie companiona przy domyślnym trybie 1-bajtowym, ponieważ repeatery ze starszym firmware niż 1.14 po cichu odrzucają wiadomości z większymi hashami ścieżki.

#### 3.9.4. Co robi polecenie CLI `path.hash.mode` na repeaterze?
Polecenie `path.hash.mode` ustawia rozmiar hasha ścieżki we własnych advertach repeatera. Nie zmienia obsługi przekazywanych pakietów: firmware 1.14+ obsługuje hashe 1-, 2- i 3-bajtowe niezależnie od tego ustawienia.

Użycie: `set path.hash.mode {0|1|2}`:

| `path.hash.mode` | Rozmiar hasha ścieżki advertu |
|-------------------|-------------------------------|
| 0                 | 1 bajt (domyślnie)             |
| 1                 | 2 bajty                        |
| 2                 | 3 bajty                        |

Ustawienie trybu 1 lub 2 dla repeaterów z firmware 1.14+ jest bezpieczne.

#### 3.9.5. Dlaczego stosować 2- lub 3-bajtowy hash ścieżki dla advertów?
Dłuższy hash zmniejsza liczbę kolizji identyfikatorów. Narzędzia takie jak LetsMesh.net Analyzer i MeshMapper mogą dzięki temu łatwiej rozróżniać repeatery. Kosztem jest krótsza maksymalna trasa advertu: 32 hopy dla hashy 2-bajtowych i 21 dla 3-bajtowych. W typowej lokalnej sieci taki zasięg zwykle wystarcza.

#### 3.9.6. Kiedy możemy odejść od 1-bajtowego hasha ścieżki dla kanałów i wiadomości bezpośrednich?
Warto przejść na wysyłanie wiadomości kanałowych i bezpośrednich z hashem 2- lub 3-bajtowym, gdy zdecydowana większość repeaterów w Twojej regionalnej sieci mesh zostanie zaktualizowana do firmware w wersji 1.14 lub nowszej. Ustawienie `path.hash.mode` repeatera na 1 (dla 2-bajtowego hasha ścieżki) lub 2 (dla 3-bajtowego hasha ścieżki) już teraz pomaga społeczności ocenić, ile repeaterów zostało zaktualizowanych do 1.14+. Współpracuj ze swoją społecznością MeshCore, aby wspólnie zdecydować, kiedy przełączyć się na ścieżkę 2- lub 3-bajtową dla wiadomości kanałowych i bezpośrednich.

---

## 4. T-Deck

### 4.1. Czy istnieje przewodnik użytkownika dla T-Deck, T-Pager, T-Watch lub T-Display Pro?
Przewodnik znajdziesz na stronie [Ripple Radios](https://buymeacoffee.com/ripplebiz/ultra-v7-7-guide-meshcore-users).

### 4.2. Jak przełączyć T-Deck w tryb DFU?

1. Wyłącz urządzenie
2. Podłącz kabel USB do urządzenia
3. Przytrzymaj trackball (nie puszczaj)
4. Włącz urządzenie
5. Poczekaj na dźwięk połączenia USB
6. Puść trackball
7. T-Deck jest teraz w trybie DFU
8. W tym momencie możesz rozpocząć wgrywanie firmware za pomocą <https://flasher.meshcore.io>

### 4.3. Dlaczego mój T-Deck Plus nie łapie sygnału satelitarnego?
Dla T-Deck Plus prędkość transmisji GPS (baud rate) powinna być ustawiona na **38400**. Ponadto zauważono, że w niektórych egzemplarzach T-Deck Plus moduł GPS był zamontowany do góry nogami, z anteną GPS skierowaną w dół zamiast w górę. Jeśli Twój T-Deck Plus nadal nie łapie sygnału satelitarnego po ustawieniu prędkości na 38400, może być konieczne otwarcie urządzenia w celu sprawdzenia orientacji modułu GPS.

GPS w T-Deck jest zawsze włączony. Możesz pominąć „synchronizację zegara z GPS”, a T-Deck będzie nadal próbował uzyskać sygnał GPS. Możesz przejść na ekran `GPS Info` - jeśli prędkość transmisji jest prawidłowa, powinieneś zobaczyć rosnący licznik `Sentences:`.

[Źródło](https://discord.com/channels/826570251612323860/1330643963501351004/1356609240302616689)

### 4.4. Dlaczego mój podstawowy (nie-Plus) T-Deck nie łapie sygnału satelitarnego?
Podstawowy (nie-Plus) T-Deck nie ma wbudowanego GPS. Jeśli dodałeś GPS do swojego podstawowego T-Deck, sprawdź w instrukcji swojego modułu GPS, jakiej prędkości transmisji wymaga. Alternatywnie możesz spróbować ustawiać kolejno prędkości od 9600, 19200 itd., aż do 115200, aby sprawdzić, która zadziała.

### 4.5. Jaki rozmiar karty SD obsługuje T-Deck?
Użytkownicy nie mieli problemów z kartami SD 16GB ani 32GB. Sformatuj kartę SD w systemie **FAT32**.

### 4.6. Jaki jest klucz publiczny domyślnego kanału publicznego?
T-Deck używa tego samego klucza co aplikacje na smartfony, ale w formacie base64
`izOH6cXN6mrJ5e26oRXNcg==`

Na fizycznej klawiaturze T-Deck nie ma klawisza `=`. Możesz użyć klawiatury ekranowej, aby wpisać `=`. Stuknij pole tekstowe, aby włączyć klawiaturę ekranową.
Trzeci znak to wielka litera `O` (O jak Olga), a nie zero `0`

Klucz aplikacji na smartfony w formacie hex to:
`8b3387e9c5cdea6ac9e5edbaa115cd72`

[Źródło](https://discord.com/channels/826570251612323860/1330643963501351004/1354194409213792388)

### 4.7. Jak zdobyć mapy na T-Deck?
Mapy składają się z kafelków (map tiles). Gotowe zestawy są dostępne tutaj; ich zakup wspiera rozwój projektu:

- <https://buymeacoffee.com/ripplebiz/e/342543> (Europa)
- <https://buymeacoffee.com/ripplebiz/e/342542> (USA)

Kafelki wybranego obszaru możesz też pobrać skryptem w Pythonie:
<https://github.com/fistulareffigy/MTD-Script>

Dostępna jest też wersja z rozszerzoną obsługą błędów i równoległym pobieraniem:
<https://github.com/TheBestJohn/MTD-Script>

### 4.8. Gdzie umieścić kafelki mapy?
Po pobraniu kafelków skopiuj folder `\tiles` do katalogu głównego karty SD Twojego T-Deck.

### 4.9. Jak odblokować większe przybliżenie mapy i funkcje zarządzania serwerem na T-Deck?
Firmware T-Deck można pobrać, zainstalować i używać bezpłatnie. Większe przybliżenie mapy i administrację serwerem odblokowuje kod kupowany osobno dla każdego urządzenia T-Deck, w cenie 10 USD.
Strona odblokowania: <https://buymeacoffee.com/ripplebiz/e/249834>

### 4.10. Jak odczytać ekran diagnostyczny na T-Deck?
Miejsca na ekranie T-Deck jest niewiele, więc informacje są dość skrótowe. Format wygląda tak:
`{hops} l:{packet-length}({payload-len}) t:{packet-type} snr:{n} rssi:{n}`

Znaczenie packet-type znajdziesz tutaj:
<https://github.com/meshcore-dev/MeshCore/blob/main/src/Packet.h#L19>

```c
#define PAYLOAD_TYPE_REQ 0x00 // request (prefixed with dest/src hashes, MAC) (enc data: timestamp, blob)
#define PAYLOAD_TYPE_RESPONSE 0x01 // response to REQ or ANON_REQ (prefixed with dest/src hashes, MAC) (enc data: timestamp, blob)
#define PAYLOAD_TYPE_TXT_MSG 0x02 // a plain text message (prefixed with dest/src hashes, MAC) (enc data: timestamp, text)
#define PAYLOAD_TYPE_ACK 0x03 // potwierdzenie odbioru
#define PAYLOAD_TYPE_ADVERT 0x04 // advert węzła
#define PAYLOAD_TYPE_GRP_TXT 0x05 // an (unverified) group text message (prefixed with channel hash, MAC) (enc data: timestamp, "name: msg")
#define PAYLOAD_TYPE_GRP_DATA 0x06 // an (unverified) group datagram (prefixed with channel hash, MAC) (enc data: data_type, data_len, blob)
#define PAYLOAD_TYPE_ANON_REQ 0x07 // generic request (prefixed with dest_hash, ephemeral pub_key, MAC) (enc data: ...)
#define PAYLOAD_TYPE_PATH 0x08 // returned path (prefixed with dest/src hashes, MAC) (enc data: path, extra)
```

[Źródło](https://discord.com/channels/1343693475589263471/1343693475589263474/1350611321040932966)

### 4.11. Dźwięk na T-Deck jest zbyt głośny?
Możesz zastąpić domyślne dźwięki własnymi plikami MP3 o niższej głośności. Sposób ich dodawania opisano w kolejnym punkcie.

### 4.12. Czy można dostosować dźwięk?
Możesz dostosować dźwięki na T-Deck, umieszczając pliki `.mp3` w katalogu głównym (`root`) karty SD. Pliki to:

- `startup.mp3`
- `error.mp3`
- `alert.mp3`
- `new-advert.mp3`
- `existing-advert.mp3`

### 4.13. Jak ręcznie dodać kontakt na T-Deck przez „Import from Clipboard”?
Funkcja „Import from Clipboard” importuje kontakt z pliku `clipboard.txt` na karcie SD. Aby udostępnić własny kontakt, otwórz ekran tożsamości (Identity) i wybierz „Card to Clipboard”. Zapisze to w tym samym pliku wizytówkę z adresem zaczynającym się od `meshcore://...`.

### 4.14. Jak zrobić zrzut ekranu na T-Deck?
Aby zrobić zrzut ekranu na T-Deck, przytrzymaj lewy górny róg ekranu. Zrzut ekranu zostanie zapisany na karcie microSD, jeśli jest włożona do urządzenia.

---

## 5. Ogólne

### 5.1. Czym są BW, SF i CR?
- **BW (bandwidth)** to szerokość pasma. Szersze pasmo pozwala przesyłać dane szybciej, ale zwykle zmniejsza czułość odbiornika.
- **SF (spreading factor)** to współczynnik rozpraszania. Wyższy SF wydłuża transmisję i ułatwia odbiór słabego sygnału. Niższy SF skraca czas nadawania, ale wymaga lepszych warunków radiowych.
- **CR (coding rate)** określa udział bitów danych i bitów korekcji błędów. Więcej bitów korekcyjnych zwiększa odporność na błędy kosztem czasu transmisji.

W MeshCore ustawienia CR od 5 do 8 odpowiadają współczynnikom 4/5, 4/6, 4/7 i 4/8. Przykładowo przy CR7 na 4 bity danych przypadają 3 bity korekcyjne. Poprawne wartości opisuje też [dokumentacja LoRa w Zephyr](https://docs.zephyrproject.org/latest/doxygen/html/group__lora__interface.html).

Przy stabilnym łączu zwykle wystarcza CR5. Wyższe wartości, np. CR7 lub CR8, mogą pomóc przy błędach transmisji. Parametry dobieraj wspólnie z użytkownikami lokalnej sieci.

Podwojenie BW, np. ze 125 do 250 kHz, zwiększa przepływność około dwukrotnie. Obniżenie SF o jeden, np. z SF10 do SF9, również skraca transmisję, lecz zmniejsza odporność na słaby sygnał.

Więcej o korekcji błędów: [Forward Error Correction and Code Rate](https://www.thethingsnetwork.org/docs/lorawan/fec-and-code-rate).

### 5.2. Czy klienci MeshCore przekazują pakiety dalej (repeat)?
Domyślnie companiony nie przekazują pakietów innych użytkowników. To założenie projektu, w którym priorytetem jest dostarczanie wiadomości. Ogranicza ono ruch radiowy i liczbę kolizji utrudniających komunikację.
Pakiety przekazują repeatery i room-peatery, czyli room serwery z włączonym `set repeat on`. Wyjątkiem po stronie klientów jest companion z włączonym repeat mode, który działa z dodatkowymi ograniczeniami. Role urządzeń opisano we [wprowadzeniu MeshCore Polska](https://meshcorepolska.org/dokumentacja/meshcore/wprowadzenie#role-urzadzen).

### 5.3. Co się dzieje, gdy węzeł pozna trasę przez mobilnego repeatera, a ten repeater zniknie?
Jeśli repeater na zapisanej trasie stanie się nieosiągalny, klient nadal spróbuje wysłać wiadomość tą trasą. Po trzech nieudanych próbach aplikacja domyślnie zresetuje ścieżkę i wyśle wiadomość w trybie flood. Można to wyłączyć w ustawieniach. Jeśli odbiorca jest osiągalny bezpośrednio lub przez inny repeater, kolejne wiadomości będą korzystać z nowej trasy. Ścieżkę można też ustawić ręcznie, wskazując znany repeater.

Przy częstym przemieszczaniu się użytkowników aplikacja może ponawiać wysyłanie i wracać do trybu flood, aby znaleźć nową trasę.

### 5.4. Jak MeshCore znajduje i zapamiętuje trasę do odbiorcy?
Trasa do odbiorcy jest zapisywana przy jego kontakcie. Pierwsza wiadomość dociera w trybie flood. Odbiorca odsyła raport dostarczenia z listą repeaterów, przez które przeszła wiadomość. Nadawca zapisuje tę trasę i dołącza ją do kolejnych pakietów. Każdy repeater sprawdza, czy jest wskazany jako następny na trasie. Tylko wtedy przekazuje pakiet dalej, co ogranicza zbędne retransmisje.

[Źródło](https://discord.com/channels/826570251612323860/1330643963501351004/1351279141630119996)

### 5.5. Czy wiadomości na kanałach publicznych i prywatnych zawsze korzystają z trybu flood?
Wiadomości na kanałach publicznych i prywatnych są rozsyłane w trybie flood, ponieważ nie mają jednej ustalonej ścieżki do odbiorców. Administrator repeatera może ograniczyć liczbę hopów dla takiego ruchu poleceniem CLI `set flood.max`.

[Źródło](https://discord.com/channels/1343693475589263471/1343693475589263474/1350023009527664672)

### 5.6. Jaki jest klucz publiczny domyślnego kanału publicznego?
Klucz aplikacji na smartfony w formacie hex to:

`8b3387e9c5cdea6ac9e5edbaa115cd72`

T-Deck używa tego samego klucza, ale w formacie base64:

`izOH6cXN6mrJ5e26oRXNcg==`

Trzeci znak to wielka litera `O`, a nie zero `0`.

[Źródło](https://discord.com/channels/826570251612323860/1330643963501351004/1354194409213792388)

### 5.7. Czy MeshCore jest open source?
Większość firmware jest swobodnie dostępna. Wszystko jest open source poza firmware T-Deck i natywnymi aplikacjami mobilnymi Liama.

Repozytorium firmware: <https://github.com/meshcore-dev/MeshCore>

### 5.8. Jak mogę wesprzeć MeshCore?
Przekazuj szczerą opinię zwrotną na GitHubie i na [serwerze Discord MeshCore](https://meshcore.gg). Rozpowszechniaj informacje o MeshCore wśród przyjaciół i społeczności; pomagaj im zacząć korzystać z MeshCore. Wesprzyj rozwój MeshCore przez Scotta pod adresem <https://buymeacoffee.com/ripplebiz>.

Rozwój aplikacji mobilnej Liama Cottle'a możesz wesprzeć zakupem funkcji pomijania czasu oczekiwania przy zdalnej administracji serwerem.

Wesprzyj rozwój strony flashera i mapy Rastislava Vysoky'ego (recrof) przez [PayPal](https://www.paypal.com/donate/?business=DREHF5HM265ES&no_recurring=0&item_name=If+you+enjoy+my+work%2C+you+can+support+me+here%3A&currency_code=EUR) lub [Revolut](https://revolut.me/recrof)

### 5.9. Jak zbudować firmware MeshCore ze źródeł?
Zobacz instrukcje tutaj:
<https://discord.com/channels/826570251612323860/1330643963501351004/1341826372120608769>

Instrukcje budowania MeshCore:

Dla Windows, najpierw zainstaluj WSL oraz Python+pip za pomocą: <https://plainenglish.io/blog/setting-up-python-on-windows-subsystem-for-linux-wsl-26510f1b2d80>

(Linux, Windows+WSL) W terminalu/powłoce:
```bash
sudo apt update
sudo apt install libpython3-dev
sudo apt install python3-venv
```
Mac: python3 powinien być już zainstalowany.

Następnie kroki są takie same dla wszystkich platform:
```bash
python3 -m venv meshcore-venv
cd meshcore-venv && source bin/activate
pip install -U platformio
git clone https://github.com/meshcore-dev/meshcore.git
cd meshcore
```
Otwórz `platformio.ini` i w sekcji `[arduino_base]` ustaw `LORA_FREQ` na częstotliwość swojej sieci. Domyślna wartość to `869.618` MHz. Zapisz plik i uruchom:
```bash
pio run -e RAK_4631_repeater
```
Plik `firmware.zip` znajdziesz w `.pio/build/RAK_4631_repeater`.

### 5.10. Czy istnieją inne projekty open source związane z MeshCore?
Webowy klient MeshCore oraz biblioteka JavaScript MeshCore autorstwa [Liama Cottle'a](https://liamcottle.net) są open source na licencji MIT.

Klient webowy: <https://github.com/liamcottle/meshcore-web>
JavaScript: <https://github.com/liamcottle/meshcore.js>

### 5.11. Czy MeshCore obsługuje ATAK?
ATAK obecnie nie znajduje się w planach rozwoju MeshCore.

MeshCore nie byłby najlepiej dopasowany do ATAK, ponieważ w MeshCore:

- klienci nie przekazują pakietów dalej, więc potrzebna byłaby sieć repeaterów
- nie będzie stabilnej ścieżki, gdy wszyscy klienci nieustannie przemieszczają się między repeaterami

Przy częstych zmianach tras klienci musieliby ponawiać ich wyszukiwanie i rozsyłać pakiety w trybie flood. Duża liczba komunikatów ATAK mogłaby wtedy powodować liczne kolizje.

Może się to zmienić w przyszłości, jeśli MeshCore stworzy firmware klienta, który przekazuje pakiety dalej.

[Źródło](https://discord.com/channels/826570251612323860/1330643963501351004/1354780032140054659)

### 5.12. Jak dodać węzeł do [Mapy MeshCore](https://map.meshcore.io)?
Aby dodać radio BLE Companion, połącz się z radiem BLE Companion z poziomu aplikacji MeshCore na smartfonie. W aplikacji stuknij ikonę menu `3 kropki` w prawym górnym rogu, następnie stuknij `Internet Map`. Ponownie stuknij ikonę menu `3 kropki` i wybierz `Add me to the Map`

Aby dodać repeatera lub room serwer do mapy, przejdź do listy kontaktów, stuknij `3 kropki` obok repeatera lub room serwera, który chcesz dodać do Internet Map, stuknij `Share`, a następnie `Upload to Internet Map`.

Możesz użyć tego samego companiona (tego samego klucza publicznego), którego użyłeś do dodania swoich repeaterów lub room serwerów, aby usunąć je z Internet Map.

### 5.13. Czy mogę użyć Raspberry Pi do aktualizacji radia MeshCore?
Raspberry Pi może wgrać firmware do urządzenia LoRa przez port szeregowy USB. Numery wersji i nazwy plików poniżej są przykładami. Pobierz aktualny firmware dla swojej płytki i wybranej roli urządzenia.

> Instrukcje dla urządzeń nRF, takich jak RAK, T1000-E, T114, znajdują się zaraz po instrukcjach dla ESP

Dla urządzeń opartych na ESP (np. Heltec V3) potrzebujesz:

1. Pobierz plik firmware z <https://flasher.meshcore.io>.
    - Wejdź na stronę w przeglądarce i znajdź sekcję z potrzebnym firmware.
    - Kliknij przycisk Download, kliknij prawym przyciskiem myszy na potrzebny plik, na przykład:
        - `Heltec_v3_companion_radio_ble-v1.7.1-165fb33.bin`
            - Wersja bin bez scalenia (non-merged) zachowuje istniejącą bazę parowania Bluetooth.
        - `Heltec_v3_companion_radio_usb-v1.7.1-165fb33-merged.bin`
            - Wersja bin scalona (merged) nadpisuje wszystko, w tym bootloader i istniejącą bazę parowania Bluetooth, ale zachowuje konfiguracje.
    - Kliknij prawym przyciskiem myszy na nazwę pliku i skopiuj link. Oto przykład: `https://flasher.meshcore.io/releases/download/companion-v1.7.1/Heltec_v3_companion_radio_ble-v1.7.1-165fb33.bin`
    - Uruchom:
        - `wget https://flasher.meshcore.io/releases/download/companion-v1.7.1/Heltec_v3_companion_radio_ble-v1.7.1-165fb33.bin`, aby pobrać plik firmware dla Twojego typu urządzenia lub potrzebnej wersji: USB, BLE, Repeater, Room serwer, bin scalony lub niescalony.
        - Jeśli powyższe polecenie wget pobiera tylko bardzo mały plik (10K bajtów zamiast ponad 100K bajtów), użyj zamiast tego tego polecenia:
            - `wget --user-agent="Mozilla/5.0" --content-disposition "https://flasher.meshcore.io/releases/download/companion-v1.7.1/Heltec_v3_companion_radio_usb-v1.7.1-165fb33.bin"`
2. Potwierdź ścieżkę urządzenia `ttyXXXX` na swoim Raspberry Pi.
    - Przejdź do katalogu `/dev` i uruchom polecenie `ls`, aby znaleźć ścieżkę swojego urządzenia.
    - Zazwyczaj jest to `/dev/ttyUSB0` dla urządzeń ESP.
3. Zainstaluj esptool z powłoki.
    - `pip install esptool --break-system-packages`
4. Wgraj firmware.
    - Dla pliku bin niescalonego:
        - `esptool.py -p /dev/ttyUSB0 --chip esp32-s3 write_flash 0x10000 <non-merged_firmware>.bin`
    - Dla pliku bin scalonego:
        - `esptool.py -p /dev/ttyUSB0 --chip esp32-s3 write_flash 0x00000 <merged_firmware>.bin`

**Instrukcje dla urządzeń nRF:**

Dla urządzeń nRF, np. RAK lub Heltec T114, wykonaj następujące kroki:

1. Pobierz plik firmware z <https://flasher.meshcore.io>.
    - Wejdź na stronę w przeglądarce i znajdź sekcję z potrzebnym firmware.
    - Wybierz archiwum ZIP przeznaczone dla narzędzia `adafruit-nrfutil`.
    - Kliknij przycisk Download, kliknij prawym przyciskiem myszy na plik ZIP, na przykład:
        - `RAK_4631_companion_radio_ble-v1.7.1-165fb33.zip`
    - Kliknij prawym przyciskiem myszy na nazwę pliku i skopiuj link. Oto przykład: `https://flasher.meshcore.io/releases/download/companion-v1.7.1/RAK_4631_companion_radio_ble-v1.7.1-165fb33.zip`
    - Uruchom:
        - `wget https://flasher.meshcore.io/releases/download/companion-v1.7.1/RAK_4631_companion_radio_ble-v1.7.1-165fb33.zip`, aby pobrać plik firmware dla Twojego typu urządzenia lub potrzebnej wersji: USB, BLE, Repeater, Room serwer, tylko plik ZIP.
2. Potwierdź ścieżkę urządzenia `ttyXXXX` na swoim Raspberry Pi.
    - Przejdź do katalogu `/dev` i uruchom polecenie `ls`, aby znaleźć ścieżkę swojego urządzenia.
    - Zazwyczaj jest to `/dev/ttyACM0` dla urządzeń nRF.
3. Zainstaluj adafruit-nrfutil.
    - `pip install adafruit-nrfutil --break-system-packages`
4. Wgraj firmware na urządzenie nRF.
    - `adafruit-nrfutil --verbose dfu serial --package RAK_4631_companion_radio_ble-v1.7.1-165fb33.zip -p /dev/ttyACM0 -b 115200 --singlebank --touch 1200`

Do zarządzania repeaterem lub room serwerem przez port szeregowy USB możesz użyć `picocom`. Zainstaluj go poleceniem:

- `sudo apt install picocom`

Aby rozpocząć zarządzanie urządzeniem podłączonym przez USB serial za pomocą picocom, użyj poniższego polecenia:

- `picocom -b 115200 /dev/ttyUSB0 --imap lfcrlf`

Listę dostępnych poleceń znajdziesz w dokumentacji CLI repeatera i room serwera:

- <https://docs.meshcore.io/cli_commands>

### 5.14. Czy istnieją projekty budowane wokół MeshCore?
Społeczność tworzy własny firmware, aplikacje mobilne, mapy, narzędzia analityczne i integracje, np. z Home Assistant. Otwarty protokół i kod na licencji MIT pozwalają rozwijać takie projekty niezależnie.

Listę projektów społeczności prowadzi [samuk](https://github.com/samuk) w repozytorium <https://github.com/samuk/awesome-meshcore/blob/main/README.md>. Nowe projekty można zgłaszać przez pull requesty.

### 5.15. Czy istnieją aplikacje klienckie na Windows lub Mac?
Aplikacja znana z iOS i Androida jest dostępna również na Windows i macOS. Pliki instalacyjne, w tym APK na Androida, znajdziesz tutaj:
<https://files.liamcottle.net/MeshCore>

Zarówno wersja klienta na Windows, jak i na Mac są w pełni odblokowane i darmowe w użyciu.

### 5.16. Czy istnieją materiały porównujące MeshCore z innymi systemami LoRa?
Oto lista materiałów porównawczych dotyczących MeshCore:

- Kanał The Comms Channel na YouTube: <https://www.youtube.com/watch?v=guDoKGs02Us>
- MeshCore Advantages autorstwa MCarper: <https://github.com/mikecarper/meshfirmware/blob/main/MeshCoreAdvantages.md>
- MeshCore vs Meshtastic autorstwa austinmesh.org: <https://www.austinmesh.org/learn/meshcore-vs-meshtastic>

---

## 6. Rozwiązywanie problemów

### 6.1. Dlaczego data ostatniego kontaktu z węzłem jest nieprawidłowa?
Nieprawidłowy czas na jednym z urządzeń może sprawić, że kontakt wygląda na dawno nieaktywny. Sprawdź zegar swojego urządzenia i zdalnego węzła. Sposoby synchronizacji opisano poniżej.

### 6.2. Dlaczego nie widzę węzła na liście kontaktów lub w Discover?

- Jeśli Twoim klientem jest T-Deck, może nie mieć ustawionego czasu (brak zainstalowanego GPS, brak sygnału GPS lub nieprawidłowa prędkość transmisji GPS).
- Jeśli używasz klienta na Androida lub iOS, inny klient, repeater lub room serwer mogą mieć nieprawidłowy czas.

Aktualny znacznik czasu Unix znajdziesz na <https://www.epochconverter.com>. Możesz użyć go do ustawienia zegara T-Deck. Zegar repeatera lub room serwera zsynchronizujesz zdalnie z T-Deck albo poleceniem `time` w konsoli po podłączeniu urządzenia przez USB.

### 6.3. Jak połączyć się z repeaterem przez BLE (Bluetooth)?
Nie da się połączyć przez Bluetooth z urządzeniem, na którym działa firmware repeatera. Możesz łączyć się przez Bluetooth z urządzeniami, na których działa firmware BLE companion, za pomocą aplikacji na Androida.

### 6.4. Mój companion nie pojawia się przez Bluetooth?
Sprawdź, czy wgrany jest wariant BLE Companion. Wariant USB Serial Companion nie udostępnia połączenia Bluetooth.

### 6.5. Nie mogę połączyć się przez Bluetooth, jaki jest kod parowania Bluetooth?
Domyślny kod parowania Bluetooth to `123456`

### 6.6. Mój Heltec V3 ciągle rozłącza się ze smartfonem. Nie może utrzymać stabilnego połączenia Bluetooth.
Heltec V3 ma niewielką antenę cewkową do Wi-Fi i Bluetooth. W niektórych warunkach jej zasięg ogranicza się do kilkudziesięciu centymetrów. Opisywana przez użytkowników modyfikacja polega na zastąpieniu tej anteny przewodem o długości 31 mm, co poprawia zasięg Bluetooth.

### 6.7. Jak przywrócić ustawienia fabryczne urządzenia nRF52?

**A: Jeśli możesz połączyć się z urządzeniem z poziomu aplikacji MeshCore**
1. Przejdź do ikony koła zębatego (Ustawienia) w prawym górnym rogu
2. Kliknij przycisk `Export Settings`, wybierz `Select All` i potwierdź. To zapisze konfigurację Twojego węzła
3. Teraz wybierz opcję `Factory Reset`
4. Potwierdź, że chcesz zresetować urządzenie
5. Przejdź do ustawień systemowych Bluetooth i usuń parowanie z urządzeniem, aby móc połączyć się ponownie
6. Połącz urządzenie w aplikacji i wprowadź PIN
7. Przejdź do ikony koła zębatego (Ustawienia) w prawym górnym rogu
8. Kliknij `Import Settings` i wybierz plik z kroku 2, kliknij `Select All` i potwierdź
9. Znajdź przycisk `Reboot` na liście ustawień

**B: Jeśli nie możesz połączyć się z aplikacją**
1. Podłącz kabel USB do swojego urządzenia
2. Wejdź na https://flasher.meshcore.io
3. Wyszukaj swoje urządzenie na liście
4. Wybierz `Companion Bluetooth`
5. Naciśnij przycisk `Enter DFU mode`, wybierz swoje urządzenie USB
6. Naciśnij przycisk `Erase Flash`, ponownie wybierz urządzenie i poczekaj na zakończenie
7. Naciśnij przycisk `Flash!` i ponownie wybierz urządzenie USB
8. Urządzenie zostało wyczyszczone i zainstalowano najnowsze firmware
9. Może być konieczne usunięcie parowania w ustawieniach systemowych Bluetooth, aby ponownie sparować aplikację

Od wersji firmware 1.7.0 dostępny jest również tryb ratunkowy CLI (CLI Rescue mode). Jeśli urządzenie ma przycisk użytkownika (np. niektóre modele RAK i T114), przytrzymaj go w ciągu 8 sekund od uruchomienia, aby włączyć ten tryb. Następnie otwórz `Console` na <https://flasher.meshcore.io>.

### 6.8. Co oznacza błąd „failed to open” we flasherze na Linuksie?
Brak uprawnień do portu szeregowego może powodować poniższy błąd:

`NetworkError: Failed to execute 'open' on 'SerialPort': Failed to open serial port.`

Nadaj dostęp użytkownikowi do portu USB:

`sudo setfacl -m u:$USER:rw /dev/ttyUSB0`

---

## 7. Inne pytania

### 7.1. Jak zaktualizować urządzenie nRF52 przez Bluetooth (OTA DFU)?
Poniższa instrukcja dotyczy Androida i iOS. Aplikacja nRF DFU ma taki sam interfejs na obu platformach.

Aktualizacja companiona przez OTA wymaga firmware Companion 1.15 lub nowszego. Zalecany jest [bootloader OTAFIX](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX), który ułatwia odzyskanie urządzenia po nieudanej aktualizacji.

1. Pobierz aplikację nRF DFU z App Store (iOS) lub Play Store (Android) - znajdziesz ją, szukając `nrf dfu`; pełna nazwa aplikacji to `nRF Device Firmware Update`
2. Na <https://flasher.meshcore.io> pobierz wersję **ZIP** firmware dla swojego urządzenia nRF (np. RAK, Heltec T114 lub Seeed Studio Xiao)
3. W aplikacji MeshCore zaloguj się zdalnie z uprawnieniami administratora do repeatera, który chcesz zaktualizować
4. Przejdź do zakładki Command Line, wpisz `start ota` i wciśnij enter.
5. Powinieneś zobaczyć `OK`, potwierdzające, że urządzenie repeatera jest teraz w trybie OTA
6. Uruchom aplikację DFU, następnie stuknij `Settings` w prawym górnym rogu
7. Włącz `Packet receipt notifications` i zmień `Number of Packets` na 10 dla RAK, 8 dla T114. 8 działa też dla RAK.
8. Wybierz pobrany plik zip z firmware
9. Wybierz urządzenie, które chcesz zaktualizować. Jeśli nie ma go na liście, spróbuj ponownie włączyć `OTA` na urządzeniu
10. Jeśli urządzenie nie zostanie znalezione, włącz `Force Scanning` w aplikacji DFU
11. Stuknij `Upload`, aby rozpocząć aktualizację OTA
12. Jeśli aktualizacja się nie powiedzie, wyłącz i ponownie włącz Bluetooth w telefonie. Gdy to nie pomoże, uruchom telefon ponownie. Jeśli błąd nadal pojawia się na etapie „Enabling Bootloader”, usuń parowanie z urządzeniem nRF w ustawieniach Bluetooth i sparuj je ponownie przez aplikację DFU.
13. Poczekaj na zakończenie aktualizacji. Może to potrwać kilka minut.

Więcej informacji znajdziesz na blogu MeshCore:

- [Bootloader OTAFIX](https://blog.meshcore.io/2026/04/06/otafix-bootloader)
- [Aktualizacja nRF przez OTA](https://blog.meshcore.io/2026/04/02/nrf-ota-update)

#### 7.1.1. Czy mogę zaktualizować Seeed Studio Wio Tracker L1 Pro przez OTA?
Wio Tracker L1 Pro można aktualizować przez OTA po wgraniu [bootloadera OTAFIX](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX).

Po wgraniu bootloadera przytrzymaj przycisk obok D-Pada i naciśnij reset, aby uruchomić tryb aktualizacji przez Bluetooth. Dalej postępuj zgodnie z instrukcją OTA powyżej, pomijając polecenie `start ota`. Aktualizację możesz rozpocząć od razu w aplikacji DFU.

### 7.2. Jak zaktualizować urządzenia oparte na ESP32 przez OTA?
Dla urządzeń opartych na ESP32 (np. Heltec V3):

1. Na <https://flasher.meshcore.io> pobierz wersję **niescaloną (non-merged)** firmware dla swojego urządzenia ESP32 (np. `Heltec_v3_repeater-v1.6.2-4449fd3.bin`, bez `"merged"` w nazwie pliku).
2. W aplikacji MeshCore zaloguj się zdalnie z uprawnieniami administratora do repeatera, który chcesz zaktualizować.
3. Przejdź do zakładki Command Line, wpisz `start ota` i wciśnij enter.
4. Powinieneś zobaczyć `OK`, potwierdzające, że urządzenie repeatera jest teraz w trybie OTA.
5. Polecenie `start ota` na urządzeniu opartym na ESP32 uruchamia hotspot Wi-Fi o nazwie `MeshCore OTA`.
6. Połącz swój telefon lub komputer z hotspotem „MeshCore OTA”.
7. Z poziomu przeglądarki wejdź na <http://192.168.4.1/update> i prześlij niescalony plik bin z flashera.

### 7.3. Czy istnieje sposób na zmniejszenie ryzyka nieudanej aktualizacji firmware przez OTA (DFU)?
Bootloader OTAFIX autorstwa `che aporeps` zwiększa odporność aktualizacji OTA DFU na błędy w urządzeniach z nRF52. Jeśli wykryje nieprawidłowy firmware aplikacji, wraca do trybu OTA DFU. Pozwala to ponownie wgrać firmware i przywrócić działanie urządzenia.

Aktualne informacje znajdziesz pod adresem <https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX>.

Obecnie obsługiwane są następujące płytki:

- Heltec Automation Mesh Node T114 / HT-nRF5262
- Nologo ProMicro NRF52840 (znany też jako SuperMini NRF52840)
- Seeed Studio SenseCAP Card Tracker T1000-E
- Seeed Studio Wio Tracker L1
- Seeed Studio XIAO nRF52840 BLE
- Seeed Studio XIAO nRF52840 BLE SENSE
- RAK 4631
- RAK WisMesh Tag (nowość od 28/11/2025)

### 7.4. Czy logo i czcionka MeshCore są dostępne?
Logo i czcionkę znajdziesz w [repozytorium MeshCore](https://github.com/meshcore-dev/MeshCore/tree/main/logo).

### 7.5. Jaki jest format kodu QR kontaktu lub kanału?
Kanał: `meshcore://channel/add?name=<name>&secret=<secret>`

Kontakt: `meshcore://contact/add?name=<name>&public_key=<public_key>&type=<type>`

Gdzie `&type` to:

- `chat = 1`
- `repeater = 2`
- `room = 3`
- `sensor = 4`

### 7.6. Jak połączyć się z companionem przez Wi-Fi, np. na Heltec V3?
Firmware Wi-Fi wymaga samodzielnej kompilacji, ponieważ musisz ustawić SSID i hasło Wi-Fi.
Ustaw `WIFI_SSID` i `WIFI_PWD` w `./variants/heltec_v3/platformio.ini`, skompiluj firmware i wgraj go na urządzenie.

### 7.7. Jak ustawić moc nadawania w Station G2, Heltec V4 i urządzeniach z modułami EByte?
Moc nadawania radia Companion ustawisz w aplikacji mobilnej. W repeaterze i room serwerze służy do tego polecenie `set tx`. Bieżącą wartość odczytasz poleceniem `get tx`.

⚠️ **UWAGA: ustawiaj te wartości na własne ryzyko. Nieprawidłowe ustawienia mocy mogą trwale uszkodzić sprzęt radiowy.**

| Urządzenie / model                                                                  | Region / opis                        | Ustawienie w aplikacji (dBm) | Docelowa moc wyjściowa radia | Uwagi                                                                                                                                            |
|:-------------------------------------------------------------------------------------|:---------------------------------------|:------------------------------|:--------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| **Station G2** <br> [Odnośnik](https://wiki.uniteng.com/en/meshtastic/station-g2)    | Maksymalna moc dla US915                | 19 dBm                        | 36,5 dBm (4,46W)                 |                                                                                                                                                    |
|                                                                                        | Maksymalna moc dla US915 w punkcie kompresji 1dB | 16 dBm                | 35 dBm (3,16W)                   | Punkt kompresji 1dB                                                                                                                               |
|                                                                                        | Maksymalna moc dla EU868 w punkcie kompresji 1dB | 15 dBm                | 34,5 dBm (2,82W)                 | Punkt kompresji 1dB                                                                                                                               |
|                                                                                        | Moc wyjściowa 1W dla US915               | 10 dBm                        | 1W                               | Sprawdź wymagania obowiązujące w Twoim kraju                                                                                                     |
|                                                                                        | Moc wyjściowa 1W dla EU868               | 9 dBm                         | 1W                               | Sprawdź wymagania obowiązujące w Twoim kraju                                                                                                     |
| **Ikoka Stick E22-900M30S**                                                           | Model 1W                                | 19 dBm                        | 1W                               | **NIE PRZEKRACZAJ** (ryzyko spalenia) [karta danych](https://www.cdebyte.com/pdf-down.aspx?id=4216)                                              |
| **Ikoka Stick E22-900M33S**                                                           | Model 2W                                | 9 dBm                         | 2W                               | **NIE PRZEKRACZAJ** (ryzyko spalenia) [karta danych](https://www.cdebyte.com/pdf-down.aspx?id=4216) Sprawdź wymagania obowiązujące w Twoim kraju |
| **Heltec V4**                                                                         | Moc standardowa                          | 10 dBm                        | 22 dBm (~0,15W)                  |                                                                                                                                                    |
|                                                                                        | Moc podwyższona                          | 22 dBm                        | 28 dBm (~0,5W do 0,6W)           |                                                                                                                                                    |

---

### 7.8. Jak korzystać z Ethernetu na RAK4631?
MeshCore obsługuje Ethernet na płytkach RAK4631 przy użyciu modułu [RAK13800](https://docs.rakwireless.com/product-categories/wisblock/rak13800/datasheet/) WisBlock Ethernet (opartego na układzie W5100S).

**Wymagany sprzęt:**
- RAK4631 WisBlock Core
- RAK19007 lub RAK19018 WisBlock Base Board (z wolnym gniazdem IO)
- Moduł RAK13800 WisBlock Ethernet
- Kabel Ethernet podłączony do sieci z serwerem DHCP

**Firmware:**
Wgraj jeden z wariantów firmware z obsługą Ethernetu:
- `RAK_4631_repeater_ethernet` - repeater z dostępem do CLI przez Ethernet
- `RAK_4631_room_server_ethernet` - room serwer z dostępem do CLI przez Ethernet
- `RAK_4631_companion_radio_ethernet` - companion radio przez Ethernet (zastępuje BLE)

**Łączenie:**
- Urządzenie automatycznie uzyskuje adres IP przez DHCP przy starcie.
- Dla repeaterów i room serwerów połącz się z urządzeniem na porcie TCP 23 dowolnym klientem TCP (np. `nc <ip> 23` lub PuTTY w trybie raw). Daje to dostęp do tego samego CLI co przez port szeregowy/USB.
- Dla firmware companion radio interfejs Ethernet zastępuje BLE jako transport do aplikacji companion. Połącz się na porcie TCP 5000 (tak samo jak przy companion radio przez Wi-Fi).
- Użyj polecenia CLI `eth.status`, aby sprawdzić status połączenia i zobaczyć przypisany adres IP.
