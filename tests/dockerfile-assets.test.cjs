// Comprueba que la imagen de despliegue incluya cada página y recurso local
// que enlazan los HTML. Evita los 404 de producción (páginas, devbrain-prose.*, src/).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const dockerfile = fs.readFileSync(path.join(root, 'Dockerfile'), 'utf8');
const dockerignore = fs.readFileSync(path.join(root, '.dockerignore'), 'utf8');
const pages = fs.readdirSync(root).filter((f) => f.endsWith('.html'));

// Fuentes copiadas a /usr/share/nginx/html/ por instrucciones COPY.
const copied = dockerfile
  .split(/\r?\n/)
  .filter((l) => /^COPY\s/i.test(l) && l.includes('/usr/share/nginx/html'))
  .flatMap((l) => l.trim().split(/\s+/).slice(1, -1));

function isShipped(ref) {
  return copied.some((src) => {
    if (src === ref) return true;
    if (src.endsWith('/') && ref.startsWith(src)) return true;
    if (src.includes('*')) {
      const re = new RegExp('^' + src.replace(/\./g, '\\.').replace(/\*/g, '[^/]*') + '$');
      return re.test(ref);
    }
    return false;
  });
}

function localRefs(html) {
  const refs = new Set();
  for (const m of html.matchAll(/\b(?:href|src)="([^"#?]+)/g)) {
    const ref = m[1];
    if (/^(?:[a-z]+:|\/\/)/i.test(ref)) continue;
    refs.add(ref.replace(/^\.\//, ''));
  }
  return [...refs];
}

test('isShipped: reconoce archivo exacto, carpeta y comodín, y rechaza lo ausente', () => {
  assert.equal(copied.length > 0, true);
  assert.equal(isShipped('index.html'), true);
  assert.equal(isShipped('src/shared/crttl-evaluator.js'), true);
  assert.equal(isShipped('no-existe.png'), false);
});

test('Dockerfile copia todas las páginas HTML del portal', () => {
  for (const page of pages) assert.ok(isShipped(page), `Falta ${page} en la imagen`);
});

test('Dockerfile copia cada recurso local enlazado y ese recurso existe', () => {
  for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    for (const ref of localRefs(html)) {
      assert.ok(fs.existsSync(path.join(root, ref)), `${page} enlaza ${ref}, que no existe`);
      assert.ok(isShipped(ref), `${page} enlaza ${ref}, que no entra en la imagen`);
    }
  }
});

test('.dockerignore no excluye src/ ni los recursos devbrain-prose', () => {
  const lines = dockerignore.split(/\r?\n/).map((l) => l.trim());
  for (const blocked of ['src', 'src/', '*.js', '*.css', 'devbrain-prose.*']) {
    assert.ok(!lines.includes(blocked), `.dockerignore excluye ${blocked}`);
  }
});
