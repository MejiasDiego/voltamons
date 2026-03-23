# Cistella localstorage

## Context
Implementacio de la cistella de compra per usuaris sense login amb persistencia entre sessions.

## Requisits coberts
- M6 - Cistella operativa sense registre/login.
- M6 - Persistencia de cistella entre sessions.
- M6 - Modificar quantitats, eliminar productes i mostrar totals per producte i total global.

## Historial de versions

### 2026-03-23 - v1
- Creat modul `resources/js/lib/cart.js` amb:
  - lectura/escriptura a `localStorage`
  - afegir, actualitzar, eliminar i buidar elements
  - calcul de total i format de preu
- Creat component `CartBadge` al header amb recompte en temps real.
- Creat component `AddToCartButton` per reutilitzar l'accio d'afegir.
- Creada pagina `Cart/Index`:
  - llista productes de cistella
  - canvi de quantitat
  - eliminacio de linies
  - subtotal per producte
  - total de cistella
  - accio de buidar cistella
- Afegida ruta `GET /cistella` (`cart.index`).

## Decisions tecniques
- S'utilitza l'event custom `cart:updated` per sincronitzar components sense state global extern.
- La cistella guarda un snapshot minim del producte (titol, preu, stock, portada, categoria) per render immediat.

## Proves i validacions
- Validacio prevista: afegir producte des de home i cataleg.
- Validacio prevista: recarregar pagina i verificar persistencia.
- Validacio prevista: ajustar quantitat i comprovar totals.

## Pendents
- Integrar checkout real al Bloc 3 reutilitzant dades de cistella.
