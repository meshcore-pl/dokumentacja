---
title: Presety radiowe
description: Presety radiowe MeshCore: gotowe zestawy parametrów LoRa, pobieranie konfiguracji z API, format odpowiedzi JSON oraz zasady zgłaszania nowych ustawień.
order: 12
sourceUrl: https://docs.meshcore.io/radio_presets
createdAt: 10.11.2026
---

# Presety radiowe

Presety to gotowe zestawy parametrów radia dostępne w aplikacjach MeshCore. Są przechowywane na serwerze MeshCore App API, więc można je aktualizować bez wydawania nowej wersji aplikacji.

Konfigurację pobierzesz z [MeshCore App API](https://api.meshcore.nz/api/v1/config).

## Zgłaszanie nowego presetu

Propozycję omów na [Discordzie MeshCore](https://meshcore.gg) lub zgłoś w [repozytorium MeshCore](https://github.com/meshcore-dev/MeshCore/issues).

Przed zgłoszeniem sprawdź lokalne przepisy radiowe. Zalecane jest też zbadanie wybranych częstotliwości odbiornikiem SDR, aby ocenić zakłócenia i wybrać możliwie dobre warunki do komunikacji.

Dodane presety rzadko się zmieniają. Zbyt duży wybór utrudnia nowym użytkownikom konfigurację, dlatego każdy nowy zestaw wymaga uzasadnienia.

Presety z API są propozycjami. W aplikacji Companion można ustawić własne parametry, zgodne z lokalnymi przepisami. Aby komunikować się z pobliskimi węzłami, użyj ustawień przyjętych w danej sieci.

> W dokumentacji źródłowej zapowiedziano udostępnianie ustawień przez adresy `meshcore://` i kody QR. Ma to umożliwić przekazywanie konfiguracji lokalnej sieci bez internetu i bez dodawania jej do listy presetów w każdej aplikacji.

## Odpowiedź JSON

Aplikacja powinna obsługiwać brak dowolnego pola w odpowiedzi. Format API może zmienić się bez zapowiedzi.

W żądaniu ustaw nagłówek `User-Agent`, który pozwoli rozpoznać aplikację i znaleźć kontakt do jej autora.

Niektóre presety zawierają opcjonalną sekcję `network_settings`. Pole `path_hash_size` określa rozmiar hasha ścieżki używanego w danej sieci.

Poniższa odpowiedź pokazuje format danych i przykładowe presety:

```json
{
  "config": {
    "suggested_radio_settings": {
      "info_message": "These presets are suggested by the community.",
      "entries": [
        {
          "title": "Australia (Narrow)",
          "description": "916.575MHz / SF7 / BW62.5 / CR7",
          "frequency": "916.575",
          "spreading_factor": "7",
          "bandwidth": "62.5",
          "coding_rate": "7"
        },
        {
          "title": "New Zealand (Narrow)",
          "description": "917.375MHz / SF7 / BW62.5 / CR5 / 2B",
          "frequency": "917.375",
          "spreading_factor": "7",
          "bandwidth": "62.5",
          "coding_rate": "5",
          "network_settings": {
            "path_hash_size": 2
          }
        },
        {
          "title": "Portugal 868",
          "description": "869.618MHz / SF7 / BW62.5 / CR6",
          "frequency": "869.618",
          "spreading_factor": "7",
          "bandwidth": "62.5",
          "coding_rate": "6"
        }
      ]
    }
  }
}
```
