import { InlineCode } from "@/once-ui/components";

const createI18nContent = (t) => {
    const person = {
        firstName: 'Agcrismanto Budhi',
        lastName:  'Praswastyka',
        get name() {
            return `${this.firstName} ${this.lastName}`;
        },
        role:      t("person.role"),
        avatar:    '/images/logo.png',
        location:  'Asia/Jakarta',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
        languages: ['English', 'Bahasa']  // optional: Leave the array empty if you don't want to display languages
    }

    const newsletter = {
        display: false,
        title: <>{t("newsletter.title", {role: person.role})}</>,
        description: <>{t("newsletter.description")}</>
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
        label: t("home.label"),
        title: t("home.title", {name: person.name}),
        description: t("home.description", {role: person.role}),
        headline: <>{t("home.headline")}</>,
        subline: <>{t("home.subline")}</>
    }

    const about = {
        label: t("about.label"),
        title: t("about.label"),
        description: t("about.description", {name: person.name, role: person.role, location: person.location}),
        tableOfContent: {
            display: true,
            subItems: true
        },
        avatar: {
            display: true
        },
        calendar: {
            display: true,
            link: 'https://cal.com'
        },
        resume: {
            display: true // edit src/components/resumeModal.tsx
        },
        intro: {
            display: true,
            title: t("about.intro.title"),
            description: <>{t("about.intro.description")}</>
        },
        work: {
            display: true,
            title: 'Resume',
            experiences: [
                {
                    company: 'BLAST',
                    timeframe: t("about.work.experiences.BLAST.timeframe"),
                    role: 'Web Developer & Cybersecurity',
                    location: 'Denmark',
                    achievements: [
                        t("about.work.experiences.BLAST.achievements.BLAST-1"),
                        t("about.work.experiences.BLAST.achievements.BLAST-2"),
                        t("about.work.experiences.BLAST.achievements.BLAST-3")
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
                    location: t("about.work.experiences.Diskominfo.location"),
                    achievements: [
                        t("about.work.experiences.Diskominfo.achievements.Diskominfo-1"),
                        t("about.work.experiences.Diskominfo.achievements.Diskominfo-2"),
                        t("about.work.experiences.Diskominfo.achievements.Diskominfo-3"),
                        t("about.work.experiences.Diskominfo.achievements.Diskominfo-4"),
                        t("about.work.experiences.Diskominfo.achievements.Diskominfo-5")
                    ],
                    images: []
                },
                {
                    company: 'TSM',
                    timeframe: '2017 - 2022',
                    role: 'Moderation Staff',
                    location: 'Remote',
                    achievements: [
                        t("about.work.experiences.TSM.achievements.TSM-1"),
                        t("about.work.experiences.TSM.achievements.TSM-2"),
                        t("about.work.experiences.TSM.achievements.TSM-3"),
                        t("about.work.experiences.TSM.achievements.TSM-4")
                    ],
                    images: []
                },
                {
                    company: 'T.I.A',
                    timeframe: '2017 - 2018',
                    role: 'Data Analyst',
                    location: 'DKI Jakarta',
                    achievements: [
                        t("about.work.experiences.TIA.achievements.TIA-1"),
                        t("about.work.experiences.TIA.achievements.TIA-2"),
                        t("about.work.experiences.TIA.achievements.TIA-3"),
                        t("about.work.experiences.TIA.achievements.TIA-4")
                    ],
                    images: []
                },
                {
                    company: 'ACC Super Sambal',
                    timeframe: '2017',
                    role: 'Waiter',
                    location: t("about.work.experiences.SS.location"),
                    achievements: [],
                    images: [ ]
                },
                {
                    company: 'CV. Sukamenak Jaya',
                    timeframe: '2016',
                    role: 'PPIC',
                    location: t("about.work.experiences.PPIC.location"),
                    achievements: [
                        t("about.work.experiences.PPIC.achievements.PPIC-1"),
                        t("about.work.experiences.PPIC.achievements.PPIC-2"),
                        t("about.work.experiences.PPIC.achievements.PPIC-3")
                    ],
                    images: [ ]
                },
                {
                    company: 'Dapur Sambal',
                    timeframe: '2015 - 2016',
                    role: 'Waiter',
                    location: t("about.work.experiences.DS.location"),
                    achievements: [ ],
                    images: [ ]
                },
                {
                    company: 'Empatha Boga',
                    timeframe: '2016',
                    role: 'Helper & Waiter',
                    location: t("about.work.experiences.EB.location"),
                    achievements: [
                        t("about.work.experiences.EB.achievements.EB-1"),
                        t("about.work.experiences.EB.achievements.EB-2")
                    ],
                    images: [ ]
                },
            ]
        },
        studies: {
            display: false, // set to false to hide this section
            title: 'Studies',
            institutions: [
                {
                    name: 'Build the Future',
                    description: <>{t("about.studies.institutions.Build the Future.description")}</>,
                }
            ]
        },
        technical: {
            display: false, // set to false to hide this section
            title: t("about.technical.title"),
            skills: [
                {
                    title: 'Figma',
                    description: <>{t("about.technical.skills.Figma.description")}</>,
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
                    description: <>{t("about.technical.skills.Nextjs.description")}</>, // "." not accepted in next-intl namespace
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
        label: t("blog.label"),
        title: t("blog.title"),
        description: t("blog.description", {name: person.name})
        // Create new blog posts by adding a new .mdx file to app/blog/posts
        // All posts will be listed on the /blog route
    }
    
    const tag = {
        label: t("tag.label"),
        title: t("tag.title"),
        description: t("tag.description")
    }

    const work = {
        label: t("work.label"),
        title: t("work.title"),
        description: t("work.description", {name: person.name})
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
        label: t("music.label"),
        title: t("music.title"),
        description: t("music.description", {name: person.name}),
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

    return {
        person,
        social,
        newsletter,
        home,
        about,
        partners,
        blog,
        tag,
        work,
        gallery,
        music
    }
};

export { createI18nContent };