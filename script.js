// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Reveal Animation with Intersection Observer
const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            entry.target.classList.remove('section-hidden');
            
            // Trigger staggered children
            const revealItems = entry.target.querySelectorAll('.reveal-item');
            revealItems.forEach(item => {
                item.classList.add('visible');
            });

            // Stop observing once visible
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-hidden').forEach(section => {
    observer.observe(section);
});

// Accordion Logic for List Cards
document.querySelectorAll('.toggle-header').forEach(header => {
    header.addEventListener('click', () => {
        const card = header.closest('.list-card');
        const details = card.querySelector('.card-details');
        const chevron = header.querySelector('.chevron');
        
        card.classList.toggle('open');
        details.classList.toggle('open');
        chevron.classList.toggle('open');
    });
});

// Project Details Modal Interaction (Gini Effect)
const modalOverlay = document.getElementById('project-modal-overlay');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('close-modal');

document.querySelectorAll('.toggle-project').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.project-card');
        const title = card.querySelector('h4').innerText;
        const orgElement = card.querySelector('p[style*="font-weight: 700"]');
        const org = orgElement ? orgElement.innerText : "";
        const details = card.querySelector('.card-details').innerHTML;

        // Construct Modal Content
        modalBody.innerHTML = `
            <div class="project-info" style="padding: 0; text-align: left;">
                <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem;">${title}</h3>
                <p style="color: var(--accent-1); font-weight: 700; font-size: 1.1rem; margin-bottom: 1.5rem;">${org}</p>
                <div class="card-details-modal">
                    ${details}
                </div>
            </div>
        `;

        // Apple-style Genie: Calculate origin from the clicked button
        const rect = btn.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        const modalContent = modalOverlay.querySelector('.modal-content');
        
        // Set dynamic origin
        modalContent.style.transformOrigin = `${originX}px ${originY}px`;

        // Reset scroll and show modal
        modalContent.scrollTop = 0;
        modalOverlay.style.display = 'flex';
        
        // Trigger expansion with small delay to ensure origin is set
        setTimeout(() => {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 10);
    });
});

// Close Modal Logic
const closeProjectModal = () => {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scroll
    }, 300); // Wait for transition
};

if (closeModal) closeModal.addEventListener('click', closeProjectModal);
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeProjectModal();
    });
}

// Handle ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeProjectModal();
    }
});

// Simple form submit animation (prevents actual reload)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';
    btn.style.opacity = '0.7';
    
    // Simulate network request
    setTimeout(() => {
        btn.innerText = 'Message Sent!';
        btn.style.background = 'linear-gradient(90deg, #00b09b, #96c93d)';
        e.target.reset();
        
        // Revert back after 3 seconds
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
            btn.style.opacity = '1';
        }, 3000);
    }, 1500);
});
