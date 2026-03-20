# Import Tree — study-app/src

> `*` = already expanded above, omitted to avoid repetition
> `⚠️` = issue detected

---

## Entry point

# CHEQUEADO - TODO CORRECTO
``` 
main.tsx
└── App.tsx
    ├── SubjectsPage.tsx
    ├── UnitsPage.tsx
    └── TopicsPage.tsx
```

---

## SubjectsPage.tsx


```
SubjectsPage.tsx
├── useSubjectsPage.ts
│   ├── useSubjects.ts
│   │   ├── useLocalStorage.ts
│   │   └── id.ts
│   └── types.ts
├── SubjectForm.tsx
│   ├── Modal.tsx
│   ├── Input.tsx
│   ├── Button.tsx
│   └── types.ts *
└── Button.tsx *
```

---

## UnitsPage.tsx

```
UnitsPage.tsx
├── useUnitsPage.ts
│   ├── useUnits.ts
│   │   ├── useLocalStorage.ts *
│   │   └── id.ts *
│   ├── useSubjects.ts *
│   └── types.ts *
├── UnitForm.tsx
│   ├── Modal.tsx *
│   ├── Input.tsx *
│   ├── Button.tsx *
│   └── types.ts *
├── Breadcrumb.tsx
└── Button.tsx *
```

---

## TopicsPage.tsx

```
TopicsPage.tsx
├── useTopicsPage.ts
│   ├── useTopics.ts
│   │   ├── useLocalStorage.ts *
│   │   └── id.ts *
│   ├── useUnits.ts *
│   └── useSubjects.ts *
├── TopicItem.tsx
│   ├── useTopicItem.ts
│   │   └── useNodes.ts
│   │       ├── useLocalStorage.ts *
│   │       └── id.ts *
│   ├── NodeItem.tsx
│   │   ├── useNodeItem.ts
│   │   │   └── useNodes.ts *
│   │   ├── NodeForm.tsx
│   │   │   ├── Modal.tsx *
│   │   │   ├── Input.tsx *
│   │   │   ├── Button.tsx *
│   │   │   └── types.ts *
│   │   └── Button.tsx *
│   ├── NodeForm.tsx *
│   ├── TopicActions.tsx
│   │   └── Button.tsx *
│   └── TopicForm.tsx
│       ├── Modal.tsx *
│       ├── Input.tsx *
│       ├── Button.tsx *
│       └── types.ts *
├── TopicForm.tsx *
├── Breadcrumb.tsx *
└── Button.tsx *
```

---

## ⚠️ NodeActions.tsx — no importado por ningún archivo

```
NodeActions.tsx
└── Button.tsx *
```

---

## Shared — nodos hoja (sin dependencias internas)

| Archivo | Descripción |
|---|---|
| `shared/components/Button.tsx` | Botón base reutilizable |
| `shared/components/Input.tsx` | Input base reutilizable |
| `shared/components/Modal.tsx` | Modal base reutilizable |
| `shared/components/Breadcrumb.tsx` | Navegación breadcrumb |
| `shared/hooks/useLocalStorage.ts` | Persistencia en localStorage |
| `shared/utils/id.ts` | Generador de UUIDs |
| `types.ts` | Tipos globales: Subject, Unit, Topic, Node |
