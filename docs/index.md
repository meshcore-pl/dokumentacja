---
title: Wprowadzenie
description: Nieoficjalna dokumentacja MeshCore po polsku - polecenia CLI, protokół Companion, format pakietów, kody QR i FAQ dotyczące sieci mesh LoRa.
order: 0
sourceUrl: https://docs.meshcore.io
createdAt: 1.11.2026
updatedAt: 22.11.2026
---

# Wprowadzenie
MeshCore to firmware i protokół służące do budowy zdecentralizowanych, samoorganizujących się sieci mesh opartych na technologii LoRa.
Urządzenia wymieniają wiadomości bez dostępu do internetu i centralnej infrastruktury. Companion (kompan) służy do wysyłania i odbierania wiadomości, repeater przekazuje pakiety dalej, a room serwer przechowuje historię wiadomości.
Wieloskokowy routing (multi-hop) umożliwia komunikację nawet na duże odległości.

> Ta strona zawiera nieoficjalne polskie tłumaczenie dokumentacji dostępnej na [docs.meshcore.io](https://docs.meshcore.io).
> Za tłumaczenie i utrzymanie odpowiada społeczność [MeshCore Polska](https://meshcorepolska.org).
> Treść może różnić się od aktualnej wersji angielskiej - w razie wątpliwości sprawdź oryginał.

## Nazwy używane w dokumentacji
Używamy nazw z [Podstawowych pojęć MeshCore Polska](https://meshcorepolska.org/dokumentacja/meshcore/wprowadzenie#podstawowe-pojecia), zgodnych z polską wersją aplikacji, np. „room serwer”, „advert 0-hop” i „advert do wszystkich”. Polecenia CLI i identyfikatory protokołów pozostają bez zmian. Nazwy opcji spoza słownika sprawdzamy w polskim interfejsie aplikacji.

## Zacznij tutaj
- [FAQ](./faq.md) - najczęściej zadawane pytania
- [Polecenia CLI](./cli_commands.md) - sterowanie urządzeniem z poziomu linii poleceń
- [Protokół Companion](./companion_protocol.md) - komunikacja z urządzeniami przez BLE, USB lub TCP
- [Format pakietu](./packet_format.md) - struktura pakietów przesyłanych w sieci mesh
- [Kody QR](./qr_codes.md) - udostępnianie kanałów i kontaktów
- [Presety radiowe](./radio_presets.md) - gotowe ustawienia radia i API konfiguracji

## Zgłaszanie błędów
Znalazłeś literówkę, błąd w tłumaczeniu lub nieaktualną informację?

- [Repozytorium tłumaczenia](https://github.com/meshcore-pl/dokumentacja) - zgłoś literówki, błędy tłumaczenia oraz brakujące lub nieaktualne strony
- [Repozytorium MeshCore](https://github.com/meshcore-dev/MeshCore/tree/main/docs) - zgłoś błędy merytoryczne występujące również w oryginalnej wersji angielskiej
