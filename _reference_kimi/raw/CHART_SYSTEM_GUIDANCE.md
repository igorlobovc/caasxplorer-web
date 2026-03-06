# CAAsXplorer 3.0 - Chart System Guidance

## Filosofia

Reutilizar a gramática de gráficos do Fanpage Karma onde aplicável, adaptando apenas para necessidades específicas do CAAsXplorer (normalização por advogados, taxonomia de serviços, sinal externo).

---

## 1. Chart Families

### 1.1 REUTILIZAR QUASE AS-IS (Fanpage Karma)

#### KPI Summary Cards
**Uso**: Métricas principais no overview

```javascript
// Estrutura
{
  label: string,
  value: number | string,
  change?: { value: number, direction: 'up' | 'down' },
  sublabel?: string
}
```

**Exemplos**:
- Total Posts: 14.8K
- CAAs Mapeadas: 27
- Engagement Médio: 2.8%
- Menções Totais: 14.8K

---

#### Bar Charts (Vertical)
**Uso**: Comparação de categorias, ranking

```javascript
// Configuração padrão
{
  type: 'bar',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: 'rgba(255,255,255,0.05)' } 
      },
      x: { 
        grid: { display: false },
        ticks: { font: { size: 9 } }
      }
    }
  }
}
```

**Cores por barra** (categorias):
```javascript
backgroundColor: [
  '#00d4ff', '#3b82f6', '#8b5cf6', '#ec4899', 
  '#10b981', '#f59e0b', '#ef4444', '#6366f1'
]
```

**Aplicações**:
- Top Categorias por Volume
- Top Categorias por Engagement
- Vacinação por CAA
- CAAs mais ativas

---

#### Horizontal Bar Charts
**Uso**: Rankings onde labels são longos

```javascript
options: {
  indexAxis: 'y',
  // ... resto igual a bar vertical
}
```

**Aplicações**:
- CAAs - Últimos 30 Dias
- Ranking de posts

---

#### Doughnut Charts
**Uso**: Distribuição proporcional

```javascript
{
  type: 'doughnut',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'right',
        labels: { boxWidth: 12, font: { size: 10 } }
      }
    },
    cutout: '60%'
  }
}
```

**Aplicações**:
- Categorias - Últimos 30 Dias
- Tipos de Vacina
- Distribuição por região

---

#### Line Charts
**Uso**: Evolução temporal, tendências

```javascript
{
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      x: { 
        grid: { display: false },
        ticks: { font: { size: 9 } }
      }
    },
    elements: {
      line: { tension: 0.4 },  // Curvas suaves
      point: { radius: 3, hoverRadius: 5 }
    }
  }
}
```

**Aplicações**:
- Timeline de Vacinação
- Evolução Mensal
- Engagement Comparison

---

#### Grouped Bar Charts
**Uso**: Comparação lado a lado

```javascript
{
  type: 'bar',
  data: {
    datasets: [
      { label: 'Período Anterior', backgroundColor: '#3b82f6' },
      { label: 'Gestão Atual', backgroundColor: '#00d4ff' }
    ]
  }
}
```

**Aplicações**:
- Comparativo por Região
- Comparativo de Engagement

---

### 1.2 ADAPTAR LEVEMENTE

#### Radar Chart
**Base**: Fanpage Karma skill radar
**Adaptação**: Cores CAAsXplorer, 7 dimensões de serviços

```javascript
{
  type: 'radar',
  data: {
    labels: ['Saúde', 'Convênios', 'Eventos', 'Financeiro', 'Educação', 'Infraestrutura', 'Tecnologia'],
    datasets: [{
      label: 'Volume de Posts',
      data: [4521, 3104, 2372, 1523, 854, 360, 229],
      backgroundColor: 'rgba(0, 212, 255, 0.2)',
      borderColor: '#00d4ff',
      pointBackgroundColor: '#00d4ff',
      pointBorderColor: '#fff'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.1)' },
        grid: { color: 'rgba(255,255,255,0.1)' },
        pointLabels: { color: '#94a3b8', font: { size: 10 } },
        ticks: { display: false, backdropColor: 'transparent' }
      }
    }
  }
}
```

---

### 1.3 CUSTOM-BUILD PARA CAAsXplorer

#### Lawyer-Normalized Charts
**Propósito**: Normalizar métricas por número total de advogados inscritos

```javascript
// Dados necessários
{
  caa: string,
  posts: number,
  totalLawyers: number,
  postsPerLawyer: number  // posts / totalLawyers * 1000
}

// Chart type: Bar ou Horizontal Bar
// Y-axis: Posts por 1.000 advogados
// X-axis: CAA
```

**Aplicações**:
- Produtividade por CAA (normalizada)
- Engagement rate por advogado
- Alcance per capita

---

#### Comparative Management Charts
**Propósito**: Comparar períodos equivalentes (3 períodos do projeto)

```javascript
// Estrutura de períodos
{
  periodo1: {  // Baseline histórico
    nome: 'Período Anterior',
    inicio: '2024-01-01',
    fim: '2025-03-31',
    dias: 420,
    posts: 4802
  },
  periodo2: {  // Gestão atual
    nome: 'Gestão Atual',
    inicio: '2025-01-01',
    fim: '2026-03-31',
    dias: 420,
    posts: 7097
  },
  periodo3: {  // Últimos 30 dias
    nome: 'Últimos 30 Dias',
    inicio: '2026-02-01',
    fim: '2026-03-03',
    dias: 30,
    posts: 380
  }
}
```

**Chart Types**:
- Dual bar charts (lado a lado)
- Variation bar chart (%)
- Period comparison table

---

#### Topic Slice Charts
**Propósito**: Análise profunda de tópicos específicos (vacinação, wellhub, esportes)

```javascript
// Estrutura
{
  topico: 'vacinacao',
  posts: 1569,
  caasAtivas: 8,
  engagementMedio: 3.5,
  timeline: [...],
  porCAA: [...],
  tipos: [...]
}
```

**Chart Types**:
- Line chart: Timeline do tópico
- Bar chart: Volume por CAA
- Doughnut: Distribuição de subcategorias
- Data table: Posts destacados

---

#### External Signal Charts
**Propósito**: Visualizar menções e sentimento de fontes externas

```javascript
// Estrutura
{
  mencoesTotais: number,
  porFonte: {
    news: number,
    blogs: number,
    forums: number,
    social: number
  },
  sentimento: {
    positivo: number,
    neutro: number,
    negativo: number
  }
}
```

**Chart Types**:
- Stacked bar: Menções por fonte ao longo do tempo
- Sentiment gauge ou pie chart
- Word cloud (opcional)

---

## 2. Chart Defaults

### Chart.js Defaults (CAAsXplorer)

```javascript
Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = 'rgba(255,255,255,0.1)';
Chart.defaults.font.family = "'Inter', sans-serif";
```

### Container Heights

| Chart Type | Desktop | Mobile |
|------------|---------|--------|
| Bar/Line | 350px | 250px |
| Doughnut/Pie | 350px | 280px |
| Radar | 400px | 300px |
| Small comparison | 250px | 200px |

---

## 3. Color Mapping

### Por Categoria de Serviço

| Categoria | Cor | Hex |
|-----------|-----|-----|
| Saúde | Cyan | #00d4ff |
| Convênios | Blue | #3b82f6 |
| Eventos Esportivos | Purple | #8b5cf6 |
| Eventos Sociais | Pink | #ec4899 |
| Assistência Financeira | Emerald | #10b981 |
| Educação | Amber | #f59e0b |
| Infraestrutura | Red | #ef4444 |
| Tecnologia | Indigo | #6366f1 |

### Por Região

| Região | Cor | Hex |
|--------|-----|-----|
| Norte | Teal | #31A69B |
| Nordeste | Terracotta | #A36A66 |
| Centro-Oeste | Purple | #C45DF5 |
| Sudeste | Red | #DA2E2C |
| Sul | Yellow | #EECF0E |

### Por Período

| Período | Cor | Hex |
|---------|-----|-----|
| Período Anterior | Blue | #3b82f6 |
| Gestão Atual | Cyan | #00d4ff |
| Últimos 30 Dias | Purple | #8b5cf6 |

---

## 4. Interatividade

### Hover Effects

```javascript
options: {
  interaction: {
    mode: 'index',
    intersect: false
  },
  plugins: {
    tooltip: {
      backgroundColor: 'rgba(13, 30, 54, 0.95)',
      titleColor: '#00d4ff',
      bodyColor: '#fff',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8
    }
  }
}
```

### Click Actions

- KPI Cards: Drill-down para detalhamento
- Bar charts: Filtrar por categoria/região
- Line charts: Zoom no período
- Doughnut: Explode segmento

---

## 5. Data Format Standards

### Time Series

```javascript
{
  labels: ['2023-01', '2023-02', ...],
  datasets: [{
    label: 'Posts',
    data: [9, 134, 188, ...]
  }]
}
```

### Categorical

```javascript
{
  labels: ['Convênios', 'Vacinação', 'Eventos', ...],
  datasets: [{
    label: 'Volume',
    data: [1709, 1569, 1418, ...]
  }]
}

```

### Comparative

```javascript
{
  labels: ['Convênios', 'Vacinação', 'Eventos', ...],
  datasets: [
    { label: 'Período Anterior', data: [424, 911, 414, ...] },
    { label: 'Gestão Atual', data: [889, 467, 709, ...] }
  ]
}
```

---

## 6. Responsive Behavior

### Breakpoints

```javascript
const chartHeight = window.innerWidth < 768 ? 250 : 350;
```

### Legend Position

```javascript
legend: {
  position: window.innerWidth < 768 ? 'bottom' : 'right',
  labels: { 
    boxWidth: window.innerWidth < 768 ? 10 : 12,
    font: { size: window.innerWidth < 768 ? 9 : 10 }
  }
}
```

---

## 7. Performance

### Lazy Loading

```javascript
// Carregar charts apenas quando visíveis
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initChart(entry.target);
    }
  });
});
```

### Data Chunking

- Máximo 100 pontos em line charts (downsample se necessário)
- Paginação em tabelas (50 rows por página)

---

## 8. Accessibility

### ARIA Labels

```html
<canvas 
  id="chart-categorias"
  role="img"
  aria-label="Gráfico de categorias por volume"
></canvas>
```

### Alt Text (Data Table)

```javascript
// Sempre fornecer tabela de dados como alternativa
// para leitores de tela
```

### Keyboard Navigation

- Tab entre charts
- Enter para ativar drill-down
- Escape para fechar modais

---

## 9. Chart Checklist

- [ ] Cores seguem paleta CAAsXplorer
- [ ] Altura responsiva implementada
- [ ] Tooltips customizados
- [ ] Legendas posicionadas corretamente
- [ ] Grid lines sutis (5% opacity)
- [ ] Fonte Inter aplicada
- [ ] Dados validados
- [ ] ARIA labels adicionados
- [ ] Performance testada
- [ ] Mobile testado
