// Block-reveal animation for headings: a colored bar wipes across each line,
// the text appears underneath, then the bar wipes away. Uses GSAP + SplitText
// (js/vendor). Headings stay visible as normal if the scripts can't load.
(function () {
  // Which elements animate. Add a selector here (e.g. "main h3") to include more.
  var SELECTOR = "main h1, main h2, [data-text-reveal]";
  var COLORS = {
    onDark: "#c7a873", // gold, for light text on dark sections
    onLight: "#0c0c0b", // ink, for dark text on light sections
  };
  var DURATION = 0.6; // seconds per wipe
  var STAGGER = 0.1; // delay between lines

  if (!window.gsap || !window.SplitText || !window.ScrollTrigger) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(SplitText, ScrollTrigger);

  function isLightText(el) {
    var rgb = getComputedStyle(el).color.match(/\d+(\.\d+)?/g).map(Number);
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2] > 140;
  }

  document.querySelectorAll(SELECTOR).forEach(function (el) {
    // The first heading on the page (the hero) plays on load; the rest on scroll.
    var isHero = !!el.closest("main > :first-child");
    var color = el.dataset.blockColor || (isLightText(el) ? COLORS.onDark : COLORS.onLight);

    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true, // re-split when fonts load or the window resizes
      onSplit: function (self) {
        var blocks = self.masks.map(function (mask) {
          mask.style.position = "relative";
          mask.style.width = "fit-content"; // bar matches the line's text width
          var block = document.createElement("span");
          block.setAttribute("aria-hidden", "true");
          block.style.cssText =
            "position:absolute;inset:0;z-index:2;background:" + color +
            ";transform:scaleX(0);transform-origin:left center;";
          mask.appendChild(block);
          return block;
        });
        gsap.set(self.lines, { opacity: 0 });

        var tl = gsap.timeline({
          defaults: { ease: "expo.inOut" },
          delay: isHero ? 0.2 : 0,
          scrollTrigger: isHero
            ? null
            : { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
        tl.to(blocks, { scaleX: 1, duration: DURATION, stagger: STAGGER, transformOrigin: "left center" })
          .set(self.lines, { opacity: 1, stagger: STAGGER }, "<" + DURATION / 2)
          .to(blocks, { scaleX: 0, duration: DURATION, stagger: STAGGER, transformOrigin: "right center" }, "<" + DURATION * 0.4);
        return tl;
      },
    });
  });
})();
