(function () {
  const config = window.PORTFOLIO_CONFIG;
  const projects = window.PORTFOLIO_PROJECTS;
  const tools = window.PORTFOLIO_TOOLS;

  if (!config) return;

  populateHero();
  renderStats();
  renderAbout();
  renderFeaturedProjects();
  renderOtherProjects();
  renderTools();
  renderSkills();
  renderContact();
  initTypingEffect();
  initClock();
  initParticles();
  initScrollAnimations();
  initNav();
  initActiveNav();

  function populateHero() {
    document.getElementById("site-name").textContent = config.name;
    document.getElementById("site-tagline").textContent = config.tagline;
    document.getElementById("site-location").textContent = config.location;
    document.title = `${config.name} · Developer Portfolio`;

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
    const toolCount = tools.reduce((sum, group) => sum + group.items.length, 0);
    const stats = [
      { value: config.stats.featuredProjects, label: "Featured projects" },
      { value: toolCount, label: "Tools & platforms" },
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

  function renderAbout() {
    const container = document.getElementById("about-content");
    config.about.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      container.appendChild(p);
    });
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

  function renderTools() {
    const grid = document.getElementById("tools-grid");

    tools.forEach((group) => {
      const section = document.createElement("div");
      section.className = "tools-group";

      const cards = group.items
        .map((tool) => {
          const tag = tool.url ? "a" : "div";
          const href = tool.url
            ? ` href="${escapeHtml(tool.url)}" target="_blank" rel="noopener noreferrer"`
            : "";
          const initial = escapeHtml(tool.name.charAt(0));

          return `
            <${tag} class="tool-card"${href}>
              <span class="tool-icon" aria-hidden="true">${initial}</span>
              <div class="tool-body">
                <span class="tool-name">${escapeHtml(tool.name)}</span>
                <span class="tool-desc">${escapeHtml(tool.description)}</span>
              </div>
            </${tag}>
          `;
        })
        .join("");

      section.innerHTML = `
        <h3 class="tools-category">${escapeHtml(group.category)}</h3>
        <div class="tools-cards">${cards}</div>
      `;

      grid.appendChild(section);
    });
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

  function initNav() {
    const toggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    toggle?.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      navLinks?.classList.toggle("open");
    });

    navLinks?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle?.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("open");
      });
    });
  }

  function initActiveNav() {
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id], main > section");

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

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
