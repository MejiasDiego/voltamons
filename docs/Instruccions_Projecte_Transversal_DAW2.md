# Projecte Transversal DAW2 — Tenda Online

## Índex

- [Introducció](#introducció)
- [M9 - Interfície Web](#m9---interfície-web)
- [M6 - Entorn Client](#m6---entorn-client)
- [M3 - API Rest Opinions](#m3---api-rest-opinions)
- [M7 - Laravel](#m7---laravel)
- [Sistema de Valoració de Productes](#sistema-de-valoració-de-productes)

---

## M9 - Interfície Web

### Enunciat

Per començar el projecte, primer haurem de definir l'esborrany i crear la guia d'estils.

### 1. Defineix i especifica l'activitat de la teva empresa

**a)** Marca comercial, nom, eslògan i la informació que sigui necessària per començar: a què es dedica el negoci i quines perspectives de futur tens, mercat nacional, expansió, internacional...

### 2. Guia d'estils i imatge corporativa

Podeu fer servir programes d'intel·ligència artificial que creen imatges corporatives.

**a)** Paleta de colors. Com ja has vist a la teoria, escollir els colors pel nou lloc web és una tasca tan important com escollir el nom o el domini.

**c)** Tipografia.

### 3. Estructura del lloc web

Fes servir un editor del tipus MockFlow o qualsevol tipus d'eina. Has de tenir en compte que serà un lloc responsive, caldrà que dissenyis per diferents tipus de dispositius (ordinadors, tauletes, mòbils).

### 4. Exposició breu del projecte a classe

---

## M6 - Entorn Client

### 1. Descripció de les funcionalitats a desenvolupar

Partint cadascú del disseny d'una web amb lliure elecció i temàtica, les funcionalitats sol·licitades s'han de fer encaixar al vostre disseny i per tant pot requerir de canvis en la interfície i també amb un replantejament de les funcionalitats (a consultar amb el professor).

En primer lloc s'han de distingir dos perfils d'usuari: el d'**administrador (botiguer)** i el del **client**, aquests dos tindran interfícies distintes i funcionalitats distintes.

---

#### Funcionalitats per al client

**1. Cistella de compra sense registre**

El client tindrà l'opció de navegar per la web i emmagatzemar els productes en els quals està interessat a la cistella de compra sense necessitat d'estar loguejat o registrat, i aquests s'han de mantenir per si accedeix posteriorment i decideix comprar.

Aquesta cistella ha de permetre:
- Modificar la quantitat d'elements inserits.
- Eliminar algun producte que ja no volem.
- Mostrar en tot moment el preu total per producte i el total de la cistella.

**2. Formulari de registre**

Per registrar-se a la web el client ha d'emplenar un formulari que compleixi les següents característiques:

- **Nom i cognoms:** Mínim 1 nom i cognom, màxim 2 noms i dos cognoms. Sense números ni caràcters especials. Independentment del que introdueixi l'usuari, la primera lletra de cada nom o cognom es passarà a majúscula.
- **Data de naixement** (DD/MM/YYYY): Es validarà que és major de 18 anys i menor a 100.
- **Número de telèfon** amb el codi internacional corresponent.
- **Direcció d'enviament** amb un patró vàlid.
- **Direcció de facturació:** Normalment coincideix amb la d'enviament, per tant de forma automàtica donarem l'opció de reutilitzar la d'enviament millorant l'experiència d'usuari.
- **Dos camps extra** que tinguin sentit amb la temàtica de la web.
- **Direcció de correu electrònic.**
- **Contrasenya** (s'inserirà dues vegades i es validarà la coincidència).
- **Fortalesa de la contrasenya:** S'ha d'indicar a l'usuari en quin nivell es troba i només s'acceptarà si és de nivell mitjà o fort (pot ser interessant utilitzar l'etiqueta `<meter>`).

> Ha de ser **user friendly**. Els quadres de text han de canviar de color al fer focus i blur. S'ha de controlar l'enviament en cas d'error, indicant amb estils quan els camps compleixen els requeriments i quan no.

**3. Formulari de consulta sobre producte**

Hi haurà un formulari d'enviament de consulta sobre producte. Aquest pot ser utilitzat sense necessitat d'estar loguejat. S'ha de tenir una versió idèntica però en cas d'estar amb sessió iniciada, no requerir els camps d'identificació.

Camps del formulari:
- Nom i cognoms.
- Mail.
- Camp per introduir el nom, referència o qualsevol indicador del producte (ha d'existir per poder fer l'enviament).
- Text-area amb un límit de 150 caràcters per introduir la consulta.
- El botó d'enviament **només es farà visible** en cas que tota la informació estigui emplenada i correcta.
- Es simularà l'enviament amb un **spinner**.

**4. Valoració de productes amb estrelles i comentaris**

De tots els productes hi haurà disponible una valoració amb estrelles i comentaris (similar a Amazon).

L'API Rest que retornarà la informació necessària es pot consultar a: [https://app.swaggerhub.com/apis/MPALAU2/getOpinions/1.1.0](https://app.swaggerhub.com/apis/MPALAU2/getOpinions/1.1.0)

**5. Detall de producte**

Dels productes o serveis a la pàgina es mostrarà la informació més rellevant (títol, preu, estrelles, etc.). S'ha d'aplicar una funcionalitat per mostrar més detall en una finestra o pestanya nova on el client podrà observar més detall del producte **sense necessitat de recarregar la pàgina** (asíncron).

---

#### Funcionalitats del administrador (botiguer)

**1. Llistat d'estoc de productes**

Es desitja poder veure un llistat amb l'estoc dels productes disponibles. Cada producte tindrà X propietats o característiques i són obligades el **preu** i l'**estoc**. Al llistat només es mostrarà la informació més rellevant (exemple: identificació del producte i l'estoc).

**2. Control de vendes**

El botiguer tindrà informació sobre quantes còpies ha venut de cada producte. Quan es realitza una compra apareixerà al document HTML junt amb el nombre d'exemplars venuts, i es decrementarà l'estoc del producte.

**3. Ordenació i gestió d'estoc esgotat**

S'ha de poder ordenar el llistat de productes segons la quantitat d'estoc disponible. Quan un producte es quedi sense estoc:
- No es mostrarà al llistat del client, o quedarà perfectament indicat com a no disponible temporalment.
- El botiguer ha de poder veure de forma clara quins productes estan esgotats per poder demanar més exemplars als proveïdors.

**4. Descomptes globals**

Per a setmanes com Black Friday, època nadalenca, etc., el botiguer podrà fer un descompte a tots els seus productes. S'ha de crear un mètode per poder modificar el preu dels productes.

**5. Gràfic de vendes**

Es vol mostrar un **gràfic de barres amb canvas** que mostri la quantitat de vendes de cada producte.

---

### Requisits genèrics i valorables

- Usabilitat de la interfície i facilitat d'interacció amb l'usuari.
- Separació i estructura dels fitxers.
- Comentaris de codi seguint criteris vistos a classe.
- Bones pràctiques vistes a classe: organització de variables, eficiència del codi, crides a funcions, listeners, etc.

---

### 2. Documentació

A la finalització del projecte s'ha de lliurar la següent documentació:

**A nivell funcional:** Es detalla el contingut de la web i les funcionalitats que aporta com a usuaris (tant botiguer com comprador), els objectius, el disseny de la interfície i l'organització dels elements, amb ajuda de captures de pantalla i indicacions per demostrar-ho. Per exemple, si s'utilitzen menús desplegables, mostrar les seves opcions i funcionament.

**A nivell tècnic:** Es detalla com s'ha desenvolupat el codi, com s'estan tractant les dades i quines decisions tècniques s'han pres per desenvolupar les diferents funcionalitats. Es poden posar fragments de codi, imatges i qualsevol recurs necessari. Alguns exemples:

- Com s'emmagatzemen els productes: arrays de arrays, arrays d'objectes, el local storage, etc.
- Si s'han utilitzat arrays paral·lels, explicar en què es basen, el seu funcionament i per què s'utilitzen.
- Si s'utilitza indexDB, com es vincula amb back-end.
- Si s'han creat mètodes propis d'un objecte, detallar per a què serveixen i com funcionen.

> **Test d'errors:** Dintre de la part tècnica s'ha de fer un apartat sobre el test d'errors realitzat per comprovar el correcte funcionament del programa. Bàsicament un llistat amb totes les proves realitzades per trobar possibles errors o defectes, adjuntant imatges amb les evidències d'aquestes proves.

### 3. Avaluació

*(Contingut pendent de definir al document original.)*

---

## M3 - API Rest Opinions

### Descripció de la funcionalitat

Es crearà una API Rest que permetrà inserir i recuperar les opinions dels usuaris sobre els productes de la pàgina web. Aquesta API tindrà diversos endpoints documentats al swagger del següent enllaç.

### Descripció tècnica

```
// Endpoints a definir:
getOpinions   - Obté opinions d'un determinat producte (Definit a Swagger)
sendOpinion   - Insereix opinions d'un determinat producte (Pendent de definir)
getRating     - Obté determinat nombre de productes ordenats per la seva valoració (Pendent de definir)

// També es pot filtrar per data de valoració.
```

---

## M7 - Laravel

### Enunciat

El projecte té com a objectiu desenvolupar una aplicació web de comerç electrònic utilitzant el framework **Laravel** i el disseny de la tenda realitzada a M09. L'aplicació permetrà als usuaris realitzar compres de productes de manera intuïtiva i segura, brindant una experiència de compra en línia eficient.

### Requisits Funcionals

#### 1. Autenticació d'Usuaris

**Registre i autenticació d'usuaris:**
- Implementar el registre i l'autenticació d'usuaris utilitzant **Laravel Breeze**.
- Permetre als usuaris registrar-se com a clients de la tenda de productes.
- Implementar la **validació per correu electrònic** per assegurar que els usuaris verifiquin la seva adreça de correu abans de poder accedir al sistema.

**Gestió de rols d'usuaris:**
- Crear dos rols principals: **administrador** i **client**.
- Assignar el rol d'administrador manualment a través de la base de dades o una interfície d'administració.
- Assignar el rol de client automàticament a tots els usuaris que es registrin a través del formulari de registre.

**Funcionalitats específiques per a cada rol:**

*Administrador:*
- Accés a un panell d'administració per gestionar categories, subcategories i productes.
- Capacitat per veure, editar i eliminar qualsevol usuari registrat.
- Capacitat per gestionar totes les comandes realitzades, incloent la visualització, actualització de l'estat i eliminació de comandes.

*Client:*
- Accés a la tenda de productes per veure i comprar productes.
- Capacitat per veure i editar el seu propi perfil.
- Accés a l'historial de comandes per veure les seves compres anteriors i l'estat actual de les seves comandes.

**Accés per a usuaris no registrats:**
- Poden veure la pàgina principal de la tenda.
- Poden navegar per les categories i subcategories de productes.
- Poden veure la llista de productes disponibles amb informació bàsica (nom, preu, imatge).
- No poden realitzar compres fins que es registrin i iniciïn sessió.

**Seguretat i permisos:**
- Implementar **middleware** per assegurar que només els administradors puguin accedir a les funcionalitats d'administració.
- Assegurar que els clients només puguin accedir a les funcionalitats de la tenda i al seu propi perfil.

---

#### 2. Catàleg de Productes

**Administració de categories i subcategories de productes:**
- Crear, editar i eliminar categories.
- Crear, editar i eliminar subcategories associades a categories específiques.
- Establir relacions entre categories i subcategories utilitzant l'ORM de Laravel (**Eloquent: Relationships**).

**Gestió de productes:**
- Afegir nous productes amb informació detallada: nom, descripció, preu i quantitat en estoc.
- Editar la informació dels productes existents.
- Eliminar productes del sistema.
- Associar productes a categories i subcategories corresponents utilitzant l'ORM de Laravel.

**Especificacions addicionals:**
- Hi ha d'haver taules per llistar els productes, categories i subcategories.
- Les accions com augmentar l'estoc, eliminar o actualitzar un preu s'han de fer mitjançant **AJAX**.
- Les subcategories poden canviar de categories mitjançant un selector amb AJAX.

---

#### 3. Compra

**Procés de Compra:**
- Permetre als clients afegir productes al carret de compra.
- Permetre als clients revisar i modificar el contingut del carret de compra abans de procedir al pagament.
- Implementar un procés de pagament on els clients puguin introduir la seva informació de pagament.

**Dades d'enviament i facturació:**

Durant el procés de pagament, recollir les dades d'enviament del client:
- Nom complet.
- Adreça d'enviament.
- Ciutat, província i codi postal.
- Número de telèfon de contacte.

Recollir també les dades de facturació (poden ser les mateixes que les d'enviament o diferents).

**Camp fictici de targeta de crèdit:**
- Número de targeta de crèdit.
- Data de caducitat.
- Codi de seguretat (CVV).

**Confirmació de l'ordre de compra:**

Després de completar el pagament, mostrar una pàgina de confirmació amb un resum detallat que inclogui:
- Nom dels productes comprats.
- Quantitat de cada producte.
- Preu unitari i total de cada producte.
- Total de la compra, incloent impostos i despeses d'enviament, si s'escau.

Enviar un **correu electrònic de confirmació** al client amb el mateix resum detallat.

**Generació de factura en PDF:**
- Generar una factura en format PDF per a cada compra realitzada.
- La factura ha d'incloure tota la informació detallada de la compra, així com les dades del client i de la tenda.
- Permetre als clients descarregar la factura en PDF des de la pàgina de confirmació i des del correu electrònic de confirmació.

---

#### 4. Gestió de Comandes

Permetre als usuaris registrats accedir a un **historial de comandes** amb informació detallada de cada comanda:
- Data de la comanda.
- Productes comprats.
- Quantitat de cada producte.
- Preu total de la comanda.

**Relacions ORM:**

Implementar relacions ORM entre els models implicats en la gestió de comandes (usuaris, comandes i productes) per assegurar una integració adequada de les dades.

---

## Sistema de Valoració de Productes

### Enunciat

Implementar un sistema que permeti als usuaris fer comentaris o valoracions sobre els productes que compren. Els usuaris tindran l'opció de fer el comentari, no fer-lo o cancel·lar l'opció. La informació s'haurà de registrar a la base de dades i, quan l'usuari torni a iniciar sessió, es farà una comprovació mitjançant una crida **AJAX** per determinar si és necessari fer el comentari.

### Requisits

**Compra de producte:**
- Cada vegada que un usuari compri un producte, se li mostrarà una opció per fer un comentari o valoració del producte.
- Les opcions disponibles seran: fer el comentari, no fer-lo o cancel·lar l'opció.

**Registre a la base de dades:**
- La decisió de l'usuari s'haurà de registrar a la base de dades.
- Utilitzar un camp booleà `has_to_comment` a la taula intermitja entre comandes i productes per veure si s'ha de fer el recordatori.

**Comprovació mitjançant AJAX:**
- Quan l'usuari torni a iniciar sessió, es farà una crida AJAX per comprovar el flag que indica si és necessari fer el comentari.
- Si el flag indica que l'usuari ha de fer el comentari, se li mostrarà una notificació o un recordatori.

### Implementació

**Frontend:**
- Crear una interfície d'usuari que mostri les opcions de comentari després de la compra del producte.
- Implementar la crida AJAX per comprovar el flag quan l'usuari iniciï sessió, i si cal, mostrar el formulari per realitzar el comentari.
- Mitjançant l'**API REST en Java** es gestionarà l'enviament dels comentaris.
