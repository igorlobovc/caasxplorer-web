import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "public", "data");

async function readJsonFile<T>(fileName: string): Promise<T> {
  const fullPath = path.join(DATA_DIR, fileName);
  const raw = await fs.readFile(fullPath, "utf8");
  return JSON.parse(raw) as T;
}

export type EstadoCard = {
  uf: string;
  slug: string;
  estado: string;
  regiao: string;
  region_color: string;
  caa_nome: string;
  site_oficial: string;
  instagram_url: string;
  facebook_url: string;
  total_advs: number | null;
  status_app_ptbr: string;
  resumo_curto_ptbr: string;
  has_review_flag: boolean;
};

export type UfProfile = {
  uf: string;
  slug: string;
  estado: string;
  titulo_ptbr: string;
  subtitulo_ptbr: string;
  headline_ptbr: string;
  kpis: {
    total_advs: number | null;
    app_disponivel: string;
    tem_instagram: boolean;
    tem_facebook: boolean;
    tem_site: boolean;
  };
  links: {
    site_oficial: string;
    instagram: string;
    facebook: string;
    x_twitter: string;
    youtube_outro: string;
  };
  servicos: {
    status_app_ptbr: string;
    resumo_ptbr: string;
    fonte_servicos: string;
  };
  qa: {
    review_flag: string;
    review_flags: string[];
    observacao_ptbr: string;
  };
};

export type ReviewQueueItem = {
  uf: string;
  estado: string;
  caa_nome: string;
  review_flag: string;
  site_oficial: string;
  instagram_url: string;
  facebook_url: string;
  app_disponivel: string;
};

export async function getEstadosCards(): Promise<EstadoCard[]> {
  return readJsonFile<EstadoCard[]>("estados_cards.json");
}

export async function getUfProfiles(): Promise<UfProfile[]> {
  return readJsonFile<UfProfile[]>("uf_profiles_seed.json");
}

export async function getReviewQueue(): Promise<ReviewQueueItem[]> {
  return readJsonFile<ReviewQueueItem[]>("review_queue.json");
}

export async function getProfileByUf(uf: string): Promise<UfProfile | null> {
  const profiles = await getUfProfiles();
  const normalized = uf.trim().toUpperCase();
  return profiles.find((item) => item.uf.toUpperCase() === normalized) ?? null;
}

export function formatNumberBR(value: number | null | undefined): string {
  if (value === null || value === undefined) return "N/D";
  return new Intl.NumberFormat("pt-BR").format(value);
}
