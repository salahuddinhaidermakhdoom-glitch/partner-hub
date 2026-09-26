# 🚀 Hostinger Deployment Guide for Munch Craft Pizza

This application is fully built, optimized, and packaged for **Hostinger Web Hosting**, **Hostinger Cloud Hosting**, and **Hostinger VPS**.

---

## 📦 What's Inside the Build?
The production build has already been generated in the `/dist` folder and packaged into `dist.zip`:
- `index.html` — The main entry point with pre-rendered SEO and OpenGraph tags.
- `assets/` — Minified, hashed JavaScript bundles, CSS, and high-resolution web-optimized imagery.
- `.htaccess` — Production Apache/LiteSpeed rules for:
  - **Single Page Application (SPA) routing** (so refreshing any page doesn't return a 404).
  - **Automatic HTTPS redirection** (forces secure SSL).
  - **Gzip/Brotli compression** and **Browser Caching** for lightning-fast pizza photo delivery.

---

## ⚡ Method 1: Hostinger hPanel File Manager (Easiest & Fastest — 2 Mins)

1. **Log in to Hostinger hPanel**:
   - Go to [https://hpanel.hostinger.com](https://hpanel.hostinger.com) and log in.

2. **Open File Manager**:
   - In your dashboard, click **Websites** > select your domain > click **File Manager** (or navigate to **Files > File Manager**).
   - Click **Access files of [your domain]**.

3. **Navigate to `public_html`**:
   - Double-click the `public_html` folder.
   - *Note:* If you see a default `default.php` or placeholder `index.html` from Hostinger, you can safely delete it or back it up.

4. **Upload `dist.zip`**:
   - Click the **Upload** icon (arrow pointing up) in the top-right toolbar.
   - Select `dist.zip`.

5. **Extract the Files**:
   - Right-click `dist.zip` inside `public_html` and click **Extract**.
   - Choose to extract directly inside `public_html`.
   - Ensure the files (`index.html`, `.htaccess`, and the `assets` folder) are located directly inside `public_html` (not inside a nested subfolder).
   - Once extracted, you can delete `dist.zip`.

6. **Verify SSL**:
   - In hPanel, go to **Security > SSL** and verify that your **Let's Encrypt SSL** is active (Hostinger provides this for free).

7. **Visit your website!** 🎉
   - Open your domain in any browser (e.g., `https://yourdomain.com`). Your Munch Craft Pizza website is now live!

---

## 🛠️ Method 2: Git Auto-Deployment via Hostinger hPanel

If you push this project to a GitHub or GitLab repository:

1. In Hostinger hPanel, search for **Git** in the left sidebar.
2. Under **Create a New Repository**:
   - **Repository URL:** Enter your GitHub repo URL (e.g. `https://github.com/username/munch-craft-pizza.git`).
   - **Branch:** `main`
   - **Install directory:** `/public_html` (or leave as root if using Hostinger's build hooks).
3. If building on the server, you can set the deploy command to:
   ```bash
   npm install && npm run build && cp -r dist/* public_html/
   ```
4. Click **Create** and enable **Auto Deployment** (webhook). Any future commit pushed to GitHub will instantly update your live Hostinger site!

---

## ⚙️ How Client-Side Routing Works on Hostinger
Because this is a modern React application, the included `.htaccess` file instructs Hostinger's LiteSpeed/Apache web server to serve `index.html` for all subpaths:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
```
This ensures your cart, menu anchors, and interactive modals function seamlessly with zero 404 errors.
