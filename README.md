# CAAsXplorer

Dashboard de análise e monitoramento das Caixas de Assistência dos Advogados do Brasil.

## Estrutura do Projeto

```
caixas-xplorer-web/
├── app/                    # Next.js app directory
│   ├── estados/           # Estados routes
│   │   ├── page.tsx       # Lista de estados
│   │   └── [uf]/          # Perfil individual de estado
│   │       └── page.tsx
│   ├── categorias/        # Explorador de categorias
│   │   └── page.tsx
│   ├── metodologia/       # Página de metodologia
│   │   └── page.tsx
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial (Visão Geral)
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
├── data/                  # Dados JSON (fonte)
│   ├── states.json
│   ├── categories.json
│   ├── posts.json
│   └── metrics_rollups.json
├── public/                # Arquivos públicos
│   └── data/             # Cópia dos dados para acesso público
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Rotas Implementadas

1. `/` - Visão Geral Nacional
2. `/estados/` - Índice de estados com links sociais
3. `/estados/[uf]/` - Perfil detalhado de cada estado
4. `/categorias/` - Explorador de categorias
5. `/metodologia/` - Documentação metodológica

## Funcionalidades

- **Filtros interativos**: Por estado, categoria e período
- **Gráficos interativos**: Barras, pizza e scatter
- **Tabelas ordenáveis**: Com busca e paginação
- **Links sociais clicáveis**: Instagram, Facebook, Website
- **Drilldown por estado/categoria**: Navegação hierárquica
- **Responsivo**: Adaptado para mobile e desktop

## Tecnologias

- Next.js 14
- React 18
- TypeScript
- Recharts (gráficos)
- Lucide React (ícones)

## Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Dados

Os dados são carregados de arquivos JSON em `/public/data/`:

- `states.json`: Informações das 25 CAAs
- `categories.json`: 13 categorias com subcategorias
- `posts.json`: 6.291 publicações classificadas
- `metrics_rollups.json`: Métricas agregadas

## Períodos de Análise

- **P1**: 2022 a Março/2026 (completo)
- **P2**: 2025-01-01 a Mar/2026 vs período anterior
- **P3**: Últimos 28 dias (aguardando YouScan)

## Classificação

Sistema de classificação automática com 13 categorias principais:
- Saúde
- Convênios e Benefícios
- Financeiro
- Esporte e Treino
- Infraestrutura e Serviços
- Sorteios e Promoções
- Social e Eventos
- Bem-estar Estético
- Família e Maternidade
- Identidade e Cultura
- Ações Institucionais
- Evidência Pública
- Não Classificado

## Idioma

Interface em Português (Brasil).

## Notas

- Sem branding "Fanpage Karma" visível na interface
- Links sociais ausentes são marcados como "Aguardando link"
- Dados de P3 (últimos 28 dias) aguardando integração com YouScan
