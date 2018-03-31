/*
 * CLI-related task
 */

//Dependencies
const readLine = require('readline'),
    util = require('util'),
    debug = require('debug'),
    events = require('events');
class _events extends events {};
var e = new _events();

//Instantiate the cli module object
const cli = {
    responders: {

    }
};


//Input processor

cli.processInput = function(str) {
    str = typeof(str) === 'string' &&
        str.trim().length ? str.trim() : false;
    // Only process the input if the user actually wrote something, otherwise ignore it
    if (str) {
        let uniqueInput = [
            'man',
            'help',
            'exit',
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
            // if no match found, tell the user try again
            if (!matchFound) {
                console.log('Sorry, try again');
            }
        });

    }
}

cli.responders.line = function(str) {
    console.log(`line was called ${str}`);
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

    // handle each line of input seperately
    _interface.on('line', function(str) {
        cli.responders.line(str);
        // cli.processInput(str);

        // Re-initialize the prompt afterwards
        _interface.prompt();
    })

}

module.exports = cli;