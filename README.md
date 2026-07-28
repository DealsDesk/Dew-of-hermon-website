# Dew of Hermon — Health & Wellness

Four-page marketing site for a body-scan and Green World supplement practice.
Built with Next.js (App Router), Tailwind CSS, GSAP and anime.js, and exported
as static files for Hostinger shared hosting.

## Deploying to Hostinger

Hostinger's shared plans (Unlimited/Premium/Business) serve files but do not run
Node, so the site is built into a folder of plain HTML/CSS/JS and uploaded.

```bash
npm install
npm run build      # writes the uploadable site to ./out
```

Then in hPanel:

1. **Files → File Manager**, open `public_html`.
2. Delete Hostinger's placeholder `default.php` / `index.html` if present.
3. Upload **everything inside `out/`** — the contents, not the folder itself.
   Zipping `out/` and using File Manager's *Upload → Extract* is quickest.
4. Confirm `.htaccess` came across. It is a hidden file, so switch on
   **Settings → Show hidden files** to see it. It sets the 404 page and
   caching rules.

Visit the domain and the site is live. To publish a change, rebuild and upload
the new `out/` contents over the old ones.

Once Hostinger has issued the free SSL certificate, uncomment the HTTPS
redirect block at the bottom of `public/.htaccess` and re-upload it. Doing that
before the certificate exists causes a redirect loop.

## Contact form

The form posts straight from the browser to [Web3Forms](https://web3forms.com),
which relays enquiries to the practice inbox. No server involved, which is what
makes it work on static hosting.

**It needs a key before it will send.** Get a free one from web3forms.com by
entering the destination email address, then put it in `.env.local`:

```bash
NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key-here
```

The key is compiled into the site at **build** time, so rebuild and re-upload
after setting it. Until then the contact page shows phone and email links
instead of a form — deliberately, rather than offering a form that silently
fails.

The access key is safe to expose in the bundled JavaScript: it only permits
sending to the address that registered it.

### Restoring the Resend backend

An earlier server-side handler using [Resend](https://resend.com) is preserved
at `app/_node-only/contact-route.ts`. It cannot run on shared hosting, but the
file's header comment explains how to reactivate it if the site ever moves to a
host that runs Node (Vercel, or a Hostinger VPS).

## Local development

```bash
npm run dev        # http://localhost:3000
```

Requires **Node 18.18+** (20+ recommended).

> On the home page the site deliberately loads behind mist — **scroll down** to
> part the clouds and reveal the hero.

## Project layout

```
app/
  page.tsx              Home (cloud reveal lives here, home only)
  about/                About
  services/             Body scan + supplement packages
  contact/              Contact form page
  _node-only/           Inactive Resend handler, kept for reference
components/
  CloudReveal.tsx       Scroll-scrubbed cloud parting (anime.js)
  MistMountains.tsx     Fractal ridgelines, snowcaps, atmospheric haze
  AnimatedLogo.tsx      Looping dew drips on the logo (anime.js)
  ScrollReveal.tsx      Scroll-triggered section reveals (GSAP)
  ContactForm.tsx       Web3Forms submission + fallback
  Nav / Footer / GlassCard
public/
  .htaccess             Apache rules, copied into out/ on build
  images/logo.png
```

## Still placeholder

Copy, the testimonial, phone number, address and opening hours are stand-ins.
Swap them for real details before launch — contact details live in
`components/Footer.tsx` and `app/contact/page.tsx`.
