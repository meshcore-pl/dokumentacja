---
title: Kody QR
description: Formaty kodów QR do udostępniania kanałów i kontaktów w aplikacji mobilnej MeshCore.
order: 11
sourceUrl: https://docs.meshcore.io/qr_codes
createdAt: 2026-08-22
---

# Kody QR

Ten dokument zawiera przegląd formatów kodów QR, które można wykorzystać do udostępniania kanałów i kontaktów MeshCore. Poniżej opisane formaty są obsługiwane przez aplikację mobilną MeshCore.

## Dodawanie kanału

**Przykładowy URL**:

```
meshcore://channel/add?name=Public&secret=8b3387e9c5cdea6ac9e5edbaa115cd72
```

**Parametry**:

- `name`: nazwa kanału (zakodowana w formacie URL)
- `secret`: 16-bajtowy sekret zapisany jako 32 znaki hex
- `region_scope`: zasięg regionu (opcjonalny, zakodowany w formacie URL, jeśli podany)
    - obsługiwane od wersji aplikacji MeshCore v1.47.0+

## Dodawanie kontaktu

**Przykładowy URL**:

```
meshcore://contact/add?name=Example+Contact&public_key=9cd8fcf22a47333b591d96a2b848b73f457b1bb1a3ea2453a885f9e5787765b1&type=1
```

**Parametry**:

- `name`: nazwa kontaktu (zakodowana w formacie URL, jeśli potrzebne)
- `public_key`: 32-bajtowy klucz publiczny zapisany jako 64 znaki hex
- `type`: numeryczny typ kontaktu
    - `1`: Companion
    - `2`: Repeater
    - `3`: Room Server
    - `4`: Sensor
