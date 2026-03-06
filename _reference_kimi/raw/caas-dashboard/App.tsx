import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ChevronDown, ChevronUp, Activity, Users, MessageSquare, TrendingUp, Share2, Heart, Calendar } from 'lucide-react';
import dados from './dados-consolidados.json';

const COLORS = ['#DA2E2C', '#EECF0E', '#31A69B', '#C45DF5', '#A36A66', '#333333', '#FF6B6B', '#4ECDC4', '#45B7D1'];
const REGION_COLORS: Record<string, string> = {
  'Sul': '#EECF0E',
  'Sudeste': '#DA2E2C',
  'Centro-Oeste': '#C45DF5',
  'Nordeste': '#A36A66',
  'Norte': '#31A69B'
};

// ==================== COMPONENTES REUTILIZÁVEIS ====================

const SectionHeader: React.FC<{ number: string; title: string; subtitle?: string }> = ({ number, title, subtitle }) => (
  <div className="mb-8">
    <div className="flex items-baseline gap-3 mb-2">
      <span className="text-4xl font-bold text-[#DA2E2C]">{number}</span>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    </div>
    {subtitle && <p className="text-lg text-gray-600 max-w-4xl">{subtitle}</p>}
  </div>
);

const MetricCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; subtitle?: string; color?: string }> = 
  ({ icon, title, value, subtitle, color = '#DA2E2C' }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-shadow" style={{ borderLeftColor: color }}>
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6', style: { color } })}
      </div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
    </div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
    {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
  </div>
);

const InsightCard: React.FC<{ icon: string; title: string; description: string; color: string }> = 
  ({ icon, title, description, color }) => (
  <div className={`rounded-xl border-2 p-6 hover:shadow-lg transition-shadow ${color}`}>
    <div className="flex items-start gap-4">
      <span className="text-4xl">{icon}</span>
      <div>
        <h4 className="font-bold text-gray-800 mb-2 text-lg">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

// ==================== SEÇÃO 10: INTELIGÊNCIA SOCIAL ====================

const SocialIntelligenceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'geral' | 'categorias' | 'caas' | 'temporal'>('geral');

  // Dados para gráficos
  const categoriasPrincipais = dados.categorias.slice(0, 6);
  const caasPrincipais = dados.caas.slice(0, 10);
  const engagementTop = dados.engagement_caa.slice(0, 10);

  return (
    <section id="social-intelligence" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          number="10" 
          title="Inteligência Social das CAAs"
          subtitle={`Análise completa do engajamento das Caixas de Assistência nas redes sociais. 
            Dados baseados em ${dados.resumo.total_posts.toLocaleString()} posts de ${dados.resumo.total_caas} CAAs.`}
        />

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard 
            icon={<MessageSquare />}
            title="Total de Posts" 
            value={dados.resumo.total_posts.toLocaleString()} 
            subtitle="Posts analisados"
            color="#DA2E2C"
          />
          <MetricCard 
            icon={<Users />}
            title="CAAs Ativas" 
            value={dados.resumo.total_caas} 
            subtitle="Seccionais monitoradas"
            color="#31A69B"
          />
          <MetricCard 
            icon={<TrendingUp />}
            title="Tema Principal" 
            value="Vacinação" 
            subtitle={`${dados.resumo.top_categoria_count} posts`}
            color="#EECF0E"
          />
          <MetricCard 
            icon={<Activity />}
            title="Engagement Médio" 
            value={`${(dados.resumo.media_engagement * 100).toFixed(2)}%`} 
            subtitle="Taxa de interação"
            color="#C45DF5"
          />
        </div>

        {/* Insights Cards */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#DA2E2C]" />
            Principais Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightCard 
              icon="💉"
              title="Vacinação: Tema Dominante"
              description={`A Campanha de Vacinação é absolutamente o tema mais discutido, com ${dados.resumo.top_categoria_count} posts. 
                O pico de engajamento ocorre nos meses de abril e maio, coincidindo com a temporada de vacinação contra a gripe.`}
              color="bg-red-50 border-red-200"
            />
            <InsightCard 
              icon="🏃"
              title="Eventos Esportivos Geram Conexão"
              description="A Corrida da Advocacia e eventos esportivos são ferramentas poderosas de engajamento, 
                promovendo não apenas saúde física, mas também integração e senso de comunidade entre os advogados."
              color="bg-yellow-50 border-yellow-200"
            />
            <InsightCard 
              icon="💪"
              title="Wellhub em Expansão Nacional"
              description="O benefício Wellhub (antigo Gympass) está sendo rapidamente adotado pelas CAAs como 
                diferencial competitivo, com crescente volume de comunicação sobre bem-estar e qualidade de vida."
              color="bg-green-50 border-green-200"
            />
            <InsightCard 
              icon="🧠"
              title="Saúde Mental como Prioridade"
              description="Atendimento psicológico, terapia e programas de bem-estar mental são temas recorrentes, 
                refletindo a crescente preocupação das CAAs com a saúde integral da advocacia."
              color="bg-purple-50 border-purple-200"
            />
          </div>
        </div>

        {/* Tabs de Navegação */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'geral', label: 'Visão Geral', icon: <Activity className="w-4 h-4" /> },
            { id: 'categorias', label: 'Por Categoria', icon: <Share2 className="w-4 h-4" /> },
            { id: 'caas', label: 'Por CAA', icon: <Users className="w-4 h-4" /> },
            { id: 'temporal', label: 'Evolução Temporal', icon: <Calendar className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all rounded-t-lg ${
                activeTab === tab.id 
                  ? 'bg-[#DA2E2C] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo das Tabs */}
        <div className="space-y-8">
          {/* TAB: VISÃO GERAL */}
          {activeTab === 'geral' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Gráfico de Barras - Categorias */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#DA2E2C]" />
                    Volume de Posts por Tema
                  </h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={categoriasPrincipais} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="categoria" type="category" width={160} style={{ fontSize: '11px' }} />
                      <Tooltip 
                        formatter={(value: number) => [`${value} posts`, 'Quantidade']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                      />
                      <Bar dataKey="quantidade" fill="#DA2E2C" radius={[0, 6, 6, 0]}>
                        {categoriasPrincipais.map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Gráfico de Pizza - Distribuição */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#EECF0E]" />
                    Distribuição Percentual de Conteúdo
                  </h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={categoriasPrincipais}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="quantidade"
                        nameKey="categoria"
                      >
                        {categoriasPrincipais.map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number, name: string) => [`${value} posts`, name]}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                      />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Engagement por Categoria */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#31A69B]" />
                  Engagement Médio por Categoria
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dados.engagement_categoria.slice(0, 8)}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="categoria" angle={-30} textAnchor="end" height={80} style={{ fontSize: '11px' }} />
                    <YAxis tickFormatter={(v) => `${(v * 100).toFixed(1)}%`} />
                    <Tooltip 
                      formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Engagement']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    />
                    <Bar dataKey="engagement_medio" fill="#31A69B" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* TAB: POR CATEGORIA */}
          {activeTab === 'categorias' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Análise Detalhada por Categoria Temática</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dados.categorias.map((cat: any, idx: number) => {
                  const engagement = dados.engagement_categoria.find((e: any) => e.categoria === cat.categoria);
                  return (
                    <div key={cat.categoria} className="border rounded-xl p-5 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                        >
                          {idx + 1}
                        </div>
                        <h4 className="font-bold text-gray-800">{cat.categoria}</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Posts:</span>
                          <span className="font-semibold">{cat.quantidade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Engagement médio:</span>
                          <span className="font-semibold">{(engagement?.engagement_medio * 100).toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">% do total:</span>
                          <span className="font-semibold">{((cat.quantidade / dados.resumo.total_posts) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: POR CAA */}
          {activeTab === 'caas' && (
            <>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Top 10 CAAs - Atividade nas Redes Sociais</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={engagementTop} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <YAxis dataKey="caa" type="category" width={80} />
                    <Tooltip 
                      formatter={(value: number, name: string) => {
                        if (name === 'engagement_total') return [`${(value * 100).toFixed(2)}%`, 'Engagement Total'];
                        if (name === 'engagement_medio') return [`${(value * 100).toFixed(2)}%`, 'Engagement Médio'];
                        return [value, name];
                      }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    />
                    <Legend />
                    <Bar dataKey="engagement_total" name="Engagement Total" fill="#DA2E2C" radius={[0, 6, 6, 0]} />
                    <Bar dataKey="engagement_medio" name="Engagement Médio" fill="#31A69B" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Tabela Detalhada */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-bold text-gray-800">Ranking Completo de CAAs</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posição</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CAA</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Posts</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement Médio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dados.engagement_caa.map((caa: any, idx: number) => (
                        <tr key={caa.caa} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                              idx < 3 ? 'bg-[#DA2E2C] text-white' : 'bg-gray-200 text-gray-700'
                            }`}>
                              {idx + 1}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{caa.caa}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">{caa.total_posts}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">{(caa.engagement_medio * 100).toFixed(2)}%</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-[#31A69B] h-2 rounded-full"
                                  style={{ width: `${Math.min(caa.engagement_total * 100, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600">{(caa.engagement_total * 100).toFixed(2)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB: EVOLUÇÃO TEMPORAL */}
          {activeTab === 'temporal' && (
            <>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Evolução Temporal de Posts por Tema</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={dados.temporal_categorias}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="mes" 
                      angle={-45} 
                      textAnchor="end" 
                      height={80} 
                      style={{ fontSize: '10px' }} 
                    />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    />
                    <Legend />
                    {['Campanha de Vacinação', 'Saúde Mental', 'Planos de Saúde', 'Eventos Esportivos', 'Convênios e Parcerias'].map((cat, idx) => (
                      <Line 
                        key={cat}
                        type="monotone" 
                        dataKey={cat} 
                        stroke={COLORS[idx]} 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Gráfico Empilhado */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Distribuição Empilhada por CAA e Tema</h3>
                <ResponsiveContainer width="100%" height={450}>
                  <BarChart data={dados.stacked}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="caa" angle={-45} textAnchor="end" height={60} style={{ fontSize: '11px' }} />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    />
                    <Legend />
                    {['Campanha de Vacinação', 'Saúde Mental', 'Planos de Saúde', 'Eventos Esportivos', 'Convênios e Parcerias', 'Wellhub/Gympass'].map((cat, idx) => (
                      <Bar key={cat} dataKey={cat} stackId="a" fill={COLORS[idx]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>

        {/* Nota Metodológica */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Nota Metodológica
          </h4>
          <p className="text-blue-700 text-sm leading-relaxed">
            Os dados apresentados nesta seção foram extraídos de plataformas de monitoramento de redes sociais, 
            incluindo Instagram, Facebook, Twitter/X e TikTok. O <strong>engagement</strong> é calculado como a 
            proporção de interações (curtidas, comentários, compartilhamentos) em relação ao alcance total dos posts. 
            Os dados são atualizados periodicamente para refletir a atividade mais recente das CAAs. 
            Período de análise: Janeiro 2024 a Fevereiro 2026.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== COMPONENTE PRINCIPAL ====================

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CAAsXplorer</h1>
              <p className="text-sm text-gray-500">Mapeamento das Caixas de Assistência dos Advogados</p>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#summary" className="text-gray-600 hover:text-[#DA2E2C] transition-colors">Resumo</a>
              <a href="#taxonomy" className="text-gray-600 hover:text-[#DA2E2C] transition-colors">Taxonomia</a>
              <a href="#social-intelligence" className="text-gray-600 hover:text-[#DA2E2C] transition-colors font-medium">Inteligência Social</a>
              <a href="#regional" className="text-gray-600 hover:text-[#DA2E2C] transition-colors">Inventário Regional</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main>
        {/* Seção de Inteligência Social */}
        <SocialIntelligenceSection />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">CAAsXplorer</h3>
              <p className="text-gray-400 text-sm">Inteligência Institucional das Caixas de Assistência</p>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-400">
              Dados atualizados em: Março 2026
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
