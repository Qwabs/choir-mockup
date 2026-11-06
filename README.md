# Meto Dwom 2nd Edition — apparel mockup

A print-approval presentation for the **Meto Dwom 2nd Edition** T-shirt range. The front keeps the alto-clef staff mark. The back pairs **METO DWOM** with the supplied treble clef in two studies — note above and note below — across three garment colours: White, Green and Blue. The back no longer carries the edition line.

The mockup is built as a self-contained website. The shirt photography is a recoloured, cleaned reference base; the artwork is printed into each image so what you see is what the final placement is meant to feel like.

## View it

Open `index.html` directly in a browser, or serve the folder locally:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`. A direct file open works too; the fonts, images and scripts are all local.

Use the swatches in the stage or the Back studies section to change colour. On phones, use the Front/Back control and the Back note Above/Below control. Deep links are supported:

- `?colour=green`
- `?colour=blue&view=back&back=below`

## What's inside

```text
index.html                  presentation page
assets/
  css/style.css              page styles
  js/app.js                  colourway, view and back-study state
  fonts/                     Fraunces + Archivo (self-hosted)
  img/tees/                  3 fronts + 6 back studies
  img/detail-*.webp          chest and back close-ups
  img/wood.webp              stage backdrop
print/
  meto-dwom-mark.svg         chest mark, black vector
  meto-dwom-back-above.svg   treble clef above wordmark
  meto-dwom-back-below.svg   wordmark above treble clef
  meto-dwom-chest-*.png      300 DPI chest artwork, three inks
  meto-dwom-back-*.png       300 DPI back studies, three inks
  meto-dwom-print-pack.zip   all of the above (13 files)
  README.md                  printer notes, sizes and placement
exports/
  meto-dwom-hero-white.png   presentation hero image
  meto-dwom-colourways.png   three-colourway contact sheet
  meto-dwom-back-studies.png six back-study comparison
```

## Design system

- **Front mark** — alto clef and whole note on a five-line staff. Chest only.
- **Back studies** — supplied treble clef with two dots, placed above or below the METO DWOM wordmark. No edition line.
- **Type** — METO DWOM in Fraunces; no subtitle on the back.
- **Ink** — espresso `#2A2119`, warm ecru `#F1E5CD`, antique gold `#E0AE58`.
- **Placement** — chest mark on the front; one of the two back studies on the back.

## Print sizes

- Chest mark: 3.25 × 1.30 in, 7 in below the shoulder seam, 3.25 in from centre (wearer's left).
- Back note above: 8.6 × 4.0 in, centred, top 3 in below the collar seam.
- Back note below: 8.6 × 4.4 in, centred, wordmark top 2.65 in below the collar seam; clef stays in place.
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
- Fraunces and Archivo are licensed under the SIL Open Font License. The notation marks are original vector redraws from the supplied reference.
- The reference mockup photography was used as a base for the shirt presentation; the print has been replaced with the Meto Dwom artwork.
