class CelebrationPage {
    constructor() {
        this.music = document.getElementById('romanticMusic');
        this.musicToggle = document.getElementById('musicToggle');
        this.isPlaying = false;
        
        this.init();
    }

    init() {
        this.createRomanticStickers();
        this.createCelebrationHearts();
        this.setupMusicControls();
        this.startCelebration();
    }

    createRomanticStickers() {
        const stickersContainer = document.getElementById('stickersContainer');
        const romanticStickers = [
            '💕', '💖', '💗', '💝', '💘', '💞', '💓', '❤️', '🌹', '🌺', 
            '🦋', '✨', '💫', '⭐', '🌟', '💐', '🎀', '💎', '👑', '🕊️'
        ];
        
        for (let i = 0; i < 25; i++) {
            const sticker = document.createElement('div');
            sticker.className = 'sticker';
            sticker.textContent = romanticStickers[Math.floor(Math.random() * romanticStickers.length)];
            sticker.style.left = Math.random() * 100 + '%';
            sticker.style.top = Math.random() * 100 + '%';
            sticker.style.animationDelay = Math.random() * 4 + 's';
            sticker.style.fontSize = (Math.random() * 2 + 2) + 'rem';
            stickersContainer.appendChild(sticker);
        }
    }

    createCelebrationHearts() {
        const heartsContainer = document.getElementById('celebrationHearts');
        const heartColors = ['#d4af37', '#dc143c', '#ff69b4', '#ff1493', '#ffd700'];
        
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
            heart.style.animation = `float ${Math.random() * 3 + 4}s ease-in-out infinite`;
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.opacity = '0.6';
            heartsContainer.appendChild(heart);
        }
    }

    setupMusicControls() {
        this.musicToggle.addEventListener('click', () => {
            if (this.isPlaying) {
                this.music.pause();
                this.musicToggle.textContent = '🎵';
                this.isPlaying = false;
            } else {
                this.music.play().catch(() => {
                    console.log('Music autoplay blocked');
                });
                this.musicToggle.textContent = '🔇';
                this.isPlaying = true;
            }
        });
    }

    startCelebration() {
        // Auto-start music (may be blocked by browser)
        setTimeout(() => {
            this.music.play().catch(() => {
                console.log('Autoplay blocked - user can click music button');
            });
            this.isPlaying = true;
            this.musicToggle.textContent = '🔇';
        }, 1000);

        // Create periodic heart bursts
        setInterval(() => {
            this.createHeartBurst();
        }, 5000);
    }

    createHeartBurst() {
        const colors = ['#d4af37', '#dc143c', '#ff69b4', '#ff1493'];
        
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.textContent = '💖';
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '2rem';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.transition = 'all 2s ease-out';
            
            document.body.appendChild(heart);
            
            // Burst animation
            setTimeout(() => {
                const angle = (i / 10) * 2 * Math.PI;
                const distance = 200;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                heart.style.transform = `translate(${x}px, ${y}px) scale(0)`;
                heart.style.opacity = '0';
            }, 100);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 2200);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CelebrationPage();
});