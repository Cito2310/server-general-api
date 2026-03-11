# Market Manager Backend — Modelos

## Category

```ts
{
    name: string            // nombre de la categoría
    primary: string         // categoría primaria: "lacteos", "almacen", "perfumeria", etc.
    subcategories: [
        {
            name: string    // nombre de la subcategoría
            brands: string[] // marcas asociadas
        }
    ]
    isActive: boolean       // soft delete (default: true)
    createdAt: Date         // auto (timestamps)
    updatedAt: Date         // auto (timestamps)
}
```

---

## Image

```ts
{
    name: string            // nombre del archivo
    base64: string          // imagen en base64 (procesada en el frontend)
    isActive: boolean       // soft delete (default: true)
    createdAt: Date         // auto (timestamps)
    updatedAt: Date         // auto (timestamps)
}
```

---

## Product

```ts
{
    options: {
        hasExpirationControl: boolean   // controla si maneja vencimientos (default: false)
        hasStockControl: boolean        // controla si maneja stock (default: false)
        isActive: boolean               // soft delete (default: true)
    }

    info: {
        name: string                    // nombre del producto (lowercase)
        category: string                // referencia a Category.name (lowercase)
        subcategory: string             // referencia a subcategory.name (lowercase)
        brand: string                   // marca (lowercase)
        barcode: string                 // código de barras (lowercase)
        size: number                    // tamaño/cantidad
        sizeType: "kg" | "g" | "oz" | "cm3" | "l" | "ml" | "u" | "cc"
        price: number                   // precio actual
        unitType: "unit" | "weight"     // tipo de unidad de venta
        imgId: string | null            // referencia a Image._id (default: null)
        primary: string                 // categoría primaria (lowercase)
    }

    extrainfo: {
        priceHistory: [
            {
                date: Date
                price: number
            }
        ]
        associatedProduct: string | null // producto asociado (default: null, lowercase)
    }

    expiration: {
        batches: [
            {
                expirationDate: string  // fecha de vencimiento (lowercase)
                quantity: number
                addedAt: Date
            }
        ]
        alertExpiration: number         // días de anticipación para alerta
    }

    stock: {
        currentStock: number
        mediumStockAlert: number
        lowStockAlert: number
        veryLowStockAlert: number
    }

    createdAt: Date                     // auto (timestamps)
    updatedAt: Date                     // auto (timestamps)
}
```
