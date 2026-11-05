# ADR-001: Adopción de Arquitectura Multipágina Estática Pura

- **Fecha:** 2026-10-29
- **Estado:** Aceptado
- **Contexto:**
  El público objetivo de la guía educativa incluye aprendices técnicos, instructores y profesionales que pueden tener limitaciones de conectividad en centros de formación o equipos institucionales bloqueados por políticas de TI corporativas donde no es posible instalar entornos de Node.js, compilar proyectos en Vite ni ejecutar servidores locales.
- **Decisión:**
  Construir la solución como un portal web multipágina estático puro (8 archivos HTML independientes), con todos los estilos CSS y scripts JavaScript completamente inline y autocontenidos. Cada archivo puede abrirse directamente mediante doble clic en el explorador de archivos con protocolo `file://`.
- **Consecuencias:**
  - *Positivas:* Máxima portabilidad, carga instantánea, cero dependencias rotas por actualizaciones de paquetes, compatibilidad universal con cualquier navegador moderno (Edge, Chrome, Firefox).
  - *Negativas:* Cierta duplicación en los bloques de encabezado y pie de página de cada archivo HTML, la cual se mitiga mediante un riguroso script de verificación de enlaces y pruebas estáticas automáticas en CI.
