# /app/estados/[uf] route spec

## Goal
A state intelligence page that feels like a mini-report.

## Page sections
1. Hero
2. KPI strip
3. Presença digital
4. Aplicativo e utilidade prática
5. Serviços identificados
6. Observações de QA
7. Links oficiais

## Main dataset
- `public/data/uf_profiles_seed.json`

## Required fields
- titulo_ptbr
- subtitulo_ptbr
- headline_ptbr
- kpis
- links
- servicos
- qa

## Warning
Before final publication, normalize any remaining English fragments in `servicos.resumo_ptbr`.
