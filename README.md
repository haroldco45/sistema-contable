# Sistema Contable Cloud HM 📄📍

¡Bienvenido al **Sistema Contable Cloud HM**! Esta es una solución modular de software contable y facturación rápida construida bajo el estándar de **PWA (Progressive Web App)**. Diseñada con un enfoque nativo "mobile-first", permite una instalación inmediata en dispositivos móviles y de escritorio sin depender de tiendas de aplicaciones.

Este ecosistema está optimizado para capturar coordenadas geográficas de alta precisión en cada movimiento comercial y facilitar el despacho automático de comprobantes estructurados a través de plataformas de mensajería.

---

## 🚀 Características Clave

*   **PWA 100% Instalable:** Configuración optimizada a través de `manifest.json` y control de ciclo de vida mediante Service Workers (`sw.js`) para garantizar capacidades offline y carga instantánea.
*   **Geolocalización Comercial:** Integración nativa con la API de geolocalización del navegador para adjuntar la ubicación exacta del registro mediante un enlace a Google Maps.
*   **Integración con WhatsApp:** Motor de formateo de texto automatizado para disparar alertas y resúmenes de facturas con estilos limpios hacia la API universal de WhatsApp.
*   **Diseño Profesional e Interactivo:** Interfaz responsiva y fluida construida sobre componentes estilizados con Tailwind CSS.

---

## 🛠️ Stack Tecnológico

*   **Frontend:** HTML5, CSS3, JavaScript Moderno (ES6+).
*   **Estilos:** Tailwind CSS (CDN Engine).
*   **PWA Core:** Service Workers para persistencia en caché y archivo de manifiesto de aplicación.
*   **Despliegue Recomendado:** Netlify o GitHub Pages (requiere entorno HTTPS seguro para habilitar los permisos de instalación y GPS).

---

## 📂 Estructura del Proyecto

La arquitectura del repositorio mantiene los componentes totalmente aislados para facilitar su escalabilidad:

```text
├── index.html          # Interfaz de usuario y estructura del formulario base
├── manifest.json       # Configuración de apariencia e instalación de la PWA
├── sw.js               # Service Worker para gestión de caché y soporte offline
├── css/
│   └── styles.css      # Reglas y estilos complementarios de interacción
└── js/
    ├── app.js          # Inicialización del entorno PWA y captura de eventos de UI
    └── geo.js          # Módulo core de geolocalización y despacho a WhatsApp
