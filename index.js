var mathLib = require('./lib/math');
var jokesLib = require('./lib/jokes');

//App object
var app = {};

app.config = {
    'timeBetweenJokes': 1000
};


//function that prints a random joke
app.printAjoke = function() {

    //Get all the jokes
    var allJokes = jokesLib.allJokes();

    // Get the length of the jokes
    var numberOfJokes = allJokes.length;

    //Pick a random number between 1 and the number of jokes
    var randomNumber = mathLib.getRandomNumber(1, numberOfJokes);

    //get the joke at that position in the array(minus one)
    var selectedJoke = allJokes[randomNumber - 1];

    // Send the Joke to the console
    console.log(selectedJoke);
};

//Function that loops indefinitely, calling the printAjoke function as it goes
app.indefiniteLoop = function() {
    // create the interval, using the config variable defined above
    setInterval(app.printAjoke, app.config.timeBetweenJokes);
};


// Invoke the loop
app.indefiniteLoop();