import { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "belajarproperti-platform",
    title: "BelajarProperti.co.id — Property Training & Marketing",
    category: "web",
    year: 2025,
    summary:
      "Platform web terintegrasi untuk pemasaran properti dan program pelatihan digital dengan sistem manajemen konten andal.",
    role: "Full Stack Web Developer & SEO",
    problem:
      "Kebutuhan platform terpusat untuk mengelola leads properti, pendaftaran pelatihan, dan performa SEO yang optimal di Google.",
    outcome:
      "Aplikasi web end-to-end dengan REST API, arsitektur database MySQL yang efisien, dan optimasi Core Web Vitals untuk konversi tinggi.",
    tech: [
      "Laravel",
      "PHP",
      "MySQL",
      "REST API",
      "Tailwind CSS",
      "On-Page SEO",
      "Core Web Vitals",
    ],
    thumbnail: "/images/projects/eventnesia.png",
    thumbnailAlt: "Eventnesia platform interface",
    featured: true,
  },
  {
    slug: "griyaone-realty",
    title: "GriyaOne.id — Digital Real Estate Solution",
    category: "web",
    year: 2025,
    summary:
      "Website listing dan direktori real estate modern dengan pengalaman pencarian properti yang cepat dan responsif.",
    role: "Full Stack Developer",
    problem:
      "Pencarian listing properti membutuhkan kecepatan loading instan dan navigasi antarmuka yang ramah pengguna di perangkat mobile.",
    outcome:
      "Platform properti dengan arsitektur responsif, indexing SEO otomatis, dan sistem filtering data interaktif.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "REST API", "SEO"],
    thumbnail: "/images/projects/moled.png",
    thumbnailAlt: "MOLED Smart Monitoring System interface",
    featured: true,
  },
  {
    slug: "brighton-seo-automation",
    title: "Brighton Real Estate — Automated SEO & SERP Engine",
    category: "seo",
    year: 2024,
    summary:
      "Pipeline otomasi berbasis Python untuk web scraping, analisis ranking SERP, metadata, dan deteksi keyword cannibalization.",
    role: "SEO Specialist & Automation Developer",
    problem:
      "Ribuan listing properti memerlukan audit SEO berkala dan analisis kompetitor yang memakan waktu jika dilakukan secara manual.",
    outcome:
      "Otomasi scraping dan data processing Python yang mempercepat diagnosis keyword cannibalization dan audit on-page SEO.",
    tech: [
      "Python",
      "Google Search Console",
      "Google Analytics",
      "Ahrefs",
      "Semrush",
      "Web Scraping",
    ],
    thumbnail: "",
    thumbnailAlt: "SEO Analytics Dashboard showing performance metrics",
    featured: true,
  },
  {
    slug: "flexwing-gamification",
    title: "Flexwing — Gamified CSS Learning (IEEE Published)",
    category: "edtech",
    year: 2024,
    summary:
      "Platform gamifikasi edukasi interaktif untuk meningkatkan motivasi dan pemahaman siswa dalam mempelajari CSS Flexbox.",
    role: "Lead Researcher & Developer",
    problem:
      "Siswa kejuruan sering kesulitan memahami konsep layout CSS Flexbox dengan metode pembelajaran konvensional.",
    outcome:
      "Hasil riset dan implementasi platform gamifikasi berhasil dipublikasikan di IEEE serta meningkatkan retensi belajar siswa secara signifikan.",
    tech: [
      "JavaScript",
      "HTML5",
      "CSS3 Flexbox",
      "Gamification Design",
      "IEEE Research",
    ],
    thumbnail: "",
    thumbnailAlt: "Flexwing Gamification CSS Interface",
    featured: true,
  },
  {
    slug: "bangkit-android-native",
    title: "Bangkit Academy — Android Smart Application",
    category: "mobile",
    year: 2024,
    summary:
      "Aplikasi Android native kolaboratif yang mengintegrasikan model Machine Learning dan arsitektur Cloud Computing.",
    role: "Android Mobile Developer (Bangkit Cohort Batch 2)",
    problem:
      "Membangun aplikasi mobile cerdas yang menghubungkan inferensi model ML di cloud dengan pengalaman pengguna mobile yang mulus.",
    outcome:
      "Aplikasi Android tangguh dengan arsitektur MVVM, Kotlin Coroutines, dan integrasi backend Firebase.",
    tech: [
      "Android Studio",
      "Kotlin",
      "Firebase",
      "MVVM",
      "REST API",
      "Coroutines",
    ],
    thumbnail: "",
    thumbnailAlt: "Android Mobile App Interface",
    featured: true,
  },
  {
    slug: "topic-modeling-lda",
    title: "Topic Modeling LDA & Sentiment Mining (SINTA 4)",
    category: "ai",
    year: 2025,
    summary:
      "Sistem NLP dan Topic Modeling berbasis Latent Dirichlet Allocation (LDA) untuk menganalisis persepsi publik pada komentar YouTube.",
    role: "Data Scientist & AI Researcher",
    problem:
      "Data opini publik berukuran masif di YouTube memerlukan ekstraksi topik dan clustering sentimen secara objektif dan terukur.",
    outcome:
      "Pipeline ekstraksi data, preprocessing teks, dan pemodelan topik LDA yang berhasil dipublikasikan di jurnal nasional terakreditasi SINTA 4.",
    tech: [
      "Python",
      "NLP",
      "LDA Topic Modeling",
      "YouTube API",
      "Data Processing",
    ],
    thumbnail: "",
    thumbnailAlt: "Topic Modeling and Data Extraction Dashboard",
    featured: true,
  },
];
