# Dew of Hermon — Health & Wellness

Four-page marketing site for a body-scan and Green World supplement practice.
Built with Next.js (App Router), Tailwind CSS, GSAP and anime.js.

## Running it locally

Requires **Node 18.18 or newer** (Node 20+ recommended).

```bash
git clone https://github.com/DealsDesk/Dew-of-hermon-website.git
cd Dew-of-hermon-website
git checkout claude/install-frontend-design-skill-3zc9bi
npm install
npm run dev
```

Then open <http://localhost:3000>.

> On the home page the site deliberately loads behind mist — **scroll down** to
> part the clouds and reveal the hero.

## Contact form

The form posts to `app/api/contact/route.ts`, which sends mail through
[Resend](https://resend.com). Without credentials the rest of the site works
fine; the form just returns a message asking visitors to call or email instead.

To enable sending, create a `.env.local` in the project root (it is gitignored,
so it never reaches the repository):

```bash
RESEND_API_KEY=your_key_here
CONTACT_TO_EMAIL=dewofhermon225@gmail.com
CONTACT_FROM_EMAIL="Dew of Hermon <onboarding@resend.dev>"
```

`.env.example` holds the same keys as a template.

Until a domain is verified in Resend, the sandbox sender
(`onboarding@resend.dev`) can only deliver to the address on your own Resend
account. To send to real customers, verify `dewofhermon.co.za` under
**Domains** in Resend and set `CONTACT_FROM_EMAIL` to an address on it.

## Project layout

```
app/
  page.tsx            Home
  about/              About
  services/           Body scan + supplement packages
  contact/            Contact form page
  api/contact/        Form handler (Resend)
components/
  CloudReveal.tsx     Scroll-scrubbed cloud parting (anime.js)
  MistMountains.tsx   Fractal ridgelines, snowcaps, atmospheric haze
  AnimatedLogo.tsx    Looping dew drips on the logo (anime.js)
  ScrollReveal.tsx    Scroll-triggered section reveals (GSAP)
  Nav / Footer / GlassCard / ContactForm
public/images/logo.png
```

## Still placeholder

Copy, the testimonial, phone number, address and hours are written as
stand-ins — swap them for real details before launch. Contact details live in
`components/Footer.tsx` and `app/contact/page.tsx`.
