#!/usr/bin/env bash
# Genera le pagine della wiki GitHub a partire dai documenti del repository.
# Uso:  scripts/genera-wiki.sh <cartella-di-destinazione>
# La fonte di verità resta il repository: la wiki si rigenera, non si modifica a mano.
set -euo pipefail

OUT="${1:?Uso: $0 <cartella-di-destinazione>}"
REPO="https://github.com/MarcoDiGioia/claude-projects-starter"
BLOB="$REPO/blob/main"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$OUT"

# Converte i link relativi in link assoluti al repository.
# $1 = file sorgente, $2 = cartella del file rispetto alla radice (es. docs, moduli)
fix_links() {
  python3 - "$1" "$2" "$BLOB" <<'PY'
import re, sys, posixpath
src, base, blob = sys.argv[1:4]
text = open(src, encoding="utf-8").read()
def repl(m):
    label, url = m.group(1), m.group(2)
    if re.match(r"^(https?:|#|mailto:)", url):
        return m.group(0)
    path, _, frag = url.partition("#")
    full = posixpath.normpath(posixpath.join(base, path))
    return f"[{label}]({blob}/{full}" + (f"#{frag}" if frag else "") + ")"
print(re.sub(r"\[([^\]]+)\]\(([^)]+)\)", repl, text), end="")
PY
}

fix_links "$ROOT/docs/manuale.md"      docs   > "$OUT/Manuale.md"
fix_links "$ROOT/docs/proposta-moduli.md" docs > "$OUT/Idea-e-scelte-di-progetto.md"
fix_links "$ROOT/moduli/README.md"     moduli > "$OUT/Procedura-di-Claude.md"
fix_links "$ROOT/moduli/SELEZIONE.md"  moduli > "$OUT/Selezione-dei-moduli.md"
# Il catalogo rimanda alle pagine dei moduli della wiki
fix_links "$ROOT/moduli/CATALOGO.md"   moduli \
  | sed -E "s#\]\($BLOB/moduli/([a-z0-9-]+)/modulo.md\)#](Modulo-\1)#g" > "$OUT/Catalogo-moduli.md"

# Una pagina per modulo: titolo, dati della testata e corpo della scheda
for dir in "$ROOT"/moduli/*/; do
  id="$(basename "$dir")"
  [ -f "$dir/modulo.md" ] || continue
  python3 - "$dir/modulo.md" "$id" "$BLOB" > "$OUT/Modulo-$id.md" <<'PY'
import re, sys, posixpath
src, mid, blob = sys.argv[1:4]
text = open(src, encoding="utf-8").read()
m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
head, body = (m.group(1), m.group(2)) if m else ("", text)
meta = {}
for line in head.splitlines():
    k, _, v = line.partition(":")
    meta[k.strip()] = v.split("#")[0].strip().strip("[]")
def link(m):
    label, url = m.group(1), m.group(2)
    if re.match(r"^(https?:|#|mailto:)", url):
        return m.group(0)
    path, _, frag = url.partition("#")
    full = posixpath.normpath(posixpath.join("moduli", mid, path))
    return f"[{label}]({blob}/{full}" + (f"#{frag}" if frag else "") + ")"
body = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link, body)
out = [f"# {mid}", ""]
if meta.get("descrizione"):
    out += [meta["descrizione"], ""]
rows = [("Quando usarlo", "quando_usarlo"), ("Quando no", "quando_no"),
        ("Richiede", "richiede"), ("Conflitti", "conflitti"),
        ("Azioni esterne", "azioni_esterne"), ("Versione", "versione")]
out += ["| | |", "|---|---|"]
for label, key in rows:
    if meta.get(key) and meta[key] not in ("mai",):
        out.append(f"| {label} | {meta[key]} |")
out += ["", f"Riferimenti del modulo: [{blob.rsplit('/blob',1)[0]}/tree/main/moduli/{mid}]({blob.rsplit('/blob',1)[0]}/tree/main/moduli/{mid})", ""]
print("\n".join(out) + "\n" + body.lstrip("\n"), end="")
PY
done

cat > "$OUT/Home.md" <<HOME
# claude-projects-starter

Un cestino di **moduli per Claude**, pensato per lavorare con [Claude Code](https://claude.ai/code). I moduli sono indicazioni e riferimenti che Claude legge quando servono, come skill che si carica da sé al bisogno. Il repository non si clona e non entra nei progetti: Claude legge solo i file che servono e scrive nel progetto soltanto ciò che serve. Descrivi il progetto, Claude sceglie i moduli giusti, ti mostra il piano e, dopo il tuo ok, ne applica quanto serve.

- [[Manuale]]: come usarlo in progetti nuovi e già avviati
- [[Procedura di Claude]]: come Claude legge e applica i moduli
- [[Catalogo moduli]]: l'elenco dei moduli, con una pagina per ciascuno
- [[Selezione dei moduli]]: come Claude sceglie i moduli dalla descrizione
- [[Idea e scelte di progetto]]: perché è fatto così

Licenza: GNU GPL v3. Fonte di verità: [$REPO]($REPO). Questa wiki è generata con \`scripts/genera-wiki.sh\`: le modifiche si fanno nel repository, non qui.
HOME

cat > "$OUT/_Sidebar.md" <<SIDE
**claude-projects-starter**

- [[Home]]
- [[Manuale]]
- [[Procedura di Claude]]
- [[Catalogo moduli]]
- [[Selezione dei moduli]]
- [[Idea e scelte di progetto]]
- [Repository]($REPO)
SIDE

echo "Wiki generata in $OUT"
