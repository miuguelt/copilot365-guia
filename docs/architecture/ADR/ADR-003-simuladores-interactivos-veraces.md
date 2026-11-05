# ADR-003: Simuladores Interactivos Veraces y Taxonomía de Laboratorios

- **Fecha:** 2026-10-29
- **Estado:** Aceptado
- **Contexto:**
  Muchos portales educativos simulan interactividad mediante código ficticio (`setTimeout` vacíos que muestran siempre "Operación exitosa" tras 2 segundos), lo cual desorienta al aprendiz y no le permite saber si su entrada real funciona o contiene errores sintácticos.
- **Decisión:**
  Construir herramientas interactivas veraces ejecutadas 100% en el cliente mediante JavaScript nativo:
  1. **Calificador de prompts CRTT+L** (ver ADR-004): `src/shared/crttl-evaluator.js` reconoce los cinco pilares (Contexto, Rol, Tarea, Tono y Límites) por sus marcadores `[C] [R] [T] [Tono] [L]` o por su redacción, y se prueba con `node --test tests/`.
  2. **Sandbox de Copilot Studio:** Simula un entorno de ejecución cerrado con una base de conocimiento documental estática en memoria y un motor de reglas que valida si la consulta viola los guardrails configurados por el aprendiz.
  3. Todo simulador debe responder sin excepciones a: (1) entrada válida, (2) entrada inválida o incompleta con retroalimentación explicada, (3) entrada vacía con aviso formativo y (4) acción de reinicio (`reset`).
- **Consecuencias:**
  - *Positivas:* Retroalimentación inmediata, honesta y formativa; el aprendiz comprende empíricamente qué hace fallar a un prompt antes de usar la herramienta real en Microsoft 365.
  - *Negativas:* No emula la generación libre no determinista de un modelo LLM de 70B parámetros en servidor, limitación que se declara explícitamente en la interfaz mediante su clasificación (`simulación` / `comprobación estática`).
