---
title: FAQ
description: Najczęściej zadawane pytania i odpowiedzi dotyczące sieci MeshCore.
order: 1
sourceUrl: https://docs.meshcore.io/faq
createdAt: 22.08.2026
---

# Najczęściej zadawane pytania

Lista najczęściej zadawanych pytań i odpowiedzi dotyczących MeshCore

- [Najczęściej zadawane pytania](#najczęściej-zadawane-pytania)
- [1. Wprowadzenie](#1-wprowadzenie)
    - [1.1. Czym jest MeshCore?](#11-czym-jest-meshcore)
    - [1.2. Co jest potrzebne, aby zacząć korzystać z MeshCore?](#12-co-jest-potrzebne-aby-zacząć-korzystać-z-meshcore)
        - [1.2.1. Sprzęt](#121-sprzęt)
        - [1.2.2. Firmware](#122-firmware)
        - [1.2.3. Firmware radia Companion](#123-firmware-radia-companion)
        - [1.2.4. Repeater](#124-repeater)
        - [1.2.5. Room Server](#125-room-server)
- [2. Konfiguracja początkowa](#2-konfiguracja-początkowa)
    - [2.1. Ile urządzeń potrzebuję, aby zacząć korzystać z MeshCore?](#21-ile-urządzeń-potrzebuję-aby-zacząć-korzystać-z-meshcore)
    - [2.2. Czy MeshCore kosztuje jakieś pieniądze?](#22-czy-meshcore-kosztuje-jakieś-pieniądze)
    - [2.3. Jakie częstotliwości są obsługiwane przez MeshCore?](#23-jakie-częstotliwości-są-obsługiwane-przez-meshcore)
    - [2.4. Czym jest „advert” w MeshCore?](#24-czym-jest-advert-w-meshcore)
    - [2.5. Czy istnieje limit hopów?](#25-czy-istnieje-limit-hopów)
- [3. Administracja serwerem](#3-administracja-serwerem)
    - [3.1. Jak skonfigurować repeatera lub room server?](#31-jak-skonfigurować-repeatera-lub-room-server)
    - [3.2. Czy muszę ustawić lokalizację dla repeatera?](#32-czy-muszę-ustawić-lokalizację-dla-repeatera)
    - [3.3. Jakie jest hasło do administracji repeaterem lub room serverem?](#33-jakie-jest-hasło-do-administracji-repeaterem-lub-room-serverem)
    - [3.4. Jakie jest hasło do dołączenia do room servera?](#34-jakie-jest-hasło-do-dołączenia-do-room-servera)
    - [3.5. Czy mogę odczytać lub ustawić klucz prywatny repeatera?](#35-czy-mogę-odczytać-lub-ustawić-klucz-prywatny-repeatera)
    - [3.6. Pierwszy bajt klucza publicznego mojego repeatera koliduje z istniejącym repeaterem w sieci mesh. Jak wygenerować nowy klucz prywatny z pasującym kluczem publicznym o wybranym przeze mnie pierwszym bajcie?](#36-pierwszy-bajt-klucza-publicznego-mojego-repeatera-koliduje-z-istniejącym-repeaterem-w-sieci-mesh-jak-wygenerować-nowy-klucz-prywatny-z-pasującym-kluczem-publicznym-o-wybranym-przeze-mnie-pierwszym-bajcie)
    - [3.7. Mój repeater może cierpieć na „głuchotę” spowodowaną silnymi zakłóceniami w pobliżu częstotliwości mojej sieci mesh, nie słyszy innych radiów MeshCore w zasięgu. Co mogę zrobić?](#37-mój-repeater-może-cierpieć-na-głuchotę-spowodowaną-silnymi-zakłóceniami-w-pobliżu-częstotliwości-mojej-sieci-mesh-nie-słyszy-innych-radiów-meshcore-w-zasięgu-co-mogę-zrobić)
    - [3.8. Jak zrobić z mojego repeatera obserwatora sieci mesh?](#38-jak-zrobić-z-mojego-repeatera-obserwatora-sieci-mesh)
    - [3.9. Czym jest obsługa multibyte? Co oznaczają adverty i wiadomości 1-, 2- i 3-bajtowe?](#39-czym-jest-obsługa-multibyte-co-oznaczają-adverty-i-wiadomości-1--2--i-3-bajtowe)
        - [3.9.1. Jakie rozmiary hashy ścieżki przekaże mój repeater?](#391-jakie-rozmiary-hashy-ścieżki-przekaże-mój-repeater)
        - [3.9.2. Co decyduje o rozmiarze hasha ścieżki pakietu?](#392-co-decyduje-o-rozmiarze-hasha-ścieżki-pakietu)
        - [3.9.3. Jak zmienić rozmiar hasha ścieżki mojego companiona?](#393-jak-zmienić-rozmiar-hasha-ścieżki-mojego-companiona)
        - [3.9.4. Co robi polecenie CLI `path.hash.mode` na repeaterze?](#394-co-robi-polecenie-cli-pathhashmode-na-repeaterze)
        - [3.9.5. Dlaczego stosować 2- lub 3-bajtowy hash ścieżki dla advertów?](#395-dlaczego-stosować-2--lub-3-bajtowy-hash-ścieżki-dla-advertów)
        - [3.9.6. Kiedy możemy odejść od 1-bajtowego hasha ścieżki dla kanałów i wiadomości bezpośrednich?](#396-kiedy-możemy-odejść-od-1-bajtowego-hasha-ścieżki-dla-kanałów-i-wiadomości-bezpośrednich)
- [4. T-Deck](#4-t-deck)
    - [4.1. Czy istnieje przewodnik użytkownika dla T-Deck, T-Pager, T-Watch lub T-Display Pro?](#41-czy-istnieje-przewodnik-użytkownika-dla-t-deck-t-pager-t-watch-lub-t-display-pro)
    - [4.2. Jakie są kroki, aby przełączyć T-Deck w tryb DFU (Device Firmware Update)?](#42-jakie-są-kroki-aby-przełączyć-t-deck-w-tryb-dfu-device-firmware-update)
    - [4.3. Dlaczego mój T-Deck Plus nie łapie sygnału satelitarnego?](#43-dlaczego-mój-t-deck-plus-nie-łapie-sygnału-satelitarnego)
    - [4.4. Dlaczego mój podstawowy (nie-Plus) T-Deck nie łapie sygnału satelitarnego?](#44-dlaczego-mój-podstawowy-nie-plus-t-deck-nie-łapie-sygnału-satelitarnego)
    - [4.5. Jaki rozmiar karty SD obsługuje T-Deck?](#45-jaki-rozmiar-karty-sd-obsługuje-t-deck)
    - [4.6. Jaki jest klucz publiczny domyślnego kanału publicznego?](#46-jaki-jest-klucz-publiczny-domyślnego-kanału-publicznego)
    - [4.7. Jak zdobyć mapy na T-Deck?](#47-jak-zdobyć-mapy-na-t-deck)
    - [4.8. Gdzie umieścić kafelki mapy?](#48-gdzie-umieścić-kafelki-mapy)
    - [4.9. Jak odblokować głębsze przybliżenie mapy i funkcje zarządzania serwerem na T-Deck?](#49-jak-odblokować-głębsze-przybliżenie-mapy-i-funkcje-zarządzania-serwerem-na-t-deck)
    - [4.10. Jak odczytać ekran diagnostyczny na T-Deck?](#410-jak-odczytać-ekran-diagnostyczny-na-t-deck)
    - [4.11. Dźwięk na T-Deck jest zbyt głośny?](#411-dźwięk-na-t-deck-jest-zbyt-głośny)
    - [4.12. Czy można dostosować dźwięk?](#412-czy-można-dostosować-dźwięk)
    - [4.13. Czym jest funkcja „Import from Clipboard” na T-Deck i czy istnieje sposób na ręczne dodawanie węzłów bez konieczności odbierania advertów?](#413-czym-jest-funkcja-import-from-clipboard-na-t-deck-i-czy-istnieje-sposób-na-ręczne-dodawanie-węzłów-bez-konieczności-odbierania-advertów)
    - [4.14. Jak zrobić zrzut ekranu na T-Deck?](#414-jak-zrobić-zrzut-ekranu-na-t-deck)
- [5. Ogólne](#5-ogólne)
    - [5.1. Czym są BW, SF i CR?](#51-czym-są-bw-sf-i-cr)
    - [5.2. Czy klienci MeshCore przekazują pakiety dalej (repeat)?](#52-czy-klienci-meshcore-przekazują-pakiety-dalej-repeat)
    - [5.3. Co się dzieje, gdy węzeł pozna trasę przez mobilnego repeatera, a ten repeater zniknie?](#53-co-się-dzieje-gdy-węzeł-pozna-trasę-przez-mobilnego-repeatera-a-ten-repeater-zniknie)
    - [5.4. Jak węzeł odkrywa ścieżkę do swojego celu, a następnie wykorzystuje ją do wysyłania wiadomości w przyszłości, zamiast zalewać (flood) każdą wysyłaną wiadomość jak w Meshtastic?](#54-jak-węzeł-odkrywa-ścieżkę-do-swojego-celu-a-następnie-wykorzystuje-ją-do-wysyłania-wiadomości-w-przyszłości-zamiast-zalewać-flood-każdą-wysyłaną-wiadomość-jak-w-meshtastic)
    - [5.5. Czy kanały publiczne zawsze się zalewają (flood)? Czy kanały prywatne zawsze się zalewają?](#55-czy-kanały-publiczne-zawsze-się-zalewają-flood-czy-kanały-prywatne-zawsze-się-zalewają)
    - [5.6. Jaki jest klucz publiczny domyślnego kanału publicznego?](#56-jaki-jest-klucz-publiczny-domyślnego-kanału-publicznego)
    - [5.7. Czy MeshCore jest open source?](#57-czy-meshcore-jest-open-source)
    - [5.8. Jak mogę wesprzeć MeshCore?](#58-jak-mogę-wesprzeć-meshcore)
    - [5.9. Jak zbudować firmware MeshCore ze źródeł?](#59-jak-zbudować-firmware-meshcore-ze-źródeł)
    - [5.10. Czy istnieją inne projekty open source związane z MeshCore?](#510-czy-istnieją-inne-projekty-open-source-związane-z-meshcore)
    - [5.11. Czy MeshCore obsługuje ATAK?](#511-czy-meshcore-obsługuje-atak)
    - [5.12. Jak dodać węzeł do Mapy MeshCore?](#512-jak-dodać-węzeł-do-mapy-meshcore)
    - [5.13. Czy mogę użyć Raspberry Pi do aktualizacji radia MeshCore?](#513-czy-mogę-użyć-raspberry-pi-do-aktualizacji-radia-meshcore)
    - [5.14. Czy istnieją projekty budowane wokół MeshCore?](#514-czy-istnieją-projekty-budowane-wokół-meshcore)
    - [5.15. Czy istnieją aplikacje klienckie na Windows lub Mac?](#515-czy-istnieją-aplikacje-klienckie-na-windows-lub-mac)
    - [5.16. Czy istnieją materiały porównujące MeshCore z innymi systemami LoRa?](#516-czy-istnieją-materiały-porównujące-meshcore-z-innymi-systemami-lora)
- [6. Rozwiązywanie problemów](#6-rozwiązywanie-problemów)
    - [6.1. Mój klient pokazuje, że inny klient, repeater lub room server był ostatnio widziany bardzo, bardzo dawno temu.](#61-mój-klient-pokazuje-że-inny-klient-repeater-lub-room-server-był-ostatnio-widziany-bardzo-bardzo-dawno-temu)
    - [6.2. Repeater, klient lub room server, który spodziewam się zobaczyć na liście discover (na T-Deck) lub liście kontaktów (na kliencie na urządzeniu mobilnym), nie jest widoczny.](#62-repeater-klient-lub-room-server-który-spodziewam-się-zobaczyć-na-liście-discover-na-t-deck-lub-liście-kontaktów-na-kliencie-na-urządzeniu-mobilnym-nie-jest-widoczny)
    - [6.3. Jak połączyć się z repeaterem przez BLE (Bluetooth)?](#63-jak-połączyć-się-z-repeaterem-przez-ble-bluetooth)
    - [6.4. Mój companion nie pojawia się przez Bluetooth?](#64-mój-companion-nie-pojawia-się-przez-bluetooth)
    - [6.5. Nie mogę połączyć się przez Bluetooth, jaki jest kod parowania Bluetooth?](#65-nie-mogę-połączyć-się-przez-bluetooth-jaki-jest-kod-parowania-bluetooth)
    - [6.6. Mój Heltec V3 ciągle rozłącza się ze smartfonem. Nie może utrzymać stabilnego połączenia Bluetooth.](#66-mój-heltec-v3-ciągle-rozłącza-się-ze-smartfonem-nie-może-utrzymać-stabilnego-połączenia-bluetooth)
    - [6.7. Moje urządzenie RAK/T1000-E/xiao_nRF52 wydaje się uszkodzone/zepsute, jak wyczyścić je, aby zacząć od nowa?](#67-moje-urządzenie-rakt1000-exiao_nrf52-wydaje-się-uszkodzonezepsute-jak-wyczyścić-je-aby-zacząć-od-nowa)
    - [6.8. WebFlasher zawodzi na Linuksie z błędem failed to open](#68-webflasher-zawodzi-na-linuksie-z-błędem-failed-to-open)
- [7. Inne pytania](#7-inne-pytania)
    - [7.1. Jak zaktualizować firmware companiona, repeatera i room servera na urządzeniach nRF (RAK, T114, Seeed XIAO) przez OTA za pomocą nowej, prostszej aplikacji DFU?](#71-jak-zaktualizować-firmware-companiona-repeatera-i-room-servera-na-urządzeniach-nrf-rak-t114-seeed-xiao-przez-ota-za-pomocą-nowej-prostszej-aplikacji-dfu)
        - [7.1.1. Czy mogę zaktualizować Seeed Studio Wio Tracker L1 Pro przez OTA?](#711-czy-mogę-zaktualizować-seeed-studio-wio-tracker-l1-pro-przez-ota)
    - [7.2. Jak zaktualizować urządzenia oparte na ESP32 przez OTA?](#72-jak-zaktualizować-urządzenia-oparte-na-esp32-przez-ota)
    - [7.3. Czy istnieje sposób na zmniejszenie ryzyka nieudanej aktualizacji firmware przez OTA (DFU)?](#73-czy-istnieje-sposób-na-zmniejszenie-ryzyka-nieudanej-aktualizacji-firmware-przez-ota-dfu)
    - [7.4. Czy logo i czcionka MeshCore są dostępne?](#74-czy-logo-i-czcionka-meshcore-są-dostępne)
    - [7.5. Jaki jest format kodu QR kontaktu lub kanału?](#75-jaki-jest-format-kodu-qr-kontaktu-lub-kanału)
    - [7.6. Jak połączyć się z companionem przez Wi-Fi, np. na Heltec V3?](#76-jak-połączyć-się-z-companionem-przez-wi-fi-np-na-heltec-v3)
    - [7.7. Mam Station G2, Heltec V4, Ikoka Stick lub radio z modułem EByte E22-900M30S albo EByte E22-900M33S, na jaką moc nadawania powinienem je ustawić?](#77-mam-station-g2-heltec-v4-ikoka-stick-lub-radio-z-modułem-ebyte-e22-900m30s-albo-ebyte-e22-900m33s-na-jaką-moc-nadawania-powinienem-je-ustawić)

## 1. Wprowadzenie

### 1.1. Czym jest MeshCore?
MeshCore to wieloplatformowy system umożliwiający bezpieczną, tekstową komunikację z wykorzystaniem sprzętu radiowego LoRa. Może być używany do komunikacji poza siecią (off-grid), reagowania kryzysowego i usuwania skutków katastrof, aktywności outdoorowych, zastosowań taktycznych, w tym w służbach porządkowych i ochronie prywatnej, a także w sieciach czujników IoT. ([źródło](https://meshcore.io/))

MeshCore jest darmowe i open source:

- MeshCore to routing, firmware itd., dostępne na GitHubie na licencji MIT
- Istnieją klienci tworzeni przez społeczność, np. klienty webowe - są darmowe w użyciu, a niektóre są też open source
- Wieloplatformowa aplikacja mobilna stworzona przez [Liama Cottle'a](https://liamcottle.net) na Androida/iOS/PC itd. jest darmowa do pobrania i użytku
- Firmware T-Deck jest rozwijany przez Scotta z Ripple Radios, twórcę MeshCore, i również jest darmowy do wgrania na urządzenia i użytku

Niektóre bardziej zaawansowane, ale opcjonalne funkcje są dostępne na T-Deck po zarejestrowaniu urządzenia w celu uzyskania klucza odblokowującego. W smartfonowych klientach MeshCore na Androida i iOS/iPadOS można odblokować funkcję pominięcia timera oczekiwania przy zdalnym zarządzaniu repeaterem i room serverem przez RF.

Te funkcje są całkowicie opcjonalne i nie są potrzebne do podstawowego korzystania z komunikatora. Są jak dodatkowe funkcje bonusowe - aby pomóc deweloperom kontynuować pracę nad tymi świetnymi funkcjami, mogą oni pobierać niewielką opłatę za kod odblokowujący te zaawansowane funkcje.

Każdy może zbudować cokolwiek zechce na bazie MeshCore, nie płacąc nic.

### 1.2. Co jest potrzebne, aby zacząć korzystać z MeshCore?
Wszystko, czego potrzebujesz do MeshCore, jest dostępne pod adresem:

- Główna strona: [https://meshcore.io](https://meshcore.io)
- Flasher firmware: [https://flasher.meshcore.io](https://flasher.meshcore.io)
- Firmware MeshCore na GitHubie: [https://github.com/meshcore-dev/MeshCore](https://github.com/meshcore-dev/MeshCore)
- Aplikacja webowa MeshCore Companion: [https://app.meshcore.nz](https://app.meshcore.nz)
- Mapa MeshCore: [https://map.meshcore.io](https://map.meshcore.io)
- [Prezentacja techniczna MeshCore](https://www.youtube.com/watch?v=OwmkVkZQTf4) Liama Cottle'a

Potrzebujesz sprzętowych urządzeń LoRa, aby uruchomić firmware MeshCore jako klient lub serwer (repeater i room server).

#### 1.2.1. Sprzęt
MeshCore jest dostępne na wielu urządzeniach LoRa 433MHz, 868MHz i 915MHz. Na przykład Lilygo T-Deck, T-Pager, urządzenia RAK Wireless WisBlock RAK4631 (np. 19003, 19007, 19026), Heltec V3, Xiao S3 WIO, Xiao C3, Heltec T114, Station G2, Nano G2 Ultra, Seeed Studio T1000-E. Regularnie dodawane są kolejne urządzenia.

Aktualną listę obsługiwanych urządzeń znajdziesz pod adresem <https://flasher.meshcore.io>

Aby korzystać z MeshCore bez telefonu jako interfejsu klienckiego, możesz uruchomić MeshCore na LilyGo T-Deck, T-Deck Plus, T-Pager, T-Watch lub T-Display Pro. Firmware MeshCore Ultra działający na tych urządzeniach to kompletne, samodzielne rozwiązanie do bezpiecznej komunikacji poza siecią (off-grid).

#### 1.2.2. Firmware
MeshCore ma cztery typy firmware, które nie są dostępne w innych systemach LoRa. MeshCore obejmuje:

#### 1.2.3. Firmware radia Companion
Radia Companion służą do łączenia się z aplikacją na Androida lub aplikacją webową jako klient komunikatora. Istnieją dwie różne wersje firmware radia Companion:

1. **BLE Companion**
   Firmware BLE Companion działa na obsługiwanym urządzeniu LoRa i łączy się z urządzeniem mobilnym z klientem MeshCore na Android lub iOS przez BLE
   <https://meshcore.io>

2. **USB Serial Companion**
   Firmware USB Serial Companion działa na obsługiwanym urządzeniu LoRa i łączy się z urządzeniem mobilnym lub komputerem przez USB Serial, wykorzystując webowego klienta MeshCore
   <https://app.meshcore.nz>

#### 1.2.4. Repeater
Repeatery służą do zwiększania zasięgu sieci MeshCore. Firmware repeatera działa na tych samych urządzeniach, na których działa firmware klienta. Zadaniem repeatera jest przekazywanie pakietów MeshCore do urządzenia docelowego. **Nie** przekazuje ani nie retransmituje każdego odebranego pakietu, w przeciwieństwie do innych systemów mesh LoRa.

Repeaterem można zarządzać zdalnie za pomocą T-Deck z uruchomionym firmware MeshCore z odblokowanymi funkcjami zdalnej administracji, lub z klienta BLE Companion połączonego ze smartfonem z uruchomioną aplikacją MeshCore.

#### 1.2.5. Room Server
Room server to prosty serwer BBS do udostępniania postów. Urządzenia T-Deck z firmware MeshCore lub klient BLE Companion połączony ze smartfonem z aplikacją MeshCore mogą łączyć się z room serverem.

Room servery przechowują na sobie historię wiadomości i przesyłają zapisane wiadomości użytkownikom. Room servery pozwalają wracającym (roamingowym) użytkownikom powrócić później i pobrać historię wiadomości. W przypadku kanałów wiadomości są albo odbierane w momencie wysłania, albo nieodebrane i pominięte, jeśli użytkownik kanału jest poza zasięgiem. Room servery działają inaczej - bardziej jak serwery e-mail, na które można wrócić później i odebrać swoje wiadomości z serwera pocztowego.

Room serverem można zarządzać zdalnie za pomocą T-Deck z uruchomionym firmware MeshCore z odblokowanymi funkcjami zdalnej administracji, lub z klienta BLE Companion połączonego ze smartfonem z uruchomioną aplikacją MeshCore.

Gdy klient loguje się do room servera, otrzymuje ostatnie 32 nieprzeczytane wiadomości.

Chociaż room server może również przekazywać pakiety dalej (repeat) za pomocą polecenia z linii poleceń `set repeat on`, nie jest to zalecane ani zachęcane. Room server z ustawionym `repeat` na `on` nie ma pełnego zestawu funkcji repeatera i zdalnej administracji, które są dostępne wyłącznie w firmware repeatera.

Zaleca się uruchamianie repeatera i room servera na osobnych urządzeniach, aby uzyskać najlepsze doświadczenie.

---

## 2. Konfiguracja początkowa

### 2.1. Ile urządzeń potrzebuję, aby zacząć korzystać z MeshCore?
Jeśli masz jedno obsługiwane urządzenie, wgraj firmware BLE Companion i używaj urządzenia jako klienta. Możesz połączyć się z urządzeniem za pomocą klienta na Androida lub iOS przez Bluetooth. Możesz zacząć komunikować się z innymi użytkownikami MeshCore w Twojej okolicy.

Jeśli masz dwa obsługiwane urządzenia i niewielu użytkowników MeshCore w okolicy, wgraj na oba firmware BLE Companion, aby używać swoich urządzeń do komunikacji z bliskimi przyjaciółmi i rodziną.

Jeśli masz dwa obsługiwane urządzenia i w okolicy są inni użytkownicy MeshCore, możesz wgrać na jedno z urządzeń firmware BLE Companion, a na drugie obsługiwane urządzenie - firmware repeatera. Umieść repeatera wysoko nad ziemią, aby zwiększyć zasięg swojej sieci MeshCore.

Po wgraniu najnowszego firmware na urządzenie repeatera, utrzymaj urządzenie podłączone do komputera przez USB serial, użyj funkcji konsoli w web flasherze i ustaw częstotliwość dla swojego regionu lub kraju, aby Twój klient mógł zdalnie zarządzać repeaterem lub room serverem przez RF:

`set freq {frequency}`

Dokumentacja poleceń CLI dla repeatera i room servera znajduje się tutaj: <https://docs.meshcore.io/cli_commands>

Jeśli masz więcej obsługiwanych urządzeń, dodatkowe urządzenia możesz wykorzystać z firmware room servera.

### 2.2. Czy MeshCore kosztuje jakieś pieniądze?
Wszystkie wersje firmware radia (np. dla Heltec V3, RAK, T-1000E itd.) są darmowe i open source, rozwijane przez Scotta z Ripple Radios.

Natywny klient na Androida i iOS wykorzystuje model freemium i jest rozwijany przez Liama Cottle'a, twórcę mapy Meshtastic pod adresem [meshtastic.liamcottle.net](https://meshtastic.liamcottle.net) na [GitHubie](https://github.com/liamcottle/meshtastic-map) oraz [reticulum-meshchat na GitHubie](https://github.com/liamcottle/reticulum-meshchat).

Firmware T-Deck jest darmowy do pobrania, a większość funkcji jest dostępna bez opłat. Aby wesprzeć dewelopera firmware, możesz zapłacić za klucz rejestracyjny, który odblokuje w T-Deck głębsze przybliżenie mapy i zdalną administrację serwerami przez RF za pomocą T-Deck. Nie musisz płacić za rejestrację, aby korzystać z T-Deck do wiadomości bezpośrednich i łączenia się z repeaterami oraz room serverami.

### 2.3. Jakie częstotliwości są obsługiwane przez MeshCore?
Obsługiwany jest zakres 868MHz w Wielkiej Brytanii/UE oraz zakres 915MHz w Nowej Zelandii, Australii i USA. Obsługiwane są również kraje i regiony mieszczące się w tych dwóch zakresach częstotliwości.

Użyj klienta na smartfonie lub funkcji konfiguracji repeatera w web flasherze, aby ustawić parametry RF swoich radiów, wybierając preset dla swojego regionu.

Ostatnio, od października 2025, wiele regionów przeszło na ustawienie „narrow”, czyli użycie BW62.5 i niższej wartości SF (zamiast pierwotnego SF11). Na przykład preset USA/Kanada (zalecany) to 910.525MHz, SF7, BW62.5, CR5.

Po intensywnych testach wiele regionów przeszło lub przechodzi na BW62.5 oraz SF7, 8 lub 9. Węższe pasmo i niższa wartość SF pozwalają sygnałom radiowym MeshCore zmieścić się między zakłóceniami w paśmie ISM, zapewniają niższy poziom szumu, lepsze SNR i szybszą transmisję.

Jeśli Twoja społeczność w regionie osiągnęła konsensus co do aktualizacji zalecanego presetu dla Twojego regionu, opisz swoją prośbę o aktualizację na kanale [#meshcore-app](https://discord.com/channels/1343693475589263471/1391681655911088241) na [serwerze Discord MeshCore](https://meshcore.gg), aby poinformować o tym Liama Cottle'a.

### 2.4. Czym jest „advert” w MeshCore?
Advert oznacza rozgłoszenie samego siebie w sieci. W terminologii Reticulum byłoby to „announce”. W terminologii Meshtastic byłoby to wysłanie przez węzeł informacji o sobie (node info).

MeshCore pozwala ręcznie rozgłosić swoją nazwę, pozycję i publiczny klucz szyfrujący, który jest też podpisany, aby zapobiec podszywaniu się. Gdy klikniesz przycisk advertu, te dane są rozgłaszane przez LoRa. MeshCore nazywa to Advertem. Istnieją dwa sposoby rozgłaszania advertu: „zero hop” i „flood”.

- Zero hop oznacza, że Twój advert jest rozgłaszany do każdego, kto go usłyszy, i na tym się kończy.
- Flood oznacza, że jest rozgłaszany, a następnie przekazywany dalej przez wszystkie repeatery, które go usłyszą.

Klienci MeshCore rozgłaszają się wyłącznie wtedy, gdy zainicjuje to użytkownik. Repeater domyślnie wysyła advert typu flood raz na 12 godzin. Ten interwał można skonfigurować za pomocą polecenia:

`set flood.advert.interval {hours}`

Osobne polecenie `set advert.interval {minutes}` kontroluje lokalny timer advertu typu zero-hop.

### 2.5. Czy istnieje limit hopów?
Wewnętrznie firmware ma maksymalny limit 64 hopów. W realnych warunkach trudno będzie zbliżyć się do tego limitu ze względu na środowisko i czas, jaki pakiety potrzebują, by dotrzeć coraz dalej. Chętnie usłyszymy, jak daleko sięgają Twoje rozmowy w MeshCore.

---

## 3. Administracja serwerem

### 3.1. Jak skonfigurować repeatera lub room server?
Gdy MeshCore jest wgrywane na urządzenie LoRa po raz pierwszy, konieczne jest ustawienie częstotliwości urządzenia serwerowego, aby korzystało z częstotliwości legalnej w Twoim kraju lub regionie.

Repeaterem lub room serverem można zarządzać, korzystając z jednej z poniższych opcji:

- Po wgraniu firmware repeatera lub room servera na urządzenie LoRa, wejdź na <https://config.meshcore.io> i użyj interfejsu webowego, aby połączyć się z urządzeniem LoRa przez USB serial. Stamtąd możesz ustawić nazwę serwera, jego częstotliwość i inne powiązane ustawienia, lokalizację, hasła itd.

![image](https://github.com/user-attachments/assets/2a9d9894-e34d-4dbe-b57c-fc3c250a2d34)

- Podłącz urządzenie serwerowe kablem USB do komputera z przeglądarką Chrome na <https://flasher.meshcore.io>, a następnie użyj funkcji `console`, aby połączyć się z urządzeniem

- Użyj smartfonowego klienta MeshCore, aby zdalnie zarządzać serwerami przez LoRa.

- T-Deck z uruchomionym odblokowanym/zarejestrowanym firmware MeshCore. Zdalna administracja serwerem jest włączana poprzez zarejestrowanie T-Deck w Ripple Radios. To jeden ze sposobów na wsparcie rozwoju MeshCore. Możesz zarejestrować swój T-Deck pod adresem:

<https://buymeacoffee.com/ripplebiz/e/249834>

### 3.2. Czy muszę ustawić lokalizację dla repeatera?
Choć nie jest to wymagane, po ustawieniu lokalizacji dla repeatera pojawi się on w przyszłości na mapie MeshCore. Ustaw lokalizację poleceniami:

`set lat <GPS Lat>`

`set lon <GPS Lon>`

Szerokość i długość geograficzną możesz uzyskać z Google Maps, klikając prawym przyciskiem myszy na lokalizację, w której się znajdujesz.

### 3.3. Jakie jest hasło do administracji repeaterem lub room serverem?
Domyślne hasło administratora do repeatera i room servera to `password`. Użyj poniższego polecenia, aby zmienić hasło administratora:

`password {new-password}`

### 3.4. Jakie jest hasło do dołączenia do room servera?
Domyślne hasło gościa do room servera to `hello`. Użyj poniższego polecenia, aby zmienić hasło gościa:

`set guest.password {guest-password}`

### 3.5. Czy mogę odczytać lub ustawić klucz prywatny repeatera?
Możesz wydać poniższe polecenia, aby odczytać lub ustawić klucz prywatny repeatera przy użyciu połączenia USB serial.

`get prv.key`, aby wypisać klucz prywatny repeatera w konsoli szeregowej
`set prv.key <hex>`, aby ustawić klucz prywatny repeatera w konsoli szeregowej

Zrestartuj repeatera po poleceniu `set prv.key <hex>`, aby nowy klucz prywatny zaczął obowiązywać.

### 3.6. Pierwszy bajt klucza publicznego mojego repeatera koliduje z istniejącym repeaterem w sieci mesh. Jak wygenerować nowy klucz prywatny z pasującym kluczem publicznym o wybranym przeze mnie pierwszym bajcie?
Możesz wygenerować nowy klucz prywatny i wskazać pierwszy bajt jego klucza publicznego tutaj: <https://gessaman.com/mc-keygen>

Posiadanie wielu repeaterów z tym samym pierwszym bajtem ID nie wpływa negatywnie na sieć mesh ani jej funkcjonalność. Pakiety flood i pakiety ze ścieżką nadal dotrą do celu. Kolizja pierwszego bajtu ID utrudnia jednak analizę traceroute i ścieżek, ponieważ takie narzędzia nie wiedzą dokładnie, który z dwóch (lub więcej) kolidujących repeaterów faktycznie znajduje się na ścieżce.

Dobrą praktyką jest, aby przy konfigurowaniu nowego repeatera wybrać klucz publiczny, który nie jest jeszcze używany. Jeśli nie da się znaleźć unikalnego pierwszego bajtu dla klucza publicznego repeatera, wybierz taki, który jest unikalny w promieniu około 16 km (10 mil), aby zminimalizować kolizje z pobliskimi repeaterami.

### 3.7. Mój repeater może cierpieć na „głuchotę” spowodowaną silnymi zakłóceniami w pobliżu częstotliwości mojej sieci mesh, nie słyszy innych radiów MeshCore w zasięgu. Co mogę zrobić?
Może to wynikać z funkcji automatycznej regulacji wzmocnienia (AGC) radia SX1262. Możesz użyć tego polecenia, aby okresowo resetować jego AGC.

`set agc.reset.interval <number>`

Jednostką `<number>` są sekundy i wartość jest zwiększana co 4. `set agc.reset.interval 4` dobrze sprawdza się przy leczeniu „głuchoty”.

To bardzo mało kosztowna operacja. Reset AGC jest wykonywany poprzez proste ustawienie `state = STATE_IDLE;` w funkcji `RadioLibWrapper::resetAGC()` w `RadioLibWrappers.cpp`

### 3.8. Jak zrobić z mojego repeatera obserwatora sieci mesh?
Instrukcja dotycząca obserwatora jest dostępna tutaj: <https://analyzer.letsmesh.net/observer/onboard>

### 3.9. Czym jest obsługa multibyte? Co oznaczają adverty i wiadomości 1-, 2- i 3-bajtowe?
Pierwotny projekt protokołu MeshCore wykorzystuje pierwszy bajt klucza publicznego repeatera do oznaczania repeatera w ścieżce. Przy 1 bajcie na każdy repeater w ścieżce, pakiety MeshCore mogą pokonać nawet 64 hopy.

Jednak przy 1 bajcie dostępnych jest tylko 254 unikalnych ID (bez 00 i FF, które są zarezerwowane). Wiele grup mesh ma wiele repeaterów z tym samym pierwszym bajtem w swoich kluczach publicznych. Pakiety nadal przechodzą przez repeatery i sieć mesh nie ponosi z tego powodu żadnych szkód. Utrudnia to jednak narzędziom analizę ścieżek przy zduplikowanych ID repeaterów.

Firmware w wersji 1.14 i nowszej wprowadza możliwość rozgłaszania advertów przez repeatery z użyciem 1-, 2- lub 3-bajtowych hashy. Companiony mogą również wysyłać wiadomości kanałowe i bezpośrednie z 1-, 2- lub 3-bajtową ścieżką. Adverty i wiadomości wysłane ze ścieżką 1-bajtową są kompatybilne z firmware repeatera zarówno starszym, jak i nowszym niż 1.14. Będą podróżować do 64 hopów. Adverty i wiadomości 2-bajtowe będą podróżować do 32 hopów. Adverty i wiadomości 3-bajtowe będą podróżować do 21 hopów.

#### 3.9.1. Jakie rozmiary hashy ścieżki przekaże mój repeater?
Repeatery z firmware 1.14+ przekazują dalej pakiety wysłane z 1-, 2- lub 3-bajtowym hashem ścieżki. Repeatery ze starszym firmware niż 1.14 przekazują dalej wyłącznie pakiety z 1-bajtowym hashem ścieżki, a pakiety 2- i 3-bajtowe po cichu odrzucają.

#### 3.9.2. Co decyduje o rozmiarze hasha ścieżki pakietu?
O rozmiarze hasha ścieżki decyduje pierwotny nadawca pakietu. Najczęstszym pierwotnym nadawcą jest aplikacja companion. Innym częstym pierwotnym nadawcą jest repeater, gdy rozgłasza swój advert.

#### 3.9.3. Jak zmienić rozmiar hasha ścieżki mojego companiona?
Od wersji firmware 1.14 i aplikacji MeshCore w wersji 1.41.0, w aplikacji MeshCore możesz ustawić rozmiar hasha ścieżki wiadomości companiona w `Ustawienia (ikona zębatki)` -> `Ustawienia eksperymentalne`.

Dopóki zdecydowana większość repeaterów w Twojej regionalnej sieci mesh nie zostanie zaktualizowana do firmware 1.14+, zaleca się pozostawienie companiona przy domyślnym trybie 1-bajtowym, ponieważ repeatery ze starszym firmware niż 1.14 po cichu odrzucają wiadomości z większymi hashami ścieżki.

#### 3.9.4. Co robi polecenie CLI `path.hash.mode` na repeaterze?
To polecenie CLI `path.hash.mode` kontroluje *wyłącznie* rozmiar hasha ścieżki używany we własnych advertach rozgłaszanych przez repeatera. **NIE** wpływa ono na to, które pakiety repeater przekazuje dalej. Repeater z firmware 1.14+ zawsze przekazuje dalej pakiety 1-, 2- i 3-bajtowe, niezależnie od tego ustawienia.

Użycie: `set path.hash.mode {0|1|2}`:

| `path.hash.mode` | Rozmiar hasha ścieżki advertu |
|-------------------|-------------------------------|
| 0                 | 1 bajt (domyślnie)             |
| 1                 | 2 bajty                        |
| 2                 | 3 bajty                        |

Ustawienie trybu 1 lub 2 dla repeaterów z firmware 1.14+ jest bezpieczne.

#### 3.9.5. Dlaczego stosować 2- lub 3-bajtowy hash ścieżki dla advertów?
Dłuższy hash ścieżki pomaga narzędziom takim jak LetsMesh.net Analyzer i MeshMapper bardziej wiarygodnie odróżniać repeatery od siebie. Przy zaledwie 1 bajcie prawdopodobieństwo, że różne repeatery mają ten sam pierwszy bajt w swoim kluczu publicznym, jest wysokie, co utrudnia ich rozróżnienie podczas analizy sieci mesh. Ponieważ dotyczy to wyłącznie advertów, nie ma żadnych wad tego rozwiązania. Adverty 2- i 3-bajtowe nie docierają tak daleko jak adverty 1-bajtowe, ale nie jest istotne, aby węzły MeshCore słyszały advert repeatera oddalonego o 21 lub 32 hopy.

#### 3.9.6. Kiedy możemy odejść od 1-bajtowego hasha ścieżki dla kanałów i wiadomości bezpośrednich?
Warto przejść na wysyłanie wiadomości kanałowych i bezpośrednich z hashem 2- lub 3-bajtowym, gdy zdecydowana większość repeaterów w Twojej regionalnej sieci mesh zostanie zaktualizowana do firmware w wersji 1.14 lub nowszej. Ustawienie `path.hash.mode` repeatera na 1 (dla 2-bajtowego hasha ścieżki) lub 2 (dla 3-bajtowego hasha ścieżki) już teraz pomaga społeczności ocenić, ile repeaterów zostało zaktualizowanych do 1.14+. Współpracuj ze swoją społecznością MeshCore, aby wspólnie zdecydować, kiedy przełączyć się na ścieżkę 2- lub 3-bajtową dla wiadomości kanałowych i bezpośrednich.

---

## 4. T-Deck

### 4.1. Czy istnieje przewodnik użytkownika dla T-Deck, T-Pager, T-Watch lub T-Display Pro?
Tak, jest dostępny pod adresem <https://buymeacoffee.com/ripplebiz/ultra-v7-7-guide-meshcore-users>

### 4.2. Jakie są kroki, aby przełączyć T-Deck w tryb DFU (Device Firmware Update)?

1. Wyłącz urządzenie
2. Podłącz kabel USB do urządzenia
3. Przytrzymaj trackball (nie puszczaj)
4. Włącz urządzenie
5. Usłysz dźwięk połączenia USB
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
Potrzebujesz kafelków mapy (map tiles). Możesz pobrać gotowe kafelki mapy tutaj (to dobry sposób na wsparcie rozwoju):

- <https://buymeacoffee.com/ripplebiz/e/342543> (Europa)
- <https://buymeacoffee.com/ripplebiz/e/342542> (USA)

Innym sposobem na pobranie kafelków mapy jest użycie tego skryptu w Pythonie, aby pobrać kafelki dla wybranych obszarów:
<https://github.com/fistulareffigy/MTD-Script>

Istnieje również zmodyfikowana wersja skryptu, dodająca dodatkową obsługę błędów i równoległe pobieranie:
<https://github.com/TheBestJohn/MTD-Script>

### 4.8. Gdzie umieścić kafelki mapy?
Po pobraniu kafelków skopiuj folder `\tiles` do katalogu głównego karty SD Twojego T-Deck.

### 4.9. Jak odblokować głębsze przybliżenie mapy i funkcje zarządzania serwerem na T-Deck?
Firmware T-Deck możesz pobrać, zainstalować i używać za darmo, ale posiada ono pewne funkcje (przybliżenie mapy, administracja serwerem), które są włączane po zakupie kodu odblokowującego za 10 USD za urządzenie T-Deck.
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
#define PAYLOAD_TYPE_ACK 0x03 // a simple ack #define PAYLOAD_TYPE_ADVERT 0x04 // a node advertising its Identity
#define PAYLOAD_TYPE_GRP_TXT 0x05 // an (unverified) group text message (prefixed with channel hash, MAC) (enc data: timestamp, "name: msg")
#define PAYLOAD_TYPE_GRP_DATA 0x06 // an (unverified) group datagram (prefixed with channel hash, MAC) (enc data: data_type, data_len, blob)
#define PAYLOAD_TYPE_ANON_REQ 0x07 // generic request (prefixed with dest_hash, ephemeral pub_key, MAC) (enc data: ...)
#define PAYLOAD_TYPE_PATH 0x08 // returned path (prefixed with dest/src hashes, MAC) (enc data: path, extra)
```

[Źródło](https://discord.com/channels/1343693475589263471/1343693475589263474/1350611321040932966)

### 4.11. Dźwięk na T-Deck jest zbyt głośny?
### 4.12. Czy można dostosować dźwięk?
Możesz dostosować dźwięki na T-Deck, umieszczając pliki `.mp3` w katalogu głównym (`root`) karty SD. Pliki to:

- `startup.mp3`
- `error.mp3`
- `alert.mp3`
- `new-advert.mp3`
- `existing-advert.mp3`

### 4.13. Czym jest funkcja „Import from Clipboard” na T-Deck i czy istnieje sposób na ręczne dodawanie węzłów bez konieczności odbierania advertów?
„Import from Clipboard” służy do importowania kontaktu za pomocą pliku o nazwie `clipboard.txt` znajdującego się na karcie SD. Odwrotność tej funkcji znajduje się na ekranie tożsamości (Identity) - menu „Card to Clipboard”, które zapisuje do `clipboard.txt`, dzięki czemu możesz udostępnić siebie (nazywane „wizytówkami”, zaczynającymi się od `meshcore://...`)

### 4.14. Jak zrobić zrzut ekranu na T-Deck?
Aby zrobić zrzut ekranu na T-Deck, przytrzymaj lewy górny róg ekranu. Zrzut ekranu zostanie zapisany na karcie microSD, jeśli jest włożona do urządzenia.

---

## 5. Ogólne

### 5.1. Czym są BW, SF i CR?
**BW to bandwidth (szerokość pasma)** - szerokość widma częstotliwości używanego do transmisji

**SF to spreading factor (współczynnik rozpraszania)** - jak bardzo komunikacja powinna być rozłożona w czasie

**CR to coding rate (współczynnik kodowania)** - z: <https://www.thethingsnetwork.org/docs/lorawan/fec-and-code-rate>

W skrócie: domyślnie ustaw CR na 5 dla dobrych, stabilnych łączy. Jeśli łącze nie jest stabilne i jest przerywane, zmień CR na 7 lub 8.

Korekcja błędów w przód (Forward Error Correction) polega na dodawaniu nadmiarowych bitów do transmitowanych danych. Podczas transmisji dane mogą zostać uszkodzone przez zakłócenia (zmiany z 0 na 1 / z 1 na 0). Te bity korekcyjne są wykorzystywane przez odbiorników do odtwarzania uszkodzonych bitów.

Współczynnik kodowania (Code Rate) korekcji błędów w przód wyraża proporcję bitów w strumieniu danych, które faktycznie niosą użyteczną informację.

W LoRaWAN stosowane są 4 współczynniki kodowania:

4/5
4/6
5/7
4/8

Na przykład, jeśli współczynnik kodowania to 5/7, na każde 5 bitów użytecznej informacji koder generuje łącznie 7 bitów danych, z czego 2 bity są nadmiarowe.

Podwojenie szerokości pasma (z BW125 do BW250) pozwala wysłać 2x więcej bajtów w tym samym czasie. Obniżenie współczynnika rozpraszania o 1 stopień (z SF10 do SF9) pozwala wysłać 2x więcej bajtów w tym samym czasie.

Obniżenie współczynnika rozpraszania utrudnia bramce (gateway) odbiór transmisji, ponieważ staje się ona bardziej podatna na szumy. Można to porównać do dwóch osób rozmawiających w hałaśliwym miejscu (na przykład w barze). Jeśli jesteście od siebie daleko, musicie mówić wolno (SF10), ale jeśli jesteście blisko, możecie mówić szybciej (SF7)

To zatem balansowanie między szybkością transmisji a odpornością na szum.
The Things Network koncentruje się głównie na LoRaWAN, ale niskopoziomowe informacje o LoRa sprawdzają się w każdym projekcie LoRa

### 5.2. Czy klienci MeshCore przekazują pakiety dalej (repeat)?
Nie, klienci MeshCore nie przekazują pakietów dalej. To sedno komunikatorowo zorientowanej (messaging-first) konstrukcji MeshCore. Ma to zapobiegać zalewaniu (flood) eteru przez urządzenia i tworzeniu niekończących się kolizji, przez które wysyłane wiadomości nie docierają.
W MeshCore przekazują pakiety dalej wyłącznie repeatery i room servery z ustawionym `set repeat on`.

### 5.3. Co się dzieje, gdy węzeł pozna trasę przez mobilnego repeatera, a ten repeater zniknie?
Jeśli wcześniej docierałeś do węzła przez repeatera, a repeater ten stał się nieosiągalny, klient wyśle wiadomość, korzystając z istniejącej (ale już zerwanej) znanej ścieżki, wiadomość zawiedzie po 3 próbach, a aplikacja domyślnie zresetuje ścieżkę i przy ostatniej próbie wyśle wiadomość jako flood. Można to wyłączyć w ustawieniach. Jeśli cel jest osiągalny bezpośrednio lub przez inny repeater, nowa ścieżka będzie używana od tego momentu. Możesz też ustawić ścieżkę ręcznie, jeśli znasz konkretny repeater, przez który chcesz dotrzeć do celu.

W przypadku, gdy użytkownicy często się przemieszczają i ścieżki są zrywane, po prostu widzą w kliencie na telefonie ponowne próby i powrót do flood w celu ponownego ustanowienia ścieżki.

### 5.4. Jak węzeł odkrywa ścieżkę do swojego celu, a następnie wykorzystuje ją do wysyłania wiadomości w przyszłości, zamiast zalewać (flood) każdą wysyłaną wiadomość jak w Meshtastic?
Trasy są przechowywane na liście kontaktów nadawcy. Gdy wysyłasz wiadomość po raz pierwszy, dociera ona do celu poprzez routing zalewowy (flood). Gdy Twój węzeł docelowy odbierze wiadomość, odeśle nadawcy raport dostarczenia zawierający wszystkie repeatery, przez które przeszła oryginalna wiadomość. Ten raport dostarczenia jest odsyłany do Ciebie, nadawcy, metodą flood i stanowi podstawę dla przyszłej ścieżki bezpośredniej. Gdy wysyłasz kolejną wiadomość, ścieżka zostaje osadzona w pakiecie i oceniana przez repeatery. Jeśli hop i adres repeatera pasują, retransmituje on wiadomość, w przeciwnym razie jej nie retransmituje, co minimalizuje wykorzystanie sieci.

[Źródło](https://discord.com/channels/826570251612323860/1330643963501351004/1351279141630119996)

### 5.5. Czy kanały publiczne zawsze się zalewają (flood)? Czy kanały prywatne zawsze się zalewają?
Tak, kanały grupowe są typu A do B, więc nie ma zdefiniowanej ścieżki. Muszą się zalewać. Repeatery mogą jednak odmawiać przekazywania ruchu flood powyżej pewnego limitu hopów, za pomocą polecenia CLI `set flood.max`. Administratorzy repeaterów sami ustalają zasady dla swoich repeaterów.

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

Wesprzyj rozwój klienta na smartfony Liama Cottle'a, odblokowując bramkę oczekiwania na administrację serwerem poprzez zakup w aplikacji

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
python3 -m venv meshcore
cd meshcore && source bin/activate
pip install -U platformio
git clone https://github.com/ripplebiz/MeshCore.git
cd MeshCore
```
otwórz platformio.ini i w `[arduino_base]` zmień `LORA_FREQ=867.5`
zapisz, a następnie uruchom:
```bash
pio run -e RAK_4631_Repeater
```
następnie znajdziesz `firmware.zip` w `.pio/build/RAK_4631_Repeater`

### 5.10. Czy istnieją inne projekty open source związane z MeshCore?
Webowy klient MeshCore oraz biblioteka JavaScript MeshCore autorstwa [Liama Cottle'a](https://liamcottle.net) są open source na licencji MIT.

Klient webowy: <https://github.com/liamcottle/meshcore-web>
JavaScript: <https://github.com/liamcottle/meshcore.js>

### 5.11. Czy MeshCore obsługuje ATAK?
ATAK obecnie nie znajduje się w planach rozwoju MeshCore.

MeshCore nie byłby najlepiej dopasowany do ATAK, ponieważ w MeshCore:

- klienci nie przekazują pakietów dalej, więc potrzebna byłaby sieć repeaterów
- nie będzie stabilnej ścieżki, gdy wszyscy klienci nieustannie przemieszczają się między repeaterami

Klienci MeshCore musieliby nieustannie resetować ścieżkę i zalewać (flood) ruch w sieci, co przy tak „gadatliwym” ruchu jak w ATAK mogłoby prowadzić do wielu kolizji.

Może się to zmienić w przyszłości, jeśli MeshCore stworzy firmware klienta, który przekazuje pakiety dalej.

[Źródło](https://discord.com/channels/826570251612323860/1330643963501351004/1354780032140054659)

### 5.12. Jak dodać węzeł do [Mapy MeshCore](https://map.meshcore.io)?
Aby dodać radio BLE Companion, połącz się z radiem BLE Companion z poziomu aplikacji MeshCore na smartfonie. W aplikacji stuknij ikonę menu `3 kropki` w prawym górnym rogu, następnie stuknij `Internet Map`. Ponownie stuknij ikonę menu `3 kropki` i wybierz `Add me to the Map`

Aby dodać repeatera lub room server do mapy, przejdź do listy kontaktów, stuknij `3 kropki` obok repeatera lub room servera, który chcesz dodać do Internet Map, stuknij `Share`, a następnie `Upload to Internet Map`.

Możesz użyć tego samego companiona (tego samego klucza publicznego), którego użyłeś do dodania swoich repeaterów lub room serverów, aby usunąć je z Internet Map.

### 5.13. Czy mogę użyć Raspberry Pi do aktualizacji radia MeshCore?
Tak.
Poniżej znajdują się instrukcje wgrywania firmware na obsługiwane urządzenie LoRa za pomocą Raspberry Pi przez USB serial.

> Instrukcje dla urządzeń nRF, takich jak RAK, T1000-E, T114, znajdują się zaraz po instrukcjach dla ESP

Dla urządzeń opartych na ESP (np. Heltec V3) potrzebujesz:

1. Pobierz plik firmware z <https://flasher.meshcore.io>.
    - Wejdź na stronę w przeglądarce i znajdź sekcję z potrzebnym firmware.
    - Kliknij przycisk Download, kliknij prawym przyciskiem myszy na potrzebny plik, na przykład:
        - `Heltec_V3_companion_radio_ble-v1.7.1-165fb33.bin`
            - Wersja bin bez scalenia (non-merged) zachowuje istniejącą bazę parowania Bluetooth.
        - `Heltec_v3_companion_radio_usb-v1.7.1-165fb33-merged.bin`
            - Wersja bin scalona (merged) nadpisuje wszystko, w tym bootloader i istniejącą bazę parowania Bluetooth, ale zachowuje konfiguracje.
    - Kliknij prawym przyciskiem myszy na nazwę pliku i skopiuj link. Oto przykład: `https://flasher.meshcore.io/releases/download/companion-v1.7.1/Heltec_v3_companion_radio_ble-v1.7.1-165fb33.bin`
    - Uruchom:
        - `wget https://flasher.meshcore.io/releases/download/companion-v1.7.1/Heltec_v3_companion_radio_ble-v1.7.1-165fb33.bin`, aby pobrać plik firmware dla Twojego typu urządzenia lub potrzebnej wersji: USB, BLE, Repeater, Room Server, bin scalony lub niescalony.
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

Dla urządzeń nRF (np. RAK, Heltec T114) potrzebujesz:

1. Pobierz plik firmware z <https://flasher.meshcore.io>.
    - Wejdź na stronę w przeglądarce i znajdź sekcję z potrzebnym firmware.
    - Potrzebujesz wersji ZIP dla poniższego narzędzia adafruit flash.
    - Kliknij przycisk Download, kliknij prawym przyciskiem myszy na plik ZIP, na przykład:
        - `RAK_4631_companion_radio_ble-v1.7.1-165fb33.zip`
    - Kliknij prawym przyciskiem myszy na nazwę pliku i skopiuj link. Oto przykład: `https://flasher.meshcore.io/releases/download/companion-v1.7.1/RAK_4631_companion_radio_ble-v1.7.1-165fb33.zip`
    - Uruchom:
        - `wget https://flasher.meshcore.io/releases/download/companion-v1.7.1/RAK_4631_companion_radio_ble-v1.7.1-165fb33.zip`, aby pobrać plik firmware dla Twojego typu urządzenia lub potrzebnej wersji: USB, BLE, Repeater, Room Server, tylko plik ZIP.
2. Potwierdź ścieżkę urządzenia `ttyXXXX` na swoim Raspberry Pi.
    - Przejdź do katalogu `/dev` i uruchom polecenie `ls`, aby znaleźć ścieżkę swojego urządzenia.
    - Zazwyczaj jest to `/dev/ttyACM0` dla urządzeń nRF.
3. Zainstaluj adafruit-nrfutil.
    - `pip install adafruit-nrfutil --break-system-packages`
4. Wgraj firmware na urządzenie nRF.
    - `adafruit-nrfutil --verbose dfu serial --package RAK_4631_companion_radio_usb-v1.7.1-165fb33.zip -p /dev/ttyACM0 -b 115200 --singlebank --touch 1200`

Aby zarządzać repeaterem lub room serverem podłączonym do Pi przez USB serial za pomocą poleceń powłoki, musisz zainstalować `picocom`. Aby zainstalować `picocom`, uruchom poniższe polecenie:

- `sudo apt install picocom`

Aby rozpocząć zarządzanie urządzeniem podłączonym przez USB serial za pomocą picocom, użyj poniższego polecenia:

- `picocom -b 115200 /dev/ttyUSB0 --imap lfcrlf`

Stąd sięgnij po polecenia CLI repeatera i room servera w dokumentacji MeshCore tutaj:

- <https://docs.meshcore.io/cli_commands>

### 5.14. Czy istnieją projekty budowane wokół MeshCore?
Tak, jest ich wiele. Protokół MeshCore jest open source na licencji MIT. Licencja MIT i otwarty protokół bardzo ułatwiają społeczności MeshCore tworzenie nowego firmware dla radiów, aplikacji na urządzenia mobilne, narzędzi mapowych i analitycznych, a także integracji z innymi projektami, takimi jak Home Assistant.

Ponieważ nowe projekty społeczności MeshCore pojawiają się co tydzień, przestaliśmy je tutaj śledzić w tym FAQ. [samuk](https://github.com/samuk) prowadzi bardzo obszerną listę projektów społeczności MeshCore pod adresem <https://github.com/samuk/awesome-meshcore/blob/main/README.md>. samuk akceptuje PR-y i regularnie je scala.

### 5.15. Czy istnieją aplikacje klienckie na Windows lub Mac?
Tak, ten sam klient na iOS i Androida jest dostępny również na Windows i Mac. Znajdziesz je razem z plikiem APK na Androida tutaj:
<https://files.liamcottle.net/MeshCore>

Zarówno wersja klienta na Windows, jak i na Mac są w pełni odblokowane i darmowe w użyciu.

### 5.16. Czy istnieją materiały porównujące MeshCore z innymi systemami LoRa?
Oto lista materiałów porównawczych dotyczących MeshCore:

- Kanał The Comms Channel na YouTube: <https://www.youtube.com/watch?v=guDoKGs02Us>
- MeshCore Advantages autorstwa MCarper: <https://github.com/mikecarper/meshfirmware/blob/main/MeshCoreAdvantages.md>
- MeshCore vs Meshtastic autorstwa austinmesh.org: <https://www.austinmesh.org/learn/meshcore-vs-meshtastic>

---

## 6. Rozwiązywanie problemów

### 6.1. Mój klient pokazuje, że inny klient, repeater lub room server był ostatnio widziany bardzo, bardzo dawno temu.
### 6.2. Repeater, klient lub room server, który spodziewam się zobaczyć na liście discover (na T-Deck) lub liście kontaktów (na kliencie na urządzeniu mobilnym), nie jest widoczny.

- Jeśli Twoim klientem jest T-Deck, może nie mieć ustawionego czasu (brak zainstalowanego GPS, brak sygnału GPS lub nieprawidłowa prędkość transmisji GPS).
- Jeśli używasz klienta na Androida lub iOS, inny klient, repeater lub room server mogą mieć nieprawidłowy czas.

Czas epoch możesz uzyskać na <https://www.epochconverter.com> i użyć go do ustawienia zegara T-Deck. W przypadku repeatera i room servera administrator może użyć T-Deck do zdalnego ustawienia ich zegara (synchronizacja zegara) lub użyć polecenia `time` w konsoli USB serial przy podłączonym urządzeniu serwerowym.

### 6.3. Jak połączyć się z repeaterem przez BLE (Bluetooth)?
Nie da się połączyć przez Bluetooth z urządzeniem, na którym działa firmware repeatera. Możesz łączyć się przez Bluetooth z urządzeniami, na których działa firmware BLE companion, za pomocą aplikacji na Androida.

### 6.4. Mój companion nie pojawia się przez Bluetooth?
Upewnij się, że wgrałeś firmware Bluetooth companion, a nie firmware companion tylko-USB.

### 6.5. Nie mogę połączyć się przez Bluetooth, jaki jest kod parowania Bluetooth?
Domyślny kod parowania Bluetooth to `123456`

### 6.6. Mój Heltec V3 ciągle rozłącza się ze smartfonem. Nie może utrzymać stabilnego połączenia Bluetooth.
Heltec V3 ma bardzo małą antenę cewkową na płytce PCB do łączności Wi-Fi i Bluetooth. Ma ona bardzo krótki zasięg, tylko kilkadziesiąt centymetrów. Można usunąć antenę cewkową i zastąpić ją przewodem o długości 31mm. Zasięg Bluetooth znacznie poprawia się po tej modyfikacji.

### 6.7. Moje urządzenie RAK/T1000-E/xiao_nRF52 wydaje się uszkodzone/zepsute, jak wyczyścić je, aby zacząć od nowa?

1. Podłącz kabel USB-C do swojego urządzenia i zgodnie z instrukcją swojego urządzenia przełącz je w tryb flashowania:
    - Dla RAK, kliknij przycisk reset **DWUKROTNIE**
    - Dla T1000-e, szybko odłącz i podłącz ponownie magnetyczną stronę kabla od urządzenia **DWUKROTNIE**
    - Dla Heltec T114, kliknij przycisk reset **DWUKROTNIE** (dolny przycisk)
    - Dla Xiao nRF52, kliknij przycisk reset raz. Jeśli to nie zadziała, szybko kliknij dwukrotnie przycisk reset. Jeśli to nadal nie zadziała, odłącz płytkę od komputera i podłącz ją ponownie ([wiki seeed studio](https://wiki.seeedstudio.com/XIAO_BLE/#access-the-swd-pins-for-debugging-and-reflashing-bootloader))
2. Na pulpicie Twojego komputera pojawi się nowy folder
3. Pobierz plik `flash_erase*.uf2` dla swojego urządzenia z <https://flasher.meshcore.io>
    - RAK WisBlock i Heltec T114: `Flash_erase-nRF32_softdevice_v6.uf2`
    - Seeed Studio Xiao nRF52 WIO: `Flash_erase-nRF52_softdevice_v7.uf2`
4. przeciągnij i upuść plik uf2 dla swojego urządzenia do katalogu głównego nowego folderu
5. Poczekaj na zakończenie kopiowania. Może pojawić się okno z błędem - możesz je zignorować
6. Wejdź na <https://flasher.meshcore.io>, kliknij `Console` i wybierz port szeregowy dla podłączonego urządzenia
7. W konsoli wciśnij enter. Pamięć flash powinna zostać wyczyszczona
8. Możesz teraz wgrać najnowsze firmware MeshCore na swoje urządzenie

Osobno, od wersji firmware 1.7.0, istnieje tryb ratunkowy CLI (CLI Rescue mode). Jeśli Twoje urządzenie ma przycisk użytkownika (np. niektóre modele RAK, T114), możesz aktywować tryb ratunkowy, przytrzymując przycisk użytkownika urządzenia w ciągu 8 sekund od uruchomienia. Następnie możesz użyć `Console` na <https://flasher.meshcore.io>

### 6.8. WebFlasher zawodzi na Linuksie z błędem failed to open
Jeśli port USB nie ma odpowiednich uprawnień do tej operacji, proces zawodzi z poniższym błędem:

`NetworkError: Failed to execute 'open' on 'SerialPort': Failed to open serial port.`

Nadaj uprawnienia użytkownikowi przeglądarki:

`# setfacl -m u:YOUR_USER_HERE:rw /dev/ttyUSB0`

---

## 7. Inne pytania

### 7.1. Jak zaktualizować firmware companiona, repeatera i room servera na urządzeniach nRF (RAK, T114, Seeed XIAO) przez OTA za pomocą nowej, prostszej aplikacji DFU?
Poniższe kroki działają zarówno na Androidzie, jak i iOS, ponieważ nRF ujednolicił interfejs użytkownika obu aplikacji na obu platformach:

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
12. Jeśli to się nie powiedzie, spróbuj przełączyć Bluetooth na swoim telefonie. Jeśli to nie pomoże, spróbuj zrestartować telefon. Jeśli nadal pojawiają się błędy na etapie „Enabling Bootloader”, spróbuj usunąć parowanie z płytką nRF w ustawieniach Bluetooth telefonu z iOS lub Androidem i sparować ją ponownie przez aplikację DFU.
13. Poczekaj na zakończenie aktualizacji. Może to potrwać kilka minut.
14. Zdecydowanie zaleca się zainstalowanie i użycie bootloadera OTAFIX z <https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX>.
15. Aby zaktualizować węzeł companion przez OTA, musi on mieć uruchomione firmware companion w wersji 1.15 lub nowszej.
16. Dodatkowe informacje na temat wgrywania firmware przez OTA znajdziesz na blogu MeshCore:
    - <https://blog.meshcore.io/2026/04/06/otafix-bootloader>
    - <https://blog.meshcore.io/2026/04/02/nrf-ota-update>

#### 7.1.1. Czy mogę zaktualizować Seeed Studio Wio Tracker L1 Pro przez OTA?
Możesz wgrać ten bezpieczniejszy bootloader na Wio Tracker L1 Pro
<https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX>

Po wgraniu tego bootloadera na urządzenie, możesz uruchomić aktualizację przez Bluetooth (over-the-air), przytrzymując przycisk obok D-Pada, a następnie klikając przycisk reset. Następnie postępuj zgodnie z tymi samymi instrukcjami aktualizacji OTA co powyżej. Możesz pominąć instrukcję `start ota` i rozpocząć aktualizację od razu w aplikacji DFU.

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
Tak, deweloper `che aporeps` stworzył ulepszony bootloader OTA DFU dla urządzeń opartych na nRF52. Dzięki temu bootloaderowi, jeśli wykryje on, że firmware aplikacji jest nieprawidłowe, przełącza się z powrotem w tryb OTA DFU, dzięki czemu możesz ponownie spróbować wgrać firmware i przywrócić urządzenie. Ten bootloader ma też inne zmiany, które czynią proces OTA DFU bardziej odpornym na błędy.

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
Tak, znajdziesz je w repozytorium GitHub MeshCore tutaj: <https://github.com/meshcore-dev/MeshCore/tree/main/logo>

### 7.5. Jaki jest format kodu QR kontaktu lub kanału?
Kanał: `meshcore://channel/add?name=<name>&secret=<secret>`

Kontakt: `meshcore://contact/add?name=<name>&public_key=<secret>&type=<type>`

Gdzie `&type` to:

- `chat = 1`
- `repeater = 2`
- `room = 3`
- `sensor = 4`

### 7.6. Jak połączyć się z companionem przez Wi-Fi, np. na Heltec V3?
Firmware Wi-Fi wymaga samodzielnej kompilacji, ponieważ musisz ustawić SSID i hasło Wi-Fi.
Zmodyfikuj WIFI_SSID i WIFI_PWD w `./variants/heltec_v3/platformio.ini`, a następnie wgraj je na swoje urządzenie.

### 7.7. Mam Station G2, Heltec V4, Ikoka Stick lub radio z modułem EByte E22-900M30S albo EByte E22-900M33S, na jaką moc nadawania powinienem je ustawić?
Dla radiów companion moc nadawania możesz ustawić w aplikacji na smartfona. Dla radiów repeatera i room servera moc nadawania możesz ustawić poleceniem z linii poleceń `set tx`. Aktualną wartość możesz sprawdzić poleceniem `get tx`

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
