(function () {
  const config = window.PORTFOLIO_CONFIG;
  const projects = window.PORTFOLIO_PROJECTS;
  const techStack = window.PORTFOLIO_TECH_STACK;

  const CONTACT_KEYS = ["email", "github", "linkedin", "scholar"];
  let originalTitle = document.title;

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function formatContactUrl(key, url) {
    if (key === "email") {
      return url.replace(/^mailto:/, "");
    }
    return url.replace(/^https?:\/\//, "");
  }

  function buildContactList() {
    return CONTACT_KEYS.map((key) => {
      const link = config.links[key];
      if (!link) return "";

      const display = formatContactUrl(key, link.url);
      return `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}: ${escapeHtml(display)}</a></li>`;
    })
      .filter(Boolean)
      .join("");
  }

  function buildSkillsList() {
    return config.skills
      .map(
        (group) => `
        <li class="resume-print-skill-group">
          <p class="resume-print-skill-category">${escapeHtml(group.category)}</p>
          <p class="resume-print-skill-items">${group.items.map((item) => escapeHtml(item)).join(", ")}</p>
        </li>
      `
      )
      .join("");
  }

  function buildProjectsList() {
    return projects.featured
      .map(
        (project) => `
        <li class="resume-print-project">
          <h3 class="resume-print-project-title">${escapeHtml(project.title)}</h3>
          <p class="resume-print-project-desc">${escapeHtml(project.description)}</p>
          <p class="resume-print-project-tech">${project.languages.map((lang) => escapeHtml(lang)).join(" · ")}</p>
          <p class="resume-print-project-url">${escapeHtml(project.url.replace(/^https?:\/\//, ""))}</p>
        </li>
      `
      )
      .join("");
  }

  function buildTechStackList() {
    if (!techStack?.length) return "";

    const names = [];
    const seen = new Set();

    techStack.flat().forEach((tech) => {
      if (seen.has(tech.name)) return;
      seen.add(tech.name);
      names.push(tech.name);
    });

    return names.map((name) => escapeHtml(name)).join(" · ");
  }

  function buildResumePrint() {
    const container = document.getElementById("resume-print");
    if (!container || !config) return;

    container.innerHTML = `
      <article class="resume-print-inner">
        <header class="resume-print-header">
          <h1 class="resume-print-name">${escapeHtml(config.name)}</h1>
          <p class="resume-print-tagline">${escapeHtml(config.tagline)}</p>
          <p class="resume-print-location">${escapeHtml(config.location)}</p>
          <ul class="resume-print-contact">${buildContactList()}</ul>
        </header>

        <section class="resume-print-section">
          <h2 class="resume-print-section-title">Summary</h2>
          <p class="resume-print-summary">${escapeHtml(config.about)}</p>
        </section>

        <section class="resume-print-section">
          <h2 class="resume-print-section-title">Skills</h2>
          <ul class="resume-print-skills">${buildSkillsList()}</ul>
        </section>

        <section class="resume-print-section">
          <h2 class="resume-print-section-title">Selected Projects</h2>
          <ul class="resume-print-projects">${buildProjectsList()}</ul>
        </section>

        <section class="resume-print-section">
          <h2 class="resume-print-section-title">Tech Stack</h2>
          <p class="resume-print-stack">${buildTechStackList()}</p>
        </section>
      </article>
    `;
  }

  function initPdfExport() {
    const button = document.getElementById("pdf-export-btn");
    if (!button || !config) return;

    originalTitle = document.title;

    button.addEventListener("click", () => {
      buildResumePrint();
      document.title = `${config.name} — Developer Portfolio`;

      window.addEventListener(
        "afterprint",
        () => {
          document.title = originalTitle;
        },
        { once: true }
      );

      window.print();
    });
  }

  window.initPdfExport = initPdfExport;
  initPdfExport();
})();
