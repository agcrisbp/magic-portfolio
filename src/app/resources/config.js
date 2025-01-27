const baseURL = "magic-rose.vercel.app";
const Email = 'email@email.com';
const UserID = '982268021143896064'; // DiscordID use Lanyard
const longLat = 'lat=-7.795580&lon=110.369492'; // Weather APi use https://openweathermap.org/api

const routes = {
  "/":                true,
  "/about":           true,
  "/work":            true,
  "/blog":            true,
  "/gallery":         true,
  '/music':           true,
};

// Enable password protection on selected routes
// Set password in pages/api/authenticate.ts
const protectedRoutes = {
  "/blog/analisis-penyebab-kebocoran-data-di-indonesia":         true,
};

const style = {
  theme: "dark", // dark | light
  neutral: "gray", // sand | gray | slate
  brand: "emerald", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "cyan", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "color", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
};

const effects = {
  mask: {
    cursor: true,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: true,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "static-transparent",
    opacity: 100,
  },
  dots: {
    display: true,
    size: "2",
    color: "brand-on-background-weak",
    opacity: 30,
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
  time: true,
};

const mailchimp = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: false,
      x: 100,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      x: 100,
      y: 50,
      width: 100,
      height: 100,
      tilt: -45,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
      opacity: 100,
    },
    dots: {
      display: false,
      size: 24,
      color: "brand-on-background-weak",
      opacity: 100,
    },
    lines: {
      display: false,
      color: "neutral-alpha-weak",
      opacity: 100,
    },
    grid: {
      display: true,
      color: "neutral-alpha-weak",
      opacity: 100,
    },
  },
};

export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL, Email, UserID, longLat };
