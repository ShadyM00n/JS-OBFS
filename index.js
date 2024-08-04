

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
* All rights go to ShadyMoon 
* JS-OBFS 2024 (c)
*/
const obfuscate = require('./obfs');



// Example of running without callback
obfuscate.runFile(__dirname + "\\example.js", __dirname + '\\example2.js');


// Example of running without callback with an int
// # the higher the int the longer it takes
obfuscate.runFile(__dirname + "\\example.js", __dirname + '\\example2.js', 3);

/* Example of callback function usage
* 
*  Callback params
*  content - Returns obfuscated code
*  output - Returns output path
*  input - Returns input path
*/
obfuscate.runFile(__dirname + '\\example.js', __dirname + '\\example2.js').then((obf) => {
    console.log(`output path: ${obf.output}`)
})


/* Example of running a directory obfuscation
*  Copies files even if not javascript or typescript
*  Doesnt allow node_modules access for compactions and error reduction
*/
obfuscate.runDirectory(__dirname + `\\input`, __dirname + '\\output');


// Example of running a directory obfuscation with an int
// # the higher the int the longer it takes
obfuscate.runDirectory(__dirname + `\\input`, __dirname + '\\output', 3);
