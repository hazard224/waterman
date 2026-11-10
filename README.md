# Waterman Center for the Arts website

A static site for the Waterman Center for the Arts in Bath, New York. Plain HTML, CSS and JavaScript: no build step, no frameworks.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: Call for Artists hero, three paths, the building, giving, email signup |
| `call-for-artists.html` | Call for Artists for the Open House |
| `classes.html` | Classes, filtered by age, type of art and day |
| `gallery.html` | Gallery & Events |
| `visit.html` | Hours, directions, contact |
| `about.html` | Mission, building, leadership, for artists, newsletter archive |
| `support.html` | Support the Waterman: gifts, membership, donors |

## Folders

- `css/styles.css`: all styles. Colors, fonts and spacing are CSS variables at the top (`:root`), matching the Waterman design system.
- `js/data.js`: **classes and events.** Edit this file to change what appears on the Classes and Gallery pages and in search.
- `js/main.js`: menu, search, class and event lists, gift amounts, the demo donation form.
- `js/search-index.js`: page headings for search. Generated; see below.
- `images/`: logos, the building photo and sample images.
- `fonts/`: TeX Gyre Schola, the free stand-in for Century Schoolbook. Jost (for Futura) loads from Google Fonts.
- `tools/build-search-index.py`: rebuilds the search index.

## Preview locally

Open `index.html` in a browser, or run a local server from this folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Common edits

- **Add or change a class or event:** edit `js/data.js`. Each class has a type (`Painting and drawing`, `Clay`, `Fiber and crafts`, `Photography`), which sets its color square.
- **Change page text:** edit the page's `.html` file. The header and footer are repeated in every page, so menu or footer changes need to be made in all seven.
- **After changing headings or page text,** run `python3 tools/build-search-index.py` so search stays current.
- **Add an art type:** add it to `typeColors` in `js/data.js`, add a `--type-…` variable in `css/styles.css`, and add a filter button in `classes.html`.

## Before launch

- Fill in everything in [brackets] and remove the placeholder notes at the bottom of each page.
- Replace the sample images in `images/` with real photos.
- Register buttons and the donation form are placeholders (email links and a demo). Connect them to the registration and payment systems the board chooses.
- Optionally embed a Google Map on `visit.html`.
- Licensed Century Schoolbook and Futura web fonts can replace the stand-ins; update the font stacks in `css/styles.css`.
