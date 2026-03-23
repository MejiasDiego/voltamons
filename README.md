# Voltamons - Projecte Transversal DAW2

Voltamons és una llibreria online desenvolupada amb Laravel, Inertia i React per cobrir els requisits del Projecte Transversal DAW2 (M9, M6, M7 i M3).

## Stack tecnologic

- Backend: Laravel 12 + PHP 8.2
- Frontend: Inertia + React + Tailwind CSS
- Base de dades: MySQL
- Factures PDF: `barryvdh/laravel-dompdf`
- API opinions: endpoints compatibles amb SwaggerHub `MPALAU2/getOpinions/1.1.0`

## Funcionalitats principals

- Cataleg de llibres amb categories, subcategories i portades.
- Cistella persistent amb `localStorage` sense login.
- Checkout autenticat amb comandes, historial i factura PDF.
- Panell admin amb gestio d'estoc, descompte global i grafica Canvas.
- Modul d'opinions amb recordatori postcompra (`has_to_comment`).

## Usuaris de prova

- Admin:
  - Email: `admin@voltamons.cat`
  - Password: `admin12345`
- Client:
  - Email: `test@example.com`
  - Password: `password`

## Instal·lacio

1. Instal·lar dependències PHP:

```bash
composer install
```

2. Instal·lar dependències JS:

```bash
npm install
```

3. Copiar variables d'entorn:

```bash
cp .env.example .env
```

4. Configurar base de dades a `.env`.

5. Generar clau aplicacio:

```bash
php artisan key:generate
```

6. Migrar i seed:

```bash
php artisan migrate --seed
```

## Execucio local

Terminal 1:

```bash
php artisan serve
```

Terminal 2:

```bash
npm run dev
```

## Comandes utiles

- Tests:

```bash
php artisan test
```

- Build produccio frontend:

```bash
npm run build
```

## Documentacio funcional

La memòria per funcionalitats es troba a `docs/memoria/` i recull objectiu, requisits coberts, historial de versions, decisions, proves i pendents.
