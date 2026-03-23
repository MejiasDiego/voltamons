# Checkout comandes factura pdf

## Context
Implementacio del flux de compra complet: checkout, creacio de comanda, historial i factura PDF.

## Requisits coberts
- M7 - Proces de compra i confirmacio.
- M7 - Dades d'enviament i facturacio.
- M7 - Camp fictici de targeta de credit.
- M7 - Historial de comandes.
- M7 - Generacio i descarrega de factura en PDF.
- M7 - Correu de confirmacio de compra.

## Historial de versions

### 2026-03-23 - v1
- Instal·lat `barryvdh/laravel-dompdf`.
- Creats models i migracions:
  - `Order`
  - `OrderItem`
- Creat `CheckoutController` amb:
  - formulari checkout
  - validacio via `StoreCheckoutRequest`
  - creacio transaccional de comanda
  - decrement d'estoc
  - enviament de correu de confirmacio
  - generacio de factura PDF
- Creat `OrderController` amb historial i detall.
- Afegides rutes:
  - `/checkout`
  - `/comandes`
  - `/comandes/{order}`
  - `/comandes/{order}/factura`
- Creates vistes frontend:
  - `Checkout/Create`
  - `Orders/Index`
  - `Orders/Show`
- Creats templates servidor:
  - `resources/views/emails/orders/confirmation.blade.php`
  - `resources/views/pdf/invoice.blade.php`

## Decisions tecniques
- L'ordre es crea dins transaccio i bloqueig de llibres per evitar inconsistencies d'estoc.
- Snapshot de dades de llibre a `order_items` per mantenir historics coherents.
- Costos calculats al backend (`subtotal`, `iva`, `enviament`, `total`).

## Proves i validacions
- Validacio prevista: compra completa amb usuari autenticat.
- Validacio prevista: correu de confirmacio enviat.
- Validacio prevista: descarrega de factura PDF.

## Pendents
- Gestio d'estat de comandes per admin (en proces, enviat, etc.).
- Integracio d'opcions de comentari postcompra (bloc de valoracions).
