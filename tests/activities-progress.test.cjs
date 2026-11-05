// Pruebas de la lógica de progreso de actividades.html (node --test tests/).
const test = require('node:test');
const assert = require('node:assert/strict');
const P = require('../src/features/activities-progress.js');

const order = [15, 1, 2, 8];

test('parseProgress: lee una lista válida y quita duplicados e IDs inválidos', () => {
  assert.deepEqual(P.parseProgress('[1,2,2,"3",0,-4,1.5,8]'), [1, 2, 8]);
});

test('parseProgress: vacío, nulo, JSON roto o no-arreglo devuelven lista vacía', () => {
  for (const raw of ['', '   ', null, undefined, '{roto', '{"a":1}', '7']) {
    assert.deepEqual(P.parseProgress(raw), []);
  }
});

test('toggleId: agrega y luego quita sin mutar la lista original', () => {
  const base = [1];
  const added = P.toggleId(base, 2);
  assert.deepEqual(added, [1, 2]);
  assert.deepEqual(base, [1]);
  assert.deepEqual(P.toggleId(added, 1), [2]);
});

test('summarize: cuenta solo IDs del recorrido y redondea el porcentaje', () => {
  assert.deepEqual(P.summarize(order, [1, 99]), { count: 1, total: 4, pct: 25 });
  assert.deepEqual(P.summarize([1, 2, 3], [1]), { count: 1, total: 3, pct: 33 });
  assert.deepEqual(P.summarize(order, order), { count: 4, total: 4, pct: 100 });
});

test('summarize: un recorrido vacío da 0 % sin dividir por cero', () => {
  assert.deepEqual(P.summarize([], [1]), { count: 0, total: 0, pct: 0 });
});

test('nextPending: sigue el orden de presentación, no el numérico', () => {
  assert.equal(P.nextPending(order, []), 15);
  assert.equal(P.nextPending(order, [15, 2]), 1);
  assert.equal(P.nextPending(order, [15, 1, 2]), 8);
});

test('nextPending: devuelve null cuando todo está completo', () => {
  assert.equal(P.nextPending(order, [8, 2, 1, 15]), null);
});

test('matchesFilter: filtra por herramienta', () => {
  const outlook = { tool: 'outlook', done: false };
  const teams = { tool: 'teams', done: false };
  const reto = { tool: undefined, done: false };
  assert.equal(P.matchesFilter(outlook, { tool: 'outlook', status: 'todas' }), true);
  assert.equal(P.matchesFilter(teams, { tool: 'outlook', status: 'todas' }), false);
  assert.equal(P.matchesFilter(teams, { tool: 'extensiones', status: 'todas' }), true);
  assert.equal(P.matchesFilter(reto, { tool: 'extensiones', status: 'todas' }), true);
  assert.equal(P.matchesFilter(outlook, { tool: 'extensiones', status: 'todas' }), false);
});

test('matchesFilter: filtra por estado', () => {
  const done = { tool: 'outlook', done: true };
  const pending = { tool: 'outlook', done: false };
  assert.equal(P.matchesFilter(done, { tool: 'todas', status: 'pendientes' }), false);
  assert.equal(P.matchesFilter(pending, { tool: 'todas', status: 'pendientes' }), true);
  assert.equal(P.matchesFilter(done, { tool: 'todas', status: 'completadas' }), true);
  assert.equal(P.matchesFilter(pending, { tool: 'todas', status: 'completadas' }), false);
});

test('matchesFilter: valores desconocidos equivalen a «todas» (reinicio)', () => {
  const card = { tool: 'word', done: true };
  assert.equal(P.matchesFilter(card, { tool: 'xyz', status: 'otro' }), true);
  assert.equal(P.matchesFilter(card, {}), true);
});

test('expone los filtros admitidos', () => {
  assert.deepEqual(P.TOOL_FILTERS, ['todas', 'outlook', 'extensiones']);
  assert.deepEqual(P.STATUS_FILTERS, ['todas', 'pendientes', 'completadas']);
});

test('neighbors: devuelve anterior y siguiente según el orden de presentación', () => {
  assert.deepEqual(P.neighbors(order, 1), { prev: 15, next: 2 });
  assert.deepEqual(P.neighbors(order, 15), { prev: null, next: 1 });
  assert.deepEqual(P.neighbors(order, 8), { prev: 2, next: null });
});

test('neighbors: un ID que no está en el recorrido no tiene vecinos', () => {
  assert.deepEqual(P.neighbors(order, 99), { prev: null, next: null });
});

test('buildIndex: agrupa en Outlook y extensiones, conserva el orden y marca estado', () => {
  const items = [
    { id: 15, tool: 'outlook', code: '0', label: 'Diagnóstico' },
    { id: 1, tool: 'outlook', code: '1', label: 'Prompt' },
    { id: 13, tool: 'sharepoint', code: 'A', label: 'SharePoint' },
    { id: 7, tool: undefined, code: '★', label: 'Proyecto final' }
  ];
  const groups = P.buildIndex(items, [1], 15);
  assert.deepEqual(groups.map(g => g.key), ['outlook', 'extensiones']);
  assert.deepEqual(groups[0].items.map(i => i.id), [15, 1]);
  assert.deepEqual(groups[1].items.map(i => i.id), [13, 7]);
  assert.equal(groups[0].items[1].done, true);
  assert.equal(groups[0].items[0].isNext, true);
  assert.equal(groups[0].done, 1);
  assert.equal(groups[0].total, 2);
  assert.equal(groups[1].done, 0);
});

test('buildIndex: omite grupos vacíos y acepta una lista vacía', () => {
  const only = P.buildIndex([{ id: 3, tool: 'extension', code: 'C', label: 'Word' }], [], null);
  assert.deepEqual(only.map(g => g.key), ['extensiones']);
  assert.equal(only[0].items[0].isNext, false);
  assert.deepEqual(P.buildIndex([], [], null), []);
});
