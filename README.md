# Portfolio

A personal portfolio website with a dark theme, smooth animations, and responsive layout.

## Sections

- **Hero** — Name, tagline, and call-to-action buttons
- **About** — Short bio and highlights (years of experience, projects)
- **Projects** — Grid of project cards (replace with your real projects and links)
- **Skills** — List of skills and tools
- **Contact** — Email and social links

## Customize

1. **Tagline** — Edit the hero in `index.html` to change the tagline (name is set to Omar Al-Rafie).
2. **About** — Update the paragraphs and highlight numbers in the About section.
3. **Projects** — Replace the three placeholder project cards with your real work. Add `href` to each "View project" link and optionally replace the numbered placeholders with real images by using `<img>` inside `.project-image`.
4. **Skills** — Add or remove items in the skills list.
5. **Contact** — Replace `you@example.com` and the LinkedIn, GitHub, and Twitter URLs with your own.

## Run locally

No build step required. Open `index.html` in a browser, or use a simple server:

```bash
# Python 3
python -m http.server 8000

# Node (npx)
npx serve
```

Then visit `http://localhost:8000` (or the port shown).

## Deploy

Upload the folder to any static host (Netlify, Vercel, GitHub Pages, etc.) or drop `index.html`, `styles.css`, and `script.js` into your hosting.

---

## Publish with GitHub Pages

1. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Name it (e.g. `portfolio` or `username.github.io` for a user site)
   - Leave it empty (no README, .gitignore, or license)
   - Click **Create repository**

2. **Push your project from your computer**
   In a terminal, from your project folder (`portfolio`):

   ```bash
   git init
   git add .
   git commit -m "Initial commit: portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and the repo name you chose.

3. **Turn on GitHub Pages**
   - In the repo, go to **Settings** → **Pages** (left sidebar)
   - Under **Source**, choose **Deploy from a branch**
   - Under **Branch**, select `main`, folder **/ (root)**
   - Click **Save**

4. **Wait and open your site**
   - After 1–2 minutes, the site will be live at:
     - **Project site:** `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
     - **User site:** if the repo is named `YOUR_USERNAME.github.io`, then `https://YOUR_USERNAME.github.io/`

To update the site later, just commit and push to `main`; GitHub Pages will redeploy automatically.
