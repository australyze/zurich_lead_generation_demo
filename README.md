# Zurich Lead Intelligence Platform

Demo ejecutiva enterprise para Zurich — prospección, validación de emails, enriquecimiento, campañas e Instantly.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4
- shadcn/ui (Radix) + Lucide
- Zustand (persistencia mock en localStorage)
- TanStack React Query
- Recharts + Framer Motion + Sonner

## Arranque local

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) — redirige a `/dashboard`.

## Módulos

| Ruta | Descripción |
|------|-------------|
| `/dashboard` | KPIs, funnel, tendencia y actividad |
| `/prospection` | Actor Apify simulado + tabla de leads |
| `/correos` | Estados de email, filtros y búsqueda |
| `/enriquecimiento` | Perfiles CRM con panel lateral |
| `/campanas` | Secuencias de 4 correos editables |
| `/instantly` | Campañas operacionales y métricas |
| `/crm` | Tarjetas de integración CRM |
| `/marketplace` | Catálogo de integraciones futuras |
| `/configuracion` | Selector de proveedor de IA |

## Datos mock

- 100 leads consistentes entre módulos
- ~70 correos encontrados / ~55 validados / 40 enriquecidos / 25 campañas / 12 activas
- Persistencia local vía Zustand (`zurich-lip-storage`)

## Branding

Zurich Blue `#0066CC` · Dark Blue `#003366` · Light Blue `#EAF4FF` · Neutral `#F5F7FA` · Inter

Sin logo. Sin integraciones reales.
