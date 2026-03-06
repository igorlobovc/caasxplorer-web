import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CAAsXplorer - Inteligência das Caixas de Assistência',
  description: 'Dashboard de análise e monitoramento das Caixas de Assistência dos Advogados do Brasil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
