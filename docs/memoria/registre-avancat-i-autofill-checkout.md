# Registre avancat i autofill checkout

## Context
Actualitzacio del registre per complir els requisits de validacio client-side del modul M6 i persistencia de dades per reutilitzacio en checkout.

## Requisits coberts
- M6 - Formulari de registre amb validacions JavaScript avanzades.
- M6 - UX user friendly: focus/blur, estats visuals valid/invalid.
- M6 - Fortalesa de contrasenya amb `meter` i acceptacio minima de nivell mitja.
- M7 - Persistencia de dades de perfil ampliades a base de dades.
- M7 - Reutilitzacio automatica de dades de facturacio al checkout.

## Historial de versions

### 2026-03-24 - v1
- Afegida migracio de nous camps a `users`:
  - `birth_date`, `phone`
  - adreca enviament/facturacio (adreca, ciutat, provincia, codi postal)
  - camps extra: `favorite_genre`, `reading_language`
- `User` actualitzat amb `fillable` i `casts`.
- `RegisteredUserController` actualitzat per:
  - validar nous camps
  - parsejar i validar data `DD/MM/YYYY` amb rang 18-100
  - normalitzar nom a format titol
  - assignar billing des de shipping si no s'informa
- `Register.jsx` reimplementat amb validacions JS:
  - nom i cognoms amb restriccions
  - data de naixement i edat
  - telefon internacional
  - adreces i codis postals
  - 2 camps extra de tematica
  - password strength amb `meter`
  - estils de focus/blur i validacio visual
- `Checkout/Create.jsx` actualitzat per preomplir camps des de `authUser`.
- `DatabaseSeeder` actualitzat amb dades de prova pels nous camps.
- Test de registre actualitzat (`RegistrationTest`).

## Decisions tecniques
- Validacions d'interaccio de formulari fetes a frontend amb React (JS), tal com demana professorat de JavaScript.
- Validacio backend mantinguda per seguretat i consistencia de dades.
- Persistencia de dades al model `users` per reutilitzacio al checkout i millor UX.

## Proves i validacions
- Validacio prevista: enviar formulari amb camps invalids i veure errors en temps real.
- Validacio prevista: registre valid guarda dades ampliades.
- Validacio prevista: checkout carrega dades de perfil automaticamente.

## Pendents
- Opcional: portar aquests camps al formulari d'edicio de perfil per manteniment per part del client.
