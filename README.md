# Meto Dwom 2nd Edition — apparel mockup

A print-approval presentation for the **Meto Dwom 2nd Edition** T-shirt range. The design uses the alto clef and whole note mark on the left chest and the **METO DWOM / 2ND EDITION** wordmark on the back, across three garment colours: White, Green and Blue.

The mockup is built as a self-contained website. The shirt photography is a recoloured, cleaned reference base; the artwork is printed into each image so what you see is what the final placement is meant to feel like.

## View it

Open `index.html` directly in a browser, or serve the folder locally:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`. A direct file open works too; the fonts, images and scripts are all local.

Use the swatches in the stage or select a colour card to change the featured colourway. Append `?colour=green` or `?colour=blue` to the URL to load a specific colour directly.

## What's inside

```text
index.html                  presentation page
assets/
  css/style.css              page styles
  js/app.js                  colourway data and stage interactions
  fonts/                     Fraunces + Archivo (self-hosted)
  img/tees/                  3 colourways × front/back mockups
  img/detail-*.webp          chest and back close-ups
  img/wood.webp              stage backdrop
print/
  meto-dwom-mark.svg         chest mark, black vector
  meto-dwom-back.svg         back wordmark, black vector (outlined text)
  meto-dwom-chest-*.png      300 DPI chest artwork, three inks
  meto-dwom-back-*.png       300 DPI back artwork, three inks
  meto-dwom-print-pack.zip   all of the above
  README.md                  printer notes, sizes and placement
exports/
  meto-dwom-hero-white.png   presentation hero image
  meto-dwom-colourways.png   three-colourway contact sheet
```

## Design system

- **Mark** — alto clef and whole note on a five-line staff, redrawn as a crisp single-colour vector. It appears on the left chest only.
- **Type** — METO DWOM in Fraunces; 2ND EDITION in tracked Archivo. The back is wordmark-only.
- **Ink** — espresso `#2A2119`, warm ecru `#F1E5CD`, antique gold `#E0AE58`.
- **Placement** — chest mark only on the front; wordmark and edition line only on the back. No front centre print.

## Print sizes

- Chest mark: 3.25 × 1.30 in, 7 in below the shoulder seam, 3.25 in from centre (wearer's left).
- Back wordmark: 8.6 × 1.7 in, centred, 3.25 in below the collar seam.
- Files: transparent 300 DPI PNG and editable SVG. See `print/README.md` for the full printer sheet.

## Colourways

| Colour | Garment | Ink |
|---|---|---|
| White | `#F1EADF` | Espresso |
| Green | `#3B4A39` | Warm ecru |
| Blue | `#2A3650` | Antique gold |

Suggested blank: heavyweight garment-dyed cotton tee (Comfort Colors 1717 or similar). Garment-dyed lots vary; confirm physical shades before printing.

## Notes

- The mockup images are for presentation and placement approval, not for printing. Use the files in `print/`.
- Screen colours are approximations of printed ink and garment-dyed fabric.
- Fraunces and Archivo are licensed under the SIL Open Font License. The notation mark is an original vector redraw of the supplied reference.
- The reference mockup photography was used as a base for the shirt presentation; the print has been replaced with the Meto Dwom artwork.
