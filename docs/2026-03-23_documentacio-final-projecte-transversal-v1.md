# Documentacio final v1 - Projecte Transversal DAW2 (Voltamons)

## 1. Introduccio

Voltamons es una llibreria online desenvolupada com a projecte transversal de DAW2. L'objectiu del producte es oferir un flux complet de compra de llibres (des de la consulta de cataleg fins a la factura) i una area d'administracio per gestionar estoc, preus i seguiment de vendes.

Aquesta documentacio recull:

- la part funcional (que veu i fa cada tipus d'usuari),
- la part tecnica (com esta implementat el projecte),
- i el test d'errors realitzat.

## 2. Documentacio funcional

### 2.1 Objectius funcionals del web

1. Permetre a qualsevol usuari navegar pel cataleg i afegir llibres a cistella.
2. Permetre al client registrat completar una compra i consultar historial i factures.
3. Permetre al botiguer/admin controlar estoc, aplicar descomptes i visualitzar vendes.
4. Integrar opinions de producte amb control de compra pendent.

### 2.2 Perfils d'usuari

- **Visitant (no autenticat)**
  - Veu inici i cataleg.
  - Fa servir filtres.
  - Pot afegir productes a cistella (localStorage).
  - Pot obrir vista rapida i fitxa completa.

- **Client (autenticat)**
  - Tot el que pot fer un visitant.
  - Pot fer checkout i crear comandes.
  - Pot consultar historial de comandes i descarregar factura PDF.
  - Pot enviar opinio si te compra pendent de comentar (`has_to_comment`).

- **Admin (autenticat, rol admin)**
  - Accedeix al panell d'administracio.
  - Modifica estoc en linia.
  - Aplica descompte global.
  - Revisa productes esgotats.
  - Consulta grafica de vendes amb Canvas.

### 2.3 Contingut i pantalles principals

#### 2.3.1 Inici (`/inici`)

- Hero principal amb missatge de marca.
- Categories destacades.
- Novetats amb portada, genere, titol, autor, preu i estoc.
- Accions: veure fitxa o afegir a cistella.

**Evidencia recomanada:** `Captura F-01` (home completa).

#### 2.3.2 Cataleg (`/cataleg`)

- Filtres per text, categoria i subcategoria.
- Targetes de producte amb dades comercials i portada.
- Vista rapida asíncrona (modal).
- Accio d'afegir a cistella.

**Evidencia recomanada:** `Captura F-02` (cataleg + filtres), `Captura F-03` (vista rapida).

#### 2.3.3 Fitxa de producte (`/cataleg/{slug}`)

- Informacio de detall de llibre.
- Bloc d'opinions i valoracions.
- Filtre de dates per opinions.
- Formulari d'enviament de valoracio (amb estrelles i titol).
- Missatge de recordatori si hi ha compra pendent de comentar.

**Evidencia recomanada:** `Captura F-04` (fitxa), `Captura F-05` (opinions + recordatori).

#### 2.3.4 Cistella (`/cistella`)

- Productes de cistella emmagatzemats en localStorage.
- Canvi de quantitat, eliminacio i buidatge.
- Resum economic en temps real.

**Evidencia recomanada:** `Captura F-06` (cistella amb productes).

#### 2.3.5 Checkout (`/checkout`)

- Formulari de contacte, enviament, facturacio i pagament fictici.
- Validacions de camps obligatoris.
- Creacio de comanda al confirmar.

**Evidencia recomanada:** `Captura F-07` (checkout complet).

#### 2.3.6 Comandes (`/comandes` i `/comandes/{id}`)

- Historial de comandes del client.
- Detall de comanda amb linies i totals.
- Descàrrega de factura PDF.

**Evidencia recomanada:** `Captura F-08` (historial), `Captura F-09` (detall + boto PDF).

#### 2.3.7 Panell admin (`/admin/dashboard`)

- KPIs de productes/categories/estoc.
- Edicio d'estoc amb AJAX.
- Aplicacio de descompte global.
- Grafica Canvas de vendes.

**Evidencia recomanada:** `Captura F-10` (dashboard admin), `Captura F-11` (canvas), `Captura F-12` (estoc/descompte).

### 2.4 Menus i organitzacio de la interfície

- **Menu public (StoreLayout):** Inici, Cataleg, Cistella, Login/Register.
- **Menu autenticat client:** Compte, Comandes.
- **Menu admin:** acces a panell admin.

L'organitzacio visual es responsive i separa clarament:

- navegacio superior,
- zona de contingut principal,
- blocs funcionals (filtres, llistats, formularis, taules).

## 3. Documentacio tecnica

### 3.1 Stack i arquitectura

- **Backend:** Laravel 12 (PHP 8.2), Eloquent ORM.
- **Frontend:** Inertia + React.
- **Estils:** Tailwind CSS.
- **BD:** MySQL.
- **PDF:** `barryvdh/laravel-dompdf`.

Arquitectura monolitica amb separacio per capes:

- controladors (lògica de negoci),
- models (persistencia i relacions),
- components/pagines React (presentacio i UX),
- rutes web + rutes API.

### 3.2 Tractament de dades i emmagatzematge

#### 3.2.1 Base de dades (resum)

- `roles`, `users`
- `categories`, `subcategories`, `books`
- `orders`, `order_items`
- `opinions`

Relacions clau:

- un usuari pot tenir moltes comandes,
- una comanda te moltes linies,
- cada linia referencia un llibre,
- un llibre te moltes opinions,
- l'opinio pot quedar vinculada a `order_item` per control postcompra.

#### 3.2.2 Cistella i localStorage

La cistella es gestiona al client en `resources/js/lib/cart.js` i es desa a `localStorage` amb clau `voltamons_cart_v1`.

Format principal: array d'objectes amb camps de producte i quantitat (`id`, `title`, `price`, `stock`, `quantity`, etc.).

Operacions disponibles:

- llegir cistella,
- afegir producte,
- actualitzar quantitat,
- eliminar linia,
- buidar cistella,
- calcular totals.

### 3.3 Decisions tecniques rellevants

1. **Rols i permisos**
   - middleware `role` per protegir rutes admin.
2. **Integritat de compra**
   - checkout en transaccio + control d'estoc.
3. **Persistencia historica**
   - `order_items` desa snapshots de dades de producte.
4. **Portades de llibre**
   - prioritat `cover_image` manual,
   - fallback Open Library per ISBN,
   - fallback final placeholder local.
5. **Canvas admin**
   - us de la logica treballada a classe, adaptada a React.
6. **Seeder idempotent**
   - `DatabaseSeeder` amb `updateOrCreate` per evitar duplicats.

### 3.4 API d'opinions (SwaggerHub)

El modul d'opinions s'ha adaptat al contracte:

- `GET /api/getOpinions/{idProducte}`
- `POST /api/sendOpinion`
- `GET /api/getRating`
- `GET /api/getAllOpinions`

Inclou suport `bd` opcional (`jdbc`, `jpa`, `mongodb`) i respostes en format coherent amb l'especificacio.

#### Regla de negoci critica

Tot i adaptar API, es manté el control funcional del projecte:

- l'usuari nomes pot enviar opinio si te una compra pendent d'aquell producte (`has_to_comment=true`),
- en enviar-la correctament, aquest flag passa a `false`.

### 3.5 Fragments tecnics destacables

- cistella: `resources/js/lib/cart.js`
- checkout i factura: `app/Http/Controllers/CheckoutController.php`
- API opinions: `app/Http/Controllers/Api/OpinionController.php`
- fitxa amb opinions asíncrones: `resources/js/Pages/Catalog/Show.jsx`
- canvas admin: `resources/js/Pages/Admin/Dashboard.jsx`

## 4. Test d'errors i proves de validacio

S'ha executat test automatitzat i prova manual funcional.

### 4.1 Proves automatitzades

- `php artisan test` -> tests de backend i autenticacio.
- `npm run build` -> validacio de compilacio frontend.
- `php artisan migrate --seed` -> validacio de migracions i seeders.

### 4.2 Llistat de proves manuals

| ID | Prova | Resultat esperat | Estat | Evidencia |
|---|---|---|---|---|
| T-01 | Login admin correcte | Acces a panell admin | OK | Captura T-01 |
| T-02 | Login incorrecte | Error de credencials | OK | Captura T-02 |
| T-03 | Client intenta ruta admin | Error 403 | OK | Captura T-03 |
| T-04 | Cistella persisteix en recarregar | Items es mantenen | OK | Captura T-04 |
| T-05 | Quantitat superior a estoc | Ajust/limit correcte | OK | Captura T-05 |
| T-06 | Checkout valid | Comanda creada + estoc descomptat | OK | Captura T-06 |
| T-07 | Factura PDF | Fitxer descarregable correcte | OK | Captura T-07 |
| T-08 | API getOpinions producte sense opinions | 404 controlat | OK | Captura T-08 |
| T-09 | sendOpinion sense compra pendent | Error controlat | OK | Captura T-09 |
| T-10 | sendOpinion amb compra pendent | Opinió creada i `has_to_comment=false` | OK | Captura T-10 |
| T-11 | Admin canvia estoc (AJAX) | Valor actualitzat | OK | Captura T-11 |
| T-12 | Admin aplica descompte global | Preus actualitzats | OK | Captura T-12 |

> Nota: inserir les captures indicades a l'annex per evidenciar cadascuna de les proves.

## 5. Conclusions i millores futures

### 5.1 Conclusions

El projecte compleix el flux funcional principal d'una botiga online de llibres:

- consulta i filtrat de cataleg,
- compra completa,
- historial i factures,
- gestio admin,
- i modul d'opinions alineat amb Swagger.

També es manté una traçabilitat tecnica completa mitjancant memòries per funcionalitat a `docs/memoria/`.

### 5.2 Millores futures

1. Paginacio i buscador avançat al modul d'opinions.
2. Estat de comandes administrable (preparacio, enviat, entregat).
3. Tests funcionals e2e amb Playwright/Cypress.
4. Exportacio d'informes admin (CSV/PDF).

## 6. Annex de captures (plantilla)

- Captura F-01: Home
- Captura F-02: Cataleg amb filtres
- Captura F-03: Vista rapida
- Captura F-04: Fitxa producte
- Captura F-05: Opinions i recordatori
- Captura F-06: Cistella
- Captura F-07: Checkout
- Captura F-08: Historial comandes
- Captura F-09: Detall comanda i PDF
- Captura F-10: Panell admin
- Captura F-11: Canvas vendes
- Captura F-12: Estoc/descompte
- Captura T-01..T-12: evidencies test d'errors
