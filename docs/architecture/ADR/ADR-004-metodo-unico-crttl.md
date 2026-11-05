# ADR-004: Método único CRTT+L para escribir prompts

- **Fecha:** 2026-11-04
- **Estado:** Aceptado. Reemplaza el marco usado antes en esta guía.
- **Contexto:**
  La guía enseñaba un marco de cuatro elementos tomado de la documentación de Copilot, mientras el canon del workspace (`_core/knowledge_base/PROMPT_ENGINEERING_CANON.md`) fija un método único para todas las guías. Un aprendiz que pasaba de esta guía a otra encontraba siglas distintas para la misma tarea. El canon existía solo por escrito; ninguna comprobación automática lo hacía cumplir, y por eso la divergencia reapareció.
- **Decisión:**
  1. La guía enseña **CRTT+L**: Contexto (incluida la fuente), Rol, Tarea (con el formato de salida), Tono y Límites. La respuesta se revisa con **V.E.R.A.**, que nunca se presenta como estructura del prompt.
  2. La única mención del marco de Microsoft está en `fundamentos.html`, marcada con `data-prompt-canon-exception`, para que el aprendiz lo reconozca y sepa cómo se corresponde con CRTT+L.
  3. El calificador de `prompts.html` evalúa los cinco pilares con `src/shared/crttl-evaluator.js` y sus pruebas en `tests/`.
  4. La compuerta `_infrastructure/devbraind/scripts/Test-PromptCanon.ps1` se ejecuta en el CI de la guía y falla si aparece otro marco.
- **Consecuencias:**
  - *Positivas:* un solo método en todo el programa, válido para cualquier asistente; la divergencia se detecta antes de publicar.
  - *Negativas:* los textos nuevos que mencionen otro marco deben declarar la excepción en la misma línea.
