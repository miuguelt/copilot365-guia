/* Lógica del progreso de actividades.html: estado guardado, resumen, siguiente pendiente y filtros.
 * Funciones puras, sin DOM ni temporizadores. Funciona en el navegador (window.ActivitiesProgress)
 * y en Node (module.exports) para las pruebas. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ActivitiesProgress = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const TOOL_FILTERS = ['todas', 'outlook', 'extensiones'];
  const STATUS_FILTERS = ['todas', 'pendientes', 'completadas'];

  // Convierte el valor guardado en localStorage en una lista de IDs enteros sin duplicados.
  function parseProgress(raw) {
    if (typeof raw !== 'string' || raw.trim() === '') return [];
    let data;
    try { data = JSON.parse(raw); } catch (e) { return []; }
    if (!Array.isArray(data)) return [];
    const ids = data.filter(n => Number.isInteger(n) && n > 0);
    return [...new Set(ids)];
  }

  // Agrega el ID si falta o lo quita si ya estaba; no modifica la lista recibida.
  function toggleId(completed, id) {
    return completed.includes(id) ? completed.filter(x => x !== id) : [...completed, id];
  }

  // Cuenta solo los IDs que existen en el recorrido actual.
  function summarize(order, completed) {
    const total = order.length;
    const count = order.filter(id => completed.includes(id)).length;
    const pct = total === 0 ? 0 : Math.round((count / total) * 100);
    return { count, total, pct };
  }

  // Primer ID del recorrido, en orden de presentación, que aún no está completado.
  function nextPending(order, completed) {
    const id = order.find(x => !completed.includes(x));
    return id === undefined ? null : id;
  }

  // Indica si una tarjeta ({ tool, done }) cumple el filtro ({ tool, status }).
  function matchesFilter(card, filter) {
    const tool = TOOL_FILTERS.includes(filter.tool) ? filter.tool : 'todas';
    const status = STATUS_FILTERS.includes(filter.status) ? filter.status : 'todas';
    const isOutlook = card.tool === 'outlook';
    if (tool === 'outlook' && !isOutlook) return false;
    if (tool === 'extensiones' && isOutlook) return false;
    if (status === 'pendientes' && card.done) return false;
    if (status === 'completadas' && !card.done) return false;
    return true;
  }

  // Taller anterior y siguiente de un ID dentro del recorrido.
  function neighbors(order, id) {
    const i = order.indexOf(id);
    if (i === -1) return { prev: null, next: null };
    return { prev: i > 0 ? order[i - 1] : null, next: i < order.length - 1 ? order[i + 1] : null };
  }

  const INDEX_GROUPS = [
    { key: 'outlook', title: 'Outlook · Talleres 0 a 14' },
    { key: 'extensiones', title: 'Extensiones y proyecto final' }
  ];

  // Agrupa los talleres ({ id, tool, code, label }) para el índice, con su estado y conteo por grupo.
  function buildIndex(items, completed, nextId) {
    return INDEX_GROUPS.map(g => {
      const list = items
        .filter(it => (it.tool === 'outlook') === (g.key === 'outlook'))
        .map(it => ({ ...it, done: completed.includes(it.id), isNext: it.id === nextId }));
      return { ...g, items: list, total: list.length, done: list.filter(it => it.done).length };
    }).filter(g => g.total > 0);
  }

  return { TOOL_FILTERS, STATUS_FILTERS, parseProgress, toggleId, summarize, nextPending, matchesFilter, neighbors, buildIndex };
});
