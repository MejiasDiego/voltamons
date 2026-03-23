# Base interficie - home cataleg admin

## Context
Primer lliurable visual i funcional de navegacio publica i accés inicial a panell d'administracio.

## Requisits coberts
- M7 - Usuaris no registrats poden navegar per la tenda i veure productes.
- M7 - Acces separat per rols (admin/client).
- M9 - Base responsive de pagina inici i cataleg.

## Historial de versions

### 2026-03-23 - v1
- Creat `StoreLayout` per a navegacio publica de la tenda.
- Nova pagina `Home` amb categories destacades i llibres destacats.
- Nova pagina `Catalog/Index` amb filtres per categoria, subcategoria i text.
- Creat `HomeController` i `CatalogController` amb dades per Inertia.
- Creat `Admin/Dashboard` i `Admin/DashboardController` amb KPIs inicials i taula de llibres.
- Actualitzat `routes/web.php`:
  - `/` redirigeix a `/inici`
  - noves rutes `/inici` i `/cataleg`
  - nova ruta protegida `admin/dashboard` amb middleware `role:admin`
- Ajust menor a `Dashboard.jsx` per text en catala.

## Decisions tecniques
- S'ha separat layout public (`StoreLayout`) del layout autenticat per mantenir responsabilitats clares.
- Els filtres de cataleg s'apliquen via querystring per mantenir URLs compartibles.

## Proves i validacions
- Validacio prevista: navegacio anònima home -> cataleg.
- Validacio prevista: login admin i accés a `admin/dashboard`.
- Validacio prevista: usuari client sense permisos rep `403` en ruta admin.

## Pendents
- Integrar fitxa detall de producte i cistella (bloc 2).
- Refinar disseny final segons guia d'estils completa de M9.
