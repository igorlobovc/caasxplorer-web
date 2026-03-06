'use client'

import Link from 'next/link'
import { 
  FileText, 
  Database, 
  BarChart3, 
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react'

export default function MetodologiaPage() {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>CAAsXplorer</Link>
          </div>
          <nav className="nav">
            <Link href="/">Visão Geral</Link>
            <Link href="/estados/">Estados</Link>
            <Link href="/categorias/">Categorias</Link>
            <Link href="/metodologia/">Metodologia</Link>
          </nav>
        </div>
      </header>

      <main className="container" style={{ padding: '2rem 0' }}>
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Metodologia</h1>
          <p className="page-subtitle">
            Entenda como os dados são coletados, processados e analisados
          </p>
        </div>

        {/* Overview */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={24} />
            Visão Geral do Processo
          </h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            O CAAsXplorer é uma plataforma de inteligência de dados que consolida informações 
            das Caixas de Assistência dos Advogados (CAAs) de todo o Brasil. O sistema utiliza 
            técnicas de processamento de linguagem natural e classificação automática para 
            categorizar o conteúdo e gerar insights estratégicos.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e3a8a' }}>6.291</div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>Publicações analisadas</div>
            </div>
            <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e3a8a' }}>25</div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>CAAs monitoradas</div>
            </div>
            <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e3a8a' }}>13</div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>Categorias temáticas</div>
            </div>
          </div>
        </div>

        <div className="grid-2">
          {/* Data Collection */}
          <div className="card">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={24} />
              Coleta de Dados
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flexShrink: 0 }}>
                  <span className="badge badge-success">P1</span>
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Período Completo</div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Janeiro/2022 a Março/2026. Dados históricos completos para análise de tendências.
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flexShrink: 0 }}>
                  <span className="badge badge-success">P2</span>
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Comparativo Recente</div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Período de 01/01/2025 a Março/2026 comparado com período igual anterior.
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flexShrink: 0 }}>
                  <span className="badge badge-warning">P3</span>
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Dados em Tempo Real</div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Últimos 28 dias. Aguardando integração com YouScan para atualização automática.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="card">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={24} />
              Classificação de Conteúdo
            </h3>
            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
              Utilizamos um sistema de classificação automática baseado em palavras-chave e 
              regras de prioridade para categorizar cada publicação em 13 categorias principais:
            </p>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} color="#10b981" /> Saúde
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} color="#10b981" /> Convênios e Benefícios
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} color="#10b981" /> Financeiro
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} color="#10b981" /> Esporte e Treino
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} color="#10b981" /> Infraestrutura
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} color="#10b981" /> Sorteios e Promoções
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} color="#10b981" /> Social e Eventos
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} color="#10b981" /> E mais 6 categorias...
              </li>
            </ul>
          </div>
        </div>

        {/* Data Quality */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={24} />
            Qualidade dos Dados
          </h3>
          <div className="grid-2">
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e3a8a' }}>Cobertura</h4>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                A base de dados contempla 25 das 27 unidades federativas do Brasil. 
                Algumas CAAs podem não ter dados disponíveis devido a:
              </p>
              <ul style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#666' }}>
                <li>Restrições de privacidade nas redes sociais</li>
                <li>Perfil privado ou inexistente</li>
                <li>Indisponibilidade técnica temporária</li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e3a8a' }}>Precisão</h4>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                A classificação automática possui diferentes níveis de confiança:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: '#f9fafb', borderRadius: '4px' }}>
                  <span>Alta confiança</span>
                  <span style={{ fontWeight: 600, color: '#10b981' }}>24.1%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: '#f9fafb', borderRadius: '4px' }}>
                  <span>Média confiança</span>
                  <span style={{ fontWeight: 600, color: '#f59e0b' }}>30.7%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: '#f9fafb', borderRadius: '4px' }}>
                  <span>Baixa confiança</span>
                  <span style={{ fontWeight: 600, color: '#ef4444' }}>44.0%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: '#f9fafb', borderRadius: '4px' }}>
                  <span>Revisão manual</span>
                  <span style={{ fontWeight: 600, color: '#6b7280' }}>1.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Limitations */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={24} />
            Limitações e Considerações
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e3a8a' }}>Engajamento</h4>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                As métricas de engajamento são calculadas com base em interações públicas 
                (curtidas, comentários, compartilhamentos). Não incluem visualizações de 
                stories, alcance ou impressões, que não estão disponíveis via API pública.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e3a8a' }}>Links Sociais</h4>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                Os links para redes sociais são cadastrados manualmente. Quando não disponíveis, 
                são marcados como "Aguardando link". A ausência de link não impede a análise 
                dos dados, apenas limita o acesso direto ao perfil.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e3a8a' }}>Atualização</h4>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                Os dados são atualizados periodicamente. O período P3 (últimos 28 dias) 
                requer integração com ferramenta de monitoramento (YouScan) para atualização 
                em tempo real.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: '3rem', padding: '2rem 0', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#666', fontSize: '0.875rem' }}>
          <p>CAAsXplorer - Inteligência das Caixas de Assistência dos Advogados</p>
          <p style={{ marginTop: '0.5rem' }}>Metodologia desenvolvida em Março/2026</p>
        </footer>
      </main>
    </div>
  )
}
