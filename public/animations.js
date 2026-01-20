document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. ANIMACIÓN DE FONDO (Emoji Rain) - Ya existente
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
    // 2. LÓGICA DE FASE 2 (Tickets, Carrusel, Modal)
    // ---------------------------------------------------------
    init();
});

// VARIABLES GLOBALES (Necesarias para los onclick en el HTML)
let bData = {};
let sActiva = 'A';
let selNum = null;
const WA_NUM = "529983016050";

async function init() {
    try {
        const res = await fetch('/api/boletos');
        if (!res.ok) throw new Error('Error al cargar boletos');
        bData = await res.json();
        renderSeries();
        renderTickets();

        // Initialize Timeline Carousel
        if(typeof Swiper !== 'undefined' && document.querySelector(".myTimelineSwiper")) {
            new Swiper(".myTimelineSwiper", {
                pagination: { el: ".swiper-pagination", dynamicBullets: true },
                autoplay: { delay: 5000, disableOnInteraction: false },
                loop: true
            });
        }

        initCountdown();
    } catch (e) {
        console.error("Error inicializando:", e);
    }
}

function initCountdown() {
    const target = new Date("Feb 14, 2025 20:30:00").getTime();
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

function copyCard() {
    navigator.clipboard.writeText("4152314526471894");
    alert("Tarjeta copiada.");
}

function renderSeries() {
    const nav = document.getElementById('series-nav');
    if(!nav) return;
    nav.innerHTML = Object.keys(bData).map(s => `
        <button onclick="changeSerie('${s}')" class="px-6 py-4 rounded-[20px] font-black transition-all ${sActiva==s?'bg-orange-600 text-white shadow-xl scale-105':'glass text-gray-600'}">${s}</button>
    `).join('');
}

function changeSerie(s) {
    sActiva = s;
    renderSeries();
    renderTickets();
}

function renderTickets() {
    const grid = document.getElementById('tickets-grid');
    if(!grid) return;

    if(!bData[sActiva]) return;

    grid.innerHTML = bData[sActiva].map(b => {
        const isV = b.estado === 'vendido';
        return `
        <div onclick="${isV ? '' : `abrirM(${b.numero})`}"
             class="h-24 rounded-[30px] flex flex-col items-center justify-center relative transition-all ${isV ? 'sold-card' : 'glass border-slate-200/50 hover:bg-white active:scale-95 cursor-pointer'}">
            <span class="text-[8px] absolute top-2 opacity-30 font-bold tracking-widest text-slate-400">${sActiva}</span>
            <span class="text-2xl font-black ${isV ? 'ticket-num-soft' : 'text-slate-300'}">${b.numero}</span>
            ${isV ? `<span class="text-[7px] text-soft-orange truncate px-2 w-full text-center mt-1 uppercase">${b.nombre_completo || 'Vendido'}</span>` : ''}
        </div>`;
    }).join('');
}

function abrirM(n) {
    selNum = n;
    const targetEl = document.getElementById('modal-target');
    const modalEl = document.getElementById('modal');
    if(targetEl) targetEl.innerText = `${sActiva}${n}`;
    if(modalEl) modalEl.classList.remove('hidden');
}

function cerrarModal() {
    const modalEl = document.getElementById('modal');
    if(modalEl) modalEl.classList.add('hidden');
}

async function confirmarCompra() {
    const n = document.getElementById('form-nombre').value;
    const t = document.getElementById('form-tel').value;
    if(!n || !t) return alert("Llena tus datos.");

    try {
        const r = await fetch('/api/comprar', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ serie: sActiva, numero: selNum, nombre: n, telefono: t })
        });
        if(r.ok) {
            const msg = encodeURIComponent(`Hola Selene, aparté el boleto ${sActiva}${selNum} para ayudar a Lael. Soy ${n}.`);
            window.location.href = `https://wa.me/${WA_NUM}?text=${msg}`;
        } else {
            alert('Error al apartar boleto. Inténtalo de nuevo.');
        }
    } catch(e) {
        console.error(e);
        alert('Error de conexión.');
    }
}
