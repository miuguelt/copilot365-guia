# Plantilla de Pull Request — Copilot 365 al Máximo

## Resumen del Cambio
<!-- Describe brevemente qué problema resuelve o qué módulo/herramienta añade este PR -->

## Tipo de Cambio
- [ ] 📖 Contenido educativo o didáctico nuevo / mejorado
- [ ] 🛠️ Herramienta o simulador interactivo (JavaScript)
- [ ] 🎨 Ajuste de diseño, tokens Brisa Nórdica o CSS
- [ ] ♿ Accesibilidad o compatibilidad de visualización
- [ ] 🏛️ Gobernanza, manifiesto curricular o registro de entregables

## Lista de Chequeo Obligatoria (Quality Gates)

### 1. Calidad Web y Código
- [ ] Se ejecutó `Test-WebQuality.ps1` localmente con **0 errores y 0 advertencias**.
- [ ] Todos los botones nativos tienen `type="button"`.
- [ ] Todo enlace externo con `target="_blank"` incluye `rel="noopener noreferrer"`.
- [ ] Los contenedores interactivos tienen `role="button"`, `tabindex="0"` y operación por teclado (`Enter` / `Espacio`).
- [ ] Se respeta la regla §7.4 (ancho fluido, envoltura natural, justificación $\ge 40\text{ rem}$ y sin cortes forzados).

### 2. Rigor Pedagógico y Veracidad
- [ ] Los simuladores evalúan entradas reales en JavaScript sin temporizadores ficticios (`setTimeout`).
- [ ] Se probaron los 4 estados de prueba (entrada válida, inválida, vacía y reinicio).
- [ ] Los ejemplos y prompts aplican el método CRTT+L (Contexto, Rol, Tarea, Tono y Límites), pasan `Test-PromptCanon.ps1` y fueron probados contra Microsoft Copilot real.
- [ ] La redacción cumple con español de Colombia (`es-CO`), tono respetuoso, claro y profesional.

### 3. Trazabilidad y Gobernanza
- [ ] Si se modificó un entregable o actividad, se actualizó `deliverables.registry.json` y `guide.manifest.json`.
- [ ] Se verificaron los enlaces cruzados de navegación en las 8 páginas HTML.
- [ ] Se documentó el cambio en `GUIDE_ITERATION_LOG.md`.
