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

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 20px 72px" }}>
      <div style={{ marginBottom: 22 }}>
        <Link href="/estados" style={{ textDecoration: "none" }}>
          ← Voltar para o índice nacional
        </Link>
      </div>

      <header style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.4, opacity: 0.65, marginBottom: 8 }}>
          {profile.uf} · {profile.estado}
        </p>

        <div style={{ marginBottom: 12 }}>
          <h1 style={{ fontSize: 54, lineHeight: 1.02, margin: 0 }}>{profile.titulo_ptbr}</h1>
        </div>

        <p style={{ fontSize: 20, lineHeight: 1.55, maxWidth: 920, margin: "0 0 10px" }}>
          {profile.subtitulo_ptbr}
        </p>
        <p style={{ fontSize: 22, lineHeight: 1.6, maxWidth: 980, margin: 0 }}>
          {profile.headline_ptbr}
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 34,
        }}
      >
        <div style={{ padding: 18, borderRadius: 18, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Base potencial</div>
          <strong style={{ fontSize: 34, lineHeight: 1.05 }}>{formatNumberBR(profile.kpis.total_advs)}</strong>
          <div style={{ marginTop: 6, fontSize: 15 }}>advogados</div>
        </div>

        <div style={{ padding: 18, borderRadius: 18, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Aplicativo</div>
          <strong style={{ fontSize: 26, lineHeight: 1.15 }}>{profile.servicos.status_app_ptbr}</strong>
        </div>

        <div style={{ padding: 18, borderRadius: 18, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Site oficial</div>
          <strong style={{ fontSize: 26, lineHeight: 1.15 }}>
            {profile.kpis.tem_site ? "Identificado" : "Não identificado"}
          </strong>
        </div>

        <div style={{ padding: 18, borderRadius: 18, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Redes prioritárias</div>
          <strong style={{ fontSize: 26, lineHeight: 1.15 }}>
            {profile.kpis.tem_instagram || profile.kpis.tem_facebook ? "Disponíveis" : "Sem rede consolidada"}
          </strong>
        </div>
      </section>

      <section style={{ marginBottom: 34 }}>
        <h2 style={{ fontSize: 34, margin: "0 0 14px" }}>Presença digital</h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {profile.links.site_oficial ? (
            <a
              href={profile.links.site_oficial}
              target="_blank"
              rel="noreferrer"
              style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid #d1d5db", textDecoration: "none" }}
            >
              Site oficial
            </a>
          ) : null}

          {profile.links.instagram ? (
            <a
              href={profile.links.instagram}
              target="_blank"
              rel="noreferrer"
              style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid #d1d5db", textDecoration: "none" }}
            >
              Instagram
            </a>
          ) : null}

          {profile.links.facebook ? (
            <a
              href={profile.links.facebook}
              target="_blank"
              rel="noreferrer"
              style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid #d1d5db", textDecoration: "none" }}
            >
              Facebook
            </a>
          ) : null}

          {profile.links.x_twitter ? (
            <a
              href={profile.links.x_twitter}
              target="_blank"
              rel="noreferrer"
              style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid #d1d5db", textDecoration: "none" }}
            >
              X / Twitter
            </a>
          ) : null}
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
          gap: 22,
          alignItems: "start",
          marginBottom: 34,
        }}
      >
        <div style={{ padding: 22, borderRadius: 22, border: "1px solid #e5e7eb", background: "white" }}>
          <h2 style={{ fontSize: 34, margin: "0 0 14px" }}>Serviços identificados</h2>
          <p style={{ fontSize: 21, lineHeight: 1.8, margin: 0 }}>{profile.servicos.resumo_ptbr}</p>

          {profile.servicos.fonte_servicos ? (
            <p style={{ fontSize: 13, opacity: 0.72, marginTop: 18 }}>
              <strong>Fonte da consolidação:</strong> {profile.servicos.fonte_servicos}
            </p>
          ) : null}
        </div>

        <aside style={{ padding: 22, borderRadius: 22, border: "1px solid #e5e7eb", background: "#f8fafc" }}>
          <h3 style={{ fontSize: 24, margin: "0 0 14px" }}>Aplicativo e utilidade prática</h3>
          <p style={{ fontSize: 18, lineHeight: 1.7, margin: 0 }}>{profile.servicos.status_app_ptbr}</p>
        </aside>
      </section>
    </main>
  );
}
