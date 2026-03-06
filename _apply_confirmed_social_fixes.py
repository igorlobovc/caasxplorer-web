from pathlib import Path
import json
import csv

ROOT = Path("/Users/igorcunha/Downloads/Kimi_Agent_CAA交互式报告/caixas-xplorer-web")
PUB = ROOT / "public" / "data"
CTX = ROOT / "context_archive"

# ---------- paths ----------
estados_index_path = PUB / "estados_index.json"
estados_cards_path = PUB / "estados_cards.json"
uf_profiles_path = PUB / "uf_profiles_seed.json"
review_queue_path = PUB / "review_queue.json"

registry_csv_path = CTX / "caa_registry_final_patched_v2.csv"
review_csv_path = CTX / "caa_registry_review_needed_patched_v2.csv"

# ---------- load ----------
estados_index = json.loads(estados_index_path.read_text(encoding="utf-8"))
estados_cards = json.loads(estados_cards_path.read_text(encoding="utf-8"))
uf_profiles = json.loads(uf_profiles_path.read_text(encoding="utf-8"))

with registry_csv_path.open(encoding="utf-8") as f:
    registry_rows = list(csv.DictReader(f))
    registry_fieldnames = list(registry_rows[0].keys()) if registry_rows else []

# ---------- helpers ----------
def remove_flag(flag_string: str, flag_to_remove: str) -> str:
    flags = [f for f in (flag_string or "").split(";") if f and f != flag_to_remove]
    seen = []
    for f in flags:
        if f not in seen:
            seen.append(f)
    return ";".join(seen)

def flags_list(flag_string: str):
    return [f for f in (flag_string or "").split(";") if f]

def set_row_values(row, updates):
    for k, v in updates.items():
        row[k] = v

# ---------- confirmed fixes ----------
confirmed = {
    "RR": {
        "instagram_handle": "@caaroraima",
        "instagram_url": "https://www.instagram.com/caaroraima/?hl=pt",
        "remove_flag": "REVIEW_INSTAGRAM_HANDLE_URL_MISMATCH",
    },
    "SP": {
        "facebook_handle": "oabcaasp",
        "facebook_url": "https://web.facebook.com/oabcaasp",
        "remove_flag": "REVIEW_FACEBOOK_URL_WRONG_STATE",
    },
    "RJ": {
        "instagram_handle": "@oabrjcaarj",
        "instagram_url": "https://www.instagram.com/oabrjcaarj/",
        "remove_flag": "REVIEW_INSTAGRAM_HANDLE_URL_MISMATCH",
    },
    "ES": {
        "facebook_handle": "caixadeassistenciacaaes",
        "facebook_url": "https://web.facebook.com/caixadeassistenciacaaes",
        "remove_flag": "REVIEW_FACEBOOK_NOT_CAA_SPECIFIC",
    },
}

# ---------- patch estados_index ----------
for row in estados_index:
    uf = row["uf"]
    if uf in confirmed:
        fix = confirmed[uf]
        for field in ["instagram_handle", "instagram_url", "facebook_handle", "facebook_url"]:
            if field in fix:
                row[field] = fix[field]
        row["review_flag"] = remove_flag(row.get("review_flag", ""), fix["remove_flag"])
        row["review_flags"] = flags_list(row["review_flag"])
        row["has_review_flag"] = len(row["review_flags"]) > 0

# ---------- patch estados_cards ----------
for row in estados_cards:
    uf = row["uf"]
    if uf in confirmed:
        fix = confirmed[uf]
        if "instagram_url" in fix:
            row["instagram_url"] = fix["instagram_url"]
        if "facebook_url" in fix:
            row["facebook_url"] = fix["facebook_url"]

# ---------- patch uf_profiles ----------
for row in uf_profiles:
    uf = row["uf"]
    if uf in confirmed:
        fix = confirmed[uf]

        if "instagram_handle" in fix:
            # no dedicated handle field in links block, only URL there
            pass
        if "instagram_url" in fix:
            row["links"]["instagram"] = fix["instagram_url"]
        if "facebook_url" in fix:
            row["links"]["facebook"] = fix["facebook_url"]

        row["qa"]["review_flag"] = remove_flag(row["qa"].get("review_flag", ""), fix["remove_flag"])
        row["qa"]["review_flags"] = flags_list(row["qa"]["review_flag"])

        if row["qa"]["review_flags"]:
            row["qa"]["observacao_ptbr"] = "Perfil pronto para uso como seed do front-end. Validar manualmente antes da publicação final se houver flags de revisão."
        else:
            row["qa"]["observacao_ptbr"] = "Perfil sem pendências críticas de QA nesta etapa."

# ---------- patch registry csv ----------
for row in registry_rows:
    uf = row["uf"]
    if uf in confirmed:
        fix = confirmed[uf]
        for field in ["instagram_handle", "instagram_url", "facebook_handle", "facebook_url"]:
            if field in fix:
                row[field] = fix[field]
        row["review_flag"] = remove_flag(row.get("review_flag", ""), fix["remove_flag"])

# ---------- rebuild review queue ----------
review_queue = []
review_csv_rows = []

for row in registry_rows:
    if flags_list(row.get("review_flag", "")):
        review_csv_rows.append(row)
        review_queue.append({
            "uf": row["uf"],
            "estado": row["estado"],
            "caa_nome": row["caa_nome"],
            "review_flag": row["review_flag"],
            "site_oficial": row["site_oficial"],
            "instagram_url": row["instagram_url"],
            "facebook_url": row["facebook_url"],
            "app_disponivel": row["app_disponivel"],
        })

# ---------- save ----------
estados_index_path.write_text(json.dumps(estados_index, indent=2, ensure_ascii=False), encoding="utf-8")
estados_cards_path.write_text(json.dumps(estados_cards, indent=2, ensure_ascii=False), encoding="utf-8")
uf_profiles_path.write_text(json.dumps(uf_profiles, indent=2, ensure_ascii=False), encoding="utf-8")
review_queue_path.write_text(json.dumps(review_queue, indent=2, ensure_ascii=False), encoding="utf-8")

with registry_csv_path.open("w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=registry_fieldnames)
    writer.writeheader()
    writer.writerows(registry_rows)

with review_csv_path.open("w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=registry_fieldnames)
    writer.writeheader()
    writer.writerows(review_csv_rows)

print("patched public/data and context_archive")
print(f"review_queue_count: {len(review_queue)}")
