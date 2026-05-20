Voltamons

## Stack tecnològic

- **Framework frontend:** React 18
- **Renderització:** Inertia.js v2 (sense API REST pròpia; les dades arriben des de Laravel via Inertia)
- **Estils:** Tailwind CSS v3 + Bootstrap 5.3 (puntual, per al carrusel i Popper)
- **Eina de build:** Vite 7
- **HTTP client:** Axios (per a crides AJAX puntuals: opinions, preview, review reminder)
- **Gestió d'imatges:** emmagatzematge local a `public/images/`

## Estructura del directori `resources/js/`

```
resources/js/
├── app.jsx                  # Punt d'entrada React
├── bootstrap.js             # Configuració de Vite i Axios
├── lib/
│   └── cart.js              # Lògica de la cistella (localStorage)
├── Components/              # Components reutilitzables
│   ├── AddToCartButton.jsx
│   ├── ApplicationLogo.jsx
│   ├── BookCover.jsx
│   ├── CartBadge.jsx
│   ├── Checkbox.jsx
│   ├── DangerButton.jsx
│   ├── Dropdown.jsx
│   ├── InputError.jsx
│   ├── InputLabel.jsx
│   ├── Modal.jsx
│   ├── NavLink.jsx
│   ├── OpinionStars.jsx
│   ├── PrimaryButton.jsx
│   ├── ResponsiveNavLink.jsx
│   ├── ReviewReminderModal.jsx
│   ├── SecondaryButton.jsx
│   └── TextInput.jsx
├── Layouts/                 # Layouts globals
│   ├── AuthenticatedLayout.jsx
│   ├── GuestLayout.jsx
│   └── StoreLayout.jsx
└── Pages/                   # Pàgines (mapejades 1:1 amb rutes Laravel)
    ├── Welcome.jsx
    ├── Home.jsx
    ├── Dashboard.jsx
    ├── Auth/
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   ├── ForgotPassword.jsx
    │   ├── ResetPassword.jsx
    │   ├── ConfirmPassword.jsx
    │   └── VerifyEmail.jsx
    ├── Catalog/
    │   ├── Index.jsx         # Llistat de llibres amb filtres
    │   └── Show.jsx          # Fitxa detallada del llibre
    ├── Cart/
    │   └── Index.jsx         # Cistella de compra
    ├── Checkout/
    │   └── Create.jsx        # Formulari de checkout
    ├── Orders/
    │   ├── Index.jsx         # Historial de comandes
    │   └── Show.jsx          # Detall d'una comanda
    ├── Profile/
    │   ├── Edit.jsx          # Perfil d'usuari
    │   └── Partials/
    │       ├── DeleteUserForm.jsx
    │       ├── UpdatePasswordForm.jsx
    │       └── UpdateProfileInformationForm.jsx
    ├── Admin/
    │   ├── Dashboard.jsx     # Panell admin amb gràfica Canvas
    │   ├── Books/            # CRUD de llibres
    │   ├── Categories/       # CRUD de categories
    │   ├── Subcategories/    # CRUD de subcategories
    │   ├── Orders/           # Gestió de comandes
    │   └── Users/            # Gestió d'usuaris
    ├── Legal/
    │   ├── LegalNotice.jsx
    │   ├── CookiesPolicy.jsx
    │   ├── PrivacyPolicy.jsx
    │   ├── ShippingPolicy.jsx
    │   └── Contact.jsx
    └── MemoriaUi/
        └── Index.jsx         # Memòria de funcionalitats UI
```

## Navegació (rutes frontend)

Totes les rutes es defineixen a `routes/web.php` de Laravel i es renderitzen amb Inertia:

### Públiques (sense autenticació)
| Ruta | Pàgina | Descripció |
|---|---|---|
| `/` | — | Redirigeix a `/inici` |
| `/inici` | `Home` | Portada amb destacats |
| `/cataleg` | `Catalog/Index` | Catàleg amb filtres per categoria |
| `/cataleg/{slug}` | `Catalog/Show` | Fitxa de producte |
| `/cistella` | `Cart/Index` | Cistella de compra |
| `/avis-legal` | `Legal/LegalNotice` | Avís legal |
| `/politica-cookies` | `Legal/CookiesPolicy` | Política de cookies |
| `/privacitat` | `Legal/PrivacyPolicy` | Política de privacitat |
| `/condicions-enviament` | `Legal/ShippingPolicy` | Condicions d'enviament |
| `/contacte` | `Legal/Contact` | Contacte |
| `/memoria-ui` | `MemoriaUi/Index` | Memòria UI del projecte |

### Autenticades (requereixen login)
| Ruta | Pàgina | Descripció |
|---|---|---|
| `/checkout` | `Checkout/Create` | Formulari de pagament |
| `/comandes` | `Orders/Index` | Historial de comandes |
| `/comandes/{order}` | `Orders/Show` | Detall de comanda |
| `/profile` | `Profile/Edit` | Editar perfil |

### Admin (requereixen rol admin)
| Ruta base: `/admin/*` | Descripció |
|---|---|
| `/admin/dashboard` | Panell amb gràfica Canvas |
| `/admin/books` | CRUD de llibres + descompte global |
| `/admin/categories` | CRUD de categories |
| `/admin/subcategories` | CRUD de subcategories |
| `/admin/orders` | Gestió de comandes |
| `/admin/users` | Gestió d'usuaris |

### Endpoints AJAX (Axios, no Inertia)
| Ruta | Ús |
|---|---|
| `GET /api/getOpinions/{idProducte}` | Obtenir opinions d'un llibre |
| `GET /api/getRating` | Obtenir valoració mitjana |
| `GET /api/getAllOpinions` | Llistar totes les opinions |
| `POST /api/sendOpinion` | Enviar una opinió (auth) |
| `GET /api/pending-reviews` | Opinions pendents de l'usuari (auth) |
| `POST /api/review-decision` | Decisió sobre recordatori (auth) |
| `GET /api/cataleg/{slug}/preview` | Previsualització asíncrona del llibre |

## Flux de dades

```
Usuari → Navegador → Vite (dev) / build (prod)
                        ↕ (Inertia)
               Laravel (controladors)
                        ↕ (Eloquent)
                     Base de dades (SQLite/MySQL)
```

Inertia permet que Laravel servisca dades directament als components React sense necessitat d'una API REST. Les crides AJAX amb Axios només s'utilitzen per a funcionalitats específiques (opinions, previews, recordatoris).

## Gestió d'estat

### Cistella (`lib/cart.js`)
- Emmagatzematge al `localStorage` del navegador.
- Funciona sense sessió d'usuari.
- Sincronització amb backend en fer checkout.
- Funcions exportades: `addToCart`, `removeFromCart`, `updateQuantity`, `getCart`, `clearCart`, `getCartTotal`.

### Autenticació
- Gestionada per Laravel Breeze + Inertia.
- L'estat de l'usuari es propaga a React via `usePage().props.auth.user`.

### Formularis
- Ús de `useForm` d'Inertia (maneig d'estat, validació i enviament).
- Errors de validació mostrats amb el component `InputError`.

## Layouts

- **`StoreLayout.jsx`** — Layout principal de la botiga (capçalera amb navegació, carrusel, peu de pàgina). S'aplica a Home, Catàleg, Cistella, Checkout, Comandes, Pàgines legals.
- **`AuthenticatedLayout.jsx`** — Layout per a usuaris autenticats (panell d'usuari). S'aplica a Dashboard, Profile i Admin.
- **`GuestLayout.jsx`** — Layout per a pàgines d'autenticació (Login, Register, etc.).

## Components destacats

- **`AddToCartButton.jsx`** — Botó d'afegir a la cistella amb detecció d'estoc.
- **`CartBadge.jsx`** — Badge al menú que mostra el nombre d'articles.
- **`BookCover.jsx`** — Render de portada de llibre amb imatge local.
- **`ReviewReminderModal.jsx`** — Modal emergent post-compra per a recordar opinar.
- **`OpinionStars.jsx`** — Visualització de valoració amb estrelles.

## Crides a APIs externes

- **`barryvdh/laravel-dompdf`** — Generació de factures PDF al servidor (la descàrrega s'inicia des del frontend via Inertia).
- **`@popperjs/core`** — Suport a tooltips i dropdowns (via Bootstrap).

## Execució del frontend en desenvolupament

```bash
npm run dev        # Compila assets amb Vite en mode watch
npm run build      # Compila per a producció
php artisan serve  # Servidor Laravel (necessari per a Inertia)
```

## Tests del frontend

El projecte no inclou tests frontend automatitzats. Les proves es fan manualment via navegador o amb PHPUnit per al backend (que verifica que les dades arriben correctament a les vistes Inertia).
