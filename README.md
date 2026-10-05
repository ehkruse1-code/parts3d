# Parts3D — Alternator Rebuild

How a car alternator was rebuilt as a measured 3-D model from three photos, told in three chapters: a melted neural mesh, an automatic simple-shapes model, and the final measured CAD. Every model can be rotated in the browser.

**Live site:** https://ehkruse1-code.github.io/parts3d/

- `index.html` — overview, chapter cards and the shared scorecard
- `melted.html`, `simple-shapes.html`, `measured.html` — the three chapters
- `site.css`, `viewer.js` — shared styles and the three.js viewer (loaded from jsDelivr)
- `alternator.glb` — the final measured model (metres, Y up, named parts, PBR materials)
- `melted.glb`, `simple-shapes.glb` — the two earlier models
- `scores.json` — every model scored against the same three photos
- `photo-front.jpg`, `photo-side.jpg`, `photo-back.jpg` — the three source photos
- `*-vs-photos.jpg`, `photo-vs-model.jpg` — each photo beside a model from the same camera
- `thumb-*.jpg`, `camera-views.jpg`, `other-angles.jpg` — renders