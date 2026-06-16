// Initial structured collection of compliments and jokes
const defaultPool = [
    // PERSONAL COMPLIMENTS
    { text: "Your optimism is incredibly contagious and makes everyone around you smile.", category: "personal", type: "compliment" },
    { text: "You have a natural ability to bring out the absolute best in others.", category: "personal", type: "compliment" },
    { text: "The world is a significantly brighter and warmer place with you in it.", category: "personal", type: "compliment" },
    { text: "Your capacity for kindness, empathy, and listening is deeply inspiring.", category: "personal", type: "compliment" },
    { text: "You possess the rare gift of making people feel truly seen, heard, and valued.", category: "personal", type: "compliment" },
    
    // WORK COMPLIMENTS
    { text: "Your creative perspective on complex issues is a breath of fresh air.", category: "work", type: "compliment" },
    { text: "That strategic idea you had in your last project was genuinely brilliant.", category: "work", type: "compliment" },
    { text: "Your exceptional eye for detail elevates everything you collaborate on.", category: "work", type: "compliment" },
    { text: "Your dedication, resilience, and stellar work ethic do not go unnoticed.", category: "work", type: "compliment" },
    { text: "You turn everyday collaborative moments into highly productive sessions.", category: "work", type: "compliment" },

    // MINDSET COMPLIMENTS
    { text: "You are far more resilient, capable, and smart than you give yourself credit for.", category: "mindset", type: "compliment" },
    { text: "Your courage to face obstacles and grow through them is highly remarkable.", category: "mindset", type: "compliment" },
    { text: "You have a beautiful ability to find the silver linings in unexpected places.", category: "mindset", type: "compliment" },
    { text: "The integrity and thought you bring to your choices is highly commendable.", category: "mindset", type: "compliment" },
    { text: "You consistently show up with an open heart and a courageous mindset.", category: "mindset", type: "compliment" },

    // JOKES
    { text: "Why don't scientists trust atoms? Because they make up everything!", category: "joke", type: "joke" },
    { text: "Why did the scarecrow win an award? Because he was outstanding in his field!", category: "joke", type: "joke" },
    { text: "Why don't skeletons fight each other? They don't have the guts.", category: "joke", type: "joke" },
    { text: "What do you call a fake noodle? An impasta!", category: "joke", type: "joke" },
    { text: "How do you organize a space party? You planet.", category: "joke", type: "joke" },
    { text: "Why did the bicycle fall over? Because it was two-tired!", category: "joke", type: "joke" },
    { text: "What do you call a sleeping dinosaur? A dino-snore!", category: "joke", type: "joke" },
    { text: "Why did the math book look sad? Because it had too many problems.", category: "joke", type: "joke" },
    { text: "How does a penguin build its house? Igloos it together!", category: "joke", type: "joke" },
    { text: "What do you call cheese that isn't yours? Nacho cheese!", category: "joke", type: "joke" }
];

// Active session variables
let activePool = [...defaultPool];
let currentCategoryFilter = "all";

// Cache DOM Element Targets
const textDisplay = document.getElementById('compliment-display');
const badgeDisplay = document.getElementById('category-badge');
const typeBadgeDisplay = document.getElementById('type-badge');
const nextButton = document.getElementById('next-btn');
const btnLabelText = document.getElementById('btn-label-text');
const copyButton = document.getElementById('copy-btn');
const shareButton = document.getElementById('share-btn');
const categoryTabs = document.querySelectorAll('.category-tab');

// Counter Elements
const totalCounter = document.getElementById('pool-counter');
const personalCounter = document.getElementById('count-personal');
const workCounter = document.getElementById('count-work');
const mindsetCounter = document.getElementById('count-mindset');
const jokeCounter = document.getElementById('count-joke');

// Form elements
const creatorForm = document.getElementById('add-compliment-form');
const inputTextField = document.getElementById('new-text');
const inputCategoryField = document.getElementById('new-category');

// Theme and UI selectors
const themeToggleBtn = document.getElementById('theme-toggle');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Interactive Canvas Particle Setup
const canvas = document.getElementById('interactive-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const mouse = { x: undefined, y: undefined, radius: 140 };

// Handle mouse tracking anywhere across the view
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Set fluid canvas bounds on initialization and changes
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

// Particle blueprints class structure
class AmbientParticle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // Spread initially across vertical space
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 80;
        this.size = Math.random() * 3.5 + 1.2;
        this.speedY = Math.random() * 0.6 + 0.2; // Slow vertical drift speed
        this.speedX = Math.random() * 0.3 - 0.15; // Slow sway
        this.opacity = Math.random() * 0.5 + 0.3;
        this.fadeRate = Math.random() * 0.003 + 0.0015;
        this.sinPhase = Math.random() * Math.PI * 2;
        this.sinFrequency = Math.random() * 0.02 + 0.005;
    }

    update() {
        // Vertical rise
        this.y -= this.speedY;

        // Natural horizontal sine wave sway
        this.sinPhase += this.sinFrequency;
        this.x += Math.sin(this.sinPhase) * 0.2 + this.speedX;

        // Mouse magnetic push interaction
        if (mouse.x !== undefined && mouse.y !== undefined) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.hypot(dx, dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                const pushX = Math.cos(angle) * force * 1.8;
                const pushY = Math.sin(angle) * force * 1.8;

                this.x += pushX;
                this.y += pushY;
            }
        }

        // Recycle particle once it drifts off-screen or fades out
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Color adaptivity depending on active theme system
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            // Golden, warm solar fireflies
            ctx.fillStyle = `rgba(252, 196, 25, ${this.opacity})`;
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = 'rgba(252, 196, 25, 0.4)';
        } else {
            // Warm coral and amber breeze pollen seeds
            ctx.fillStyle = `rgba(255, 107, 107, ${this.opacity * 0.8})`;
            ctx.shadowBlur = this.size;
            ctx.shadowColor = 'rgba(255, 107, 107, 0.2)';
        }
        
        ctx.fill();
        // Reset shadow values immediately for render performance optimization
        ctx.shadowBlur = 0;
    }
}

// Initialize active particle pool
function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(canvas.width / 24), 80); // Density threshold based on display viewport width
    for (let i = 0; i < count; i++) {
        particles.push(new AmbientParticle());
    }
}

// Loop animation pipeline
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

// Initialize Lucide Icons
function initIcons() {
    lucide.createIcons();
}

// Get items matching active category filter
function getFilteredPool() {
    if (currentCategoryFilter === "all") {
        return activePool;
    }
    return activePool.filter(item => item.category === currentCategoryFilter);
}

// Fetch random pool items preventing consecutive duplicates
function getNextItem() {
    const filteredPool = getFilteredPool();
    
    if (filteredPool.length === 0) {
        return { 
            text: "No elements found in this category! Create your own using the form.", 
            category: currentCategoryFilter, 
            type: currentCategoryFilter === 'joke' ? 'joke' : 'compliment' 
        };
    }

    if (filteredPool.length === 1) {
        return filteredPool[0];
    }

    let randomIndex;
    let chosenItem;
    
    do {
        randomIndex = Math.floor(Math.random() * filteredPool.length);
        chosenItem = filteredPool[randomIndex];
    } while (chosenItem.text === textDisplay.textContent);

    return chosenItem;
}

// Update the core panel card component UI with dynamic transitions
function refreshDisplay(forceItem = null) {
    const item = forceItem || getNextItem();

    // Trigger Fade-Out Animation Stage
    textDisplay.classList.add('fade-hidden');
    
    setTimeout(() => {
        // Change display text values
        textDisplay.textContent = item.text;
        
        // Configure tags
        badgeDisplay.textContent = item.category;
        badgeDisplay.className = "px-4 py-1.5 font-extrabold text-xs rounded-full uppercase tracking-widest font-display ";
        
        // Configure type labels dynamically
        typeBadgeDisplay.textContent = item.type;
        if (item.type === 'joke') {
            typeBadgeDisplay.className = "px-3 py-1.5 bg-sunny-500/10 dark:bg-sunny-500/20 text-yellow-600 dark:text-sunny-400 font-bold text-xs rounded-full uppercase tracking-wider";
            btnLabelText.textContent = "Get a New Joke";
        } else {
            typeBadgeDisplay.className = "px-3 py-1.5 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-full uppercase tracking-wider";
            btnLabelText.textContent = "Get a New Compliment";
        }

        // Category badges visual theme matching
        if (item.category === 'personal') {
            badgeDisplay.classList.add('bg-coral-500/10', 'text-coral-500', 'dark:bg-coral-500/20');
        } else if (item.category === 'work') {
            badgeDisplay.classList.add('bg-teal-500/10', 'text-teal-600', 'dark:bg-teal-500/20', 'dark:text-teal-400');
        } else if (item.category === 'mindset') {
            badgeDisplay.classList.add('bg-purple-500/10', 'text-purple-600', 'dark:bg-purple-500/20', 'dark:text-purple-400');
        } else if (item.category === 'joke') {
            badgeDisplay.classList.add('bg-amber-500/10', 'text-amber-600', 'dark:bg-amber-500/20', 'dark:text-amber-400');
        } else {
            badgeDisplay.classList.add('bg-gray-500/10', 'text-gray-600', 'dark:bg-gray-500/20', 'dark:text-gray-400');
        }

        // Trigger smooth Fade-In stage
        textDisplay.classList.remove('fade-hidden');
    }, 250);
}

// Non-blocking custom toast alerts
let toastTimeout = null;
function triggerToast(message) {
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    if (toastTimeout) clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 2500);
}

// Copy item to clipboard
function copyToClipboard() {
    const textToCopy = textDisplay.textContent;
    
    // Fallback selection mechanic
    const el = document.createElement('textarea');
    el.value = textToCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    triggerToast("Copied content to clipboard! 📋");
}

// Share post straight to X/Twitter platform
function shareOnX() {
    const rawText = `"${textDisplay.textContent}" — Powered by Daily Spark ✨`;
    const shareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(rawText)}`;
    window.open(shareURL, '_blank');
}

// Refresh Stats dashboard counts
function updatePoolStatistics() {
    totalCounter.textContent = `${activePool.length} item${activePool.length === 1 ? '' : 's'}`;
    
    const personalCount = activePool.filter(item => item.category === 'personal').length;
    const workCount = activePool.filter(item => item.category === 'work').length;
    const mindsetCount = activePool.filter(item => item.category === 'mindset').length;
    const jokesCount = activePool.filter(item => item.category === 'joke').length;

    personalCounter.textContent = personalCount;
    workCounter.textContent = workCount;
    mindsetCounter.textContent = mindsetCount;
    jokeCounter.textContent = jokesCount;
}

// Add custom item logic
creatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = inputTextField.value.trim();
    const category = inputCategoryField.value;
    const type = category === 'joke' ? 'joke' : 'compliment';

    if (!text) return;

    // Save new item
    const newItem = { text, category, type };
    activePool.push(newItem);

    // Clear text area input
    inputTextField.value = '';
    
    // Update counts and show feedback toast
    triggerToast("New Spark Entry Saved! 🎉");
    updatePoolStatistics();
    
    // Display immediately
    refreshDisplay(newItem);
});

// Handle custom category tabs
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active classes from all tabs
        categoryTabs.forEach(t => {
            t.className = "category-tab flex-1 min-w-[80px] py-3 px-4 text-sm font-extrabold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5";
        });
        
        // Style active tab
        tab.className = "category-tab flex-1 min-w-[80px] py-3 px-4 text-sm font-black rounded-xl transition-all duration-300 text-coral-500 bg-white dark:bg-gray-800 shadow-md flex items-center justify-center gap-1.5";
        
        // Update selection criteria
        currentCategoryFilter = tab.getAttribute('data-cat');
        refreshDisplay();
    });
});

// Dark / Light Theme Toggle Handler
themeToggleBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
});

// Synchronize page color system preferences
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// Attach buttons event triggers
nextButton.addEventListener('click', () => refreshDisplay());
copyButton.addEventListener('click', copyToClipboard);
shareButton.addEventListener('click', shareOnX);

// Window Load lifecycle triggers
window.onload = function () {
    initIcons();
    updatePoolStatistics();
    refreshDisplay();
    
    // Initialize canvas interactive particle space on document readiness
    resizeCanvas();
    animateParticles();
    window.addEventListener('resize', resizeCanvas);
};