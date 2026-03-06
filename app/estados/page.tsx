import Link from "next/link";
import { getEstadosCards, formatNumberBR } from "../../lib/data/caas";

const REGIAO_ORDER = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

export default async function EstadosPage() {
  const cards = await getEstadosCards();

  const grouped = REGIAO_ORDER.map((regiao) => ({
    regiao,
    items: cards
      .filter((card) => card.regiao === regiao)
      .sort((a, b) => (b.total_advs ?? 0) - (a.total_advs ?? 0)),
  })).filter((group) => group.items.length > 0);

  return (
    <main style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 20px 64px" }}>
      <header style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2, opacity: 0.7 }}>
          CAAsXplorer · Diretório nacional
        </p>
        <h1 style={{ fontSize: 36, lineHeight: 1.1, margin: "8px 0 12px" }}>
          Índice nacional das Caixas de Assistência
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 920 }}>
          Esta página organiza as 27 CAAs por região, combinando base potencial de advogados,
          presença digital e sinais sobre a maturidade da camada de serviços de cada estado.
        </p>
      </header>

      <section style={{ marginBottom: 28, padding: 16, border: "1px solid #e5e7eb", borderRadius: 16 }}>
        <strong>Leitura rápida:</strong>{" "}
        {cards.length} estados mapeados.
      </section>

      {grouped.map((group) => (
        <section key={group.regiao} style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: group.items[0]?.region_color || "#999",
                display: "inline-block",
              }}
            />
            <h2 style={{ fontSize: 26, margin: 0 }}>{group.regiao}</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {group.items.map((card) => (
              <article
                key={card.uf}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 18,
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 13, opacity: 0.7 }}>{card.uf}</div>
                  <h3 style={{ margin: "4px 0 4px", fontSize: 22 }}>{card.caa_nome}</h3>
                  <div style={{ fontSize: 15 }}>{card.estado}</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ padding: 12, borderRadius: 12, background: "#f8fafc" }}>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>Base potencial</div>
                    <strong>{formatNumberBR(card.total_advs)} advogados</strong>
                  </div>
                  <div style={{ padding: 12, borderRadius: 12, background: "#f8fafc" }}>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>Aplicativo</div>
                    <strong>{card.status_app_ptbr}</strong>
                  </div>
                </div>

                <p style={{ margin: 0, lineHeight: 1.6 }}>
                  {card.resumo_curto_ptbr}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {card.site_oficial ? (
                    <a href={card.site_oficial} target="_blank" rel="noreferrer">
                      Site oficial
                    </a>
                  ) : null}
                  {card.instagram_url ? (
                    <a href={card.instagram_url} target="_blank" rel="noreferrer">
                      Instagram
                    </a>
                  ) : null}
                  {card.facebook_url ? (
                    <a href={card.facebook_url} target="_blank" rel="noreferrer">
                      Facebook
                    </a>
                  ) : null}
                </div>

                <div style={{ marginTop: "auto" }}>
                  <Link href={`/estados/${card.uf.toLowerCase()}`}>Abrir página do estado →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
