document.addEventListener("DOMContentLoaded", (event) => {
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true
    });

    gsap.registerPlugin(ScrollTrigger);

    // Synchronisatie tussen LocomotiveScroll en ScrollTrigger
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        //pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    // Zet de initiële positie van scaleDown
    gsap.set(".scaleUp", { xPercent: -50, yPercent: -50 });

    // Scale en Pin instellingen
    gsap.to(".scaleUp", {
        //scale: 0.6667,
        scale: 600,
        opacity: 0,
        // display: 'none',
        force3D:false,
        scrollTrigger: {
            trigger: "#ScaleUpContainer",
            scroller: "[data-scroll-container]", // Specificeer de scrollcontainer
            pin: true, // Zorg dat #ScaleDownContainer vastgeplakt blijft
            scrub: true, // Maak de animatie vloeiend met de scroll
            start: "top top", // Begin de pinning direct aan de top van de viewport
            end: "+=100%", // Laat de pin los na de volledige hoogte van het element
            // markers: true, // Debug-markers om start en eind te visualiseren
            invalidateOnRefresh: true // Zorg dat het altijd wordt geüpdatet bij refresh
        }
    });

    gsap.set(".scaleDown", { xPercent: -50, yPercent: -50 });

    // Scale en Pin instellingen
    gsap.to(".scaleDown", {
        //scale: 0.6667,
        scale: 0.6,
        //scale: 30,
        force3D:false,
        scrollTrigger: {
            trigger: "#ScaleDownContainer",
            scroller: "[data-scroll-container]", // Specificeer de scrollcontainer
            pin: true, // Zorg dat #ScaleDownContainer vastgeplakt blijft
            scrub: true, // Maak de animatie vloeiend met de scroll
            start: "top top", // Begin de pinning direct aan de top van de viewport
            end: "+=100%", // Laat de pin los na de volledige hoogte van het element
            // markers: true, // Debug-markers om start en eind te visualiseren
            invalidateOnRefresh: true // Zorg dat het altijd wordt geüpdatet bij refresh
        }
    });

    // Fade functie
    function fadeOutOnScroll(element, args) {
        if (!element) return;

        const distanceToTop = 100;
        const elementHeight = element.offsetHeight / 4;
        const scrollTop = args.scroll.y;
        let opacity = 1;

        if (scrollTop > distanceToTop) {
            opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
        }

        if (opacity >= 0) {
            element.style.opacity = opacity;
        }
    }

    // Toepassen van fade bij scrollen
    locoScroll.on("scroll", (args) => {
        const header = document.getElementById('opening');
        fadeOutOnScroll(header, args);
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
});
