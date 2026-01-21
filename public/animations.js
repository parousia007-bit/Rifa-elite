document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------------
       1. BACKGROUND ANIMATIONS (Floating Emojis)
       ----------------------------------------------------- */
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
        setTimeout(() => { el.remove(); }, (duration + 2) * 1000);
    }

    // Create a new element every 600ms
    setInterval(createElement, 600);


    /* -----------------------------------------------------
       2. HERO VIDEO INTERACTION (TikTok Style)
       ----------------------------------------------------- */
    const video = document.getElementById('hero-video');
    const videoWrapper = document.querySelector('.video-wrapper'); // Target wrapper for click if needed

    if (video) {
        // Function to handle Enter Fullscreen
        const enterExperience = () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            }

            video.muted = false;
            video.currentTime = 0; // Optional: Restart video? User didn't ask, so maybe not.
            video.controls = true;
            video.play().catch(e => console.log("Play error:", e));
        };

        // Click on video triggers experience
        video.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling to wrapper
            // Only trigger if not already in fullscreen (standard behavior handles toggling usually, but we want specific settings)
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                enterExperience();
            }
        });

        // Also allow clicking the overlay/wrapper to start
        if(videoWrapper) {
            videoWrapper.addEventListener('click', (e) => {
                 if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                    enterExperience();
                }
            });
        }

        // Handle Exit Fullscreen to reset state
        const handleExit = () => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                video.muted = true;
                video.controls = false;
                // Keep playing or pause? "TikTok" usually keeps playing in feed but muted.
                // We'll keep it playing muted.
            }
        };

        document.addEventListener('fullscreenchange', handleExit);
        document.addEventListener('webkitfullscreenchange', handleExit);
        document.addEventListener('mozfullscreenchange', handleExit);
        document.addEventListener('MSFullscreenChange', handleExit);
    }
});
