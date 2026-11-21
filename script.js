(function () {
  "use strict";

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  function setNav(open) {
    if (!navToggle || !siteNav) return;
    siteNav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setNav(!isOpen);
    });

    var navLinks = siteNav.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setNav(false);
      });
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Typing animation (respects reduced motion)
  var typingText = document.getElementById("typingText");
  var typingStatic = document.getElementById("typingStatic");
  var typingCaret = document.getElementById("typingCaret");

  if (typingText) {
    var prefersReduced = false;
    try {
      prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      prefersReduced = false;
    }

    if (prefersReduced) {
      typingText.textContent = "club --status";
      if (typingStatic) {
        typingStatic.textContent = "online // learn • practice • compete";
        typingStatic.setAttribute("aria-hidden", "false");
      }
      if (typingCaret) typingCaret.style.display = "none";
    } else {
      var lines = [
        { cmd: "whoami", out: "cssc_uajk" },
        { cmd: "club --status", out: "online // learn • practice • compete" }
      ];
      var lineIndex = 0;
      var charIndex = 0;
      var phase = "typingCmd"; // typingCmd | pauseOut | clearing

      if (typingStatic) typingStatic.setAttribute("aria-hidden", "true");

      function tick() {
        var current = lines[lineIndex];

        if (phase === "typingCmd") {
          charIndex += 1;
          typingText.textContent = current.cmd.slice(0, charIndex);
          if (charIndex >= current.cmd.length) {
            phase = "pauseOut";
            setTimeout(tick, 700);
            return;
          }
          setTimeout(tick, 70);
          return;
        }

        if (phase === "pauseOut") {
          if (typingStatic) {
            typingStatic.textContent = current.out;
            typingStatic.setAttribute("aria-hidden", "false");
          }
          phase = "clearing";
          setTimeout(tick, 1400);
          return;
        }

        if (phase === "clearing") {
          if (typingStatic) {
            typingStatic.textContent = "";
            typingStatic.setAttribute("aria-hidden", "true");
          }
          typingText.textContent = "";
          charIndex = 0;
          lineIndex = (lineIndex + 1) % lines.length;
          phase = "typingCmd";
          setTimeout(tick, 300);
        }
      }

      setTimeout(tick, 400);
    }
  }
})();