/**
 * Portfolio site configuration — edit this file to personalize your site.
 */
window.PORTFOLIO_CONFIG = {
  name: "Eric Einspänner",
  tagline: "Medical physicist · Clinical AI · Neuroimaging",
  location: "Magdeburg, Germany",
  timezone: "Europe/Berlin",

  about:
    "Medical physicist who builds software for clinical AI and medical data — from neuroimaging pipelines to full-stack platforms.",
  profilePhoto: "assets/profile.jpg",

  stats: {
    featuredProjects: 6,
    githubRepos: 24,
  },

  typingRoles: [
    "Building clinical AI platforms",
    "7T MRI & biomarker analysis",
    "Full-stack medical software",
    "Deep learning for neuroimaging",
  ],

  skills: [
    {
      category: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "C++", "Bash", "SQL", "MATLAB"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Angular", "HTML", "CSS", "Tailwind CSS", "React Native", "Expo"],
    },
    {
      category: "Backend & AI",
      items: ["FastAPI", "Flask", "Node.js", "PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "Hugging Face", "LangChain", "Claude Code", "Codex", "n8n", "RAG"],
    },
    {
      category: "Data & Databases",
      items: ["NumPy", "Pandas", "PostgreSQL", "Supabase", "MySQL", "MongoDB", "Redis"],
    },
    {
      category: "Medical Imaging",
      items: ["DICOM", "7T MRI", "PET/MR", "XNAT", "Image Segmentation", "Biomarkers"],
    },
    {
      category: "Infrastructure & Systems",
      items: ["Docker", "Podman", "Proxmox", "Linux", "macOS", "Windows", "Azure", "GitHub Actions"],
    },
    {
      category: "Productivity",
      items: ["LaTeX", "MS Office", "Jupyter", "Figma", "Postman", "VS Code", "Cursor"],
    },
  ],

  links: {
    github: {
      label: "GitHub",
      url: "https://github.com/Ede1994",
      description: "Code & open source",
    },
    scholar: {
      label: "Google Scholar",
      url: "https://scholar.google.de/citations?user=pBNy9LwAAAAJ&hl=en",
      description: "Publications & citations",
    },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/eric-einsp%C3%A4nner-82a049185/",
      description: "Professional profile",
    },
    employer: {
      label: "STIMULATE",
      url: "https://www.stimulate.ovgu.de/",
      description: "Research Campus · OVGU Magdeburg",
    },
    clinic: {
      label: "Neuroradiology",
      url: "https://knrad.med.ovgu.de/Team/Eric+Einsp%C3%A4nner.html",
      description: "University Clinic profile",
    },
    email: {
      label: "Email",
      url: "mailto:eric.einspaenner@med.ovgu.de",
      description: "eric.einspaenner@med.ovgu.de",
    },
  },

  heroCta: ["github", "scholar", "email"],
};
