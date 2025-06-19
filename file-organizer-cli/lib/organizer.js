import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { writeLog } from "./logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXTENSION_MAP = {
  Images: [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg", "webp"],
  Documents: [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
  ],
  Videos: [".mp4", ".avi", ".mov", ".mkv"],
  Audio: [".mp3", ".wav"],
  Code: [".js", ".ts", ".jsx", ".tsx", ".css", ".html"],
  Archives: [".zip", ".rar", ".tar", ".gz"],
};

function getCategory(ext) {
  ext = ext.toLowerCase();
  for (const [folder, extensions] of Object.entries(EXTENSION_MAP)) {
    if (extensions.includes(ext)) return folder;
  }
  return "Others";
}

export async function organizeDirectory(targetDir, options = {}) {
  const { dryRun = false, verbose = false } = options;

  if (!(await fs.pathExists(targetDir))) {
    throw new Error(`Directory "${targetDir}" does not exist.`);
  }

  const entries = await fs.readdir(targetDir, { withFileTypes: true });

  const actions = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name);
    const category = getCategory(ext);
    const srcPath = path.join(targetDir, entry.name);
    const destDir = path.join(targetDir, category);
    const destPath = path.join(destDir, entry.name);

    if (verbose) {
      console.log(chalk.gray(`› ${entry.name} → ${category}/`));
    }

    if (!dryRun) {
      await fs.ensureDir(destDir);
      await fs.move(srcPath, destPath, { overwrite: false });
    }

    actions.push({
      file: entry.name,
      from: srcPath,
      to: destPath,
      category,
      dryRun,
    });
  }
  await writeLog(actions, dryRun);
}

export async function scanDirectory(targetDir) {
  if (!(await fs.pathExists(targetDir))) {
    throw new Error(`Directory "${targetDir}" does not exist.`);
  }

  const entries = await fs.readdir(targetDir, { withFileTypes: true });
  const summary = {
    Images: 0,
    Documents: 0,
    Videos: 0,
    Audio: 0,
    Archives: 0,
    Others: 0,
  };

  const files = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name);
    const category = getCategory(ext);
    summary[category] = (summary[category] || 0) + 1;

    files.push({ name: entry.name, category });
  }

  return { summary, files };
}
