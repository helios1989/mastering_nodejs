/*
 * CLI tool tutorial lesson 5
 * March 30, 2018
 */

//Dependencies
const cli = require('./lib/cli');

const app = {};

app.init = function() {

    // Start the CLI, but make sure it starts last
    setTimeout(function() {
        cli.init();
    }, 50);
}

app.init();
//Export the app
module.exports = app;