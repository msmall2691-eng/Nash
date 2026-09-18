# Nash Construction — Website Guide

A plain-English summary of what the new site is, what it does, and how quickly
it can be changed. No technical background needed.

Built by [MLinx Studio](https://www.mlinx.studio).

---

## 1. What this is, in one paragraph

It is a brand-new website for Nash Construction, LLC that replaces the old one.
It is built the way modern sites are built — the pages are pre-assembled ahead
of time, so they open almost instantly on a phone, and there is no separate
"website software" sitting underneath it that needs patching every month. It
tells Google exactly who Nash Construction is, where it works, and what it
builds, in the machine-readable format Google actually reads.

---

## 2. Where it lives

Three pieces, and it helps to know which is which because they get confused.

**The code lives on GitHub** (`msmall2691-eng/Nash`). That is the master copy
and the full history — every change ever made, who made it, and why. If
everything else disappeared tomorrow, the site could be rebuilt from this in
about five minutes.

**The site is hosted on Vercel.** Vercel is the company that makes Next.js, the
framework the site is built with, so this is the platform it was designed to run
on. The pages are pre-built and copied to servers around the world, so a visitor
in Nashua is served from New England rather than from one machine somewhere.
There is no server to patch, no WordPress to update, and nothing that can be
hacked through a plugin — because there are no plugins.

**Publishing is automatic.** A change is saved to GitHub, Vercel notices within
seconds, rebuilds the site, and swaps it in — usually about two minutes end to
end. Nobody uploads anything. If a build ever fails, the old version stays up;
a broken change cannot take the site down.

**Right now it lives at `nash-alpha.vercel.app`** and is deliberately hidden
from Google — every page carries an instruction telling search engines not to
index it. That is what you want for a review link: nobody should be able to
Google their way to a draft, and a copy of the site sitting on a vercel.app
address could otherwise end up competing with their real website later.

Anyone with the link can still open it. It is hidden from search, not
password-protected.

When Nash approves it, their real domain (nashconstructionnh.com) gets pointed
here and the hide-from-Google instruction lifts **by itself** — the site knows
the difference between its temporary address and the real one, so there is no
switch anyone has to remember to flip. That is the moment the SEO work starts
counting.

**Their email is not affected by any of this.** Pointing the website domain at
Vercel changes where *web* traffic goes. Their Google Workspace mail keeps
running on Google, untouched. These are separate records in the same domain
settings, and only the web ones change.

---

## 3. What's on it

**Home** — the hero line *"Built on 50 Years of Experience"* over downtown
Nashua, then the credibility strip (since 1976, BBB A+, Nashua-based), the five
service groups, featured projects, where you work, and a request-a-consultation
invitation at the bottom.

**Commercial**, **Industrial**, **Residential** — three separate pages, one per
market. These exist mainly for Google: someone searching "industrial contractor
southern NH" needs a page that is *about* that, not a paragraph buried on the
home page. Each one links straight through to the matching projects.

**Services** — the five groups: General Contracting, Renovations & Fit-Ups,
Mechanical & Electrical, Exterior & Site Work, and Maintenance & Emergency
Repair.

**Projects** — 15 projects with real photographs, filterable by market
(commercial / industrial / residential) and by type (retail, restaurant, office,
and so on). Click any photo to enlarge it; arrow keys move between them.

**About** — the history since 1976, Mark and Steve, and how a job actually runs.

**Contact** — the consultation request form, plus the office address and phone.

---

## 4. The things that aren't just brochure pages

**A live weather line.** Down in the footer it quietly says what the weather is
doing in Nashua right now — *"Nashua right now · 70°F, clear."* When it's
freezing, snowing or storming, it adds *"a day we plan around."* It is
deliberately small and unshowy. It is there because weather is the single
biggest variable in a New Hampshire build schedule, and a contractor's site that
knows today's weather reads as a business that is actually paying attention
rather than a page someone built in 2014 and forgot. It costs nothing to run and
needs no account anywhere.

**A "do we work in your town?" checker.** On the home page, a visitor types
their town and gets an instant answer — *"Yes, Bedford is in our Manchester Area
service area"* — with a one-click path into the contact form with the town
already filled in. If the town isn't on the list, it doesn't say no; it says the
list is where you work most, not a boundary, and shows the phone number.

It is **not** an estimator and never will be. Putting a price calculator on a
commercial contractor's website invents a number nobody at Nash agreed to, and
the customer remembers that number for the rest of the conversation.

**Photo protection.** Right-click "save image," drag-to-desktop, and long-press
on a phone are all blocked on every project photo. To be straight about it: this
stops casual copying, not a determined person with a screenshot key. There is
also a watermarking option available if you ever want it burned in.

**Image SEO.** Every photo has descriptive text attached automatically, and
there's a dedicated photo sitemap submitted to Google — so the project photos
can turn up in Google Images searches on their own, not just when someone finds
the page first.

**Structured business data.** Invisible to visitors, read by Google: the
founding year, the BBB accreditation, leadership, all 31 trades, every town
served, and the full project list. This is what feeds the business panel that
appears beside search results.

---

## 5. What happens when someone fills in the form

They enter name, company, email, phone, town, project type, budget range and
details. The form checks it, shows a confirmation with a reference number, and
emails the request straight to Steve's inbox. Nothing is stored in a database
and there is no separate dashboard to log into — the inquiry arrives as an
email, and hitting Reply goes back to the customer, not to us.

**One thing to know:** delivery isn't switched on yet. It's built and waiting
on three settings. Until those are added, the form looks and behaves normally
to a visitor but the request only gets logged, not delivered. That was left off
on purpose so nothing goes to a live inbox during review. It's a ten-minute job
whenever you're ready.

### Why not just send it from their Google Workspace account?

This comes up every time, and it's a fair question — they already pay for
Google, so why involve anything else?

The thing to understand is that **a website cannot "just send" an email.** The
website's server has to log in to some mail service and ask it to send, exactly
like Outlook logging into an account. So the real question is: which mail
service, and what credential do we leave sitting on the server?

There are two realistic answers:

**Option A — log in to their Gmail with an App Password.** Free, works today, no
DNS changes, 2,000 messages a day. The catch is what the credential can do. An
App Password is a key to that mailbox. If it ever leaked, whoever had it could
send email *as Steve*, to anyone. It lives encrypted in Vercel's settings so
this isn't reckless — but it's a house key when all we need is a mail slot.

**Option B — a sending service (Resend), which is what's built.** Its key can
do exactly one thing: send. It cannot read their mail, open their Drive, see
their calendar, or send from any other address. If it leaked, we revoke it in
one click and their Google account never knew it existed. It also signs mail
cryptographically as coming from nashconstructionnh.com, which is what keeps
inquiries out of the spam folder.

**And it's free.** This is the part worth saying plainly, because "use a service"
sounds like a bill: Resend's free tier is **3,000 emails a month, 100 a day, no
credit card**. A contractor might see twenty inquiries in a busy month. There is
no version of this business that outgrows the free tier.

There's a third option people suggest — Google's own SMTP relay, which is free
with Workspace and allows 10,000 a day. It doesn't fit here: it identifies the
sender by IP address, and Vercel's servers don't have a fixed one. Nothing to
allowlist.

**One rule that applies no matter which we pick:** the email has to be sent
*from* an address on their domain, with the customer's address set as the
reply-to. Sending it "from" the customer's Gmail address is the classic mistake
— Google sees a stranger's server claiming to be Gmail and files it as spam, or
drops it. The form is already built the right way round.

**Recommendation:** stay with Resend on the free tier. Setup is adding three
DNS records to nashconstructionnh.com, on a subdomain specifically so it doesn't
touch the mail records Google Workspace owns — their email keeps working
throughout, and this can be done while the old Wix site is still live. If they'd
rather not touch DNS at all, Option A is a legitimate fallback and can be
swapped in without changing anything a visitor sees.

**Separately worth knowing about safety:** the form already rejects junk
submissions before they're emailed and limits how fast one visitor can submit,
so the inbox doesn't become a spam target.

---

## 6. How fast can changes be made?

Once a change is approved, it's live roughly **two minutes** after it's made —
that's just the site rebuilding itself and going out. There is no "maintenance
window," no waiting for a host, and nothing to schedule.

The time is in making the change, not in publishing it:

| Change | Realistic turnaround |
| --- | --- |
| Phone number, email or address | Minutes — it lives in one place and updates everywhere at once |
| Adding a town to the service area | Minutes — the checker, the form's town list, the footer and the SEO keywords all pick it up automatically |
| Fixing or rewording text on any page | Same day |
| Adding a project with a photo | Same day |
| Swapping the hero image | Same day |
| Adding a testimonial | Same day |
| A new service group or capability | One to two days |
| A whole new page | Two to three days |
| Redesigning a section | About a week |

The reason the small changes are genuinely minutes and not "we'll get to it" is
that the site was built with one settings file behind it. Change the phone
number in that one spot and it updates in the header, the footer, the contact
page, the form's confirmation message, and the data Google reads — all at once.
There is no hunting through pages hoping you caught every copy of it.

**Seasonal and recurring things are already automatic.** The copyright year
updates itself. So does "50 years" — it's calculated from 1976, so it becomes
"51 years" on its own. Nobody has to remember.

---

## 7. What we'd still like from the client

1. **One more photo** — Girls Inc. is the only project without one. It currently
   shows a tidy "photography coming soon" panel rather than a stock image.
2. **Details on the five older projects** — square footage, year, scope. Their
   entries were deliberately left thin rather than guessed at, because these are
   real businesses and made-up specifics would be on the internet under Nash's
   name.
3. **What is Mark Nash's role now?** We've updated the site so Steve shows as
   President. Mark is still credited as the founder and still appears in the
   company history — that's a fact about 1976 and doesn't change. But we
   deliberately did not give him a new title on the leadership section, because
   nobody told us one and making one up about a real person is not something
   we'll do. Tell us his current role (or that he's retired / no longer
   involved) and we'll add it in minutes.
4. **Confirm the phone number.** The site uses 603-943-7593 from the old site.
   Google and Yelp show 603-882-2702, which belongs to Nash Group — a different
   company.
5. **Claim the Google and Yelp listings.** Both are currently unclaimed and one
   carries the wrong company's phone number. This is the single highest-value
   thing available for local search ranking — more than anything else on this
   list, and more than anything left to do in the site itself.

---

## 8. Running costs

| Piece | Cost |
| --- | --- |
| Hosting (Vercel) | Runs on MLinx Studio's existing account — this site adds nothing to that bill |
| Code storage (GitHub) | Free |
| Weather data (Open-Meteo) | Free, no account, no key |
| Contact form email (Resend) | Free — 3,000/month, 100/day |
| Domain name | Whatever they already pay their registrar; unchanged |
| Google Workspace | Whatever they already pay; unchanged |

Nothing here has a usage cliff a contractor's website can fall off. If the site
ever did outgrow the free email tier, the next step up is $20/month for 50,000
messages — which would mean roughly 1,600 inquiries a day, and a very different
conversation.
