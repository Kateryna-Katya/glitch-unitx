document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ПЛАГИНЫ
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 2. ПЛАВНЫЙ СКРОЛЛ (Lenis)
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // 3. МОБИЛЬНОЕ МЕНЮ
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    if (burger) {
        burger.onclick = () => {
            burger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
        };
    }

    // 4. HERO АНИМАЦИЯ (С ЗАЩИТОЙ СЛОВ)
    const initHero = () => {
        if (typeof SplitType !== 'undefined' && document.querySelector('#hero-title')) {
            const title = new SplitType('#hero-title', { types: 'words' });
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.from(title.words, { y: 40, opacity: 0, stagger: 0.05, duration: 1, clearProps: "all" })
              .from('.hero__actions', { y: 20, opacity: 0, duration: 0.8, clearProps: "all" }, "-=0.5");
        }
    };
    setTimeout(initHero, 200);

    // 5. STACKING CARDS EFFECT (Эффект наложения карт)
    const cards = gsap.utils.toArray('.stack-card');
    cards.forEach((card, index) => {
        if (index !== cards.length - 1) { // Для всех, кроме последней
            gsap.to(card, {
                scale: 0.9, // Карта слегка уменьшается
                opacity: 0.5,
                scrollTrigger: {
                    trigger: cards[index + 1], // Когда начинает ехать следующая карта
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true,
                }
            });
        }
    });

    // 6. ТЕХНОЛОГИЧЕСКИЙ СТЕК (Swiper)
    if (document.querySelector('.tech-slider')) {
        new Swiper('.tech-slider', {
            slidesPerView: 'auto', spaceBetween: 30, loop: true,
            speed: 6000, autoplay: { delay: 0 }, freeMode: true,
        });
    }

    // 7. SCROLL REVEAL (Для блога)
    gsap.utils.toArray('[data-reveal-blog]').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 90%" },
            y: 30, opacity: 0, duration: 1
        });
    });

    // 8. ФОРМА И КАПЧЕ
    const contactForm = document.getElementById('ai-contact-form');
    if (contactForm) {
        const captchaLabel = document.getElementById('captcha-question');
        let answer;
        const gen = () => {
            const n1 = Math.floor(Math.random() * 9) + 1;
            const n2 = Math.floor(Math.random() * 9) + 1;
            answer = n1 + n2;
            if(captchaLabel) captchaLabel.innerText = `${n1} + ${n2} = ?`;
        };
        gen();

        contactForm.onsubmit = (e) => {
            e.preventDefault();
            if (parseInt(document.getElementById('captcha-answer').value) !== answer) {
                alert('Ошибка капчи'); gen(); return;
            }
            document.getElementById('form-success').classList.add('active');
        };
    }

    // 9. COOKIE POPUP
    const cp = document.getElementById('cookie-popup');
    if (cp && !localStorage.getItem('glitch_cookies')) {
        setTimeout(() => cp.classList.add('active'), 2000);
        document.getElementById('cookie-accept').onclick = () => {
            localStorage.setItem('glitch_cookies', 'true');
            cp.classList.remove('active');
        };
    }

    // 10. ИКОНКИ
    if (typeof lucide !== 'undefined') lucide.createIcons();
});

window.resetForm = () => { document.getElementById('form-success').classList.remove('active'); };