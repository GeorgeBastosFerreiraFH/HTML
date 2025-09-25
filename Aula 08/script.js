document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    function handleNavClick(e) {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        smoothScroll(target);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (name && email && message) {
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            e.target.reset();
        } else {
            showNotification('Por favor, preencha todos os campos.', 'error');
        }
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }

    function addInteractiveEffects() {
        const cards = document.querySelectorAll('.stack-category, .skill-item, .experience-item, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    function animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const elementsToAnimate = document.querySelectorAll('.stack-category, .skill-item, .experience-item, .project-card');
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    window.addEventListener('scroll', handleScroll);
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    addInteractiveEffects();
    animateOnScroll();
});