# Market Manager Backend — Plan

## Contexto general

- Módulo que vive dentro de `server-general-api` en `src/market-manager-backend/`
- Stack: Express + TypeScript + Mongoose (mismo que el resto del server)
- Las rutas se registran en `app.ts` via un `index.ts` propio de este módulo
- **No comparte JWT ni middleware de auth con el resto de `server-general-api`**
- Variable de entorno `MM_JWT_SECRET` en `.env` (separada de `JWT_SECRET`)
- Ver modelos detallados en `MODELS.md`

---

## Estructura de carpetas

```
src/market-manager-backend/
├── MODELS.md
├── PLAN.md
├── index.ts                          — agrupa todas las rutas para app.ts
├── middlewares/
│   ├── authMMJWT.ts
│   └── requireRole.ts         **
├── auth/
│   ├── auth.routes.ts
│   └── controllers/
│       └── login.ts
├── users/
│   ├── mmUser.model.ts
│   ├── mmUser.routes.ts
│   └── controllers/
│       ├── getUsers.ts
│       ├── createUser.ts
│       ├── updateUser.ts
│       ├── deleteUser.ts
│       └── index.ts
├── category/
│   ├── category.model.ts
│   ├── category.routes.ts
│   └── controllers/
│       ├── getCategories.ts
│       ├── createCategory.ts
│       ├── updateCategory.ts
│       ├── deleteCategory.ts
│       └── index.ts
├── image/
│   ├── image.model.ts
│   ├── image.routes.ts
│   └── controllers/
│       ├── getImages.ts
│       ├── getImage.ts
│       ├── createImage.ts
│       ├── updateImage.ts
│       ├── deleteImage.ts
│       └── index.ts
├── product/
│   ├── product.model.ts
│   ├── product.routes.ts
│   └── controllers/
│       ├── getProducts.ts
│       ├── createProduct.ts
│       ├── updateProduct.ts
│       ├── updateProductStock.ts      ******
│       ├── updateProductExpiration.ts ******
│       ├── deleteProduct.ts
│       └── index.ts
├── version/                           *******
│   ├── version.model.ts
│   ├── version.routes.ts
│   └── controllers/
│       └── getVersion.ts
└── daily-summary/                     ********
    ├── dailySummary.model.ts
    ├── dailySummary.routes.ts
    └── controllers/
        ├── getDailySummary.ts
        ├── createDailySummary.ts
        └── index.ts
```

---

## Modelos

### MMVersion *******
- `productVersion`: number (default: 0)
- `categoryVersion`: number (default: 0)
- `imageVersion`: number (default: 0)
- `userVersion`: number (default: 0)
- `dailySummaryVersion`: number (default: 0) ********
- Un único documento en la colección — se incrementa en +1 en cada POST, PUT o DELETE de la API correspondiente

### DailySummary ********
- `date`: string (`"2026-03-10"`) — único por día
- `totalTickets`: number
- `totalAmount`: number
- `methodPayment`: object flexible (`{ cash, debit, qr, ... }`) — Map en Mongoose
- `morning`: `{ totalTickets, totalAmount, methodPayment }` — turno mañana
- `night`: `{ totalTickets, totalAmount, methodPayment }` — turno tarde/noche
- `products`: `[{ productId, name, quantitySold, totalAmount }]`
- `timestamps`

### MMUser
- `name`: string
- `password`: string
- `role`: `"admin"` | `"cajero"` | `"encargado"`
- `isActive`: boolean (default: true)
- `timestamps`

### Category
- `name`: string
- `primary`: string libre (`"lacteos"`, `"almacen"`, `"perfumeria"`, etc.) ***
- `subcategories`: `[{ name: string, brands: string[] }]`
- `isActive`: boolean (default: true)
- `timestamps`

### Image
- `name`: string
- `base64`: string
- `isActive`: boolean (default: true)
- `timestamps`

### Product
- `options`: `{ hasExpirationControl, hasStockControl, isActive }`
- `info`: `{ name, category (string libre), subcategory (string libre), brand, barcode, size, sizeType, price, unitType, imgId (ref Image._id) ****, primary }`
- `extrainfo`: `{ priceHistory: [{ date, price }], associatedProduct }` — el servidor agrega a priceHistory automáticamente cuando cambia price ****
- `expiration`: `{ batches: [{ expirationDate, quantity, addedAt }], alertExpiration }`
- `stock`: `{ currentStock, mediumStockAlert, lowStockAlert, veryLowStockAlert }`
- `timestamps`

---

## Endpoints

### Auth (sin JWT)
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/market-manager/auth/login` | Login, devuelve JWT (expira en 24h) * |

### Users
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/market-manager/users` | `authMMJWT` | Listar usuarios (`?all=true` incluye inactivos) * |
| POST | `/api/market-manager/users` | `authMMJWT` + `requireRole("admin")` ** | Crear usuario * |
| PUT | `/api/market-manager/users/:id` | `authMMJWT` + `requireRole("admin")` ** | Editar usuario * |
| DELETE | `/api/market-manager/users/:id` | `authMMJWT` + `requireRole("admin")` ** | Soft delete * |

### Categories
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/market-manager/categories` | `authMMJWT` | Listar todas las categorías (`?all=true` incluye inactivos) * *** |
| POST | `/api/market-manager/categories` | `authMMJWT` + `requireRole("admin", "encargado")` *** | Crear categoría |
| PUT | `/api/market-manager/categories/:id` | `authMMJWT` + `requireRole("admin", "encargado")` *** | Editar categoría |
| DELETE | `/api/market-manager/categories/:id` | `authMMJWT` + `requireRole("admin", "encargado")` *** | Soft delete |

### Images (`authMMJWT`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/market-manager/images` | Listar imágenes (`?all=true` incluye inactivos) * |
| GET | `/api/market-manager/images/:id` | Obtener imagen |
| POST | `/api/market-manager/images` | Crear imagen |
| PUT | `/api/market-manager/images/:id` | Editar imagen |
| DELETE | `/api/market-manager/images/:id` | Soft delete |

### Products
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/market-manager/products` | Sin JWT | Listar todos los productos (`?all=true` incluye inactivos) * **** |
| POST | `/api/market-manager/products` | `authMMJWT` + `requireRole("admin", "encargado")` *** | Crear producto |
| PUT | `/api/market-manager/products/:id` | `authMMJWT` + `requireRole("admin", "encargado")` *** | Editar producto general (incluye stock y expiration) **** |
| PUT | `/api/market-manager/products/:id/stock` | `authMMJWT` | Actualizar stock — body: `{ newStock }` o `{ subtractStock }` ****** |
| PUT | `/api/market-manager/products/:id/expiration` | `authMMJWT` | Restar cantidad al batch más viejo — body: `{ subtractQuantity }` ****** |
| DELETE | `/api/market-manager/products/:id` | `authMMJWT` + `requireRole("admin", "encargado")` *** | Soft delete |

### Version *******
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/market-manager/version` | `authMMJWT` | Consultar versiones actuales de todas las entidades |

### Daily Summary ********
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/market-manager/daily-summary` | `authMMJWT` | Subir resumen del día (incrementa `dailySummaryVersion`) |
| GET | `/api/market-manager/daily-summary?date=2026-03-10` | `authMMJWT` | Consultar por día específico |
| GET | `/api/market-manager/daily-summary?from=2026-03-01&to=2026-03-10` | `authMMJWT` | Consultar por periodo |

---

## Lógica de negocio destacada

### Stock (`PUT /products/:id/stock`) ******
- `{ newStock: number }` → reemplaza `currentStock`
- `{ subtractStock: number }` → resta al `currentStock` actual

### Expiration (`PUT /products/:id/expiration`) ******
- `{ subtractQuantity: number }` → resta al batch con `expirationDate` más viejo
- Si el batch llega a 0 o menos, se elimina y continúa restando al siguiente
- Si se agotan todos los batches, `batches` queda `[]` sin error

### Versioning (`MMVersion`) *******
- Cada POST, PUT o DELETE exitoso en users, categories, images o products incrementa en +1 el campo correspondiente del único documento `MMVersion`
- El frontend consulta `GET /version` al iniciar la app para comparar con su versión local y saber si debe sincronizar
- También lo consulta periódicamente mientras la app está abierta para detectar cambios en tiempo real

---

## Middlewares

- `authMMJWT`: verifica Bearer token firmado exclusivamente con MMUser — independiente del `authJWT` existente.
- `requireRole(...roles)`: verifica que el user del token tenga uno de los roles requeridos. Uso: `requireRole("admin")`, `requireRole("admin", "encargado")`. **

---

## Integración con app.ts *****

- Un archivo `index.ts` dentro de `market-manager-backend/` agrupa todas las rutas y se importa una sola vez en `app.ts`.
- Variable de entorno `MM_JWT_SECRET` separada del `JWT_SECRET` existente (ya creada en `.env`).
- Responses sin formato estándar — consistente con el resto del backend (solo status codes + objeto directo).

---

## Orden de implementación *****

Trabajar **api por api**, verificando que cada una funcione correctamente antes de pasar a la siguiente:

1. Middlewares (`authMMJWT`, `requireRole`)
2. Version (`/version`) — model + endpoint GET (debe existir antes que el resto) *******
3. Auth (`/auth/login`)
4. Users (`/users`)
5. Category (`/categories`)
6. Image (`/images`)
7. Product (`/products`) — incluyendo endpoints de stock y expiration
8. Daily Summary (`/daily-summary`) ********
