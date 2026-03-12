# Market Manager Backend — Documentación de API

Base URL: `/api/market-manager`

Todas las rutas protegidas requieren header:
```
Authorization: Bearer <token>
```

---

## Auth

### POST `/auth/login`
Sin autenticación.

**Body:**
```json
{
    "name": "string",
    "password": "string"
}
```

**Respuesta exitosa `200`:**
```json
{
    "token": "jwt_token"
}
```

---

## Version

### GET `/version`
Requiere: `authMMJWT`

**Respuesta exitosa `200`:**
```json
{
    "productVersion": 0,
    "categoryVersion": 0,
    "imageVersion": 0,
    "userVersion": 0,
    "dailySummaryVersion": 0
}
```

---

## Users

### GET `/users`
Requiere: `authMMJWT`

| Query param | Tipo | Descripción |
|-------------|------|-------------|
| `all` | boolean | Si `true`, incluye usuarios inactivos |

**Respuesta exitosa `200`:** Array de usuarios (sin `password`).

---

### POST `/users`
Requiere: `authMMJWT` + `role: admin`

**Body:**
```json
{
    "name": "string",       // max 16 chars, solo letras/números/-/_
    "password": "string",   // max 16 chars, solo letras/números/-/_
    "role": "admin | cajero | encargado"
}
```

**Respuesta exitosa `201`:** Usuario creado (sin `password`).

---

### PUT `/users/:id`
Requiere: `authMMJWT` + `role: admin`

**Body:** Todos los campos son opcionales.
```json
{
    "name": "string",
    "password": "string",
    "role": "admin | cajero | encargado",
    "isActive": true
}
```

**Respuesta exitosa `200`:** Usuario actualizado (sin `password`).

---

### DELETE `/users/:id`
Requiere: `authMMJWT` + `role: admin`

Soft delete (`isActive: false`).

**Respuesta exitosa `200`:** Usuario actualizado.

---

## Categories

### GET `/categories`
Requiere: `authMMJWT`

| Query param | Tipo | Descripción |
|-------------|------|-------------|
| `all` | boolean | Si `true`, incluye categorías inactivas |

**Respuesta exitosa `200`:** Array de categorías.

---

### POST `/categories`
Requiere: `authMMJWT` + `role: admin | encargado`

**Body:**
```json
{
    "name": "string",           // max 32 chars
    "primary": "string",        // max 32 chars
    "subcategories": [
        {
            "name": "string",   // max 32 chars
            "brands": ["string"] // cada brand max 32 chars
        }
    ]
}
```

**Respuesta exitosa `201`:** Categoría creada.

---

### PUT `/categories/:id`
Requiere: `authMMJWT` + `role: admin | encargado`

**Body:** Todos los campos son opcionales.
```json
{
    "name": "string",
    "primary": "string",
    "subcategories": [...],
    "isActive": true
}
```

**Respuesta exitosa `200`:** Categoría actualizada.

---

### DELETE `/categories/:id`
Requiere: `authMMJWT` + `role: admin | encargado`

Soft delete (`isActive: false`).

**Respuesta exitosa `200`:** Categoría actualizada.

---

## Images

### GET `/images`
Requiere: `authMMJWT`

| Query param | Tipo | Descripción |
|-------------|------|-------------|
| `all` | boolean | Si `true`, incluye imágenes inactivas |

> El listado **no incluye** el campo `base64` para alivianar la respuesta.

**Respuesta exitosa `200`:** Array de imágenes (sin `base64`).

---

### GET `/images/:id`
Requiere: `authMMJWT`

**Respuesta exitosa `200`:** Imagen completa (incluye `base64`).

---

### POST `/images`
Requiere: `authMMJWT` + `role: admin | encargado`

**Body:**
```json
{
    "name": "string",   // max 32 chars
    "base64": "string"
}
```

**Respuesta exitosa `201`:** Imagen creada.

---

### PUT `/images/:id`
Requiere: `authMMJWT` + `role: admin | encargado`

**Body:** Todos los campos son opcionales.
```json
{
    "name": "string",
    "base64": "string",
    "isActive": true
}
```

**Respuesta exitosa `200`:** Imagen actualizada.

---

### DELETE `/images/:id`
Requiere: `authMMJWT` + `role: admin | encargado`

Soft delete (`isActive: false`).

**Respuesta exitosa `200`:** Imagen actualizada.

---

## Products

### GET `/products`
Sin autenticación.

| Query param | Tipo | Descripción |
|-------------|------|-------------|
| `all` | boolean | Si `true`, incluye productos inactivos |

**Respuesta exitosa `200`:** Array de productos.

---

### GET `/products/:id`
Requiere: `authMMJWT`

**Respuesta exitosa `200`:** Producto completo.

---

### POST `/products`
Requiere: `authMMJWT` + `role: admin | encargado`

**Body:**
```json
{
    "info": {
        "name": "string",                                               // max 64 chars
        "category": "string",                                           // max 32 chars
        "subcategory": "string",                                        // max 32 chars
        "brand": "string",                                              // max 32 chars
        "barcode": "string",                                            // max 32 chars
        "primary": "string",                                            // max 32 chars
        "size": 1,
        "sizeType": "kg | g | oz | cm3 | l | ml | u | cc",
        "price": 100,
        "unitType": "unit | weight",
        "imgId": "ObjectId | null"
    },
    "options": {
        "hasExpirationControl": false,
        "hasStockControl": false
    },
    "stock": {
        "currentStock": 0,
        "mediumStockAlert": 0,
        "lowStockAlert": 0,
        "veryLowStockAlert": 0
    },
    "expiration": {
        "alertExpiration": 0,
        "batches": [
            {
                "expirationDate": "2026-12-31",
                "quantity": 10
            }
        ]
    }
}
```

> `options`, `stock` y `expiration` son opcionales — tienen defaults en 0/false.

**Respuesta exitosa `201`:** Producto creado.

---

### PUT `/products/:id`
Requiere: `authMMJWT` + `role: admin | encargado`

**Body:** Todos los campos son opcionales. Si cambia `info.price`, se agrega automáticamente una entrada a `extrainfo.priceHistory`.

---

### PUT `/products/:id/stock`
Requiere: `authMMJWT`

Enviar **uno** de los dos campos:

```json
{ "newStock": 50 }
```
> Reemplaza `currentStock` con el valor indicado.

```json
{ "subtractStock": 5 }
```
> Resta al `currentStock` actual. Mínimo resultante: `0`.

**Respuesta exitosa `200`:** Producto actualizado.

---

### PUT `/products/:id/expiration`
Requiere: `authMMJWT`

```json
{ "subtractQuantity": 3 }
```

> Resta al batch con `expirationDate` más viejo. Si el batch llega a 0, se elimina y continúa restando al siguiente. Si se agotan todos los batches, `batches` queda `[]` sin error.

**Respuesta exitosa `200`:** Producto actualizado.

---

### DELETE `/products/:id`
Requiere: `authMMJWT` + `role: admin | encargado`

Soft delete (`options.isActive: false`).

**Respuesta exitosa `200`:** Producto actualizado.

---

## Daily Summary

### GET `/daily-summary`
Requiere: `authMMJWT`

| Query param | Tipo | Descripción |
|-------------|------|-------------|
| `date` | string | Día específico: `2026-03-10` |
| `from` | string | Inicio del período: `2026-03-01` |
| `to` | string | Fin del período: `2026-03-10` |
| `lite` | boolean | Si `true`, excluye el array `products` de la respuesta |

Se debe pasar `?date=` **o** `?from=&to=`. Si no se pasa ninguno: `400`.

**Respuesta exitosa `200`:** Resumen(es) del día.

---

### POST `/daily-summary`
Requiere: `authMMJWT`

**Body:**
```json
{
    "date": "2026-03-10",
    "totalTickets": 50,
    "totalAmount": 15000,
    "methodPayment": {
        "cash": 8000,
        "debit": 5000,
        "qr": 2000
    },
    "morning": {
        "totalTickets": 30,
        "totalAmount": 9000,
        "methodPayment": { "cash": 5000, "debit": 4000 }
    },
    "night": {
        "totalTickets": 20,
        "totalAmount": 6000,
        "methodPayment": { "cash": 3000, "qr": 3000 }
    },
    "products": [
        {
            "productId": "ObjectId",
            "name": "leche entera",
            "quantitySold": 10,
            "totalAmount": 1500
        }
    ]
}
```

> Si ya existe un resumen para esa fecha: `409`.

**Respuesta exitosa `201`:** Resumen creado.

---

## Códigos de error comunes

| Código | Descripción |
|--------|-------------|
| `400` | Body inválido o parámetros faltantes |
| `401` | Token ausente o inválido |
| `403` | Sin permisos para ese rol |
| `404` | Recurso no encontrado |
| `409` | Conflicto (ej: ya existe un resumen para esa fecha) |
