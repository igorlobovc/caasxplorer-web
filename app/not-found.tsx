import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <p style={{ fontSize: 12, textTransform: "uppercase", opacity: 0.7 }}>
        CAAsXplorer · Página não encontrada
      </p>
      <h1 style={{ fontSize: 32, margin: "8px 0 12px" }}>
        Esta rota não foi localizada
      </h1>
      <p style={{ lineHeight: 1.7, marginBottom: 20 }}>
        A página pedida não existe ou ainda não foi publicada nesta versão do projeto.
      </p>
      <Link href="/estados">Ir para o índice nacional</Link>
    </main>
  );
}
