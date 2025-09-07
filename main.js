/**==================== Toggle Icon Navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

/**==================== Scroll Section Active Link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            let activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    /**==================== Sticky Navbar ====================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /**==================== Remove Toggle Icon and Navbar on Scroll ====================*/
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/**==================== Close Menu When Clicking Links ====================*/
navLinks.forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    };
});

/**==================== CV Download Functionality ====================*/
// Enhanced CV download with error handling and user feedback
function downloadCV() {
    const cvFileName = 'CV-Ashan Indika Edirisinghe .pdf'; // Keep your exact filename
    const downloadName = 'Ashan_Edirisinghe_CV.pdf'; // Clean name for download
    
    // Create download link
    const link = document.createElement('a');
    link.href = cvFileName;
    link.download = downloadName;
    
    // Check if file exists before downloading
    fetch(link.href, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // File exists, proceed with download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Optional: Show success message
                showNotification('CV download started successfully!', 'success');
            } else {
                // File not found
                showNotification('CV file not found. Please contact me directly.', 'error');
            }
        })
        .catch(error => {
            console.error('Error checking CV file:', error);
            // Fallback: Try direct download anyway
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
}

// Initialize CV download functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const cvButton = document.querySelector('a[href*="CV-Ashan"]');
    if (cvButton) {
        cvButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            downloadCV();
        });
    }
});

/**==================== Notification System ====================*/
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #f44336, #da190b)'};
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**==================== Scroll Reveal ====================*/
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .projects-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.education-box', { origin: 'left', interval: 200 });
ScrollReveal().reveal('.certifications-container', { origin: 'bottom' });

/**==================== Typed JS ====================*/
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Web Designer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true
});