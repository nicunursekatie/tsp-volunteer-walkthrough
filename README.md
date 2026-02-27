# TSP Volunteer Walkthrough

Interactive walkthrough for The Sandwich Project volunteers. Built with React + Vite, hosted on GitHub Pages.

---

## Deploy to GitHub Pages

### What you need
- A GitHub account (free)
- Git installed on your computer
- Node.js installed (https://nodejs.org — get the LTS version)

### Step-by-step

**1. Create a GitHub repo**
- Go to github.com/new
- Name it `tsp-volunteer-walkthrough`
- Leave it **Public**
- Do NOT check "Add a README" (we already have one)
- Click **Create repository**

**2. Update the config with your GitHub username**

Open `package.json` in any text editor and replace:
```
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/tsp-volunteer-walkthrough"
```
with your actual GitHub username.

If you named the repo something different, also update `vite.config.js`:
```js
base: '/your-repo-name/',
```

**3. Open a terminal in this folder and run:**

```bash
# Install dependencies
npm install

# Initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tsp-volunteer-walkthrough.git
git push -u origin main

# Deploy to GitHub Pages
npm run deploy
```

**4. Enable GitHub Pages**
- Go to your repo on GitHub > Settings > Pages
- Under "Source", select **Deploy from a branch**
- Branch: **gh-pages** / **/ (root)**
- Click **Save**

**5. Wait 1-2 minutes, then visit:**
```
https://YOUR_USERNAME.github.io/tsp-volunteer-walkthrough
```

---

## Making Updates

```bash
# Edit files, then:
git add .
git commit -m "Description of changes"
git push
npm run deploy
```

Site updates in ~1 minute.

---

## Custom Domain (Optional)

To host at `walkthrough.thesandwichproject.org`:

1. Repo > Settings > Pages > Custom domain: `walkthrough.thesandwichproject.org`
2. In your DNS, add a CNAME record: `walkthrough` -> `YOUR_USERNAME.github.io`
3. Update `vite.config.js`: change `base` to `'/'`
4. Rebuild: `npm run deploy`

---

## Project Structure

```
src/App.jsx      <- All walkthrough content and UI
src/main.jsx     <- React entry point
index.html       <- HTML shell
vite.config.js   <- Build config
```

All content lives in `src/App.jsx`.
