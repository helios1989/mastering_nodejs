/*
 * CLI-related task
 */

// Dependencies
const readLine = require('readline'),
    util = require('util'),
    debug = require('debug'),
    events = require('events');
class _events extends events {};
var e = new _events();

// Instantiate the cli module object
const cli = {};
cli.responders = {};

// Even on listener
e.on('help', () => {
    cli.responders.help();
});

e.on('exit', (str) => {
    cli.responders.exit();
});
// Input processor
cli.processInput = function(str) {
    str = typeof(str) === 'string' &&
        str.trim().length ? str.trim() : false;
    // Only process the input if the user actually wrote something, otherwise ignore it
    if (str) {
        let uniqueInput = [
            'exit',
            'man',
            'help',
            'stats',
            'line',
            'list users',
            'more user info',
            'list checks',
            'more check info',
            'list logs',
            'more log info'
        ];

        // Go through the possible inputs, emit when a match found
        let matchFound = false;
        const counter = 0;
        uniqueInput.some(function(input) {
            if (str.toLowerCase().indexOf(input) > -1) {
                matchFound = true;
                //Emit event matching the unique input, 
                //and include the full string given
                e.emit(input, str);
                return true;
            }
            console.log(`matchFound is ${input}`);
            // if no match found, tell the user try again
            if (!matchFound) {
                console.log('Sorry, try again');
            }
        });

    }
}


// Create a vertical space
cli.verticalSpace = (lines) => {
    lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
    for (i = 0; i < lines; i++) {
        console.log('');
    }
};

cli.horizontalLine = () => {
        // get the available screen size
        let width = process.stdout.columns;

        // Put in enough dashes to go across the screen
        let line = '';
        for (i = 0; i < width; i++) {
            line += '-';
        }
        console.log(line);
    }
    // Create centered text on the screen
cli.centered = (str) => {
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';

    // Get the available screen size
    let width = process.stdout.columns;
    // Calculate the left padding there should be
    let leftPadding = Math.floor((width - str.length) / 2);

    let line = '';
    for (i = 0; i < leftPadding; i++) {
        line += ' ';
    }
    line += str;
    console.log(line);
}

// Exit
cli.responders.exit = () => {
    process.exit(0);
}

cli.responders.help = () => {
    // Codify the commands and their explanations

    let commands = {
        'exit': 'kill the CLI (and the rest of the application)',
        'man': 'Show this help page',
        'help': 'Alias of the "man" command',
        'stats': 'Get statistics on the underlying operating system and resource utilization',
        'List users': 'Show a list of all the registered (undeleted) users in the system',
        'More user info --{userId}': 'Show details of a specified user',
        'List checks --up --down': 'Show a list of all the active checks in the system, including their state. The "--up" and "--down flags are both optional."',
        'More check info --{checkId}': 'Show details of a specified check',
        'List logs': 'Show a list of all the log files available to be read (compressed and uncompressed)',
        'More log info --{logFileName}': 'Show details of a specified log file'
    }

    cli.horizontalLine();
    cli.centered('CLI MANUAL');
    cli.horizontalLine();
    cli.verticalSpace(2);

    // Show each command, followed by its explanation, in white and yellow respectively
    for (var key in commands) {
        if (commands.hasOwnProperty(key)) {
            var value = commands[key];
            var line = '      \x1b[33m ' + key + '      \x1b[0m';
            var padding = 60 - line.length;
            for (i = 0; i < padding; i++) {
                line += ' ';
            }
            line += value;
            console.log(line);
            cli.verticalSpace();
        }
    }

    cli.verticalSpace(1);
    // End with another horizontal line
    cli.horizontalLine();
}
cli.init = function() {
    // Send to console, in dark blue
    console.log('\x1b[34m%s\x1b[0m', 'The CLI is running');

    // Start the interface
    var _interface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ''
    });

    // Create an initial prompt
    _interface.prompt();

    // Handle each line of input separately
    _interface.on('line', function(str) {

        // Send to the input processor
        cli.processInput(str);

        // Re-initialize the prompt afterwards
        _interface.prompt();
    });

    // If the user stops the CLI, kill the associated process
    _interface.on('close', function() {
        process.exit(0);
    });

}

module.exports = cli;