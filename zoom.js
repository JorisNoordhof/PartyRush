document.addEventListener("DOMContentLoaded", () => {
    // GSAP ScrollTrigger setup
    gsap.registerPlugin(ScrollTrigger);

    // Scale-up effect
    //gsap.set(".scaleUp", { xPercent: -50, yPercent: -50 });
    gsap.to(".scaleUp", {
        scale: 600,
        //opacity: 0,
        force3D: false,
        transformOrigin: "50% 64%", // Verplaats het inzoompunt iets lager
        scrollTrigger: {
            trigger: "#ScaleUpContainer",
            pin: true,
            scrub: true,
            start: "top top",
            end: "+=500%",
            invalidateOnRefresh: true,
        },
        onComplete: () => {
            // Verwijder het element uit de DOM
            //document.querySelector(".scaleUp").style.opacity = 0;
            // Of je kunt de visibility aanpassen als je het element niet helemaal wilt verwijderen
            // document.querySelector(".scaleUp").style.visibility = 'hidden';
        },
    });

    // Scale-down effect
    gsap.set(".scaleDown", { xPercent: -50, yPercent: -50 });
    gsap.to(".scaleDown", {
        scale: 0.6,
        force3D: false,
        scrollTrigger: {
            trigger: "#ScaleDownContainer",
            pin: true,
            scrub: true,
            start: "top top",
            end: "+=100%",
            invalidateOnRefresh: true,
        },
    });

    // Fade-out effect on scroll
    ScrollTrigger.create({
        onUpdate: (self) => {
            const header = document.getElementById("opening");
            if (header) {
                const distanceToTop = 100;
                const elementHeight = header.offsetHeight / 4;
                let opacity = 1;

                if (self.scroll.y > distanceToTop) {
                    opacity = 1 - (self.scroll.y - distanceToTop) / elementHeight;
                }

                header.style.opacity = opacity > 0 ? opacity : 0;
            }
        },
    });

    // Stack-effect integratie
    const scaleMax = gsap.utils.mapRange(1, document.querySelectorAll(".stack").length - 1, 0.8, 1);
    const time = 2;

    // Stel de initiële positie van de kaarten in
    gsap.set(".stack", {
        y: (index) => 10 * index,
        transformStyle: "preserve-3d",
        transformOrigin: "center top",
    });

    // Stack-effect ScrollTrigger
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "section", // Het section-element voor het stack-effect
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            markers: false, // Debug-markers, zet op true indien nodig
        },
    });

    // Laat de kaarten omhoog bewegen
    tl.from(".stack", {
        y: () => window.innerHeight,
        duration: time / 2,
        stagger: time,
    });

    // Voeg de stack-effectanimatie toe
    tl.to(
        ".stack:not(:last-child)",
        {
            rotationX: -20,
            scale: (index) => scaleMax(index),
            stagger: {
                each: time,
            },
        },
        time
    );
});
