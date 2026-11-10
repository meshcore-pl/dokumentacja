---
title: Przydziały identyfikatorów
description: Lista unikalnych numerów i identyfikatorów używanych w payloadach protokołu MeshCore.
order: 8
sourceUrl: https://docs.meshcore.io/number_allocations
createdAt: 22.08.2026
updatedAt: 10.11.2026
---

# Przydziały identyfikatorów

Ten dokument zawiera przydziały identyfikatorów używanych w payloadach protokołu MeshCore.

## Typy danych grupowych

Payloady `PAYLOAD_TYPE_GRP_DATA` mają 16-bitowe pole typu danych, które określa, do jakiej aplikacji należy pakiet.

Poszczególne aplikacje otrzymują osobne zakresy wartości typu danych, aby uniknąć konfliktów. Aby zarezerwować zakres, dodaj wiersz do tabeli w dokumentacji źródłowej MeshCore i zgłoś pull request do zatwierdzenia.

UWAGA: zakres FF00 - FFFF jest przeznaczony do testów i prototypów (PoC). Korzystanie z niego nie wymaga rezerwacji.

Podczas tworzenia aplikacji korzystaj z zakresu testowego. O stały przydział identyfikatorów wystąp przed publikacją projektu, gdy możesz już przedstawić działającą aplikację.

| Zakres typu danych | Nazwa aplikacji                        | Kontakt                                                                          |
|--------------------|----------------------------------------|----------------------------------------------------------------------------------|
| 0000 - 00FF        | Zarezerwowane do użytku wewnętrznego |                                                                                  |
| 0100               | MeshCore Open                          | zsylvester@monitormx.com - https://github.com/zjs81/meshcore-open                |
| 0110 - 011F        | Ripple                                 | ripple_biz@protonmail.com - https://buymeacoffee.com/ripplebiz                   |
| 0120               | MCO Advanced                           | most.original.address@gmail.com - https://hdden.ru/MCOa/                         |
| 0130 - 013F        | StreamSensor                           | william@housedillon.com - https://housedillon.com/blog/lora-e5-with-seeed-fusion |
| 0140               | Nelos                                  | support@nelos.app - https://nelos.app                                            |
| FF00 - FFFF        | Zarezerwowane do testów |                                                                                  |

Dla własnej aplikacji wybierz wolny identyfikator lub zakres z przedziału `0100 - FEFF`.
