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

### 2026-03-23 - v2
- API adaptada al contracte SwaggerHub `MPALAU2/getOpinions/1.1.0`.
- Endpoints disponibles segons especificacio:
  - `GET /api/getOpinions/{idProducte}`
  - `POST /api/sendOpinion`
  - `GET /api/getRating`
  - `GET /api/getAllOpinions`
- Afegit suport de query param `bd` (`jdbc|jpa|mongodb`) amb validacio.
- Respostes adaptades als esquemes Swagger (`Producte`, `ProducteRating`, `GenericResponse`, `ErrorResponse`).
- Manteniment estricte de la regla de negoci de compra pendent:
  - `sendOpinion` nomes permet comentar si existeix `order_item.has_to_comment=true` del mateix usuari i producte.
  - en enviar opinio correcta, `has_to_comment` passa a `false`.
- Frontend de fitxa adaptat al nou contracte de resposta (`opinionId`, `timeStamp`, `title`, `opinion`).

## Decisions tecniques
- L'API d'opinions s'ha implementat dins Laravel i exposada amb contracte SwaggerHub requerit.
- L'accio `sendOpinion` requereix autenticacio i manté control de compra pendent (`has_to_comment`).
- Les consultes i formulari a frontend funcionen via `axios` consumint directament els endpoints Swagger.

## Proves i validacions
- Validacio prevista: usuari amb compra pendent pot valorar.
- Validacio prevista: usuari sense compra pendent no pot valorar.
- Validacio prevista: rating mitja i recompte s'actualitzen en temps real.

## Pendents
- Exposar documentacio Swagger/OpenAPI de l'API d'opinions si es requereix lliurable explicit.
