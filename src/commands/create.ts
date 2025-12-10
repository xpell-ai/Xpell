import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import type { ParsedArgs } from "../utils/args.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runCreate(args: ParsedArgs) {
  const projectName = args.projectName;

  if (!projectName) {
    console.error("❗ Please specify a project name: xpell create myapp");
    process.exit(1);
  }

  // For now, default to "client" if no flag given
  let template = "client";
  if (args.flags.has("--client")) template = "client";
  // Future:
  // if (args.flags.has("--server")) template = "server";
  // if (args.flags.has("--full")) template = "full";
  // if (args.flags.has("--agent")) template = "agent";

  const projectPath = path.join(process.cwd(), projectName);
  const templatePath = path.join(__dirname, "../../templates", template);

  if (!fs.existsSync(templatePath)) {
    console.error(`❗ Template "${template}" not found at ${templatePath}`);
    process.exit(1);
  }

  if (fs.existsSync(projectPath) && fs.readdirSync(projectPath).length > 0) {
    console.error(`❗ Directory "${projectName}" already exists and is not empty.`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath, { recursive: true });

  console.log(`📁 Creating Xpell.ai project in ./` + projectName);
  fs.cpSync(templatePath, projectPath, { recursive: true });

  console.log("📦 Installing dependencies (this may take a moment)...");
  try {
    execSync("npm install", { cwd: projectPath, stdio: "inherit" });
  } catch (err) {
    console.error("❗ npm install failed. You may need to run it manually.");
  }

  console.log(`
✨ Xpell.ai client project created!

Next steps:
  cd ${projectName}
  npm run dev

Have fun with Xpell.ai 🚀
`);
}
