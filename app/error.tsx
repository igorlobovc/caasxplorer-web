"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <p style={{ fontSize: 12, textTransform: "uppercase", opacity: 0.7 }}>
        CAAsXplorer · Erro de rota
      </p>
      <h1 style={{ fontSize: 32, margin: "8px 0 12px" }}>
        Algo falhou ao carregar esta página
      </h1>
      <p style={{ lineHeight: 1.7, marginBottom: 20 }}>
        O front encontrou um erro durante a renderização. Tente recarregar a rota.
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
  );
}
