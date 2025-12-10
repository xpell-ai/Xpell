#!/usr/bin/env node
import { parseArgs } from "./utils/args.js";
import { runCreate } from "./commands/create.js";
import { showHelp } from "./commands/help.js";

const argv = process.argv.slice(2);
const parsed = parseArgs(argv);

switch (parsed.command) {
  case "create":
    runCreate(parsed);
    break;

  case "help":
  case undefined:
  default:
    showHelp();
    break;
}
