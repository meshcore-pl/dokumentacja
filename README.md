# docs.meshcorepolska.org
Spolszczona dokumentacja [MeshCore](https://github.com/meshcore-dev/MeshCore) - firmware i protokołu do budowy sieci mesh LoRa.

Źródło oryginału: https://github.com/meshcore-dev/MeshCore/tree/main/docs

## Stos technologiczny
Node.js + Express, treść w Markdown (`docs/`) renderowana przez `marked` + `frontmatter-md`, widoki EJS.

## Wymagania
- Node.js >= 20.19.0
- npm

## Uruchomienie
```bash
git clone https://github.com/meshcore-pl/dokumentacja.git
cd dokumentacja
npm install
cp .env.example .env
node index.js
```

Domyślnie serwer nasłuchuje na porcie z `.env` (`PORT=8080`), pod adresem `DOMAIN` (`http://127.0.0.1`).

### Zmienne środowiskowe (`.env`)
| Zmienna    | Opis                            | Przykład           |
|------------|---------------------------------|--------------------|
| `NODE_ENV` | `development` lub `production`  | `development`      |
| `DOMAIN`   | Adres, pod którym działa serwer | `http://127.0.0.1` |
| `PORT`     | Port nasłuchiwania              | `8080`             |

### Struktura projektu
```
docs/          treść dokumentacji (pliki .md z frontmatterem)
routes/        trasy Express
views/         szablony EJS
middlewares/   logger, rate limit, timeout
utils/         funkcje pomocnicze
public/        statyczne zasoby (CSS, JS, logo)
```

## Zgłaszanie błędów
- Błędy w tłumaczeniu/stronie: [issues tego repozytorium](https://github.com/meshcore-pl/dokumentacja/issues)
- Błędy merytoryczne występujące też w oryginale: [meshcore-dev/MeshCore](https://github.com/meshcore-dev/MeshCore/tree/main/docs)

## Wkład
Pull requesty mile widziane.

## Licencja
Kod strony: PolyForm Noncommercial 1.0.0.  
Przetłumaczona dokumentacja: MIT (oryginał © Scott Powell / rippleradios.com).

Szczegóły w pliku [LICENSE](./LICENSE).
