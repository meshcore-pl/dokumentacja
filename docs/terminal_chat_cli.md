---
title: Terminal Chat CLI
description: Polecenia dostępne w klientach Terminal Chat MeshCore.
order: 3
sourceUrl: https://docs.meshcore.io/terminal_chat_cli
createdAt: 22.08.2026
---

# Terminal Chat CLI

Poniżej znajdują się polecenia, które można wpisywać w klientach Terminal Chat:

```mccli
set freq {frequency}
```
Ustawia częstotliwość LoRa. Przykład: set freq 915.8

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
Ustawia szerokość geograficzną na mapie w adverta. (stopnie dziesiętne)

```mccli
set lon {longitude}
```
Ustawia długość geograficzną na mapie w adverta. (stopnie dziesiętne)

```mccli
set dutycycle {percent}
```
Ustawia limit cyklu pracy nadajnika (duty cycle, 1-100%). Przykład: `set dutycycle 10` dla 10%.

```mccli
set af {air-time-factor}
```
Ustawia współczynnik czasu nadawania (air-time-factor). Przestarzałe - zamiast tego użyj `set dutycycle`.


```mccli
time {epoch-secs}
```
Ustawia zegar urządzenia przy użyciu sekund epoki UNIX. Przykład: time 1738242833


```mccli
advert
```
Wysyła pakiet advertu

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
Wyświetla *Twoją* „wizytówkę”, aby inni mogli ją ręcznie _zaimportować_

```mccli
import {card}
```
Importuje podaną wizytówkę do Twoich kontaktów.

```mccli
list {n}
```
Wyświetla listę wszystkich kontaktów od najnowszych. (opcjonalne {n} oznacza ostatnie n według daty advertu)

```mccli
to
```
Pokazuje nazwę aktualnie wybranego kontaktu odbiorcy. (dotyczy kolejnych poleceń „send”)

```mccli
to {name-prefix}
```
Ustawia odbiorcę na _pierwszy_ pasujący kontakt (z „list”) po prefiksie nazwy. (czyli nie musisz wpisywać całej nazwy)

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
