class ValentineExperience {
    constructor() {
        this.music = document.getElementById('ambient-music');
        this.overlay = document.getElementById('start-overlay');
        this.sections = document.querySelectorAll('.section');
        this.fadeElements = document.querySelectorAll('.fade-in');
        
        this.init();
        this.setupButtons();
    }

    init() {
        this.overlay.addEventListener('click', () => this.startExperience());
        window.addEventListener('scroll', () => this.handleScroll());
        this.handleScroll();
    }

    startExperience() {
        this.music.play().catch(() => {
            document.addEventListener('click', () => this.music.play(), { once: true });
        });
        
        this.overlay.classList.add('hidden');
        setTimeout(() => this.overlay.style.display = 'none', 1000);
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        const totalHeight = document.body.scrollHeight - windowHeight;
        const scrollProgress = Math.min(scrolled / totalHeight, 1);
        this.music.volume = 0.3 + (scrollProgress * 0.5);

        this.fadeElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const revealPoint = 150;

            if (scrolled + windowHeight - revealPoint > elementTop && 
                scrolled < elementTop + elementHeight) {
                element.classList.add('visible');
            }
        });

        const finalSection = document.getElementById('revelation');
        const finalSectionTop = finalSection.offsetTop;
        
        if (scrolled + windowHeight > finalSectionTop + 200) {
            this.revealFinalMessage();
        }
    }

    revealFinalMessage() {
        const finalMessage = document.getElementById('final-message');
        if (!finalMessage.classList.contains('revealed')) {
            finalMessage.classList.add('revealed');
            this.music.volume = 0.9;
            
            setTimeout(() => {
                finalMessage.style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.3)';
            }, 500);
        }
    }

    setupButtons() {
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');
        
        if (!yesBtn || !noBtn) return;
        
        yesBtn.addEventListener('click', () => {
            yesBtn.innerHTML = 'I knew it! ❤️✨';
            yesBtn.style.background = '#d4af37';
            yesBtn.style.color = '#000';
            noBtn.style.display = 'none';
            
            setTimeout(() => {
                document.body.style.background = 'linear-gradient(45deg, #1a0000, #000000, #1a0000)';
            }, 500);
        });
        
        noBtn.addEventListener('mouseenter', () => {
            const randomX = Math.random() * 200 - 100;
            const randomY = Math.random() * 100 - 50;
            noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
        
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            noBtn.style.transform = 'translateX(50px) scale(0.8)';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ValentineExperience();
});