# CAAsXplorer 3.0 - Cortes e Postergações

## O que CORTAR (Remover do escopo atual)

### 1. Funcionalidades Complexas

#### ❌ Sistema de Login/Autenticação
**Motivo**: Não essencial para apresentação/análise inicial. Adiciona complexidade desnecessária.
**Alternativa**: Dashboard público com dados agregados.

#### ❌ Exportação PDF/Excel em tempo real
**Motivo**: Pode ser gerado offline. Priorizar visualização.
**Alternativa**: Botão "Exportar dados" que baixa JSON/CSV estático.

#### ❌ Filtros avançados de data (date picker custom)
**Motivo**: Períodos pré-definidos são suficientes (3 períodos do projeto).
**Alternativa**: Tabs fixas: Período Anterior | Gestão Atual | Últimos 30 Dias.

#### ❌ Busca textual em posts
**Motivo**: Complexidade de indexação. Dados já categorizados.
**Alternativa**: Filtro por categoria pré-definida.

---

### 2. Visualizações Não Essenciais

#### ❌ Mapa geográfico do Brasil com heatmap
**Motivo**: Informação já presente em cards por região. Mapa adiciona bundle size.
**Alternativa**: Grid de regiões com cores identificadoras.

#### ❌ Word cloud de termos
**Motivo**: Difícil de interpretar precisamente. Categorias já cobrem isso.
**Alternativa**: Lista de top categorias com volumes.

#### ❌ Network graph de interações entre CAAs
**Motivo**: Complexo de implementar e interpretar.
**Alternativa**: Tabela de comparação lado a lado.

#### ❌ Animações elaboradas de entrada
**Motivo**: Atrasam a percepção de velocidade.
**Alternativa**: Fade-in simples (200ms) ou sem animação.

---

### 3. Dados Não Validados

#### ❌ Sentimento detalhado (positivo/negativo/neutro por post)
**Motivo**: Requer NLP adicional não validado.
**Alternativa**: Sentimento geral apenas (Neutro/Positivo predominante).

#### ❌ Análise de comentários individuais
**Motivo**: Dados não estruturados em todas as fontes.
**Alternativa**: Engagement rate como proxy de interação.

#### ❌ Dados de alcance (reach) precisos por post
**Motivo**: Nem todas as APIs fornecem reach consistente.
**Alternativa**: Estimativas baseadas em engagement.

---

### 4. Integrações Complexas

#### ❌ Integração ao vivo com YouScan
**Motivo**: Requer backend e tokens. Dados já coletados.
**Alternativa**: Dados pré-processados em JSON estático.

#### ❌ Integração ao vivo com Fanpage Karma
**Motivo**: Mesmo motivo acima.
**Alternativa**: Exportar dados e importar para dashboard.

#### ❌ Webhooks para atualização em tempo real
**Motivo**: Overkill para análise histórica.
**Alternativa**: Atualização manual periódica.

---

## o que POSTERGAR (Para versão futura)

### 1. Funcionalidades de Usuário

#### ⏸️ Sistema de favoritos/bookmarks
**Versão**: 3.1 ou posterior
**Justificativa**: Não bloqueia apresentação inicial.

#### ⏸️ Alertas e notificações
**Versão**: 3.1 ou posterior
**Justificativa**: Requer sistema de backend.

#### ⏸️ Perfis de usuário com preferências
**Versão**: 3.2 ou posterior
**Justificativa**: Complexidade de UX não justifica agora.

---

### 2. Análises Avançadas

#### ⏸️ Predição de tendências (forecasting)
**Versão**: 3.1 ou posterior
**Justificativa**: Requer modelo ML e mais dados históricos.

#### ⏸️ Análise comparativa com concorrência (outras entidades)
**Versão**: 3.1 ou posterior
**Justificativa**: Requisito de dados externos não disponíveis.

#### ⏸️ Benchmarking internacional
**Versão**: 3.2 ou posterior
**Justificativa**: Fora do escopo atual (foco Brasil).

---

### 3. Visualizações Adicionais

#### ⏸️ Timeline interativa detalhada
**Versão**: 3.1 ou posterior
**Justificativa**: Line chart atual é suficiente.

#### ⏸️ Gráfico de sankey (fluxo de categorias)
**Versão**: 3.1 ou posterior
**Justificativa**: Complexo de interpretar.

#### ⏸️ Gráfico de área empilhada por região
**Versão**: 3.1 ou posterior
**Justificativa**: Bar chart agrupado é mais claro.

---

### 4. Dados Adicionais

#### ⏸️ Dados de advogados inscritos por CAA (para normalização)
**Versão**: 3.1 ou posterior
**Justificativa**: Requer coleta adicional. Usar estimativas por ora.

#### ⏸️ Histórico de gestões anteriores (antes de 2024)
**Versão**: 3.2 ou posterior
**Justificativa**: Foco nos 3 períodos definidos.

#### ⏸️ Dados de outras redes sociais (Twitter/X, LinkedIn, YouTube)
**Versão**: 3.1 ou posterior
**Justificativa**: Instagram é a principal fonte. Adicionar gradualmente.

---

## Resumo de Escopo

### IN (Escopo Atual)

| Categoria | Itens |
|-----------|-------|
| **Seções** | 10 seções principais (Visão Geral, Taxonomia, Ações, Vacinação, Sinal Externo, Comparativos, Ranking, Últimos 30 Dias, Radar, Evolução) |
| **Charts** | Bar, Horizontal Bar, Line, Doughnut, Radar, Grouped Bar |
| **Interatividade** | Tabs de região/estado, hover effects, tooltips |
| **Dados** | 27 CAAs, 3 períodos, categorias taxonômicas |
| **Design** | Glassmorphism, cores de região, responsivo |

### OUT (Cortado)

| Categoria | Itens |
|-----------|-------|
| **Auth** | Login, perfis, permissões |
| **Export** | PDF/Excel real-time |
| **Mapas** | Heatmap geográfico |
| **NLP** | Sentimento por post, análise de comentários |
| **Integrações** APIs ao vivo |

### POSTERGADO (Futuro)

| Categoria | Itens |
|-----------|-------|
| **UX** | Favoritos, alertas, preferências |
| **Analytics** | Forecasting, benchmarking externo |
| **Dados** | Outras redes, histórico completo, normalização por advogados |

---

## Justificativa Estratégica

### Por que cortar?

1. **Velocidade**: Menos código = mais rápido de implementar
2. **Clareza**: Menos funcionalidades = foco no que importa
3. **Manutenção**: Menos código = menos bugs
4. **Apresentação**: Funcionalidades core são suficientes para demonstrar valor

### Por que postergar?

1. **Validação**: Primeiro validar se o core é útil
2. **Dados**: Algumas análises precisam de mais dados históricos
3. **Recursos**: Funcionalidades avançadas requerem backend
4. **Feedback**: Ouvir usuários antes de construir mais

---

## Checklist de Decisão

Para cada funcionalidade, perguntar:

- [ ] É essencial para a apresentação inicial?
- [ ] Os dados estão disponíveis e validados?
- [ ] A complexidade de implementação justifica o valor?
- [ ] Pode ser demonstrado de forma mais simples?
- [ ] É um diferenciador competitivo?

Se 3+ respostas forem "não", **CORTAR**.
Se 2 respostas forem "não", **POSTERGAR**.
