# Aprendizajes de Diseño Web y Patrones Verificados — Copilot 365 al Máximo

## Observaciones Técnicas y Pedagógicas

1. **Autonomía Offline y Protocolo `file://`:**
   - La arquitectura de CSS y JS inline en cada página HTML garantiza que el aprendiz pueda ejecutar toda la guía haciendo doble clic en el explorador de archivos de Windows sin requerir Node.js, Vite ni conexión activa a internet.

2. **Veracidad en Evaluadores en Cliente (JavaScript Puro):**
   - Evitar `setTimeout` artificiales o salidas de éxito fijas. El evaluador de prompts GCSE analiza expresiones regulares sobre verbos de acción en imperativo o infinitivo (`Goal`), palabras clave de audiencia/propósito (`Context`), tokens de archivos o comandos `/` (`Source`) y descriptores de estructura como columnas o viñetas (`Expectations`), entregando una puntuación basada en reglas observables. <!-- prompt-canon-exception: registro histórico; reemplazado por CRTT+L en ADR-004 -->

3. **Accesibilidad y Enfoque de Teclado en Tarjetas Clicables:**
   - Todo contenedor interactivo que responde a eventos de clic debe incorporar `role="button"`, `tabindex="0"` y un manejador de teclado para `Enter` o `Espacio`, previniendo barreras de navegación para usuarios con tecnologías de asistencia.

4. **Prevención de Desbordamiento y Regla 7.4:**
   - Establecer `overflow-wrap: break-word` como salvaguarda y justificación de texto (`text-align: justify`) exclusivamente cuando el contenedor alcanza al menos `40rem` previene la aparición de ríos blancos o compresión excesiva en pantallas de ancho reducido (320px - 390px).

5. **Confort Visual Prolongado (Paleta Brisa Nórdica):**
   - El contraste entre azul nórdico (`#3669A4`), blanco puro (`#FFFFFF`) y fondo hielo (`#F4F7FB`) ofrece más de 7:1 de ratio de contraste para lectura continua, mitigando la fatiga visual que generan las paletas oscuras con neones deslumbrantes.
