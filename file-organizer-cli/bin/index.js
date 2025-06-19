#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { organizeDirectory, scanDirectory } from "../lib/organizer.js";
import { confirm, log } from "@clack/prompts";
import { intro, outro, spinner } from "@clack/prompts";

const program = new Command();

program
  .name("organize")
  .description("CLI tool to organize files by type")
  .argument("<directory>", "Directory to organize")
  .option("-d, --dry-run", "Simulate the actions without moving files")
  .option("-v, --verbose", "Output detailed logs to console")
  .action(async (directory, options) => {
    intro(chalk.cyan("📁 File Organizer CLI"));

    let scanned;
    try {
      scanned = await scanDirectory(directory);
    } catch (err) {
      console.error(chalk.red(`❌ ${err.message}`));
      process.exit(1);
    }

    if (!options.dryRun) {
      const emojiMap = {
        Images: "🖼️",
        Documents: "📄",
        Videos: "🎬",
        Audio: "🎵",
        Archives: "🗃️",
        Others: "📁",
      };

      log.step(chalk.bold("📊 File Summary:"));

      for (const [category, count] of Object.entries(scanned.summary)) {
        if (count > 0) {
          log.step(`${emojiMap[category] || "📦"} ${count} ${category}`);
        }
      }

      const confirmed = await confirm({
        message: `Proceed with organizing files in "${directory}"?`,
      });

      if (!confirmed) {
        cancel("Operation cancelled.");
        process.exit(0);
      }
    }

    const s = spinner();
    s.start("Scanning and organizing files...");
    try {
      await organizeDirectory(directory, {
        dryRun: options.dryRun,
        verbose: options.verbose,
      });
      s.stop("✅ Done");
    } catch (err) {
      s.stop("❌ Failed");
      console.error(chalk.red(`Error: ${err.message}`));
    }

    outro("Exiting...");
  });

program.parse();
