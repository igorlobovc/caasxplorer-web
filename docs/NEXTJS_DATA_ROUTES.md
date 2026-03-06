# NEXTJS_DATA_ROUTES.md

## Intended usage

### `/estados`
Primary source:
- `public/data/estados_cards.json`

Secondary source:
- `public/data/review_queue.json`

### `/estados/[uf]`
Primary source:
- `public/data/uf_profiles_seed.json`

### Auxiliary sources
- `public/data/estados_index.json`
- `public/data/national_entities.json`

## Suggested loading pattern

- Load JSON directly from `/public/data`
- Filter by `uf`
- Do not recompute source-of-truth from CSV in the frontend
- Keep the frontend as a presentation layer over canonical JSON payloads
