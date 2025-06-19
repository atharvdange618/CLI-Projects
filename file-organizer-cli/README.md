# 📁 bucketize

> A beautiful, safe, and fast CLI to organize files into folders by type — images, documents, videos, and more.

![screenshot](image.png)

---

## 🚀 Features

- 🧠 Smart categorization by file extension
- 🎨 Styled prompts with [Clack](https://github.com/natemoo-re/clack) + [Chalk](https://github.com/chalk/chalk)
- 🪵 Action logs saved with timestamps
- 🧪 `--dry-run` mode for safe previews
- 🔎 Summary preview before moving files
- 📦 Supports: Images, Documents, Videos, Archives, Audio, and Others

---

## 📦 Installation

```bash
npm install -g bucketize
```

````

---

## 🧱 Usage

```bash
bucketize <directory>
```

Example:

```bash
bucketize ./Downloads
```

You'll see a breakdown like:

```bash
📊 File Summary:
› 🖼️ 3 Images
› 📄 5 Documents
› 🎬 2 Videos
› 📁 1 Others

? Proceed with organizing files in "Downloads"?
```

---

## 🛠 CLI Options

| Flag            | Description                                      |
| --------------- | ------------------------------------------------ |
| `-d, --dry-run` | Simulate moves, log actions but don’t apply them |
| `-v, --verbose` | Output every file and its destination            |
| `--help`        | Show usage guide                                 |

---

## 🗂 File Categories

| Category  | Extensions                                       |
| --------- | ------------------------------------------------ |
| Images    | `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.bmp`  |
| Documents | `.pdf`, `.doc`, `.docx`, `.txt`, `.xls`, `.pptx` |
| Videos    | `.mp4`, `.avi`, `.mkv`, `.mov`                   |
| Audio     | `.mp3`, `.wav`                                   |
| Archives  | `.zip`, `.tar`, `.gz`, `.rar`                    |
| Code      | `.js`, `.ts`, `.tsx`, `.jsx`, `.css`, `.html`    |
| Others    | Everything else                                  |

---

## 🪵 Logs

After execution, a log file is saved to:

```
YYYY-MM-DD-HHmmss.log
```

Example line in log:

```
[MOVED] budget.xlsx → Documents/
[DRY-RUN] beach.png → Images/
```

---

## 🧠 Best Practices

- Always use `--dry-run` first to preview results
- Works best on non-nested folders (v1 is non-recursive)
- Want to extend it? See roadmap below 👇

---

## 🤝 Contributing

PRs, issues, and ideas welcome!

---

## 🧾 License

MIT © [Atharv](https://github.com/atharvdange618)
````
