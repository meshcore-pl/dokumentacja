---
title: Kody QR
description: Sprawdź formaty kodów QR w aplikacji MeshCore. Dowiedz się, jak tworzyć linki do udostępniania kanałów i kontaktów oraz jakie parametry w nich umieszczać.
order: 11
sourceUrl: https://docs.meshcore.io/qr_codes
createdAt: 22.08.2026
updatedAt: 10.11.2026
---

# Kody QR

Kody QR pozwalają udostępniać kanały i kontakty. Aplikacja mobilna MeshCore odczytuje zapisane w nich adresy w poniższych formatach.

## Dodawanie kanału

**Przykładowy URL**:

```
meshcore://channel/add?name=Public&secret=8b3387e9c5cdea6ac9e5edbaa115cd72
```

**Parametry**:

- `name`: nazwa kanału (zakodowana w formacie URL)
- `secret`: 16-bajtowy sekret zapisany jako 32 znaki hex
- `region_scope`: region ograniczający zasięg kanału (opcjonalny; wartość zakodowana w formacie URL)
    - obsługiwany od wersji 1.47.0 aplikacji MeshCore

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
    - `3`: Room serwer
    - `4`: Sensor
