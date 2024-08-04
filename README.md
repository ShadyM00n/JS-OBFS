# JS-OBFS

**JS-OBFS** is a powerful tool designed to obfuscate JavaScript code and save the obfuscated code to other files. With customizable obfuscation settings, you can protect your JavaScript code from unauthorized access or reverse engineering.

---

## 🛠️ Features

- **JavaScript Obfuscation:** Secure your JavaScript code by obfuscating it.
- **File Handling:** Easily handle single files or directories.
- **Callback Support:** Use callbacks for handling obfuscation results.

---

## 📥 Installation

To get started with JS-OBFS, clone the repository and install the dependencies:

```bash
git clone https://github.com/ShadyM00n/JS-OBFS.git
cd JS-OBFS
npm install javascript-obfuscator path fs js-beautify
```

---

## 🚀 Usage

### Obfuscate a Single File

To obfuscate a single JavaScript file and save the output to another file, use the following code:

```javascript
const obfuscate = require('./obfs');

obfuscate.run(__dirname + '/code.js', __dirname + '/show.js');
```

### Obfuscate with Callback

You can also use a callback to handle the obfuscation result:

```javascript
obfuscate.run(__dirname + '/code.js', __dirname + '/show.js').then((obf) => {
    console.log(`Output path: ${obf.output}`);
});
```
### Obfuscate a Directory

To obfuscate all JavaScript files in a directory and preserve the directory structure, use:

```javascript
obfuscate.runDirectory(__dirname + '/input-dir', __dirname + '/output-dir');
```

---

## 📄 API

### `obfuscate.run(inputPath, outputPath)`

Obfuscates the JavaScript code in `inputPath` and saves it to `outputPath`.

- **`inputPath`**: The path to the input JavaScript file.
- **`outputPath`**: The path to the output file where the obfuscated code will be saved.

Returns a promise that resolves with an object containing:
- **`content`**: The obfuscated code.
- **`input`**: The input path.
- **`output`**: The output path.

### `obfuscate.runDirectory(inputDir, outputDir)`

Recursively obfuscates all JavaScript files in `inputDir` and saves them to `outputDir`. Non-JavaScript files are copied as is.

- **`inputDir`**: The path to the input directory.
- **`outputDir`**: The path to the output directory.

---

## 📄 License

**JS-OBFS** is licensed under the [MIT License](LICENSE).

Made by ShadyMoon (c) 2024
