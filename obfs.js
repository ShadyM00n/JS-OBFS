const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

class Obfuscator {
    /**
     * Obfuscates the JavaScript code from the input file and saves it to the output file.
     * @param {string} input - The path to the input JavaScript file.
     * @param {string} output - The path to the output file where the obfuscated code will be saved.
     * @param {number} [count=1] - The number of times to obfuscate for more security
     * @returns {Promise<object>} - The result containing the obfuscated code, input path, and output path.
     */
    static async runFile(input, output, count = 1) {
        try {
            
            const exists = await existsFilePath(input);
            if (!exists) return;

            let code = await grabFilePath(input);
            let content = await encode(code, input, output);


            switch (grabFileType(input)) {
                case '.js' || '.ts':
                for (let i = 0; i < count; i++) {
                    code = content.content;
                }
                await fs.promises.writeFile(output, content.content);
                return content;

                break;
                default: 
                await fs.promises.writeFile(output, content.content);
                return content;
                break;
            }






        } catch (err) {
            console.error(`Error in runFile: ${err.message}`);
        }
    }
    /**
     * Recursively finds every JavaScript file in the input directory, obfuscates them, and writes them to the output directory.
     * If a file isn't JavaScript/TypeScript, it copies it as is to the new directory structure.
     * @param {string} inputDir - The path to the input directory.
     * @param {string} outputDir - The path to the output directory.
     */
    static async runDirectory(inputDir, outputDir, count = 1) {
        try {
            const files = await getFilesRecursively(inputDir);
            if (inputDir.includes('node_modules')) return console.log(`Cannot Access node_modules ( Not Allowed )`);

            for (const file of files) {
                const relativePath = path.relative(inputDir, file);
                const outputPath = path.join(outputDir, relativePath);

                await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });

                if (grabFileType(file) == '.js' || grabFileType(file) == '.ts') {
                    let code = await grabFilePath(file);
                    let content;
                    for (let i = 0; i < count; i++) {
                        content = await encode(code, file, outputPath);
                        code = content.content;
                    }
                    await fs.promises.writeFile(outputPath, content.content);
                    console.log(`Encrypted | ${outputDir}\\${relativePath}`)
                } else {
                    await fs.promises.copyFile(file, outputPath);
                    console.log(`Cloned | ${outputDir}\\${relativePath}`)
                }
            }
        } catch (err) {
            console.log(`| Failed Encrypt |`)
        }
    }

}

/**
 * Obfuscates the given JavaScript code using the JavaScript Obfuscator.
 * @param {string} code - The JavaScript code to obfuscate.
 * @param {string} input - The path to the input file.
 * @param {string} output - The path to the output file.
 * @returns {Promise<object>} - The result containing the obfuscated code, input path, and output path.
 */
async function encode(code, input, output) {
    try {
        const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1,
        });
        return {
            content: obfuscationResult.getObfuscatedCode(),
            input: input,
            output: output
        };
    } catch (err) {
        console.error(`Error in encode: ${err.message}`);
        throw err; // Re-throw error to be handled by caller
    }
}

/**
 * Reads the content of a file given its path.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<string>} - The content of the file.
 */
async function grabFilePath(filePath) {
    try {
        return await fs.promises.readFile(filePath, 'utf-8');
    } catch (err) {
        console.error(`Error reading file ${filePath}: ${err.message}`);
        throw err; // Re-throw error to be handled by caller
    }
}

/**
 * Checks if the file exists at the given path.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<boolean>} - True if the file exists, otherwise false.
 */
async function existsFilePath(filePath) {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        return true;
    } catch {
        console.log(`File path: ${filePath} does not exist.`);
        return false;
    }
}

/**
 * Recursively gets all files in a directory, excluding 'node_modules'.
 * @param {string} dir - The directory path.
 * @returns {Promise<string[]>} - An array of file paths.
 */
async function getFilesRecursively(dir) {
    let results = [];
    const list = await fs.promises.readdir(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);

        // Skip 'node_modules' directory
        if (file === 'node_modules') continue;

        const stat = await fs.promises.stat(filePath);
        if (stat && stat.isDirectory()) {
            const res = await getFilesRecursively(filePath);
            results = results.concat(res);
        } else {
            results.push(filePath);
        }
    }
    return results;
}

/**
 * Checks if the file is a JavaScript or TypeScript file.
 * @param {string} file - The path to the file.
 * @returns {boolean} - True if the file is JavaScript or TypeScript, otherwise false.
 */
function grabFileType(file) {
    const extname = path.extname(file).toLowerCase();
    switch(extname) {
        case '.js':
            return '.js'
        break;

        case '.ts':
            return '.ts'
        break;
    }
}

module.exports = Obfuscator;
