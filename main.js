/**==================== Toggle Icon Navbar ====================*/
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

/**==================== Scroll Section Active Link ====================*/
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector('header nav a[href="#' + id + '"]');
            if (activeLink) activeLink.classList.add('active');
        }
    });

    /* Sticky navbar */
    document.querySelector('header').classList.toggle('sticky', window.scrollY > 100);

    /* Close mobile menu on scroll */
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    });
});

/**==================== Animated Counters ====================*/
const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 30));
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current;
        }, 50);
        obs.unobserve(el);
    });
}, { threshold: 0.6 });
counters.forEach(c => countObserver.observe(c));

/**==================== Contact Form (opens email client) ====================*/
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.querySelector('#cf-name').value.trim();
        const email = document.querySelector('#cf-email').value.trim();
        const subject = document.querySelector('#cf-subject').value.trim();
        const message = document.querySelector('#cf-message').value.trim();
        const body = `${message}\n\nFrom: ${name} (${email})`;
        window.location.href = 'mailto:ashanedirisinghe08@gmail.com?subject='
            + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        showNotification('Opening your email app...', 'success');
        contactForm.reset();
    });
}

/**==================== Notification ====================*/
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
        <span style="color:#fff">${message}</span>
    `;
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; padding: 15px 20px;
        border-radius: 10px; color: #fff; font-weight: 600; z-index: 10000;
        opacity: 0; transform: translateX(100%); transition: all .3s ease;
        max-width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,.3);
        background: ${type === 'success' ? 'linear-gradient(135deg,#4CAF50,#45a049)' : 'linear-gradient(135deg,#f44336,#da190b)'};
    `;
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.opacity = '1'; notification.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**==================== Scroll Reveal ====================*/
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({ distance: '60px', duration: 1500, delay: 150 });
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .skills-container, .projects-container, .contact form, .contact-cards', { origin: 'bottom' });
    ScrollReveal().reveal('.about-img', { origin: 'left' });
    ScrollReveal().reveal('.about-content', { origin: 'right' });
    ScrollReveal().reveal('.timeline-item, .education-box', { origin: 'left', interval: 150 });
    ScrollReveal().reveal('.stat, .certifications-container', { origin: 'bottom', interval: 120 });
}

/**==================== Typed JS ====================*/
if (typeof Typed !== 'undefined') {
    new Typed('.multiple-text', {
        strings: ['Software Engineering Intern', 'IT Support Specialist', 'Web Developer'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1200,
        loop: true
    });
}
