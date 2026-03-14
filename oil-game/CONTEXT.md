# Proyecto: oil-game
Ruta: `c:\Users\cito2\OneDrive\Desktop\Proyectos - Claude\oil-game`

## Stack
- Vite + React + TypeScript + TailwindCSS (`@tailwindcss/vite`)
- Canvas API (sin librería de juego)
- React Router DOM (ruta única `/game`)

## Concepto del juego
Juego de exploración y extracción de petróleo. El jugador excava el subsuelo triangulado para descubrir bolsas de petróleo, coloca torres de perforación en la superficie y conecta tuberías para extraer el recurso.

## Estructura de archivos
```
src/game/
├── game.types.ts            # Point, Triangle, OilBag, Derrick, Pipe, GameGrid, GameMode
├── GamePage.tsx             # estado global del juego (mode, derricks, pipes)
├── systems/
│   ├── gridGeneration.ts    # genera la grilla triangulada del subsuelo
│   └── oilGeneration.ts     # genera bolsas de petróleo convexas (independientes del grid)
├── canvas/
│   ├── drawGrid.ts          # dibuja superficie plana + triángulos del subsuelo
│   ├── drawOil.ts           # dibuja polígonos de bolsas de petróleo
│   ├── drawStructures.ts    # dibuja torres (derricks) en la superficie
│   └── drawPipes.ts         # dibuja tuberías + preview punteado
├── components/
│   └── GameCanvas.tsx       # canvas principal, maneja todos los modos de interacción
├── hooks/
│   └── useGrid.ts           # genera grid + oilBags al iniciar
└── utils/
    └── geometry.ts          # isPointInTriangle, segmentsIntersect, triangleIntersectsSegment, etc.
```

## Tipos principales (game.types.ts)
```typescript
Point, Triangle (id, vertices, centroid, row, col, subIndex)
OilBag (id, polygon: Point[], totalOil, remainingOil)
Derrick (id, x)   // boca siempre en surfaceBoundaryY
Pipe (id, from: Point, to: Point)
GameGrid (triangles, oilBags, width, height, surfaceBoundaryY)
GameMode = 'dig' | 'place-derrick' | 'place-pipe' | null
```

## Decisiones arquitectónicas clave
- **Grid es solo visual**: la grilla de triángulos oculta el subsuelo. Las bolsas de petróleo son polígonos convexos independientes generados por separado.
- **Render order**: clearRect → drawOil → drawGrid (con removedIds) → drawPipes → drawDerricks
- **Estado del jugador en GamePage**: `derricks[]`, `pipes[]`, `mode`. El `removedIds: Set<number>` vive en GameCanvas (interno).
- **Superficie plana**: `surfaceBoundaryY = height * SURFACE_RATIO (0.2)`. No hay grilla en superficie, es un rectángulo plano.
- **Boca de la torre**: siempre en `{ x: derrick.x, y: surfaceBoundaryY }`.

## Modos de interacción (GameCanvas)
- `dig`: click en triángulo → se agrega a `removedIds`
- `place-derrick`: click en superficie (`y < surfaceBoundaryY`) → coloca torre
- `place-pipe`:
  - Primer click: snappea a boca de torre o extremo de tubería (SNAP_RADIUS = 12px)
  - Segundo click: debe estar en subsuelo (`y > surfaceBoundaryY`), no puede cruzar tuberías existentes
  - Al confirmar: remueve automáticamente todos los triángulos que el segmento atraviesa (`triangleIntersectsSegment`)

## Reglas de tuberías
- Solo terminan en el subsuelo (no en superficie)
- Origen: boca de torre O extremo de tubería existente
- No pueden cruzarse entre sí (`segmentsIntersect`)
- Al colocarse, excavan automáticamente los triángulos que atraviesan

## Constantes importantes
- `GRID_COLS=50, GRID_ROWS=30, SURFACE_RATIO=0.2, JITTER=0.5, MIN_AREA_RATIO=0.3`
- `NUM_BAGS=20, MIN_DEPTH_CELLS=4, BASE_OIL=500, MAX_OIL=2000`

## Estado de desarrollo (2026-03-13)
**Completado:**
- Fase 1: Setup (Vite + React + TS + Tailwind + Router)
- Fase 2: Generación de grilla triangulada del subsuelo
- Fase 3: Generación de bolsas de petróleo convexas
- Fase 4: Modo excavar (click triángulos para removerlos)
- Fase 6: Torres de perforación + tuberías con todas las validaciones

**Pendiente:**
- Fase 5: Detección de petróleo (cuando tubería llega a una bolsa, iniciar extracción)
- Fase 7: Mecánica de extracción (remainingOil decrece, HUD con progreso)
- Fase 8: Economía (costo de excavar/colocar torres, dinero ganado)
- Superficie: edificios/estructuras en coordenadas (no dependen de grilla)

## Notas para el agente
- Siempre presentar plan completo y esperar confirmación del usuario antes de codificar.
- La siguiente fase lógica es la **Fase 5/7**: detectar cuando una tubería toca una bolsa de petróleo e iniciar extracción (decrementar `remainingOil` con el tiempo, mostrar HUD).
