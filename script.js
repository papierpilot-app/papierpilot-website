// Local UI only: navigation, screenshot viewer, product demo and pricing.
// No cookies, analytics, external scripts or storage.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Menü öffnen");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    });
    nav.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", closeNav); });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        closeNav();
        toggle.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".header-inner")) closeNav();
    });
    var desktopMenu = window.matchMedia("(min-width: 761px)");
    if (desktopMenu.addEventListener) desktopMenu.addEventListener("change", function (event) { if (event.matches) closeNav(); });
  }

  var screenshotDialog = document.querySelector(".screenshot-dialog");
  if (screenshotDialog && typeof screenshotDialog.showModal === "function") {
    var dialogImage = screenshotDialog.querySelector("img");
    var dialogTitle = document.getElementById("screenshot-title");
    var screenshotTrigger = null;
    document.querySelectorAll("[data-screenshot]").forEach(function (button) {
      button.addEventListener("click", function () {
        screenshotTrigger = button;
        var originalImage = button.querySelector("img");
        dialogImage.src = button.dataset.screenshot;
        dialogImage.alt = originalImage.alt;
        dialogTitle.textContent = originalImage.alt;
        screenshotDialog.showModal();
      });
    });
    screenshotDialog.querySelector(".dialog-close").addEventListener("click", function () { screenshotDialog.close(); });
    screenshotDialog.addEventListener("click", function (event) {
      var rect = screenshotDialog.getBoundingClientRect();
      if (event.target === screenshotDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) screenshotDialog.close();
    });
    screenshotDialog.addEventListener("close", function () { if (screenshotTrigger) screenshotTrigger.focus(); });
  }

  var tabs = Array.from(document.querySelectorAll(".demo-tab"));
  var panels = Array.from(document.querySelectorAll(".demo-panel"));
  var playButton = document.querySelector(".demo-play");
  var demoProgress = document.querySelector(".demo-progress");
  var currentStep = 0;
  var demoTimer = null;
  var demoPlaying = false;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function showStep(index) {
    currentStep = index;
    tabs.forEach(function (tab, i) {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
  }

  function stopDemo() {
    window.clearTimeout(demoTimer);
    demoTimer = null;
    demoPlaying = false;
    if (playButton) {
      playButton.setAttribute("aria-pressed", "false");
      playButton.querySelector("[data-play-label]").textContent = reducedMotion.matches ? "Nächsten Schritt ansehen" : "Demo abspielen";
      playButton.firstElementChild.textContent = "▷";
    }
    if (demoProgress) demoProgress.classList.remove("is-playing");
  }

  function scheduleDemoStep() {
    demoTimer = window.setTimeout(function () {
      if (currentStep >= tabs.length - 1) {
        stopDemo();
        return;
      }
      showStep(currentStep + 1);
      scheduleDemoStep();
    }, 6000);
  }

  if (tabs.length && panels.length === tabs.length) {
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { stopDemo(); showStep(index); });
      tab.addEventListener("keydown", function (event) {
        var next = index;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        stopDemo();
        showStep(next);
        tabs[next].focus();
      });
    });
    playButton.addEventListener("click", function () {
      if (demoPlaying) { stopDemo(); return; }
      if (reducedMotion.matches) {
        showStep((currentStep + 1) % tabs.length);
        return;
      }
      showStep(0);
      demoPlaying = true;
      playButton.setAttribute("aria-pressed", "true");
      playButton.querySelector("[data-play-label]").textContent = "Demo stoppen";
      playButton.firstElementChild.textContent = "Ⅱ";
      demoProgress.classList.add("is-playing");
      scheduleDemoStep();
    });
    function updateMotion() {
      stopDemo();
      playButton.querySelector("[data-play-label]").textContent = reducedMotion.matches ? "Nächsten Schritt ansehen" : "Demo abspielen";
    }
    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", updateMotion);
    if (reducedMotion.matches) updateMotion();
    document.addEventListener("visibilitychange", function () { if (document.hidden) stopDemo(); });
  }

  var billingButtons = Array.from(document.querySelectorAll("[data-billing]"));
  billingButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var annual = button.dataset.billing === "year";
      billingButtons.forEach(function (option) { option.setAttribute("aria-pressed", String(option === button)); });
      document.querySelector("[data-premium-price]").textContent = annual ? "29,99 €" : "2,99 €";
      document.querySelector("[data-premium-period]").textContent = annual ? "pro Jahr · entspricht rund 2,50 € / Monat" : "pro Monat · monatlich kündbar";
      document.querySelector("[data-premium-note]").textContent = annual ? "Jährliche Abrechnung von 29,99 €." : "Auch jährlich für 29,99 € verfügbar.";
    });
  });
});
