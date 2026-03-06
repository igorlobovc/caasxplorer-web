# CAAsXplorer 3.0 - Design System Guidance

## Direção de Design

Preservar a identidade visual do CAAsXplorer dashboard com refinamentos do Fanpage Karma para análises comparativas.

---

## 1. Paleta de Cores

### Cores Principais (CAAsXplorer)

```css
--bg-primary: #0a1628;        /* Fundo principal - azul escuro profundo */
--bg-secondary: #0d1e36;      /* Fundo secundário */
--bg-card: rgba(13, 30, 54, 0.8);  /* Cards com transparência */
--accent-cyan: #00d4ff;       /* Destaque primário - ciano */
--accent-blue: #3b82f6;       /* Destaque secundário - azul */
--accent-purple: #8b5cf6;     /* Destaque terciário - roxo */
--text-primary: #ffffff;      /* Texto principal */
--text-secondary: #94a3b8;    /* Texto secundário - slate */
--border-color: rgba(59, 130, 246, 0.2);  /* Bordas sutis */
```

### Cores de Região (Fixas)

| Região | Hex | Uso |
|--------|-----|-----|
| Norte | #31A69B | Teal - identidade visual da região |
| Nordeste | #A36A66 | Terracota - identidade visual da região |
| Centro-Oeste | #C45DF5 | Purple - identidade visual da região |
| Sudeste | #DA2E2C | Red - identidade visual da região |
| Sul | #EECF0E | Yellow - identidade visual da região |

### Cores Semânticas

```css
--success: #10b981;    /* Verde - crescimento, ativo */
--warning: #f59e0b;    /* Amarelo - atenção */
--danger: #ef4444;     /* Vermelho - queda, inativo */
--info: #00d4ff;       /* Ciano - informação */
```

---

## 2. Tipografia

### Fontes

```css
/* Principal */
font-family: 'Inter', sans-serif;

/* Monoespaçada (números, métricas) */
font-family: 'JetBrains Mono', monospace;
```

### Escala

| Elemento | Tamanho | Peso | Uso |
|----------|---------|------|-----|
| H1 (Hero) | 3rem (48px) | 700 | Títulos principais |
| H2 (Section) | 1.5rem (24px) | 700 | Títulos de seção |
| H3 (Card) | 1.25rem (20px) | 600 | Títulos de cards |
| Body | 0.875rem (14px) | 400 | Texto corpo |
| Small | 0.75rem (12px) | 400 | Legendas, labels |
| Caption | 0.625rem (10px) | 500 | Tags, badges |

### Section Title (Padrão CAAsXplorer)

```css
.section-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent-cyan);
  margin-bottom: 0.5rem;
}
```

---

## 3. Componentes

### Glass Card (Principal)

```css
.glass-card {
  background: rgba(13, 30, 54, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
}

.glass-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.1);
}
```

### KPI Card

```css
.kpi-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
}

.kpi-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.kpi-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}
```

### Tab Button

```css
.tab-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.tab-btn.active {
  background: rgba(0, 212, 255, 0.1);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}
```

### Service Tag

```css
.service-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: var(--accent-blue);
  margin: 0.25rem;
}
```

### Status Badge

```css
.status-badge {
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  color: var(--accent-cyan);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}
```

### Profile Pic

```css
.profile-pic {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
}
```

---

## 4. Densidade e Ritmo

### Espaçamento

| Elemento | Valor |
|----------|-------|
| Section padding | py-16 (64px) |
| Container max-width | max-w-7xl (1280px) |
| Card padding | p-6 (24px) |
| Grid gap | gap-4 (16px) a gap-6 (24px) |
| Element spacing | space-y-4 (16px) |

### Ritmo de Seção

```
[Nav Fixo - 64px height]
↓
[Hero Section - pt-32 (compensa nav), pb-16]
↓
[Section - py-16, border-t border-white/5]
↓
[Section - py-16, border-t border-white/5]
...
```

### Bordas Sutis

```css
border-t border-white/5  /* Separadores de seção */
border border-cyan-500/30  /* Destaques */
```

---

## 5. Cards e Conteúdo

### Card Hierarchy

1. **Hero Card**: Maior destaque, métricas principais
2. **Section Card**: Conteúdo de seção, charts
3. **Mini Card**: Informações compactas, tags
4. **Data Card**: Tabelas, listas

### Card States

```css
/* Default */
opacity: 1;

/* Hover */
border-color: rgba(59, 130, 246, 0.4);
box-shadow: 0 0 40px rgba(59, 130, 246, 0.1);

/* Active (selected) */
border-color: var(--accent-cyan);
background: rgba(0, 212, 255, 0.1);
```

---

## 6. Navegação

### Nav Fixo

```css
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  margin: 1rem;
  padding: 0.75rem 1.5rem;
}
```

### Nav Links

```css
.nav-link {
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--accent-cyan);
}
```

---

## 7. Tabelas de Dados

### Data Table

```css
.data-table th {
  background: rgba(0, 0, 0, 0.2);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  padding: 0.75rem 1rem;
}

.data-table td {
  font-size: 0.875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0.75rem 1rem;
}

.data-table tr:hover td {
  background: rgba(255, 255, 255, 0.03);
}
```

---

## 8. Scrollbars

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}
```

---

## 9. Animações

### Pulse (Status)

```css
.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### Hover Transitions

```css
transition: all 0.3s ease;
```

---

## 10. Responsividade

### Breakpoints

| Breakpoint | Largura | Uso |
|------------|---------|-----|
| sm | 640px | Mobile landscape |
| md | 768px | Tablets |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

### Padrões Responsivos

```css
/* Grid de cards */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

/* Charts */
chart-container { height: 350px; }
@media (max-width: 768px) { height: 250px; }

/* Tabelas */
overflow-x-auto em containers
```

---

## 11. Seções Especiais

### Vacinação Card

```css
.vaccination-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1));
  border: 1px solid rgba(16, 185, 129, 0.3);
}
```

### Comparison Badge

```css
.comparison-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.comparison-badge.positive {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.comparison-badge.negative {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}
```

---

## 12. Assets

### Ícones

- SVG inline para ícones de UI
- Phosphor Icons ou Heroicons (outline)
- Tamanho padrão: 20px (w-5 h-5)

### Imagens

- Profile pics: 64x64px, circular
- Logos CAAs: via ui-avatars.com API
- Fallback: gradiente com iniciais

---

## Checklist de Implementação

- [ ] Variáveis CSS definidas
- [ ] Fontes Inter e JetBrains Mono carregadas
- [ ] Glass card component criado
- [ ] Tab buttons funcionando
- [ ] Cores de região mapeadas
- [ ] Responsividade testada
- [ ] Scrollbars customizadas
- [ ] Animações suaves
- [ ] Contraste WCAG AA verificado
