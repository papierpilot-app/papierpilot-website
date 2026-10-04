# PapierPilot Website

Static German marketing website for the PapierPilot iOS/iPadOS app. HTML, CSS and JavaScript with no build step, external fonts, analytics or runtime dependencies.

## Local preview

From this directory, run:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/`. The redesigned marketing pages use explicit HTML filenames; the canonical public URLs remain unchanged. Existing legal/support pages still use the host's clean-URL routes.

## Design and content

The homepage follows the agreed eight-section sequence: benefit and download; document example; features; daily use cases; privacy and a real review; free/Premium comparison; cooperation; FAQ and download.

- Current, owner-supplied screenshots are in `assets/`. The hero shows Dark Mode.
- The document example is an Elterngeld form with no recognized deadline. The calendar is presented separately.
- The manually controlled product demonstration can also run for 24 seconds, without audio. Reduced-motion preferences disable automatic progression.
- App screenshots can be enlarged in a native dialog.
- All functions can be tried with two free files. Further files require Premium; no recurring free quota is claimed.
- German App Store prices: EUR 2.99 per month / EUR 29.99 per year. The year option shows the full annual charge.
- The store rating and linked review are dated 2026-10-04 and must be refreshed when changed.
- The privacy summary reflects the existing policy. Existing legal and support pages are excluded from the change set and retain their content and navigation.

The underlying site remains static and compatible with its existing hosting. No deployment configuration or production branch is changed by preparing this draft.

## Verification

JavaScript syntax and whitespace checks passed. Nine HTML pages were checked for local file paths, anchors, duplicate IDs, headings and image descriptions.

DOM-based interaction checks passed for menu close/Escape, tab selection and keyboard navigation, monthly/yearly prices, the free-file limit, demonstration completion, reduced-motion behavior and screenshot controls.

Full browser rendering and touch interaction have not been verified in this environment: the cloud browser blocked both the local preview address and local file URLs. Review the real desktop and mobile layout through the existing host's branch preview or the local server before release.

## Content to confirm in a visual review

The owner states all features can be tried free within the two-file allowance. The supplied app screenshot still labels “Antwort erstellen” Premium. The website follows the owner's statement; the app label should be reconciled.

Team profiles and photographs have not been supplied. The About page explains the product's purpose without adding personal profiles.

## References

- Product/store: https://apps.apple.com/de/app/papierpilot/id6788533712
- Design references: https://www.glean.com/ and https://www.by-kin.com/
- Existing privacy policy: https://papierpilot.app/datenschutz
