document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);


    const heroTexts = document.querySelectorAll('.reveal-text');
    gsap.to(heroTexts, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
    });


    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroBg = document.getElementById('hero-bg');
        if (heroBg) {
            heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.4}px)`;
        }
    });


    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.querySelector('.absolute').classList.add('opacity-100');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.querySelector('.absolute').classList.remove('opacity-100');
        }
    });


    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(element => {
        gsap.fromTo(element, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });


    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        const isOpen = mobileMenu.classList.contains('translate-x-full');
        if (isOpen) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });


    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Sending...';
        btn.classList.add('opacity-75');
        

        setTimeout(() => {
            btn.innerText = 'Message Sent!';
            btn.classList.remove('bg-white', 'text-stone-900');
            btn.classList.add('bg-green-600', 'text-white');
            
            setTimeout(() => {
                form.reset();
                btn.innerText = originalText;
                btn.classList.remove('bg-green-600', 'text-white', 'opacity-75');
                btn.classList.add('bg-white', 'text-stone-900');
            }, 3000);
        }, 1500);
    });
});
