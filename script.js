const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
let scrollFrame = 0;

function updateScrollMotion() {
  const viewportHeight = window.innerHeight;
  for (const item of parallaxItems) {
    const bounds = item.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)));
    const distance = Number(item.dataset.parallax);
    item.style.setProperty("--scroll-y", `${(progress - 0.5) * distance * 2}px`);
  }
  scrollFrame = 0;
}

function requestScrollMotion() {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollMotion);
}

window.addEventListener("scroll", requestScrollMotion, { passive: true });
window.addEventListener("resize", requestScrollMotion);
requestScrollMotion();
