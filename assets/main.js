const root = document.documentElement;
const body = document.body;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isEmbeddedProject = new URLSearchParams(window.location.search).get("modal") === "1";

if (isEmbeddedProject) {
  body.classList.add("is-project-modal");
}

window.addEventListener("load", () => {
  body.classList.add("is-ready");
});

function createProjectModal() {
  const modal = document.createElement("div");
  modal.className = "project-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="project-modal-frame" role="dialog" aria-modal="true" aria-label="Project detail">
      <iframe title="Project detail"></iframe>
    </div>
    <button class="modal-close" type="button" aria-label="Close project detail">&times;</button>
  `;
  document.body.appendChild(modal);

  const iframe = modal.querySelector("iframe");
  const closeButton = modal.querySelector(".modal-close");

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("is-modal-open");
    window.setTimeout(() => {
      iframe.removeAttribute("src");
    }, 260);
  };

  closeButton.addEventListener("click", close);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  return {
    open(url) {
      const joiner = url.includes("?") ? "&" : "?";
      iframe.src = `${url}${joiner}modal=1`;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      body.classList.add("is-modal-open");
      closeButton.focus();
    },
  };
}

const projectModal = !isEmbeddedProject ? createProjectModal() : null;

let ambientVideoObserver = null;

function observeAmbientVideos(videos) {
  if (!videos.length || !("IntersectionObserver" in window)) return;

  if (!ambientVideoObserver) {
    ambientVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.35 });
  }

  videos.forEach((video) => ambientVideoObserver.observe(video));
}

function hydrateMedia(container) {
  container.querySelectorAll("img[data-src]").forEach((image, index) => {
    image.loading = "lazy";
    image.decoding = "async";
    image.src = image.dataset.src;
    image.removeAttribute("data-src");
    if (index < 2) image.fetchPriority = "low";
  });

  container.querySelectorAll("video[data-src]").forEach((video) => {
    video.src = video.dataset.src;
    video.removeAttribute("data-src");
    video.preload = "metadata";
    video.load();
    observeAmbientVideos([video]);
  });
}

document.querySelectorAll("img:not([data-src])").forEach((image) => {
  image.loading = image.loading || "lazy";
  image.decoding = image.decoding || "async";
});

const brandProjects = {
  fushou: {
    title: "福寿齐天 IP 视觉设计",
    note: "角色设定、三视图、表情与视觉延展。",
    images: [
      "04-brand-visual/01_FuShou_IP/cover.jpg.jpg",
      "04-brand-visual/01_FuShou_IP/character.jpg.png",
      "04-brand-visual/01_FuShou_IP/detail.jpg.png",
      "04-brand-visual/01_FuShou_IP/expression_01.jpg.jpg",
      "04-brand-visual/01_FuShou_IP/expression_02.jpg.jpg",
      "04-brand-visual/01_FuShou_IP/three_view_01.jpg.jpg",
      "04-brand-visual/01_FuShou_IP/three_view_02.jpg.jpg",
    ],
  },
  orbit: {
    title: "Orbit 成长中心品牌视觉系统",
    note: "识别系统、字体色彩、图形延展、海报与社媒物料。",
    images: [
      "04-brand-visual/02_Orbit_VI/cover.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/logo_system_01.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/logo_system_02.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/color_typography_01.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/color_typography_02.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/graphic_system_01.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/graphic_system_02.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/id_card_01.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/id_card_02.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/id_card_03.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/poster_01.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/poster_02.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/poster_03.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/poster_04.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/poster_05.jpg.jpg",
      "04-brand-visual/02_Orbit_VI/social_media.jpg.jpg",
    ],
  },
  tianbianke: {
    title: "田边客品牌视觉",
    note: "品牌识别、理念表达、食材系列、导视与延展应用。",
    images: [
      "04-brand-visual/03_Tianbianke/logo_system_02.jpg.png",
      "04-brand-visual/03_Tianbianke/logo_system_01.jpg.png",
      "04-brand-visual/03_Tianbianke/logo_system_03.jpg.png",
      "04-brand-visual/03_Tianbianke/project_intro.jpg.png",
      "04-brand-visual/03_Tianbianke/philosophy_01.jpg.png",
      "04-brand-visual/03_Tianbianke/philosophy_02.jpg.png",
      "04-brand-visual/03_Tianbianke/brand_extension.jpg.png",
      "04-brand-visual/03_Tianbianke/ingredient_series_01.png",
      "04-brand-visual/03_Tianbianke/ingredient_series_02.png",
      "04-brand-visual/03_Tianbianke/ingredient_series_03.png",
      "04-brand-visual/03_Tianbianke/ingredient_series_04.png",
      "04-brand-visual/03_Tianbianke/ingredient_series_05.png",
      "04-brand-visual/03_Tianbianke/ingredient_series_06.png",
      "04-brand-visual/03_Tianbianke/wayfinding_01.jpg.png",
      "04-brand-visual/03_Tianbianke/wayfinding_02.jpg.png",
    ],
  },
  flower: {
    title: "东方花卉系列插画",
    note: "花卉图形、东方装饰感与系列化视觉表达。",
    images: [
      "04-brand-visual/04_Flower_Illustration_Series/cover.jpg.png",
      "04-brand-visual/04_Flower_Illustration_Series/hydrangea.jpg.png",
      "04-brand-visual/04_Flower_Illustration_Series/lily.jpg.png",
      "04-brand-visual/04_Flower_Illustration_Series/lotus.jpg.png",
      "04-brand-visual/04_Flower_Illustration_Series/peony.jpg.png",
      "04-brand-visual/04_Flower_Illustration_Series/sakura.jpg.png",
      "04-brand-visual/04_Flower_Illustration_Series/sunflower.jpg.png",
    ],
  },
  "ancient-city": {
    title: "AI Ancient City",
    note: "以 AI 生成影像探索古城场景与东方叙事。",
    images: [
      "04-brand-visual/05_AI_Ancient_City/cover.jpg.png",
    ],
  },
};

function createBrandModal() {
  const modal = document.createElement("div");
  modal.className = "brand-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="brand-modal-frame" role="dialog" aria-modal="true" aria-label="Brand project">
      <header class="brand-modal-head">
        <span>Brand Visual</span>
        <h2></h2>
        <p></p>
      </header>
      <div class="gallery-scrollbar brand-modal-scrollbar" role="scrollbar" aria-label="Brand gallery scroll" aria-orientation="horizontal">
        <span class="gallery-scrollbar-track"></span>
        <span class="gallery-scrollbar-thumb"></span>
      </div>
      <div class="brand-modal-gallery"></div>
    </div>
    <button class="brand-modal-close" type="button" aria-label="Close brand project">&times;</button>
  `;
  document.body.appendChild(modal);

  const closeButton = modal.querySelector(".brand-modal-close");
  const title = modal.querySelector("h2");
  const note = modal.querySelector("p");
  const gallery = modal.querySelector(".brand-modal-gallery");
  const scrollbar = modal.querySelector(".brand-modal-scrollbar");
  const thumb = scrollbar.querySelector(".gallery-scrollbar-thumb");
  let renderToken = 0;
  let dragStartX = 0;
  let dragStartScroll = 0;

  const getMaxScroll = () => Math.max(0, gallery.scrollWidth - gallery.clientWidth);
  const getMaxThumbX = () => Math.max(0, scrollbar.clientWidth - thumb.offsetWidth);

  const syncScrollbar = () => {
    const maxScroll = getMaxScroll();
    const maxThumbX = getMaxThumbX();
    const progress = maxScroll ? gallery.scrollLeft / maxScroll : 0;

    scrollbar.classList.toggle("is-hidden", maxScroll <= 1);
    scrollbar.style.setProperty("--thumb-x", `${Math.min(maxThumbX, Math.max(0, progress * maxThumbX)).toFixed(2)}px`);
    scrollbar.setAttribute("aria-valuemin", "0");
    scrollbar.setAttribute("aria-valuemax", String(Math.round(maxScroll)));
    scrollbar.setAttribute("aria-valuenow", String(Math.round(gallery.scrollLeft)));
  };

  const scrollToPointer = (clientX) => {
    const rect = scrollbar.getBoundingClientRect();
    const maxThumbX = getMaxThumbX();
    const rawX = clientX - rect.left - thumb.offsetWidth / 2;
    const thumbX = Math.min(maxThumbX, Math.max(0, rawX));
    const progress = maxThumbX ? thumbX / maxThumbX : 0;
    gallery.scrollLeft = progress * getMaxScroll();
  };

  scrollbar.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    scrollbar.setPointerCapture(event.pointerId);
    dragStartX = event.clientX;
    dragStartScroll = gallery.scrollLeft;

    if (!event.target.closest(".gallery-scrollbar-thumb")) {
      scrollToPointer(event.clientX);
      dragStartScroll = gallery.scrollLeft;
    }
  });

  scrollbar.addEventListener("pointermove", (event) => {
    if (!scrollbar.hasPointerCapture(event.pointerId)) return;

    const maxThumbX = getMaxThumbX();
    const maxScroll = getMaxScroll();
    const scrollPerPixel = maxThumbX ? maxScroll / maxThumbX : 0;
    gallery.scrollLeft = dragStartScroll + (event.clientX - dragStartX) * scrollPerPixel;
  });

  scrollbar.addEventListener("pointerup", (event) => {
    if (scrollbar.hasPointerCapture(event.pointerId)) scrollbar.releasePointerCapture(event.pointerId);
  });

  scrollbar.addEventListener("pointercancel", (event) => {
    if (scrollbar.hasPointerCapture(event.pointerId)) scrollbar.releasePointerCapture(event.pointerId);
  });

  gallery.addEventListener("scroll", syncScrollbar, { passive: true });
  window.addEventListener("resize", syncScrollbar, { passive: true });

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("is-modal-open");
    window.setTimeout(() => {
      gallery.innerHTML = "";
    }, 260);
  };

  closeButton.addEventListener("click", close);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  return {
    open(project) {
      const token = ++renderToken;
      let index = 0;
      title.textContent = project.title;
      note.textContent = project.note;
      gallery.innerHTML = "";
      modal.dataset.brandProject = project.key || "";
      gallery.scrollLeft = 0;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      body.classList.add("is-modal-open");
      closeButton.focus();

      const appendBatch = () => {
        if (token !== renderToken || !modal.classList.contains("is-open")) return;

        const fragment = document.createDocumentFragment();
        project.images.slice(index, index + 4).forEach((src, batchIndex) => {
          const figure = document.createElement("figure");
          const image = document.createElement("img");
          if (src.includes("03_Tianbianke/")) {
            figure.classList.add("is-tianbianke-media");
          }
          if (src.includes("logo_system_02")) {
            figure.classList.add("is-logo-wide");
          } else if (src.includes("logo_system_01") || src.includes("logo_system_03")) {
            figure.classList.add("is-logo-round");
          } else if (src.includes("project_intro")) {
            figure.classList.add("is-square-feature");
          } else if (
            src.includes("philosophy_01")
            || src.includes("philosophy_02")
            || src.includes("brand_extension")
          ) {
            figure.classList.add("is-copy-poster");
          } else if (src.includes("ingredient_series_")) {
            figure.classList.add("is-ingredient-series");
          } else if (src.includes("wayfinding_")) {
            figure.classList.add("is-welcome-poster");
          }
          if (src.includes("04_Flower_Illustration_Series/cover")) {
            figure.classList.add("is-flower-cover");
          }
          image.addEventListener("load", () => {
            if (figure.classList.contains("is-tianbianke-media") || !image.naturalWidth || !image.naturalHeight) return;

            const ratio = image.naturalWidth / image.naturalHeight;
            if (ratio >= 0.78 && ratio <= 1.7) {
              figure.classList.add("is-pair-media");
            }
            syncScrollbar();
          }, { once: true });
          image.src = src;
          image.alt = project.title;
          image.decoding = "async";
          image.loading = index === 0 && batchIndex === 0 ? "eager" : "lazy";
          figure.appendChild(image);
          fragment.appendChild(figure);
        });

        gallery.appendChild(fragment);
        index += 4;
        window.requestAnimationFrame(syncScrollbar);

        if (index < project.images.length) {
          window.setTimeout(appendBatch, 90);
        }
      };

      appendBatch();
    },
  };
}

const brandModal = !isEmbeddedProject && document.querySelector("[data-brand-project]") ? createBrandModal() : null;

if (brandModal) {
  document.querySelectorAll("[data-brand-project]").forEach((card) => {
    card.addEventListener("click", () => {
      const project = brandProjects[card.dataset.brandProject];
      if (project) project.key = card.dataset.brandProject;
      if (project) brandModal.open(project);
    });
  });
}

if (!isEmbeddedProject && location.pathname.replace(/\\/g, "/").includes("/projects/")) {
  const closeLink = document.createElement("a");
  closeLink.className = "detail-close";
  closeLink.href = "../works.html#ai-projects";
  closeLink.setAttribute("aria-label", "Back to projects");
  closeLink.textContent = "\u00d7";
  document.body.appendChild(closeLink);
}

document.querySelectorAll("a[href]").forEach((link) => {
  const href = link.getAttribute("href");
  const isLocalPage = href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("http") && !href.endsWith(".pdf");
  const isProjectDetail = href && href.includes("projects/") && href.endsWith(".html");

  if (projectModal && isProjectDetail) {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === "_blank") return;
      event.preventDefault();
      projectModal.open(href);
    });
    return;
  }

  if (!isLocalPage || reduceMotion) return;

  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === "_blank") return;
    event.preventDefault();
    body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = href;
    }, 260);
  });
});

const revealItems = document.querySelectorAll(".reveal");
revealItems.forEach((item, index) => {
  item.style.setProperty("--delay", `${Math.min(index * 55, 360)}ms`);
});

const workTabs = document.querySelectorAll("[data-work-tab]");
const workPanels = document.querySelectorAll("[data-work-panel]");

function showWorkPanel(panelId, shouldScroll = false) {
  if (!workTabs.length || !workPanels.length) return;

  const nextId = [...workPanels].some((panel) => panel.dataset.workPanel === panelId) ? panelId : "ai-projects";

  workTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.workTab === nextId);
  });

  workPanels.forEach((panel) => {
    const isActive = panel.dataset.workPanel === nextId;
    panel.classList.toggle("is-active", isActive);
    if (isActive) {
      hydrateMedia(panel);
      panel.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
      if (shouldScroll) panel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  });
}

if (workTabs.length && workPanels.length) {
  workTabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      const panelId = tab.dataset.workTab;
      history.replaceState(null, "", `#${panelId}`);
      showWorkPanel(panelId, true);
    });
  });

  const initialWorkPanel = location.hash ? location.hash.slice(1) : "ai-projects";
  showWorkPanel(initialWorkPanel, false);

  window.addEventListener("hashchange", () => {
    showWorkPanel(location.hash.slice(1), false);
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

let pointerX = 0;
let pointerY = 0;
let currentX = 0;
let currentY = 0;
let rafId = null;
let pointerIdleFrames = 0;

function animatePointer() {
  currentX += (pointerX - currentX) * 0.08;
  currentY += (pointerY - currentY) * 0.08;
  root.style.setProperty("--mx", currentX.toFixed(4));
  root.style.setProperty("--my", currentY.toFixed(4));

  if (Math.abs(pointerX - currentX) < 0.001 && Math.abs(pointerY - currentY) < 0.001) {
    pointerIdleFrames += 1;
  } else {
    pointerIdleFrames = 0;
  }

  if (pointerIdleFrames > 18) {
    rafId = null;
    pointerIdleFrames = 0;
    return;
  }

  rafId = requestAnimationFrame(animatePointer);
}

if (!reduceMotion && (document.querySelector(".hero") || document.querySelector(".page-shell") || document.querySelector(".works-shell"))) {
  window.addEventListener("pointermove", (event) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    pointerIdleFrames = 0;
    if (!rafId) rafId = requestAnimationFrame(animatePointer);
  }, { passive: true });
}

if (!reduceMotion && document.querySelector(".detail-hero img")) {
  const updateScrollShift = () => {
    root.style.setProperty("--scroll-shift", Math.min(window.scrollY * 0.12, 90).toFixed(2));
  };
  updateScrollShift();
  window.addEventListener("scroll", updateScrollShift, { passive: true });
}

observeAmbientVideos([...document.querySelectorAll(".exhibition-grid video, .gallery-waterfall video")]);

document.querySelectorAll(".gallery-strip").forEach((strip) => {
  let wheelRaf = 0;
  let wheelDelta = 0;
  let dragStartX = 0;
  let dragStartScroll = 0;

  const scrollbar = document.createElement("div");
  scrollbar.className = "gallery-scrollbar";
  scrollbar.setAttribute("role", "scrollbar");
  scrollbar.setAttribute("aria-label", `${strip.getAttribute("aria-label") || "Gallery"} scroll`);
  scrollbar.setAttribute("aria-orientation", "horizontal");
  scrollbar.innerHTML = '<span class="gallery-scrollbar-track"></span><span class="gallery-scrollbar-thumb"></span>';
  strip.parentElement.insertBefore(scrollbar, strip);

  const thumb = scrollbar.querySelector(".gallery-scrollbar-thumb");

  const getMaxScroll = () => Math.max(0, strip.scrollWidth - strip.clientWidth);
  const getMaxThumbX = () => Math.max(0, scrollbar.clientWidth - thumb.offsetWidth);

  const syncScrollbar = () => {
    const maxScroll = getMaxScroll();
    const maxThumbX = getMaxThumbX();
    const progress = maxScroll ? strip.scrollLeft / maxScroll : 0;

    scrollbar.classList.toggle("is-hidden", maxScroll <= 1);
    scrollbar.style.setProperty("--thumb-x", `${Math.min(maxThumbX, Math.max(0, progress * maxThumbX)).toFixed(2)}px`);
    scrollbar.setAttribute("aria-valuemin", "0");
    scrollbar.setAttribute("aria-valuemax", String(Math.round(maxScroll)));
    scrollbar.setAttribute("aria-valuenow", String(Math.round(strip.scrollLeft)));
  };

  const scrollToPointer = (clientX) => {
    const rect = scrollbar.getBoundingClientRect();
    const maxThumbX = getMaxThumbX();
    const rawX = clientX - rect.left - thumb.offsetWidth / 2;
    const thumbX = Math.min(maxThumbX, Math.max(0, rawX));
    const progress = maxThumbX ? thumbX / maxThumbX : 0;
    strip.scrollLeft = progress * getMaxScroll();
  };

  scrollbar.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    scrollbar.setPointerCapture(event.pointerId);
    dragStartX = event.clientX;
    dragStartScroll = strip.scrollLeft;

    if (!event.target.closest(".gallery-scrollbar-thumb")) {
      scrollToPointer(event.clientX);
      dragStartScroll = strip.scrollLeft;
    }
  });

  scrollbar.addEventListener("pointermove", (event) => {
    if (!scrollbar.hasPointerCapture(event.pointerId)) return;

    const maxThumbX = getMaxThumbX();
    const maxScroll = getMaxScroll();
    const scrollPerPixel = maxThumbX ? maxScroll / maxThumbX : 0;
    strip.scrollLeft = dragStartScroll + (event.clientX - dragStartX) * scrollPerPixel;
  });

  scrollbar.addEventListener("pointerup", (event) => {
    if (scrollbar.hasPointerCapture(event.pointerId)) scrollbar.releasePointerCapture(event.pointerId);
  });

  scrollbar.addEventListener("pointercancel", (event) => {
    if (scrollbar.hasPointerCapture(event.pointerId)) scrollbar.releasePointerCapture(event.pointerId);
  });

  strip.addEventListener("scroll", syncScrollbar, { passive: true });

  strip.addEventListener("wheel", (event) => {
    const verticalItem = event.target.closest(".gallery-strip-item.is-collapsible");
    if (verticalItem) {
      const canScrollY = verticalItem.scrollHeight > verticalItem.clientHeight;
      const atTop = verticalItem.scrollTop <= 0;
      const atBottom = Math.ceil(verticalItem.scrollTop + verticalItem.clientHeight) >= verticalItem.scrollHeight - 1;
      const wantsUp = event.deltaY < 0;
      const wantsDown = event.deltaY > 0;

      if (canScrollY && !((atTop && wantsUp) || (atBottom && wantsDown))) return;
    }

    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    const canScroll = strip.scrollWidth > strip.clientWidth;
    if (!canScroll) return;

    const atStart = strip.scrollLeft <= 0;
    const atEnd = Math.ceil(strip.scrollLeft + strip.clientWidth) >= strip.scrollWidth - 1;
    const wantsPrev = event.deltaY < 0;
    const wantsNext = event.deltaY > 0;

    if ((atStart && wantsPrev) || (atEnd && wantsNext)) return;

    event.preventDefault();
    wheelDelta += event.deltaY * 1.15;

    if (wheelRaf) return;
    wheelRaf = requestAnimationFrame(() => {
      strip.scrollLeft += wheelDelta;
      wheelDelta = 0;
      wheelRaf = 0;
    });
  }, { passive: false });

  strip.querySelectorAll("img, video").forEach((media) => {
    media.addEventListener("load", syncScrollbar, { once: true });
    media.addEventListener("loadedmetadata", syncScrollbar, { once: true });
  });

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(syncScrollbar);
    resizeObserver.observe(strip);
  } else {
    window.addEventListener("resize", syncScrollbar, { passive: true });
  }

  syncScrollbar();
});

function initPortfolioPet() {
  if (document.querySelector(".yoyo-pet") || body.classList.contains("is-project-modal")) return;

  const pet = document.createElement("aside");
  pet.className = "yoyo-pet";
  pet.setAttribute("aria-label", "Yoyo desktop pet");
  pet.innerHTML = `
    <button class="yoyo-pet-button" type="button" aria-label="Yoyo">
      <span class="yoyo-bubble" aria-hidden="true">Yoyo</span>
      <span class="yoyo-stage" aria-hidden="true">
        <span class="yoyo-shadow"></span>
        <span class="yoyo-keyboard">
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
        </span>
        <span class="yoyo-arm yoyo-arm-left"><span class="yoyo-paw"></span></span>
        <span class="yoyo-arm yoyo-arm-right"><span class="yoyo-paw"></span></span>
        <span class="yoyo-body">
          <span class="yoyo-ear yoyo-ear-left"></span>
          <span class="yoyo-ear yoyo-ear-right"></span>
          <span class="yoyo-antenna"></span>
          <span class="yoyo-face">
            <span class="yoyo-eye yoyo-eye-left"><span></span></span>
            <span class="yoyo-eye yoyo-eye-right"><span></span></span>
            <span class="yoyo-mouth"></span>
            <span class="yoyo-cheek yoyo-cheek-left"></span>
            <span class="yoyo-cheek yoyo-cheek-right"></span>
          </span>
          <span class="yoyo-badge"></span>
        </span>
      </span>
    </button>
  `;
  document.body.appendChild(pet);

  const button = pet.querySelector(".yoyo-pet-button");
  let typingTimer = 0;
  let winkTimer = 0;
  let petRect = null;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const updatePetPointer = (event) => {
    petRect = petRect || pet.getBoundingClientRect();
    const centerX = petRect.left + petRect.width / 2;
    const centerY = petRect.top + petRect.height / 2;
    const dx = clamp((event.clientX - centerX) / Math.max(window.innerWidth * 0.18, 120), -1, 1);
    const dy = clamp((event.clientY - centerY) / Math.max(window.innerHeight * 0.18, 120), -1, 1);
    pet.style.setProperty("--pet-x", dx.toFixed(3));
    pet.style.setProperty("--pet-y", dy.toFixed(3));
  };

  const markTyping = () => {
    pet.classList.add("is-typing");
    window.clearTimeout(typingTimer);
    typingTimer = window.setTimeout(() => {
      pet.classList.remove("is-typing");
    }, 620);
  };

  const wink = () => {
    pet.classList.add("is-winking");
    window.clearTimeout(winkTimer);
    winkTimer = window.setTimeout(() => {
      pet.classList.remove("is-winking");
    }, 540);
  };

  if (!reduceMotion) {
    window.addEventListener("pointermove", updatePetPointer, { passive: true });
    window.addEventListener("resize", () => {
      petRect = null;
    }, { passive: true });
    window.addEventListener("scroll", () => {
      petRect = null;
    }, { passive: true });
    window.addEventListener("keydown", markTyping);
    button.addEventListener("pointerenter", wink);
    button.addEventListener("click", () => {
      pet.classList.add("is-happy");
      wink();
      window.setTimeout(() => pet.classList.remove("is-happy"), 900);
    });
  }
}
