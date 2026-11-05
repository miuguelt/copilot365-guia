# ADR-002: Sistema de Diseño Brisa Nórdica y Contrato de Lectura §7.4

- **Fecha:** 2026-10-29
- **Estado:** Aceptado
- **Contexto:**
  Las guías educativas de IA frecuentemente incurren en dos antipatrones: o bien usan plantillas genéricas sobrecargadas con neones y fondos oscuros agresivos (`#000000`, `#0f172a`) que causan fatiga visual tras 20 minutos de lectura, o aplican anchos fijos estrechos (`max-width: 65ch`) que desperdician el 70% del monitor del estudiante, o justificaciones forzadas que generan ríos tipográficos en móviles.
- **Decisión:**
  1. Implementar la paleta de serenidad visual **Brisa Nórdica** (`#3669A4`, `#2B5486`, `#5B9BD5`, `#F4F7FB`, `#EDF1F7`), diseñada para brindar calma y descanso ocular.
  2. Aplicar de forma estricta la **Regla 7.4 de DevBrain**:
     - Toda prosa aprovecha el ancho fluido (`inline-size: 100%`, `max-inline-size: 100%`).
     - Justificación (`text-align: justify`) aplicada condicionalmente solo cuando el contenedor de lectura tiene al menos `40rem`, manteniendo `text-align-last: start`. En regiones menores, alineación al inicio.
     - Envoltura natural sin cortes forzados (`white-space: normal; word-break: normal; hyphens: none`) y `overflow-wrap: break-word` como salvaguarda técnica.
- **Consecuencias:**
  - *Positivas:* Lectura descansada y confortable en sesiones de estudio prolongadas; composición adaptable sin barras de desplazamiento horizontal accidentales desde 320 px hasta 2560 px.
  - *Negativas:* Requiere verificar cuidadosamente la separación visual y el tamaño de los contenedores en viewports intermedios.
