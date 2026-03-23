# Base domini - rols

## Context
Implementacio de la base de rols per complir els requisits d'autenticacio i permisos del modul M7.

## Requisits coberts
- M7 - Gestio de rols d'usuaris: `admin` i `client`.
- M7 - Assignacio automatica del rol client al registre.
- M7 - Seguretat i permisos amb middleware de rols.

## Historial de versions

### 2026-03-23 - v1
- Creat model `Role` amb relacio `users`.
- Afegida migracio `roles` i migracio per `users.role_id`.
- Creat `RoleSeeder` amb rols base `admin` i `client`.
- Actualitzat `User` per incloure `role_id`, relacio `role`, i helpers `isAdmin()`/`isClient()`.
- Actualitzat `RegisteredUserController` per assignar el rol client en registre.
- Creat middleware `EnsureUserRole` i alias `role` a `bootstrap/app.php`.
- Compartit el rol de l'usuari a Inertia (`auth.user.role`) des de `HandleInertiaRequests`.

## Decisions tecniques
- S'ha utilitzat taula `roles` (en lloc d'enum a `users`) per facilitar escalat futur.
- `users.role_id` s'ha deixat nullable a nivell d'esquema per compatibilitat i transicions de dades.

## Proves i validacions
- Validacio funcional prevista en bloc: registre d'usuari nou amb rol `client`.
- Validacio funcional prevista en bloc: accedir a rutes `admin` amb control de middleware.

## Pendents
- Endurir la integritat de `users.role_id` a no nullable quan el flux estigui totalment estabilitzat.
