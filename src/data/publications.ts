import { Publication, Achievement } from "./types";

export const publications: Publication[] = [
  {
    title:
      "Flexwing: Gamification Technology to Increase Student Motivation and Engagement in Flexbox CSS Learning at State Vocational High School 10 Surabaya",
    venue: "IEEE International Conference",
    year: 2024,
    description:
      "Penelitian tentang penerapan gamifikasi dalam pembelajaran CSS Flexbox untuk mendukung pemahaman dan keterlibatan siswa sekolah kejuruan.",
    url: "https://ieeexplore.ieee.org/",
  },
  {
    title:
      "Analisis Persepsi Publik terhadap Reshuffle Menteri Keuangan 2025 Berdasarkan Topic Modeling LDA pada Komentar YouTube",
    venue: "Jurnal Nasional Terakreditasi SINTA 4",
    year: 2025,
    description:
      "Analisis opini publik pada komentar YouTube menggunakan pemrosesan bahasa alami dan metode Latent Dirichlet Allocation (LDA).",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Top 20 National Finalist",
    event: "Lomba Inovasi Digital Mahasiswa (LIDM)",
    organizer:
      "Ministry of Higher Education, Science, and Technology of the Republic of Indonesia",
    year: 2024,
    highlight:
      "National competition recognizing digital innovation projects from higher education institutions across Indonesia.",
  },
];
