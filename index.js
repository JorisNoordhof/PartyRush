
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true
    });

scroll.on('FADE', func => {
    console.log("FADEEE")
    // Using modularJS
    this.call(...func);
    // Using jQuery events
    $(document).trigger(func);
    // Or do it your own way 😎
});