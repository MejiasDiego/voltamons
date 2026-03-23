# Admin estoc descomptes canvas

## Context
Implementacio del bloc d'administracio per control d'estoc, descomptes i seguiment visual de vendes.

## Requisits coberts
- M6 admin - veure estoc de productes i detectar esgotats.
- M6 admin - ordenar i gestionar productes segons estoc.
- M6 admin - metode per modificar preus (descompte global).
- M6 admin - grafica de barres amb Canvas de vendes per producte.

## Historial de versions

### 2026-03-23 - v1
- Backend admin:
  - nou controlador `Admin\\BookController`
  - endpoint AJAX per actualitzar estoc (`PATCH /admin/books/{book}/stock`)
  - endpoint AJAX per descompte global (`POST /admin/books/discount`)
- Panell admin:
  - taula de llibres amb estoc editable in-line
  - columna d'estat `Disponible` / `Esgotat`
  - mòdul d'accio rapida per aplicar descompte percentual
  - render de grafica Canvas amb dades de `order_items`
- Dashboard admin actualitzat per incloure:
  - comptador de productes sense estoc
  - dades de vendes agregades per producte

## Decisions tecniques
- Canvis d'estoc i preu s'executen via AJAX per complir requisit d'interaccio sense recarrega.
- La grafica usa Canvas API nativa sense llibreries externes.
- Dades de vendes provenen de `order_items` per tenir històric immutable de comandes.

## Proves i validacions
- Validacio prevista: editar estoc i comprovar persistencia a base de dades.
- Validacio prevista: aplicar descompte i comprovar reflex al cataleg.
- Validacio prevista: comprovar grafica amb comandes reals creades al checkout.

## Pendents
- Afegir estat de comanda en panell admin i accions de transicio d'estat.
