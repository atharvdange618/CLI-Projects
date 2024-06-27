# CLI QR Code Generator

A simple CLI-based QR code generator that allows users to generate QR codes in PNG, PDF, and SVG formats. This project uses `inquirer` for user prompts, `qr-image` for generating QR codes, `pdfkit` for creating PDF files, and `svg2img` for converting SVG to image buffers.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/atharvdange618/CLI-Projects.git
   cd CLI-Projects/CLI-QR-Generator
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

## Usage

1. Run the script:

   ```sh
   node index.js
   ```

2. Follow the prompts to enter the URL, specify the output file name, and choose the file format (PNG, PDF, or SVG).

## Example

```sh
? Type in your URL:  https://github.com/atharvdange618/CLI-Projects
? Enter the output file name (without extension):  github-link
? Choose the file format:  pdf
```

## Dependencies

- [inquirer](https://www.npmjs.com/package/inquirer)
- [qr-image](https://www.npmjs.com/package/qr-image)
- [fs](https://nodejs.org/api/fs.html)
- [path](https://nodejs.org/api/path.html)
- [pdfkit](https://www.npmjs.com/package/pdfkit)
- [svg2img](https://www.npmjs.com/package/svg2img)

## Contribution

Your contributions and suggestions are welcome! Here's how you can contribute to this repository:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Contact

If you have any questions or suggestions, please feel free to contact me:

- Email: [atharvdange.dev@gmail.com](mailto:atharvdange.dev@gmail.com)
- LinkedIn: [Atharv Dange](www.linkedin.com/in/atharvdange)
- Twitter: [@atharvdangedev](https://twitter.com/atharvdangedev)
