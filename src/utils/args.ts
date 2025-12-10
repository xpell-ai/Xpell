export interface ParsedArgs {
  command?: string;
  projectName?: string;
  flags: Set<string>;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const [command, projectName, ...rest] = argv;
  const flags = new Set<string>(
    rest.filter((arg) => arg.startsWith("--"))
  );

  return { command, projectName, flags };
}
