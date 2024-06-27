import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import svg2img from "svg2img";

const generatePNG = (url, outputFile) => {
    const qrcode = qr.image(url, { type: "png" });
    qrcode.pipe(fs.createWriteStream(outputFile));
    console.log("\x1b[32m%s\x1b[0m", `QR code generated successfully! File saved as ${outputFile}`);
};

const generatePDF = (url, outputFile) => {
    const svgString = qr.imageSync(url, { type: "svg" });
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(outputFile);
    doc.pipe(writeStream);

    svg2img(svgString, (error, buffer) => {
        if (error) {
            console.error("\x1b[31m%s\x1b[0m", "Error generating QR code:", error);
            return;
        }
        doc.image(buffer, { fit: [250, 300], align: 'center', valign: 'center' });
        doc.end();
        writeStream.on("finish", () => {
            console.log("\x1b[32m%s\x1b[0m", `QR code generated successfully! File saved as ${outputFile}`);
        });
    });
};

const generateSVG = (url, outputFile) => {
    const svgString = qr.imageSync(url, { type: "svg" });
    fs.writeFileSync(outputFile, svgString);
    console.log("\x1b[32m%s\x1b[0m", `QR code generated successfully! File saved as ${outputFile}`);
};

const isValidURL = (input) => {
    try {
        new URL(input);
        return true;
    } catch (_) {
        return "Please enter a valid URL.";
    }
};

const askQuestions = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Type in your URL: ",
                name: "URL",
                validate: isValidURL
            },
            {
                type: "input",
                message: "Enter the output file name (without extension): ",
                name: "fileName",
                default: "qrcode"
            },
            {
                type: "list",
                message: "Choose the file format: ",
                name: "format",
                choices: ["png", "svg", "pdf"],
                default: "png"
            }
        ])
        .then((answers) => {
            const outputFile = path.join(process.cwd(), `${answers.fileName}.${answers.format}`);
            if (answers.format === "png") {
                generatePNG(answers.URL, outputFile);
            } else if (answers.format === "pdf") {
                generatePDF(answers.URL, outputFile);
            } else if (answers.format === "svg") {
                generateSVG(answers.URL, outputFile);
            }
        })
        .catch((error) => {
            console.error("\x1b[31m%s\x1b[0m", "Error:", error);
        });
};

console.log(
    "\x1b[32m%s\x1b[0m",
    `
____ ____    ____ ____ _  _ ____ ____ ____ ___ ____ ____ 
|  | |__/    | __ |___ |\\ | |___ |__/ |__|  |  |  | |__/ 
|_\\| |  \\    |__] |___ | \\| |___ |  \\ |  |  |  |__| |  \\ 
`
);

askQuestions();
