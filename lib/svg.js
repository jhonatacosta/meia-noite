// Ilustrações vetoriais em string (renderizadas com dangerouslySetInnerHTML).

const HAIR_BACK = {
  long_blond: '<path d="M26 52 C22 20 78 20 74 52 L78 92 L22 92 Z" fill="#c9b37a"/>',
  long_red: '<path d="M24 50 C20 16 80 16 76 50 L80 86 L20 86 Z" fill="#b5462a"/>',
};
const HAIR_TOP = {
  long_blond: '<path d="M30 40 C34 22 66 22 70 40 C60 30 40 30 30 40Z" fill="#c9b37a"/>',
  long_red: '<path d="M29 42 C33 20 67 20 71 42 C60 30 40 30 29 42Z" fill="#b5462a"/>',
  brown: '<path d="M29 44 C27 18 73 18 71 44 C66 32 58 30 50 30 C42 30 33 34 29 44Z" fill="#4a3424"/>',
  grey: '<path d="M30 42 C30 22 70 22 70 42 C64 34 36 34 30 42Z" fill="#9a9a9a"/>',
  black: '<path d="M27 52 C22 20 78 20 73 52 C70 40 66 34 50 33 C34 34 30 40 27 52Z" fill="#151515"/>',
  bald: '<ellipse cx="50" cy="34" rx="16" ry="7" fill="#6d6d6d"/>',
};

export function avatar(hair) {
  return `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${HAIR_BACK[hair] || ''}<ellipse cx="50" cy="48" rx="20" ry="24" fill="#3a3f47"/><path d="M8 120 C10 92 28 80 50 80 C72 80 90 92 92 120 Z" fill="#2a2e35"/><rect x="42" y="66" width="16" height="16" fill="#3a3f47"/>${HAIR_TOP[hair] || ''}</svg>`;
}

export function cctvFrame(n, enhanced) {
  const base = '<g stroke="#3e4440" fill="none"><path d="M0 220 L120 90 L200 90 L320 220"/><path d="M0 0 L120 90 M320 0 L200 90"/><rect x="120" y="40" width="80" height="50"/></g>';
  const door = '<rect x="232" y="70" width="40" height="110" fill="#2a2f2b" stroke="#555" transform="skewY(18) translate(0,-78)"/>';
  const ts = ['', '22:47:10', '22:58:14', '23:01:02'][n];
  let fig = '';
  if (n === 1) fig = door + '<ellipse cx="225" cy="96" rx="9" ry="11" fill="#7c807d"/><rect x="211" y="106" width="28" height="56" rx="6" fill="#3d403e"/><rect x="214" y="160" width="9" height="34" fill="#3d403e"/><rect x="227" y="160" width="9" height="34" fill="#3d403e"/>';
  if (n === 2) {
    fig = door + '<ellipse cx="213" cy="100" rx="8" ry="10" fill="#6a6d6b"/><circle cx="213" cy="92" r="5" fill="#4a4c4b"/><rect x="200" y="109" width="26" height="40" rx="5" fill="#d9dbd9"/><rect x="202" y="148" width="22" height="36" fill="#2c2e2d"/><path d="M200 115 L190 125 L196 128" stroke="#d9dbd9" stroke-width="6" fill="none"/><path d="M226 116 L236 112 L236 118" stroke="#d9dbd9" stroke-width="6" fill="none"/><ellipse cx="243" cy="111" rx="15" ry="3" fill="#bfc2bf"/><path d="M243 108 l-3 -9 h6 z" fill="#9fa39f"/>';
    if (enhanced) fig += '<circle cx="190" cy="126" r="9" fill="none" stroke="#ff0" stroke-width="2"/><text x="140" y="146" fill="#ff0" font-size="11" font-family="monospace">MÃO ESQ.</text><circle cx="243" cy="111" r="17" fill="none" stroke="#0ff" stroke-width="2"/><text x="236" y="140" fill="#0ff" font-size="11" font-family="monospace">BANDEJA DIR.</text><line x1="183" y1="88" x2="183" y2="184" stroke="#f55" stroke-dasharray="3 2"/><text x="120" y="80" fill="#f55" font-size="11" font-family="monospace">≈1,66 m</text><circle cx="213" cy="90" r="8" fill="none" stroke="#f9f" stroke-width="2"/><text x="224" y="80" fill="#f9f" font-size="11" font-family="monospace">COQUE</text>';
  }
  if (n === 3) {
    fig = '<ellipse cx="150" cy="108" rx="10" ry="12" fill="#6a6d6b"/><circle cx="150" cy="98" r="6" fill="#4a4c4b"/><rect x="135" y="119" width="30" height="46" rx="5" fill="#d9dbd9"/><rect x="138" y="164" width="24" height="42" fill="#2c2e2d"/><path d="M136 124 L146 108" stroke="#d9dbd9" stroke-width="7"/><rect x="164" y="122" width="5" height="34" fill="#bfc2bf"/>';
    if (enhanced) fig += '<circle cx="146" cy="108" r="12" fill="none" stroke="#ff0" stroke-width="2"/><text x="40" y="104" fill="#ff0" font-size="11" font-family="monospace">MÃO ESQ. NO ROSTO</text><text x="174" y="142" fill="#0ff" font-size="11" font-family="monospace">bandeja: braço DIR.</text>';
  }
  return `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" style="background:#1a1d1b">${base}${fig}<text x="8" y="16" fill="#e8e8e8" font-family="monospace" font-size="11">12/09/2026 ${ts}</text><text x="252" y="16" fill="#e8e8e8" font-family="monospace" font-size="11">CAM-03</text><circle cx="302" cy="206" r="4" fill="#f33"/></svg>`;
}

export const PLANTA = `<svg viewBox="0 0 800 560" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="13">
<rect width="800" height="560" fill="#101418"/>
<rect x="150" y="10" width="440" height="50" fill="#16222c" stroke="#3a5566" stroke-dasharray="5 3"/><text x="370" y="40" text-anchor="middle" fill="#8fb3c8">TERRAÇO (mar) · sem câmera</text>
<rect x="20" y="60" width="130" height="110" fill="#1a1f25" stroke="#58606b" stroke-width="2"/><text x="85" y="118" text-anchor="middle" fill="#cfd4da">Biblioteca</text>
<rect x="20" y="170" width="130" height="170" fill="#1a1f25" stroke="#58606b" stroke-width="2"/><text x="85" y="240" text-anchor="middle" fill="#cfd4da">Hall</text><text x="85" y="258" text-anchor="middle" fill="#8b929a" font-size="11">escada · porta lateral</text>
<rect x="150" y="60" width="330" height="280" fill="#1d2228" stroke="#58606b" stroke-width="2"/><text x="315" y="200" text-anchor="middle" fill="#e8e4da" font-weight="700">SALÃO DO LEILÃO</text><rect x="235" y="70" width="160" height="30" fill="#2a3038"/><text x="315" y="90" text-anchor="middle" fill="#cfd4da" font-size="11">palco · projetor</text><rect x="440" y="120" width="34" height="120" fill="#2a3038"/><text x="457" y="185" text-anchor="middle" fill="#cfd4da" font-size="11" transform="rotate(-90 457 185)">bar</text>
<rect x="480" y="60" width="130" height="130" fill="#1a1f25" stroke="#58606b" stroke-width="2"/><text x="545" y="120" text-anchor="middle" fill="#cfd4da">Copa</text><text x="545" y="138" text-anchor="middle" fill="#8b929a" font-size="11">passa-pratos</text>
<rect x="610" y="10" width="175" height="180" fill="#2a1a1c" stroke="#e0313f" stroke-width="2"/><text x="697" y="80" text-anchor="middle" fill="#ffb3b9" font-weight="700">ESCRITÓRIO</text><rect x="650" y="30" width="95" height="24" fill="#4a3a30"/><circle cx="697" cy="70" r="9" fill="#e0313f"/><text x="697" y="110" text-anchor="middle" fill="#c9a0a4" font-size="11">cadeira de costas p/ porta</text>
<rect x="480" y="190" width="305" height="42" fill="#1b2430" stroke="#58606b" stroke-width="2"/><text x="640" y="216" text-anchor="middle" fill="#cfd4da">corredor de serviço →</text>
<rect x="480" y="232" width="110" height="80" fill="#1a1f25" stroke="#58606b" stroke-width="2"/><text x="535" y="270" text-anchor="middle" fill="#cfd4da" font-size="12">Vestiário</text><text x="535" y="286" text-anchor="middle" fill="#8b929a" font-size="10">paletós</text>
<rect x="590" y="232" width="90" height="80" fill="#1a1f25" stroke="#58606b" stroke-width="2"/><text x="635" y="266" text-anchor="middle" fill="#cfd4da" font-size="12">Lavabo de</text><text x="635" y="282" text-anchor="middle" fill="#cfd4da" font-size="12">serviço</text><line x1="680" y1="250" x2="680" y2="292" stroke="#4aa3d8" stroke-width="6"/>
<rect x="680" y="232" width="105" height="180" fill="#14251a" stroke="#3c6b47"/><text x="732" y="330" text-anchor="middle" fill="#9fd1a9" font-size="12">jardim lateral</text>
<rect x="300" y="380" width="130" height="70" fill="#1a1f25" stroke="#58606b" stroke-width="2"/><text x="365" y="420" text-anchor="middle" fill="#cfd4da" font-size="12">Monitoramento</text>
<rect x="430" y="380" width="250" height="110" fill="#1a1f25" stroke="#58606b" stroke-width="2"/><text x="555" y="440" text-anchor="middle" fill="#cfd4da">Garagem</text><line x1="680" y1="400" x2="680" y2="440" stroke="#4aa3d8" stroke-width="5"/>
<rect x="20" y="400" width="265" height="140" fill="#15181c" stroke="#58606b" stroke-dasharray="6 3"/><text x="152" y="470" text-anchor="middle" fill="#cfd4da">Estacionamento</text>
<g fill="#f2b33d" font-size="12" font-weight="700"><text x="26" y="188">▲ CAM-01</text><text x="390" y="332">▲ CAM-02</text><text x="490" y="208">▲ CAM-03 →</text><text x="520" y="80">✕ CAM-04</text><text x="440" y="398">▲ CAM-05</text><text x="200" y="418">▲ CAM-07</text></g>
</svg>`;

export const MANSAO = `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="mg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff8e0"/><stop offset="1" stop-color="#fff8e0" stop-opacity="0"/></radialGradient></defs>
<circle cx="320" cy="50" r="46" fill="url(#mg)" opacity=".5"/><circle cx="320" cy="50" r="20" fill="#f4ecd2"/>
<g fill="#0a0c0f"><path d="M40 190 L40 120 L120 80 L200 120 L200 190 Z"/><rect x="200" y="110" width="150" height="80"/><path d="M190 112 L275 70 L360 112 Z"/><rect x="250" y="56" width="14" height="30"/></g>
<g class="win"><rect x="70" y="135" width="18" height="22" fill="#f2b33d"/><rect x="110" y="135" width="18" height="22" fill="#f2b33d"/><rect x="150" y="135" width="18" height="22" fill="#f2b33d"/><rect x="225" y="130" width="22" height="20" fill="#f2b33d"/><rect x="265" y="130" width="22" height="20" fill="#f2b33d"/><rect x="310" y="130" width="22" height="20" fill="#e0313f" class="esc"/></g>
<rect x="0" y="190" width="400" height="70" fill="#0d1a24"/>
<g class="waves" stroke="#2c5a78" stroke-width="2" fill="none"><path d="M-40 205 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/><path d="M-20 225 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/><path d="M-40 245 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/></g>
</svg>`;

export const TACA = `<svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg"><path d="M20 20 Q20 80 60 90 Q100 80 100 20 Z" fill="none" stroke="#e8e4da" stroke-width="3"/><path d="M26 56 Q32 82 60 86 Q88 82 94 56 Z" fill="#b8742a" opacity=".85"/><line x1="60" y1="90" x2="60" y2="140" stroke="#e8e4da" stroke-width="3"/><ellipse cx="60" cy="144" rx="30" ry="6" fill="none" stroke="#e8e4da" stroke-width="3"/></svg>`;
