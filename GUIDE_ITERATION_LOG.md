# Registro de Iteraciones y Evolución Pedagógica — Copilot 365 al Máximo

## Iteración 4.2 · 2026-11-05 · Orientación y tarjetas plegables en Actividades

- Hitos de `actividades.html` agrupados en «Outlook · Talleres 0 a 14» y «Extensiones A a F y proyecto final»; el siguiente taller pendiente se resalta y tiene el botón «Ir al Taller N».
- Barra de avance fija que aparece al bajar del panel de progreso, con el enlace al siguiente taller.
- Procedimiento, criterios de revisión y pista pasan a `<details>` nativos; al abrir un taller desde un enlace se despliega su procedimiento.
- Filtros por aplicación (Outlook o extensiones) y estado (pendientes o completados) con `aria-pressed` y mensaje cuando no hay resultados.
- Lógica de progreso extraída a `src/features/activities-progress.js` con pruebas en `tests/activities-progress.test.cjs` (100 % de funciones).

## Iteración 4.1 · 2026-11-04 · Método único CRTT+L

### Motivo
La guía enseñaba GCSE mientras las demás guías del programa enseñan CRTT+L. El canon ya lo prohibía, pero ninguna comprobación automática lo hacía cumplir. También se revisó el acceso al Taller 0. <!-- prompt-canon-exception: registro histórico del cambio -->

### Cambios realizados
1. `fundamentos.html` §4 (`#marco-crttl`): cinco tarjetas C·R·T·T·L, ejemplo marcado por pilar, recuadro V.E.R.A. para revisar la respuesta y una sola mención de equivalencia con el marco de Microsoft.
2. `prompts.html`: el calificador evalúa los cinco pilares con `src/shared/crttl-evaluator.js` (pruebas en `tests/crttl-evaluator.test.cjs`); los 60 prompts explican su desglose CRTT+L.
3. `actividades.html` (Taller 1), `evaluacion.html` (rúbrica, pregunta 1 y certificado), registro (`EV-CP01-CRTTL`), manifiesto y documentos de gobernanza.
4. ADR-004 y compuerta `tools/prompt-canon/Test-PromptCanon.ps1` en el CI.
5. Taller 0: está en `actividades.html` como primera tarjeta y primer hito (`#act-15`). No se encontró ninguna ruta local que lo omita; si no aparece, recarga sin caché (Ctrl+F5).

### Pendiente
- El flujo de CI se activa en `main` y `develop`, pero el repositorio trabaja en `master`.

## Iteración 4.0 · 2026-11-04 · Outlook y sus agentes como centro de la guía

### Motivo
El usuario pidió que el centro de la guía sea el manejo de los agentes de Copilot dentro de Outlook, con más ejercicios de productividad del correo y con las capacidades de su licencia actual. La administración no permite consultar la licencia asignada. Copilot en Outlook dice que puede abrir correos y adjuntos, buscar en Microsoft 365, consultar calendarios y reuniones y resumir contenido. Como esa descripción no es verificable, la guía no afirma un tipo de licencia: cada capacidad se comprueba en el Taller 0.

### Cambios realizados
1. `actividades.html`: nuevo Taller 0 de diagnóstico (act-15) y 7 talleres de Outlook (adjuntos, búsqueda de acuerdos, calendario y tiempo de foco, seguimientos, acta de reunión, agente propio, plantillas y pasos rápidos). Se reorganizó en tres bloques, con los ids anteriores conservados: Outlook (Taller 0 y Talleres 1 a 14), Extensiones A a F y Reto Integrador. Los talleres de Word, Excel y PowerPoint parten de un adjunto recibido por correo.
2. `index.html`, `fundamentos.html` y `copilot-apps.html`: el mensaje principal y el Caso Titán parten de Outlook. Hay una nueva sección «Copilot en Outlook: dónde está y qué puede ver», la tabla de licencias se corrigió (ya no niega el acceso al correo) y Outlook pasa a ser la primera aplicación.
3. `agentes-preconstruidos.html`: tarjeta del agente base Copilot de Outlook. `creacion-agentes.html`: camino «Crear un agente para tu correo», con dos ejemplos de instrucciones. `prompts.html`: categoría Outlook ampliada de 6 a 16 prompts.
4. `evaluacion.html`: las preguntas 6, 9, 14 y 15 ahora evalúan adjuntos, verificación de capacidades, agentes propios y automatización.
5. Registro, manifiesto y `tools/Test-GuideConsistency.ps1` actualizados; la prueba exige al menos 10 talleres de Outlook y que el diagnóstico sea el primer taller.

### Pendiente
- Ejecutar el Taller 0 con la cuenta institucional para confirmar qué capacidades existen.

---

## Iteración 3.0 · 2026-11-04 · Agentes reales en Outlook y talleres de productividad del correo

### Motivo
En el panel de Copilot de Outlook de una cuenta institucional, la búsqueda de «Researcher» no arroja resultados. Esa cuenta muestra Prompt Coach, Writing Coach, Idea Coach, Workflows (Frontier), Learning, Workforce Insights, SharePoint list agent y Career Coach, además de agentes propios de la organización. La guía presentaba como disponibles agentes que requieren la licencia completa, y el Taller 2 no se podía resolver.

### Cambios realizados
1. `agentes-preconstruidos.html`: nueva sección «Disponibles en Copilot de Outlook», con instrucciones para comprobar la disponibilidad; los agentes de licencia completa pasan a la sección «Requieren licencia Microsoft 365 Copilot».
2. `actividades.html`: el Taller 2 usa solo agentes disponibles. Se agregaron 5 talleres de Outlook (8 a 12) y 2 extensiones, a SharePoint (13) y a Teams (14). El progreso se calcula a partir de las tarjetas.
3. `deliverables.registry.json`: evidencias para act-5 (faltaba) y para act-8 a act-14.
4. `evaluacion.html`: la pregunta 3 evalúa cómo reaccionar cuando un agente no está habilitado.
5. `tools/Test-GuideConsistency.ps1`: prueba de coherencia entre actividades, registro y catálogo de agentes, integrada en CI.

### Pendiente
- Validar los Talleres 8 a 14 en vivo con una cuenta institucional. La disponibilidad se basa en una captura del 2026-11-04 y los agentes Frontier pueden cambiar.

---

## Iteración 2.0 · 2026-10-29 · Elevación Didáctica e Infraestructura de Gobernanza IA

### Cambios Realizados
1. **Gobernanza Canónica DevBrain:**
   - Creación de `guide.manifest.json` bajo estándar `devbrain.educational-guide` v2.5.0 con alineación curricular, checkpoints y duración recomendada.
   - Creación de `deliverables.registry.json` con registro de 7 evidencias, mapeo de competencias y protocolo V.E.R.A.
   - Creación de `WEB-DESIGN-BRIEF.md`, `GUIDE_READINESS_REVIEW.md`, `WEB-DESIGN-LEARNING.md` y contextualización de `AGENTS.md`.
   - Adición de Architectural Decision Records (`ADR-001`, `ADR-002`, `ADR-003`) en `docs/architecture/ADR/`.
   - Creación de `.github/workflows/ci.yml` y `.github/PULL_REQUEST_TEMPLATE.md`.

2. **Interactividad y Laboratorios Veraces:**
   - Implementación del **Constructor y Calificador Interactivo de Prompts GCSE** en `prompts.html`: analiza sintácticamente Goal, Context, Source y Expectations en tiempo real sin llamadas remotas. <!-- prompt-canon-exception: registro histórico; reemplazado por CRTT+L en ADR-004 -->
   - Implementación del **Sandbox de Pruebas de Copilot Studio** en `creacion-agentes.html`: simula la consola de pruebas con preguntas dentro de fuentes de SharePoint y bloqueo de temas no autorizados por guardrails.
   - Integración de diagramas técnicos SVG vectoriales accesibles en `fundamentos.html` y `agentes-preconstruidos.html`.
   - Inclusión del **Caso Conductor Unificado Titán** y secciones de **Recuperación de Errores y Diagnóstico** en las páginas operativas.

3. **Verificación de Calidad Web:**
   - Ejecución de `Test-WebQuality.ps1` logrando **0 errores y 0 advertencias**.
   - Verificación de enlaces cruzados entre las 8 páginas y soporte completo de teclado y `@media (prefers-reduced-motion)`.

---

## Iteración 1.0 · 2026-10-29 · Andamiaje Inicial del Portal

- Creación de las 8 páginas HTML base (`index.html`, `fundamentos.html`, `agentes-preconstruidos.html`, `creacion-agentes.html`, `copilot-apps.html`, `prompts.html`, `actividades.html`, `evaluacion.html`).
- Establecimiento de la paleta Brisa Nórdica y cumplimiento de la regla de composición 7.4.
- Redacción completa del banco de 50 prompts, 7 actividades prácticas y cuestionario interactivo de 15 preguntas con certificado digital.
