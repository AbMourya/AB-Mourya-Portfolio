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
            // Stop observing once visible
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-hidden').forEach(section => {
    observer.observe(section);
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
