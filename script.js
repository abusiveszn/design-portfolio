document.addEventListener('DOMContentLoaded', () => {

    /* --- Assets Configuration --- */
    const assets = {
        flyers: [
            "ABBYS.jpg", "FLUXRWARE NEW YEAR 2026.jpg", "SUMAYYA coll.jpg",
            "Tama luxe  price.jpg", "Tama luxe 2.jpg", "Tama luxe new 3.jpg",
            "dera f.jpg", "hindus.jpg", "import.jpg", "mummy samson.jpg",
            "velora autos flyer.jpg", "yarimiya 2.jpg",
            // 9 New Slots (Actual Filenames)
            "flyer_slot_1.jpg.jpg", "flyer_slot_2.jpg.jpg", "flyer_slot_3.jpg.jpg",
            "flyer_slot_4.jpg.jpg", "flyer_slot_5.jpg.jpg", "flyer_slot_6.jpg.jpg",
            "flyer_slot_7.jpg.jpg", "flyer_slot_8.jpg.jpg",
            // Note: flyer_slot_9 was not in the list, but I will check if I missed it or if user missed it.
            // The list command showed up to flyer_slot_8.jpg.jpg and then I see no 9.
            // Wait, let me re-read the list_dir output from step 196 more carefully.
            // Ah, I see: flyer_slot_1...8.jpg.jpg. Where is 9?
            // The list output has: flyer_slot_1.jpg.jpg ... flyer_slot_8.jpg.jpg.
            // It has 20 files total. 12 original + 8 new ones?
            // Original: ABBYS, FLUXRWARE, SUMAYYA, Tama, Tama 2, Tama 3, dera, hindus, import, mummy, velora, yarimiya. (12 files)
            // New: flyer_slot_1..8. (8 files).
            // The user asked for 9 more spots. It seems they only added 8 files so far or I missed one.
            // Wait, let me check the list_dir output again.
            // {"name":"flyer_slot_1.jpg.jpg"...}
            // ...
            // {"name":"flyer_slot_8.jpg.jpg"...}
            // There is NO flyer_slot_9.jpg.jpg in the output.
            // I will add the ones that exist.
        ],
        logos: [
            "BRAVETECHIES 2.jpg", "DRTW 3.jpg", "DRTW 4.jpg", "Free_Pouch_Mockup_1.jpg",
            "Hetches.jpg", "Logo Black.jpg", "Logo White.jpg", "Mockup_Business_Card_90x50_3.jpg",
            "Signboard_On_The_Wall_Mockup.jpg", "TECHFIX brand 2.jpg", "astrologic gaming logo.jpg",
            "poppies.jpg", "szn.jpg", "ussy.jpg", "velora autos.jpg",
            "zadious 23-1.jpg", "zadious 23.jpg"
        ],
        posters: [
            "5IVE 2.jpg", "CONCLAVE-1.jpg", "Picsart_24-05-08_16-31-54-905.jpg",
            "Picsart_24-05-10_08-48-21-816.jpg", "Picsart_24-05-11_21-33-05-111.jpg",
            "Picsart_24-05-18_18-53-06-322.jpg", "Picsart_24-05-31_20-58-41-725.jpg",
            "Picsart_24-07-16_12-04-25-681.jpg", "Picsart_24-08-10_17-10-16-425.jpg",
            "adizil.jpg", "maz energies 2.jpg", "sabez CHIN CHIN.jpg",
            // 8 New Slots (Actual Filenames)
            "poster_slot_1.jpg.png", "poster_slot_2.jpg.png", "poster_slot_3.jpg.jpg",
            "poster_slot_4.jpg.jpg", "poster_slot_5.jpg.jpg", "poster_slot_6.jpg.png",
            "poster_slot_7.jpg.jpg", "poster_slot_8.jpg.jpg"
        ],
        'brand-signage': [
            "IMG-20240919-WA0031.jpg", "IMG-20241115-WA0018.jpg", "IMG-20241116-WA0015.jpg",
            "IMG-20241210-WA0014.jpg", "IMG-20241210-WA0015.jpg", "IMG-20250214-WA0041.jpg",
            "IMG-20250214-WA0044.jpg", "IMG-20260106-WA0034.jpg", "IMG-20260106-WA0102.jpg",
            "IMG-20260106-WA0121.jpg", "IMG-20260106-WA0125.jpg"
        ],
        printing: [
            "Black_Cap_Front_View_Mockup.jpg", "Folded_T-Shirt_PSD_Template.jpg", "Free_Baseball_Cap_Mockup_1.jpg",
            "IMG-20240812-WA0005.jpg", "IMG-20240814-WA0043.jpg", "IMG-20240831-WA0061.jpg",
            "IMG-20250518-WA0009.jpg", "IMG-20250906-WA0026.jpg", "IMG-20250909-WA0030.jpg",
            "IMG-20250912-WA0035.jpg", "IMG-20251127-WA0049.jpg", "IMG-20251204-WA0094.jpg",
            "IMG-20251214-WA0086.jpg", "IMG-20260107-WA0091.jpg", "IMG-20260107-WA0092.jpg",
            "IMG-20260124-WA0020.jpg", "IMG-20260124-WA0043.jpg", "IMG-20260124-WA0044.jpg",
            "IMG-20260206-WA0049.jpg", "IMG-20260206-WA0050.jpg", "JOTTER 2.jpg",
            "JOTTER funmi 2.jpg", "OQ3A6W1.jpg", "PaperBag funmi.jpg",
            "RAJ LEATHER.jpg", "mk paper bag.jpg", "sbma CLOTH TAG.jpg",
            "sbma COMP CARD.jpg", "sbma bag.jpg"
        ]
    };

    /* --- Lightbox Logic --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    function openLightbox(src) {
        lightbox.style.display = 'block';
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            lightbox.classList.add('active');
            lightboxImg.src = src;
        }, 10);
        document.body.style.overflow = 'hidden'; // Disable scroll
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        }, 300); // Match transition duration
        document.body.style.overflow = 'auto'; // Enable scroll
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    /* --- Helper Functions --- */
    function createCard(src, category, folder) {
        const div = document.createElement('div');
        div.className = `card ${category === 'logos' ? 'logo-card' : 'poster-card'}`;

        const imgContainer = document.createElement('div');
        imgContainer.className = 'card-image';
        imgContainer.style.cursor = 'pointer'; // Indicate clickable

        const img = document.createElement('img');
        // Handle folder paths
        let folderPath = 'assets';
        if (category === 'flyers') folderPath += '/Flyers';
        else if (category === 'logos') folderPath += '/Logo Designs';
        else if (category === 'posters') folderPath += '/Poster';
        else if (category === 'brand-signage') folderPath += '/Brand Signage';
        else if (category === 'printing') folderPath += '/Printing services';

        const fullSrc = `${folderPath}/${src}`;
        img.src = fullSrc;
        img.alt = src;
        img.loading = 'lazy';
        img.onerror = function () { this.parentElement.style.backgroundColor = '#1a1a3a'; this.style.display = 'none'; };

        // Add click event for lightbox
        imgContainer.onclick = () => openLightbox(fullSrc);

        imgContainer.appendChild(img);
        div.appendChild(imgContainer);

        return div;
    }

    function initGallery(sectionId, category, initialCount = 4) {
        const section = document.querySelector(`#${sectionId}`);
        if (!section) return;

        const grid = section.querySelector('.portfolio-grid');
        grid.innerHTML = ''; // Clear existing static content

        const items = assets[category];
        const total = items.length;
        let visibleCount = initialCount;

        // Initial Render
        renderItems(0, visibleCount);

        // View More Button
        if (total > visibleCount) {
            const btnContainer = document.createElement('div');
            btnContainer.className = 'view-more-container';
            const btn = document.createElement('button');
            btn.className = 'view-more-btn';
            btn.textContent = 'View More';
            btn.onclick = () => {
                const nextCount = visibleCount + 8; // Load 8 more at a time
                renderItems(visibleCount, nextCount);
                visibleCount = nextCount;
                if (visibleCount >= total) {
                    btn.style.display = 'none';
                }
            };
            btnContainer.appendChild(btn);
            section.appendChild(btnContainer);
        }

        function renderItems(start, end) {
            for (let i = start; i < Math.min(end, total); i++) {
                const card = createCard(items[i], category);
                // Animation observer support
                card.style.transitionDelay = `${(i % 4) * 100}ms`;
                card.classList.add('hidden-card');
                observer.observe(card);
                grid.appendChild(card);
            }
        }
    }

    /* --- Intersection Observer --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize Galleries
    initGallery('flyers', 'flyers', 4);
    initGallery('logos', 'logos', 8);
    initGallery('posters', 'posters', 4);
    initGallery('brand-signage', 'brand-signage', 4);
    initGallery('printing', 'printing', 8);

    /* --- Navigation Logic --- */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(item => item.style.animation = '');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});
