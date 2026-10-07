
document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       1. MAPA INTERACTIVO
    ========================================== */

    const mapaElemento = document.getElementById("mapa-cultural");

    if (mapaElemento) {

        const mapa = L.map("mapa-cultural")
            .setView(
                [19.4285, -99.1600],
                12
            );


        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 18,

                attribution:
                    "© OpenStreetMap"
            }
        ).addTo(mapa);


        const destinos = [

            {
                nombre:
                    "Castillo de Chapultepec",

                coordenadas:
                    [19.4204, -99.1818],

                descripcion:
                    "Museo Nacional de Historia y mirador del Bosque de Chapultepec."
            },


            {
                nombre:
                    "Museo Nacional de Antropología",

                coordenadas:
                    [19.4260, -99.1863],

                descripcion:
                    "Uno de los museos culturales y arqueológicos más importantes de México."
            },


            {
                nombre:
                    "Museo Soumaya",

                coordenadas:
                    [19.4407, -99.2047],

                descripcion:
                    "Arquitectura icónica y colecciones de arte internacional."
            },


            {
                nombre:
                    "Complejo Cultural Los Pinos",

                coordenadas:
                    [19.4150, -99.1915],

                descripcion:
                    "Antigua residencia presidencial y espacio cultural abierto."
            },


            {
                nombre:
                    "Catedral Metropolitana y Zócalo",

                coordenadas:
                    [19.4326, -99.1332],

                descripcion:
                    "Corazón histórico de la Ciudad de México."
            }

        ];


        destinos.forEach(function (punto) {

            L.marker(punto.coordenadas)

                .addTo(mapa)

                .bindPopup(`

                    <div
                        style="
                            font-family: Arial, sans-serif;
                            text-align: center;
                        "
                    >

                        <h6
                            style="
                                font-weight: bold;
                                margin-bottom: 4px;
                                color: #E91E63;
                            "
                        >

                            ${punto.nombre}

                        </h6>

                        <p
                            style="
                                font-size: 12px;
                                margin: 0;
                                color: #555;
                            "
                        >

                            ${punto.descripcion}

                        </p>

                    </div>

                `);

        });

    }


    /* =========================================
       2. SMOOTH SCROLL
    ========================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (anchor) {

            anchor.addEventListener(
                "click",
                function (e) {

                    const href =
                        this.getAttribute("href");

                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(href);


                    if (target) {

                        e.preventDefault();


                        target.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });


                        /*
                         * Cerrar menú móvil
                         */

                        const navbar =
                            document.getElementById(
                                "navbarResponsive"
                            );


                        if (
                            navbar &&
                            navbar.classList.contains("show")
                        ) {

                            const collapse =
                                bootstrap.Collapse
                                    .getInstance(navbar);


                            if (collapse) {

                                collapse.hide();

                            }

                        }

                    }

                }

            );

        });


    /* =========================================
       3. FECHA MÍNIMA
    ========================================== */

    const fechaInput =
        document.getElementById("fecha");


    if (fechaInput) {

        const hoy =
            new Date();


        const año =
            hoy.getFullYear();


        const mes =
            String(
                hoy.getMonth() + 1
            ).padStart(2, "0");


        const dia =
            String(
                hoy.getDate()
            ).padStart(2, "0");


        fechaInput.min =
            `${año}-${mes}-${dia}`;

    }


    /* =========================================
       4. FORMULARIO DE WHATSAPP
    ========================================== */

    const whatsappForm =
        document.getElementById(
            "whatsappForm"
        );


    if (whatsappForm) {

        whatsappForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const nombre =
                    document
                        .getElementById("nombre")
                        .value
                        .trim();


                const fecha =
                    document
                        .getElementById("fecha")
                        .value;


                const personas =
                    document
                        .getElementById("personas")
                        .value;


                const destino =
                    document
                        .getElementById("destino")
                        .value;


                const mensaje =
                    document
                        .getElementById("mensaje")
                        .value
                        .trim();


                /*
                 * Convertir fecha YYYY-MM-DD
                 * a formato legible en español.
                 */

                const fechaSeleccionada =
                    new Date(
                        fecha + "T00:00:00"
                    );


                const fechaFormateada =
                    fechaSeleccionada.toLocaleDateString(
                        "es-MX",
                        {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    );


                /*
                 * Crear mensaje para WhatsApp.
                 */

                const texto =

`Hola, CULTCIMA.

Me gustaría solicitar información para un recorrido.

*Nombre:* ${nombre}
*Destino:* ${destino}
*Fecha deseada:* ${fechaFormateada}
*Número de personas:* ${personas}

*Comentarios adicionales:*
${mensaje || "Sin comentarios adicionales."}

Quedo atento(a) a su información y disponibilidad.`;


                /*
                 * Número de WhatsApp de CULTCIMA.
                 */

                const numeroWhatsApp =
                    "525591916604";


                /*
                 * Crear URL de WhatsApp.
                 */

                const urlWhatsApp =
                    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;


                /*
                 * Abrir WhatsApp.
                 */

                window.open(
                    urlWhatsApp,
                    "_blank"
                );

            }

        );

    }


    /* =========================================
       5. ACTUALIZAR EMBEDS DE INSTAGRAM
    ========================================== */

    /*
     * Instagram puede tardar unos instantes
     * en procesar los embeds.
     *
     * Si embed.js ya está cargado,
     * procesamos los Reels.
     */

    function procesarInstagram() {

        if (
            window.instgrm &&
            window.instgrm.Embeds
        ) {

            window.instgrm.Embeds.process();

        }

    }


    /*
     * Primer intento.
     */

    procesarInstagram();


    /*
     * Segundo intento después de un pequeño
     * retraso para conexiones lentas.
     */

    setTimeout(
        procesarInstagram,
        1500
    );


});