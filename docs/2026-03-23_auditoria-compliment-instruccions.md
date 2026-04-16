# Auditoria de compliment - Instruccions Projecte Transversal DAW2

## Objectiu

Aquesta auditoria compara les instruccions de `docs/Instruccions_Projecte_Transversal_DAW2.md` amb l'estat real del projecte Voltamons. El document identifica:

- que esta implementat,
- que esta parcialment implementat,
- que no esta implementat,
- i si la tecnologia usada coincideix amb la tecnologia demanada.

També marca quins punts son flexibles i quins son potencialment obligatoris per professorat.

## Llegenda d'estat

- **COMPLERT**: funcionalitat implementada i operativa.
- **PARCIAL**: implementada en part, amb desviacions o mancances.
- **NO IMPLEMENTAT**: no hi ha implementacio funcional actual.
- **PENDENT DEFINIR**: el propi enunciat indica que no esta tancat.

## Resum executiu

- **Compliment alt** a M7 (compra, comandes, PDF, rols bàsics) i part de M6 (cistella, detall asíncron, admin canvas/estoc/descompte).
- **Compliment parcial** a M3 per tecnologia: contracte API alineat, pero implementat dins Laravel i no com a API Java.
- **Bretxa important** a M6 formulari de registre avançat i formulari de consulta de producte (no implementats segons especificacio detallada).
- **Bretxa important** a M7 administracio completa (CRUD categories/subcategories/productes, gestio usuaris, actualitzacio/eliminacio de comandes).
- **M9**: hi ha base d'identitat visual, pero no hi ha evidencies finals de wireframes/exposicio formal dins repo.

---

## 1) Compliment per modul

## M9 - Interficie web

| Requisit | Estat | Evidencia actual | Comentari |
|---|---|---|---|
| Definicio activitat empresa (marca/eslogan/mercat) | PARCIAL | `docs/2026-03-12_setup-inicial-stack-tecnologic.md` | Hi ha identitat de marca definida, pero no consta document final de presentacio M9 separat. |
| Guia d'estils (paleta + tipografia) | PARCIAL | `docs/2026-03-12_setup-inicial-stack-tecnologic.md` | Definida a nivell textual; falta evidenciar guia final aplicada (manual visual final/captures sistematiques). |
| Estructura responsive i wireframes | PARCIAL | UIs React responsive implementades (`resources/js/Pages/...`) | L'app es responsive, pero no hi ha wireframes/mockups guardats al repo. |
| Exposicio breu a classe | PENDENT DEFINIR | - | No es pot validar des de codi/repo. |

**Valoracio M9:** base funcional i visual bona, pero falta paquet formal de lliurable M9 (wireframes + guia final + evidencies).

---

## M6 - Entorn client

### Client

| Requisit | Estat | Evidencia actual | Comentari |
|---|---|---|---|
| Cistella sense registre i persistent | COMPLERT | `resources/js/lib/cart.js`, `resources/js/Pages/Cart/Index.jsx` | Compleix persistencia, quantitats, eliminacio i totals. |
| Formulari de registre avançat (nom/cognoms, edat, telefon internacional, adreces, 2 camps extra, fortalesa password, UX focus/blur) | NO IMPLEMENTAT | `resources/js/Pages/Auth/Register.jsx` | Formulari Breeze basic; no compleix requisits avançats de validacio/UX. |
| Formulari consulta producte (guest i logged, validacio producte existent, 150 caracters, boto visible condicional, spinner) | NO IMPLEMENTAT | No hi ha pagina/controlador dedicat | No s'ha trobat implementacio. |
| Valoracio amb estrelles i comentaris via API | COMPLERT | `resources/js/Pages/Catalog/Show.jsx`, `app/Http/Controllers/Api/OpinionController.php` | Integrat a fitxa amb estrelles, comentaris i crides asíncrones. |
| Detall asíncron sense recarrega | COMPLERT | `resources/js/Pages/Catalog/Index.jsx`, `app/Http/Controllers/BookController.php` | Vista rapida modal via AJAX + fitxa completa. |

### Administrador (botiguer)

| Requisit | Estat | Evidencia actual | Comentari |
|---|---|---|---|
| Llistat estoc amb propietats rellevants | COMPLERT | `resources/js/Pages/Admin/Dashboard.jsx` | Taula amb stock, preu, estat, categoria. |
| Control vendes i decrement estoc en compra | COMPLERT | `app/Http/Controllers/CheckoutController.php`, `order_items` | Es crea venda i decremente estoc. |
| Ordenacio per estoc + gestio esgotats | PARCIAL | `app/Http/Controllers/Admin/DashboardController.php`, `Admin/Dashboard.jsx` | Es mostra estat esgotat; ordenacio directa a UI no com a control explicit d'usuari. |
| Descompte global | COMPLERT | `app/Http/Controllers/Admin/BookController.php` | Implementat endpoint i accio UI. |
| Grafic barres amb Canvas | COMPLERT | `resources/js/Pages/Admin/Dashboard.jsx` | Integrada logica del canvas de classe adaptada. |

**Valoracio M6:** molt bon nivell en cistella/admin/canvas/opinions, pero falten 2 peces grans: registre avançat i formulari consulta.

---

## M3 - API Rest opinions

| Requisit | Estat | Evidencia actual | Comentari |
|---|---|---|---|
| Endpoint `getOpinions` | COMPLERT | `GET /api/getOpinions/{idProducte}` a `routes/web.php` | Contracte adaptat segons Swagger. |
| Endpoint `sendOpinion` | COMPLERT | `POST /api/sendOpinion` | Contracte operatiu + validacions. |
| Endpoint `getRating` | COMPLERT | `GET /api/getRating` | Retorna top valoracions amb criteri ponderat. |
| Filtre opcional per data | COMPLERT | `from_date` i `to_date` a `OpinionController` | Implementat sobre `getOpinions`. |
| Tecnologia API en Java | NO IMPLEMENTAT | API a Laravel (`app/Http/Controllers/Api/OpinionController.php`) | Punt potencialment critic si el professor demana Java estrictament. |

**Valoracio M3:** funcionalment complert, tecnologicament desviat si l'exigencia de Java es estricta.

---

## M7 - Laravel

### 1. Autenticacio i rols

| Requisit | Estat | Evidencia actual | Comentari |
|---|---|---|---|
| Breeze registre/login | COMPLERT | `composer.json`, `routes/auth.php` | Implementat. |
| Verificacio email abans d'accedir al sistema | PARCIAL | `routes/auth.php`, `Route::get('/dashboard')->middleware(['auth','verified'])` | Nomes `dashboard` obliga `verified`; altres fluxos autenticats no ho forcen. |
| Rols admin/client | COMPLERT | `roles`, `EnsureUserRole`, `User::isAdmin()` | Implementat. |
| Rol admin assignat manualment, client automatic | COMPLERT | `DatabaseSeeder`, `RegisteredUserController` | Implementat. |
| Admin gestiona categories/subcategories/productes (CRUD complet) | NO IMPLEMENTAT | - | No hi ha CRUD complet, nomes estoc/preu a llibres. |
| Admin pot veure/editar/eliminar usuaris | NO IMPLEMENTAT | - | No hi ha mòdul de gestio d'usuaris. |
| Admin gestiona comandes (veure/actualitzar estat/eliminar) | PARCIAL | Historial i detall existeixen; gestio admin no completa | Falta update d'estat i eliminacio admin. |
| Client veu/edita perfil propi | COMPLERT | `ProfileController` + pages profile | Implementat per Breeze. |
| No registrats poden veure tenda pero no comprar | COMPLERT | cataleg public + checkout amb `auth` | Implementat. |
| Middleware de permisos | COMPLERT | `EnsureUserRole`, grup `/admin` | Implementat. |

### 2. Cataleg de productes

| Requisit | Estat | Evidencia actual | Comentari |
|---|---|---|---|
| Taules i relacions categories/subcategories/productes | COMPLERT | migracions + models Eloquent | Implementat. |
| CRUD categories/subcategories/productes | NO IMPLEMENTAT | - | Falta backend+frontend CRUD complet. |
| Accions stock/preu amb AJAX | COMPLERT | admin endpoints stock/discount | Implementat per llibres. |
| Subcategories canvien de categoria amb AJAX | NO IMPLEMENTAT | - | No hi ha pantalla/endpoint d'aquesta operacio. |

### 3. Compra

| Requisit | Estat | Evidencia actual | Comentari |
|---|---|---|---|
| Carret i modificacio abans pagament | COMPLERT | cistella + checkout | Implementat. |
| Dades enviament/facturacio | COMPLERT | `Checkout/Create.jsx`, `StoreCheckoutRequest` | Implementat. |
| Dades targeta ficticies | COMPLERT | card number/expiry/cvv | Implementat. |
| Confirmacio comanda amb resum | COMPLERT | `Orders/Show.jsx` | Implementat. |
| Correu confirmacio amb resum | COMPLERT | `OrderConfirmationMail` + view | Implementat. |
| Factura PDF | COMPLERT | DomPDF + `orders.invoice` | Implementat. |
| PDF descarregable des de pagina confirmacio i des del correu | PARCIAL | disponible a `Orders/Show`; correu sense enllac directe explicit | Recomanat afegir URL directa o adjunt PDF al mail. |

### 4. Gestio comandes

| Requisit | Estat | Evidencia actual | Comentari |
|---|---|---|---|
| Historial de comandes usuari | COMPLERT | `OrderController@index`, `Orders/Index.jsx` | Implementat. |
| Detall comanda | COMPLERT | `OrderController@show`, `Orders/Show.jsx` | Implementat. |
| Relacions ORM usuaris-comandes-productes | COMPLERT | models `User`, `Order`, `OrderItem`, `Book` | Implementat. |

**Valoracio M7:** base i compra molt sòlides; bretxa clara a administracio completa de cataleg/usuaris/comandes.

---

## Sistema de valoracio de productes

| Requisit | Estat | Evidencia actual | Comentari |
|---|---|---|---|
| Registre de decisio a BD amb `has_to_comment` | COMPLERT | `order_items.has_to_comment`, actualitzacio en `sendOpinion` | Implementat. |
| Comprovacio AJAX en tornar a iniciar sessio | PARCIAL | comprovacio en fitxa producte, no trigger global al login | Hi ha comprovacio asíncrona, pero no flux global post-login. |
| Opcions fer comentari/no fer-lo/cancel·lar | PARCIAL | existeix enviar comentari; no hi ha flux explicit no/cancel postcompra | Caldria UI especifica de decisio postcompra. |
| Enviament comentaris via API REST en Java | NO IMPLEMENTAT | API Laravel | Desviacio tecnològica potencialment critica. |

---

## 2) Compliment de tecnologies requerides

| Tecnologia/condicio instruccions | Estat | Implementacio actual | Flexibilitat estimada |
|---|---|---|---|
| Laravel per ecommerce | COMPLERT | Laravel 12 | Normalment flexible (versio 11 vs 12). |
| Laravel Breeze | COMPLERT | Breeze instal·lat | Baixa flexibilitat (ja complert). |
| Inertia/React (no obligatori explicit, pero valid dins Laravel) | COMPLERT | Inertia + React | Flexible. |
| Canvas per grafica vendes | COMPLERT | Canvas natiu + logica classe | Baixa flexibilitat (ja complert). |
| API opinions segons SwaggerHub | COMPLERT | endpoints adaptats a contracte | Baixa flexibilitat (ja complert). |
| API REST en Java (M3 / sistema valoracio) | NO COMPLEIX | API implementada en Laravel | **Baixa flexibilitat si el professor ho interpreta literal**. |
| AJAX en accions admin | COMPLERT | stock/descompte via axios | Baixa flexibilitat (ja complert). |
| CRUD complet admin de cataleg/usuaris/comandes | NO COMPLEIX | parcial | Baixa flexibilitat si forma part de rubric M7. |

---

## 3) Punts pendents de definir al propi enunciat

Segons `docs/Instruccions_Projecte_Transversal_DAW2.md`, hi ha parts indicades com pendents o obertes:

- `M3 sendOpinion` i `M3 getRating` inicialment marcats com "pendent de definir" (ara ja s'han implementat segons Swagger final facilitat).
- Apartat "3. Avaluacio" del document d'instruccions marcat com pendent de definir.

Impacte: no es pot tancar una auditoria de nota exacta sense rubrica final del professorat.

---

## 4) Recomanacio de prioritzacio (que tocar si o si)

## Prioritat alta (probable "si o si")

1. **Confirmar exigencia de Java per API opinions**.
   - Si es obligatori literal: cal backend Java (com a minim per modul opinions).
2. **Implementar formulari de registre M6 avançat**.
3. **Implementar formulari consulta producte M6**.
4. **Completar CRUD admin M7** (categories, subcategories, productes, usuaris, estats de comanda).

## Prioritat mitjana

5. Forcar `verified` a tots els fluxos autenticats sensibles (checkout/comandes/opinions).
6. Afegir opcio explicita "no comentar/cancel·lar" postcompra amb registre de decisio.
7. Afegir enllac/adjunt de factura PDF al correu de confirmacio.

## Prioritat baixa

8. Paquet formal M9 (wireframes finals i guia visual en format lliurable).

---

## 5) Estat global actual

- **Funcionalment**: projecte molt avançat i usable de punta a punta.
- **Acadèmicament**: hi ha alguns requisits "nuclears" no tancats (sobretot M6 registre/consulta i M7 admin CRUD complet).
- **Tecnologicament**: principal risc es la interpretacio del requisit "API REST en Java".

Aquest document esta pensat per facilitar la decisio de quins punts es poden acceptar com a desviacio i quins s'han de tancar abans de lliurament final.
