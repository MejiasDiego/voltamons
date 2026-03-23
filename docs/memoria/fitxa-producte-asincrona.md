# Fitxa producte asincrona

## Context
Afegir consulta de detall de producte sense recarregar la pagina per complir requisit de vista rapida asíncrona.

## Requisits coberts
- M6 - Mostrar mes detall en finestra/pestanya sense recarregar pagina.
- M6 - Integracio de la fitxa amb accio d'afegir a cistella.

## Historial de versions

### 2026-03-23 - v1
- Creat endpoint de preview asíncron: `GET /api/cataleg/{slug}/preview`.
- Implementat a `Catalog/Index`:
  - boto `Vista rapida`
  - peticio AJAX amb `axios`
  - modal amb spinner, portada, dades i accions
- Creada pagina de fitxa completa `Catalog/Show` per navegacio directa.
- Afegida ruta `GET /cataleg/{slug}` (`catalog.show`).

## Decisions tecniques
- Es manté endpoint JSON separat per a la vista rapida i ruta Inertia per a fitxa completa.
- El modal treballa sobre l'state local per simplicitat i velocitat.

## Proves i validacions
- Validacio prevista: obrir/ tancar modal i comprovar dades.
- Validacio prevista: carregar fitxa completa des de modal.

## Pendents
- Integrar valoracions API en aquest modal/fitxa quan fem el bloc d'opinions.
