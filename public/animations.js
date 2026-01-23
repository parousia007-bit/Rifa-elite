document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. ANIMACIÓN DE FONDO (Emoji Rain)
    // ---------------------------------------------------------
    const container = document.createElement('div');
    container.id = 'animation-container';
    document.body.prepend(container);

    const icons = ['☁️', '☁️', '❤️', '💙', '💖', '✨', '🤍'];

    function createElement() {
        const el = document.createElement('div');
        el.classList.add('floating-element');
        el.innerText = icons[Math.floor(Math.random() * icons.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = (Math.random() * 25 + 15) + 'px';

        const duration = Math.random() * 7 + 8;
        el.style.animationDuration = duration + 's';
        el.style.animationDelay = Math.random() * 2 + 's';

        container.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, (duration + 2) * 1000);
    }

    setInterval(createElement, 600);

    // ---------------------------------------------------------
    // 2. LÓGICA DE FASE 2
    // ---------------------------------------------------------
    init();
});

// VARIABLES GLOBALES
window.bData = {};
window.sActiva = 'A';
window.selNum = null;
window.WA_NUM = "529983016050";
window.GALLERY_IMAGES = [];

async function init() {
    try {
        // 1. Fetch Ticket Data
        const res = await fetch('/api/boletos');
        if (!res.ok) throw new Error('Error al cargar boletos');
        window.bData = await res.json();
        renderSeries();
        renderTickets();

        // 2. Fetch Gallery Images for Carousel
        await loadGalleryImages();

        // 3. Init Other Components
        initCountdown();
        // Video logic is now handled by expandVideo() via onclick

        document.body.classList.remove('hidden');

    } catch (e) {
        console.error("Error inicializando:", e);
        document.body.classList.remove('hidden');
    }
}

async function loadGalleryImages() {
    try {
        const res = await fetch('/api/gallery-images');
        if (res.ok) {
            const files = await res.json();
            window.GALLERY_IMAGES = files.map(f => `/img/${f}`);
            renderCarousel(window.GALLERY_IMAGES);
        }
    } catch (e) {
        console.error("Gallery fetch error:", e);
    }
}

function renderCarousel(images) {
    const wrapper = document.getElementById('carousel-wrapper');
    if (!wrapper) return;

    wrapper.innerHTML = images.map((src, index) => `
        <div class="swiper-slide relative">
            <img src="${src}" class="w-full h-full object-cover">
            <div class="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                <span class="text-white/80 text-xs font-bold uppercase tracking-widest">Galería Rifa Lael • Foto ${index + 1}</span>
            </div>
        </div>
    `).join('');

    if(typeof Swiper !== 'undefined' && document.querySelector(".myTimelineSwiper")) {
        new Swiper(".myTimelineSwiper", {
            pagination: { el: ".swiper-pagination", dynamicBullets: true },
            autoplay: { delay: 4000, disableOnInteraction: false },
            loop: true,
            effect: 'fade',
            fadeEffect: { crossFade: true }
        });
    }
}

function initCountdown() {
    const target = new Date("Feb 14, 2026 20:30:00").getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');

    if(!daysEl) return;

    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff > 0) {
            daysEl.innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            hoursEl.innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            minsEl.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        }
    }, 1000);
}

// VIDEO INTERACTION (New Requirement)
window.expandVideo = function() {
    const video = document.getElementById('heroVideo');
    if (!video) return;

    // Request Fullscreen
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }

    // Unmute
    video.muted = false;
    video.volume = 1.0;
}

// Global functions
window.copyCard = function() {
    navigator.clipboard.writeText("4152314526471894");
    alert("Tarjeta copiada.");
}

function renderSeries() {
    const nav = document.getElementById('series-nav');
    if(!nav) return;
    nav.innerHTML = Object.keys(window.bData).map(s => `
        <button onclick="changeSerie('${s}')" class="px-6 py-4 rounded-[20px] font-black transition-all ${window.sActiva==s?'bg-orange-accent text-white shadow-xl scale-105':'glass text-gray-600'}">${s}</button>
    `).join('');
}

window.changeSerie = function(s) {
    window.sActiva = s;
    renderSeries();
    renderTickets();
}

function renderTickets() {
    const grid = document.getElementById('tickets-grid');
    if(!grid) return;

    if(!window.bData[window.sActiva]) return;

    grid.innerHTML = window.bData[window.sActiva].map(b => {
        const isV = b.estado === 'vendido';
        return `
        <div onclick="${isV ? '' : `abrirM(${b.numero})`}"
             class="h-24 rounded-[30px] flex flex-col items-center justify-center relative transition-all ${isV ? 'sold-card' : 'glass border-white/5 active:scale-95 cursor-pointer'}">
            <span class="text-[8px] absolute top-2 opacity-20 font-bold tracking-widest text-white">${window.sActiva}</span>
            <span class="text-2xl font-black ${isV ? 'ticket-num-soft' : 'text-white/40'}">${b.numero}</span>
            ${isV ? `<span class="text-[7px] text-soft-orange truncate px-2 w-full text-center mt-1 uppercase">${b.nombre_completo || 'Vendido'}</span>` : ''}
        </div>`;
    }).join('');
}

window.abrirM = function(n) {
    window.selNum = n;
    const targetEl = document.getElementById('modal-target');
    const modalEl = document.getElementById('modal');
    if(targetEl) targetEl.innerText = `${window.sActiva}${n}`;
    if(modalEl) modalEl.classList.remove('hidden');
}

window.cerrarModal = function() {
    const modalEl = document.getElementById('modal');
    if(modalEl) modalEl.classList.add('hidden');
}

window.confirmarCompra = async function() {
    const n = document.getElementById('form-nombre').value;
    const t = document.getElementById('form-tel').value;
    if(!n || !t) return alert("Llena tus datos.");

    try {
        const r = await fetch('/api/comprar', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ serie: window.sActiva, numero: window.selNum, nombre: n, telefono: t })
        });
        if(r.ok) {
            const msg = encodeURIComponent(`Hola Selene, aparté el boleto ${window.sActiva}${window.selNum} para ayudar a Lael. Soy ${n}.`);
            window.location.href = `https://wa.me/${window.WA_NUM}?text=${msg}`;
        } else {
            alert('Error al apartar boleto. Inténtalo de nuevo.');
        }
    } catch(e) {
        console.error(e);
        alert('Error de conexión.');
    }
}

window.openGallery = function() {
    const modal = document.getElementById('gallery-modal');
    const content = document.getElementById('gallery-content');
    const images = window.GALLERY_IMAGES;

    content.innerHTML = images.map(src => `
        <div class="aspect-square rounded-xl overflow-hidden border border-white/20 hover:scale-105 transition-transform">
            <img src="${src}" class="w-full h-full object-cover">
        </div>
    `).join('');

    modal.classList.remove('hidden');
}

window.closeGallery = function() {
    document.getElementById('gallery-modal').classList.add('hidden');
}
function toggleLive() {
    const modal = document.getElementById('live-modal');
    const frame = document.getElementById('live-frame');
    // Reemplaza ID_DE_TU_VIDEO cuando empieces el en vivo
    const liveUrl = "https://www.youtube.com/embed/live_stream?channel=UCR_c0xjhs0aQvyJBJPFq_2g";
    
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
        frame.src = "";
    } else {
        modal.style.display = 'flex';
        frame.src = liveUrl;
    }
}
