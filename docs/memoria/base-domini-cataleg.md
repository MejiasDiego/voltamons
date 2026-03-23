# Base domini - cataleg

## Context
Implementacio del model de dades base de cataleg per a categories, subcategories i llibres.

## Requisits coberts
- M7 - Administracio de categories i subcategories.
- M7 - Gestio de productes amb preu i estoc.
- M7 - Relacions ORM entre categories, subcategories i productes.

## Historial de versions

### 2026-03-23 - v1
- Creats models `Category`, `Subcategory` i `Book`.
- Definides relacions ORM:
  - `Category -> subcategories`, `Category -> books`
  - `Subcategory -> category`, `Subcategory -> books`
  - `Book -> category`, `Book -> subcategory`
- Afegides migracions:
  - `create_categories_table`
  - `create_subcategories_table`
  - `create_books_table`
- Creats seeders `CategorySeeder` i `BookSeeder` amb conjunt inicial de dades.
- Actualitzat `DatabaseSeeder` per carregar rols, cataleg i usuaris de prova.

## Decisions tecniques
- S'utilitza `slug` unic en categories/subcategories/llibres per facilitar filtres i rutes amigables.
- `books` inclou `is_active` i `stock` per cobrir desactivacio logica i disponibilitat.
- `isbn` unic per garantir identificacio estable de producte.

## Proves i validacions
- Validacio prevista: executar migracions i seeders sense errors.
- Validacio prevista: comprovar relacions ORM amb `with()` a consultes del cataleg.

## Pendents
- Afegir CRUD admin de categories, subcategories i llibres amb operacions AJAX (fase posterior).

### 2026-03-23 - v2
- Afegits models `Order` i `OrderItem` com a extensio del domini de compra.
- Definida relacio `User -> orders`.
