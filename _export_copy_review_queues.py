from pathlib import Path
import json
import csv
import re

ROOT = Path("/Users/igorcunha/Downloads/Kimi_Agent_CAA交互式报告/caixas-xplorer-web")
DATA = ROOT / "public" / "data"
OUT = ROOT / "docs" / "_copy_review"

profiles_path = DATA / "uf_profiles_seed.json"
review_path = DATA / "review_queue.json"

profiles = json.loads(profiles_path.read_text(encoding="utf-8"))
review = json.loads(review_path.read_text(encoding="utf-8"))

english_markers = [
    "mobile app", "dedicated", "website-based", "official website", "services handled",
    "including", "health and wellness", "discount", "booking", "digital membership",
    "support", "shared offices", "professional photography", "online portal", "ticket sales",
    "beauty services", "fitness platform", "website", "app-based", "dedicated app",
]

def needs_ptbr_review(text: str) -> bool:
    t = (text or "").lower()
    if not t.strip():
        return False
    return any(marker in t for marker in english_markers)

services_csv = OUT / "services_ptbr_translation_queue.csv"
qa_csv = OUT / "qa_flags_humanization_queue.csv"

with services_csv.open("w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=[
            "uf",
            "estado",
            "titulo_ptbr",
            "status_app_ptbr",
            "review_flag",
            "needs_ptbr_review",
            "resumo_ptbr_atual",
            "resumo_ptbr_novo",
        ],
    )
    writer.writeheader()
    for row in profiles:
        resumo = row.get("servicos", {}).get("resumo_ptbr", "")
        writer.writerow({
            "uf": row.get("uf", ""),
            "estado": row.get("estado", ""),
            "titulo_ptbr": row.get("titulo_ptbr", ""),
            "status_app_ptbr": row.get("servicos", {}).get("status_app_ptbr", ""),
            "review_flag": row.get("qa", {}).get("review_flag", ""),
            "needs_ptbr_review": "YES" if needs_ptbr_review(resumo) else "",
            "resumo_ptbr_atual": resumo,
            "resumo_ptbr_novo": "",
        })

raw_flags = set()
for row in review:
    for flag in (row.get("review_flag", "") or "").split(";"):
        if flag.strip():
            raw_flags.add(flag.strip())

suggestions = {
    "REVIEW_FACEBOOK_NOT_CAA_SPECIFIC": "Facebook precisa validação: pode não ser perfil específico da CAA.",
    "REVIEW_INSTAGRAM_HANDLE_URL_MISMATCH": "Instagram precisa validação: handle e URL não coincidem.",
    "REVIEW_FACEBOOK_URL_WRONG_STATE": "Facebook precisa correção: URL aponta para outro estado.",
    "REVIEW_SITE_NOT_CAA_SPECIFIC": "Site precisa validação: pode ser portal da OAB, não da CAA.",
    "MISSING_SERVICE_LAYER": "Camada de serviços ainda não consolidada.",
}

with qa_csv.open("w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=[
            "raw_flag",
            "label_ptbr_sugerido",
            "label_ptbr_final",
        ],
    )
    writer.writeheader()
    for flag in sorted(raw_flags):
        writer.writerow({
            "raw_flag": flag,
            "label_ptbr_sugerido": suggestions.get(flag, ""),
            "label_ptbr_final": "",
        })

print(f"created: {services_csv}")
print(f"created: {qa_csv}")
print(f"profiles_rows: {len(profiles)}")
print(f"review_rows: {len(review)}")
print(f"raw_flags: {len(raw_flags)}")
