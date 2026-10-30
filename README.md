# PRESET RECORDS

An independent record-label showcase for **Kountry Folk** and **PRESET**. Built with Vite, plain JavaScript, and responsive CSS. No backend, tracking, API keys, or paid services required.

## Featured release: Gone Kristmas

The homepage now leads with the official 12-track Bagpipes holiday album. `src/holiday-data.json` preserves the published release order, original source titles, track credits, audio URLs, and verified edition status. `tools/prepare_holiday.py` refreshes that snapshot from public Bagpipes queries and optimizes the artwork. The decorative ` -.-` title suffix is omitted in the display titles only.

The shared player streams the official public Bagpipes MP3s on demand. Next/previous and automatic advance stay within the holiday album when a holiday song is selected; selecting an original release switches back to the original catalog queue. No holiday NFT purchase is claimed: all 12 edition lookups returned null at inspection. Each song and the album link directly to their official Bagpipes pages.

The public address is **https://kp.aisp.live/**. Currently the domain serves a third-party forwarding frameset embedding this GitHub Pages site; it is not a GitHub Pages custom domain. Updates to this repo appear inside that frame. For native mobile viewport behavior and reliable holiday social previews/search indexing, replace masked forwarding with a DNS CNAME and configure the Pages custom domain (steps below). The outer forwarding page's metadata cannot be updated from this repository. Do not add a `CNAME` file or change Pages' domain before the DNS switch is ready.

## Run

```sh
npm ci
npm run dev
```

Production: `npm run build`; test production locally with `npm run preview`.

## Included

- Holiday-first hero with official album art, 12-track listening panel, album sharing, and a quick directory to the complete existing site. Real creator portraits remain in the artist and story sections.
- Eight full playable original-catalog tracks (including the new PRESET releases Lockstep and Fragmented), artist filters, persistent audio transport, seek/volume controls, automatic next track, and Media Session integration, alongside the 12-track holiday album.
- Diesel n’ Diamonds and Hard Work YouTube films, loaded on click in an accessible modal.
- Label story and two artist profiles.
- Personal camera-roll section with the owner-supplied Steve Largent event photo and a candid headphones portrait.
- Compact Legacy Songs callout with 16 verified public songs from `suno.com/@presetrecords?page=songs`, playable through an official Suno embed on this page. The external player loads only on request; selecting another song replaces it, and starting site music or video stops it. The catalog is a snapshot maintained in `src/legacy.js`, not an automatic feed.
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
