---
title: Alokacje numerów
description: Lista unikalnych numerów i identyfikatorów używanych w payloadach protokołu MeshCore.
order: 8
sourceUrl: https://docs.meshcore.io/number_allocations
createdAt: 22.08.2026
---

# Alokacje numerów

Ten dokument zawiera listę unikalnych numerów/identyfikatorów używanych w różnych payloadach protokołu MeshCore.

# Typy danych grupowych

Payloady `PAYLOAD_TYPE_GRP_DATA` mają 16-bitowe pole typu danych, które określa, do jakiej aplikacji należy pakiet.

Aby wiele aplikacji mogło działać bez wzajemnych zakłóceń, poniższa tabela służy do rezerwowania różnych zakresów wartości typu danych. Po prostu zmodyfikuj tę tabelę, dodając wiersz, a następnie zgłoś PR, aby uzyskać autoryzację/scalenie.

UWAGA: zakres FF00 - FFFF jest przeznaczony do użytku podczas developmentu, tworzenia POC - dla tych przypadków nie musisz zgłaszać się o przydział.

Gdy masz już działającą aplikację/projekt, musisz być w stanie wykazać, że istnieje/działa, a DOPIERO WTEDY poprosić o identyfikatory typu. Dlatego po prostu korzystaj z zakresu testowego/deweloperskiego podczas tworzenia, a o identyfikatory poproś przed przejściem do publikacji swojego projektu.

| Zakres typu danych | Nazwa aplikacji                        | Kontakt                                                           |
|--------------------|----------------------------------------|-------------------------------------------------------------------|
| 0000 - 00FF        | -zarezerwowane do użytku wewnętrznego- |                                                                   |
| 0100               | MeshCore Open                          | zsylvester@monitormx.com - https://github.com/zjs81/meshcore-open |
| 0110 - 011F        | Ripple                                 | ripple_biz@protonmail.com - https://buymeacoffee.com/ripplebiz    |
| FF00 - FFFF        | -zarezerwowane do testów/developmentu- |                                                                   |

(dodawaj wiersze w zakresie 0100 - FEFF dla własnych aplikacji)
