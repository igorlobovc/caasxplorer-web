from pathlib import Path
import csv
import json

ROOT = Path("/Users/igorcunha/Downloads/Kimi_Agent_CAA交互式报告/caixas-xplorer-web")
COPY = ROOT / "docs" / "_copy_review"
PUB = ROOT / "public" / "data"

services_csv = COPY / "services_ptbr_translation_queue.csv"
qa_csv = COPY / "qa_flags_humanization_queue.csv"

uf_profiles_path = PUB / "uf_profiles_seed.json"
estados_cards_path = PUB / "estados_cards.json"
review_queue_path = PUB / "review_queue.json"

uf_profiles = json.loads(uf_profiles_path.read_text(encoding="utf-8"))
estados_cards = json.loads(estados_cards_path.read_text(encoding="utf-8"))
review_queue = json.loads(review_queue_path.read_text(encoding="utf-8"))

# ----------------------------
# load translation updates
# ----------------------------
service_updates = {}
with services_csv.open(encoding="utf-8") as f:
    for row in csv.DictReader(f):
        uf = (row.get("uf") or "").strip()
        novo = (row.get("resumo_ptbr_novo") or "").strip()
        if uf and novo:
            service_updates[uf] = novo

qa_labels = {}
with qa_csv.open(encoding="utf-8") as f:
    for row in csv.DictReader(f):
        raw = (row.get("raw_flag") or "").strip()
        final = (row.get("label_ptbr_final") or "").strip()
        if raw and final:
            qa_labels[raw] = final

def short_text(v, limit=220):
    v = (v or "").strip()
    if len(v) <= limit:
        return v
    return v[:limit].rsplit(" ", 1)[0] + "..."

# ----------------------------
# apply service PT-BR updates
# ----------------------------
for row in uf_profiles:
    uf = row.get("uf", "")
    if uf in service_updates:
        row["servicos"]["resumo_ptbr"] = service_updates[uf]

for row in estados_cards:
    uf = row.get("uf", "")
    if uf in service_updates:
        row["resumo_curto_ptbr"] = short_text(service_updates[uf], 220)

# ----------------------------
# apply human-readable QA labels
# ----------------------------
for row in uf_profiles:
    flags = row.get("qa", {}).get("review_flags", [])
    if flags:
        labels = [qa_labels.get(flag, flag) for flag in flags]
        row["qa"]["observacao_ptbr"] = "Pendência de validação: " + " | ".join(labels)

for row in review_queue:
    raw = (row.get("review_flag") or "").strip()
    if raw:
        flags = [f for f in raw.split(";") if f]
        labels = [qa_labels.get(flag, flag) for flag in flags]
        row["review_label_ptbr"] = " | ".join(labels)

# ----------------------------
# save
# ----------------------------
uf_profiles_path.write_text(json.dumps(uf_profiles, indent=2, ensure_ascii=False), encoding="utf-8")
estados_cards_path.write_text(json.dumps(estados_cards, indent=2, ensure_ascii=False), encoding="utf-8")
review_queue_path.write_text(json.dumps(review_queue, indent=2, ensure_ascii=False), encoding="utf-8")

print(f"service_updates_applied: {len(service_updates)}")
print(f"qa_labels_applied: {len(qa_labels)}")
print(f"updated: {uf_profiles_path}")
print(f"updated: {estados_cards_path}")
print(f"updated: {review_queue_path}")
