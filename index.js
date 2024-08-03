

/**
*  _____                                                                                               _____ 
* ( ___ )                                                                                             ( ___ )
*  |   |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|   | 
*  |   |   /$$$$$$  /$$                       /$$           /$$      /$$                               |   | 
*  |   |  /$$__  $$| $$                      | $$          | $$$    /$$$                               |   | 
*  |   | | $$  \__/| $$$$$$$   /$$$$$$   /$$$$$$$ /$$   /$$| $$$$  /$$$$  /$$$$$$   /$$$$$$  /$$$$$$$  |   | 
*  |   | |  $$$$$$ | $$__  $$ |____  $$ /$$__  $$| $$  | $$| $$ $$/$$ $$ /$$__  $$ /$$__  $$| $$__  $$ |   | 
*  |   |  \____  $$| $$  \ $$  /$$$$$$$| $$  | $$| $$  | $$| $$  $$$| $$| $$  \ $$| $$  \ $$| $$  \ $$ |   | 
*  |   |  /$$  \ $$| $$  | $$ /$$__  $$| $$  | $$| $$  | $$| $$\  $ | $$| $$  | $$| $$  | $$| $$  | $$ |   | 
*  |   | |  $$$$$$/| $$  | $$|  $$$$$$$|  $$$$$$$|  $$$$$$$| $$ \/  | $$|  $$$$$$/|  $$$$$$/| $$  | $$ |   | 
*  |   |  \______/ |__/  |__/ \_______/ \_______/ \____  $$|__/     |__/ \______/  \______/ |__/  |__/ |   | 
*  |   |                                          /$$  | $$                                            |   | 
*  |   |                                         |  $$$$$$/                                            |   | 
*  |   |                                          \______/                                             |   | 
*  |___|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|___| 
* (_____)                                                                                             (_____)
*/


/*
* Made by ShadyMoon (c)
* JS-OBFS 2024 (c)
*/
const obfuscate = require('./obfs');



// Example of running without callback
obfuscate.runFile(__dirname + '/code.js', __dirname + '/show.js');



/* Example of callback function usage
* 
*  Callback params
*  content - Returns obfuscated code
*  output - Returns output path
*  input - Returns input path
*/
obfuscate.runFile(__dirname + '/code.js', __dirname + '/show.js').then((obf) => {
    console.log(`output path: ${obf.output}`)
})

// Example of running a directory obfuscation
obfuscate.runDirectory(__dirname + '/input-dir', __dirname + '/output-dir');
