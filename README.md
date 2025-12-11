# Xpell.ai CLI

**Xpell** is a real-time UI and AI application framework for JavaScript/TypeScript.  
It seamlessly combines:

- ⚡ XUI — Real-time UI engine with high-FPS rendering  
- 🎮 X3D — Integrated 3D engine built on WebGL  
- 🧠 Native AI & LLM agent integration  
- 🔌 Wormholes — Real-time server sync and multi-user collaboration  
- 🛠️ CLI tools for creating and managing Xpell applications  

With Xpell, you can build interactive dashboards, AI-driven interfaces, 3D scenes,  
Flash-style animated banners, games, and high-performance applications —  
all using one unified framework.

## 🚀 Why Xpell?

Modern applications need:

- Real-time updates  
- High FPS rendering  
- Fluid animations  
- Combined 2D + 3D elements  
- AI agents that interact with users  
- Predictable, low-latency performance  

Traditional DOM frameworks like React or Vue were not designed for this.  
Game engines like Three.js don’t handle UI well.

**Xpell fills the gap** by merging UI, 3D, animation, and AI into one engine.

---

## Xpell CLI

The Xpell CLI is the official command-line interface for creating and managing Xpell projects.  
It allows you to quickly scaffold a client-side Xpell application so you can experiment with the real-time Xpell UI engine, interactive components, and 3D capabilities.

This CLI is part of the broader Xpell ecosystem described above.

---

## Quickstart

Requires Node.js 18+.

Create a new Xpell project:

    npx xpell create my-app

Or install globally:

    npm install -g xpell
    xpell create my-app

This command will:

- Generate a working Xpell client project (Vite + TypeScript + xpell-ui)  
- Install dependencies  
- Print next steps to start the development server  

---

## Commands

### Create a Project

    xpell create <project-name> [--client]

Scaffolds a new Xpell UI application using the default client template.

### Help

    xpell help

Displays CLI usage and available commands.

### Reserved for Xpell II expansion

- --server — Node backend + Wormholes  
- --full — UI + 3D + AI boilerplate  
- --agent — AIME-powered agent starter  

---

## Template Details

The default client template includes:

- Vite + TypeScript setup  
- Preconfigured xpell-ui dependency  
- Example real-time UI components  
- npm scripts: dev, build, preview  

---

## Local Development (CLI Repository)

To contribute to or modify the CLI itself:

### Install dependencies

    npm install

### Watch mode

    npm run dev

### Build CLI

    npm run build

### Clean outputs

    npm run clean

---

## License

MIT — see LICENSE.

---

## Credits

Author: Tamir Fridman  
Email: fridman.tamir@gmail.com  
First Release: 11/10/2025  
© Aime Technologies, 2022–Present
