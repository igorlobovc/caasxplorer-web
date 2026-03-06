# REPO_INDEX_FOR_AI.md

## Read first

This repository is the recovery handoff for **CAAsXplorer**, a national OAB CAAs intelligence product.

The product target is not a generic dashboard. It is a **report-as-a-site** in PT-BR with:
- a national landing page
- `/estados`
- `/estados/[uf]`
- methodology / QA traceability
- auditable public JSON payloads

## Canonical files to read first

### Public JSON payloads
- `public/data/estados_index.json`
- `public/data/estados_cards.json`
- `public/data/uf_profiles_seed.json`
- `public/data/review_queue.json`
- `public/data/national_entities.json`

### Processed archive / traceability
- `context_archive/caa_registry_final_patched_v2.csv`
- `context_archive/caa_registry_review_needed_patched_v2.csv`
- `context_archive/caa_links_clean.csv`
- `context_archive/caa_national_entities.csv`
- `context_archive/dataset_manifest.json`

## Current QA queue
There are 4 rows still under review before final public release:
- ES
- RJ
- SP
- RR

## Important constraints
- Final client-facing copy must be PT-BR
- No client-facing Fanpage Karma branding
- `/estados` must behave as a directory + intelligence index
- `/estados/[uf]` must behave as a state service/report page, not a thin link page

## Known caveat
Some service summaries in the seed JSON still inherit English wording from source workbooks and should be normalized to PT-BR before final publication.
