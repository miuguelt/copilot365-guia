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

  return { TOOL_FILTERS, STATUS_FILTERS, parseProgress, toggleId, summarize, nextPending, matchesFilter };
});
