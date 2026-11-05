# Copilot 365 al Máximo — Guía Web Educativa

Portal didáctico completo para dominar **Microsoft 365 Copilot**, la creación y uso de **agentes de inteligencia artificial**, redacción de prompts con el método **CRTT+L** (Contexto, Rol, Tarea, Tono y Límites) y la automatización del trabajo cotidiano en la suite Microsoft 365 (especialmente orientado a licencias educativas institucionales como las del SENA).

---

## 🧭 Estructura del Sitio y Módulos

La guía está estructurada en 8 páginas HTML completamente autocontenidas, responsivas y operables localmente con protocolo `file://` sin dependencias externas:

| Página | Módulo / Sección | Descripción del Contenido |
|---|---|---|
| [`index.html`](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/copilot365-guia/index.html) | **Inicio y Visión General** | Hero dinámico, arquitectura general, mapa de ruta de 7 fases y métricas de productividad. |
| [`fundamentos.html`](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/copilot365-guia/fundamentos.html) | **Módulo 1: Fundamentos de Copilot** | Cómo funciona Microsoft Graph, ciclo de anclaje (*grounding*), qué es un agente vs. un chatbot, método CRTT+L y licencias (A1/A3/A5 con protección de datos). |
| [`agentes-preconstruidos.html`](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/copilot365-guia/agentes-preconstruidos.html) | **Módulo 2: Agentes de Fábrica** | Análisis exhaustivo de los agentes incluidos: *Researcher*, *Facilitator*, *Interpreter*, *Analyst* (Python), *SharePoint Agent* y *Project Manager*. |
| [`creacion-agentes.html`](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/copilot365-guia/creacion-agentes.html) | **Módulo 3: Creación de Agentes** | Guía paso a paso en **Copilot Studio** (low-code) y agentes de SharePoint (cero código), arquitectura del *System Prompt* y 4 plantillas completas listas para copiar. |
| [`copilot-apps.html`](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/copilot365-guia/copilot-apps.html) | **Módulo 4: Copilot en las Apps** | Guía de uso profundo para las 9 aplicaciones: Word, Excel, PowerPoint, Outlook, Teams, OneNote, Loop, Whiteboard y Forms. |
| [`prompts.html`](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/copilot365-guia/prompts.html) | **Módulo 5: Biblioteca de Prompts** | Repositorio interactivo de **50 prompts calibrados** organizados por aplicación y dificultad (Básico, Intermedio, Avanzado) con buscador en tiempo real y copiado en 1 clic. |
| [`actividades.html`](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/copilot365-guia/actividades.html) | **Módulo 6: Actividades Prácticas** | 7 talleres prácticos secuenciales con barra de progreso interactiva (guardada en `localStorage`), evidencias a entregar y reto integrador. |
| [`evaluacion.html`](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/copilot365-guia/evaluacion.html) | **Módulo 7: Evaluación y Certificación** | Cuestionario interactivo de 15 preguntas con retroalimentación inmediata, rúbrica analítica del proyecto, bitácora de reflexión y certificado digital imprimible (`Ctrl + P`). |

---

## 🎨 Sistema de Diseño y Accesibilidad

- **Paleta de Serenidad:** *Brisa Nórdica* (`#3669A4`, `#2B5486`, `#5B9BD5`, `#F4F7FB`, `#EDF1F7`), diseñada para evitar la fatiga visual en sesiones prolongadas de estudio.
- **Tipografía y Prosa:** Cumplimiento riguroso de la regla 7.4 de DevBrain (`white-space: normal; word-break: normal; hyphens: none; overflow-wrap: break-word`, justificación en contenedores ≥ 40rem con última línea al inicio).
- **Adaptabilidad (Responsive):** Diseño fluido para móviles (< 768px), tabletas (768px - 1024px) y escritorios (> 1024px) con menú hamburguesa accesible.
- **Calidad de Código:** Auditoría estática con `Test-WebQuality.ps1` superada con **0 errores y 0 advertencias**. Soporte explícito de accesibilidad (ARIA, `tabindex`, navegación por teclado y `@media (prefers-reduced-motion)`).

---

## 🚀 Cómo Explorar la Guía

1. Abre el explorador de archivos en `c:\Users\Miguel\Documents\Aplicaciones\_projects\copilot365-guia\`.
2. Haz doble clic en [`index.html`](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/copilot365-guia/index.html) para abrirla directamente en cualquier navegador web moderno (Edge, Chrome, Firefox).
3. Navega de forma secuencial a través de los enlaces de pie de página o salta entre temas usando la barra de navegación superior.
