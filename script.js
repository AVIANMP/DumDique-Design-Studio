const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mobileNav.hidden = isOpen;
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      mobileNav.hidden = true;
    }
  });
}

const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
const marqueeTracks = [...document.querySelectorAll(".marquee-track")];
let scrollFrame = 0;

function updateScrollMotion() {
  const viewportHeight = window.innerHeight;

  for (const item of parallaxItems) {
    const bounds = item.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)));
    const distance = Number(item.dataset.parallax);
    item.style.setProperty("--scroll-y", `${(progress - 0.5) * distance * 2}px`);
  }

  const offset = `${-window.scrollY * 0.12}px`;
  for (const track of marqueeTracks) track.style.setProperty("--scroll-x", offset);
  scrollFrame = 0;
}

function requestScrollMotion() {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollMotion);
}

window.addEventListener("scroll", requestScrollMotion, { passive: true });
window.addEventListener("resize", requestScrollMotion);
requestScrollMotion();
