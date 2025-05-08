document.addEventListener("DOMContentLoaded", () => {
    // GSAP ScrollTrigger setup
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
      // Mobile: slower scale-up and stack without pin
      "(max-width: 991px)": function() {
        // Mobile scale-up
        gsap.to(".scaleUp", {
          scale: 300,
          force3D: false,
          transformOrigin: "50% 64%",
          scrollTrigger: {
            trigger: "#ScaleUpContainer",
            pin: true,
            scrub: 1,
            start: "top top",
            end: "+=500%",
            invalidateOnRefresh: true,
          }
        });
        // Mobile stack-effect
        const stacks = document.querySelectorAll(".stack");
        const timeMobile = 2;
        gsap.set(stacks, {
          y: 0,
          transformStyle: "preserve-3d",
          transformOrigin: "center top",
          zIndex: index => stacks.length - index,
        });
        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: "section",
            start: "top top",
            end: `${stacks.length * window.innerHeight} top`,
            scrub: 1,
            pin: false,
            markers: false,
            pinSpacing: false,
            invalidateOnRefresh: true,
          }
        });
        tlMobile.from(stacks, {
          y: index => index * window.innerHeight * 0.5,
          duration: timeMobile,
          stagger: {
            each: timeMobile * 0.2,
            from: "start"
          },
          ease: "power2.inOut"
        });
      },
      // Desktop: original speeds and pinning
      "(min-width: 992px)": function() {
        // Desktop scale-up
        gsap.to(".scaleUp", {
          scale: 600,
          force3D: false,
          transformOrigin: "50% 64%",
          scrollTrigger: {
            trigger: "#ScaleUpContainer",
            pin: true,
            scrub: true,
            start: "top top",
            end: "+=500%",
            invalidateOnRefresh: true,
          }
        });
        // Desktop stack-effect
        const stacks = document.querySelectorAll(".stack");
        const time = 2;
        gsap.set(stacks, {
          y: 0,
          transformStyle: "preserve-3d",
          transformOrigin: "center top",
          zIndex: (index) => index + 1,
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "section",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            markers: false,
            invalidateOnRefresh: true,
          },
        });
        tl.from(".stack:not(:first-child)", {
          y: () => window.innerHeight,
          duration: time,
          stagger: {
            each: time,
            from: "start"
          },
          ease: "power2.inOut"
        });
      }
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
        }
    });
});
