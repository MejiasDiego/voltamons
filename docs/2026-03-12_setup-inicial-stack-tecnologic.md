# Voltamons — Setup inicial i decisions de projecte

**Data:** 12 de març de 2026  
**Fase:** Configuració inicial  
**Estat:** ✅ Completat

---

## 1. Descripció del projecte

**Voltamons** és una llibreria online desenvolupada com a projecte transversal de fi de curs del Grau Superior de DAW2. El projecte cobreix quatre mòduls:

| Mòdul | Nom | Contingut principal |
|-------|-----|---------------------|
| M9 | Interfície web | Disseny, wireframes, guia d'estils, responsive |
| M6 | Entorn client | JavaScript, cistella, formularis, API Opinions, Canvas |
| M7 | Laravel | Backend, autenticació, AJAX, comandes, PDF |
| M3 | API REST | Opinions i valoracions de productes |

---

## 2. Identitat de marca

| Camp | Valor |
|------|-------|
| Nom | Voltamons |
| Eslògan | *La llibreria que t'obre el món — un llibre a la vegada.* |
| Domini suggerit | voltamons.cat |
| Sector | Llibreria online |
| Mercat | Nacional → Internacional |
| Públic objectiu | Lectors 18–55 anys |

### Paleta de colors

| Rol | Hex | Descripció |
|-----|-----|------------|
| Principal | `#7B4F2E` | Marró fosc |
| Secundari | `#A0714A` | Marró mig |
| Accent | `#D4A97A` | Caramel clar |
| Fons càlid | `#F5EAD9` | Crema |
| Fons pàgina | `#F8F5F0` | Blanc trencat |
| Text principal | `#2C2A26` | Gairebé negre |
| Text secundari | `#6B6860` | Gris càlid |

### Tipografia

| Ús | Família | Estil |
|----|---------|-------|
| Títols i capçaleres | Playfair Display | Serif, elegant, literari |
| Cos de text i UI | Inter | Sans-serif, llegible, modern |

Ambdues disponibles gratuïtament a Google Fonts.

---

## 3. Stack tecnològic

| Capa | Tecnologia | Notes |
|------|-----------|-------|
| Frontend framework | React (via Breeze) | Inertia.js com a pont |
| CSS | Bootstrap 5 | Components llestos, compatible amb Blade/Inertia |
| Backend | Laravel 11 | Framework PHP principal |
| Pont frontend/backend | Inertia.js | Elimina la necessitat d'una API REST separada |
| Autenticació | Laravel Breeze | Inclou registre, login, verificació email |
| Base de dades | MySQL | Base de dades relacional |
| Build tool | Vite | Inclòs amb Breeze |
| Gràfic de vendes | Canvas API natiu | Requisit explícit del professor |
| Cistella (sense login) | localStorage | Persisteix entre sessions |
| PDF factures | DomPDF (Laravel) | Generació de factures en PDF |
| Control de versions | Git + GitHub | — |

### Per què Inertia.js i no SPA separada?

S'ha escollit l'arquitectura **monolítica amb Inertia.js** (tot en un sol projecte Laravel) en lloc de Laravel API + React SPA separats pels motius següents:

- Menys complexitat de configuració (CORS, autenticació JWT, etc.)
- Laravel gestiona les rutes i Inertia passa les dades directament als components React com a props
- Laravel Breeze ja inclou la integració Inertia + React de sèrie
- Més adequat per al context acadèmic del projecte

---

## 4. Estructura de pàgines prevista

| Pàgina | Perfil | Descripció |
|--------|--------|------------|
| Homepage | Tots | Banner hero, novetats, categories destacades |
| Catàleg | Tots | Llistat de llibres, filtres per gènere/preu/valoració |
| Fitxa de producte | Tots | Detall del llibre, valoracions API, afegir a cistella |
| Cistella | Tots | Resum, quantitats, preu total (sense login) |
| Registre / Login | Visitant | Formulari validat, indicador fortalesa contrasenya |
| Formulari consulta | Tots | Contacte sobre producte, spinner d'enviament |
| Panel admin | Administrador | Estoc, vendes, gràfic Canvas, descomptes |
| Historial comandes | Client registrat | Comandes anteriors i estat actual |

---

## 5. Passos d'instal·lació realitzats

### 5.1 Creació del projecte Laravel

```bash
composer create-project laravel/laravel voltamons
cd voltamons
```

### 5.2 Instal·lació d'Inertia.js (costat servidor)

```bash
composer require inertiajs/inertia-laravel
```

### 5.3 Instal·lació de Laravel Breeze amb React + Inertia

```bash
composer require laravel/breeze --dev
php artisan breeze:install react
```

Breeze instal·la automàticament: React, Inertia.js, Vite i tota la configuració de scaffolding (login, registre, dashboard).

### 5.4 Instal·lació de dependències npm i Bootstrap 5

```bash
npm install
npm install bootstrap @popperjs/core
```

### 5.5 Configuració de la base de dades

Fitxer `.env`:

```env
DB_DATABASE=voltamons
DB_USERNAME=root
DB_PASSWORD=
```

Base de dades `voltamons` creada manualment a MySQL, i migracions executades:

```bash
php artisan migrate
```

### 5.6 Arrencada del servidor de desenvolupament

Dues terminals en paral·lel:

```bash
# Terminal 1 — servidor PHP
php artisan serve

# Terminal 2 — Vite (compilació assets)
npm run dev
```

Aplicació accessible a: `http://localhost:8000`

---

## 6. Estat actual

- [x] Projecte Laravel creat
- [x] Inertia.js instal·lat
- [x] Laravel Breeze (React) instal·lat i configurat
- [x] Bootstrap 5 instal·lat
- [x] Base de dades creada i migrada
- [x] Servidor de desenvolupament funcionant
- [ ] Estructura de fitxers React per definir
- [ ] Pàgines principals per desenvolupar
- [ ] Models i migracions personalitzades per crear

---

## 7. Pròxims passos

1. Definir l'estructura de carpetes dels components React
2. Configurar Bootstrap 5 globalment (importar a `app.jsx` o `app.css`)
3. Crear els models i migracions: `Book`, `Category`, `Order`, `OrderItem`, `Review`
4. Crear els seeders amb 6–8 llibres de mostra
5. Desenvolupar la homepage i el catàleg

---

*Documentació generada durant el procés de desenvolupament del projecte transversal DAW2.*
