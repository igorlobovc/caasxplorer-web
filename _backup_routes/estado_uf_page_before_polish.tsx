import Link from "next/link";
import { notFound } from "next/navigation";
import { getUfProfiles, getProfileByUf, formatNumberBR } from "../../../lib/data/caas";

type PageProps = {
  params: Promise<{ uf: string }>;
};

export async function generateStaticParams() {
  const profiles = await getUfProfiles();
  return profiles.map((profile) => ({
    uf: profile.uf.toLowerCase(),
  }));
}

export default async function EstadoUfPage({ params }: PageProps) {
  const { uf } = await params;
  const profile = await getProfileByUf(uf);

  if (!profile) {
    notFound();
  }

  const reviewFlags = profile.qa.review_flags ?? [];

  return (
    <main style={{ maxWidth: 1040, margin: "0 auto", padding: "32px 20px 64px" }}>
      <div style={{ marginBottom: 20 }}>
        <Link href="/estados">← Voltar para o índice nacional</Link>
      </div>

      <header style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2, opacity: 0.7 }}>
          {profile.uf} · {profile.estado}
        </p>
        <h1 style={{ fontSize: 36, lineHeight: 1.1, margin: "8px 0 10px" }}>{profile.titulo_ptbr}</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 860 }}>{profile.subtitulo_ptbr}</p>
        <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 920 }}>{profile.headline_ptbr}</p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <div style={{ padding: 16, borderRadius: 16, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Base potencial</div>
          <strong>{formatNumberBR(profile.kpis.total_advs)} advogados</strong>
        </div>
        <div style={{ padding: 16, borderRadius: 16, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Aplicativo</div>
          <strong>{profile.servicos.status_app_ptbr}</strong>
        </div>
        <div style={{ padding: 16, borderRadius: 16, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Site oficial</div>
          <strong>{profile.kpis.tem_site ? "Identificado" : "Não identificado"}</strong>
        </div>
        <div style={{ padding: 16, borderRadius: 16, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Redes prioritárias</div>
          <strong>
            {profile.kpis.tem_instagram || profile.kpis.tem_facebook ? "Disponíveis" : "Sem rede consolidada"}
          </strong>
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, marginBottom: 10 }}>Presença digital</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {profile.links.site_oficial ? (
            <a href={profile.links.site_oficial} target="_blank" rel="noreferrer">
              Site oficial
            </a>
          ) : null}
          {profile.links.instagram ? (
            <a href={profile.links.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          ) : null}
          {profile.links.facebook ? (
            <a href={profile.links.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          ) : null}
          {profile.links.x_twitter ? (
            <a href={profile.links.x_twitter} target="_blank" rel="noreferrer">
              X / Twitter
            </a>
          ) : null}
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, marginBottom: 10 }}>Aplicativo e utilidade prática</h2>
        <p style={{ lineHeight: 1.7 }}>{profile.servicos.status_app_ptbr}</p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, marginBottom: 10 }}>Serviços identificados</h2>
        <p style={{ lineHeight: 1.8 }}>{profile.servicos.resumo_ptbr}</p>
        {profile.servicos.fonte_servicos ? (
          <p style={{ fontSize: 13, opacity: 0.75 }}>
            <strong>Fonte da consolidação:</strong> {profile.servicos.fonte_servicos}
          </p>
        ) : null}
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, marginBottom: 10 }}>Observações de QA</h2>
        <p style={{ lineHeight: 1.7 }}>{profile.qa.observacao_ptbr}</p>
        {reviewFlags.length > 0 ? (
          <ul>
            {reviewFlags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        ) : (
          <p>Sem pendências críticas nesta etapa.</p>
        )}
      </section>
    </main>
  );
}
