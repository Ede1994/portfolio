/**
 * Portfolio site configuration — edit this file to personalize your site.
 */
window.PORTFOLIO_CONFIG = {
  name: "Eric Einspänner",
  tagline: "Medical physicist · Clinical AI · Neuroimaging",
  location: "Magdeburg, Germany",
  timezone: "Europe/Berlin",

  about: [
    "I'm a medical physicist and PhD researcher at the University Clinic for Neuroradiology in Magdeburg, working on clinical AI, ultra-high-field MRI, and quantitative biomarker analysis at Research Campus STIMULATE.",
    "Alongside research, I build software — from full-stack clinical AI platforms and medical education tools to mobile apps and research group websites. I care about code that is useful in real clinical and scientific workflows.",
  ],

  stats: {
    featuredProjects: 6,
    publications: 10,
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
      items: ["Python", "TypeScript", "JavaScript", "SQL", "MATLAB"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Angular", "Tailwind CSS", "React Native", "Expo"],
    },
    {
      category: "Backend & AI",
      items: ["FastAPI", "OpenAI API", "Claude", "RAG", "PyTorch", "scikit-learn"],
    },
    {
      category: "Medical Imaging",
      items: ["DICOM", "7T MRI", "PET/MR", "XNAT", "Image Segmentation", "Biomarkers"],
    },
    {
      category: "Tools",
      items: ["Git", "Docker", "Supabase", "Qdrant", "Jupyter", "GitHub Actions"],
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
