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

    // Responsive ScrollTrigger timelines
    ScrollTrigger.matchMedia({
      // Mobile: simpler vertical stack without pin
      "(max-width: 991px)": function() {
        const galleryImages = document.querySelectorAll('.gallery-stack img');
        gsap.set(galleryImages, {
          y: 0,
          transformStyle: "preserve-3d",
          transformOrigin: "center top",
          zIndex: index => galleryImages.length - index,
        });
        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: "#Gallery section",
            start: "top top",
            end: `${galleryImages.length * window.innerHeight} top`,
            scrub: 1,
            pin: false,
            markers: false,
            pinSpacing: false,
            invalidateOnRefresh: true,
          }
        });
        tlMobile.from(galleryImages, {
          y: index => index * window.innerHeight * 0.5,
          duration: time,
          stagger: {
            each: time * 0.2,
            from: "start"
          },
          ease: "power2.inOut"
        });
      },
      // Desktop: original pinned stack
      "(min-width: 992px)": function() {
        const galleryImages = document.querySelectorAll('.gallery-stack img');
        gsap.set(galleryImages, {
          y: 0,
          transformStyle: "preserve-3d",
          transformOrigin: "center top",
          zIndex: index => index + 1,
        });
        const tlDesktop = gsap.timeline({
          scrollTrigger: {
            trigger: "#Gallery section",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            pin: true,
            markers: false,
          }
        });
        tlDesktop.from(galleryImages, {
          y: index => index < 6 
              ? Math.floor(index / 3) * window.innerHeight * 0.3 
              : window.innerHeight * 1.2,
          duration: time,
          stagger: {
            each: time * 0.3,
            from: "start"
          },
          ease: "power2.inOut"
        });
      }
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


});
