import fs from "fs-extra";
import path from "path";
import dayjs from "dayjs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, "..", "logs");

export async function writeLog(actions, dryRun = false) {
  await fs.ensureDir(logsDir);

  const timestamp = dayjs().format("YYYY-MM-DD-HHmmss");
  const logFile = path.join(
    logsDir,
    `${dryRun ? "dryrun-" : ""}${timestamp}.log`
  );

  const lines = actions.map((action) => {
    const status = dryRun ? "[DRY-RUN]" : "[MOVED]";
    return `${status} ${action.file} → ${action.category}/`;
  });

  await fs.writeFile(logFile, lines.join("\n"), "utf8");
}
