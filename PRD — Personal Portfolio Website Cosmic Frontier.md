# PRD — Personal Portfolio Website: Cosmic Frontier

**Versi:** 1.0 · **Status:** Siap Dikembangkan · **Platform:** Web · **Stack:** Next.js + TypeScript · **Hosting:** GitHub Pages (static export, tanpa backend/database)

**Author:** \[Nama Pemilik Portfolio\] · **Stakeholder:** Pemilik portfolio (Product Owner & Developer) · **Tanggal dibuat:** 2026-10-22

## 1. Executive Summary

**One-liner:** Website portfolio pribadi bertema luar angkasa yang menampilkan profil, pengalaman, proyek, keahlian, dan sertifikasi seorang profesional SEO dan Web Development secara profesional, interaktif, dan mudah dipelihara.

**Overview:** Produk ini adalah one-page portfolio statis dengan tema *Cosmic Frontier — Exploring the Digital Universe*. Perjalanan karier digambarkan sebagai eksplorasi antariksa: setiap section adalah "stasiun" yang mewakili pengalaman, proyek, keahlian, dan pencapaian. Referensi pengalaman visual adalah landonorris.com (storytelling, komposisi, transisi, navigasi), tetapi identitas visual harus orisinal dan tidak boleh menyalin aset, logo, teks, atau desain.

Website dibangun dengan Next.js (static export), di-host di GitHub Pages, dan seluruh konten dikelola melalui file lokal di repository. Tujuan utamanya adalah membantu recruiter, hiring manager, dan calon klien menilai kemampuan pemilik dengan cepat, serta menyediakan akses langsung ke CV, GitHub, LinkedIn, dan kontak.

**Quick Facts:**

- **Target Users:** Recruiter/HR, hiring manager (SEO, Technical SEO, Web Dev), perusahaan IT, calon klien freelance
- **Problem Solved:** Pengalaman dan proyek pemilik belum terpresentasikan dalam satu tempat yang kredibel dan mudah dinilai
- **Key Metric:** Ketersediaan website publik yang lolos target Lighthouse dan seluruh acceptance criteria
- **Target Launch:** \[Belum ditentukan\]

## 2. Problem Statement

### 2.1 The Problem

Pemilik portfolio melamar posisi di bidang SEO, Technical SEO, Web Development, dan IT, tetapi CV statis tidak cukup menunjukkan kemampuan teknis, proyek nyata, dan karakter profesional. Recruiter hanya memiliki waktu singkat untuk menilai kandidat.

### 2.2 Current State

Informasi tersebar di CV, LinkedIn, dan GitHub. Tidak ada satu tempat yang menyatukan narasi profesional, studi kasus proyek, dan identitas visual.

### 2.3 Impact

- **User impact:** Recruiter harus berpindah antar platform untuk mendapat gambaran utuh.
- **Business/personal impact:** Peluang diferensiasi kandidat hilang, terutama untuk peran SEO dan web yang menuntut bukti kemampuan.

## 3. Goals & Objectives

### 3.1 Business Goals

1. Menjadi portfolio profesional untuk melamar pekerjaan di bidang SEO, Technical SEO, Web Development, dan IT.
2. Menampilkan proyek dan pengalaman kerja secara menarik namun mudah dipahami recruiter.
3. Menunjukkan kemampuan teknis melalui studi kasus proyek nyata.
4. Menyediakan akses cepat ke CV, GitHub, LinkedIn, dan kontak.
5. Dapat dibangun, dipelihara, dan di-deploy melalui GitHub tanpa server atau database.

### 3.2 User Goals

1. Memahami siapa pemilik dan keahlian utamanya dalam beberapa detik.
2. Menilai pengalaman dan proyek dengan cepat, termasuk peran dan hasilnya.
3. Menghubungi pemilik atau mengunduh CV tanpa hambatan.

### 3.3 Non-Goals

- Menjadi blog atau CMS dinamis.
- Menyimpan atau memproses data pengunjung.
- Mengklaim ranking atau indeksasi Google tanpa bukti.

## 4. User Personas

### 4.1 Primary: Recruiter / HR

- **Peran:** HR atau talent acquisition di perusahaan teknologi atau digital marketing.
- **Tech savviness:** Rendah–menengah.
- **Perilaku:** Memindai cepat, sering membuka dari mobile, mencari CV dan tautan profil.
- **Kebutuhan:** Ringkasan jelas, pengalaman terverifikasi, kontak mudah.
- **Pain points:** Portfolio berlebihan visual tetapi miskin informasi; tautan rusak; klaim tidak jelas.

### 4.2 Secondary: Hiring Manager (SEO / Technical SEO / Web Dev)

- **Tech savviness:** Tinggi.
- **Kebutuhan:** Bukti teknis, studi kasus, stack yang digunakan, tautan demo dan source code.
- **Pain points:** Daftar skill tanpa konteks, persentase keahlian yang tidak bermakna.

### 4.3 Tertiary: Calon Klien Freelance / Kolaborator

- **Kebutuhan:** Gambaran layanan, contoh proyek, cara menghubungi.

## 5. User Stories & Requirements

### Epic A — Identitas & Navigasi

#### A1. Hero Section (P0)

```
As a recruiter,
I want to memahami identitas profesional pemilik dalam beberapa detik,
So that saya bisa memutuskan apakah relevan untuk dilihat lebih lanjut.
```

**Konten:** nama profesional, headline (saran: "Building Digital Experiences Beyond Boundaries."), subtitle (saran: "SEO Specialist · Web Developer · Technology Enthusiast"), deskripsi singkat, tombol "Explore My Work" dan "Download CV", tautan LinkedIn dan GitHub, visual utama bertema luar angkasa.

**Acceptance Criteria:**

- [x] "Explore My Work" melakukan scroll ke section Projects.
- [x] "Download CV" mengunduh file PDF lokal (`/documents/cv.pdf`).
- [x] Tautan LinkedIn dan GitHub membuka profil yang benar.
- [x] Animasi latar tidak menghalangi klik maupun keterbacaan teks.

#### A2. Navigasi & Footer (P0)

```
As a visitor,
I want to berpindah antar section dengan mudah di semua perangkat,
So that saya menemukan informasi yang dicari tanpa kebingungan.
```

**Acceptance Criteria:**

- [x] Logo/wordmark dan menu anchor menuju setiap section tanpa pemuatan server.
- [x] Status menu aktif berubah sesuai posisi scroll.
- [x] Mobile hamburger menu dapat dibuka dan ditutup dengan mudah.
- [x] Tombol kembali ke atas tersedia.
- [x] Footer memuat nama pemilik, tahun copyright otomatis, tautan sosial, dan tautan navigasi utama.

### Epic B — Konten Profesional

#### B1. About Me (P0)

```
As a hiring manager,
I want to membaca ringkasan profil, pendidikan, dan fokus profesional,
So that saya memahami latar belakang dan pendekatan kerja kandidat.
```

**Fokus:** SEO & Technical SEO, Web Development, IT Support, AI/LLM sebagai bidang eksplorasi.

**Acceptance Criteria:**

- [x] Deskripsi ringkas, profesional, realistis, dan tidak berlebihan.
- [ ] Seluruh klaim dapat diverifikasi pemilik.

#### B2. Professional Journey (P0)

```
As a recruiter,
I want to melihat riwayat pengalaman dalam timeline,
So that saya memahami progres dan relevansi karier.
```

**Data per pengalaman:** perusahaan, posisi, lokasi, periode, ringkasan tanggung jawab, teknologi/tools, pencapaian terverifikasi. Pengalaman awal: SEO Intern di Brighton Real Estate dan IT Support Intern di PT Istana Surya Perkasa.

**Acceptance Criteria:**

- [x] Ditampilkan dalam timeline vertikal atau horizontal.
- [x] Data bersumber dari `src/data/experience.ts`.
- [ ] Tidak ada informasi atau angka pencapaian yang belum dikonfirmasi.

#### B3. Featured Projects (P0)

```
As a hiring manager,
I want to menjelajahi proyek berdasarkan kategori beserta peran dan hasilnya,
So that saya menilai kemampuan teknis kandidat secara nyata.
```

**Data per proyek:** judul, thumbnail, deskripsi singkat, kategori, teknologi, peran pribadi, masalah yang diselesaikan, hasil/status, tautan demo dan source code (opsional).

**Kategori awal:** SEO & Technical SEO, Web Development, Mobile Development, Education Technology, AI & Automation.

**Acceptance Criteria:**

- [x] Filter kategori berjalan sepenuhnya di sisi klien dan menampilkan hasil yang benar.
- [x] Kartu proyek memiliki efek hover interaktif.
- [ ] Tautan demo/source code hanya muncul jika tersedia; tidak ada tautan palsu.
- [ ] Tampilan detail proyek disediakan jika informasi pendukung tersedia.

#### B4. Technical Skills (P0)

```
As a hiring manager,
I want to melihat keahlian yang dikelompokkan per kategori,
So that saya cepat memetakan kecocokan dengan kebutuhan posisi.
```

| Kategori | Item |
| --- | --- |
| SEO & Analytics | On-page SEO, Keyword Research, Google Search Console, Google Analytics, SEO data processing |
| Web Development | HTML/CSS/JavaScript, PHP & Laravel, REST API, Next.js (jika benar-benar dikerjakan) |
| Programming & Mobile | Python, Kotlin, Android Studio, Firebase |
| Data, Cloud & Tools | MySQL, Git/GitHub, Docker, Google Colab, AWS/cloud sesuai pengalaman sebenarnya |
| AI & LLM | Prompt Engineering, AI/LLM exploration, tools berbasis Python jika dapat didemonstrasikan |

**Acceptance Criteria:**

- [ ] Tidak ada persentase keahlian buatan; gunakan label kategori atau tingkat familiaritas yang dapat dipertanggungjawabkan.

#### B5. Certifications (P1)

```
As a recruiter,
I want to melihat sertifikasi yang relevan,
So that saya dapat memverifikasi kualifikasi kandidat.
```

**Data:** nama, penerbit, tanggal terbit, tanggal kedaluwarsa (jika ada), tautan credential (jika ada). Prioritaskan SEO, analytics, cloud, dan dukungan teknis.

#### B6. Education & Achievements (P1)

**Konten:** pendidikan formal, organisasi relevan, kompetisi dan pencapaian, publikasi/kontribusi akademik (jika ada). Singkat dan fokus pada relevansi karier.

#### B7. Contact (P0)

```
As a recruiter or client,
I want to menghubungi pemilik lewat kanal profesional,
So that saya dapat melanjutkan komunikasi dengan cepat.
```

**Acceptance Criteria:**

- [x] Email memakai tautan `mailto:`; LinkedIn dan GitHub memakai tautan eksternal langsung; WhatsApp hanya jika pemilik ingin mempublikasikannya.
- [x] Tidak ada form submission atau backend.
- [ ] Tidak menampilkan alamat rumah, nomor identitas, atau data pribadi yang tidak relevan.

### Epic C — Pengalaman Visual & Interaksi

#### C1. Tema Kosmik & Animasi (P0)

- Starfield dan partikel, planet/bulan/nebula, garis orbit dan konstelasi, grid futuristik dan HUD minimal, ilustrasi astronaut/pesawat, panel informasi ala dashboard misi.
- Transisi masuk antarseksi halus, parallax ringan, hover kartu, indikator scroll, transisi menu mobile.
- Animasi memakai properti efisien (`transform`, `opacity`) dan menghormati `prefers-reduced-motion` dengan alternatif minim gerakan.

## 6. Non-Functional Requirements

### 6.1 User Experience

- Responsif pada mobile (±360–390 px), tablet, dan desktop/layar lebar tanpa horizontal overflow.
- Semua tombol memiliki fungsi nyata; tautan eksternal berperilaku jelas.
- Konten utama tetap dapat diakses saat JavaScript gagal berjalan.
- Navigasi keyboard dan fokus interaktif jelas; kontras dan ukuran teks memadai.
- Tanpa autoplay audio; loading screen hanya jika diperlukan dan tidak menahan konten lama.

### 6.2 SEO

- Metadata title/description unik, Open Graph, favicon, web manifest (jika perlu).
- Semantic HTML, struktur heading benar, alt text untuk gambar informatif.
- Canonical URL jika domain final sudah ditetapkan.
- `sitemap.xml`, `robots.txt`, halaman 404 yang sesuai hosting.
- Path dan URL berfungsi pada GitHub Pages. Website tidak boleh mengklaim sudah terindeks atau berperingkat tertentu tanpa bukti.

### 6.3 Performa

- Prioritaskan rendering HTML statis; optimalkan gambar sebelum masuk repository; lazy loading untuk gambar non-kritis.
- Hindari video background besar, library animasi berlebihan, dan layout shift yang tidak perlu.
- Minimalkan JavaScript client-side.

### 6.4 Security & Privacy

- Tidak ada secret, token, atau API key di repository publik.
- Tidak meminta informasi sensitif pengunjung; tidak ada analytics/tracking tanpa kebutuhan dan konfigurasi jelas.
- Validasi tautan eksternal, minimalkan dependency, gunakan aset berlisensi sesuai, dan jangan menyertakan file pribadi yang tidak ditujukan untuk publik.

## 7. Success Metrics

Metrik awal berupa target pengujian (bukan jaminan; hasil dapat berbeda per browser, perangkat, dan lingkungan).

| Kategori | Metrik | Target |
| --- | --- | --- |
| Performance | Lighthouse Performance | ≥ 85 |
| Accessibility | Lighthouse Accessibility | ≥ 90 |
| Best Practices | Lighthouse Best Practices | ≥ 90 |
| SEO | Lighthouse SEO | ≥ 90 |
| Kualitas konten | Tautan placeholder/rusak | 0 |
| Fungsionalitas | CTA, filter, menu mobile, unduhan CV berfungsi | 100% lolos functional test |
| Deployment | Build dan GitHub Actions | Berhasil tanpa server runtime |

**Indikator opsional (jika tracking disetujui kemudian):** jumlah unduhan CV, klik tautan kontak, dan klik tautan proyek. Saat ini tidak ada analytics sehingga metrik ini bukan bagian dari versi 1.0.

## 8. Scope

### 8.1 In Scope

- One-page portfolio dengan 9 bagian: Hero, About Me, Professional Journey, Featured Projects, Technical Skills, Certifications, Education & Achievements, Contact, Footer.
- Filter proyek sisi klien, navigasi anchor aktif, mobile menu, tombol kembali ke atas, unduhan CV.
- Static export, GitHub Actions, GitHub Pages, README.

### 8.2 Out of Scope (Versi 1.0)

- Admin dashboard, database, login/autentikasi, CMS dinamis, backend API.
- Form kontak yang menyimpan pesan, blog dinamis, sistem komentar, panel admin.
- Integrasi berbayar yang wajib untuk menjalankan website.

Fitur tambahan dapat dipertimbangkan pada versi berikutnya jika arsitektur atau platform hosting berubah.

## 9. Technical Considerations

### 9.1 Technology Stack

Next.js (App Router), TypeScript, Tailwind CSS, React, CSS animations, Lucide React, GitHub + GitHub Actions, GitHub Pages. Versi dependency harus kompatibel dan stabil saat implementasi.

### 9.2 Static Architecture

Wajib memakai static export:

```ts
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
```

`basePath` wajib diterapkan jika memakai URL repository (mis. `/portfolio/`); semua tautan internal dan aset harus berfungsi pada subpath. Untuk repo `username.github.io`, sesuaikan path dengan URL deployment sebenarnya.

### 9.3 Architecture Constraints

Tidak boleh bergantung pada: backend/server aplikasi, database, API route, Server Actions, SSR yang butuh runtime, middleware server, autentikasi, CMS berbackend, form kontak berpemrosesan server, atau API eksternal sebagai syarat render halaman. Seluruh halaman dihasilkan saat build dan di-host sebagai aset statis.

### 9.4 Content Management

Semua konten dikelola lewat file lokal dan dipisahkan dari komponen UI: `profile.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `certifications.ts`, `education.ts`, `socials.ts` di `src/data/`. Menambah proyek atau memperbarui pengalaman tidak boleh mengubah banyak komponen.

### 9.5 Struktur Proyek (disarankan)

```
portfolio/
├── public/ (images, icons, documents/cv.pdf, favicon.ico, robots.txt, sitemap.xml)
├── src/
│   ├── app/ (layout.tsx, page.tsx, globals.css, not-found.tsx)
│   ├── components/ (layout, sections, projects, ui, effects)
│   ├── data/ (profile, experience, projects, skills, certifications, education, socials)
│   └── lib/utils.ts
├── .github/workflows/deploy.yml
├── next.config.ts, package.json, tsconfig.json, README.md
```

Struktur boleh menyesuaikan versi Next.js, tetapi pemisahan data, komponen, dan aset harus dipertahankan.

### 9.6 Deployment

1. Commit dan push ke branch utama.
2. GitHub Actions menginstal dependency, menjalankan pemeriksaan dan build.
3. Next.js menghasilkan folder `out`.
4. Hasil export dipublikasikan ke GitHub Pages (source: GitHub Actions).

Persyaratan: workflow gagal jika build gagal; CV dan seluruh gambar tersedia di hasil export; path aset tidak rusak pada base path; README memuat instruksi menjalankan, mengubah konten, dan deployment.

### 9.7 Skema Data

Skema ini menjaga konten terpisah dari komponen. Field opsional dibuat `?` agar tautan tidak pernah dibuat palsu.

```ts
export interface Profile {
  name: string;
  headline: string;
  subtitle: string;
  summary: string;
  currentFocus?: string;
  cvPath: string; // "documents/cv.pdf", tanpa slash awal
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  start: string; // "YYYY-MM"
  end?: string;  // kosong = masih berjalan
  summary: string[];
  tools: string[];
  achievements?: string[]; // hanya yang terverifikasi
}

export type ProjectCategory =
  | "seo" | "web" | "mobile" | "edtech" | "ai";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: number;
  summary: string;
  role: string;
  problem: string;
  outcome: string;
  tech: string[];
  thumbnail: string;
  thumbnailAlt: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;   // "YYYY-MM"
  expires?: string;
  credentialUrl?: string;
}

export interface Social {
  label: string;
  url: string;
  kind: "email" | "linkedin" | "github" | "whatsapp";
}
```

### 9.8 Aset, Browser, dan Aturan Path

- **Gambar:** format WebP atau AVIF; thumbnail proyek sekitar 1200 px lebar dan maksimal 200 KB; gambar Open Graph 1200 × 630 px.
- **CV:** satu file PDF di `public/documents/cv.pdf`, ukuran idealnya di bawah 1 MB.
- **Path aset:** semua path aset dan tautan internal memakai helper yang menambahkan `basePath`, tidak ditulis manual.
- **Browser yang didukung:** dua versi terbaru Chrome, Edge, Firefox, dan Safari, termasuk Safari iOS 16 ke atas.
- **Fallback tanpa JavaScript:** semua teks dan tautan navigasi tetap tampil; efek dan filter menjadi opsional.

## 10. Design & UX Requirements

### 10.1 Konsep Visual

**Cosmic Frontier — Exploring the Digital Universe.** Setiap section adalah destinasi atau stasiun dalam perjalanan karier. Elemen dekoratif tidak boleh mengurangi keterbacaan atau mengganggu navigasi.

### 10.2 Color Palette

| Peran | Hex |
| --- | --- |
| Background utama | `#050816` |
| Background sekunder | `#0B1026` |
| Surface/card | `#111A33` |
| Primary accent | `#8B5CF6` |
| Secondary accent | `#38BDF8` |
| Highlight | `#A3E635` |
| Primary text | `#F8FAFC` |
| Secondary text | `#94A3B8` |

Gunakan aksen secara konsisten dan hindari terlalu banyak warna neon sekaligus.

### 10.3 Typography

Maksimal dua keluarga font: display font untuk headline, sans-serif mudah dibaca untuk paragraf/navigasi/informasi teknis. Utamakan font lokal atau fallback system font; hindari ketergantungan pada layanan font eksternal untuk fungsi utama.

### 10.4 Referensi

Pengalaman visual merujuk pada https://landonorris.com/ hanya sebagai inspirasi storytelling, komposisi, transisi, dan navigasi. Desain akhir harus memiliki identitas sendiri.

### 10.5 Peta Referensi: landonorris.com ke Cosmic Frontier

Tabel ini diturunkan dari struktur dan teks halaman referensi. Gerakan, durasi, dan efek visualnya tidak terbaca dari teks, jadi perlu diperiksa langsung di browser sebelum desain final. Kolom kanan memastikan hasilnya orisinal.

| Pola di referensi | Adaptasi untuk portfolio ini | Catatan orisinalitas |
| --- | --- | --- |
| Intro "vertical drive" dengan tombol muat dan kunci scroll | Intro singkat bertema "launch sequence" yang bisa dilewati, tanpa memaksa rotasi layar | Narasi, visual, dan teks dibuat sendiri |
| Heading raksasa dua baris dengan kata kunci ditebalkan | Heading section dua baris besar bertema misi, kata kunci diberi warna aksen | Gunakan istilah sendiri, bukan "On Track / Off Track" |
| Tanda tangan SVG berwarna lime | Wordmark atau tanda tangan pemilik sebagai SVG yang "digambar" saat muncul | Buat sendiri; lime `#A3E635` hanya sebagai highlight |
| Galeri horizontal dengan caption lokasi dan tahun | "Mission Gallery": strip horizontal cuplikan proyek dengan caption nama proyek dan tahun | Tidak memakai foto atau layout yang sama |
| "Hall of Fame" helm: kartu dengan gambar dasar dan gambar hover, label tahun | Kartu proyek dengan thumbnail dasar, tampilan hover, label kategori dan tahun | Konten proyek milik sendiri |
| Menu layar penuh dengan gambar | Overlay menu "Mission Control" dengan nomor section dan pratinjau visual | Gambar buatan sendiri |
| Label berulang dan widget "Next Race" | Panel status HUD yang dapat dikonfigurasi di `profile.ts`, misalnya fokus saat ini | Isi hanya fakta yang benar |
| Deretan logo mitra | Strip "Tools & Tech" untuk teknologi yang benar-benar dipakai | Periksa lisensi logo; boleh teks saja |
| Grid sosial dan kalimat penutup di footer | Strip tautan sosial dan kalimat penutup pribadi dengan tombol `mailto:` | Tanpa embed pihak ketiga |
| Toko, kalender, kemitraan, dan footer logo sponsor | Tidak dipakai | Tidak relevan untuk portfolio |

### 10.6 Spesifikasi Interaksi & Gerakan

Angka berikut adalah usulan awal yang terukur agar requirement bisa diuji. Sesuaikan setelah prototipe.

| Elemen | Perilaku | Reduced motion / fallback |
| --- | --- | --- |
| Intro | Maksimal 3 detik, ada tombol "Skip", konten tetap ada di HTML | Dilewati otomatis |
| Transisi section | Fade dan translate maksimal 40 px, durasi 300–600 ms, sekali saat masuk viewport | Muncul langsung tanpa gerak |
| Parallax latar | Translate maksimal 40 px, hanya `transform` | Dimatikan |
| Starfield | Maksimal sekitar 150 partikel di mobile dan 300 di desktop, dijeda saat tab tidak aktif | Statis |
| Kartu proyek | Hover atau fokus keyboard memunculkan tampilan kedua dalam 200–300 ms | Perubahan tanpa animasi |
| Mission Gallery | Scroll horizontal dengan swipe dan tombol panah, bisa diakses keyboard | Scroll biasa |
| Menu overlay | Terbuka dan tertutup dalam 300 ms, fokus terkunci di dalam menu, tombol Esc menutup | Tanpa animasi |
| Indikator scroll | Garis progres dan penanda section aktif | Tetap tampil tanpa animasi |

**Ketentuan umum:**

- Breakpoint acuan: 360, 768, 1024, dan 1440 px.
- Area sentuh minimal 44 × 44 px.
- Tersedia tautan "Skip to content" yang terlihat saat difokuskan.
- Orientasi layar tidak dikunci; website tidak meminta pengguna memutar perangkat.
- Seluruh teks tetap berada di HTML, bukan di dalam gambar atau canvas.

## 11. Timeline & Milestones

Tanggal belum ditetapkan; fase berikut berurutan dan dapat diberi estimasi bersama engineering/developer.

| Fase | Cakupan | Output |
| --- | --- | --- |
| 1. Foundation | Init Next.js + TS + Tailwind, static export, repo dan workflow deploy | Proyek kosong ter-deploy |
| 2. Design System | Palet, tipografi, layout responsif, navigasi, komponen UI, background kosmik | Komponen dasar siap |
| 3. Main Content | Hero, About, Experience, Projects, Skills, Certifications, Education, Contact | Seluruh section tampil dengan data |
| 4. Interactions | Animasi, filter proyek, navigasi aktif, mobile menu, unduhan CV | Fitur interaktif berfungsi |
| 5. Quality Assurance | SEO, accessibility, performa, responsive, build dan deployment testing | Laporan pengujian |
| 6. Launch | Validasi konten, cek tautan, deploy GitHub Pages, dokumentasi README | Website publik |

## 12. Testing & Quality Assurance

- **Functional:** semua menu, CTA, filter proyek, unduhan CV, email dan tautan sosial, serta mobile menu berfungsi.
- **Responsive:** mobile ±360–390 px, tablet, desktop dan layar lebar; tidak ada teks terpotong atau overflow.
- **Deployment:** `npm run build` berhasil, folder `out` terbentuk, GitHub Actions sukses, aset dimuat dari URL GitHub Pages, navigasi dan gambar berfungsi pada subpath.
- **Accessibility:** kontras memadai, fungsi penting dapat diakses keyboard, fokus terlihat, alt text sesuai, reduced motion dihormati.
- **Content:** tidak ada tautan placeholder, klaim tak terverifikasi, atau informasi pribadi yang seharusnya tidak publik.

## 13. Risks & Mitigation

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Path/aset rusak di subpath GitHub Pages | Gambar, CV, atau navigasi tidak berfungsi | Terapkan `basePath`; uji di URL deployment sebenarnya |
| Efek visual berat menurunkan performa | Skor Lighthouse di bawah target | Gunakan `transform`/`opacity`, hindari video besar, ukur berkala |
| Visual mengalahkan keterbacaan | Recruiter sulit memindai konten | Batasi dekorasi, jaga kontras dan hierarki |
| Konten belum lengkap atau tidak terverifikasi | Klaim tidak akurat | Gunakan data terkonfigurasi dan placeholder jelas; jangan mengarang fakta |
| Kemiripan dengan website referensi | Isu orisinalitas | Buat aset dan desain sendiri |
| Animasi mengganggu pengguna sensitif gerak | Aksesibilitas buruk | Dukung `prefers-reduced-motion` |
| Data pribadi ikut terpublikasi | Privasi | Review akhir seluruh konten dan file di repository |

## 14. Dependencies & Assumptions

**Dependencies:** akun dan repository GitHub (Pages + Actions aktif); file CV PDF terbaru; gambar dan thumbnail proyek yang dioptimalkan; data pengalaman, proyek, sertifikasi, dan pendidikan dari pemilik.

**Assumptions:** pemilik akan menyediakan dan mengonfirmasi seluruh konten; tidak ada kebutuhan backend pada versi 1.0; domain kustom belum wajib; aset pihak ketiga berlisensi sesuai.

## 15. Open Questions

1. Nama profesional dan email publik apa yang digunakan?
2. Apakah memakai domain kustom atau URL `username.github.io/portfolio/` (menentukan `basePath` dan canonical URL)?
3. Proyek mana yang menjadi Featured Projects, dan mana yang memiliki demo atau repository publik?
4. Sertifikasi apa saja yang akan ditampilkan beserta tautan credential?
5. Apakah WhatsApp akan dipublikasikan?
6. Apakah pencapaian terukur (angka) tersedia dan dapat diverifikasi?
7. Target tanggal launch?

**Default usulan agar pengembangan tidak terblokir.** Semua data di bawah tetap harus Anda isi dan konfirmasi sebelum launch.

| Pertanyaan | Default sementara |
| --- | --- |
| Nama dan email | Placeholder jelas di `profile.ts`, misalnya `[NAMA]` |
| URL deployment | `username.github.io/portfolio/` dengan `basePath` aktif; canonical ditambahkan saat domain final ada |
| Featured Projects | 3–6 proyek, diisi dari data yang Anda berikan |
| Sertifikasi | Dimuat dari `certifications.ts`; section disembunyikan jika kosong |
| WhatsApp | Tidak ditampilkan sampai Anda minta |
| Angka pencapaian | Tidak ditampilkan sampai terverifikasi |
| Target launch | Ditentukan setelah Fase 2 selesai |

## 16. Acceptance Criteria (Definition of Done)

Proyek selesai apabila:

1. Dibangun dengan Next.js dan TypeScript.
2. Bertema luar angkasa yang konsisten dengan identitas visual sendiri.
3. Seluruh section utama tersedia dan berfungsi.
4. Konten dapat diperbarui melalui file lokal.
5. Tidak ada backend atau database.
6. Dapat di-build sebagai static export.
7. Berhasil di-deploy melalui GitHub Pages.
8. Navigasi, aset, dan tautan berfungsi pada URL deployment sebenarnya.
9. Responsif dan memenuhi pengujian aksesibilitas dasar.
10. Target performa telah diuji dan hasilnya didokumentasikan.
11. README menjelaskan cara menjalankan, mengubah konten, dan men-deploy.
12. Tidak ada fitur yang membutuhkan server di implementasi final.

**Instruksi pengembangan:** implementasikan seluruh fitur secara interaktif (bukan sekadar mockup), pastikan setiap tombol dan navigasi bekerja, jalankan build untuk memastikan export statis, dan jangan mengarang fakta profesional; gunakan data terkonfigurasi atau placeholder yang jelas bila informasi belum tersedia.

## 17. Stakeholder Sign-Off

| Peran | Nama | Status | Tanggal |
| --- | --- | --- | --- |
| Product Owner / Pemilik Portfolio | \[Nama\] | Menunggu | — |
| Developer | \[Nama\] | Menunggu | — |
| Reviewer Desain/Konten (opsional) | \[Nama\] | Menunggu | — |
