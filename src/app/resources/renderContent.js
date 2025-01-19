import { person, newsletter, social, home, about, partners, blog, work, gallery, music } from './content';

const renderContent = () => {
    return {
        person,
        social,
        newsletter,
        home,
        about,
        partners,
        blog,
        work,
        gallery,
        music
    };
};

export { renderContent };