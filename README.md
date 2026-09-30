# forty2.me

A static personal homepage built with React, TypeScript, and Vite. The homepage includes a small command interface and conventional links so visitors can browse without using terminal commands.

## Local development

```sh
npm install
npm run dev
```

Create a production build with `npm run build`. Cloudflare Pages can deploy the generated `dist/` directory; the `public/_redirects` file keeps direct visits and refreshes on `/resume` and `/github` on the single-page app.

## Profile content

Update `src/site.ts` with the confirmed profile URLs, email address, and resume PDF path. The homepage fetches `fortii2/fortii2`'s public README without browser caching each time the home route is opened, and omits its CV link because resume navigation lives in the site shell.

After the new resume is live, configure a Cloudflare Redirect Rule for `cv.forty2.me/*` to send visitors to `https://forty2.me/resume`. The root domain's DNS and Cloudflare Pages custom domain should point to this Pages project.
