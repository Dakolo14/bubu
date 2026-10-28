# Konga Daily Email Builder (for Netcore)

A reusable builder for the daily Konga email. Fill in the products, and it writes the
finished HTML to paste into Netcore.

**Why a builder?** Email apps (Gmail, Outlook, etc.) block JavaScript, so the email itself
can't calculate discounts. The builder does the maths before you paste the HTML into Netcore:

- **Discount badge** = `round((slashed price − price) ÷ slashed price × 100)`, shown as `-15%`
- **You save** = `slashed price − price`, shown as `₦98,175`
- If there's no slashed price, or it isn't higher than the price, the badge, slashed price
  and "You save" pill are hidden.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The builder. Open it in Chrome; no install needed. |
| `render.js` | Turns the form data into email HTML (table layout, inline styles). |
| `sample-email.html` | An example of the generated email with placeholder images. |

## Daily workflow

1. Open `index.html` in a browser (double-click the file).
2. **Top Deals**: add products one by one, or use **Bulk paste**: copy rows from Excel or
   Google Sheets with columns in this order:

   `Name | Price | Slashed price | Image URL | Link | Brand logo URL (optional) | Campaign logo URL (optional)`

3. Fill in **Deal Of The Day**, the **Hero banner** and the **Promo banner** image URLs.
4. Check the preview on the right (Desktop and Mobile).
5. Click **Copy HTML for Netcore** and paste it into the HTML editor of a new Netcore email
   campaign. You can also use **Download HTML** and upload the file.

Your entries are saved in the browser automatically. **New day** clears products and banners
but keeps the logo, menu, socials and footer. Use **Save JSON** / **Load JSON** to share a
setup with teammates or keep an archive of past sends.

## One-time setup (Header and Footer sections)

- Konga logo, group-brands strip, social icons (32×32) and app store badges: upload each
  image once to Netcore's media library (or the Konga CDN), then paste the URLs.
  Until an image is set, the builder shows a text fallback.
- **Unsubscribe link**: paste Netcore's unsubscribe tag/URL. Netcore needs this for
  compliance.
- Social and app store links start empty, so fill them in.

## Image notes

- Every image must be a public `https://` URL. Images from your computer or pasted into
  the form won't show in inboxes.
- Product images: square works best (shown at about 160×160 in the grid).
- Hero banner: 1200px wide. Promo banner: 1500×500px. Category tiles: square.
- Product names longer than the max characters (default 48) are cut with "…" so all
  cards stay the same height.
