# Nash Construction — Website Guide

The lowdown on the new site: what it is, where it lives, what it costs, and how
fast it can change. No technical background needed.

Built by [MLinx Studio](https://www.mlinx.studio) · Review link:
**https://nash-alpha.vercel.app**

---

## What it is

A new website for Nash Construction, LLC replacing the old one. The pages are
built ahead of time and served from servers around the country, so it opens
almost instantly on a phone. There's no website software underneath it that
needs patching, and no plugins that can be hacked — because there are none.

It also tells Google exactly who Nash Construction is, where it works and what
it builds, in the machine-readable format Google actually reads.

---

## The pages

**Home** — *"Built on 50 Years of Experience"* over downtown Nashua, then the
credibility strip, the five service groups, featured projects, where you work,
and the consultation invitation.

**Commercial · Industrial · Residential** — one page per market. These exist
mainly for Google: someone searching "industrial contractor southern NH" needs
a page that's *about* that. Each links straight to the matching projects.

**Services** — the five groups: General Contracting, Renovations & Fit-Ups,
Mechanical & Electrical, Exterior & Site Work, Maintenance & Emergency Repair.

**Projects** — 15 projects with real photographs, filterable by market and by
type. Click any photo to enlarge it.

**About** — the history since 1976, Steve, and how a job actually runs.

**Contact** — the consultation form, the office address and the phone number.

---

## What it does that a brochure site doesn't

**Live weather.** The footer quietly shows conditions in Nashua right now —
*"72°F, clear."* When it's freezing or storming it adds *"a day we plan
around."* Weather is the biggest variable in a New Hampshire build schedule, and
a site that knows today's weather reads as a business paying attention. Costs
nothing and needs no account.

**A "do we work in your town?" checker.** On the home page. Type a town, get an
instant answer — *"Yes, Bedford is in our Manchester Area service area"* — with
one click into the contact form, town already filled in. If the town isn't on
the list it doesn't say no; it says the list is where you work most, not a
boundary, and shows the phone number.

It is **not** a price estimator and won't be. Putting one on a commercial
contractor's site invents a number nobody at Nash agreed to, and the customer
remembers that number for the rest of the conversation.

**Photo protection.** Right-click "save image", drag-to-desktop and phone
long-press are blocked on every project photo. Straight answer: that stops
casual copying, not a determined person with a screenshot key. Watermarking is
available if you ever want it.

**Image SEO.** Every photo carries descriptive text automatically, and there's a
dedicated photo sitemap for Google — so project photos can turn up in Google
Images on their own.

---

## The contact form

Name, company, email, phone, town, project type, budget and details. It checks
the entry, shows a confirmation with a reference number, and emails the inquiry
straight to Steve. Nothing is stored in a database, there's no dashboard to log
into, and hitting Reply goes back to the customer.

**Delivery isn't switched on yet** — it's waiting on three settings, left off on
purpose so nothing hits a live inbox during review. Ten-minute job when you're
ready.

The form sends through a service called Resend rather than logging into the
Gmail account directly. A website can't send email on its own; it has to log in
somewhere, and the question is what credential sits on the server. A Gmail app
password is a key to the whole mailbox — leaked, someone could send email as
Steve. The Resend key can only send, from one verified address, and revoking it
never touches the Google account. It's free at 3,000 emails a month against
maybe twenty inquiries, and setting it up doesn't disturb Google Workspace mail.

The form also screens junk submissions and limits how fast one visitor can
submit, so the inbox doesn't become a spam target.

---

## Where it lives — and the Wix question

The code lives on GitHub (the master copy and full history). The site is hosted
on Vercel, the company that makes the framework it's built with. A change is
saved, Vercel rebuilds and swaps it in — about two minutes, no uploads. If a
build ever fails the old version stays up, so a bad change can't take the site
down.

**Right now it's at `nash-alpha.vercel.app` and hidden from Google** — every
page tells search engines not to index it. Anyone with the link can open it;
it's hidden from search, not password-protected. When Nash approves it, the real
domain gets pointed here and that hide-from-Google instruction lifts **by
itself**. No switch anyone has to remember.

**Can this go on Wix? Honestly, no.** Wix is a closed platform — you build with
their editor and their building blocks, and there's no way to upload a site like
this and have it run. Putting it on Wix would mean rebuilding it from scratch in
their editor, and several things wouldn't survive the move: the pre-built pages
that make it fast, the structured business data Google reads, the town checker,
the live weather, and the shareable links to filtered project views.

**The good news is you don't have to cancel Wix or waste the year you paid
for.** The domain and the website are two separate things:

- If the domain is registered through Wix, you **keep it**. Only the settings
  that say *where the website lives* change.
- The Wix plan can simply lapse at renewal. Until then the old site can stay up
  at a Wix address as a fallback.
- **Google Workspace email is not affected.** Email and website are different
  settings on the same domain, and only the website ones change.

---

## How fast can changes be made?

Once a change is approved it's live about **two minutes** later. No maintenance
window, nothing to schedule. The time is in making the change, not publishing:

| Change | Turnaround |
| --- | --- |
| Phone, email or address | Minutes — one place, updates everywhere at once |
| Adding a town to the service area | Minutes — the checker, the form, the footer and the SEO all pick it up |
| Rewording text on any page | Same day |
| Adding a project with a photo | Same day |
| Swapping the hero image | Same day |
| Adding a testimonial | Same day |
| A new service or capability | 1–2 days |
| A whole new page | 2–3 days |
| Redesigning a section | About a week |

Small changes are genuinely minutes because the site was built with one settings
file behind it. Change the phone number once and it updates in the header, the
footer, the contact page, the form's confirmation and the data Google reads — no
hunting through pages hoping you caught every copy.

**Recurring things are already automatic.** The copyright year updates itself.
So does "50 years" — it's calculated from 1976, so it becomes "51 years" on its
own. Nobody has to remember.

---

## What we still need from you

1. **One more photo** — Girls Inc. is the only project without one. It shows a
   tidy "photography coming soon" panel rather than a stock image.
2. **Details on five older projects** — square footage, year, scope. Those
   entries were left thin rather than guessed at, because these are real
   businesses and invented specifics would be online under Nash's name.
3. **Confirm three promises the site makes** — that someone answers after hours
   for emergencies, that emergency work is triaged the same day, and that every
   inquiry gets a reply within one business day. Reasonable things for a
   contractor to say, but they're commitments nobody has confirmed. Confirm
   them or we'll reword them.
4. **Confirm the phone number.** The site uses 603-943-7593 from the old site.
   Google and Yelp show 603-882-2702, which belongs to Nash Group — a different
   company.
5. **Claim the Google and Yelp listings.** Both are unclaimed, and Yelp shows
   that wrong number. The site links to Yelp from every page, so anyone clicking
   through lands on a listing with the wrong phone number. Claim and correct it,
   or tell us and we'll pull the link.

   This is the highest-value item on the list for local search ranking — worth
   more than anything else here, and more than anything left to do in the site.

---

## What it costs to run

| Piece | Cost |
| --- | --- |
| Hosting | Runs on MLinx Studio's existing account — adds nothing to your bill |
| Code storage | Free |
| Weather data | Free, no account |
| Contact form email | Free — 3,000/month, 100/day |
| Domain name | Whatever you already pay; unchanged |
| Google Workspace | Whatever you already pay; unchanged |

**Against Wix**, whose business plans run about $18–$40 a month — roughly
$215–$480 a year, every year, forever.

One honest note so there are no surprises later: if Nash ever wanted the site on
its own hosting account rather than MLinx Studio's, that's about $20/month —
still well under Wix, but not zero. As things stand today, it's zero.
