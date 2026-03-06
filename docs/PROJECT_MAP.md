# PROJECT_MAP.md

## Product scope

CAAsXplorer is a national intelligence interface about the Caixas de Assistência da Advocacia.

## Route model

### `/`
Narrative landing page with study-style sections.

### `/estados`
National directory and intelligence index of the 27 CAAs.

### `/estados/[uf]`
State profile pages combining:
- digital presence
- official links
- lawyer base
- app status
- services layer
- QA notes where applicable

## Current data layers

### Public
Located in `public/data/`

### Processed audit trail
Located in `context_archive/`

## Current output status
- 27 state records consolidated
- 1 national non-state entity isolated (`CONCAD`)
- 4 review rows still pending validation
