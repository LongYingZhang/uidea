import fs from 'node:fs';

const OUT = '/Users/zhanglongyingdemacbookairm4/Desktop/Uidea-Profile-作品.svg';
const W = 1063;
const H = 716;
const OFFSET_X = 20;
const OFFSET_Y = 6;

const list = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const target = list.find((t) => t.type === 'page');
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
await new Promise((r) => (ws.onopen = r));
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result ?? msg.error); pending.delete(msg.id); }
};
const send = (m, p = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 700));
  return r.result?.value;
};

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 2, mobile: false });
await send('Page.navigate', { url: 'http://127.0.0.1:5273/' });
await new Promise((r) => setTimeout(r, 1600));
await evaluate("localStorage.setItem('uidea.user','demo@example.com'); localStorage.setItem('uidea.sidebar.expanded','0');");
await send('Page.navigate', { url: 'http://127.0.0.1:5273/#/profile' });
await new Promise((r) => setTimeout(r, 2800));
await evaluate("(()=>{const st=document.createElement('style');st.textContent='aside,[data-sidebar]{display:none!important} main,footer{padding-left:0!important}';document.head.appendChild(st);return 1})()");
await new Promise((r) => setTimeout(r, 500));

const data = await evaluate(`(() => {
  const W = 1063, H = 716;
  const num = v => Math.round(v*100)/100;
  const cs = el => getComputedStyle(el);
  const rect = el => { const r = el.getBoundingClientRect(); return {x:num(r.x),y:num(r.y),w:num(r.width),h:num(r.height)}; };

  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const toRGBA = (str) => {
    if (!str || str === 'transparent' || str === 'none') return null;
    cx.clearRect(0,0,1,1);
    cx.fillStyle = '#000000';
    try { cx.fillStyle = str; } catch (e) { return null; }
    cx.fillRect(0,0,1,1);
    const d = cx.getImageData(0,0,1,1).data;
    if (d[3] === 0) return null;
    return { r:d[0], g:d[1], b:d[2], a: Math.round((d[3]/255)*1000)/1000 };
  };

  const labelOf = el => (el.textContent || '').replace(/\\s+/g,' ').trim().slice(0, 16);

  const nodes = [];
  const icons = [];
  const walk = (el, sec) => {
    const tag = el.tagName;
    if (el.namespaceURI === 'http://www.w3.org/2000/svg') {
      const isSvgRoot = tag.toLowerCase() === 'svg';
      const rr = el.getBoundingClientRect();
      if (isSvgRoot && rr.width > 0 && rr.height > 0 && rr.y < H - 2 && !(rr.x < 110 && rr.y < 30)) {
        icons.push({ section: sec, x:Math.round(rr.x*100)/100, y:Math.round(rr.y*100)/100, w:rr.width, h:rr.height,
          color: getComputedStyle(el).color, sw: getComputedStyle(el).strokeWidth, fill: getComputedStyle(el).fill, html: el.innerHTML });
      }
      return;
    }
    if (tag === 'SCRIPT' || tag === 'STYLE') return;
    const s = cs(el);
    if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return;
    if (s.position === 'fixed') return;              // 页面装饰条
    if (el.closest('aside')) return;                 // 侧栏
    if (tag === 'IMG' && (el.alt === 'Uidea' || /uidea-logo/.test(el.src || ''))) return;

    const r = rect(el);
    const emit = r.w > 2 && r.h > 2 && r.y < H - 2 && r.x < W - 2;

    if (emit) {
      if (el.matches('nav[aria-label="个人资料分栏"]')) sec = 'Tabs';
      else if (el.matches('nav[aria-label="作品分类"]')) sec = 'Sub Tabs';

      const bg = toRGBA(s.backgroundColor);
      const bwRaw = parseFloat(s.borderTopWidth) || 0;
      const bc = toRGBA(s.borderTopColor);
      const hasBorder = bwRaw > 0 && bc && s.borderTopStyle !== 'none' && s.borderTopStyle !== 'hidden';
      let radius = parseFloat(s.borderTopLeftRadius) || 0;
      if (radius >= 9000) radius = Math.min(r.w, r.h) / 2;

      if (bg || hasBorder) {
        nodes.push({ k:'box', section: sec, x:r.x, y:r.y, w:r.w, h:r.h, bg,
          bw: hasBorder ? bwRaw : 0, bc: hasBorder ? bc : null, radius,
          name: tag.toLowerCase() + (labelOf(el) ? ' · ' + labelOf(el) : '') });
      }

      if (tag === 'IMG') {
        const ps = el.parentElement ? cs(el.parentElement) : null;
        let pr = ps ? parseFloat(ps.borderTopLeftRadius) || 0 : 0;
        if (pr >= 9000) pr = Math.min(r.w, r.h) / 2;
        const clip = ps && ps.overflow === 'hidden';
        const rad = clip ? pr : 0;
        // 在浏览器里直接裁好圆角，导出 PNG，避免 Figma 丢失 clip-path
        let uri = null;
        try {
          const sc = 2;
          const c2 = document.createElement('canvas');
          c2.width = Math.max(1, Math.round(r.w * sc));
          c2.height = Math.max(1, Math.round(r.h * sc));
          const g2 = c2.getContext('2d');
          g2.save();
          const rr = rad * sc, w2 = c2.width, h2 = c2.height;
          if (rr > 0) {
            g2.beginPath();
            g2.moveTo(rr, 0);
            g2.lineTo(w2 - rr, 0); g2.quadraticCurveTo(w2, 0, w2, rr);
            g2.lineTo(w2, h2 - rr); g2.quadraticCurveTo(w2, h2, w2 - rr, h2);
            g2.lineTo(rr, h2); g2.quadraticCurveTo(0, h2, 0, h2 - rr);
            g2.lineTo(0, rr); g2.quadraticCurveTo(0, 0, rr, 0);
            g2.closePath();
            g2.clip();
          }
          g2.drawImage(el, 0, 0, w2, h2);
          g2.restore();
          uri = c2.toDataURL('image/png');
        } catch (e) { uri = null; }
        nodes.push({ k:'img', section: sec, x:r.x, y:r.y, w:r.w, h:r.h,
          radius: rad, uri, src: el.currentSrc || el.src, alt: el.alt || '' });
      }

      if (tag === 'INPUT' && el.placeholder) {
        nodes.push({ k:'text', section: sec, text: el.placeholder, x:r.x + 14, y:r.y, h:r.h,
          size: parseFloat(s.fontSize), weight: s.fontWeight, color: toRGBA(s.color),
          ls: s.letterSpacing, family: s.fontFamily, vcenter: true });
      }

      for (const n of el.childNodes) {
        if (n.nodeType !== 3) continue;
        const raw = n.textContent.replace(/\\s+/g, ' ');
        if (!raw.trim()) continue;
        const rg = document.createRange();
        rg.selectNodeContents(n);
        const rr = rg.getBoundingClientRect();
        if (rr.width <= 0 || rr.height <= 0) continue;
        nodes.push({ k:'text', section: sec, text: raw.trim(), x:num(rr.x), y:num(rr.y), w:num(rr.width), h:num(rr.height),
          size: parseFloat(s.fontSize), weight: s.fontWeight, color: toRGBA(s.color),
          ls: s.letterSpacing, family: s.fontFamily });
      }
    }

    for (const c of el.children) walk(c, sec);
  };
  walk(document.querySelector('#root'), 'Base');


  return JSON.stringify({ nodes, icons });
})()`);

const { nodes, icons } = JSON.parse(data);
console.log('nodes', nodes.length, 'icons', icons.length);

const imgCache = new Map();
async function dataUri(src) {
  if (imgCache.has(src)) return imgCache.get(src);
  const res = await fetch(src);
  const buf = Buffer.from(await res.arrayBuffer());
  const uri = `data:image/png;base64,${buf.toString('base64')}`;
  imgCache.set(src, uri);
  return uri;
}

const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const hex = (c) => `#${[c.r,c.g,c.b].map(v => Math.round(v).toString(16).padStart(2,'0')).join('')}`;
const fam = (f) => f ? f.split(',').map(s => s.trim().replace(/^"|"$/g,'')).filter(s => s && s !== 'sans-serif').slice(0,2).join(', ') : 'Noto Sans SC';

const defs = [];
let clipN = 0;
const groups = new Map();
let rowIdx = 0;
let lastRowTop = -999;

function bandOf(y) {
  if (y < 300) return 'Header';
  if (y < 386) return 'Tabs';
  if (y < 432) return 'Sub Tabs';
  if (y < 492) return 'Toolbar';
  return 'Work List';
}

const rowTops = [...new Set(nodes.filter(n => n.k === 'img' && !n.alt).map(n => Math.round(n.y)))].sort((a,b) => a-b);

function push(node, markup) {
  let sec = node.section;
  if (!sec || sec === 'Base') sec = bandOf(node.y);
  // 大容器（列表/背景）统一放底层，保证叠放顺序正确
  if (node.h > 180) sec = 'Base';
  if (sec === 'Work List') {
    const above = rowTops.filter(t => t <= node.y + 3).length;
    const idx = Math.max(1, above);
    sec = `Work Item ${String(idx).padStart(2,'0')}`;
  }
  if (!groups.has(sec)) groups.set(sec, []);
  groups.get(sec).push(markup);
}

for (const n of nodes) {
  if (n.k === 'box') {
    if (n.w >= W - 2 && n.h >= H - 2) continue;
    let s = `<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}"${n.radius ? ` rx="${Math.round(n.radius*100)/100}"` : ''} fill="${n.bg ? hex(n.bg) : 'none'}"`;
    if (n.bg && n.bg.a < 1) s += ` fill-opacity="${n.bg.a}"`;
    if (n.bw > 0 && n.bc) {
      s += ` stroke="${hex(n.bc)}" stroke-width="${n.bw}"`;
      if (n.bc.a < 1) s += ` stroke-opacity="${n.bc.a}"`;
    }
    s += '/>';
    const nm = (n.name || '').replace(/^(div|span|button|a|p|h1|nav|section|header)\s*·?\s*/,'').trim();
    push(n, `<g id="${esc(('Box · ' + (nm || 'Surface')).slice(0,44))}">${s}</g>`);
  } else if (n.k === 'img') {
    const uri = n.uri || (await dataUri(n.src));
    push(n, `<g id="Image · ${esc(n.alt || 'cover')}"><image x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" preserveAspectRatio="xMidYMid slice" xlink:href="${uri}"/></g>`);
  } else if (n.k === 'text') {
    const y = n.vcenter ? n.y + n.h/2 + n.size*0.35 : n.y + n.h*0.79;
    const ls = n.ls && n.ls !== 'normal' ? ` letter-spacing="${parseFloat(n.ls)}"` : '';
    const fill = n.color ? hex(n.color) : '#ffffff';
    const fo = n.color && n.color.a < 1 ? ` fill-opacity="${n.color.a}"` : '';
    push(n, `<text id="${esc(('Text · ' + n.text).slice(0,44))}" x="${n.x}" y="${Math.round(y*100)/100}" font-family="${esc(fam(n.family))}" font-size="${n.size}" font-weight="${n.weight}" fill="${fill}"${fo}${ls}>${esc(n.text)}</text>`);
  }
}

let iconN = 0;
for (const ic of icons) {
  iconN += 1;
  const inner = ic.html.replace(/currentColor/g, ic.color || '#ffffff').replace(/<svg[^>]*>/g,'').replace(/<\/svg>/g,'');
  const fillAttr = (ic.fill === 'none' || ic.fill === 'rgba(0, 0, 0, 0)') ? 'none' : (ic.color || '#fff');
  const g = `<g id="Icon ${String(iconN).padStart(2,'0')}" transform="translate(${ic.x} ${ic.y})" fill="${fillAttr}" stroke="${ic.color || 'none'}" stroke-width="${ic.sw || 1.5}" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
  push(ic, g);
}

const order = ['Base', 'Header', 'Tabs', 'Sub Tabs', 'Toolbar'];
const rank = (n) => {
  const i = order.indexOf(n);
  if (i !== -1) return i;
  const m = n.match(/Work Item (\d+)/);
  if (m) return 100 + Number(m[1]);
  return 999;
};
const names = [...groups.keys()].sort((a,b) => rank(a) - rank(b));

const body = names.map(name => {
  const items = groups.get(name);
  const items2 = items.map(x => '    ' + x).join('\n');
  return `  <g id="${esc(name)}">\n${items2}\n  </g>`;
}).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <title>Uidea · 个人资料 / 作品</title>
  <defs>
${defs.map(d => '    ' + d).join('\n')}
  </defs>
  <g id="Canvas">
    <rect id="Canvas Background" x="0" y="0" width="${W}" height="${H}" fill="#0b0b0b"/>
    <rect id="Panel Surface" x="12" y="12" width="${W - 24}" height="${H - 24}" rx="16" fill="#131313"/>
    <g id="Page — 个人资料 / 作品" transform="translate(${OFFSET_X} ${OFFSET_Y})">
${body}
    </g>
  </g>
</svg>
`;

fs.writeFileSync(OUT, svg, 'utf8');
console.log('WROTE', svg.length, 'bytes ->', OUT);
ws.close();
