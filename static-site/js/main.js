// HJ4 Capital: site interactions (plain JavaScript, no build step).

// ---------- Site details and shared form delivery settings ----------
var SITE = {
  phone: "(305) 724-4362",
  phoneHref: "tel:+13057244362",
  // Public FormSubmit endpoint. Recipient must activate delivery before launch.
  dealFormEndpoint: "https://formsubmit.co/ajax/Henrry.martinez@hj4capital.com",
};

// ---------- Markets explorer data: edit metros here ----------
var MARKETS = [
  { state: "Florida", metros: ["Orlando", "Tampa Bay", "Jacksonville", "South Florida", "Fort Lauderdale", "Miami-Dade", "Broward County"] },
  { state: "Georgia", metros: ["Atlanta", "Savannah"] },
  { state: "North Carolina", metros: ["Charlotte", "Raleigh-Durham"] },
  { state: "South Carolina", metros: ["Greenville-Spartanburg", "Charleston"] },
  { state: "Texas", metros: ["Dallas-Fort Worth", "Houston", "Austin", "San Antonio"] },
  { state: "Tennessee", metros: ["Nashville", "Knoxville", "Chattanooga"] },
  { state: "Alabama", metros: ["Huntsville", "Birmingham"] },
];

function swapClasses(el, on, onClasses, offClasses) {
  var add = on ? onClasses : offClasses;
  var remove = on ? offClasses : onClasses;
  el.classList.remove.apply(el.classList, remove.split(" "));
  el.classList.add.apply(el.classList, add.split(" "));
}

// ---------- Header: transparent over the home hero, solid once scrolled; mobile menu ----------
function initHeader() {
  var header = document.querySelector("[data-site-header]");
  if (!header) return;
  var toggle = header.querySelector("[data-menu-toggle]");
  var panel = header.querySelector("[data-menu-panel]");
  var iconOpen = header.querySelector("[data-icon-open]");
  var iconClose = header.querySelector("[data-icon-close]");
  var isHome = document.body.dataset.page === "home";
  var open = false;

  function render() {
    var overlay = isHome && window.scrollY <= 16 && !open;
    swapClasses(
      header,
      overlay,
      "bg-transparent border-transparent",
      "bg-ink/90 border-hairline-dark backdrop-blur-md"
    );
    swapClasses(panel, open, "grid-rows-[1fr] opacity-100", "grid-rows-[0fr] opacity-0");
    swapClasses(iconOpen, open, "scale-50 opacity-0 blur-[4px]", "scale-100 opacity-100 blur-0");
    swapClasses(iconClose, open, "scale-100 opacity-100 blur-0", "scale-50 opacity-0 blur-[4px]");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", function () {
    open = !open;
    render();
  });
  panel.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      open = false;
      render();
    });
  });
  window.addEventListener("scroll", render, { passive: true });
  render();
}

// ---------- Scroll-in animation for .reveal blocks ----------
function initReveal() {
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach(function (el) { io.observe(el); });
}

// ---------- FAQ accordion (one open at a time) ----------
function initFaq() {
  var buttons = document.querySelectorAll("[data-faq-toggle]");
  function setState(btn, isOpen) {
    var item = btn.closest("h3").parentElement;
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    var state = isOpen ? "open" : "closed";
    [item, btn.closest("h3"), btn, panel].forEach(function (el) { el.dataset.state = state; });
    btn.setAttribute("aria-expanded", String(isOpen));
    panel.hidden = !isOpen;
  }
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wasOpen = btn.getAttribute("aria-expanded") === "true";
      buttons.forEach(function (b) { setState(b, false); });
      if (!wasOpen) setState(btn, true);
    });
  });
}

// ---------- Markets explorer ----------
function initMarkets() {
  document.querySelectorAll("[data-market-explorer]").forEach(function (root) {
    var buttons = root.querySelectorAll("[data-market]");
    var label = root.querySelector("[data-market-label]");
    var list = root.querySelector("[data-market-metros]");
    var itemClass = list.firstElementChild ? list.firstElementChild.className : "";

    function select(index) {
      var market = MARKETS[index];
      buttons.forEach(function (b, i) {
        b.classList.toggle("text-paper", i === index);
        b.classList.toggle("text-stone", i !== index);
      });
      label.textContent = "Key metros · " + market.state;
      list.innerHTML = "";
      market.metros.forEach(function (metro) {
        var li = document.createElement("li");
        li.className = itemClass;
        li.textContent = metro;
        list.appendChild(li);
      });
    }

    buttons.forEach(function (b) {
      b.classList.add("hover:text-paper");
      b.addEventListener("click", function () { select(Number(b.dataset.market)); });
    });
  });
}

// ---------- Deal form ----------
// Both forms use the same delivery endpoint. Success requires server acceptance.
function initDealForm() {
  document.querySelectorAll("[data-deal-form]").forEach(function (form) {
    var endpoint = form.getAttribute("action") || SITE.dealFormEndpoint;
    var button = form.querySelector('button[type="submit"]');
    var note = form.querySelector("[data-deal-form-note]");
    var originalLabel = button.textContent;
    var sending = false;
    var error = document.createElement("p");
    error.className = "text-sm text-stone";
    error.setAttribute("role", "alert");
    error.setAttribute("tabindex", "-1");
    error.hidden = true;
    form.insertBefore(error, form.lastElementChild);

    function showError(message) {
      error.textContent = message;
      error.hidden = false;
      error.focus();
    }

    if (endpoint) {
      form.setAttribute("action", endpoint);
      note.textContent = "Share the property details and we will review your inquiry.";
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (sending) return;
      error.hidden = true;
      var data = new FormData(form);
      var get = function (k) { return String(data.get(k) || "").trim(); };
      if (get("name").length < 2) return showError("Please enter your name.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) {
        return showError("Please enter a valid email.");
      }
      if (get("message").length < 12) {
        return showError("Please include a short note or offering summary.");
      }
      if (!endpoint) {
        return showError("Your inquiry has not been sent. Please call " + SITE.phone + " to share your opportunity.");
      }
      var target;
      try {
        target = new URL(endpoint);
        if (target.protocol !== "https:") throw new Error("Invalid endpoint");
        if (target.hostname === "formsubmit.co" && target.pathname.indexOf("/ajax/") !== 0) {
          target.pathname = "/ajax" + target.pathname;
        }
      } catch (err) {
        return showError("Online submissions are unavailable. Please call " + SITE.phone + ".");
      }

      sending = true;
      button.disabled = true;
      button.textContent = "Sending...";
      form.setAttribute("aria-busy", "true");
      var controller = new AbortController();
      var timeout = window.setTimeout(function () { controller.abort(); }, 20000);
      try {
        var isFormSubmit = target.hostname === "formsubmit.co";
        var headers = { Accept: "application/json" };
        var body = data;
        if (isFormSubmit) {
          headers["Content-Type"] = "application/json";
          body = JSON.stringify(Object.fromEntries(data.entries()));
        }
        var response = await fetch(target.href, {
          method: "POST",
          body: body,
          headers: headers,
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Submission rejected");
        // Do not treat an HTML redirect (e.g. a login page) as confirmation.
        var result = await response.json();
        if (!result || !(result.ok === true || result.success === true || result.success === "true") || result.error || (result.errors && result.errors.length)) {
          throw new Error("Submission rejected");
        }
        var done = document.createElement("div");
        done.className = "rounded-lg border border-hairline-dark bg-ink-soft p-8";
        done.setAttribute("role", "status");
        done.setAttribute("tabindex", "-1");
        done.innerHTML =
          '<p class="text-xs font-medium tracking-[0.18em] uppercase text-steel">Inquiry submitted</p>' +
          '<h3 class="mt-3 font-display text-3xl tracking-tight text-paper">Thank you for sharing your opportunity.</h3>' +
          '<p class="mt-4 max-w-md text-sm leading-relaxed text-stone">Your inquiry was accepted. To discuss it by phone, call ' +
          '<a href="' + SITE.phoneHref + '" class="text-paper underline-offset-4 hover:underline">' + SITE.phone + "</a>.</p>";
        form.replaceWith(done);
        done.focus();
      } catch (err) {
        showError("We could not confirm your submission. Your details are still here. Please try again or call " + SITE.phone + ".");
      } finally {
        window.clearTimeout(timeout);
        sending = false;
        button.disabled = false;
        button.textContent = originalLabel;
        form.removeAttribute("aria-busy");
      }
    });
  });
}

// ---------- Word-by-word text effect ----------
// Add data-text-generate to an element: the words of its titles (h3) and
// paragraphs fade in from a blur, one after another, when it scrolls into view.
// Short numbers like "01" are left as they are.
var WORD_STAGGER_MS = 35; // delay between words

function initTextGenerate() {
  var items = document.querySelectorAll("[data-text-generate]");
  if (!items.length || !("IntersectionObserver" in window)) return;

  items.forEach(function (item) {
    var baseDelay = parseFloat(item.style.transitionDelay) || 0;
    var i = 0;
    item.querySelectorAll("h3, p").forEach(function (el) {
      var text = el.textContent.trim();
      if (/^\d+$/.test(text)) return;
      el.textContent = "";
      text.split(/\s+/).forEach(function (word, w) {
        if (w > 0) el.appendChild(document.createTextNode(" "));
        var span = document.createElement("span");
        span.className = "tg-word";
        span.textContent = word;
        span.style.transitionDelay = baseDelay + i * WORD_STAGGER_MS + "ms";
        el.appendChild(span);
        i++;
      });
    });
  });

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-generated");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach(function (item) { io.observe(item); });
}

// ---------- Team gallery (About page) ----------
// Hover, tap, or keyboard-focus a person to widen their photo panel.
function initTeamGallery() {
  document.querySelectorAll("[data-team-gallery]").forEach(function (gallery) {
    var panels = gallery.querySelectorAll(".team-panel");
    function activate(panel) {
      panels.forEach(function (p) {
        p.classList.toggle("is-active", p === panel);
        p.setAttribute("aria-expanded", String(p === panel));
      });
    }
    panels.forEach(function (panel) {
      panel.addEventListener("mouseenter", function () { activate(panel); });
      panel.addEventListener("click", function () { activate(panel); });
      panel.addEventListener("focus", function () { activate(panel); });
    });
  });
}

// ---------- Markets map (Markets page) ----------
// Bring the hovered/tapped state to the front so its raised edge overlaps its neighbors.
function initMarketsMap() {
  document.querySelectorAll("[data-markets-map] .map-states").forEach(function (group) {
    var states = group.querySelectorAll(".map-state");
    function raise(state) {
      group.appendChild(state);
    }
    states.forEach(function (state) {
      state.addEventListener("mouseenter", function () { raise(state); });
      state.addEventListener("focus", function () { raise(state); });
      state.addEventListener("click", function () {
        var wasActive = state.classList.contains("is-active");
        states.forEach(function (s) { s.classList.remove("is-active"); });
        if (!wasActive) { state.classList.add("is-active"); raise(state); }
      });
    });
  });
}

initHeader();
initReveal();
initFaq();
initMarkets();
initDealForm();
initTextGenerate();
initTeamGallery();
initMarketsMap();
