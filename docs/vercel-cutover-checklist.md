# Vercel cutover checklist (restorerepresentation.org)

Use this after the site deploys on Vercel and the feedback form works on `*.vercel.app`.

---

## Done (typical)

- [x] MongoDB Atlas cluster + DB user + network access (`0.0.0.0/0` or equivalent)
- [x] Vercel project from GitHub repo
- [x] `MONGODB_URI` set for **Production** and **Preview**
- [x] Feedback form submits successfully (tested on Vercel URL)

---

## Next: point the live domain to Vercel

1. **Vercel → Project → Settings → Domains**
   - Add **restorerepresentation.org**
   - Add **www.restorerepresentation.org** (recommended)
   - Note the **DNS records** Vercel shows (often A/AAAA for apex, CNAME for `www`).

2. **At your DNS / registrar (for .org)**
   - Remove the **four GitHub Pages A records** (`185.199.108.153`, etc.) and any **URL redirect** on `@` that conflicts (same issue you fixed earlier).
   - Add **exactly** what Vercel lists for apex and `www`.
   - Wait for propagation (often minutes; can be longer).

3. **Verify**
   - Open `https://restorerepresentation.org` and `https://www.restorerepresentation.org`
   - Test **Feedback** again on the custom domain (uses Production env).

4. **GitHub Pages (avoid two hosts)**
   - Repo → **Settings → Pages** → set source to **None** (disable Pages), or remove the custom domain from Pages first per GitHub’s UI.
   - After DNS fully points to Vercel only, you can **delete the `CNAME` file** from the repo in a follow-up commit (it was for GitHub Pages; Vercel does not need it).

5. **`.com` redirect (unchanged intent)**
   - Keep **restorerepresentation.com** as a **301 redirect** to `https://restorerepresentation.org` at the registrar (no need to host `.com` on Vercel unless you want both as full sites).

---

## Optional polish

- Rotate the Atlas DB password if it was ever pasted in chat or tickets; update `MONGODB_URI` in Vercel.
- Add analytics (e.g. Vercel Analytics, Cloudflare Web Analytics, or GA4) when you want traffic reports.
