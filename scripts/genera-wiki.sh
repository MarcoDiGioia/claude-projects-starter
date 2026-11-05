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

fix_links "$ROOT/docs/manuale.md"   docs   > "$OUT/Manuale.md"
fix_links "$ROOT/moduli/CATALOGO.md" moduli > "$OUT/Catalogo-moduli.md"
fix_links "$ROOT/moduli/SELEZIONE.md" moduli > "$OUT/Selezione-dei-moduli.md"
fix_links "$ROOT/SECURITY.md" .            > "$OUT/Sicurezza.md"

cat > "$OUT/Home.md" <<HOME
# claude-projects-starter

Un cestino di **moduli di configurazione riutilizzabili** per i tuoi progetti software, pensato per lavorare con [Claude Code](https://claude.ai/code). Descrivi il progetto, Claude sceglie i moduli giusti, ti mostra il piano e, dopo il tuo ok, li applica.

- [[Manuale]]: come usarlo in progetti nuovi e già avviati
- [[Catalogo moduli]]: l'elenco dei moduli
- [[Selezione dei moduli]]: come Claude sceglie i moduli dalla descrizione
- [[Sicurezza]]: segreti, segnalazioni, principi

Codice e fonte di verità: [$REPO]($REPO). Questa wiki è generata con \`scripts/genera-wiki.sh\`: le modifiche si fanno nel repository, non qui.
HOME

cat > "$OUT/_Sidebar.md" <<SIDE
**claude-projects-starter**

- [[Home]]
- [[Manuale]]
- [[Catalogo moduli]]
- [[Selezione dei moduli]]
- [[Sicurezza]]
- [Repository]($REPO)
SIDE

echo "Wiki generata in $OUT"
