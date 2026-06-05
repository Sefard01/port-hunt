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

// --- 7. MODULE: LOGGED_IN DASHBOARD FEED FILTER TRACK ---
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-tag-btn");
    const eventCards = document.querySelectorAll(".event-feed-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // 1. Shift navigation active tracker status mapping elements
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // 2. Extract configuration target parameters value data string
            const selectedFilter = button.getAttribute("data-filter");

            // 3. Iterate cards collection layout metrics properties execution
            eventCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");

                if (selectedFilter === "all" || cardCategory === selectedFilter) {
                    card.classList.remove("filtered-out");
                } else {
                    card.classList.add("filtered-out");
                }
            });
        });
    });
});

// ============================================================================
// CONFIGURATION ENGINE: INDEXEDDB IDENTITY STORAGE MATRIX
// ============================================================================
const DB_NAME = "PortHunt_Core_Storage";
const DB_VERSION = 1;
const STORE_NAME = "encrypted_user_registry";
let dbInstance = null;

// --- 1. INITIALIZE DATA SYSTEM LAYER ---
function initRegistryDatabase() {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open(DB_NAME, DB_VERSION);

        dbRequest.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                // Email acts as our unique central indexing data anchor key
                db.createObjectStore(STORE_NAME, { keyPath: "userEmail" });
            }
        };

        dbRequest.onsuccess = (event) => {
            dbInstance = event.target.result;
            console.log("// STORAGE_ENGINE // CONNECTED // INDEXEDDB_ONLINE");
            resolve(dbInstance);
        };

        dbRequest.onerror = (event) => {
            console.error("// STORAGE_ENGINE // CRITICAL_FAILURE //", event.target.error);
            reject(event.target.error);
        };
    });
}

// --- 2. PERSIST USER NODE TO STORAGE ---
function registerUserNode(fullName, email, keypassHash) {
    return new Promise((resolve, reject) => {
        if (!dbInstance) return reject("Database context instance not initialized.");

        const transaction = dbInstance.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        // Run checking request to avoid user identity overlap conflicts
        const checkRequest = store.get(email.toLowerCase().trim());

        checkRequest.onsuccess = () => {
            if (checkRequest.result) {
                reject("NODE_CONFLICT: Identity record already authenticated inside matrix.");
                return;
            }

            // Map data payload parameters directly
            const newIdentityDocument = {
                userEmail: email.toLowerCase().trim(),
                userFullName: fullName.trim(),
                userKeypass: keypassHash,
                timestamp: new Date().toISOString()
            };

            const saveRequest = store.put(newIdentityDocument);

            saveRequest.onsuccess = () => {
                resolve("// INITIALIZATION_SUCCESS // Data synchronized cleanly inside IndexedDB.");
            };

            saveRequest.onerror = () => {
                reject("WRITE_FAULT: Failed to record structured identity payload block.");
            };
        };
    });
}

// ============================================================================
// SYSTEM WORKFLOW HANDLERS & MODAL BINDINGS INTERFACE
// ============================================================================
document.addEventListener("DOMContentLoaded", async () => {
    
    // Core Database Initialization Execution Line
    try {
        await initRegistryDatabase();
    } catch (err) {
        console.error("System storage layers failed to lock target paths.");
    }

    // --- A. MODAL POPUP VISIBILITY LAYER CONTROL ---
    const registrationPortal = document.getElementById("registration-modal-portal");
    const closeModalBtn = document.getElementById("close-modal-engine");
    
    // Hooks navbar ".trigger-registration-popup" node click parameters directly
    const openTriggers = document.querySelectorAll(".trigger-registration-popup, .btn-register");

    const openPortalHandler = (e) => {
        e.preventDefault();
        if (registrationPortal) {
            registrationPortal.classList.add("portal-active");
            document.body.style.overflow = "hidden"; // Lock global viewport scroll track
        }
    };

    const closePortalHandler = () => {
        if (registrationPortal) {
            registrationPortal.classList.remove("portal-active");
            document.body.style.overflow = ""; // Restores base document scroll matrix
        }
    };

    openTriggers.forEach(trigger => trigger.addEventListener("click", openPortalHandler));
    if (closeModalBtn) closeModalBtn.addEventListener("click", closePortalHandler);

    // Escape and Void Overlay Closes Safeguard Integration
    window.addEventListener("click", (e) => { if (e.target === registrationPortal) closePortalHandler(); });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closePortalHandler(); });


    // --- B. FORM CAPTURE & REWRITTEN INDEXEDDB REGISTRATION PIPELINE ---
    const signupForm = document.getElementById("core-signup-form");
    
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Direct ID extraction mapping paths
            const fullName = document.getElementById("reg-fullname").value;
            const email = document.getElementById("reg-email").value;
            const password = document.getElementById("reg-password").value;

            try {
                // Pipe data packages to storage execution method
                const executionResult = await registerUserNode(fullName, email, password);
                console.log(executionResult);

                alert("✨ ACCS INITIALIZATION SUCCESSFUL!\nIdentity packet locked inside local client registry.");
                
                // Clear UI field matrix elements cleanly
                signupForm.reset();
                closePortalHandler();

            } catch (systemFaultMessage) {
                // Handle duplicate identity records or write faults gracefully
                alert("⚠️ SYSTEM REFUSAL:\n" + systemFaultMessage);
            }
        });
    }
});

// ============================================================================
// SYSTEM LOGIN HANDLER MATRIX & CROSS-VERIFICATION PIPELINE
// ============================================================================

// --- 1. LOGIN CONTROLLER: IDENTITY MATCHING VALIDATOR METHOD ---
function validateUserSession(email, keypassHash) {
    return new Promise((resolve, reject) => {
        // DB_NAME and STORE_NAME reference from your core script registry configuration
        if (!dbInstance) return reject("Database context pipeline not initialized.");

        const transaction = dbInstance.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);

        // Fetch user object using email as query target path key
        const fetchRequest = store.get(email.toLowerCase().trim());

        fetchRequest.onsuccess = () => {
            const registeredUserDoc = fetchRequest.result;

            if (!registeredUserDoc) {
                reject("AUTH_FAILED: Identity coordinates not found inside matrix registry.");
                return;
            }

            // Password hashing structural comparison match sequence test
            if (registeredUserDoc.userKeypass === keypassHash) {
                resolve({
                    status: "GRANTED",
                    user: {
                        name: registeredUserDoc.userFullName,
                        email: registeredUserDoc.userEmail
                    }
                });
            } else {
                reject("AUTH_FAILED: Security keypass hash mismatch.");
            }
        };

        fetchRequest.onerror = () => {
            reject("QUERY_FAULT: Matrix error reading record stream from client storage.");
        };
    });
}

// --- 2. POPUP DYNAMICS & INTERACTION IMPLEMENTATION ---
document.addEventListener("DOMContentLoaded", () => {
    const loginPortal = document.getElementById("login-modal-portal");
    const registrationPortal = document.getElementById("registration-modal-portal");
    const closeLoginBtn = document.getElementById("close-login-engine");
    
    const loginTriggers = document.querySelectorAll(".trigger-login-popup, .btn-login");

    // Modal Control Functions 
    const openLoginHandler = (e) => {
        e.preventDefault();
        if (loginPortal) {
            // Close registration modal if it's already open to avoid UI overlap stack
            if (registrationPortal) registrationPortal.classList.remove("portal-active");
            
            loginPortal.classList.add("portal-active");
            document.body.style.overflow = "hidden";
        }
    };

    const closeLoginHandler = () => {
        if (loginPortal) {
            loginPortal.classList.remove("portal-active");
            document.body.style.overflow = "";
        }
    };

    loginTriggers.forEach(trigger => trigger.addEventListener("click", openLoginHandler));
    if (closeLoginBtn) closeLoginBtn.addEventListener("click", closeLoginHandler);

    // Escape and Void Overlay Layer Safeguard
    window.addEventListener("click", (e) => { if (e.target === loginPortal) closeLoginHandler(); });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLoginHandler(); });

    // Switch between modals dynamically via text anchor link click
    const switchToSignupLink = document.getElementById("switch-to-signup");
    if(switchToSignupLink) {
        switchToSignupLink.addEventListener("click", () => {
            closeLoginHandler();
            // Let the registration trigger module execute immediately after
        });
    }

    // --- 3. SUBMIT EVENT CAPTURE & DB QUERY VALIDATION ---
    const loginForm = document.getElementById("core-login-form");
    
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Direct mapping parameters path from form IDs
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            try {
                // Fire verification routine promise request 
                const authResult = await validateUserSession(email, password);
                console.log("// ACCESS_STATUS // AUTHORIZED", authResult);

                alert(`⚡ ACCESS GRANTED!\nWelcome back system user: ${authResult.user.name.toUpperCase()}`);
                
                // Save user credentials schema token inside local sessionStorage to retain logged-in environment state
                sessionStorage.setItem("active_user_node", JSON.stringify(authResult.user));
                
                loginForm.reset();
                closeLoginHandler();

                // Dynamic Action execution reload: Refresh page to display "Explore Events" segment module grid panels
                window.location.reload();

            } catch (authFaultMessage) {
                // Deny entry if passwords mismatched or email missing entirely inside store indexes
                alert("❌ ACCESS DENIED:\n" + authFaultMessage);
            }
        });
    }
});