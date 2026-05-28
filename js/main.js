(function () {
  const config = window.PORTFOLIO_CONFIG;
  const projects = window.PORTFOLIO_PROJECTS;
  const techStack = window.PORTFOLIO_TECH_STACK;

  if (!config) return;

  initTheme();
  populateHero();
  renderStats();
  renderFeaturedProjects();
  renderOtherProjects();
  renderTechStack();
  renderSkills();
  renderContact();
  initTypingEffect();
  initClock();
  initParticles();
  initScrollAnimations();
  initActiveNav();
  initFloatingProfile();

  function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    function updateLabel(theme) {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }

    updateLabel(document.documentElement.dataset.theme || "light");

    toggle.addEventListener("click", () => {
      const next =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
      updateLabel(next);
    });
  }

  function populateHero() {
    document.getElementById("site-name").textContent = config.name;
    document.getElementById("site-tagline").textContent = config.tagline;
    document.getElementById("site-location").textContent = config.location;
    document.title = `${config.name} · Developer Portfolio`;

    const aboutEl = document.getElementById("about-text");
    if (aboutEl && config.about) {
      aboutEl.textContent = config.about;
    }

    const photoEl = document.getElementById("profile-photo");
    if (photoEl && config.profilePhoto) {
      photoEl.src = config.profilePhoto;
    }

    const profileLinks = document.getElementById("profile-links");
    const profileLinkKeys = ["github", "linkedin", "scholar"];
    profileLinkKeys.forEach((key) => {
      const link = config.links[key];
      if (!link || !profileLinks) return;

      const anchor = document.createElement("a");
      anchor.className = "profile-link";
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.title = link.label;
      anchor.textContent = link.label;
      profileLinks.appendChild(anchor);
    });

    const cta = document.getElementById("hero-cta");
    const ctaKeys = config.heroCta || ["github", "scholar", "email"];

    ctaKeys.forEach((key, index) => {
      const link = config.links[key];
      if (!link) return;

      const btn = document.createElement("a");
      btn.className = index === 0 ? "btn btn--primary" : "btn btn--ghost";
      btn.href = link.url;
      btn.target = key === "email" ? "_self" : "_blank";
      btn.rel = key === "email" ? "" : "noopener noreferrer";
      btn.textContent = link.label;
      cta.appendChild(btn);
    });
  }

  function renderStats() {
    const grid = document.getElementById("stats-grid");
    const stackCount = techStack.reduce((sum, row) => sum + row.length, 0);
    const stats = [
      { value: config.stats.featuredProjects, label: "Featured projects" },
      { value: stackCount, label: "Technologies" },
      { value: config.stats.githubRepos, label: "GitHub repos" },
    ];

    stats.forEach((stat) => {
      const card = document.createElement("div");
      card.className = "stat-card";
      card.innerHTML = `
        <span class="stat-value" data-target="${stat.value}">0</span>
        <span class="stat-label">${stat.label}</span>
      `;
      grid.appendChild(card);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-target]").forEach((el) => {
              animateCount(el, Number(el.dataset.target));
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(grid);
  }

  function renderFeaturedProjects() {
    const grid = document.getElementById("featured-projects");

    projects.featured.forEach((project) => {
      const card = document.createElement("a");
      card.className = "project-card";
      card.href = project.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      const stars =
        project.stars > 0
          ? `<span class="project-card-stars">${project.stars}</span>`
          : "";

      card.innerHTML = `
        <div class="project-card-header">
          <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
          ${stars}
        </div>
        <p class="project-card-desc">${escapeHtml(project.description)}</p>
        <div class="project-tags">
          ${project.languages.map((lang) => `<span class="tag">${escapeHtml(lang)}</span>`).join("")}
        </div>
      `;

      grid.appendChild(card);
    });
  }

  function renderOtherProjects() {
    const grid = document.getElementById("other-projects");

    projects.other.forEach((repo) => {
      const card = document.createElement("a");
      card.className = "repo-card";
      card.href = repo.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      const stars = repo.stars > 0 ? `<span>${repo.stars} ★</span>` : "";

      card.innerHTML = `
        <span class="repo-card-name">${escapeHtml(repo.name)}</span>
        <span class="repo-card-desc">${escapeHtml(repo.description)}</span>
        <span class="repo-card-meta">
          <span>${escapeHtml(repo.language)}</span>
          ${stars}
        </span>
      `;

      grid.appendChild(card);
    });
  }

  function renderTechStack() {
    const container = document.getElementById("tech-stack");
    if (!container || !techStack?.length) return;

    const pyramid = document.createElement("div");
    pyramid.className = "tech-stack-pyramid";
    pyramid.setAttribute("role", "list");

    techStack.forEach((row) => {
      const rowEl = document.createElement("div");
      rowEl.className = "tech-stack-row";
      rowEl.setAttribute("role", "listitem");

      row.forEach((tech) => {
        const tile = document.createElement("div");
        tile.className = "tech-icon";
        tile.setAttribute("role", "img");
        tile.setAttribute("aria-label", tech.name);
        tile.tabIndex = 0;

        const label = document.createElement("span");
        label.className = "tech-icon-label";
        label.textContent = tech.name;
        tile.appendChild(label);

        if (tech.icon) {
          const img = document.createElement("img");
          img.src = `https://cdn.simpleicons.org/${encodeURIComponent(tech.icon)}`;
          img.alt = "";
          img.loading = "lazy";
          img.decoding = "async";
          img.addEventListener("error", () => {
            img.remove();
            tile.insertBefore(createTechFallback(tech), label);
          });
          tile.appendChild(img);
        } else {
          tile.appendChild(createTechFallback(tech));
        }

        rowEl.appendChild(tile);
      });

      pyramid.appendChild(rowEl);
    });

    container.appendChild(pyramid);
  }

  function createTechFallback(tech) {
    const fallback = document.createElement("span");
    fallback.className = "tech-icon-fallback";
    fallback.textContent = tech.abbr || tech.name.charAt(0);
    return fallback;
  }

  function renderSkills() {
    const grid = document.getElementById("skills-grid");

    config.skills.forEach((group) => {
      const el = document.createElement("div");
      el.className = "skill-group";
      el.innerHTML = `
        <h3 class="skill-category">${escapeHtml(group.category)}</h3>
        <div class="skill-pills">
          ${group.items.map((item) => `<span class="skill-pill">${escapeHtml(item)}</span>`).join("")}
        </div>
      `;
      grid.appendChild(el);
    });
  }

  function renderContact() {
    const grid = document.getElementById("contact-grid");

    Object.entries(config.links).forEach(([key, link]) => {
      const card = document.createElement("a");
      card.className = "contact-card";
      card.href = link.url;
      card.target = key === "email" ? "_self" : "_blank";
      card.rel = key === "email" ? "" : "noopener noreferrer";
      card.innerHTML = `
        <span class="contact-card-label">${escapeHtml(link.label)}</span>
        <span class="contact-card-desc">${escapeHtml(link.description)}</span>
      `;
      grid.appendChild(card);
    });
  }

  function animateCount(element, target) {
    if (!element) return;
    const duration = 900;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function initTypingEffect() {
    const el = document.getElementById("typing-text");
    const roles = config.typingRoles;
    if (!el || !roles.length) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];
      const displayed = deleting
        ? current.slice(0, charIndex--)
        : current.slice(0, charIndex++);

      el.textContent = displayed;

      let delay = deleting ? 35 : 55;

      if (!deleting && charIndex === current.length + 1) {
        deleting = true;
        delay = 1800;
        charIndex = current.length;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }

      setTimeout(tick, delay);
    }

    tick();
  }

  function initClock() {
    const el = document.getElementById("local-time");
    if (!el) return;

    function update() {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: config.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      el.textContent = `${formatter.format(new Date())} · ${config.location.split(",")[0]}`;
    }

    update();
    setInterval(update, 30_000);
  }

  function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = Array.from({ length: Math.min(48, Math.floor(width / 28)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const color =
        getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() ||
        "#2dd4bf";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.18;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
  }

  function initScrollAnimations() {
    const sections = document.querySelectorAll(".section");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      sections.forEach((s) => s.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initActiveNav() {
    const navLinks = document.querySelectorAll(".nav-dock-link");
    const sections = document.querySelectorAll("section[id], main .page-content > section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((section) => {
      if (section.id) observer.observe(section);
    });
  }

  function initFloatingProfile() {
    const card = document.querySelector(".profile-card");
    const sidebar = document.querySelector(".profile-sidebar");
    const layout = document.querySelector(".page-layout");
    if (!card || !sidebar || !layout) return;

    const desktop = window.matchMedia("(min-width: 769px)");
    let ticking = false;

    function resetCardPosition() {
      card.style.position = "";
      card.style.top = "";
      card.style.left = "";
      card.style.width = "";
      card.classList.remove("is-floating");
    }

    function update() {
      ticking = false;

      if (!desktop.matches) {
        resetCardPosition();
        return;
      }

      const sidebarRect = sidebar.getBoundingClientRect();
      const layoutRect = layout.getBoundingClientRect();
      const navHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-height")
      );
      const offset = 20;
      const preferredTop = navHeight + offset;
      const cardHeight = card.offsetHeight;
      const maxTop = layoutRect.bottom - cardHeight - offset;

      card.style.position = "fixed";
      card.style.left = `${sidebarRect.left}px`;
      card.style.width = `${sidebarRect.width}px`;
      card.style.top = `${Math.min(preferredTop, Math.max(preferredTop, maxTop))}px`;
      card.classList.toggle("is-floating", window.scrollY > 80);
    }

    function scheduleUpdate() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    desktop.addEventListener("change", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
