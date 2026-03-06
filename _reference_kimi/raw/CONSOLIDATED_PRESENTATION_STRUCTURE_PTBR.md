# CAAsXplorer 3.0 - Estrutura Consolidada da Apresentação

## Visão Geral

Consolidação de todo conhecimento Kimi prévio em uma estrutura de produto/apresentação que preserva:
- **Layer A**: Lógica visual e de seções do dashboard CAAsXplorer
- **Layer B**: Gramática de gráficos do Fanpage Karma

---

## Estrutura Final: 10 Seções Principais

### 1. Visão Geral / Overview
**Título PT-BR**: Visão Institucional

**Propósito**: Abertura com KPIs consolidados e status do sistema. Primeira impressão de amplitude e operacionalidade.

**Conhecimento Herdado**:
- Stats de `dados-completos-v18.json`: 5,000 posts, 19/27 CAAs com dados, período 31/01/2023 - 27/02/2026
- Estrutura do hero section do dashboard v19

**Design Reference**: Predominantemente CAAsXplorer

**Elementos Principais**:
- KPI Cards: Total Posts, CAAs Mapeadas, Período de Análise, Cobertura
- Status badge operacional
- Tags de versão (SCHEMA v2.1, PIPELINE ATIVO, AUDITÁVEL)

**Chart/Module**: KPI Summary Cards (estilo Fanpage Karma)

---

### 2. Taxonomia de Serviços
**Título PT-BR**: Taxonomia Canônica - Serviços Mapeados

**Propósito**: Apresentar a estrutura categorizada de serviços institucionais identificados.

**Conhecimento Herdado**:
- Serviços de webscraping em `dados-completos-v18.json`
- Categorias: Saúde, Benefícios, Financeiro, Esporte, Infraestrutura, Educação, Tecnologia
- 80+ serviços identificados

**Design Reference**: Híbrido (CAAsXplorer cards + Fanpage Karma category view)

**Elementos Principais**:
- Tabs de filtro por região (Todas, Norte, Nordeste, Centro-Oeste, Sudeste, Sul)
- Cards de categoria com ícones e contagem
- Tags de serviços dentro de cada card
- Stats dinâmicos por região

**Chart/Module**: Category Cards com Service Tags

---

### 3. Ações Institucionais por Estado
**Título PT-BR**: Ações Institucionais e Evidência Pública

**Propósito**: Navegação por CAA individual com profile, serviços e métricas de engajamento.

**Conhecimento Herdado**:
- Dados de 27 CAAs com profile pics, sites, Instagram
- Serviços por CAA de `caas-regional-data.json`
- Métricas: posts, engagement, reach

**Design Reference**: Predominantemente CAAsXplorer

**Elementos Principais**:
- Tabs de 27 estados (UF)
- Card de estado selecionado com profile pic
- Métricas de engajamento (posts, engagement %, alcance)
- Lista de serviços como tags
- Links para site oficial e Instagram
- Grid de todas as CAAs com miniaturas

**Chart/Module**: State Profile Card + CAAs Grid

---

### 4. Vacinação da Advocacia
**Título PT-BR**: Campanha Nacional - Vacinação da Advocacia

**Propósito**: Análise dedicada das campanhas de vacinação - tópico de alto engajamento.

**Conhecimento Herdado**:
- Top posts de vacinação de `top-posts.json`
- CAAs com campanha: CAAPB, CAAPE, CAAPR, CAAMS, CAACE, CAAMG, CAASC, CAARS
- 345 posts sobre vacinação na categoria

**Design Reference**: Híbrido (CAAsXplorer section + Fanpage Karma topic analysis)

**Elementos Principais**:
- Stats: Posts sobre vacinação, CAAs ativas, Engagement médio, Vacina mais divulgada
- Gráfico de vacinação por CAA
- Gráfico de tipos de vacina
- Timeline de campanhas
- Tabela detalhada por CAA

**Chart/Module**: 
- Bar chart: Vacinação por CAA
- Doughnut: Tipos de vacina
- Line chart: Timeline de campanhas
- Data table: Detalhamento

---

### 5. Sinal Externo
**Título PT-BR**: Sinal Externo - Evidência de Repercussão

**Propósito**: Leitura de repercussão externa baseada em menções e sentimento.

**Conhecimento Herdado**:
- Volume consolidado de menções
- Densidade de sinais por CAA
- Análise de sentimento

**Design Reference**: Predominantemente Fanpage Karma

**Elementos Principais**:
- KPI Cards: Menções Totais, Média por CAA, Densidade de Sinais, Sentimento
- Top categorias por volume (sem "Outros")
- Top categorias por engagement

**Chart/Module**:
- KPI Cards
- Bar chart: Categorias por volume
- Bar chart: Categorias por engagement

---

### 6. Comparativos Analíticos
**Título PT-BR**: Leitura Comparativa - Gestão Atual vs Período Anterior

**Propósito**: Comparação lado a lado dos 3 períodos do projeto.

**Conhecimento Herdado**:
- Período Anterior: Jan/2024 - Mar/2025 (420 dias, 4,802 posts)
- Gestão Atual: Jan/2025 - Mar/2026 (420 dias, 7,097 posts)
- Dados de `gestao_atual` em `dados-completos-v18.json`

**Design Reference**: Híbrido (CAAsXplorer comparison blocks + Fanpage Karma period comparison)

**Elementos Principais**:
- Info cards dos períodos com duração equivalente
- Gráficos comparativos lado a lado
- Gráfico de variação por categoria (%)
- Gráfico comparativo por região
- Tabela detalhada com tendências
- Gráfico de engagement comparison

**Chart/Module**:
- Dual bar charts: Período comparativo
- Bar chart: Variação %
- Grouped bar chart: Por região
- Line chart: Engagement comparison
- Data table: Comparativo detalhado

---

### 7. Ranking Temático
**Título PT-BR**: Ranking Temático - Top Posts por Engagement

**Propósito**: Posts de maior performance classificados por tema.

**Conhecimento Herdado**:
- Top posts de `top-posts.json`
- Categorias: vacinacao, wellhub, esportes
- Engagement rates de 0.04 a 0.32

**Design Reference**: Predominantemente Fanpage Karma

**Elementos Principais**:
- Tabela com: Rank, CAA, Categoria, Post (truncado), Engagement, Link
- Badges de top 3
- Links diretos para Instagram

**Chart/Module**: Data table com ranking

---

### 8. Últimos 30 Dias - Deep Dive
**Título PT-BR**: Análise Recente - Últimos 30 Dias

**Propósito**: Análise detalhada do período mais recente (pulse view).

**Conhecimento Herdado**:
- Dados dos últimos 30 dias
- CAAs ativas no período
- Categorias em destaque

**Design Reference**: Híbrido

**Elementos Principais**:
- KPI Cards: Posts, CAAs Ativas, Engagement Médio
- Gráfico de categorias (doughnut)
- Gráfico de CAAs mais ativas (horizontal bar)

**Chart/Module**:
- KPI Cards
- Doughnut chart: Categorias
- Horizontal bar chart: CAAs

---

### 9. Radar de Serviços
**Título PT-BR**: Análise Multidimensional - Radar de Serviços

**Propósito**: Comparativo visual de cobertura de serviços por categoria.

**Conhecimento Herdado**:
- Volume de posts por categoria
- Distribuição: Saúde (4,521), Convênios (3,104), Eventos (2,372), etc.

**Design Reference**: Predominantemente CAAsXplorer

**Elementos Principais**:
- Radar chart central
- Progress bars laterais por categoria
- Valores absolutos

**Chart/Module**: Radar chart + Progress bars

---

### 10. Evolução Temporal
**Título PT-BR**: Evolução Temporal - Série Histórica

**Propósito**: Visualização da evolução de posts ao longo do tempo completo.

**Conhecimento Herdado**:
- `evolucao_mensal` de `dados-completos-v18.json`
- Dados de Jan/2023 a Fev/2026

**Design Reference**: Predominantemente Fanpage Karma

**Elementos Principais**:
- Line chart com evolução mensal
- Destaque dos 3 períodos
- Anotações de picos

**Chart/Module**: Line chart temporal

---

## Mapeamento de Cores por Região

| Região | Cor | CAAs |
|--------|-----|------|
| Norte | #31A69B (Teal) | 6 CAAs |
| Nordeste | #A36A66 (Terracota) | 9 CAAs |
| Centro-Oeste | #C45DF5 (Purple) | 5 CAAs |
| Sudeste | #DA2E2C (Red) | 4 CAAs |
| Sul | #EECF0E (Yellow) | 3 CAAs |

---

## Navegação Estrutural

```
[Nav Fixo]
├── Início (Visão Geral)
├── Taxonomia
├── Ações
├── Vacinação
├── Sinal Externo
├── Comparativos
├── Ranking
├── Últimos 30 Dias
└── Radar
```

---

## Notas de Implementação

1. **Scroll behavior**: smooth entre seções
2. **Responsividade**: Mobile-first, breakpoints em md (768px) e lg (1024px)
3. **Interatividade**: Tabs de região e estado com atualização dinâmica
4. **Performance**: Charts lazy-loaded, dados em JSON separados
5. **Acessibilidade**: Contraste WCAG AA, navegação por teclado
