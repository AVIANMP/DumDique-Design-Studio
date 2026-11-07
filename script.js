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

const likeButton = document.querySelector(".like-button");
const likeCount = document.querySelector(".like-count");
const saveButton = document.querySelector(".save-button");
const followButton = document.querySelector(".follow-button");

likeButton?.addEventListener("click", () => {
  const liked = likeButton.getAttribute("aria-pressed") !== "true";
  likeButton.setAttribute("aria-pressed", String(liked));
  likeCount.textContent = liked ? "1.3K" : "1.2K";
});

saveButton?.addEventListener("click", () => {
  const saved = saveButton.getAttribute("aria-pressed") !== "true";
  saveButton.setAttribute("aria-pressed", String(saved));
  saveButton.setAttribute("aria-label", saved ? "Remove saved study" : "Save this study");
});

followButton?.addEventListener("click", () => {
  const following = followButton.getAttribute("aria-pressed") !== "true";
  followButton.setAttribute("aria-pressed", String(following));
  followButton.textContent = following ? "Following" : "Follow";
});
