Daily Spark | Interactive Compliment Generator & Builder

Daily Spark is a beautifully designed, highly interactive, and responsive vanilla web application built to deliver an instant confidence boost. Featuring curated compliment pools, category filtering, a dark mode toggle, and an active session custom compliment builder, it serves as a lightweight, clean, and modern web application.

Live Demo & Quick Start

Because the application is designed using a single-file architecture, there are no complex installation steps, package managers, or local server requirements.

To Run Locally:

Save the index.html file to your local computer.

Double-click the file to open it in any modern web browser (Chrome, Firefox, Safari, Edge).

Enjoy your instant spark of joy!

Design & Theme Details

The UI is crafted using modern, welcoming visual tokens tailored to elevate mood and improve user experience:

Aesthetic Depth: Uses subtle gradient backdrops, floating blur circles, and delicate keyframe animations (float-slower and float-faster) to create visual layers.

Micro-interactions: Interactive components smoothly morph, change scale, and transition depth on hover and click actions.

Theme Versatility: Includes a fully functional Light and Dark mode synced via localStorage and system preferences.

Font Selection:

Typography (Compliments): Nunito—A rounded, playful font designed for ultimate readability and comfort.

Typography (UI Elements): Lato—A structural, elegant sans-serif optimized for crisp button text and dashboard labels.

Palette Colors:

Accent Principal: Living Coral (#FF6B6B)

Sub-Accent: Sunny Yellow (#FFD166)

Backgrounds: Smooth light grays (#F8F9FA) transitioning into professional deep slate grays (#111827) in dark mode.

Key Features

1. Curated Compliment Engine

Features an algorithm that pulls compliments dynamically from your active pool.

Anti-Repetition Guardrail: Smart randomness logic prevents the same compliment from displaying consecutively when clicking the generator trigger.

2. Live Category Filtering

Sort compliments on-the-fly using specialized categories: Personal, Work, and Mindset.

Tabs update active search bounds seamlessly with a smooth fade-in and fade-out layout animation.

3. Active Custom Compliment Builder (The Spark Creator)

A dedicated submission form allows users to write their own custom compliments, choose a category, and save them.

New submissions instantly register in the live pool, increment category statistics, and transition the display to showcase the newly created card immediately.

4. Interactive Pool Dashboard

Real-time statistics counters track your overall compliment count along with category distribution metrics (Personal, Work, Mindset).

5. Seamless Export Features

Smart Copy: Copies the text directly to the user's clipboard using standard APIs and fallback inputs.

Custom Toasts: Displays an elegant custom non-blocking notification toast alerting users of successful copies.

Social Integration: A one-click sharing bridge generates pre-formatted status compositions ready to post on X/Twitter.

Built With

HTML5: Semantic architecture (<main>, <section>, <header>, <footer>).

Tailwind CSS: Responsive utility styling, layout grids, spacing tokens, and dark-theme configurations.

Vanilla JavaScript: Fast, dependency-free state manipulation, event handling, and layout transition timing.

Lucide Icons: Premium, modern SVG-based iconography vector library.

Code Architecture (Under the Hood)

The script handles operations inside a clean lifecycle pipeline:

// 1. Core Data Structures
const defaultCompliments = [ ... ]; // Curated array of static objects
let activeCompliments = [ ... ];   // Session-mutable array of items

// 2. State Indicators
let currentCategoryFilter = "all";  // Filter criteria 
let lastDisplayedIndex = -1;        // Pointer to prevent repetition

// 3. UI Render Loop
function refreshDisplay() {
    // Fade Out -> Update DOM Nodes -> Transition Color Badges -> Fade In
}

// 4. Custom Pool Actions
form.addEventListener('submit', () => {
    // Collect Inputs -> Push to activeCompliments -> Update Statistics -> Auto-Focus Display
});


License

This project is open-source and free to adapt for personal portfolio projects, design inspiration, or educational mockups. Have fun spreading positivity!
