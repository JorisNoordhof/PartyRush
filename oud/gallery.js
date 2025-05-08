document.addEventListener("DOMContentLoaded", () => {
    // GSAP ScrollTrigger setup
    gsap.registerPlugin(ScrollTrigger);

    // Stack-effect integratie
    const time = 2;

    // Stel de initiële positie van de kaarten in
    gsap.set(".stack", {
        y: 0,
        transformStyle: "preserve-3d",
        transformOrigin: "center top",
        zIndex: (index) => index + 1, // Zorgt ervoor dat elke kaart boven de vorige komt
    });

    // Stack-effect ScrollTrigger
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "section",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            markers: false,
        },
    });

    // Laat de kaarten (behalve de eerste) van onderen komen
    tl.from(".stack:not(:first-child)", {
        y: () => window.innerHeight,
        duration: time,
        stagger: {
            each: time,
            from: "start"
        },
        ease: "power2.inOut"
    });
});
