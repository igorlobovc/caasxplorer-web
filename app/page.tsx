'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  MapPin, 
  Tag, 
  FileText, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowRight
} from 'lucide-react'

interface NationalMetrics {
  total_posts: number
  total_interactions: number
  total_engagement: number
  avg_engagement_per_post: number
  date_range: {
    start: string
    end: string
  }
}

interface Category {
  categoria: string
  count: number
  percentage: number
}

export default function HomePage() {
  const [metrics, setMetrics] = useState<NationalMetrics | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load data from JSON files
    Promise.all([
      fetch('/data/metrics_rollups.json').then(r => r.json()),
      fetch('/data/categories.json').then(r => r.json())
    ])
      .then(([metricsData, categoriesData]) => {
        setMetrics(metricsData.national)
        setCategories(categoriesData.slice(0, 5)) // Top 5 categories
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        Carregando...
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        Erro ao carregar dados
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">CAAsXplorer</div>
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
          <h1 className="page-title">Visão Geral Nacional</h1>
          <p className="page-subtitle">
            Análise consolidada das Caixas de Assistência dos Advogados do Brasil
          </p>
        </div>

        {/* KPI Grid */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-value">{metrics.total_posts.toLocaleString('pt-BR')}</div>
            <div className="kpi-label">Total de Publicações</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{metrics.total_interactions.toLocaleString('pt-BR')}</div>
            <div className="kpi-label">Total de Interações</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{metrics.total_engagement.toFixed(2)}</div>
            <div className="kpi-label">Engajamento Total</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{metrics.avg_engagement_per_post.toFixed(4)}</div>
            <div className="kpi-label">Média de Engajamento por Post</div>
          </div>
        </div>

        {/* Navigation Tiles */}
        <h2 style={{ marginBottom: '1.5rem', color: '#1e3a8a' }}>Navegação</h2>
        <div className="grid-2">
          <Link href="/estados/" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-4px)' } }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <MapPin size={32} color="#3b82f6" />
                <h3 style={{ fontSize: '1.25rem', color: '#1e3a8a' }}>Estados</h3>
              </div>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Explore os dados por estado. Acesse perfis, estatísticas e redes sociais de cada CAA.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', color: '#3b82f6', fontWeight: 500 }}>
                Ver todos os estados <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
              </div>
            </div>
          </Link>

          <Link href="/categorias/" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Tag size={32} color="#3b82f6" />
                <h3 style={{ fontSize: '1.25rem', color: '#1e3a8a' }}>Categorias</h3>
              </div>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Analise a distribuição de conteúdo por categoria e subcategoria temática.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', color: '#3b82f6', fontWeight: 500 }}>
                Explorar categorias <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
              </div>
            </div>
          </Link>
        </div>

        {/* Top Categories */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={24} />
            Top Categorias
          </h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Publicações</th>
                  <th>% do Total</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.categoria}>
                    <td>{cat.categoria}</td>
                    <td>{cat.count.toLocaleString('pt-BR')}</td>
                    <td>{cat.percentage}%</td>
                    <td>
                      <Link href={`/categorias/?categoria=${encodeURIComponent(cat.categoria)}`} className="link">
                        Ver detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Periods Info */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={24} />
            Períodos de Análise
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, color: '#1e3a8a', marginBottom: '0.5rem' }}>P1 - Período Completo</div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>2022 a Março/2026</div>
              <div style={{ marginTop: '0.5rem' }}>
                <span className="badge badge-success">Ativo</span>
              </div>
            </div>
            <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, color: '#1e3a8a', marginBottom: '0.5rem' }}>P2 - Comparativo 2025</div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>2025-01-01 a Mar/2026 vs período anterior</div>
              <div style={{ marginTop: '0.5rem' }}>
                <span className="badge badge-success">Ativo</span>
              </div>
            </div>
            <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, color: '#1e3a8a', marginBottom: '0.5rem' }}>P3 - Últimos 28 dias</div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>Dados em tempo real</div>
              <div style={{ marginTop: '0.5rem' }}>
                <span className="badge badge-warning">Aguardando YouScan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: '3rem', padding: '2rem 0', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#666', fontSize: '0.875rem' }}>
          <p>CAAsXplorer - Inteligência das Caixas de Assistência dos Advogados</p>
          <p style={{ marginTop: '0.5rem' }}>Dados atualizados até Março/2026</p>
        </footer>
      </main>
    </div>
  )
}
