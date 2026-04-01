# Feedback form: MongoDB Atlas + Vercel (free)

The feedback form stores submissions in **MongoDB Atlas** (free M0 cluster) and is submitted via a **Vercel serverless** API. No paid email or hosting is required. You read feedback in the Atlas dashboard (or export to CSV).

---

## 1. MongoDB Atlas (free)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create an account or sign in.
2. **Create a free cluster**
   - Choose a provider (e.g. AWS) and a region close to you.
   - Select **M0 Sandbox** (free tier). Create cluster.
3. **Database access**
   - Security → Database Access → Add New Database User.
   - Create a username and password (store them safely). Give the user “Atlas admin” or “Read and write to any database”. Create user.
4. **Network access**
   - Security → Network Access → Add IP Address.
   - For Vercel, allow from anywhere: **0.0.0.0/0** (or add Vercel’s IPs if you prefer). Confirm.
5. **Connection string**
   - Database → Connect → “Drivers” (or “Connect your application”).
   - Copy the URI. It looks like:  
     `mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password (special chars URL-encoded).
   - You’ll use this as `MONGODB_URI` in Vercel. The API will use database **restorerepresentation** and collection **feedback** (created on first insert).

---

## 2. Vercel (free)

The site and the feedback API run on Vercel so the form can POST to `/api/feedback` on the same domain.

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **New Project**
   - Import your **tstron/Constitutional-Amendments** repo.
   - Leave build settings as default (or set Build Command to empty and Output Directory to `.` if you want to serve static files only; Vercel will still run `api/` as serverless).
   - Deploy.
3. **Environment variable**
   - Project → Settings → Environment Variables.
   - Name: **MONGODB_URI**  
   - Value: your full MongoDB Atlas connection string (from step 1).
   - Under **Environments**, enable **Production** and **Preview** (and **Development** if you use `vercel dev`). Save.
   - If `MONGODB_URI` is only set for Production, deployments at `*.vercel.app` that run as **Preview** will fail until you add the variable for Preview too, then **Redeploy**.
4. **Redeploy** so the new env var is used: Deployments → … on latest deployment → Redeploy.
5. **Custom domain**
   - Project → Settings → Domains.
   - Add **restorerepresentation.org** (and **www.restorerepresentation.org** if you use www).
   - Follow Vercel’s DNS instructions (they’ll give you A/CNAME records). Your domain will then point to Vercel instead of GitHub Pages, and the feedback form will work at `https://restorerepresentation.org/feedback.html` posting to `https://restorerepresentation.org/api/feedback`.

---

## 3. Reading feedback

- Log into [MongoDB Atlas](https://cloud.mongodb.com) → your project → **Database** → **Browse Collections**.
- Open database **restorerepresentation**, collection **feedback**.
- Each document has: `name`, `email`, `message`, `amendment` (optional), `createdAt`, `ip`.

You can export data from the Atlas UI or use Compass (free) for queries and exports. No inbox, no spam.

---

## 4. Spam reduction (built in)

- **Honeypot:** The form includes a hidden “website” field; bots often fill it. Those submissions are rejected.
- **Rate limit:** Up to 3 submissions per IP per hour. Configurable in `api/feedback.js` (`RATE_LIMIT_MAX_PER_IP`, `RATE_LIMIT_WINDOW_MS`).

Optional later: add [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) or reCAPTCHA for stronger bot protection (both have free tiers).

---

## 5. If you keep the site on GitHub Pages

If you don’t move the site to Vercel and keep it on GitHub Pages, the form will POST to `restorerepresentation.org/api/feedback`, which GitHub Pages doesn’t serve (so it would 404). Options:

- **Recommended:** Deploy the same repo to Vercel and point **restorerepresentation.org** to Vercel (as in section 2). The site and API are then in one place.
- **Alternative:** Deploy *only* the API as a separate Vercel project (e.g. put `api/` and `package.json` in a small repo, deploy that to Vercel). Then in the feedback form script, set the API base URL to that Vercel project’s URL (e.g. `https://your-api.vercel.app`) and ensure that project has CORS allowed for `https://restorerepresentation.org`. The repo’s `api/feedback.js` already allows that origin.

---

## Troubleshooting: form shows “Something went wrong”

1. **Vercel env for Preview**
   - Project → **Settings → Environment Variables** → open **MONGODB_URI**.
   - Ensure **Preview** is checked (not only Production). **Save** → **Deployments** → ⋯ on latest → **Redeploy**.

2. **Atlas Network Access**
   - Atlas → **Network Access**: confirm **0.0.0.0/0** (or equivalent) is allowed.

3. **Password in URI**
   - Special characters in the DB password must be [URL-encoded](https://www.mongodb.com/docs/manual/reference/connection-string/#escape-characters) in `MONGODB_URI`.

4. **Vercel function logs**
   - Vercel → Project → **Deployments** → open a deployment → **Functions** (or **Logs**). Open `/api/feedback` and look for MongoDB or config errors.

---

## Summary

| Item              | Where / what |
|-------------------|--------------|
| Storage           | MongoDB Atlas free M0, database `restorerepresentation`, collection `feedback` |
| API               | Vercel serverless `api/feedback.js`, env `MONGODB_URI` |
| Form              | `feedback.html`; posts to same-origin `/api/feedback` when site is on Vercel |
| Reading feedback  | Atlas dashboard (or Compass / export); no email needed |
