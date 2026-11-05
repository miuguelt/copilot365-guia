// Pruebas del calificador CRTT+L de prompts.html (node --test tests/).
const test = require('node:test');
const assert = require('node:assert/strict');
const { evaluatePrompt, PILLARS } = require('../src/shared/crttl-evaluator.js');

const full = '[C] Usa solo /ProyectoTitan.docx y los correos de esta semana; es para el comité de mañana. ' +
  '[R] Actúa como asistente de coordinación. [T] Extrae los acuerdos en una tabla de 4 columnas: Tarea, Responsable, Plazo y Riesgo. ' +
  '[Tono] Profesional y claro, en español de Colombia. [L] No inventes datos: si falta uno, escribe [NO CONSTA].';

test('define los cinco pilares en el orden canónico', () => {
  assert.deepEqual(PILLARS.map(p => p.key), ['contexto', 'rol', 'tarea', 'tono', 'limites']);
});

test('entrada válida: un prompt completo obtiene 100 % y estado completo', () => {
  const r = evaluatePrompt(full);
  assert.equal(r.score, 100);
  assert.equal(r.state, 'completo');
  assert.ok(r.pillars.every(p => p.found));
});

test('entrada inválida: un prompt vago obtiene puntaje bajo y señala lo que falta', () => {
  const r = evaluatePrompt('Resume lo que se habló en la reunión y dime qué hay pendiente.');
  assert.ok(r.score <= 40, `puntaje ${r.score}`);
  assert.equal(r.state, 'incompleto');
  const missing = r.pillars.filter(p => !p.found).map(p => p.key);
  assert.ok(missing.includes('rol'));
  assert.ok(missing.includes('limites'));
});

test('entrada vacía o solo espacios: estado vacío sin pilares detectados', () => {
  for (const t of ['', '   ', null, undefined]) {
    const r = evaluatePrompt(t);
    assert.equal(r.state, 'vacio');
    assert.equal(r.score, 0);
    assert.ok(r.pillars.every(p => !p.found));
  }
});

test('reconoce los pilares sin marcadores, por su redacción', () => {
  const r = evaluatePrompt('Actúa como analista. Con los datos del archivo /Ventas.xlsx para la gerencia, compara los trimestres en una tabla. Tono formal. No supongas cifras.');
  assert.deepEqual(r.pillars.filter(p => !p.found).map(p => p.key), []);
});

test('el puntaje parcial es proporcional a los pilares presentes', () => {
  const r = evaluatePrompt('Redacta un resumen en 5 viñetas con tono cordial.');
  assert.equal(r.score, 40);
  assert.equal(r.state, 'parcial');
  const found = r.pillars.filter(p => p.found).map(p => p.key);
  assert.deepEqual(found, ['tarea', 'tono']);
});

test('cada pilar informa la evidencia detectada', () => {
  const r = evaluatePrompt(full);
  for (const p of r.pillars) assert.ok(p.evidence.length > 0, p.key);
});

test('una palabra suelta como «para» no basta para declarar contexto', () => {
  const r = evaluatePrompt('Escribe algo para mí.');
  assert.equal(r.pillars.find(p => p.key === 'contexto').found, false);
});
