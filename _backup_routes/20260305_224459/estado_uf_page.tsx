'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  MapPin, 
  Instagram, 
  Facebook, 
  Globe, 
  ArrowLeft,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Users,
  ExternalLink
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface State {
  uf: string
  caa: string
  nome: string
  post_count: number
  total_interactions: number
  total_engagement: number
  engagement_per_post: number
  links: {
    instagram: string | null
    facebook: string | null
    website: string | null
  }
  link_missing: boolean
}

interface Post {
  id: number
  date: string
  categoria: string
  subcategoria: string
  interactions: number
  engagement: number
  message_preview: string
  link: string | null
}

interface CategoryDist {
  [key: string]: number
}

export default function EstadoPage() {
  const params = useParams()
  const uf = (params.uf as string).toUpperCase()
  
  const [state, setState] = useState<State | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [categoryData, setCategoryData] = useState<{name: string, count: number}[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/data/states.json').then(r => r.json()),
      fetch('/data/posts.json').then(r => r.json()),
      fetch('/data/metrics_rollups.json').then(r => r.json())
    ])
      .then(([statesData, postsData, metricsData]) => {
        // Find state
        const stateInfo = statesData.find((s: State) => s.uf === uf)
        if (stateInfo) {
          setState(stateInfo)
          
          // Get posts for this state
          const statePosts = postsData.filter((p: Post) => p.uf === uf)
          setPosts(statePosts.slice(0, 10)) // Top 10 posts
          
          // Get category distribution
          const catDist = metricsData.by_state[uf]?.category_distribution || {}
          const chartData = Object.entries(catDist)
            .map(([name, count]) => ({ name, count: count as number }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8)
          setCategoryData(chartData)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setLoading(false)
      })
  }, [uf])

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        Carregando...
      </div>
    )
  }

  if (!state) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        <h1>Estado não encontrado</h1>
        <Link href="/estados/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Voltar para lista de estados
        </Link>
      </div>
    )
  }

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
        {/* Back Link */}
        <Link href="/estados/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6', marginBottom: '1rem' }}>
          <ArrowLeft size={16} /> Voltar para todos os estados
        </Link>

        {/* Page Header */}
        <div className="page-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="page-title">{state.uf} - {state.caa}</h1>
              <p className="page-subtitle">{state.nome}</p>
            </div>
            
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {state.links.instagram && (
                <a 
                  href={state.links.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="icon-button"
                  title="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {state.links.facebook && (
                <a 
                  href={state.links.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="icon-button"
                  title="Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
              {state.links.website && (
                <a 
                  href={state.links.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="icon-button"
                  title="Website"
                >
                  <Globe size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-value">{state.post_count.toLocaleString('pt-BR')}</div>
            <div className="kpi-label">Total de Publicações</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{state.total_interactions.toLocaleString('pt-BR')}</div>
            <div className="kpi-label">Total de Interações</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{state.total_engagement.toFixed(2)}</div>
            <div className="kpi-label">Engajamento Total</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{state.engagement_per_post.toFixed(2)}</div>
            <div className="kpi-label">Engajamento por Post</div>
          </div>
        </div>

        <div className="grid-2">
          {/* Category Distribution Chart */}
          <div className="card">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={24} />
              Distribuição por Categoria
            </h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} style={{ fontSize: '12px' }} />
                  <Tooltip formatter={(value) => [value, 'Publicações']} />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Posts */}
          <div className="card">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={24} />
              Publicações Recentes
            </h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {posts.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {posts.map((post) => (
                    <div key={post.id} style={{ padding: '1rem', background: '#f9fafb', borderRadius: '6px' }}>
                      <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                        {new Date(post.date).toLocaleDateString('pt-BR')} • {post.categoria}
                      </div>
                      <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                        {post.message_preview}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: '#666' }}>
                          {post.interactions.toLocaleString('pt-BR')} interações
                        </div>
                        {post.link && (
                          <a 
                            href={post.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#3b82f6' }}
                          >
                            Ver post <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  Nenhuma publicação encontrada
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: '3rem', padding: '2rem 0', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#666', fontSize: '0.875rem' }}>
          <p>CAAsXplorer - Inteligência das Caixas de Assistência dos Advogados</p>
        </footer>
      </main>
    </div>
  )
}
