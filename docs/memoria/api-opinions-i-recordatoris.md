# API opinions i recordatoris

## Context
Implementacio del bloc d'opinions/valoracions per producte amb API i recordatori de comentari postcompra.

## Requisits coberts
- M3 - Endpoint `getOpinions`.
- M3 - Endpoint `getRating`.
- M3 - Endpoint `sendOpinion`.
- M3 - Filtre opcional per data en consulta d'opinions.
- M3/M6 - Integracio a fitxa de producte amb AJAX.
- M7 - Recordatori de comentari amb `has_to_comment` en `order_items`.

## Historial de versions

### 2026-03-23 - v1
- Creat model `Opinion` i migracio `opinions`.
- Creat controlador API `Api\\OpinionController` amb:
  - `getOpinions(Book $book)`
  - `getRating(Book $book)`
  - `sendOpinion(Book $book)`
- Afegides rutes API sota `web.php`:
  - `GET /api/books/{book}/opinions`
  - `GET /api/books/{book}/rating`
  - `POST /api/books/{book}/opinions` (auth)
- Integrada fitxa de producte (`Catalog/Show`) amb:
  - càrrega asíncrona d'opinions + mitjana
  - filtres `from_date` i `to_date`
  - formulari d'enviament de valoracio amb estrelles
  - llistat d'opinions amb data
- Implementat control de comentaris per compra real:
  - només es permet comentar si existeix `order_item` pendent (`has_to_comment=true`)
  - en enviar comentari, `has_to_comment` passa a `false`
- Afegit component reutilitzable `OpinionStars`.

## Decisions tecniques
- L'API d'opinions s'ha implementat dins Laravel per mantenir coherencia del monolit.
- L'accio `sendOpinion` requereix autenticacio i valida compra real pendent del llibre.
- Les consultes i formulari a frontend funcionen via `axios`.

## Proves i validacions
- Validacio prevista: usuari amb compra pendent pot valorar.
- Validacio prevista: usuari sense compra pendent no pot valorar.
- Validacio prevista: rating mitja i recompte s'actualitzen en temps real.

## Pendents
- Exposar documentacio Swagger/OpenAPI de l'API d'opinions si es requereix lliurable explicit.
