const baseURL = 'magic-en.vercel.app';
const Email = 'email@example.com';
const UserID = '982268021143896064'; // DiscordID use Lanyard
const longLat = 'lat=-7.795580&lon=110.369492'; // Weather APi use https://openweathermap.org/api

// Enable localization
const i18n = true;

// Manage localized content in the messages folder
const i18nOptions = {
    locales: ['id', 'en'],            // A list of all locales that are supported, e.g. ['en','id']
    defaultLocale: 'id'         // Locale used by default and as a fallback
}

const routes = {
    '/':                true,
    '/about':           true,
    '/work':            true,
    '/blog':            true,
    '/gallery':         true,
    '/music':           true,
};

const protectedRoutes = {
    '/blog/analisis-penyebab-kebocoran-data-di-indonesia': true,
};

const style = {
  theme: "dark", // dark | light
  neutral: "sand", // sand | gray | slate
  brand: "emerald", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "cyan", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "color", // color | contrast
  solidStyle: "plastic", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
};

const effects = {
  mask: 'cursor',
  gradient: {
    display: true,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "neutral-alpha-weak",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: 1,
    color: "brand-on-background-weak",
    opacity: 0.3,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
};

const display = {
    location: true,
    time:     true
}

const mailchimp = {
    action: 'https://ink.us21.list-manage.com/subscribe/post?u=71c4ab2344a6cbfe72136d322&amp;id=72c35f4e3d&amp;f_id=00a3aae1f0',
    effects: {
        mask: {
            cursor: false,
            x: 100,
            y: 0,
            radius: 100
        },
        gradient: {
            display: true,
            x: 100,
            y: 50,
            width: 100,
            height: 100,
            tilt: -45,
            colorStart: 'accent-background-strong',
            colorEnd: 'static-transparent',
            opacity: 100
        },
        dots: {
            display: false,
            size: 24,
            color: 'brand-on-background-weak',
            opacity: 100
        },
        lines: {
            display: false,
            color: 'neutral-alpha-weak',
            opacity: 100
        },
        grid: {
            display: true,
            color: 'neutral-alpha-weak',
            opacity: 100
        }
    }
}

export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL, i18n, i18nOptions, Email, UserID, longLat };