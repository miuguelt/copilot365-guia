/* Calificador determinista del método CRTT+L (Contexto, Rol, Tarea, Tono y Límites).
 * Canon: _core/knowledge_base/PROMPT_ENGINEERING_CANON.md. Sin llamadas remotas ni temporizadores.
 * Funciona en el navegador (window.CrttlEvaluator) y en Node (module.exports) para las pruebas. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CrttlEvaluator = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Cada pilar se reconoce por su marcador ([C], [R], [T], [Tono], [L]) o por su redacción.
  const PILLARS = [
    {
      key: 'contexto', marker: /\[C\]/i, label: 'Contexto',
      patterns: [/\/\S+\.(docx|xlsx|pptx|pdf)\b/i, /\/[A-Z]\w+/, /\b(correos?|hilo|adjunto|archivo|carpeta|transcripci[oó]n|reuni[oó]n|calendario|canal|notas|tabla|documento|datos)\b/i,
        /\bpara (el|la|los|las) (comit[eé]|equipo|direcci[oó]n|gerencia|coordinaci[oó]n|aprendices|instructores|reuni[oó]n|clientes)\b/i, /\b(últimos?|últimas?|esta semana|ayer|hoy)\b/i],
      advice: 'Indica la fuente (el correo abierto, un archivo con /, un hilo o unas fechas) y para quién es el resultado.'
    },
    {
      key: 'rol', marker: /\[R\]/i, label: 'Rol',
      patterns: [/\bact[uú]a como\b/i, /\beres (un|una)\b/i, /\bcomo (asistente|analista|redactor|experto|especialista|coordinador|asesor)/i, /\b(tu|su) rol\b/i],
      advice: 'Di desde qué papel debe responder: «Actúa como asistente de coordinación».'
    },
    {
      key: 'tarea', marker: /\[T\]/i, label: 'Tarea',
      patterns: [/\b(redacta|crea|resume|sintetiza|genera|analiza|compara|audita|calcula|clasifica|extrae|identifica|ordena|explica|dise[ñn]a|transforma|elabora|convierte|prepara|propón|prop[oó]n)\b/i],
      requires: /\b(tabla|columnas?|vi[ñn]etas?|palabras|oraciones|p[aá]rrafos?|m[aá]ximo|m[ií]nimo|lista|puntos|diapositivas|borrador|formato|resumen|acta|correo)\b/i,
      advice: 'Empieza con un verbo de acción y describe el producto: «en una tabla de 4 columnas», «en 5 viñetas».'
    },
    {
      key: 'tono', marker: /\[Tono\]/i, label: 'Tono',
      patterns: [/\btono\b/i, /\b(formal|cordial|cercano|profesional|conciso|emp[aá]tico|diplom[aá]tico|respetuoso|sobrio)\b/i, /\bespa[ñn]ol de Colombia\b/i, /\blenguaje claro\b/i],
      advice: 'Indica cómo debe sonar: «tono profesional y claro, en español de Colombia».'
    },
    {
      key: 'limites', marker: /\[L\]/i, label: 'Límites',
      patterns: [/\bno (inventes|supongas|agregues|env[ií]es|incluyas|uses)\b/i, /\[(NO CONSTA|POR CONFIRMAR)\]/i, /\b(solo|[uú]nicamente|exclusivamente) (con|de|en|los|las|el|la|a partir)\b/i, /\bsi falta (un|algún) dato\b/i, /\bsin (inventar|suponer)\b/i],
      advice: 'Pon límites: «No inventes datos; si falta uno, escribe [NO CONSTA]. No envíes nada».'
    }
  ];

  function detect(pillar, text) {
    const m = text.match(pillar.marker);
    if (m) return m[0];
    for (const re of pillar.patterns) {
      const hit = text.match(re);
      if (hit && (!pillar.requires || pillar.requires.test(text))) return hit[0];
    }
    return '';
  }

  function evaluatePrompt(input) {
    const text = typeof input === 'string' ? input.trim() : '';
    const pillars = PILLARS.map(p => {
      const evidence = text ? detect(p, text) : '';
      return { key: p.key, label: p.label, found: Boolean(evidence), evidence, advice: p.advice };
    });
    if (!text) return { state: 'vacio', score: 0, pillars };
    const count = pillars.filter(p => p.found).length;
    const score = count * 20;
    const state = count === PILLARS.length ? 'completo' : count >= 2 ? 'parcial' : 'incompleto';
    return { state, score, pillars };
  }

  return { PILLARS, evaluatePrompt };
});
