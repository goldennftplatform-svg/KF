# PRESET RECORDS

An independent record-label showcase for **Kountry Folk** and **PRESET**. Built with Vite, plain JavaScript, and responsive CSS. No backend, tracking, API keys, or paid services required.

## Run

```sh
npm ci
npm run dev
```

Production: `npm run build`; test production locally with `npm run preview`.

## Included

- Warm, personal hero using the owner's real portrait, with a subtly keyed green-screen background. Country artwork stays with the music and Kountry Folk persona.
- Six full playable tracks, artist filters, persistent audio transport, seek/volume controls, automatic next track, and Media Session integration.
- Diesel n’ Diamonds and Hard Work YouTube films, loaded on click in an accessible modal.
- Label story and two artist profiles.
- Personal camera-roll section with the owner-supplied Steve Largent event photo and a candid headphones portrait.
- Local-only voice-sample preview, limited to 20 MB. **This is not AI generation or an upload service.** The sample is never sent to a server, saved, or charged against any account.

## Content

Track metadata lives in `src/main.js`. Page copy lives in `index.html`. Visuals and music are in `public/media`. See `ASSETS.md` for provenance and editorial choices. Assets belong to the project owner; no license to redistribute the catalog is granted by this repository.

## Collecting releases

The country release cards link directly to their verified Bagpipes track pages. Three editions were confirmed through Bagpipes' public track/edition queries on 2026-10-11: Diesel n’ Diamonds (token 5), Feels Right (6), and Party in the Pines (7). Hi & Dry has a verified track page, but its edition query returned null, so its button says “View on Bagpipes.” Update `nftEdition` in `src/main.js` when its edition is confirmed. Prices and remaining supply are deliberately left to Bagpipes checkout to avoid stale quotes.

The purchase handoff opens Bagpipes in a new tab. Wallet connection, payment, and mint confirmation happen there; no wallet credentials or transactions are handled by this site.

## Deployment

The GitHub Actions workflow builds and deploys to GitHub Pages on pushes to `main`. Enable **Settings → Pages → Source → GitHub Actions**. Relative asset URLs support both `/KF/` and a custom-domain root.

For the future `kp.aisp.live` launch:

1. Add `kp.aisp.live` under the repository's Pages custom-domain setting.
2. At the DNS provider, add a CNAME for `kp` pointing to `goldennftplatform-svg.github.io`.
3. Complete any GitHub domain verification and enable HTTPS.
4. Update the absolute `og:image` URL in `index.html` to the custom domain.

DNS and the custom domain are intentionally not activated by the initial build.

## Future voice generation

Requires a confirmed provider/API agreement, server-side credentials, user consent, file validation, per-user limits, a hard spend cap, and explicit generation confirmation. Never put provider secrets in browser code. No integration is assumed merely because the creator uses Bagpipes; the first release consumes no generation credits.

## Asset preparation (optional)

The web assets are committed; visitors and deployments don't need Python or FFmpeg. `tools/prepare_assets.py` documents reproducible derivatives from the owner's specifically selected Downloads files. Requires Python, Pillow, and FFmpeg. It reads originals without modifying them. `.scratch` review files are ignored by Git.
