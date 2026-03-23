# Portades llibres

## Context
Afegir portada visual a les targetes de llibre per millorar l'atencio del client en homepage i cataleg.

## Requisits coberts
- M9 - Millora de la interfície visual amb contingut rellevant de producte.
- M7 - Llistat de productes amb informacio bàsica i visual atractiva.

## Historial de versions

### 2026-03-23 - v1
- Definida estratègia de portada per defecte:
  - Prioritat 1: `books.cover_image` (sobreescriptura manual)
  - Prioritat 2: Open Library per ISBN
  - Prioritat 3: placeholder local de Voltamons
- Afegit accessor `cover_url` al model `Book` per centralitzar la resolucio de portada.
- Creat component reusable `BookCover` amb `loading="lazy"` i fallback en error.
- Afegida imatge placeholder a `public/images/placeholders/book-cover.svg`.
- Integrada portada a les targetes de `Home` i `Catalog/Index` mantenint genere, titol, autor, preu i estoc.

## Decisions tecniques
- Open Library s'utilitza sense persistir URL a BD, evitant manteniment innecessari.
- `cover_image` queda disponible per correccions manuals de casos concrets.
- El fallback visual evita targetes trencades en ISBN sense portada.

## Proves i validacions
- Validacio prevista: llibres amb ISBN valid mostren portada remota.
- Validacio prevista: errors d'imatge cauen a placeholder sense trencar layout.

## Pendents
- Reutilitzar `BookCover` a la futura fitxa detall de producte i a cistella.
