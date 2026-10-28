import { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "belajarproperti-platform",
    title: "BelajarProperti.co.id — Property Learning Platform",
    category: "web",
    year: 2025,
    summary:
      "Platform web untuk mendukung pemasaran properti dan penyelenggaraan program pelatihan digital.",
    role: "Full Stack Web Developer & SEO Specialist",
    problem:
      "Diperlukan platform terpusat untuk mendukung pengelolaan pemasaran properti, pendaftaran pelatihan, dan visibilitas pencarian.",
    outcome:
      "Mengembangkan aplikasi web menyeluruh dengan REST API, basis data MySQL, dan optimasi Core Web Vitals.",
    tech: [
      "Laravel",
      "PHP",
      "MySQL",
      "REST API",
      "Tailwind CSS",
      "On-Page SEO",
      "Core Web Vitals",
    ],
    thumbnail: "/images/projects/belajarproperti.jpg",
    thumbnailAlt: "BelajarProperti platform interface",
    featured: true,
  },
  {
    slug: "griyaone-realty",
    title: "GriyaOne.id — Real Estate Platform",
    category: "web",
    year: 2025,
    summary:
      "Situs listing dan direktori properti dengan fitur pencarian yang responsif.",
    role: "Full Stack Developer",
    problem:
      "Pengguna memerlukan proses pencarian listing yang cepat dan navigasi yang mudah digunakan pada perangkat mobile.",
    outcome:
      "Membangun platform properti responsif dengan pengindeksan SEO dan fitur penyaringan listing.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "REST API", "SEO"],
    thumbnail: "/images/projects/griyaone.jpg",
    thumbnailAlt: "GriyaOne.id platform",
    featured: true,
  },
  {
    slug: "brighton-seo-automation",
    title: "Brighton Real Estate — SEO Data Automation",
    category: "seo",
    year: 2024,
    summary:
      "Otomasi Python untuk pengumpulan data web, analisis hasil pencarian, pemeriksaan metadata, dan identifikasi keyword cannibalization.",
    role: "SEO Specialist & Automation Developer",
    problem:
      "Audit SEO dan analisis kompetitor untuk listing dalam jumlah besar memerlukan proses yang lebih efisien.",
    outcome:
      "Mengembangkan otomasi Python untuk pengumpulan dan pengolahan data guna mendukung audit SEO on-page dan analisis keyword cannibalization.",
    tech: [
      "Python",
      "Google Search Console",
      "Google Analytics",
      "Ahrefs",
      "Semrush",
      "Web Scraping", 
    ],
    thumbnail: "/images/projects/BrightonRealEstate.jpg",
    thumbnailAlt: "SEO Analytics Dashboard showing performance metrics",
    featured: true,
  },
  {
    slug: "flexwing-gamification",
    title: "Flexwing — CSS Flexbox Learning Platform",
    category: "edtech",
    year: 2024,
    summary:
      "Platform pembelajaran interaktif berbasis gamifikasi untuk materi CSS Flexbox.",
    role: "Lead Researcher & Developer",
    problem:
      "Materi CSS Flexbox membutuhkan pendekatan pembelajaran yang lebih interaktif dan mudah dipahami.",
    outcome:
      "Penelitian dan pengembangan platform dipublikasikan dalam prosiding konferensi IEEE.",
    tech: [
      "JavaScript",
      "HTML5",
      "CSS3 Flexbox",
      "Gamification Design",
      "IEEE Research",
    ],
    thumbnail: "/images/projects/flexwing.jpg",
    thumbnailAlt: "Flexwing Gamification CSS Interface",
    featured: true,
  },
  {
    slug: "bangkit-android-native",
    title: "Bangkit Academy — Android Smart Application",
    category: "mobile",
    year: 2024,
    summary:
      "Aplikasi Android native yang dikembangkan secara kolaboratif dengan integrasi machine learning dan cloud computing.",
    role: "Android Mobile Developer (Bangkit Cohort Batch 2)",
    problem:
      "Mengintegrasikan inferensi model machine learning berbasis cloud ke dalam aplikasi Android.",
    outcome:
      "Mengembangkan aplikasi Android menggunakan Kotlin, arsitektur MVVM, Kotlin Coroutines, dan Firebase.",
    tech: [
      "Android Studio",
      "Kotlin",
      "Firebase",
      "MVVM",
      "REST API",
      "Coroutines",
    ],
    thumbnail: "/images/projects/bangkit.png",
    thumbnailAlt: "Android Mobile App Interface",
    featured: true,
  },
  {
    slug: "topic-modeling-lda",
    title: "LDA Topic Modeling — Public Opinion Analysis",
    category: "ai",
    year: 2025,
    summary:
      "Analisis persepsi publik dari komentar YouTube menggunakan NLP dan Latent Dirichlet Allocation (LDA).",
    role: "Researcher & Data Analyst",
    problem:
      "Volume komentar publik yang besar memerlukan metode terstruktur untuk mengidentifikasi topik pembahasan.",
    outcome:
      "Mengembangkan alur ekstraksi data, prapemrosesan teks, dan pemodelan topik yang dipublikasikan dalam jurnal nasional terakreditasi SINTA 4.",
    tech: [
      "Python",
      "NLP",
      "LDA Topic Modeling",
      "YouTube API",
      "Data Processing",
    ],
    thumbnail: "/images/projects/LDATopicModeling.jpg",
    thumbnailAlt: "Topic Modeling and Data Extraction Dashboard",
    featured: true,
  },
];
