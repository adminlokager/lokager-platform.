from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

f = TTFont("/app/scripts/Montserrat-SemiBold.ttf")
gs = f.getGlyphSet()
cmap = f.getBestCmap()
UPM = 1000
CAP = 700
TRACK = 120  # letter spacing in font units (~0.12em)


def glyph_path(name, x, scale=1.0, dy=0):
    pen = SVGPathPen(gs)
    # flip y (font y-up -> svg y-down), baseline at y=CAP
    tp = TransformPen(pen, (scale, 0, 0, -scale, x, CAP + dy))
    gs[name].draw(tp)
    return pen.getCommands(), gs[name].width * scale


x = 0
letters = []
for ch in "LOK":
    d, adv = glyph_path(cmap[ord(ch)], x)
    letters.append(d)
    x += adv + TRACK

# custom "house A": apex at cap height, legs to baseline, window in place of crossbar
a_w = gs[cmap[ord("A")]].width
stem = 118
half = a_w / 2
ax = x
apex = (ax + half, 0)
# outer triangle legs
d_a = (
    f"M{ax},{CAP} L{ax+stem},{CAP} L{ax+half},{stem*0.95} L{ax+a_w-stem},{CAP} L{ax+a_w},{CAP} "
    f"L{ax+half+stem*0.62},0 L{ax+half-stem*0.62},0 Z"
)
win = 112
d_win = f"M{ax+half-win/2},{CAP-win-90} h{win} v{win} h-{win} Z"
x += a_w + TRACK

for ch in "GER":
    d, adv = glyph_path(cmap[ord(ch)], x)
    letters.append(d)
    x += adv + TRACK

x -= TRACK
word_w = x
# trademark, small, top aligned
tm_scale = 0.34
d_tm, tm_adv = glyph_path(cmap[ord("™")], x + 40, tm_scale, dy=-CAP + CAP * tm_scale + 10)
total_w = x + 40 + tm_adv
# hmm: dy shifts baseline; recompute: baseline for tm at y = CAP*tm_scale + 10 -> top of tm ~ 10
print("WIDTH", round(total_w), "WORD", round(word_w))
svg = f"""export const WORDMARK_VIEWBOX = "0 0 {round(total_w)} {CAP}";
export const WORDMARK_LETTERS = "{' '.join(letters)}";
export const WORDMARK_A = "{d_a}";
export const WORDMARK_A_WINDOW = "{d_win}";
export const WORDMARK_TM = "{d_tm}";
"""
open("/app/frontend/src/components/brand/wordmarkPaths.js", "w").write(svg)
