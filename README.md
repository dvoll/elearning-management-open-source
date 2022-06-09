## Ausführung und Installation

Es wird die JavaScript Runtime [Node.js](https://nodejs.org/) benötigt.

1. Ausführen von `npm install` im Projektverzeichnis

2.  Für ein Development Server kann `npm run develop` ausgeführt werden, wenn ein Build erstellt werden soll `npm run build`.

    In der [gatsby-config.ts](./gatsby-config.ts) kann ein `pathPrefix` gesetzt werden, falls die Seite nicht im Root(/) einer Domain gehostet wird. Siehe dazu [Adding a Path Prefix](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/). Wenn dieser beim Build berücksichtigt werden soll, muss `npm run build-prefix` anstatt des oben genanten Build Kommandos ausgeführt werden.
    In das dann entstehende `public` Verzeichnis werden die statischen Seiten und Assets generiert.
