# Xpell.ai CLI

Command-line tool for creating and managing Xpell.ai projects. The current release scaffolds a client-side Xpell UI starter so you can experiment with the Xpell real-time UI engine quickly.

## Quickstart

Requires Node.js 18+.

```bash
npx xpell create my-app
# or install globally
npm install -g xpell
xpell create my-app
```

This will:
- Copy the default `client` template (Vite + TypeScript + `xpell-ui`)
- Run `npm install` inside the new project
- Print next steps to start the dev server

## Commands

- `xpell create <project-name> [--client]` – scaffolds a client Xpell UI app (current default)
- `xpell help` – prints CLI usage

Reserved flags for future templates: `--server`, `--full`, `--agent`.

## Template details

The `client` template (`templates/client`) ships with:
- Vite + TypeScript setup
- `xpell-ui` dependency
- npm scripts: `dev`, `build`, `preview`

## Local development (this repo)

```bash
npm install        # install deps
npm run dev        # run CLI in watch mode (tsx src/bin.ts)
npm run build      # emit compiled CLI to dist/
npm run clean      # remove dist
```

## License

MIT — see `LICENSE`.


# Credits & License

Author: Tamir Fridman
Email: fridman.tamir@gmail.com

First Release: 11/10/2025
License: MIT
Copyright: © Aime Technologies, 2022–Present
