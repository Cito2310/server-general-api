# Interacción con simple-maps-web via Playwright MCP

App en `http://localhost:5173` (levantar con `npm run dev` en la carpeta del proyecto).

## Flujo de login
1. Navegar a `http://localhost:5173`
2. Llenar `[data-testid="login-username"]` con el usuario
3. Llenar `[data-testid="login-password"]` con la contraseña
4. Hacer click en `[data-testid="login-submit"]`

## Selectores disponibles

**Página de mapas (`/maps`)**
| Selector | Acción |
|----------|--------|
| `[data-testid="new-map-btn"]` | Abrir modal de nuevo mapa |
| `[data-testid="map-title-input"]` | Input nombre del mapa |
| `[data-testid="map-save-btn"]` | Guardar mapa |
| `[data-testid="open-map-btn"]` | Abrir un mapa (hay uno por card) |
| `[data-testid="edit-map-btn"]` | Editar un mapa |
| `[data-testid="delete-map-btn"]` | Eliminar un mapa |

**Página de detalle del mapa (`/maps/:id`)**
| Selector | Acción |
|----------|--------|
| `[data-testid="new-node-btn"]` | Abrir modal de nuevo nodo |
| `[data-testid="node-label-input"]` | Input etiqueta del nodo |
| `[data-testid="node-type-select"]` | Select tipo: `titulo`, `concepto`, `subtitulo`, `ejemplo`, `nota` |
| `[data-testid="node-description-input"]` | Textarea descripción (opcional) |
| `[data-testid="node-save-btn"]` | Guardar nodo |
| `[data-testid="add-child-btn-{nodeId}"]` | Agregar hijo a un nodo específico |
| `[data-testid="edit-node-btn-{nodeId}"]` | Editar un nodo específico |
| `[data-testid="delete-node-btn-{nodeId}"]` | Eliminar un nodo específico |

> Para los botones de nodo, reemplazar `{nodeId}` con el `_id` del nodo obtenido del snapshot.
