"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
          <p style={{ fontSize: 12, textTransform: "uppercase", opacity: 0.7 }}>
            CAAsXplorer · Erro global
          </p>
          <h1 style={{ fontSize: 32, margin: "8px 0 12px" }}>
            A aplicação encontrou um erro crítico
          </h1>
          <p style={{ lineHeight: 1.7, marginBottom: 20 }}>
            O aplicativo não conseguiu renderizar corretamente esta etapa.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: "1px solid #d1d5db",
              background: "#111827",
              color: "white",
              cursor: "pointer",
            }}
          >
            Tentar novamente
          </button>
          {error?.message ? (
            <pre
              style={{
                marginTop: 20,
                padding: 16,
                borderRadius: 12,
                background: "#f8fafc",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
{error.message}
            </pre>
          ) : null}
        </main>
      </body>
    </html>
  );
}
