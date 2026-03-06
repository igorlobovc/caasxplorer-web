'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  MapPin, 
  Instagram, 
  Facebook, 
  Globe, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react'

interface State {
  uf: string
  caa: string
  nome: string
  post_count: number
  total_interactions: number
  engagement_per_post: number
  links: {
    instagram: string | null
    facebook: string | null
    website: string | null
  }
  link_missing: boolean
}

export default function EstadosPage() {
  const [states, setStates] = useState<State[]>([])
  const [filteredStates, setFilteredStates] = useState<State[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/states.json')
      .then(r => r.json())
      .then((data: State[]) => {
        setStates(data)
        setFilteredStates(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading states:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = states.filter(s => 
        s.uf.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.caa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredStates(filtered)
    } else {
      setFilteredStates(states)
    }
  }, [searchTerm, states])

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        Carregando...
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
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Índice de Estados</h1>
          <p className="page-subtitle">
            Explore as Caixas de Assistência por estado. Clique nos ícones para acessar as redes sociais.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="filter-container">
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Buscar por estado, CAA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
            <Filter size={20} />
            <span>{filteredStates.length} de {states.length} estados</span>
          </div>
        </div>

        {/* States Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {filteredStates.map((state) => (
            <div key={state.uf} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#1e3a8a', marginBottom: '0.25rem' }}>
                    {state.uf} - {state.caa}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#666' }}>{state.nome}</p>
                </div>
                <Link href={`/estados/${state.uf.toLowerCase()}/`}>
                  <span className="badge badge-info">Ver perfil</span>
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '0.75rem', background: '#f9fafb', borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a' }}>
                    {state.post_count.toLocaleString('pt-BR')}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>Publicações</div>
                </div>
                <div style={{ textAlign: 'center', padding: '0.75rem', background: '#f9fafb', borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a' }}>
                    {state.engagement_per_post.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>Engajamento/Post</div>
                </div>
              </div>

              {/* Social Links */}
              <div style={{ marginTop: 'auto' }}>
                <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>Redes Sociais:</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {/* Instagram */}
                  {state.links.instagram ? (
                    <a 
                      href={state.links.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="icon-button"
                      title="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                  ) : (
                    <div className="icon-button missing" title="Instagram - Aguardando link">
                      <Instagram size={20} />
                    </div>
                  )}

                  {/* Facebook */}
                  {state.links.facebook ? (
                    <a 
                      href={state.links.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="icon-button"
                      title="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                  ) : (
                    <div className="icon-button missing" title="Facebook - Aguardando link">
                      <Facebook size={20} />
                    </div>
                  )}

                  {/* Website */}
                  {state.links.website ? (
                    <a 
                      href={state.links.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="icon-button"
                      title="Website"
                    >
                      <Globe size={20} />
                    </a>
                  ) : (
                    <div className="icon-button missing" title="Website - Aguardando link">
                      <Globe size={20} />
                    </div>
                  )}
                </div>
                {state.link_missing && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#991b1b' }}>
                    * Alguns links estão aguardando cadastro
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStates.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <MapPin size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>Nenhum estado encontrado para a busca.</p>
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
