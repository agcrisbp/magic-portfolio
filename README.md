<a href='https://github.com/agcrisbp/github-clone-count-api'><img alt='GitHub Clones' src='https://img.shields.io/badge/dynamic/json?color=success&label=Clone&query=count&url=https://gist.githubusercontent.com/agcrisbp/528d07e9dd264f3989bb0fdbd47be1e8/raw/clone.json&logo=github'></a>

# **About**

Originally made by [Once UI - Magic Portfolio](https://aghea.vercel.app/once-ui), my main aim with this fork is to extend the project and introduce some new features. It is predominantly in Bahasa Indonesia, so feel free to use and edit what you need to.

View the [demo here](https://magic-rose.vercel.app).

![Magic Portfolio](public/images/cover.png)

# **Getting Started**

Magic Portfolio was built with [Once UI](https://once-ui.com) for [Next.js](https://nextjs.org). It requires Node.js v18.17+.

**1. Build This Project**

[Fork this repository](https://github.com/agcrisbp/magic-portfolio/fork). Or run the following command to create a new project with this template:
```
yarn create next-app app -e https://github.com/agcrisbp/magic-portfolio

# or npm

npx create-next-app app --example https://github.com/agcrisbp/magic-portfolio
```

**2. Run dev server**
```
yarn dev

# or npm

npm run dev
```

**3. Edit config**

[src/app/resources/config](src/app/resources/config.js).

**5. Edit content**

[src/app/resources/content](src/app/resources/content.js).

**6. Create blog posts / projects**

Add a new .mdx file to `src/app/[locale]/blog/posts` or `src/app/[locale]/work/projects`.

**7. Domain and redirects setup**

- Make sure your domain is already connected with [Vercel Nameservers](https://vercel.com/docs/projects/domains/working-with-nameservers), then change the [vercel.json](/vercel.json).
- Edit all `async redirects()` URLs in [next.config.mjs](next.config.mjs), [_redirects](public/_redirects) for Netlify.

# **Features**

## **Once UI**
- All tokens, components & features of [Once UI](https://once-ui.com).

## **SEO**
- Automatic open-graph and X image generation with `next/og`.
- Automatic schema and metadata generation based on the content file.

## **Design**
- Responsive layout optimized for all screen sizes.
- Timeless design without heavy animations and motion
- Endless customization options through [data attributes](https://once-ui.com/docs/theming).

## **Content**
- Render sections conditionally based on the content file.
- Enable or disable pages for blog, work, gallery and about / CV.
- Generate and display social links automatically.
- Set up password protection for URLs.

## **Localization**
- A localized version of Magic Portfolio is available with the next-intl library.

## **Spotify Now Playing & Recently Played**
- Display the currently playing track and recently played songs from Spotify.
- Automatically update the list of recently played tracks.
- Sync with Spotify to show real-time updates of what you're listening to.
- Customize the display of music information based on preferences.

## **Disqus Comments Integration**
- Integrate the Disqus comment system into your website for easy commenting.
- Conditionally render the Disqus comments section based on your page content.
- Enable or disable Disqus comments.
- Customize the Disqus settings to automatically display social links and integrate with your content.

> [!TIP]
> Read [Setting up Spotify Dev](https://github.com/agcrisbp/ADTify?tab=readme-ov-file#setting-up-spotify-dev).
>
> Read: [Setting up Discord](https://ad-link-docs.vercel.app/frontend#add-discord-status), and **YOU MUST** join [Lanyard Discord Server](https://discord.gg/lanyard).
>
> To integrate Disqus into your page, follow these steps:
>
> 1. **Create a Disqus Account:**
>    - Go to [Disqus](https://disqus.com/) and create an account if you don't have one.
>
> 2. **Add Your Site:**
>    - After logging in, navigate to the **Admin** panel and select **"Add Disqus to Site"**.
>    - Enter your site details (site name, category, etc.) and click **Finish**.
>
> 3. **Get the Embed Code:**
>    - Once your site is created, go to the **"Installation"** section in the Disqus admin panel.
>    - You will find the **Universal Embed Code** that includes the `script.src` for Disqus, like so:
>
> ```html
> <script id="dsq-count-scr" src="//example.disqus.com/count.js" async></script>
> <script>
>   var disqus_config = function () {
>     this.page.url = PAGE_URL;
>     this.page.identifier = PAGE_IDENTIFIER;
>   };
>
>   (function() { 
>     var d = document, s = d.createElement('script');
>     s.src = 'https://example.disqus.com/embed.js';
>     s.setAttribute('data-timestamp', +new Date());
>     (d.head || d.body).appendChild(s);
>   })();
> </script>
> ```
>
> 4. Copy the url and paste it into `script.src` inside [comments.tsx](src/app/blog/[slug]/comments.tsx).

---

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https://github.com/agcrisbp/magic-portfolio)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/agcrisbp/magic-portfolio)