# CAAsXplorer 3.0 - CLI Bridge / Next Steps

## Objetivo

Definir o que esta passagem atual no website deve finalizar e o que deve ser exportado para o próximo passo no Kimi Code / CLI.

---

## O que FINALIZAR nesta passagem

### 1. Documentação Consolidada (✅ FEITO)

| Arquivo | Status | Descrição |
|---------|--------|-----------|
| CONSOLIDATED_PRESENTATION_STRUCTURE_PTBR.md | ✅ | Estrutura final de 10 seções |
| DESIGN_SYSTEM_GUIDANCE.md | ✅ | Sistema de design completo |
| CHART_SYSTEM_GUIDANCE.md | ✅ | Sistema de gráficos |
| CUTS_AND_POSTPONES.md | ✅ | Escopo definido (in/out/postergado) |
| CLI_BRIDGE_NEXT.md | ✅ | Este arquivo |

### 2. Assets de Dados (EXPORTAR)

```
/mnt/okcomputer/output/caas-dashboard/
├── dados-completos-v18.json          # Dados principais consolidados
├── caas-regional-data.json           # Dados por região
├── top-posts.json                    # Top posts por categoria
├── caa-data.json                     # Dados individuais das CAAs
├── categorias-data.json              # Mapeamento de categorias
├── engagement-categoria.json         # Engagement por categoria
├── heatmap-data.json                 # Dados de heatmap temporal
├── temporal-data.json                # Série temporal
├── resumo-executivo.json             # Resumo executivo
└── dados-consolidados.json           # Dados consolidados alternativos
```

### 3. Referência Visual (PRESERVAR)

URL do dashboard implementado: **https://aq3buksivjaga.ok.kimi.link**

Este dashboard serve como:
- Referência visual exata
- Prova de conceito funcional
- Base para iterações

---

## O que EXPORTAR para CLI

### Pacote 1: Estrutura de Dados (JSON Schemas)

```javascript
// 01_data_schemas/
├── caas.schema.json              # Schema de CAAs
├── posts.schema.json             # Schema de posts
├── categorias.schema.json        # Schema de categorias
├── regioes.schema.json           # Schema de regiões
└── periodos.schema.json          # Schema dos 3 períodos
```

### Pacote 2: Dados Processados (JSON Data)

```javascript
// 02_processed_data/
├── caas.json                     # 27 CAAs com metadados
├── posts_por_caa.json            # Posts agregados por CAA
├── posts_por_categoria.json      # Posts agregados por categoria
├── posts_por_regiao.json         # Posts agregados por região
├── posts_por_periodo.json        # Posts por período
├── evolucao_mensal.json          # Série temporal completa
├── top_posts.json                # Top posts por engagement
├── vacinacao.json                # Dados específicos de vacinação
└── comparativo_periodos.json     # Dados comparativos
```

### Pacote 3: Configuração de Charts

```javascript
// 03_chart_configs/
├── chart_defaults.json           # Defaults do Chart.js
├── color_palette.json            # Paleta de cores
├── bar_chart.config.json         # Configuração de bar charts
├── line_chart.config.json        # Configuração de line charts
├── doughnut_chart.config.json    # Configuração de doughnut
├── radar_chart.config.json       # Configuração de radar
└── responsive_breakpoints.json   # Breakpoints responsivos
```

### Pacote 4: Componentes React (Estrutura)

```jsx
// 04_react_components/
├── components/
│   ├── Layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── UI/
│   │   ├── GlassCard.tsx
│   │   ├── KPICard.tsx
│   │   ├── TabButton.tsx
│   │   ├── ServiceTag.tsx
│   │   └── StatusBadge.tsx
│   ├── Charts/
│   │   ├── BarChart.tsx
│   │   ├── LineChart.tsx
│   │   ├── DoughnutChart.tsx
│   │   ├── RadarChart.tsx
│   │   └── ChartContainer.tsx
│   ├── Sections/
│   │   ├── HeroSection.tsx
│   │   ├── TaxonomiaSection.tsx
│   │   ├── AcoesSection.tsx
│   │   ├── VacinacaoSection.tsx
│   │   ├── SinalExternoSection.tsx
│   │   ├── ComparativosSection.tsx
│   │   ├── RankingSection.tsx
│   │   ├── Ultimos30Section.tsx
│   │   └── RadarSection.tsx
│   └── Data/
│       ├── CAAsGrid.tsx
│       ├── StateSelector.tsx
│       ├── RegionFilter.tsx
│       └── DataTable.tsx
├── hooks/
│   ├── useData.ts
│   ├── useChart.ts
│   └── useFilter.ts
├── utils/
│   ├── formatters.ts
│   ├── calculations.ts
│   └── constants.ts
├── types/
│   └── index.ts
└── styles/
    ├── globals.css
    └── variables.css
```

### Pacote 5: Páginas (Next.js Structure)

```jsx
// 05_pages/
├── app/
│   ├── page.tsx                    # Landing / Hero
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── taxonomia/
│   │   └── page.tsx
│   ├── acoes/
│   │   └── page.tsx
│   ├── vacinacao/
│   │   └── page.tsx
│   ├── sinal-externo/
│   │   └── page.tsx
│   ├── comparativos/
│   │   └── page.tsx
│   ├── ranking/
│   │   └── page.tsx
│   ├── ultimos-30-dias/
│   │   └── page.tsx
│   └── radar/
│       └── page.tsx
└── components/                     # Shared components
```

---

## Primeiro Build Package (CLI)

### Estrutura de Diretórios

```
caasxplorer-3.0-cli/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── public/
│   └── data/                     # JSON data files
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                   # UI components
│   │   ├── charts/               # Chart components
│   │   └── sections/             # Section components
│   ├── data/                     # Static data imports
│   ├── hooks/                    # Custom hooks
│   ├── lib/                      # Utilities
│   ├── types/                    # TypeScript types
│   └── styles/                   # Additional styles
└── docs/
    ├── STRUCTURE.md
    ├── DESIGN.md
    └── CHARTS.md
```

### Dependências (package.json)

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "chart.js": "^4.4.1",
    "react-chartjs-2": "^5.2.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/forms": "^0.5.7",
    "lucide-react": "^0.300.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

---

## Instruções de Migração

### Passo 1: Setup Inicial (CLI)

```bash
# Criar projeto Next.js
cd /mnt/okcomputer/output/
echo "my-app" | npx shadcn@latest init --yes --template next --base-color slate

# Instalar dependências
cd my-app
npm install chart.js react-chartjs-2 lucide-react

# Copiar dados
mkdir -p public/data
cp ../caas-dashboard/*.json public/data/
```

### Passo 2: Configurar Tailwind

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a1628',
        'bg-secondary': '#0d1e36',
        'accent-cyan': '#00d4ff',
        'accent-blue': '#3b82f6',
        'accent-purple': '#8b5cf6',
        'regiao-norte': '#31A69B',
        'regiao-nordeste': '#A36A66',
        'regiao-centro': '#C45DF5',
        'regiao-sudeste': '#DA2E2C',
        'regiao-sul': '#EECF0E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### Passo 3: Criar Componentes Base

Ordem de implementação:

1. **UI Components** (GlassCard, KPICard, TabButton)
2. **Chart Components** (wrappers do Chart.js)
3. **Section Components** (uma por seção)
4. **Page Components** (páginas do Next.js)

### Passo 4: Importar Dados

```typescript
// src/data/index.ts
import caasData from '../../public/data/caas-regional-data.json';
import postsData from '../../public/data/dados-completos-v18.json';
import topPostsData from '../../public/data/top-posts.json';

export { caasData, postsData, topPostsData };
```

### Passo 5: Build e Deploy

```bash
# Build de produção
npm run build

# Deploy (vercel/netlify)
vercel --prod
```

---

## Checklist de Migração

### Pre-CLI

- [x] Documentação consolidada criada
- [x] Dados JSON validados
- [x] Design system definido
- [x] Chart system definido
- [x] Escopo definido (in/out)

### CLI Phase 1 (Setup)

- [ ] Projeto Next.js criado
- [ ] Dependências instaladas
- [ ] Tailwind configurado
- [ ] Dados copiados para public/

### CLI Phase 2 (Components)

- [ ] UI components implementados
- [ ] Chart components implementados
- [ ] Section components implementados

### CLI Phase 3 (Pages)

- [ ] Landing page (Hero)
- [ ] Seções individuais
- [ ] Navegação entre seções

### CLI Phase 4 (Polish)

- [ ] Responsividade testada
- [ ] Performance otimizada
- [ ] Acessibilidade verificada

### CLI Phase 5 (Deploy)

- [ ] Build de produção
- [ ] Deploy realizado
- [ ] URL compartilhada

---

## Referências Rápidas

### Dashboard Atual (Referência Visual)
- URL: https://aq3buksivjaga.ok.kimi.link
- Local: /mnt/okcomputer/output/caas-dashboard-v19/index.html

### Dados Processados
- Local: /mnt/okcomputer/output/caas-dashboard/

### Documentação
- Local: /mnt/okcomputer/output/*.md

---

## Comando Rápido (Copiar para CLI)

```bash
# Setup completo em um comando
cd /mnt/okcomputer/output && \
echo "caasxplorer-3" | npx shadcn@latest init --yes --template next --base-color slate && \
cd caasxplorer-3 && \
npm install chart.js react-chartjs-2 lucide-react && \
mkdir -p public/data && \
cp ../caas-dashboard/*.json public/data/
```

---

## Notas Finais

1. **Preservar**: Toda a lógica de design e estrutura já definida
2. **Reutilizar**: Componentes do dashboard atual como referência
3. **Iterar**: Começar simples, adicionar complexidade gradualmente
4. **Testar**: Validar cada seção antes de prosseguir
5. **Documentar**: Manter documentação atualizada com mudanças
