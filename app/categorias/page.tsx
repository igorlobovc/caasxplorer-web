'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  Tag, 
  BarChart3, 
  Filter,
  ArrowRight,
  MapPin,
  ExternalLink
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Category {
  categoria: string
  count: number
  percentage: number
  subcategorias: { nome: string; count: number }[]
  engagement_total: number
  engagement_avg: number
  relevancia: string
}

interface Post {
  id: number
  uf: string
  caa: string
  categoria: string
  subcategoria: string
  interactions: number
  engagement: number
  message_preview: string
  link: string | null
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

export default function CategoriasPage() {
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('categoria')
  
  const [categories, setCategories] = useState<Category[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/data/categories.json').then(r => r.json()),
      fetch('/data/posts.json').then(r => r.json())
    ])
      .then(([categoriesData, postsData]) => {
        setCategories(categoriesData)
        setPosts(postsData)
        
        if (selectedCategory) {
          setFilteredPosts(postsData.filter((p: Post) => p.categoria === selectedCategory).slice(0, 20))
        } else {
          setFilteredPosts(postsData.slice(0, 20))
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setLoading(false)
      })
  }, [selectedCategory])

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        Carregando...
      </div>
    )
  }

  const chartData = categories.map(c => ({
    name: c.categoria,
    value: c.count,
    percentage: c.percentage
  }))

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
          <h1 className="page-title">Explorador de Categorias</h1>
          <p className="page-subtitle">
            Analise a distribuição de conteúdo por categoria e subcategoria temática
          </p>
        </div>

        {/* Category Filter */}
        {selectedCategory && (
          <div className="card" style={{ marginBottom: '2rem', background: '#eff6ff', border: '1px solid #3b82f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#3b82f6', marginBottom: '0.25rem' }}>Filtro ativo:</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e3a8a' }}>{selectedCategory}</div>
              </div>
              <Link href="/categorias/" className="btn btn-secondary">
                Limpar filtro
              </Link>
            </div>
          </div>
        )}

        <div className="grid-2">
          {/* Category Distribution Chart */}
          <div className="card">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={24} />
              Distribuição Nacional
            </h3>
            <div style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={180} style={{ fontSize: '11px' }} />
                  <Tooltip formatter={(value, name, props) => [`${value} posts (${props.payload.percentage}%)`, 'Publicações']} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category List */}
          <div className="card">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Tag size={24} />
              Todas as Categorias
            </h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {categories.map((cat) => (
                  <Link 
                    key={cat.categoria} 
                    href={`/categorias/?categoria=${encodeURIComponent(cat.categoria)}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div 
                      style={{ 
                        padding: '1rem', 
                        background: selectedCategory === cat.categoria ? '#eff6ff' : '#f9fafb', 
                        borderRadius: '6px',
                        border: selectedCategory === cat.categoria ? '1px solid #3b82f6' : '1px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 500, color: '#1e3a8a', marginBottom: '0.25rem' }}>
                            {cat.categoria}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#666' }}>
                            {cat.count.toLocaleString('pt-BR')} publicações • Relevância: {cat.relevancia}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontWeight: 600, color: '#3b82f6' }}>{cat.percentage}%</span>
                          <ArrowRight size={16} color="#3b82f6" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Table */}
        {selectedCategory && (
          <div className="card" style={{ marginTop: '2rem' }}>
            <h3 className="card-title">
              Publicações em {selectedCategory}
            </h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Estado</th>
                    <th>Subcategoria</th>
                    <th>Interações</th>
                    <th>Preview</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id}>
                      <td>{new Date(post.date).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <Link href={`/estados/${post.uf.toLowerCase()}/`} className="link">
                          {post.uf}
                        </Link>
                      </td>
                      <td>{post.subcategoria}</td>
                      <td>{post.interactions.toLocaleString('pt-BR')}</td>
                      <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {post.message_preview}
                      </td>
                      <td>
                        {post.link ? (
                          <a 
                            href={post.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#3b82f6' }}
                          >
                            <ExternalLink size={14} /> Abrir
                          </a>
                        ) : (
                          <span style={{ color: '#9ca3af' }}>-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer style={{ marginTop: '3rem', padding: '2rem 0', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#666', fontSize: '0.875rem' }}>
          <p>CAAsXplorer - Inteligência das Caixas de Assistência dos Advogados</p>
        </footer>
      </main>
    </div>
  )
}
