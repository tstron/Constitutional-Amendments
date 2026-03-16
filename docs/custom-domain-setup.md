# Custom domain setup: restorerepresentation.org & .com

GitHub Pages allows **one custom domain per repository**. To use both domains, you set one as the primary in GitHub and redirect the other to it at your DNS/registrar.

---

## 1. Enable GitHub Pages

1. On GitHub, open **tstron/Constitutional-Amendments** → **Settings**.
2. In the left sidebar, under **Code and automation**, click **Pages**.
3. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select **main** and **/ (root)**, then click **Save**.
5. Wait a minute or two. The site will be live at:
   - **https://tstron.github.io/Constitutional-Amendments/**

---

## 2. Pick a primary domain and add it in GitHub

Choose one domain as the main one (e.g. **restorerepresentation.org**). The other will redirect to it (Step 4).

1. Still in **Settings** → **Pages**, find **Custom domain**.
2. Type your primary domain, e.g. **restorerepresentation.org** (no `https://` or `www` unless you want `www`).
   - For **apex**: `restorerepresentation.org`
   - For **www**: `www.restorerepresentation.org`
3. Click **Save**.
4. If you publish from a branch, GitHub will add a **CNAME** file to the root of `main`. Pull that commit locally:  
   `git pull origin main`

---

## 3. Point the primary domain’s DNS to GitHub

At the place where you manage DNS for **restorerepresentation.org** (registrar or DNS provider), add these records.

### Option A: Apex only (e.g. restorerepresentation.org)

Add **four A records**:

| Type | Name/Host | Value          | TTL (optional) |
|------|------------|----------------|----------------|
| A    | `@`        | 185.199.108.153 | 3600           |
| A    | `@`        | 185.199.109.153 | 3600           |
| A    | `@`        | 185.199.110.153 | 3600           |
| A    | `@`        | 185.199.111.153 | 3600           |

If your host supports **ALIAS** or **ANAME** (e.g. Cloudflare, some others), you can use **one** record instead:

- Type: **ALIAS** or **ANAME**  
- Name: `@`  
- Value: **tstron.github.io**

### Option B: Apex + www (recommended)

- Add the **four A records** (or one ALIAS/ANAME) for apex as above.
- Add a **CNAME** for `www`:
  - Type: **CNAME**
  - Name: **www**
  - Value: **tstron.github.io**

GitHub will then redirect between apex and www. DNS can take up to 24–48 hours to propagate.

---

## 4. Second domain: redirect .com → .org (or vice versa)

You can only set **one** custom domain in GitHub. For the second domain (**restorerepresentation.com**):

- At your **registrar** (or DNS host) for **restorerepresentation.com**, use **Domain redirect** / **URL forwarding** to send all traffic to your primary domain, e.g.:
  - **Redirect to:** `https://restorerepresentation.org`  
  - Prefer “301 permanent” and “redirect all paths” if offered.

Where to set this depends on who sold you the domain (e.g. Namecheap: Domain List → Manage → Redirect; GoDaddy: Domain → Forwarding; Cloudflare: Rules or Page Rules; etc.). No DNS A/CNAME records are needed for the redirect target itself—only the redirect rule.

Result: **restorerepresentation.org** (and optionally **www.restorerepresentation.org**) serves the site; **restorerepresentation.com** sends visitors to the same site.

---

## 5. Enforce HTTPS (after DNS works)

1. Back in **Settings** → **Pages**, after the custom domain shows as verified, enable **Enforce HTTPS**.
2. It may take a few minutes (or up to 24 hours) to become available. Then your site will load over `https://` only.

---

## 6. Verify

- Open **https://restorerepresentation.org** (and **https://www.restorerepresentation.org** if you set up www).
- Open **https://restorerepresentation.com** and confirm it redirects to the primary domain.
- On Windows you can check DNS with PowerShell:  
  `Resolve-DnsName restorerepresentation.org -Type A`

---

## Summary

| Step | Where | Action |
|------|--------|--------|
| 1 | GitHub → Repo **Settings** → **Pages** | Source: **Deploy from a branch** → **main** → **/ (root)** |
| 2 | Same page → **Custom domain** | Enter primary domain (e.g. **restorerepresentation.org**), Save; pull new CNAME commit |
| 3 | DNS for primary domain | Add 4× A (or 1× ALIAS) for apex; optionally CNAME **www** → **tstron.github.io** |
| 4 | Registrar/DNS for second domain | Set **redirect** from restorerepresentation.com → https://restorerepresentation.org |
| 5 | GitHub **Pages** | After DNS is good, check **Enforce HTTPS** |
