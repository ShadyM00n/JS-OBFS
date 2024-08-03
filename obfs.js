const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

class Obfuscator {
    /**
     * Obfuscates the JavaScript code from the input file and saves it to the output file.
     * @param {string} input - The path to the input JavaScript file.
     * @param {string} output - The path to the output file where the obfuscated code will be saved.
     * @returns {Promise<object>} - The result containing the obfuscated code, input path, and output path.
     */
    static async runFile(input, output) {
        const exists = await existsFilePath(input);
        if (!exists) return;
        const code = await grabFilePath(input);
        const content = await encode(code, input, output);

        fs.writeFileSync(output, content.content);
        return content;
    }

    /**
     * Recursively finds every JavaScript file in the input directory, obfuscates them, and writes them to the output directory.
     * If a file isn't JavaScript, it copies it as is to the new directory structure.
     * @param {string} inputDir - The path to the input directory.
     * @param {string} outputDir - The path to the output directory.
     */
    static async runDirectory(inputDir, outputDir) {
        const files = await getFilesRecursively(inputDir);

        for (const file of files) {
            const relativePath = path.relative(inputDir, file);
            const outputPath = path.join(outputDir, relativePath);

            if (path.extname(file) === '.js') {
                const code = await grabFilePath(file);
                const content = await encode(code, file, outputPath);
                fs.mkdirSync(path.dirname(outputPath), { recursive: true });
                fs.writeFileSync(outputPath, content.content);
            } else {
                fs.mkdirSync(path.dirname(outputPath), { recursive: true });
                fs.copyFileSync(file, outputPath);
            }
        }
    }
}

async function encode(code, input, output) {
    const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1
    });
    const data = {
        content: obfuscationResult.getObfuscatedCode(),
        input: input,
        output: output
    };
    return data;
}

async function grabFilePath(path) {
    const code = fs.readFileSync(path, { encoding: 'utf-8' });
    return code;
}

async function existsFilePath(path) {
    if (!fs.existsSync(path)) {
        console.log(`path: ${path} does not exist.`);
        return false;
    }
    return true;
}

async function getFilesRecursively(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            const res = await getFilesRecursively(filePath);
            results = results.concat(res);
        } else {
            results.push(filePath);
        }
    }
    return results;
}

module.exports = Obfuscator;
