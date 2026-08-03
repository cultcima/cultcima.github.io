document.addEventListener("DOMContentLoaded", function () {
    // 1. Inicialización del Mapa Interactivo con Leaflet.js
    // Coordenadas centradas en la Zona Metropolitana de la CDMX
    const mapa = L.map('mapa-cultural').setView([19.4285, -99.1600], 12);

    // Carga de capa del mapa (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(mapa);

    // Definición de Puntos Clave de Recorridos y Visitas
    const destinos = [
        {
            nombre: "Castillo de Chapultepec",
            coordenadas: [19.4204, -99.1818],
            descripcion: "Museo Nacional de Historia y mirador del Bosque de Chapultepec."
        },
        {
            nombre: "Museo Nacional de Antropología",
            coordenadas: [19.4260, -99.1863],
            descripcion: "El museo arqueológico más destacado de Latinoamérica."
        },
        {
            nombre: "Museo Soumaya",
            coordenadas: [19.4407, -99.2047],
            descripcion: "Arquitectura icónica y colecciones de arte internacional."
        },
        {
            nombre: "Complejo Cultural Los Pinos",
            coordenadas: [19.4150, -99.1915],
            descripcion: "Antigua residencia presidencial y espacio cultural abierto."
        },
        {
            nombre: "Catedral Metropolitana y Zócalo",
            coordenadas: [19.4326, -99.1332],
            descripcion: "Corazón histórico de Tenochtitlan y Virreinato."
        }
    ];

    // Añadir Marcadores al Mapa con Popups interactivos
    destinos.forEach(punto => {
        L.marker(punto.coordenadas)
            .addTo(mapa)
            .bindPopup(`
                <div style="font-family: Arial, sans-serif; text-align: center;">
                    <h6 style="font-weight: bold; margin-bottom: 4px; color: #E91E63;">${punto.nombre}</h6>
                    <p style="font-size: 12px; margin: 0; color: #555;">${punto.descripcion}</p>
                </div>
            `);
    });

    // 2. Desplazamiento Suave (Smooth Scroll) para el Menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});