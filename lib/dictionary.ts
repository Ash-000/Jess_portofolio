export type Language = "en" | "id";

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
      connect: "Connect",
    },
    hero: {
      badge: "Sustainable Agriculture & Precision Tech",
      title: "Stewardship of the Land & Precision Tech",
      description:
        "Dedicated to the advancement of sustainable agricultural practices through rigorous academic research and practical innovation. Bridging traditional wisdom and modern technology for long-term ecological balance.",
      viewResearch: "View Research",
      academicJourney: "Academic Journey",
      liveBadge: "Active Field Trial: Micronutrient Optimization Protocol",
    },
    about: {
      headerBadge: "Academic & Professional Journey",
      headerDesc:
        "A foundation built on rigorous study, hands-on field trial experience, and technological integration.",
      journeys: [
        {
          year: "2020 - 2023",
          degree: "B.Sc. Agricultural Sciences",
          institution: "University of Agronomy",
          description:
            "Focus on soil microbiology, sustainable crop management systems, and cultivating resilient crop varieties.",
          active: false,
        },
        {
          year: "2023 - PRESENT",
          degree: "Research Fellowship",
          institution: "Institute for Sustainable Farming",
          description:
            "Leading field research initiatives on precision irrigation, sensor-driven yield optimization, and soil health diagnostics.",
          active: true,
        },
      ],
      storyTitle:
        "Cultivating Deeper Connections Between Soil, Science, & Society",
      quote:
        "The true measure of agricultural success is not found solely in the volume of the harvest, but in the enduring health of the soil that provides it.",
      philosophy: "Core Philosophy",
      storyBody:
        "Through a harmonious blend of empirical field observations and modern software modeling, our mission is to document and build tools that solve contemporary environmental and agricultural productivity challenges.",
      visionTitle: "Vision & Strategic Pillars",
      visions: [
        {
          title: "Regenerative Systems",
          desc: "Shifting the paradigm from depleting resources to building enduring soil health and long-term ecosystem productivity.",
        },
        {
          title: "Precision Wisdom",
          desc: "Utilizing IoT sensors and algorithmic models to reduce water consumption and optimize fertilizer delivery.",
        },
        {
          title: "Community Integration",
          desc: "Translating laboratory breakthroughs into accessible techniques that empower local farming communities.",
        },
      ],
    },
    projects: {
      headerBadge: "Research & Initiatives",
      headerDesc:
        "Exploring sustainable practices, advanced agronomy, and precise tech solutions for modern agricultural challenges.",
      categories: {
        All: "All",
        Agronomy: "Agronomy",
        "Field Study": "Field Study",
        Engineering: "Engineering",
      },
      readWork: "Read Work",
      items: [
        {
          id: 1,
          title: "Hydroponic Efficiency Study",
          category: "Agronomy",
          status: "Published",
          description:
            "Optimizing nutrient delivery systems to maximize plant yield while minimizing water waste in controlled environment agriculture.",
          meta: "Vol 12, Issue 2",
          tags: ["Hydroponics", "Nutrient Delivery", "IoT Sensors"],
        },
        {
          id: 2,
          title: "Soil Micronutrient Analysis",
          category: "Field Study",
          status: "Active Trial",
          description:
            "Comprehensive study of microbial health in soil surfaces before and after no-till organic treatments over multiple seasons.",
          meta: "Vol 12, Issue 1",
          tags: ["Soil Health", "Microbiology", "Field Research"],
        },
        {
          id: 3,
          title: "Precision Irrigation Modeling",
          category: "Engineering",
          status: "In Review",
          description:
            "Developing algorithmic models to predict localized moisture requirements, reducing overall water consumption in semi-arid regions.",
          meta: "Vol 11, Issue 4",
          tags: ["Algorithms", "Moisture Tech", "Irrigation"],
        },
        {
          id: 4,
          title: "Cover Crop Biodiversity",
          category: "Agronomy",
          status: "Published",
          description:
            "Investigating the impact of diverse cover crop mixtures on soil organic matter, weed suppression, and cash crop yields.",
          meta: "Vol 11, Issue 3",
          tags: ["Biodiversity", "Cover Crops", "Soil Organic"],
        },
        {
          id: 5,
          title: "Smart Greenhouse Microclimate",
          category: "Engineering",
          status: "Active Trial",
          description:
            "Automating temperature and humidity regulations with embedded microcontrollers to safeguard high-value crop cultivation.",
          meta: "Vol 11, Issue 2",
          tags: ["Greenhouse", "Microclimate", "Automation"],
        },
        {
          id: 6,
          title: "Soil Carbon Sequestration",
          category: "Field Study",
          status: "Published",
          description:
            "Quantifying deep-root carbon capture capacity across multi-year crop rotations to support sustainable carbon offset initiatives.",
          meta: "Vol 11, Issue 1",
          tags: ["Carbon Capture", "Regenerative", "Soil Science"],
        },
      ],
    },
    contact: {
      badge: "Connect & Collaborate",
      title: "Get in Touch",
      description:
        "Whether you have questions about our research, are interested in collaboration, or simply wish to learn more about sustainable stewardship, we are here to connect.",
      emailLabel: "Email Inquiry",
      locationLabel: "Location",
      locationValue: "Botanical & Agricultural Research Facility",
      networkLabel: "Network",
      networkValue: "Stewardship Journal & Botani Seed Network",
      quote:
        "The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings.",
      quoteAuthor: "Masanobu Fukuoka",
      form: {
        nameLabel: "Your Name",
        namePlaceholder: "Jane Doe",
        emailLabel: "Email Address",
        emailPlaceholder: "jane@example.com",
        subjectLabel: "Subject / Topic",
        topics: {
          collab: "Research Collaboration",
          general: "General Inquiry",
          speaking: "Speaking / Workshop Request",
          licensing: "Precision Tech Inquiry",
        },
        messageLabel: "Message",
        messagePlaceholder: "Tell us about your project or inquiry...",
        sendButton: "Send Message",
        successTitle: "Message Sent!",
        successMessage:
          "Thank you for reaching out. We will respond to your message as soon as possible.",
      },
    },
    footer: {
      tagline: "Bridging science, technology, and soil health.",
      rights: "Agricultural Environmentalism. All rights reserved.",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      projects: "Riset & Proyek",
      contact: "Kontak",
      connect: "Hubungi",
    },
    hero: {
      badge: "Pertanian Berkelanjutan & Teknologi Presisi",
      title: "Tata Kelola Lahan & Teknologi Presisi",
      description:
        "Didedikasikan untuk kemajuan praktik pertanian berkelanjutan melalui riset akademis yang mendalam dan inovasi praktis. Memadukan kearifan tradisional dan teknologi modern demi keseimbangan ekologis jangka panjang.",
      viewResearch: "Lihat Riset",
      academicJourney: "Perjalanan Akademis",
      liveBadge: "Uji Coba Lapangan Aktif: Protokol Optimalisasi Mikronutrisi",
    },
    about: {
      headerBadge: "Perjalanan Akademis & Profesional",
      headerDesc:
        "Fondasi yang dibangun di atas studi mendalam, pengalaman uji coba lapangan langsung, serta integrasi teknologi.",
      journeys: [
        {
          year: "2020 - 2023",
          degree: "Sarjana Ilmu Pertanian (B.Sc.)",
          institution: "Universitas Agronomi",
          description:
            "Fokus pada mikrobiologi tanah, sistem pengelolaan tanaman berkelanjutan, serta budidaya varietas tanaman yang tangguh.",
          active: false,
        },
        {
          year: "2023 - SEKARANG",
          degree: "Program Fellowship Riset",
          institution: "Lembaga Pertanian Berkelanjutan",
          description:
            "Memimpin inisiatif riset lapangan pada irigasi presisi, optimalisasi hasil berbasis sensor, dan diagnostik kesehatan tanah.",
          active: true,
        },
      ],
      storyTitle:
        "Menumbuhkan Hubungan Lebih Dalam Antara Tanah, Sains, & Masyarakat",
      quote:
        "Ukuran sejati keberhasilan pertanian tidak hanya dilihat dari volume panen, melainkan dari kesehatan tanah yang terus terjaga.",
      philosophy: "Filosofi Utama",
      storyBody:
        "Melalui perpaduan harmonis antara observasi lapangan empiris dan pemodelan perangkat lunak modern, misi kami adalah mendokumentasikan dan membangun alat untuk menyelesaikan tantangan produktivitas lingkungan dan pertanian modern.",
      visionTitle: "Visi & Pilar Strategis",
      visions: [
        {
          title: "Sistem Regeneratif",
          desc: "Mengubah paradigma dari menguras sumber daya menjadi membangun kesehatan tanah yang berkelanjutan dan produktivitas ekosistem jangka panjang.",
        },
        {
          title: "Kearifan Presisi",
          desc: "Memanfaatkan sensor IoT dan model algoritmik untuk menghemat konsumsi air dan mengoptimalkan pemberian pupuk.",
        },
        {
          title: "Integrasi Komunitas",
          desc: "Menerjemahkan inovasi laboratorium menjadi teknik yang mudah diakses dan memberdayakan komunitas petani lokal.",
        },
      ],
    },
    projects: {
      headerBadge: "Riset & Inisiatif",
      headerDesc:
        "Mengeksplorasi praktik berkelanjutan, agronomi tingkat lanjut, dan solusi teknologi presisi untuk tantangan pertanian modern.",
      categories: {
        All: "Semua",
        Agronomy: "Agronomi",
        "Field Study": "Studi Lapangan",
        Engineering: "Teknik",
      },
      readWork: "Baca Riset",
      items: [
        {
          id: 1,
          title: "Studi Efisiensi Hidroponik",
          category: "Agronomy",
          status: "Dipublikasikan",
          description:
            "Mengoptimalkan sistem pemberian nutrisi untuk memaksimalkan hasil tanaman sekaligus meminimalkan pemborosan air dalam pertanian lingkungan terkontrol.",
          meta: "Vol 12, Edisi 2",
          tags: ["Hidroponik", "Distribusi Nutrisi", "Sensor IoT"],
        },
        {
          id: 2,
          title: "Analisis Mikronutrisi Tanah",
          category: "Field Study",
          status: "Uji Coba Aktif",
          description:
            "Studi komprehensif kesehatan mikroba di permukaan tanah sebelum dan sesudah perawatan organik tanpa olah tanah selama beberapa musim.",
          meta: "Vol 12, Edisi 1",
          tags: ["Kesehatan Tanah", "Mikrobiologi", "Riset Lapangan"],
        },
        {
          id: 3,
          title: "Pemodelan Irigasi Presisi",
          category: "Engineering",
          status: "Dalam Peninjauan",
          description:
            "Mengembangkan model algoritmik untuk memprediksi kebutuhan kelembaban lokal, mengurangi konsumsi air secara keseluruhan di daerah semi-kering.",
          meta: "Vol 11, Edisi 4",
          tags: ["Algoritma", "Teknologi Kelembaban", "Irigasi"],
        },
        {
          id: 4,
          title: "Keanekaragaman Tanaman Penutup",
          category: "Agronomy",
          status: "Dipublikasikan",
          description:
            "Mengkaji dampak campuran tanaman penutup tanah yang beragam terhadap bahan organik tanah, penekanan gulma, dan hasil tanaman utama.",
          meta: "Vol 11, Edisi 3",
          tags: ["Biodiversitas", "Tanaman Penutup", "Organik Tanah"],
        },
        {
          id: 5,
          title: "Mikroklimat Rumah Kaca Pintar",
          category: "Engineering",
          status: "Uji Coba Aktif",
          description:
            "Otomatisasi regulasi suhu dan kelembaban dengan mikrokontroler tertanam untuk melindungi budidaya tanaman bernilai tinggi.",
          meta: "Vol 11, Edisi 2",
          tags: ["Rumah Kaca", "Mikroklimat", "Otomatisasi"],
        },
        {
          id: 6,
          title: "Sekuestrasi Karbon Tanah",
          category: "Field Study",
          status: "Dipublikasikan",
          description:
            "Kuantifikasi kapasitas penyerapan karbon akar dalam pada rotasi tanaman multi-tahun untuk mendukung inisiatif kompensasi karbon.",
          meta: "Vol 11, Edisi 1",
          tags: ["Serapan Karbon", "Regeneratif", "Ilmu Tanah"],
        },
      ],
    },
    contact: {
      badge: "Hubungi & Kolaborasi",
      title: "Hubungi Kami",
      description:
        "Apakah Anda memiliki pertanyaan tentang riset kami, tertarik untuk berkolaborasi, atau sekadar ingin belajar lebih lanjut tentang tata kelola berkelanjutan, kami siap terhubung.",
      emailLabel: "Pertanyaan Email",
      locationLabel: "Lokasi",
      locationValue: "Fasilitas Riset Botani & Pertanian",
      networkLabel: "Jaringan",
      networkValue: "Jaringan Stewardship Journal & Botani Seed",
      quote:
        "Tujuan utama pertanian bukanlah sekadar menanam tanaman, melainkan membina dan menyempurnakan kualitas manusia.",
      quoteAuthor: "Masanobu Fukuoka",
      form: {
        nameLabel: "Nama Anda",
        namePlaceholder: "Jane Doe",
        emailLabel: "Alamat Email",
        emailPlaceholder: "jane@example.com",
        subjectLabel: "Subjek / Topik",
        topics: {
          collab: "Kolaborasi Riset",
          general: "Pertanyaan Umum",
          speaking: "Permintaan Pembicara / Workshop",
          licensing: "Pertanyaan Teknologi Presisi",
        },
        messageLabel: "Pesan",
        messagePlaceholder: "Tuliskan pesan atau pertanyaan Anda...",
        sendButton: "Kirim Pesan",
        successTitle: "Pesan Terkirim!",
        successMessage:
          "Terima kasih telah menghubungi kami. Kami akan merespons pesan Anda secepatnya.",
      },
    },
    footer: {
      tagline: "Jembatan sains, teknologi, dan kesehatan tanah.",
      rights: "Agricultural Environmentalism. Hak cipta dilindungi.",
    },
  },
};
