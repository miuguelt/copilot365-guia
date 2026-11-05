# Contrato de Diseño y Experiencia — Copilot 365 al Máximo

## 1. Persona y Propósito

- **Audiencia principal:** Aprendices técnicos, instructores SENA y cualquier perfil profesional que requiera optimizar su productividad ofimática y de colaboración mediante Microsoft 365 Copilot bajo licencias institucionales (especialmente Education A3/A5 con Protección de Datos Comerciales).
- **Problema real a resolver:** La mayoría de usuarios percibe la IA generativa como un simple "chatbot de preguntas y respuestas", formulando peticiones vagas que devuelven resultados mediocres. Desconocen el anclaje semántico de Microsoft Graph, los agentes especializados ya disponibles, el potencial de crear agentes sin código y cómo conectar las aplicaciones para automatizar flujos completos.
- **Resultado observable:** Al finalizar el recorrido, el aprendiz diseña prompts con el método CRTT+L y revisa las respuestas con V.E.R.A., opera los agentes preconstruidos, construye un agente declarativo en Copilot Studio con guardrails éticos y articula un flujo de productividad que reduce en más del 50% el tiempo de gestión de un proyecto.

## 2. Caso Conductor Unificado: «Proyecto Titán»

- **Entidad:** Centro de Formación y Servicios Empresariales.
- **Reto:** El equipo del Proyecto Titán debe gestionar el lanzamiento de un programa institucional. Tienen cuellos de botella en la elaboración de actas de reunión, redacción de propuestas ejecutivas, presupuestos en Excel, diapositivas y atención a dudas de los participantes.
- **Solución integrada:**
  - Teams + Facilitator: Acta y compromisos de la reunión de arranque.
  - Word + Copilot: Propuesta formal anclando el acta con `/`.
  - Excel + Copilot: Modelo presupuestal con fórmulas condicionales automáticas.
  - PowerPoint + Copilot: Exposición de 8 diapositivas con notas para el orador.
  - Copilot Studio: Asistente digital de atención a usuarios con manuales de SharePoint.
  - Forms + Copilot: Encuesta y análisis de retroalimentación en 1 clic.

## 3. Identidad Visual y Paleta de Serenidad: Brisa Nórdica

- **Dirección estética:** Técnica, sobria, elegante y diseñada para evitar la fatiga ocular durante sesiones extensas de estudio.
- **Tokens de color:**
  - Primario Nórdico: `#3669A4`
  - Primario Oscuro: `#2B5486`
  - Acento Celeste: `#5B9BD5`
  - Fondo Hielo Suave: `#F4F7FB`
  - Superficie Pura: `#FFFFFF`
  - Superficie Alterna: `#EDF1F7`
  - Texto Principal: `#1A2332`
  - Texto Secundario: `#4A5568`
  - Bordes Suaves: `#D2DCE8`
- **Tipografía:** Segoe UI / sistema sans-serif nativo, garantizando legibilidad instantánea en Windows y Web.
- **Contrato de lectura §7.4:** Prosa con `inline-size: 100%`, `text-align: justify` cuando el contenedor tiene al menos `40rem`, `text-align-last: start`, envoltura natural de palabras (`white-space: normal; word-break: normal; hyphens: none`) y `overflow-wrap: break-word` como salvaguarda.

## 4. Arquitectura y Rendimiento

- **Formato:** Sitio multipágina estático (8 páginas HTML autocontenidas).
- **Operación offline y local:** Operable 100% con protocolo `file://` (doble clic en el explorador de archivos). Cero dependencias externas que bloqueen la carga sin internet.
- **Calidad y Accesibilidad:** Destinado a cumplir WCAG 2.2 AA (foco visible, navegación completa por teclado, roles ARIA en componentes interactivos, compatibilidad con `@media (prefers-reduced-motion)` y validación con `Test-WebQuality.ps1` con cero errores).
