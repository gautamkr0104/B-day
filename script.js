// Image URLs from GitHub
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/gautamkr0104/B-day/main/assets/';
const TOTAL_IMAGES = 18;

// Create image URLs array
const imageUrls = Array.from({ length: TOTAL_IMAGES }, (_, i) => 
    `${GITHUB_BASE_URL}${i + 1}.jpg`
);

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const nextBtn = document.getElementById('nextBtn');
const nextBtn2 = document.getElementById('nextBtn2');
const nextBtn3 = document.getElementById('nextBtn3');
const nextBtn4 = document.getElementById('nextBtn4');
const nextBtn5 = document.getElementById('nextBtn5');
const restartBtn = document.getElementById('restartBtn');
const musicBtn = document.getElementById('musicBtn');
const confettiContainer = document.getElementById('confetti-container');

let currentImageIndex = 0;
let isMusicPlaying = false;
let currentStep = 1;
const totalSteps = 6;

// Initialize Gallery
function initGallery() {
    imageUrls.forEach((url, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${url}" alt="Memory ${index + 1}" loading="lazy" onerror="this.src='https://via.placeholder.com/400?text=Image+${index + 1}'">
            <div class="gallery-overlay">
                <span class="gallery-number">Memory #${index + 1}</span>
            </div>
        `;
        galleryItem.addEventListener('click', () => openModal(index));
        galleryGrid.appendChild(galleryItem);
    });
}

// Modal Functions
function openModal(index) {
    currentImageIndex = index;
    modalImage.src = imageUrls[index];
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % TOTAL_IMAGES;
    modalImage.src = imageUrls[currentImageIndex];
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + TOTAL_IMAGES) % TOTAL_IMAGES;
    modalImage.src = imageUrls[currentImageIndex];
}

// Event Listeners for Modal
modalClose.addEventListener('click', closeModal);
modalNext.addEventListener('click', showNextImage);
modalPrev.addEventListener('click', showPrevImage);

galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
});

// Confetti Animation
function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#ffd93d', '#6c5ce7', '#00b894', '#fd79a8'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            const shapes = ['circle', 'square'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            }
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }
}

// Step Navigation
function goToStep(stepNumber) {
    // Hide current step
    const currentSection = document.getElementById(`step${currentStep}`);
    if (currentSection) {
        currentSection.classList.add('hidden');
        currentSection.classList.remove('active');
    }
    
    // Show new step
    const newSection = document.getElementById(`step${stepNumber}`);
    if (newSection) {
        newSection.classList.remove('hidden');
        newSection.classList.add('active');
    }
    
    currentStep = stepNumber;
    createConfetti();
    
    // Scroll to top of new section
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Trigger confetti on page load
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
});

// Navigation button event listeners
nextBtn.addEventListener('click', () => goToStep(2));
nextBtn2.addEventListener('click', () => goToStep(3));
nextBtn3.addEventListener('click', () => goToStep(4));
nextBtn4.addEventListener('click', () => goToStep(5));
nextBtn5.addEventListener('click', () => goToStep(6));
restartBtn.addEventListener('click', () => goToStep(1));

// Music Player (using Web Audio API for a simple tone)
let audioContext;
let oscillator;
let gainNode;

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function playBirthdayTone() {
    if (!audioContext) initAudio();
    
    // Simple birthday melody
    const notes = [
        { freq: 261.63, duration: 0.3 }, // C4
        { freq: 261.63, duration: 0.3 }, // C4
        { freq: 293.66, duration: 0.6 }, // D4
        { freq: 261.63, duration: 0.6 }, // C4
        { freq: 349.23, duration: 0.6 }, // F4
        { freq: 329.63, duration: 1.2 }, // E4
    ];
    
    let time = audioContext.currentTime;
    
    notes.forEach(note => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.value = note.freq;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + note.duration);
        
        osc.start(time);
        osc.stop(time + note.duration);
        
        time += note.duration;
    });
}

musicBtn.addEventListener('click', () => {
    isMusicPlaying = !isMusicPlaying;
    
    if (isMusicPlaying) {
        musicBtn.classList.add('playing');
        musicBtn.querySelector('.music-text').textContent = 'Playing';
        playBirthdayTone();
        createConfetti();
    } else {
        musicBtn.classList.remove('playing');
        musicBtn.querySelector('.music-text').textContent = 'Play Music';
    }
});

// Wish Function
function makeWish(card) {
    if (card.classList.contains('wish-made')) return;
    
    const type = card.dataset.type;
    card.classList.add('wish-made');
    card.style.position = 'relative';
    
    if (type === 'star') {
        card.querySelector('.wish-text').textContent = 'Wish made! 🌟';
        // Shooting star effect
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.style.position = 'absolute';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = '0%';
                star.style.fontSize = '1.5rem';
                star.style.pointerEvents = 'none';
                star.style.animation = 'shootingStar 2s ease forwards';
                star.textContent = '⭐';
                card.appendChild(star);
                setTimeout(() => star.remove(), 2000);
            }, i * 100);
        }
    } else if (type === 'cake') {
        card.querySelector('.wish-text').textContent = 'Candles blown! 🎂';
        // Candle puff effect
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const puff = document.createElement('div');
                puff.style.position = 'absolute';
                puff.style.left = (30 + Math.random() * 40) + '%';
                puff.style.top = '20%';
                puff.style.fontSize = '1.5rem';
                puff.style.pointerEvents = 'none';
                puff.style.animation = 'puff 1s ease forwards';
                puff.textContent = '💨';
                card.appendChild(puff);
                setTimeout(() => puff.remove(), 1000);
            }, i * 50);
        }
    } else if (type === 'gift') {
        card.querySelector('.wish-text').textContent = 'Gift opened! 🎁';
        // Gift reveal with confetti
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'absolute';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = Math.random() * 100 + '%';
                confetti.style.fontSize = '1.5rem';
                confetti.style.pointerEvents = 'none';
                confetti.style.animation = 'sparkle 1.5s ease forwards';
                const emojis = ['🎊', '🎉', '🎈', '💖', '✨'];
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                card.appendChild(confetti);
                setTimeout(() => confetti.remove(), 1500);
            }, i * 50);
        }
    }
    
    createConfetti();
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery but don't show it yet
    initGallery();
    
    // Ensure only step 1 is visible initially
    for (let i = 2; i <= totalSteps; i++) {
        const section = document.getElementById(`step${i}`);
        if (section) {
            section.classList.add('hidden');
        }
    }
    
    // Make step 1 active
    const step1 = document.getElementById('step1');
    if (step1) {
        step1.classList.remove('hidden');
        step1.classList.add('active');
    }
});

// Make makeWish available globally
window.makeWish = makeWish;
