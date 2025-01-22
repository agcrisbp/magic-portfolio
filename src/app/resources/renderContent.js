import { person, newsletter, social, home, about, partners, blog, work, gallery, music } from './content';
import { createI18nContent } from './content-i18n';
import { i18n } from './config';

const renderContent = (t) => {
    if ( i18n ) {
        return createI18nContent(t);
    } else {
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
        }
    }
};

export { renderContent };