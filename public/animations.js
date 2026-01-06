document.addEventListener('DOMContentLoaded', () => {
    // Crear el contenedor automáticamente
    const container = document.createElement('div');
    container.id = 'animation-container';
    document.body.prepend(container);

    // Los emojis que usaremos (nubes, corazones, brillos)
    const icons = ['☁️', '☁️', '❤️', '💙', '💖', '✨', '🤍'];

    function createElement() {
        const el = document.createElement('div');
        el.classList.add('floating-element');
        // Elegir un icono al azar
        el.innerText = icons[Math.floor(Math.random() * icons.length)];

        // Posición horizontal al azar (de 0 a 100% del ancho)
        el.style.left = Math.random() * 100 + 'vw';
        // Tamaño al azar (entre 15px y 40px)
        el.style.fontSize = (Math.random() * 25 + 15) + 'px';
        
        // Duración de la subida al azar (entre 8 y 15 segundos para que sea suave)
        const duration = Math.random() * 7 + 8;
        el.style.animationDuration = duration + 's';
        
        // Retraso inicial para que no salgan todos de golpe
        el.style.animationDelay = Math.random() * 2 + 's';

        container.appendChild(el);

        // Limpieza: borrar el elemento cuando termine de subir para no saturar la memoria
        setTimeout(() => {
            el.remove();
        }, (duration + 2) * 1000);
    }

    // Crear un nuevo elemento cada 600 milisegundos (aprox. 2 por segundo)
    setInterval(createElement, 600);
});
