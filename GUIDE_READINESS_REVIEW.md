# Revisión de Preparación de la Guía — Copilot 365 al Máximo

Fecha de auditoría: 29 de octubre de 2026.  
Alcance: Distribución local multipágina de la guía web educativa `copilot365-guia`.

---

## 1. Matriz de Cumplimiento Pedagógico y Técnico

| Dimensión | Evidencia Requerida | Estado | Referencia y Observaciones |
|---|---|---|---|
| **Orientación** | Una persona puede identificar producto final, ruta y próximo paso sin perderse. | **Cumple** | `index.html` presenta el mapa de ruta de 7 módulos, caso conductor y barra de navegación persistente en todas las páginas. |
| **Prerrequisitos** | Diagnóstico, requisitos de cuenta M365 Education y recuperación ante falta de acceso. | **Cumple** | Módulo 1 (`fundamentos.html`) detalla los esquemas de licencias A1/A3/A5, protección de datos CDP y alternativas con Copilot Chat web. |
| **Módulos y Casos** | Mapa módulo → ejemplo resuelto → ejercicio → error habitual → evidencia → transferencia. | **Cumple** | Cada una de las 9 apps en `copilot-apps.html` y cada taller en `actividades.html` sigue esta estructura metódica con el Caso Conductor Titán. |
| **Reproducibilidad** | Prompts copiables con 1 clic, procedimientos paso a paso y datos verificables. | **Cumple** | `prompts.html` incluye 60 prompts con desglose CRTT+L y botones de copiado con feedback visual. |
| **Veracidad e Interactividad** | Simuladores y evaluadores clasificados por veracidad, sin temporizadores falsos (`setTimeout`). | **Cumple** | Calificador estático CRTT+L en JavaScript puro (`src/shared/crttl-evaluator.js`, probado con `node --test`) que evalúa patrones sintácticos reales y Sandbox de pruebas en `creacion-agentes.html`. |
| **Densidad Visual y Confort** | Al menos 1 diagrama técnico vectorial por módulo, paleta de serenidad Brisa Nórdica sin fondos negros agresivos. | **Cumple** | Diagramas de secuencia y flujo SVG vectoriales accesibles en `fundamentos.html` y `agentes-preconstruidos.html`; paleta `#3669A4` / `#F4F7FB`. |
| **Evaluación y Rúbrica** | Rúbrica analítica observable con 5 niveles de desempeño, cuestionario de 15 preguntas y certificado digital. | **Cumple** | `evaluacion.html` contiene el cuestionario interactivo con retroalimentación formativa y la rúbrica del proyecto integrador. |
| **Accesibilidad y Calidad Web** | Navegación por teclado, foco visible, contraste de color, `rel="noopener noreferrer"` y 0 errores estáticos. | **Cumple** | Auditoría estática ejecutada con `Test-WebQuality.ps1` superada con **0 errores y 0 advertencias**. |
| **Fuentes y Rigor** | Documentación oficial de Microsoft Copilot 2026 y lineamientos curriculares fechados. | **Cumple** | Fuentes primarias citadas en `guide.manifest.json` y explicaciones del ecosistema Copilot Studio. |
| **Transferencia** | Aplicación directa a un proyecto formativo o laboral propio del aprendiz. | **Cumple** | La Actividad 7 exige diseñar y medir un flujo de trabajo aplicado a su propio entorno laboral o formativo. |

---

## 2. Decisiones Verificadas

1. **Protección de Datos Comerciales (CDP):** Se enfatiza taxativamente que el inicio de sesión institucional (`@sena.edu.co` o corporativo) activa el límite de seguridad que impide el entrenamiento de modelos públicos de OpenAI/Microsoft.
2. **Diferenciación de Licencias:** Queda claramente separado qué funciones corresponden a la licencia base (Copilot Chat web) frente a la suscripción con complemento M365 Copilot (Word, Excel, Teams integrado).
3. **Gobierno de la IA y Alucinaciones:** Se enseña el protocolo de verificación humana obligatoria (*Human-in-the-loop*), estableciendo que Copilot es un coautor inicial y no un emisor de dictámenes definitivos.

---

## 3. Pendientes Externos a la Ejecución Local

- **Validación con aprendices reales:** Se ha completado la revisión editorial y la comprobación estática automatizada. La observación directa en ambiente de aprendizaje con aprendices principiantes queda como iteración pedagógica continua.
- **Acceso a tenants de Microsoft:** La disponibilidad de Copilot Studio y licencias M365 Copilot depende de la asignación y políticas que configure el administrador de TI de cada institución o centro.
