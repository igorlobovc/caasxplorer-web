export async function loadEstadosCards() {
  const data = await import("../../public/data/estados_cards.json");
  return data.default;
}

export async function loadUfProfiles() {
  const data = await import("../../public/data/uf_profiles_seed.json");
  return data.default;
}

export async function loadReviewQueue() {
  const data = await import("../../public/data/review_queue.json");
  return data.default;
}
