class ValentineExperience {
    constructor() {
        this.yesBtn = document.getElementById('yesBtn');
        this.noBtn = document.getElementById('noBtn');
        this.questionSection = document.getElementById('questionSection');
        
        this.init();
    }

    init() {
        this.createFloatingHearts();
        this.setupEventListeners();
    }

    createFloatingHearts() {
        const heartsContainer = document.getElementById('heartsBackground');
        const heartSymbols = ['❤️', '💕', '💖', '💗', '💝'];
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 6 + 's';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            heartsContainer.appendChild(heart);
        }
    }

    setupEventListeners() {
        this.yesBtn.addEventListener('click', () => this.handleYesClick());
        
        // Desktop hover
        this.noBtn.addEventListener('mouseenter', () => this.moveNoButton());
        
        // Mobile touch
        this.noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.moveNoButton();
        });
        
        // Prevent actual clicking
        this.noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.moveNoButton();
        });
    }

    moveNoButton() {
        const container = this.noBtn.parentElement;
        const containerRect = container.getBoundingClientRect();
        const btnRect = this.noBtn.getBoundingClientRect();
        
        // Calculate safe movement boundaries
        const maxX = containerRect.width - btnRect.width - 40;
        const maxY = containerRect.height - btnRect.height - 40;
        
        // Generate random position
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        // Apply smooth movement
        this.noBtn.style.position = 'absolute';
        this.noBtn.style.left = newX + 'px';
        this.noBtn.style.top = newY + 'px';
        this.noBtn.style.transform = 'scale(0.9)';
        
        // Reset scale after animation
        setTimeout(() => {
            this.noBtn.style.transform = 'scale(1)';
        }, 200);
    }

    handleYesClick() {
        // Redirect to celebration page
        window.location.href = 'celebration.html';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ValentineExperience();
});