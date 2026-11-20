---
title: Format payloadu
description: Typy payloadów przenoszonych wewnątrz pakietów MeshCore.
order: 7
sourceUrl: https://docs.meshcore.io/payloads
createdAt: 22.08.2026
updatedAt: 10.11.2026
---

# Format payloadu

Wewnątrz każdego [pakietu MeshCore](./packet_format.md) znajduje się payload, identyfikowany przez typ payloadu w nagłówku pakietu. Typy payloadów to:

- Advert węzła.
- Potwierdzenie (Acknowledgment).
- Zwrócona ścieżka.
- Żądanie (hashe celu/źródła + MAC).
- Odpowiedź na REQ lub ANON_REQ.
- Zwykła wiadomość tekstowa.
- Żądanie anonimowe.
- Grupowa wiadomość tekstowa (niezweryfikowana).
- Grupowy datagram (niezweryfikowany).
- Pakiet wieloczęściowy (Multi-part).
- Pakiet danych kontrolnych.
- Pakiet niestandardowy (surowe bajty, niestandardowe szyfrowanie).

Ten dokument definiuje strukturę każdego z tych typów payloadów.

UWAGA: wszystkie pola liczbowe 16- i 32-bitowe są w formacie Little Endian.

## Ważne pojęcia

- Hash węzła (node hash): pierwszy bajt klucza publicznego węzła

## Advert węzła

Ten rodzaj payloadu informuje odbiorców o istnieniu węzła i przekazuje o nim informacje.

| Pole       | Rozmiar (bajty) | Opis                                                           |
|------------|-----------------|----------------------------------------------------------------|
| public key | 32              | Klucz publiczny Ed25519 węzła                                  |
| timestamp  | 4               | Znacznik czasu unix advertu                                    |
| signature  | 64              | Podpis Ed25519 klucza publicznego, timestampu i danych appdata |
| appdata    | reszta payloadu | opcjonalne, patrz poniżej                                      |

### Appdata

| Pole      | Rozmiar (bajty) | Opis                                                               |
|-----------|-----------------|--------------------------------------------------------------------|
| flags     | 1               | określa, które pola są obecne, patrz poniżej                       |
| latitude  | 4 (opcjonalne)  | szerokość geograficzna dziesiętna pomnożona przez 1000000, int32 ze znakiem |
| longitude | 4 (opcjonalne)  | długość geograficzna dziesiętna pomnożona przez 1000000, int32 ze znakiem   |
| feature 1 | 2 (opcjonalne)  | zarezerwowane na przyszłość                                        |
| feature 2 | 2 (opcjonalne)  | zarezerwowane na przyszłość                                        |
| name      | reszta appdata  | nazwa węzła                                                        |

### Appdata Flags

| Wartość | Nazwa          | Opis                                |
|---------|----------------|-------------------------------------|
| `0x01`  | is chat node   | advert dotyczy węzła czatu          |
| `0x02`  | is repeater    | advert dotyczy repeatera            |
| `0x03`  | is room server | advert dotyczy room serwera         |
| `0x04`  | is sensor      | advert dotyczy serwera czujników    |
| `0x10`  | has location   | appdata zawiera informacje lat/long |
| `0x20`  | has feature 1  | zarezerwowane na przyszłość         |
| `0x40`  | has feature 2  | zarezerwowane na przyszłość         |
| `0x80`  | has name       | appdata zawiera nazwę węzła         |

## Potwierdzenie (Acknowledgement)

Potwierdza odebranie wiadomości. Może być przesłane w polu „extra” pakietu zwracającego ścieżkę (patrz [Zwrócona ścieżka](#zwrocona-sciezka)) zamiast w osobnym pakiecie. Polecenia CLI nie powodują wysyłania takich potwierdzeń ani osobno, ani w polu „extra”.

| Pole     | Rozmiar (bajty) | Opis                                                                               |
|----------|-----------------|------------------------------------------------------------------------------------|
| ack hash | 4 | Pierwsze 4 bajty SHA-256 danych wiadomości i odpowiedniego klucza publicznego |
| attempt | 1 (opcjonalnie) | Rozszerzony numer próby, używany w ACK zwykłych wiadomości tekstowych |
| random | 1 (opcjonalnie) | Losowy bajt różnicujący pakiety ACK |

Dla zwykłej wiadomości hash obejmuje znacznik czasu, bajt typu i numeru próby, tekst oraz klucz publiczny nadawcy. Potwierdzenie wiadomości przekazanej przez room serwer obejmuje też prefiks autora i klucz odbiorcy potwierdzanej wiadomości. W obecnym kodzie ACK zwykłej wiadomości tekstowej ma 6 bajtów, a ACK wiadomości z room serwera i keepalive ma 4 bajty.

## Zwrócona ścieżka, żądanie, odpowiedź i zwykła wiadomość tekstowa

Pakiety zwracające ścieżkę, żądania, odpowiedzi i zwykłe wiadomości tekstowe mają wspólny format. Kolejne podsekcje opisują strukturę ich danych przed zaszyfrowaniem.

| Pole             | Rozmiar (bajty) | Opis                                                    |
|------------------|-----------------|---------------------------------------------------------|
| destination hash | 1               | pierwszy bajt klucza publicznego węzła docelowego       |
| source hash      | 1               | pierwszy bajt klucza publicznego węzła źródłowego       |
| cipher MAC       | 2               | MAC dla zaszyfrowanych danych w kolejnym polu           |
| ciphertext       | reszta payloadu | zaszyfrowana wiadomość, szczegóły w podsekcjach poniżej |

### Zwrócona ścieżka

Pakiet zwracający ścieżkę opisuje trasę, którą przebyła wiadomość od nadawcy do odbiorcy. Odbiorca odsyła go nadawcy oryginalnej wiadomości.

| Pole        | Rozmiar (bajty) | Opis                                                                                                                             |
|-------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------|
| path length | 1               | zakodowany rozmiar hasha i liczba wpisów ścieżki, jak w polu `path_length` nagłówka                                                                                                           |
| path        | patrz wyżej     | lista hashy węzłów; każdy ma 1, 2 lub 3 bajty zgodnie z `path length`                                                                                      |
| extra type  | 1               | dodatkowy, dołączony typ payloadu, np. potwierdzenie lub odpowiedź. Te same wartości co w [formacie pakietu](./packet_format.md) |
| extra       | reszta danych   | dodatkowa, dołączona zawartość payloadu, w tym samym formacie co główna zawartość opisana w tym dokumencie                       |

### Żądanie

| Pole         | Rozmiar (bajty) | Opis                                                |
|--------------|-----------------|-----------------------------------------------------|
| timestamp    | 4               | czas nadawcy (znacznik czasu unix)                  |
| req type     | 1               | podtyp żądania                                      |
| request data | reszta payloadu | treść payloadu żądania, definiowana przez aplikację |

Firmware repeatera, room serwera i czujnika używa poniższych typów żądań. Dostępność zależy od roli urządzenia; nie wszystkie są obsługiwane bezpośrednio w `BaseChatMesh`:

| Wartość | Nazwa     | Opis                                                  |
|---------|-----------|-------------------------------------------------------|
| `0x01`  | get stats | pobierz statystyki repeatera lub room serwera         |
| `0x02`  | keepalive | utrzymanie połączenia, nadal używane przez `BaseChatMesh`                                        |
| `0x03`  | get telemetry | pobranie telemetrii węzła                        |
| `0x04`  | get min/max/avg | pobranie statystyk szeregów czasowych z czujnika |
| `0x05`  | get acl | pobranie listy uprawnień węzła                         |
| `0x06`  | get neighbors | pobranie listy sąsiadów węzła                    |
| `0x08`  | subscribe | subskrypcja powiadomień z telemetrią                  |
| `0x09`  | unsubscribe | anulowanie subskrypcji telemetrii                  |

#### Get stats

Zależnie od typu węzła odpowiedź może zawierać:

- Poziom baterii (miliwolty)
- Aktualna długość kolejki nadawania
- Aktualna długość wolnej kolejki
- Ostatnia wartość RSSI
- Liczba odebranych pakietów
- Liczba wysłanych pakietów
- Całkowity czas nadawania (sekundy)
- Całkowity czas działania (sekundy)
- Liczba pakietów wysłanych jako flood
- Liczba pakietów wysłanych bezpośrednio
- Liczba pakietów odebranych jako flood
- Liczba pakietów odebranych bezpośrednio
- Flagi błędów
- Ostatnia wartość SNR
- Liczba duplikatów trasy bezpośredniej
- Liczba duplikatów trasy flood
- Liczba opublikowanych wiadomości
- Liczba wysyłek wiadomości z room serwera do klientów (push)

#### Get Telemetry

Pobiera telemetrię węzła. Maska wskazuje, które grupy danych należy pominąć.

| Pole            | Rozmiar (bajty) | Opis |
|-----------------|-----------------|------|
| timestamp       | 4 | czas nadawcy (znacznik czasu Unix) |
| req type        | 1 | `0x03` |
| permission mask | 1 | maska wykluczanych grup telemetrii; ustawiony bit wyłącza daną grupę, a `0` nie wyklucza żadnej |

#### Get Min/Max/Ave (węzły czujników)

Pobiera wartości minimalne, maksymalne i średnie dla wskazanego przedziału czasu.

| Pole      | Rozmiar (bajty) | Opis |
|-----------|-----------------|------|
| timestamp | 4 | czas nadawcy (znacznik czasu Unix) |
| req type  | 1 | `0x04` |
| start     | 4 | początek przedziału, liczba sekund wstecz |
| end       | 4 | koniec przedziału, liczba sekund wstecz |
| reserved  | 2 | ustaw na zera |

#### Subskrypcja telemetrii (węzły czujników)

Włącza automatyczne przesyłanie telemetrii. Pole `min deltas` określa minimalne zmiany wartości, które mają wywołać powiadomienie.

| Pole           | Rozmiar (bajty) | Opis |
|----------------|-----------------|------|
| timestamp      | 4 | czas nadawcy (znacznik czasu Unix) |
| req type       | 1 | `0x08` |
| push tag       | 4 | 32-bitowy identyfikator dołączany do payloadów odpowiedzi z telemetrią |
| timeout secs   | 2 | czas ważności subskrypcji w sekundach |
| reserved       | 1 | ustaw na zero |
| min deltas len | 1 | długość pola `min deltas` w bajtach |
| min deltas     | zmienny | progi zmian zakodowane w formacie LPP |

#### Anulowanie subskrypcji telemetrii (węzły czujników)

| Pole      | Rozmiar (bajty) | Opis |
|-----------|-----------------|------|
| timestamp | 4 | czas nadawcy (znacznik czasu Unix) |
| req type  | 1 | `0x09` |

#### Get Access List

Pobiera listę uprawnień węzła (ACL).

| Pole      | Rozmiar (bajty) | Opis |
|-----------|-----------------|------|
| timestamp | 4 | czas nadawcy (znacznik czasu Unix) |
| req type  | 1 | `0x05` |
| reserved  | 2 | ustaw na zera |

#### Get Neighbors

Niezdefiniowane w `BaseChatMesh`.

#### Get Owner Info

Niezdefiniowane w `BaseChatMesh`.

### Odpowiedź

| Pole    | Rozmiar (bajty) | Opis                                          |
|---------|-----------------|-----------------------------------------------|
| content | reszta payloadu | treść odpowiedzi, definiowana przez aplikację |

Format zawartości odpowiedzi określa aplikacja. Poza opisaną wyżej strukturą zaszyfrowanego payloadu protokół nie narzuca wspólnego formatu odpowiedzi.

### Zwykła wiadomość tekstowa

| Pole               | Rozmiar (bajty) | Opis                                                                                |
|--------------------|-----------------|-------------------------------------------------------------------------------------|
| timestamp          | 4               | czas wysłania (znacznik czasu unix)                                                 |
| txt_type + attempt | 1               | górne sześć bitów to txt_type (patrz poniżej), dolne dwa bity to numer próby (0..3) |
| message            | reszta payloadu | treść wiadomości, patrz kolejna tabela                                              |

#### txt_type

| Wartość | Opis                         | Treść wiadomości                                                                                   |
|---------|------------------------------|----------------------------------------------------------------------------------------------------|
| `0x00`  | zwykła wiadomość tekstowa    | zwykły tekst wiadomości                                                                            |
| `0x01`  | dane CLI                     | tekst polecenia lub odpowiedzi CLI |
| `0x02`  | wiadomość z prefiksem autora | pierwsze cztery bajty to prefiks klucza publicznego nadawcy, a następnie zwykła wiadomość tekstowa |
| `0x03` | polecenie CLI | od firmware v1.18: tekst jawnie oznaczony jako polecenie CLI |

Nazwa `TXT_TYPE_SIGNED_PLAIN` w kodzie oznacza wiadomość z 4-bajtowym prefiksem klucza autora. Prefiks nie jest podpisem cyfrowym i sam nie pozwala kryptograficznie zweryfikować autora.

## Żądanie anonimowe

| Pole             | Rozmiar (bajty) | Opis                                              |
|------------------|-----------------|---------------------------------------------------|
| destination hash | 1               | pierwszy bajt klucza publicznego węzła docelowego |
| public key       | 32              | klucz publiczny Ed25519 nadawcy                   |
| cipher MAC       | 2               | MAC dla zaszyfrowanych danych w kolejnym polu     |
| ciphertext       | reszta payloadu | zaszyfrowana wiadomość, szczegóły poniżej         |

### Logowanie do room serwera

| Pole           | Rozmiar (bajty)   | Opis                                                  |
|----------------|-------------------|-------------------------------------------------------|
| timestamp      | 4                 | czas nadawcy (znacznik czasu unix)                    |
| sync timestamp | 4                 | znacznik czasu nadawcy „synchronizuj wiadomości OD x” |
| password       | reszta wiadomości | hasło do room serwera                                 |

### Logowanie do repeatera/sensora

| Pole      | Rozmiar (bajty)   | Opis                               |
|-----------|-------------------|------------------------------------|
| timestamp | 4                 | czas nadawcy (znacznik czasu unix) |
| password  | reszta wiadomości | hasło do repeatera/sensora         |

### Repeater - żądanie regionów

| Pole           | Rozmiar (bajty) | Opis                               |
|----------------|-----------------|------------------------------------|
| timestamp      | 4               | czas nadawcy (znacznik czasu unix) |
| req type       | 1               | 0x01 (podtyp żądania)              |
| reply path len | 1               | długość ścieżki odpowiedzi         |
| reply path     | (zmienna)       | ścieżka odpowiedzi                 |

### Repeater - żądanie informacji o właścicielu

| Pole           | Rozmiar (bajty) | Opis                               |
|----------------|-----------------|------------------------------------|
| timestamp      | 4               | czas nadawcy (znacznik czasu unix) |
| req type       | 1               | 0x02 (podtyp żądania)              |
| reply path len | 1               | długość ścieżki odpowiedzi         |
| reply path     | (zmienna)       | ścieżka odpowiedzi                 |

### Repeater - żądanie zegara i statusu

| Pole           | Rozmiar (bajty) | Opis                               |
|----------------|-----------------|------------------------------------|
| timestamp      | 4               | czas nadawcy (znacznik czasu unix) |
| req type       | 1               | 0x03 (podtyp żądania)              |
| reply path len | 1               | długość ścieżki odpowiedzi         |
| reply path     | (zmienna)       | ścieżka odpowiedzi                 |

## Grupowa wiadomość tekstowa

| Pole         | Rozmiar (bajty) | Opis                                          |
|--------------|-----------------|-----------------------------------------------|
| channel hash | 1               | pierwszy bajt SHA256 wspólnego klucza kanału  |
| cipher MAC   | 2               | MAC dla zaszyfrowanych danych w kolejnym polu |
| ciphertext   | reszta payloadu | zaszyfrowana wiadomość, szczegóły poniżej     |

Dane przed zaszyfrowaniem mają format [zwykłej wiadomości tekstowej](#zwykla-wiadomosc-tekstowa): 4-bajtowy znacznik czasu, bajt typu i numeru próby oraz treść. Bajt typu ma zwykle wartość `0x00`. Treść ma postać `<nazwa nadawcy>: <treść wiadomości>`, np. `user123: Już jadę`.

## Grupowy datagram

| Pole         | Rozmiar (bajty) | Opis                                          |
|--------------|-----------------|-----------------------------------------------|
| channel hash | 1               | pierwszy bajt SHA256 wspólnego klucza kanału  |
| cipher MAC   | 2               | MAC dla zaszyfrowanych danych w kolejnym polu |
| ciphertext   | reszta payloadu | zaszyfrowane dane, szczegóły poniżej          |

Dane zawarte w szyfrogramie wykorzystują poniższy format:

| Pole      | Rozmiar (bajty) | Opis                                                    |
|-----------|-----------------|---------------------------------------------------------|
| data type | 2               | identyfikator typu danych (patrz number_allocations.md) |
| data len  | 1               | długość danych w bajtach                                |
| data      | reszta payloadu | (zależnie od typu danych)                               |

## Dane kontrolne (Control data)

| Pole  | Rozmiar (bajty) | Opis                      |
|-------|-----------------|---------------------------|
| flags | 1               | górne 4 bity to sub_type  |
| data  | reszta payloadu | zwykle dane nieszyfrowane |

### DISCOVER_REQ (sub_type)

| Pole        | Rozmiar (bajty) | Opis                                             |
|-------------|-----------------|--------------------------------------------------|
| flags       | 1               | 0x8 (górne 4 bity), prefix_only (najniższy bit)  |
| type_filter | 1               | bit dla każdego ADV_TYPE_*                       |
| tag         | 4               | generowany losowo przez nadawcę                  |
| since       | 4               | (opcjonalnie) znacznik czasu epoch (domyślnie 0) |

### DISCOVER_RESP (sub_type)

| Pole   | Rozmiar (bajty) | Opis                                    |
|--------|-----------------|-----------------------------------------|
| flags  | 1               | 0x9 (górne 4 bity), node_type (dolne 4) |
| snr    | 1               | ze znakiem, SNR*4                       |
| tag    | 4               | odbite z powrotem z DISCOVER_REQ        |
| pubkey | 8 lub 32        | ID węzła (lub prefiks)                  |

## Pakiet niestandardowy

Pakiety niestandardowe nie mają zdefiniowanego formatu.
