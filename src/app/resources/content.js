import { SmartLink } from "@/once-ui/components";

const person = {
    firstName: 'Agcrismanto Budhi',
    lastName:  'Praswastyka',
    shortName:  'Aghea',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Web Developer & Cybersecurity',
    avatar:    '/images/avatar.jpg',
    location:  'DKI Jakarta',
    languages: []  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: false,
    title: <>Subscribe to {person.firstName}'s Newsletter</>,
    description: <>I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.</>
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: 'GitHub',
        icon: 'github',
        link: '/github',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: '/linkedin',
    },
    {
        name: 'YouTube',
        icon: 'youtube',
        link: '/youtube',
    },
    {
        name: 'Signal',
        icon: 'signal',
        link: '/signal',
    },
    {
        name: 'Email',
        icon: 'email',
        link: '/email',
    },
]

const home = {
    label: 'Beranda',
    title: `${person.name}`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Do what you love, love what you do.</>,
    subline: <>Agcrismanto Budhi Praswastyka, atau yang dikenal sebagai Cris atau Aghea, adalah seorang Web Developer dan Cybersecurity sejak 2011 dengan fokus pada pengembangan aplikasi web yang aman. Selain itu, Ia juga memiliki pengalaman di industri makanan dan minuman.</>
}

const about = {
    label: 'Tentang',
    title: 'Tentang',
    description: `Perkenalkan ${person.name}, ${person.role} dari ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: true
    },
    avatar: {
        display: true
    },
    calendar: {
        display: false,
        link: 'https://cal.com/'
    },
    resume: {
        display: true
    },
    intro: {
        display: true,
        title: 'Pengantar',
        description: <>Agcrismanto Budhi Praswastyka, yang lebih dikenal dengan nama Cris atau Aghea, adalah seorang individu dengan latar belakang yang kuat dalam pengembangan web dan keamanan siber sejak tahun 2011. Memiliki keahlian dalam berbagai bahasa pemrograman, seperti Python, JavaScript, React, serta HTML/CSS, dengan fokus khusus pada pengembangan aplikasi web yang aman dan perlindungan sistem dari ancaman siber. Selain keahliannya di dunia teknologi, Ia juga memiliki pengalaman dalam industri makanan dan minuman selama beberapa tahun.
          <br/><br/>
          Di luar pekerjaannya, Ia mengeksplorasi minat kreatifnya sebagai musisi dan pegiat hukum, serta mengisi waktu luangnya dengan bermain gim. Ia juga penggemar film, terutama yang bergenre komedi, aksi, dan horor. Rasa ingin tahu dan komitmennya untuk terus mengikuti perkembangan teknologi menjadi bagian penting dari pertumbuhan pribadi dan profesionalnya.</>
    },
    work: {
        display: true,
        title: 'Resume',
        experiences: [
            {
                company: 'BLAST',
                timeframe: '2022 - Sekarang',
                role: 'Web Developer & Cybersecurity',
                location: 'Denmark',
                achievements: [
                    <>Merancang dan mengembangkan fitur utama platform berbasis esports, termasuk antarmuka pengguna yang intuitif serta sistem pengelolaan turnamen yang efisien, menggunakan teknologi seperti React, Next.js, TypeScript, dan Node.js untuk menciptakan aplikasi web yang dinamis dan responsif.</>,
                    <>Mengimplementasikan langkah-langkah keamanan untuk melindungi data pengguna dan informasi turnamen, dengan memastikan sistem bebas dari kerentanannya melalui pengujian penetrasi (penetration testing), serta pengelolaan akses yang ketat.</>,
                    <>Mengoptimalkan performa website agar dapat menangani banyak pengguna secara simultan, terutama pada saat turnamen besar, dengan fokus pada kecepatan dan skalabilitas sistem.</>
                ],
                images: [
                    {
                        src: '/images/projects/blast.jpg',
                        alt: 'BLAST.TV',
                        width: 16,
                        height: 9
                    },
                ]
            },
            {
                company: 'Dinas Komunikasi dan Informatika',
                timeframe: '2018 - 2020',
                role: 'Cybersecurity Consultant',
                location: 'Purworejo, Jawa Tengah',
                achievements: [
                    <>Mengawasi dan memastikan keamanan infrastruktur jaringan dan melakukan konfigurasi firewall dan sistem deteksi intrusi (IDS/IPS).</>,
                    <>Melakukan penilaian kerentanan pada aplikasi dan jaringan untuk mengidentifikasi risiko, serta mengaudit sistem secara berkala untuk memastikan kepatuhan terhadap standar keamanan.</>,
                    <>Melakukan simulasi serangan siber (Penetration Testing) untuk mengidentifikasi potensi celah keamanan pada sistem pemerintah.</>,
                    <>Merespons dan menangani insiden keamanan siber, seperti serangan ransomware, phishing, atau malware, dengan membuat laporan insiden serta memberikan rekomendasi mitigasi.</>,
                    <>Melaksanakan pelatihan untuk staf mengenai keamanan data, perlindungan privasi, serta praktik terbaik dalam penggunaan teknologi informasi untuk memastikan kepatuhan terhadap standar keamanan yang berlaku.</>,
                ],
                images: [ ]
            },
            {
                company: 'Team SoloMid',
                timeframe: '2017 - 2022',
                role: 'Moderation Staff',
                location: 'Remote',
                achievements: [
                    <>Memantau dan memastikan interaksi pemain dan penggemar di saluran komunikasi resmi Team SoloMid tetap sesuai dengan pedoman dan kebijakan komunitas.</>,
                    <>Menangani laporan pelanggaran, seperti perilaku buruk, pelecehan, dan kecurangan dalam game, serta mengambil tindakan yang diperlukan, termasuk memberi peringatan atau pemblokiran akun.</>,
                    <>Berkolaborasi dengan tim manajemen untuk mengembangkan kebijakan moderasi yang efektif dan responsif terhadap tren dan isu-isu komunitas yang baru muncul.</>,
                    <>Membantu dalam pelaksanaan acara dan streaming langsung, memastikan pengalaman positif bagi penggemar dan partisipan.</>
                ],
                images: []
            },
            {
                company: 'T.I.A',
                timeframe: '2017 - 2018',
                role: 'Data Analyst',
                location: 'DKI Jakarta',
                achievements: [
                    <>Mengumpulkan, menganalisis, dan menginterpretasi data untuk memberikan wawasan yang berguna bagi pengambilan keputusan strategis perusahaan.</>,
                    <>Membuat laporan analisis data yang membantu tim manajemen dalam memahami tren pasar, perilaku konsumen, dan kinerja produk.</>,
                    <>Menggunakan alat analisis data seperti Excel, Python, atau SQL untuk memproses dan menganalisis data dalam jumlah besar.</>,
                    <>Melakukan verifikasi dan validasi data untuk memastikan keakuratan dan kelengkapan informasi yang digunakan dalam laporan bisnis.</>
                ],
                images: []
            },
            {
                company: 'ACC Super Sambal',
                timeframe: '2017',
                role: 'Waiter',
                location: 'Kutoarjo, Jawa Tengah',
                achievements: [],
                images: [ ]
            },
            {
                company: 'CV. Sukamenak Jaya',
                timeframe: '2016',
                role: 'PPIC',
                location: 'Bandung, Jawa Barat',
                achievements: [
                    <>Menyusun rencana produksi bulanan dan mingguan untuk memastikan ketersediaan produk yang cukup untuk memenuhi permintaan pasar.</>,
                    <>Mengelola dan mengawasi tingkat persediaan bahan baku dan produk jadi, serta memastikan bahwa persediaan tetap berada pada tingkat optimal untuk menghindari kekurangan atau kelebihan stok.</>,
                    <>Berkoordinasi dengan tim produksi untuk memastikan jadwal produksi berjalan sesuai rencana dan dapat memenuhi target waktu yang ditetapkan.</>,
                ],
                images: [ ]
            },
            {
                company: 'Dapur Sambal',
                timeframe: '2015 - 2016',
                role: 'Waiter',
                location: 'Bekasi, Jawa Barat',
                achievements: [],
                images: [ ]
            },
            {
                company: 'Empatha Boga',
                timeframe: '2013 - 2015',
                role: 'Helper & Waiter',
                location: 'Kebumen, Jawa Tengah',
                achievements: [
                  <>Membantu tim dapur dalam menyiapkan bahan makanan dan kebutuhan operasional sehari-hari.</>,
                  <>Berperan aktif dalam mengelola dan memastikan ketersediaan inventaris bahan makanan serta peralatan makan untuk mendukung kelancaran operasional.</>
                ],
                images: [ ]
            }
        ]
    },
    studies: {
        display: false, // set to false to hide this section
        title: 'Studies',
        institutions: [
            {
                name: 'University of Jakarta',
                description: <>Studied software engineering.</>,
            },
            {
                name: 'Build the Future',
                description: <>Studied online marketing and personal branding.</>,
            }
        ]
    },
    technical: {
        display: false, // set to false to hide this section
        title: 'Technical skills',
        skills: [
            {
                title: 'Figma',
                description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
                images: [
                    {
                        src: '/images/projects/project-01/cover-02.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/cover-03.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                ]
            },
            {
                title: 'Next.js',
                description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
                images: [
                    {
                        src: '/images/projects/project-01/cover-04.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                ]
            }
        ]
    }
}

const partners = {
  display: true,
  items: [
    {
      name: "Diskominfo Purworejo",
      logo: "/trademark/pwr.svg",
    },
    {
      name: "LBH Yogyakarta",
      logo: "/trademark/LBHYogya.svg",
    },
    {
      name: "Tech In Asia",
      logo: "/trademark/tia-id.svg",
    },
    {
      name: "TSM",
      logo: "/trademark/TSM.svg",
    },
    {
      name: "Discord",
      logo: "/trademark/discord.svg",
    },
    {
      name: "BLAST.TV",
      logo: "/trademark/blast.svg",
    },
    {
      name: "Musixmatch",
      logo: "/trademark/mxm.svg",
    },
    {
      name: "HacktoberFest",
      logo: "/trademark/hacktoberfest.svg",
    },
    {
      name: "Holopin",
      logo: "/trademark/holopin.svg",
    },
    {
      name: "ACode",
      logo: "/trademark/acode.svg",
    },
  ]
}

const blog = {
    label: 'Tulisan',
    title: 'Tulisan',
    description: `Artikel di halaman ini berisi dokumentasi dari tulisan dan opini saya untuk bahan pembelajaran maupun bacaan semata. Beberapa artikel saya tulis dalam Bahasa Inggris agar dapat bermanfaat dan dibaca oleh teman-teman dari mancanegara.`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Projek',
    title: 'Projek',
    description: `Projek oleh ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Galeri',
    title: 'Galeri',
    description: `Koleksi foto ${person.name}`,
    images: [
        { 
            src: '/images/gallery/img-01.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-02.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-03.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-04.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-05.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
    ]
}

const music = {
    label: 'Musik',
    title: 'Musik',
    description: `Temukan lagu dan artis yang paling sering diputar ${person.name} di Spotify.`,
    images: [
        { 
            src: 'https://music.youtube.com/watch?v=6t_TZ4hbAMo&si=1r0nzTqlaoqVxkjl',
            alt: 'video',
            orientation: 'horizontal'
        },
        { 
            src: 'https://music.youtube.com/watch?v=UPTnaWBr8B4&si=M7Yf3XxrcT7SDO_Y',
            alt: 'video',
            orientation: 'horizontal'
        },
    ]
}

export { person, social, newsletter, home, about, partners, blog, work, gallery, music };