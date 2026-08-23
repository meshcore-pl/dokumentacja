---
title: Format payloadu
description: Typy payloadów przenoszonych wewnątrz pakietów MeshCore.
order: 7
sourceUrl: https://docs.meshcore.io/payloads
createdAt: 22.08.2026
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
| latitude  | 4 (opcjonalne)  | szerokość geograficzna dziesiętna pomnożona przez 1000000, integer |
| longitude | 4 (opcjonalne)  | długość geograficzna dziesiętna pomnożona przez 1000000, integer   |
| feature 1 | 2 (opcjonalne)  | zarezerwowane na przyszłość                                        |
| feature 2 | 2 (opcjonalne)  | zarezerwowane na przyszłość                                        |
| name      | reszta appdata  | nazwa węzła                                                        |

### Appdata Flags

| Wartość | Nazwa          | Opis                                |
|---------|----------------|-------------------------------------|
| `0x01`  | is chat node   | advert dotyczy węzła czatu          |
| `0x02`  | is repeater    | advert dotyczy repeatera            |
| `0x03`  | is room server | advert dotyczy room servera         |
| `0x04`  | is sensor      | advert dotyczy serwera czujników    |
| `0x10`  | has location   | appdata zawiera informacje lat/long |
| `0x20`  | has feature 1  | zarezerwowane na przyszłość         |
| `0x40`  | has feature 2  | zarezerwowane na przyszłość         |
| `0x80`  | has name       | appdata zawiera nazwę węzła         |

## Potwierdzenie (Acknowledgement)

Potwierdzenie, że wiadomość została odebrana. Zwróć uwagę, że w przypadku wiadomości zwróconej ścieżki, potwierdzenie może zostać wysłane w payloadzie „extra” (patrz [Zwrócona ścieżka](#zwrócona-ścieżka)) zamiast jako osobny pakiet potwierdzenia. Polecenia CLI nie powodują wysyłania odpowiedzi potwierdzających, ani osobnych, ani w formie extra.

| Pole     | Rozmiar (bajty) | Opis                                                                               |
|----------|-----------------|------------------------------------------------------------------------------------|
| checksum | 4               | Suma kontrolna CRC znacznika czasu wiadomości, tekstu i klucza publicznego nadawcy |

## Zwrócona ścieżka, żądanie, odpowiedź i zwykła wiadomość tekstowa

Zwrócona ścieżka, żądanie, odpowiedź i zwykłe wiadomości tekstowe są sformatowane w ten sam sposób. Zobacz podsekcje, aby dowiedzieć się więcej o reprezentacji tekstu jawnego powiązanego z szyfrogramem.

| Pole             | Rozmiar (bajty) | Opis                                                    |
|------------------|-----------------|---------------------------------------------------------|
| destination hash | 1               | pierwszy bajt klucza publicznego węzła docelowego       |
| source hash      | 1               | pierwszy bajt klucza publicznego węzła źródłowego       |
| cipher MAC       | 2               | MAC dla zaszyfrowanych danych w kolejnym polu           |
| ciphertext       | reszta payloadu | zaszyfrowana wiadomość, szczegóły w podsekcjach poniżej |

### Zwrócona ścieżka

Wiadomości zwróconej ścieżki opisują trasę, jaką pakiet przebył od pierwotnego autora. Odbiorcy wysyłają wiadomości zwróconej ścieżki do autora oryginalnej wiadomości.

| Pole        | Rozmiar (bajty) | Opis                                                                                                                             |
|-------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------|
| path length | 1               | długość kolejnego pola                                                                                                           |
| path        | patrz wyżej     | lista hashy węzłów (po jednym bajcie każdy)                                                                                      |
| extra type  | 1               | dodatkowy, dołączony typ payloadu, np. potwierdzenie lub odpowiedź. Te same wartości co w [formacie pakietu](./packet_format.md) |
| extra       | reszta danych   | dodatkowa, dołączona zawartość payloadu, w tym samym formacie co główna zawartość opisana w tym dokumencie                       |

### Żądanie

| Pole         | Rozmiar (bajty) | Opis                                                |
|--------------|-----------------|-----------------------------------------------------|
| timestamp    | 4               | czas nadawcy (znacznik czasu unix)                  |
| request data | reszta payloadu | treść payloadu żądania, definiowana przez aplikację |

Dla popularnych helperów czatu/serwera w `BaseChatMesh`, obecne wartości typu żądania to:

| Wartość | Nazwa     | Opis                                                  |
|---------|-----------|-------------------------------------------------------|
| `0x01`  | get stats | pobierz statystyki repeatera lub room servera         |
| `0x02`  | keepalive | żądanie keep-alive używane dla utrzymywanych połączeń |

#### Get stats

Pobiera informacje o węźle, potencjalnie obejmujące:

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
- Number posted (?)
- Number of post pushes (?)

#### Get telemetry data

Niezdefiniowane w `BaseChatMesh`. Payloady żądań specyficzne dla czujników i aplikacji mogą być implementowane przez firmware wyższego poziomu.

#### Get Telemetry

Niezdefiniowane w `BaseChatMesh`.

#### Get Min/Max/Ave (węzły czujników)

Niezdefiniowane w `BaseChatMesh`.

#### Get Access List

Niezdefiniowane w `BaseChatMesh`.

#### Get Neighbors

Niezdefiniowane w `BaseChatMesh`.

#### Get Owner Info

Niezdefiniowane w `BaseChatMesh`.

### Odpowiedź

| Pole    | Rozmiar (bajty) | Opis                                          |
|---------|-----------------|-----------------------------------------------|
| content | reszta payloadu | treść odpowiedzi, definiowana przez aplikację |

Zawartość odpowiedzi to nieprzezroczyste (opaque) dane aplikacji. Nie istnieje pojedyncza, ogólna otoczka odpowiedzi wykraczająca poza pokazany powyżej wrapper zaszyfrowanego payloadu.

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
| `0x01`  | polecenie CLI                | tekst polecenia zawarty w wiadomości                                                               |
| `0x02`  | podpisana wiadomość tekstowa | pierwsze cztery bajty to prefiks klucza publicznego nadawcy, a następnie zwykła wiadomość tekstowa |

## Żądanie anonimowe

| Pole             | Rozmiar (bajty) | Opis                                              |
|------------------|-----------------|---------------------------------------------------|
| destination hash | 1               | pierwszy bajt klucza publicznego węzła docelowego |
| public key       | 32              | klucz publiczny Ed25519 nadawcy                   |
| cipher MAC       | 2               | MAC dla zaszyfrowanych danych w kolejnym polu     |
| ciphertext       | reszta payloadu | zaszyfrowana wiadomość, szczegóły poniżej         |

### Logowanie do room servera

| Pole           | Rozmiar (bajty)   | Opis                                                  |
|----------------|-------------------|-------------------------------------------------------|
| timestamp      | 4                 | czas nadawcy (znacznik czasu unix)                    |
| sync timestamp | 4                 | znacznik czasu nadawcy „synchronizuj wiadomości OD x” |
| password       | reszta wiadomości | hasło do room servera                                 |

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

Tekst jawny zawarty w szyfrogramie odpowiada formatowi opisanemu w [zwykłej wiadomości tekstowej](#zwykła-wiadomość-tekstowa). Konkretnie składa się z czterobajtowego znacznika czasu, bajtu flag oraz wiadomości. Bajt flag będzie zwykle miał wartość `0x00`, ponieważ jest to „zwykła wiadomość tekstowa”. Wiadomość będzie miała postać `<nazwa nadawcy>: <treść wiadomości>` (np. `user123: I'm on my way`).

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
