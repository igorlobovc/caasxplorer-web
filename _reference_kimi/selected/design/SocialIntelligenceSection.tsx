import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import dados from './dados-consolidados.json';

const COLORS = ['#DA2E2C', '#EECF0E', '#31A69B', '#C45DF5', '#A36A66', '#333333', '#FF6B6B', '#4ECDC4', '#45B7D1'];

// Componente de Card de Métrica
const MetricCard: React.FC<{ title: string; value: string | number; subtitle?: string }> = ({ title, value, subtitle }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#DA2E2C]">
    <h3 className="text-sm font-medium text-gray-500 uppercase">{title}</h3>
    <div className="mt-2 text-3xl font-bold text-gray-900">{value}</div>
    {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
  </div>
);

// Componente de Gráfico de Barras - Categorias
const CategoriasChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Posts por Categoria Temática</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados.categorias} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="categoria" type="category" width={150} style={{ fontSize: '12px' }} />
          <Tooltip formatter={(value: number) => [`${value} posts`, 'Quantidade']} />
          <Bar dataKey="quantidade" fill="#DA2E2C" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Componente de Gráfico de Pizza - Distribuição
const DistribuicaoChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribuição de Conteúdo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dados.categorias.slice(0, 6)}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ categoria, percent }) => `${categoria}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="quantidade"
            nameKey="categoria"
          >
            {dados.categorias.slice(0, 6).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Componente de Gráfico de Linhas - Evolução Temporal
const TemporalChart: React.FC = () => {
  const categorias = ['Campanha de Vacinação', 'Saúde Mental', 'Planos de Saúde', 'Eventos Esportivos', 'Convênios e Parcerias'];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolução Temporal por Tema</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={dados.temporal_categorias}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" angle={-45} textAnchor="end" height={80} style={{ fontSize: '10px' }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {categorias.map((cat, idx) => (
            <Line 
              key={cat}
              type="monotone" 
              dataKey={cat} 
              stroke={COLORS[idx]} 
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Componente de Gráfico de Barras Empilhadas - CAA x Categoria
const StackedChart: React.FC = () => {
  const categorias = ['Campanha de Vacinação', 'Saúde Mental', 'Planos de Saúde', 'Eventos Esportivos', 'Convênios e Parcerias', 'Wellhub/Gympass'];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribuição de Temas por CAA (Top 10)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={dados.stacked}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="caa" angle={-45} textAnchor="end" height={60} style={{ fontSize: '11px' }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {categorias.map((cat, idx) => (
            <Bar key={cat} dataKey={cat} stackId="a" fill={COLORS[idx]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Componente de Tabela de Top CAAs
const TopCAAsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Top CAAs - Atividade Social</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CAA</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posts</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Engagement Médio</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Engagement Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dados.engagement_caa.slice(0, 10).map((caa: any, idx: number) => (
              <tr key={caa.caa} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{caa.caa}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{caa.total_posts}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{(caa.engagement_medio * 100).toFixed(2)}%</td>
                <td className="px-4 py-3 text-sm text-gray-600">{(caa.engagement_total * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente de Insights
const InsightsSection: React.FC = () => {
  const insights = [
    {
      icon: '💉',
      title: 'Vacinação em Destaque',
      description: `Campanha de Vacinação é o tema mais discutido nas redes sociais das CAAs, com ${dados.resumo.top_categoria_count} posts. O pico de engajamento ocorre nos meses de abril e maio.`,
      cor: 'bg-red-50 border-red-200'
    },
    {
      icon: '🏃',
      title: 'Eventos Esportivos Populares',
      description: 'A Corrida da Advocacia e eventos esportivos geram alto engajamento, promovendo saúde e integração entre os advogados.',
      cor: 'bg-yellow-50 border-yellow-200'
    },
    {
      icon: '💪',
      title: 'Wellhub em Expansão',
      description: 'O benefício Wellhub (antigo Gympass) está sendo amplamente divulgado pelas CAAs como diferencial de bem-estar.',
      cor: 'bg-green-50 border-green-200'
    },
    {
      icon: '🧠',
      title: 'Saúde Mental Prioritária',
      description: 'Atendimento psicológico e programas de saúde mental são temas recorrentes, refletindo a preocupação com o bem-estar da advocacia.',
      cor: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {insights.map((insight, idx) => (
        <div key={idx} className={`rounded-lg border p-6 ${insight.cor}`}>
          <div className="flex items-start">
            <span className="text-3xl mr-4">{insight.icon}</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{insight.title}</h4>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente Principal
const SocialIntelligenceSection: React.FC = () => {
  return (
    <section id="social-intelligence" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            10. Inteligência Social das CAAs
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl">
            Análise de engajamento e comunicação das Caixas de Assistência dos Advogados nas redes sociais. 
            Dados extraídos de {dados.resumo.total_posts.toLocaleString()} posts de {dados.resumo.total_caas} CAAs 
            no período analisado.
          </p>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MetricCard 
            title="Total de Posts" 
            value={dados.resumo.total_posts.toLocaleString()} 
            subtitle="Posts analisados"
          />
          <MetricCard 
            title="CAAs Monitoradas" 
            value={dados.resumo.total_caas} 
            subtitle="Seccionais ativas"
          />
          <MetricCard 
            title="Tema Principal" 
            value={dados.resumo.top_categoria} 
            subtitle={`${dados.resumo.top_categoria_count} posts`}
          />
          <MetricCard 
            title="CAA Mais Ativa" 
            value={dados.resumo.top_caa} 
            subtitle={`${dados.resumo.top_caa_count} posts`}
          />
        </div>

        {/* Insights */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Principais Insights</h3>
          <InsightsSection />
        </div>

        {/* Gráficos - Linha 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CategoriasChart />
          <DistribuicaoChart />
        </div>

        {/* Gráfico Temporal */}
        <div className="mb-6">
          <TemporalChart />
        </div>

        {/* Gráfico Empilhado */}
        <div className="mb-6">
          <StackedChart />
        </div>

        {/* Tabela de CAAs */}
        <div className="mb-10">
          <TopCAAsTable />
        </div>

        {/* Nota Metodológica */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-800 mb-2">Nota Metodológica</h4>
          <p className="text-sm text-blue-700">
            Os dados apresentados foram extraídos de plataformas de monitoramento de redes sociais, 
            incluindo Instagram, Facebook, Twitter e TikTok. O engagement é calculado com base na 
            proporção de interações (curtidas, comentários, compartilhamentos) em relação ao alcance 
            dos posts. Os dados são atualizados periodicamente para refletir a atividade mais recente 
            das CAAs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialIntelligenceSection;
