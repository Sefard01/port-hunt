// Database Array Matrix Source Elements
const database = [
    {
        day: "14",
        month: "September",
        weekday: "Wednesday",
        title: "RADIOHEAD LIVE",
        subtitle: "IN CONCERT",
        location: "Palermo @ Roxy Live",
        time: "Wed, Sep 14 @ 8:00 pm",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000",
        targetDate: "September 14, 2026 20:00:00"
    },
    {
        day: "19",
        month: "October",
        weekday: "Sunday",
        title: "METALLICA WORLD TOUR",
        subtitle: "HEAVY METAL NIGHT",
        location: "Arena Grounds @ Delhi",
        time: "Sun, Oct 19 @ 7:30 pm",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000",
        targetDate: "October 19, 2026 19:30:00"
    },
    {
        day: "05",
        month: "November",
        weekday: "Wednesday",
        title: "CYBERPUNK CON 2026",
        subtitle: "DECENTRALIZED MEETUP",
        location: "HackerSpace Phase 2",
        time: "Wed, Nov 05 @ 10:00 am",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000",
        targetDate: "November 05, 2026 10:00:00"
    },
    {
        day: "25",
        month: "December",
        weekday: "Friday",
        title: "NEON GLOW FESTIVAL",
        subtitle: "ELECTRONIC MUSIC",
        location: "Club Void @ Bangalore",
        time: "Fri, Dec 25 @ 9:00 pm",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000",
        targetDate: "December 25, 2026 21:00:00"
    },
    {
        day: "10",
        month: "December",
        weekday: "Thursday",
        title: "INNOVATEFEST 2026",
        subtitle: "GLOBAL HACKATHON SPRINT",
        location: "NexClub Virtual Arena",
        time: "Thu, Dec 10 @ 12:00 am",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
        targetDate: "December 10, 2026 00:00:00"
    }
];

let currentIndex = 0;
const totalSlides = database.length;

// DOM View References Nodes
const dayNode = document.getElementById('hero-day');
const monthNode = document.getElementById('hero-month');
const weekdayNode = document.getElementById('hero-weekday');
const titleNode = document.getElementById('hero-title');
const subtitleNode = document.getElementById('hero-subtitle');
const locationNode = document.getElementById('hero-location');
const timeNode = document.getElementById('hero-time');
const imageNode = document.getElementById('hero-image');
const numberItems = document.querySelectorAll('.num-item');

// --- 1. SLIDER RENDERING INTERACTOR MODULE ---
function renderSlide(idx) {
    if(idx < 0 || idx >= totalSlides) return;
    
    currentIndex = idx;
    const currentRecord = database[currentIndex];

    // Node updates operations
    dayNode.textContent = currentRecord.day;
    monthNode.textContent = currentRecord.month;
    weekdayNode.textContent = currentRecord.weekday;
    titleNode.textContent = currentRecord.title;
    subtitleNode.textContent = currentRecord.subtitle;
    locationNode.textContent = currentRecord.location;
    timeNode.textContent = currentRecord.time;
    imageNode.src = currentRecord.image;

    // Direct active navigation sync loops
    numberItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`.num-item[data-index="${currentIndex}"]`).classList.add('active');
}

// Chevron Arrow Click Actions 
document.getElementById('prev-btn').addEventListener('click', () => {
    let target = currentIndex - 1;
    if(target < 0) target = totalSlides - 1; // Infinite loop trace backward
    renderSlide(target);
});

document.getElementById('next-btn').addEventListener('click', () => {
    let target = currentIndex + 1;
    if(target >= totalSlides) target = 0; // Infinite loop trace forward
    renderSlide(target);
});

// Click direct index updates assignment 
numberItems.forEach(item => {
    item.addEventListener('click', () => {
        renderSlide(parseInt(item.getAttribute('data-index')));
    });
});


// --- 2. LOWER TIMER ENGINE: EVALUATE MOST RECENT / NEAREST UPCOMING EVENT ---
function initUpcomingTimer() {
    const timeNow = new Date().getTime();
    let nearestUpcomingEvent = null;
    let shortestDelta = Infinity;

    // Linear evaluation loop across database timestamps
    database.forEach(event => {
        const eventTimestamp = new Date(event.targetDate).getTime();
        const differenceDelta = eventTimestamp - timeNow;

        // Condition: System verify true future date, filter shortest runtime gap
        if (differenceDelta > 0 && differenceDelta < shortestDelta) {
            shortestDelta = differenceDelta;
            nearestUpcomingEvent = event;
        }
    });

    // Security Fallback validation asset block
    if (!nearestUpcomingEvent) {
        nearestUpcomingEvent = database[0]; 
    }

    // Assign bottom metadata display fields values
    document.getElementById('countdown-title').textContent = nearestUpcomingEvent.title;
    document.getElementById('countdown-thumb').src = nearestUpcomingEvent.image;

    // Pass evaluated target timestamp string data token directly into ticker clock loop
    startLiveClockCountdown(nearestUpcomingEvent.targetDate);
}

function startLiveClockCountdown(targetStringTimestamp) {
    const finalTargetTime = new Date(targetStringTimestamp).getTime();

    function updateTicker() {
        const deltaNow = finalTargetTime - new Date().getTime();

        if (deltaNow <= 0) {
            document.getElementById('days').textContent = "00";
            document.getElementById('hours').textContent = "00";
            document.getElementById('mins').textContent = "00";
            clearInterval(tickerIntervalId);
            return;
        }

        const d = Math.floor(deltaNow / (1000 * 60 * 60 * 24));
        const h = Math.floor((deltaNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((deltaNow % (1000 * 60 * 60)) / (1000 * 60));

        // Format standard zero placeholders string metric indicators pads
        document.getElementById('days').textContent = d < 10 ? '0' + d : d;
        document.getElementById('hours').textContent = h < 10 ? '0' + h : h;
        document.getElementById('mins').textContent = m < 10 ? '0' + m : m;
    }

    updateTicker(); // Instant activation call pass tracking
    const tickerIntervalId = setInterval(updateTicker, 60000); // Dynamic core evaluation loop ticking precisely every single minute
}

// Initial execution sequence loop
renderSlide(0);
initUpcomingTimer();




// new js for about section 

// --- 4. MODULE: CREATIVE TERMINAL DATA CONTROLLER ---
document.addEventListener("DOMContentLoaded", () => {
    const matrixTabs = document.querySelectorAll(".matrix-tab-item");
    const displaySlides = document.querySelectorAll(".display-slide");

    matrixTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // 1. Reset states for controls tabs
            matrixTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // 2. Hide all preview screen content slides
            displaySlides.forEach(slide => slide.classList.remove("active"));

            // 3. Extract and display specific targeted content node
            const targetId = tab.getAttribute("data-target");
            const activeSlide = document.getElementById(targetId);
            activeSlide.classList.add("active");

            // 4. Trigger localized smart numeric incremental count load animation
            const counterNode = activeSlide.querySelector(".huge-stat-counter");
            if (counterNode) {
                animateNumericCounter(counterNode);
            }
        });
    });

    function animateNumericCounter(node) {
        const targetLimit = parseInt(node.getAttribute("data-count"));
        let baselineValue = 0;
        const durationCycle = 250; // Milliseconds runtime budget duration
        const frameTickRate = 16;  // Roughly matches standard 60fps refresh bounds
        const trackingSteps = durationCycle / frameTickRate;
        const incrementalStepValue = targetLimit / trackingSteps;

        // Custom formatting logic based on dataset definitions text string variations
        const appendSuffix = node.textContent.includes("%") ? "%" : 
                             node.textContent.includes("K+") ? "K+" : "+";

        const executionTimerId = setInterval(() => {
            baselineValue += incrementalStepValue;
            if (baselineValue >= targetLimit) {
                node.textContent = targetLimit + appendSuffix;
                clearInterval(executionTimerId);
            } else {
                node.textContent = Math.floor(baselineValue) + appendSuffix;
            }
        }, frameTickRate);
    }

    // Initialize immediate counter kickstart sequence load trigger on primary tab slide
    const firstActiveCounter = document.querySelector(".display-slide.active .huge-stat-counter");
    if(firstActiveCounter) {
        animateNumericCounter(firstActiveCounter);
    }
});



// --- 5. MODULE: PIPELINE TIMELINE ACTIVE TRACKER ---
document.addEventListener("DOMContentLoaded", () => {
    const pipelineCards = document.querySelectorAll(".pipeline-card");

    pipelineCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            pipelineCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
        });
    });
});

// --- 6. MODULE: TERMINAL FOOTER LIVE UTILITY CLOCK ---
document.addEventListener("DOMContentLoaded", () => {
    const clockNode = document.getElementById("footer-live-clock");
    
    if(clockNode) {
        setInterval(() => {
            const currentSystemDate = new Date();
            // Format cleanly into strict 2-digit structural sequences arrays
            const timeString = currentSystemDate.toUTCString().replace("GMT", "UTC").substring(17, 25) + " UTC";
            clockNode.textContent = timeString;
        }, 1000); // Ticks precisely every 1000 milliseconds refresh cycle boundary frame
    }
});