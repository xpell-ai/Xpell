export function showHelp() {
  console.log(`
Xpell.ai CLI

Usage:
  xpell create <project-name> [options]

Options:
  --client   Create client-only (Xpell-UI) project  [default for now]
  --server   (reserved) Create server-only project
  --full     (reserved) Create full stack project
  --agent    (reserved) Create agent project

Examples:
  npx xpell create myapp --client
  npx xpell create myapp
`);
}
