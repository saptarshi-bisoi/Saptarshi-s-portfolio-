# Deploy Checklist

Short steps to verify and deploy the portfolio after the `vercel.json` change.

- Verify files are committed and pushed:
  - `git status` should be clean.
  - `git log -1` should show the recent commit message.
- Redeploy on Vercel (auto): Push to the repo connected to Vercel (already done).
- Manual deploy with Vercel CLI (optional):

```bash
npm i -g vercel
vercel --prod
```

- Test locally:

```bash
npx serve .
python -m http.server 8000
```

- Verify on deployed site:
  - CSS loads (styles applied).
  - Images and assets appear (check network tab for 404s).
  - Social preview images (og:image) return 200.

- If assets still missing:
  - Confirm `assets/`, `images/`, `style.css`, and `script.js` exist in repo root.
  - Check Vercel build logs for any upload/ignore warnings.

- Optional: clear CDN/cache from Vercel dashboard if stale assets appear.

If you want, I can also run a local static server check now and report the results.
