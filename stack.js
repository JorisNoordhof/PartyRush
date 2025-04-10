document.addEventListener("DOMContentLoaded", () => {
    // GSAP ScrollTrigger setup
    gsap.registerPlugin(ScrollTrigger);

    // Stack-effect integratie
    const time = 0.8;

    // Handle releases stack
    // const stacks = document.querySelectorAll('.stack');
    // gsap.set(stacks, {
    //     y: 0,
    //     transformStyle: "preserve-3d",
    //     transformOrigin: "center top",
    //     zIndex: (index) => index + 1,
    // });

    // Handle gallery stack
    const galleryImages = document.querySelectorAll('.gallery-stack img');
    gsap.set(galleryImages, {
        y: 0,
        transformStyle: "preserve-3d",
        transformOrigin: "center top",
        zIndex: (index) => index + 1,
    });

    // Stack-effect ScrollTrigger for releases
    // const tlReleases = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: "#Releases section",
    //         start: "top top",
    //         end: "bottom top",
    //         scrub: 0.5,
    //         pin: true,
    //         markers: false,
    //     },
    // });

    // Stack-effect ScrollTrigger for gallery
    const tlGallery = gsap.timeline({
        scrollTrigger: {
            trigger: "#Gallery section",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            pin: true,
            markers: false,
        },
    });

    // Laat de kaarten (behalve de eerste) van onderen komen voor releases
    // tlReleases.from("#Releases .stack:not(:first-child)", {
    //     y: () => window.innerHeight * 0.3,
    //     duration: time,
    //     stagger: {
    //         each: time * 0.3,
    //         from: "start"
    //     },
    //     ease: "power2.inOut"
    // });

    // Laat alle afbeeldingen van de gallery stacken
    tlGallery.from("#Gallery .gallery-stack img", {
        y: (index) => {
            const isMobile = window.innerWidth < 992; // Bootstrap's lg breakpoint
            const baseHeight = window.innerHeight;
            
            if (isMobile) {
                // Voor mobiel: afbeeldingen onder elkaar plaatsen met vaste afstand
                return index * baseHeight * 1.5; // Elke afbeelding komt 1.5 schermhoogte lager
            } else {
                // Voor desktop: originele afstanden met 3 afbeeldingen per rij
                if (index < 6) { // Eerste 6 afbeeldingen
                    return Math.floor(index / 3) * baseHeight * 0.3;
                }
                return baseHeight * 1.2; // Laatste grote afbeelding
            }
        },
        duration: time,
        stagger: {
            each: time * 0.3,
            from: "start"
        },
        ease: "power2.inOut"
    });

    // Update animatie bij resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});
