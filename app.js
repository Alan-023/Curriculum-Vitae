// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Animation
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: 'power2.out'
    });
    
    gsap.to(cursorFollower, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.5,
        ease: 'power3.out'
    });
});

// Interactive hover effect for links and buttons to enlarge cursor
const interactables = document.querySelectorAll('a, button, .glass-card');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursorFollower, {
            scale: 1.5,
            borderColor: '#00f0ff',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.5) inset',
            duration: 0.3
        });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursorFollower, {
            scale: 1,
            borderColor: 'rgba(138, 43, 226, 0.5)',
            boxShadow: '0 0 15px rgba(138, 43, 226, 0.5) inset',
            duration: 0.3
        });
    });
});

// Initial Load Animations (Hero Section)
const tl = gsap.timeline();

tl.fromTo('.nav-content', 
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
)
.fromTo('.staggered-fade',
    { y: 50, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out', clearProps: "all" },
    "-=0.5"
)
.fromTo('.hero-text .fade-up',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
    "-=0.8"
);

// ScrollTrigger Animations

// Fade Up Elements
gsap.utils.toArray('.fade-up:not(.hero-text .fade-up)').forEach(element => {
    gsap.fromTo(element,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Floating Cards Parallax
gsap.utils.toArray('.glass-card').forEach(card => {
    gsap.to(card, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// Timeline line draw animation
gsap.fromTo('.timeline::before', 
    { height: 0 },
    {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: true
        }
    }
);

// Background subtle parallax
gsap.to('.bg-layer', {
    yPercent: 10,
    ease: 'none',
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});
