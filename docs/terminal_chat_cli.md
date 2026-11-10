---
title: Terminal Chat CLI
description: Polecenia dostępne w klientach Terminal Chat MeshCore.
order: 3
sourceUrl: https://docs.meshcore.io/terminal_chat_cli
createdAt: 22.08.2026
updatedAt: 10.11.2026
---

# Terminal Chat CLI

Poniżej znajdują się polecenia, które można wpisywać w klientach Terminal Chat:

```mccli
set freq {frequency}
```
Ustawia częstotliwość LoRa. Przykład: `set freq 915.8`.

```mccli
set tx {tx-power-dbm}
```
Ustawia moc nadawania LoRa w dBm.

```mccli
set name {name}
```
Ustawia nazwę wyświetlaną w advertach.

```mccli
set lat {latitude}
```
Ustawia szerokość geograficzną wysyłaną w advertach, w stopniach dziesiętnych.

```mccli
set lon {longitude}
```
Ustawia długość geograficzną wysyłaną w advertach, w stopniach dziesiętnych.

```mccli
set af {air-time-factor}
```
Ustawia współczynnik czasu nadawania (air-time-factor).

> Terminal Chat nie obsługuje `set dutycycle`, dlatego nadal używa `set af`. Polecenie `set dutycycle` jest dostępne w firmware Repeater, Room serwer, Sensor i Companion Radio, opisanym na stronie [Polecenia CLI](./cli_commands.md). Terminal Chat ma własną obsługę ustawień, ograniczoną do sześciu poleceń `set` wymienionych powyżej.

```mccli
time {epoch-secs}
```
Ustawia zegar urządzenia na podstawie znacznika czasu Unix w sekundach. Przykład: `time 1738242833`.

```mccli
advert
```
Wysyła advert.

```mccli
clock
```
Wyświetla aktualny czas według zegara urządzenia.

```mccli
ver
```
Pokazuje wersję urządzenia oraz datę kompilacji firmware.

```mccli
card
```
Wyświetla wizytówkę Twojego urządzenia, którą inni użytkownicy mogą zaimportować.

```mccli
import {card}
```
Importuje podaną wizytówkę do Twoich kontaktów.

```mccli
list {n}
```
Wyświetla kontakty od najnowszego według daty advertu. Opcjonalny parametr `{n}` ogranicza listę do `n` najnowszych kontaktów.

```mccli
to
```
Pokazuje nazwę odbiorcy wybranego dla kolejnych poleceń `send`.

```mccli
to {name-prefix}
```
Wybiera jako odbiorcę pierwszy kontakt, którego nazwa zaczyna się od podanego prefiksu. Nie trzeba wpisywać całej nazwy.

```mccli
send {text}
```
Wysyła wiadomość tekstową (jako DM) do aktualnego odbiorcy.

```mccli
reset path
```
Resetuje ścieżkę do aktualnego odbiorcy, wymuszając ponowne wyszukiwanie ścieżki.

```mccli
public {text}
```
Wysyła wiadomość tekstową na wbudowany, publiczny kanał grupowy „public”.

```mccli
help
```
Wyświetla dostępne polecenia.
