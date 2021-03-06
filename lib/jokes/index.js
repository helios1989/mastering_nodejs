var fs = require('fs');

// App object
var jokes = {};

//Get all the jokes and return them to the user
jokes.allJokes = function() {
    //Read the text file containing the jokes
    var fileContents = fs.readFileSync(__dirname + '/jokes.txt', 'utf8');

    //Turn the string into an array
    var arrayOfJokes = fileContents.split(/\r?\n/);

    //Return the array
    return arrayOfJokes;
}

module.exports = jokes;