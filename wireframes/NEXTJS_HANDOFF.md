# Next.js rebuild: project overview & handoff spec

This spec is for the engineer or coding agent who will rebuild the clickable wireframe prototype as a production-grade **Next.js** app.

| | |
|---|---|
| **Source of truth** | `wireframes/prototype.html`: one self-contained HTML/CSS/vanilla-JS file, about 2,900 lines |
| **Supporting reference** | `wireframes/index.html`: design options A/B/C and the card & motion spec |
| **Goal** | Feature parity with the prototype, rebuilt with real components, typed data and a structure ready for a backend |

> **Read the prototype first.** Open `wireframes/prototype.html` in a browser and click through every flow listed in §10. Every behaviour in this document already works there. When this spec and the prototype disagree, **the prototype wins**. Each section below names the prototype function to read.

---

## 0. Copy-paste brief for the agent

```
Rebuild wireframes/prototype.html as a Next.js app in a NEW folder /web at the repo root.
Do not modify the existing Valentine app (/app, /package.json at root) or the wireframes folder.
Follow wireframes/NEXTJS_HANDOFF.md section by section, in the phase order in §12.
Target exact behavioural parity with the prototype. Open it in a browser and compare as you go.
Use: Next.js 15 (App Router), React 19, TypeScript strict, CSS Modules + global CSS tokens,
Zustand for client state, Playwright for e2e tests. No backend: all data is mocked in /web/lib/mock.
After each phase: run `npm run lint`, `npm run typecheck`, `npm run build`, and the Playwright
suite for that phase. Do not move on until all of them pass. Commit at the end of each phase.
```

---

## 1. What the product is

It's a community where creatives post work for inspiration and use their profile as a portfolio. It combines Pinterest-style browsing with Behance-style projects. Anyone with visual work can use it: designers, motion artists, illustrators, web designers, fashion designers, interior designers, makeup artists and more.

Core ideas the app must preserve:

1. **Every post is a project made of sections.** A section is one image or video block tagged with a type: "Hero", "Pricing", "Look", "Runway", "Living room"…
2. **Sections are the unit of everything.** Feed cards, saving, likes, search results, boosts and links all point at sections. Opening a card opens the whole project scrolled to that section.
3. **Motion posts play like GIFs.** They loop muted while in view (at most 3 at once), and you click for the full player with sound.
4. **A community layer:** follows, weekly challenge, rising creators, trending tags, activity, messages.
5. **Money:** boosts, keyword search ads, sponsored posts, featured creators, challenge sponsorship, featured jobs, talent search (Studio plan), Pro membership and tips. All of these sit in a "Promote & earn" hub with one shared checkout.

The chosen homepage design is the **"A × C hybrid"**:

- An icon rail on the left that expands on hover or can be pinned open.
- A header with search and an Upload button.
- Interest rings above the feed.
- A sticky feed bar holding the tabs and the format toggle.
- A masonry feed with community modules mixed in.
- A right-hand community rail, but only at 1536px and wider.

---

## 2. Ground rules

- **Location:** new standalone app in `/web` with its own `package.json`. Do **not** touch the root Valentine app, `/app` or `/wireframes`.
- **No backend yet.** All data comes from deterministic mock generators (§5). Keep data access behind a small repository layer (`/web/lib/data/*.ts`) so a real API can replace it later without touching components.
- **Keep the wireframe look.** It's greyscale with one accent (`#ff4b33`), and grey boxes with an X stand in for images. Branding comes later. Port the tokens exactly (§4).
- **No fake money.** Checkout is simulated, and the UI must say "Prototype checkout. No real payment is taken."
- **Accessibility:** real `<button>`s and links, focus-visible styles, `aria-*` on toggles and switches, Esc closes overlays, and `prefers-reduced-motion` is respected.
- **Deterministic data:** same seed → same feed, so tests are stable.

---

## 3. Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js 15, App Router | Pin exact versions in `package.json`, never `latest`. |
| Language | TypeScript, `strict: true` | |
| Styling | Global CSS variables (tokens) plus **CSS Modules** per component | The prototype's CSS ports almost 1:1. Don't add Tailwind unless you're asked to. |
| Client state | **Zustand** with slices | Use `persist` middleware **only** for settings and sidebar-pinned, as the prototype does with localStorage keys `wfp_set`, `wfp_pinned`, `wfp_hinted`. |
| Icons | Inline SVG components | Port the `P` path map from the prototype into `components/icons/Icon.tsx` (`<Icon name="search" size={16}/>`). |
| Tests | Playwright e2e plus Vitest for pure logic (ad slotting, keyword match, auction, filters) | |
| Lint/format | ESLint (next config) + Prettier | |

Scripts: `dev`, `build`, `start`, `lint`, `typecheck` (`tsc --noEmit`), `test` (vitest), `e2e` (playwright).

---

## 4. Design tokens & layout constants

Copy these into `web/app/globals.css` exactly. They come from the prototype's `:root`.

```css
:root{
  --bg:#fff; --surface:#f6f6f3; --fill:#ececE8; --fill2:#dededa; --fill3:#c4c4bd;
  --line:#e6e6e1; --line2:#d2d2cc; --ink:#1c1c1a; --ink2:#4a4a46; --muted:#8a8a84;
  --accent:#ff4b33; --accent-ink:#fff;
  --rail:72px; --railx:252px; --crail:320px; --hh:68px; --r:16px;
  --shadow:0 18px 50px -18px rgba(0,0,0,.28);
}
```

Placeholder tones `.t0`–`.t3`: `#ececE8 #e5e5e0 #efefeb #dfdfda`. Image placeholder is the "X" made of two diagonal linear-gradients on `--fill` (see `.ph` in the prototype). Motion placeholder: darker `#d6d6d0` with two drifting "blob" shapes animated by `@keyframes drift/drift2`. They only animate while the card has the `.playing` class.

Font: Inter, falling back to the system UI stack. Base 14px / 1.45.

Breakpoints (use these exact numbers):

| Width | Behaviour |
|---|---|
| ≥ 1536px | Right community rail (`--crail` 320px) visible; **in-feed community breaks switch off** |
| ≤ 1100px | Community break grid collapses to 2 columns; KPI tiles 2 columns |
| ≤ 900px | Project page stacks vertically; builder modals go single column |
| ≤ 767px | Rail hidden → **bottom tab bar** (Home, Search, Upload, Activity, Profile); 2-column feed; compact header |

Masonry column count: `max(2, min(6, floor((width + 16) / (230 + 16))))`, gap 16px. Use the shortest-column-first distribution (`masonryHTML`).

---

## 5. Data model (TypeScript)

Create `web/lib/types.ts`. These map 1:1 to prototype objects.

```ts
export type Discipline =
  | 'UI/UX' | 'Web design' | 'Branding' | '3D' | 'Motion' | 'Illustration' | 'Typography'
  | 'Photography' | 'Product' | 'Architecture' | 'Fashion' | 'Interior' | 'Hair & makeup' | 'Packaging';

export interface Creator {
  id: string; name: string; role: string; loc: string; cats: Discipline[];
  hire: boolean; studio?: boolean; bio?: string;
  followers: number; followingN: number; tone: 0|1|2|3;
}

/** A section = the card unit. (Called an "item" in the prototype: ITEMS / IT.) */
export interface Section {
  id: string; proj: string; sec: string;          // section type, e.g. "Pricing"
  style?: string;                                   // dark | light | minimal | bold | editorial | playful | monochrome | colourful
  title: string; creator: string; cat: Discipline;
  type: 'image' | 'motion'; ratio: number;          // height / width
  tone: 0|1|2|3; likes: number; views: number; days: number;
  dur: number;                                      // motion length in seconds
  tags: string[]; tools: string[]; desc: string;
  comments: Comment[]; challenge: boolean;
  feed?: boolean;                                   // false = searchable but not shown in feeds (sections 4+)
  src?: string | null; kind?: 'image' | 'video' | null; // user uploads (object URLs in the prototype)
  poster?: number; loopStart?: number; loopLen?: number;
  fresh?: number; unlisted?: boolean; tips?: number;
}

export interface Project {
  id: string; title: string; creator: string; cat: Discipline; desc: string;
  sections: string[];                               // ordered section ids; [0] is the cover
  credits: { who: string; role: string }[];         // [0] is the owner
}

export interface Comment { by: string; text: string; days: number; likes: number; liked: boolean; }
export interface Collection { id: string; name: string; secret: boolean; items: string[]; }
export interface Job { id: string; title: string; studio: string; loc: string; type: 'Full-time'|'Freelance'|'Contract';
  tags: string[]; days: number; remote: boolean; featured?: boolean; mine?: boolean; camp?: string; }
export interface Notification { id: string; type: 'save'|'follow'|'milestone'|'comment'|'challenge'|'tip';
  by?: string; item?: string; text: string; days: number; unread?: boolean; }
export interface Conversation { id: string; with: string; unread: boolean; days: number; msgs: { me: boolean; t: string }[]; }

// Monetization
export type CampaignType = 'boost'|'search'|'sponsored'|'featured'|'challenge'|'job';
export interface Campaign { id: string; type: CampaignType; name: string; detail: string;
  status: 'active'|'paused'|'scheduled'|'ended'; budget: number; spent: number; imps: number; clicks: number;
  saves?: number; follows?: number; itemId?: string; cpc?: number; place?: 'feed'|'rail'|'both'; }
export interface Promo { pid: string; itemId: string; kw: string[]; camp?: string; mine?: boolean; status?: string; }
export type MatchType = 'broad'|'phrase'|'exact';
export interface KeywordAd { id: string; adv: { type:'creator'; id:string } | { type:'brand'; id:string } | { type:'custom'; name:string; url:string; what?:string };
  headline: string; desc: string; cta: string; kws: [string, MatchType][]; neg?: string[];
  bid: number; q: number; posts?: string[]; place?: { top: boolean; sug: boolean }; mine?: boolean; camp?: string; status?: string; }
export interface SponsoredPost { id: string; brand?: string; brandObj?: { name:string; what:string; url:string };
  headline: string; cta: string; cats: Discipline[]; ratio: number; tone: number; src?: string|null; mine?: boolean; camp?: string; status?: string; }
export interface Invoice { id: string; date: string; desc: string; amount: number; }
export interface TipIn { by: string; amt: number; item: string; days: number; note: string; fee: number; }
```

### 5.1 Mock data generation (`web/lib/mock/`)

Port these generators from the prototype **in the same order**, using the **same seeded RNG**: `mulberry32`, seed `7`, via `rng()`, `pick()` and `shuffle()`. That keeps the data identical.

1. Constants: `CATS`, `CAT_W` (weights), `TITLES`, `TAGS`, `TOOLS`, `ALLTOOLS`, `CREATORS`, `COMMENTS`.
2. `mkItem()`: builds 150 base items, then the challenge entries, then "fresh from followed" items for `mira`, `kofi` and `priya`, then the user's own items (`MY`, creator `me` = Adam Ojo).
3. **Projects:** `SECTION_TYPES` (one vocabulary per discipline), `SEC_RATIO`, `STYLES`, `CREDIT_ROLES`. Then `projectify(item)` splits each item into a project of 1–5 sections; extra sections get `feed: k <= 2`. Then `showcase()` adds the hand-made projects: `w1` Fintech marketing site, `fa1` Denim capsule SS27, `in1` Lagos apartment refresh, `hm1` Bridal glam. After the studios, add `w2` SaaS landing page (Northwind) and `fa2` Ankara evening wear (Atelier Ndani).
4. Collections seed (`c1` 3D refs, `c2` Motion inspo, `c3` Brand systems, `c4` Dashboard UI, secret).
5. `JOBS` (j2 and j5 featured), `NOTIFS`, `CONVOS`.
6. Monetization seed:
   - Studio accounts with items: `paperkite`, `orbit`, `northwind`, `ndani`.
   - `BRANDS`: framewise, polyform, kinetic, inkwell.
   - `SPONSORED`, `PROMOS`, `KWADS` (k1 Paper Kite → *illustration*, k5 Inkwell, k2 Orbit, k3 Framewise, k6 Northwind → *landing page / pricing page*, k7 Ndani → *lookbook*, k4 Polyform).
   - `PTREND` (#kinetic-type), `TOPIC_SPONSORS`, `FEAT_POOL`, `CHAL`.
   - `CAMPS` (one ended boost), `INVOICES`, `TIPS_IN`.

Expose the data through repository functions (`getFeed(params)`, `getSection(id)`, `getProject(id)`, `searchSections(q, filters)`…). Components never import mock arrays directly.

---

## 6. Client state (Zustand)

Mirror the prototype's `S` object, split into slices.

| Slice | Fields (prototype names) |
|---|---|
| `feed` | `tab` (foryou/following/latest/popular), `format` (all/image/motion), `topic` (a discipline or 'all'), `filters` {time, hire, multi, tools[]}, `hideBreaks`, `newTopics` |
| `user` | `saved` {sectionId → collectionId}, `liked` Set, `following` Set, `hidden` Set, `sound` Set, `lastColl`, `interests`, `pinnedPosts`, `domain` |
| `search` | `scope` (all/image/motion/creators), `recent[]` |
| `settings` (persisted) | `autoplay`, `breaks`, `reduce`, `personalAds`, `pinned` (sidebar) |
| `social` | notifications, conversations, `unreadMsg`, `badgeSeen`, `remind`, `followedColls` |
| `jobs` | `jobf` filter, `applied`, `savedJobs`, `jobHl` |
| `money` | `pro`, `proPlan`, `boostCredits`, `studio` (false/'trial'/true), `credits`, `shortlist`, `hiddenAds`, `withdrawn`, `card`, `adsTab`, `talent` filters, campaigns, invoices, keyword ads, sponsored, promos |
| `ui` | modal stack, drawer (activity/messages + thread id), popover, toasts, `ptab` |

Rules:

- Collections, campaigns, jobs and uploads are **mutable in memory**, as in the prototype. Nothing persists except settings.
- Uploaded files use `URL.createObjectURL`. Revoke URLs when a project is deleted.

---

## 7. Routes (App Router)

The prototype uses hash routes (`#/home`, `#/search?q=`). Convert each to a real route:

| Prototype hash | Next.js route | Prototype function |
|---|---|---|
| `#/home` | `/` | `viewHome` |
| (rail "Following") | `/?tab=following` (same page, tab state in URL) | `viewHome` |
| `#/motion` | `/motion` | `viewMotion` |
| `#/search?q=&scope=&sec=&disc=` | `/search?q=&scope=&sec=&disc=` | `viewSearch` |
| `#/similar` | `/similar` | `viewSimilar` |
| `#/collections` · `#/collections/:id` | `/collections`, `/collections/[id]` | `viewCollections` |
| `#/profile/:id` | `/u/[id]` (`me` = current user) | `viewProfile` |
| `#/jobs` | `/jobs` | `viewJobs` |
| `#/talent` | `/talent` | `viewTalent` |
| `#/ads` | `/promote?tab=overview|campaigns|earnings|billing` | `viewAds` |
| *(modal)* project page | `/p/[sectionId]`, plus an **intercepting route** `@modal/(.)p/[sectionId]` so it opens as a modal over the feed and as a full page on refresh or a shared link | `openDetail` / `renderDetail` |

Shared shell (`app/(shell)/layout.tsx`): Rail, Header (search and Upload), MobileBar, CommunityRail (≥1536px), BackToTop, ModalHost, DrawerHost, PopoverHost, ToastHost.

---

## 8. Component map

```
web/
  app/
    layout.tsx, globals.css
    (shell)/layout.tsx
    (shell)/page.tsx                 Home
    (shell)/motion/page.tsx
    (shell)/search/page.tsx
    (shell)/similar/page.tsx
    (shell)/collections/page.tsx, [id]/page.tsx
    (shell)/u/[id]/page.tsx
    (shell)/jobs/page.tsx
    (shell)/talent/page.tsx
    (shell)/promote/page.tsx
    (shell)/p/[sectionId]/page.tsx   Full-page project
    (shell)/@modal/(.)p/[sectionId]/page.tsx
  components/
    shell/      Rail, RailCollections, Header, SearchBox, SearchDropdown, MobileBar, CommunityRail, BackToTop
    feed/       Feed (masonry + infinite scroll), MasonryChunk, Skeleton, FeedBar, InterestRings, ContextChips, EmptyState
    cards/      SectionCard, SaveGroup, CardHoverOverlay, PromotedCard, SponsoredCard, JobAdCard, CreatorHoverCard
    community/  CommunityBreak (3 rotating kinds), ChallengeBox, TrendBox, FollowRow, FeaturedRow
    project/    ProjectModal, ProjectStage, SectionBlock, MotionPlayer, ProjectPanel, SectionIndex, Credits, Comments, Insights
    upload/     UploadModal (steps Media → Details → Publish), Dropzone, SectionsEditor, CreditsEditor, TagInput, PosterPicker
    overlays/   Modal, ModalStack, Drawer, Popover, Toast, ConfirmDialog, PromptDialog
    social/     ActivityDrawer, MessagesDrawer, Thread
    search/     SponsoredResult, TakeoverBanner, SectionFilters, VisualSearchModal
    money/      Checkout, BoostBuilder, SearchAdBuilder, FeaturedBuilder, SponsoredBuilder, SponsorChallenge, PostJob,
                ProModal, TipModal, LeaveSite, PromoteHub (Overview/Campaigns/Earnings/Billing), CampaignTable, KpiTiles
    talent/     TalentFilters, TalentRow, Paywall
    settings/   SettingsModal, InterestsModal, EditProfileModal
    icons/      Icon.tsx
  lib/
    types.ts, rng.ts, format.ts (fmt, ago, dur, money)
    mock/*.ts, data/*.ts (repositories)
    store/*.ts (Zustand slices)
    feed/order.ts (ranking), feed/ads.ts (slotting), search/match.ts, search/auction.ts
    hooks/useMotionAutoplay.ts, useInfiniteFeed.ts, useMasonry.ts, useHotkeys.ts, useMediaQuery.ts
  e2e/*.spec.ts
```

---

## 9. Behaviour specs

Each item names the prototype function to port.

### 9.1 Shell
- **Rail** (`.rail`): 72px of icons. On hover it expands to 252px **as an overlay** after a 150ms delay. The pin button keeps it open and pushes content over (`applyPinned`, persisted). Items: Home, Following, Motion, Collections, Jobs, Promote & earn, then Activity (badge) and Messages (badge), Your collections (only when expanded), Settings and the profile button (menu: Your profile, Your collections, Promote & earn, Talent search, Go Pro / Manage Pro, Settings, Log out).
- **Header:** search field with a scope menu (All/Images/Motion/Creators), a "/" hint, a clear button and a camera button (visual search). Upload button.
- **Mobile (≤767px):** bottom tab bar with Upload in the centre.
- **Keyboard:** `/` focuses search. `Esc` closes the popover, then the top modal, then the drawer. In the project page: `←/→` previous/next card, `Space` play/pause, `S` save, `L` like.

### 9.2 Feed (`viewHome`, `homeList`, `order`, `mountFeed`, `loadMore`)
- Greeting line with "N new pieces from people you follow" (link → Following tab).
- **Interest rings:** an Edit ring opens the interests modal (minimum 3 picks), then All, then each interest. The dot means "new since last visit" and clears on visit. Scroll arrows appear when the row overflows.
- **Sticky feed bar** (top: `--hh`): tabs For you / Following / Latest / Popular, the format toggle, a filter button with a count badge. Filter popover: posted (any/24h/week/month), available for hire, multi-section projects, made with (tools). Active filters show as removable chips plus "Clear all".
- **Ranking:** For you = `log(likes)` + id jitter + follow boost + interest boost − age, with fresh uploads pinned first. Latest = by days. Popular = by likes. Following = followed creators only, newest first.
- Only sections with `feed !== false` appear in feeds.
- **Infinite scroll:** pages of 20, a skeleton for 520ms, loading starts 900px before the end. End state: "You're all caught up · N pieces" plus Back to top.
- **Community breaks** after each chunk (except the last), rotating: (0) challenge + rising creators + trending tags, (1) four rising-creator cards, (2) three curated collections with Follow. "Hide for today" has Undo. Breaks are off at ≥1536px (the right rail shows instead) and when the setting is off.
- **Topic takeover banner** for sponsored topics (§9.9).

### 9.3 Section card (`cardHTML`)
- Media keeps its aspect ratio. Web-design sections show a small browser bar.
- **Badges:**
  - Motion: duration.
  - Otherwise: section type, with a layers icon when the project has more than one section.
  - On profiles: "N sections".
  - Pinned and saved markers.
- **Hover overlay:** sound toggle (motion), collection picker plus Save, title "Section · Project", like, share (copies the link), more (⋯).
- Meta row: creator (hover 550ms shows the creator hover card) and the like count, or the "Promoted" label for promos.
- **More menu:**
  - Everyone: More like this, Copy link.
  - Own posts: Boost post, Pin to profile (Pro), Delete.
  - Other people's posts: Hide (with Undo), Report.
  - Promos also get: Why am I seeing this? and Hide this ad.

### 9.4 Motion autoplay (`updatePlaying`, `setPlaying`)
- IntersectionObserver with thresholds [0, .3, .6, .9, 1]. A card is a candidate at ≥60% visible.
- Play the **3 candidates closest to the viewport centre**, plus whichever card is hovered.
- Nothing plays when autoplay is off, when reduced motion is on, or while any modal is open.
- Real videos: `muted` unless the section is in the `sound` set. When a video stops playing, reset it to the poster frame.

### 9.5 Save & collections (`saveTo`, `unsave`, `openSaveMenu`)
- Save one-click saves to the last-used collection. The toast offers "Change", which opens the picker.
- The picker searches collections, offers "Create" with a name, and "Remove from X".
- Collections page: grid, new, rename, share, delete (with confirm), secret lock.
- Saving always applies to a **single section**.

### 9.6 Project page (`renderDetail`, `secBlockHTML`, `creditsHTML`)
- **Left stage** (dark): every section in project order, each with a "k/n · TYPE" label, style chip, Save group and copy link.
  - The opened section is highlighted and scrolled into view.
  - Motion sections: the opened one gets the full player (play/pause, time, seek, speed 1×/1.5×/2×/0.5×, mute, fullscreen). The others loop silently with a "Play with sound" button, which re-opens the page focused on that section.
- **Right panel:**
  - Creator with Follow.
  - Discipline label, project title, description, stats (posted, views, likes, sections, tips).
  - Challenge badge.
  - A note saying panel Save/Like apply to the opened section.
  - Action row: Save group, like, share, more, then **Boost** on your own posts or **Tip** on others'.
  - Tags (click to search) and tools.
  - **Sections index** (click to scroll; it highlights as you scroll the stage).
  - **Credits** (profile link, plus Hire, which opens a prefilled message).
  - **Insights** on your own posts: Pro-only, locked preview otherwise.
  - More by creator; comments (post, like, reply).
- Previous/next arrows follow the feed order.

### 9.7 Search (`viewSearch`, `renderSdrop`, `doSearch`)
- **Matching:** lowercase, drop stopwords (`page, section, ideas, inspiration, the, a, …`). Every remaining word must appear somewhere in title + tags + discipline + creator name + tools + section type + style.
- **Results:** header "N sections from M projects".
  - Scope tabs: All / Images / Motion / Creators. Creators shows a creator grid.
  - Related tag chips.
  - **Section** and **Discipline** filter chips with counts (only when there are two or more options). The active filter shows an × and lives in the URL.
- **Dropdown:**
  - Empty input: recent searches (removable, Clear), trending (with the promoted trend first), suggested creators.
  - Typing: "Search for …", a sponsored suggestion row, Work, **Sections** ("Pricing sections"), Tags, Creators.
  - Arrow keys and Enter navigate the list.
- **Visual search:** pick, drop or use a sample image → progress → `/similar` with the thumbnail.

### 9.8 Upload → "Create a project" (`openUpload`, `renderUpload`, `bindDetails`, `bindSections`, `finishPublish`, `projectFromUpload`)
- **Step 1, Media:**
  - Dropzone or browse; images (up to 20) or one video. A video replaces any images, with a toast.
  - Sample image project / sample motion buttons.
  - Pro note: "Motion up to 30s (60s with Pro)".
- **Step 2, Details:**
  - Preview.
  - For video: poster-frame slider and preview loop (6s/8s, start slider, "Preview loop").
  - Title (required, 80 chars), description, category (required).
  - Tags with suggestions per category (Enter or comma to add).
  - Tools, enter challenge, available for hire, visibility Public/Unlisted.
  - **Sections editor:** each file becomes a section, with a type picker using that discipline's vocabulary. Click a thumbnail to make it the cover.
  - **Credits editor:** collaborator plus role.
- **Step 3, Publish:** progress stages → "Your work is live" with Upload another, Boost this post, Go to profile, View post. The new project goes to the top of For you and Latest and gets an accent ring for 8 seconds.
- Closing with files present asks "Discard this upload?".

### 9.9 Monetization (prototype section "Monetization")
Shared rules, enforced in `lib/feed/ads.ts` with unit tests:

| Rule | Value |
|---|---|
| Feed ad slots | positions **3 and 13** of each 20-item chunk (max 2 per 20, never adjacent) |
| Slot rotation | `(chunk + slot) % 2` → promo / sponsored; chunk 1 slot 0 on Home (topic all, not motion) → featured job |
| Relevance | Respect topic, format and motion page. With personalised ads on, promos must match the user's interests. |
| No ads on | Following tab, profiles, collections |
| Pro members | No sponsored posts, topic takeovers or promoted trend. They **do** see promoted posts and search ads. |
| Search | Up to **2** sponsored results at the top, ranked by `bid × quality`. One promoted post at grid position 2; its organic duplicate is removed. |
| Typeahead | 1 sponsored row when the query has 3+ characters and matches a keyword (prefix or match) |
| Labelling | Every paid item says Promoted / Sponsored / Featured and has "Why am I seeing this?" with Hide and Ad settings |

Keyword matching (`kwMatch`):
- **exact:** equal, allowing a plural `s`.
- **phrase:** query contains the keyword.
- **broad:** any word overlaps, with stemming that removes 3 letters from words over 5 characters.
- Negative keywords exclude a match.

Auction:
- Rank = `bid × q`.
- The user's ad has q = 0.9.
- Cost per click = just above the next ad's bid, adjusted for quality scores (second-price), and never above your max bid.

Products (pricing in `PRICE`):
1. **Boost a post** (`openBoost`): goal (views/visits/followers), audience (auto/custom interests), search keywords, budget $10–$500, 3/7/14/30 days, estimated impressions at $4 per 1,000, live preview, Pro $10 credit.
2. **Search ads** (`openSearchAd`), 3 steps:
   - **Keywords:** planner showing searches/month, competition and suggested bid; match type; negative keywords.
   - **Ad:** advertise as your profile or a brand; headline, description, CTA, 3 showcase posts, placements (top / suggestions); live preview.
   - **Bid & budget:** max CPC, a "where you'd rank" line per keyword against named competitors, daily $5–$200, 7/14/30 days.
   - Entry points: Promote hub, and "Advertise on 'q' →" under search results.
3. **Featured creator spot** (`openFeatured`): placement feed $49 / rail $39 / both $79 a week; four weeks, one sold out; booking this week takes effect immediately.
4. **Sponsored post** (`openSponsored`, for brands): brand, site, headline, CTA, image, interests, budget $100–$5,000 at $6 per 1,000, duration.
5. **Sponsor a challenge** (`openSponsorChallenge`): $1,500 plus the prize ($1k / $2.5k / $5k); week #43 sold to Framewise; appears under "Coming up" in the challenge.
6. **Featured job** (`openPostJob`): Standard free, or Featured $99 / 30 days (pinned, badge, shown in feeds).
7. **Talent search** (`viewTalent`): paywall → 7-day free trial ($0 today, then $49/month) → filters (discipline, tools, location, available), sort, shortlist tab, 25 message credits (a credit is used only for a new conversation).
8. **Pro** (`openPro`): $8/month or $72/year. Perks: badge, insights, 60s motion, pin 3 projects, custom domain, no sponsored, 5% tip fee (vs 10%), $10 boost credit a month. Manage/cancel.
9. **Tips** (`openTip`): $2/5/10/20 or custom, note, fee split shown.

**Checkout** (`openCheckout`): order lines, credit line, total ("Due today" + "Then $X / month" for recurring), saved card or new card (validates 15+ digits, MM/YY, CVC), 900ms processing, success with receipt id, optional follow-up button. Follow-up buttons must **close every overlay** before navigating.

**Promote & earn hub** (`viewAds`):
- **Overview:** KPI tiles (Spent, Impressions, Clicks, CTR), Running now, product grid.
- **Campaigns:** table with status pill, spent/budget bar, impressions, clicks, CTR, Pause/Resume/Stop. Stop refunds unspent budget.
- **Earnings:** balance after fee, tips table, Withdraw.
- **Billing:** invoices, card, subscriptions (Pro, Studio).
- Campaign numbers simulate live delivery every 2.5s (`setInterval` in the prototype; use a store-driven ticker) and auto-end at budget.

**Impressions and clicks** for the user's own campaigns: count an impression when 50% of the element is visible (once per element), and count clicks on promo, sponsored, job, keyword and featured elements, ignoring clicks on "Why…" and "more".

### 9.10 Community & social
- Weekly challenge with a live countdown, Details modal (sponsor, prize, rules, Coming up, entries), Remind me, Enter (opens upload with the challenge pre-ticked).
- **Activity drawer:** filters (All/Saves/Follows/Comments/Milestones), Follow back, Mark all read. Opening clears the badge; individual items keep their dot until clicked.
- **Messages drawer:** list → thread → send, with a fake typing reply after about 1.3s, and new message to a creator.
- **Profile:**
  - Cover, avatar, name (plus Pro badge or Studio tag), role, location, hire badge, domain chip.
  - Actions:
    - Own profile: Promote & earn, Go Pro, Edit profile, Upload, Share.
    - Other people's: Follow, Message, Hire, Share.
  - Stats.
  - Tabs: **Projects · N** (covers only, pinned first), Collections (own profile only), About.
- **Jobs:** filters, featured first with a badge, Save, Apply (confirm), Post a job, Find talent; links to a job scroll to it and flash it.
- **Settings:** autoplay, reduce motion, community modules, personalised ads, Pro row, pin sidebar.

---

## 10. Interaction inventory (parity checklist)

Every element in the prototype has a `data-act` (or `data-uact` inside upload). Each one must map to a handler in the Next.js app. Tick these off:

`act-filter activity ad-hide ad-why ads-tab boost brand-open camera camp-open camp-stop camp-toggle card-update challenge challenge-enter clear-filter close-drawer close-modal cmt-like cmt-reply coll-delete coll-new coll-rename coll-share creator credit-hire detail-go detail-next detail-prev edit-profile filter focus-search follow follow-coll format hide-breaks hire interests jad-open job-apply job-save jobf kad-open like mark-read me-menu message messages more msg-new nav open pin-rail player-full player-mute player-seek player-speed player-toggle post-job pro proto ptab recent-clear recent-rm remind rings-scroll save save-menu scope search-ad search-clear search-filter search-q search-scope sec-jump see-new settings share share-profile shortlist sound sp-open sponsor-challenge sponsored-new studio-cancel studio-trial tab talent-cat talent-go talent-msg talent-reset talent-tab talent-tool thread tip top topic upload withdraw`

Upload: `again back browse close cover looplen loopplay next profile publish rm sample-img sample-mo tagadd tagrm view vis`

(`img-next / img-prev` belong to the old image carousel. Sections replaced it, so they can be dropped.)

---

## 11. Non-functional requirements

- **Performance:**
  - Masonry re-layouts only when the column count changes.
  - Virtualise or limit loaded chunks if the DOM gets past about 400 cards.
  - Images use `next/image` once real media exists.
  - Motion previews are MP4/WebM, never GIF.
- **SSR/CSR boundary:** pages are server components that read mock data. Interactive pieces (feed, cards, overlays, store) are client components. Avoid hydration mismatches: anything time-based (greeting, countdown, "Good evening") renders on the client.
- **URL state:** search query, scope and filters, promote tab, and talent tab must be linkable.
- **Accessibility:**
  - All overlays trap focus and restore it on close.
  - Toggles use `role="switch"` and `aria-checked`.
  - Cards are focusable and Enter opens them.
- **Responsive:** no horizontal scroll at 390px. Check 390, 1024, 1440 and 1680.

---

## 12. Phased plan with acceptance criteria

Commit at the end of each phase. Don't start the next phase until the current one passes lint, typecheck, build and its Playwright specs.

| Phase | Scope | Done when |
|---|---|---|
| **1. Foundation** | `/web` scaffold, tokens, Icon set, RNG + full mock data (§5.1), types, repositories, Zustand store skeleton, overlay hosts (Modal stack, Drawer, Popover, Toast, Confirm) | `npm run build` passes. A Vitest snapshot of `getFeed()` shows the first 20 section ids are stable across runs. |
| **2. Shell & feed** | Rail (hover, pin), Header, MobileBar, CommunityRail, Home with rings, feed bar, filters, masonry, infinite scroll, skeletons, community breaks, section cards with hover overlay, motion autoplay manager, back to top | e2e: home renders; hovering a card shows Save; scrolling loads more and inserts breaks; ≤3 motion cards play; 390px shows the bottom bar and 2 columns. |
| **3. Project page** | Intercepting modal + full page, sections stage, section index, scroll-spy, motion player, credits, comments, prev/next, keyboard | e2e: opening a later section scrolls to it; index click scrolls; Space toggles play; `/p/[id]` works on refresh. |
| **4. Save, collections, social** | Save/picker/unsave/undo, collections pages, likes, follow, hover card, more menu, hide/report, activity + messages drawers, profile (projects tab, pinned), jobs basic, settings, interests, edit profile | e2e: save a single section → it appears in the collection; follow updates every button; message thread reply appears. |
| **5. Search** | Search page, dropdown, typeahead groups, section and discipline filters, creators scope, related tags, visual search, `/similar` | e2e: "pricing page" → only Pricing sections; "denim lookbook" → fashion sections; the filter chip updates the URL. |
| **6. Upload** | 3-step project upload with real files, video poster and loop, sections editor, credits editor, publish → feed top | e2e (with fixture PNGs + WebM): publish a 2-section project tagged Hero + Pricing with one credit → the project page shows 2 sections and 2 credits. |
| **7. Monetization** | All §9.9 products, checkout, hub tabs, live campaign ticker, ad slotting and auction (Vitest), transparency popover, Pro effects, tips, talent search | Vitest: slot positions, caps, Pro filtering, kwMatch table, auction order. e2e: search "illustration" → Paper Kite first; buy a search ad at $1.60 → your ad ranks first; boost → "Promoted · your boost" in feed and a campaign row ticking up. |
| **8. Polish & QA** | Reduced motion, focus traps, a11y labels, empty states, responsive sweep at 390/1024/1440/1680, Lighthouse a11y ≥ 95 | All e2e green; no console errors in any spec. |

---

## 13. Playwright scenarios to port

These mirror the checks already run against the prototype:

1. **Home:** cards render; a promoted card and a sponsored card are present after 2 chunks; no console errors.
2. **Hover and save:** Save → toast with Change → the picker lists collections → create a new collection and save into it.
3. **Rail:** hover expands it; pin keeps it open after a reload.
4. **Search:** typeahead shows a sponsored row for "illus"; Enter shows 2 sponsored results with Paper Kite Studio first.
5. **Project page:** open `fa1` → 6 sections, 4 credits; click section 4 in the index → it's in view; save section 4 only.
6. **Credit Hire:** closes the modal and opens a thread with a prefilled message.
7. **Upload with images:** 2 PNGs → category Web design → section 2 = Pricing → add credit Priya (Development) → publish → View post shows 2 sections.
8. **Upload with video:** WebM → poster slider → publish → profile shows a video card.
9. **Discard guard:** open upload, add a file, Esc → confirm → no layers left.
10. **Activity:** badge clears on open; clicking an item opens its post.
11. **Messages:** send → typing → reply appears.
12. **Interests:** remove 2 → rings update. Topic 3D → 3D-only feed plus the Polyform takeover.
13. **Filters:** past week + hire + Figma → chips shown; Clear all.
14. **Collections:** rename, then delete with confirm.
15. **Jobs:** Post a job (Featured) → checkout → job pinned with "Your listing"; Apply → Applied.
16. **Settings:** autoplay off → 0 playing on `/motion`.
17. **Search ad purchase:** "Advertise on 'illustration'" → 3 steps → $1.60 bid → pay → your ad is first.
18. **Boost:** from your own project → pay → campaign row; Pro → no sponsored cards after scrolling.
19. **Tip** $10 → "1 tip" in stats.
20. **Talent:** trial → Motion filter → shortlist and message (credit decreases).
21. **Mobile 390px:** search, promote, talent and jobs pages have no horizontal scroll; the project page stacks.
22. **Wide 1680px:** right rail with the featured creator and the promoted trend; no in-feed breaks.

---

## 14. Definition of done

- Every flow in §9 and every action in §10 works exactly as in the prototype.
- `lint`, `typecheck`, `build`, `test` and `e2e` all pass. Zero console errors during e2e.
- No horizontal scroll at 390px. Reduced motion is respected.
- Mock data sits behind repositories. `lib/feed/ads.ts`, `lib/search/match.ts` and `lib/search/auction.ts` are pure and unit-tested.
- A README in `/web` explains how to run it and where to swap in a real API.

---

## 15. Out of scope (later)

- Real backend, auth, payments (Stripe), file storage/CDN, video transcoding (6–8s preview loops), URL-to-screenshot capture for websites, real ad delivery and billing, moderation, notifications by email/push.
- Brand visual design: the wireframe stays greyscale until the visual design pass.
