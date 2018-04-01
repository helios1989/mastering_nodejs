const mathLib = require('./lib/math'),
    environment = require('./config'),
    jokesLib = require('./lib/jokes');

//App object
let app = {};

app.config = {
    'timeBetweenJokes': 1000
};


//function that prints a random joke
app.printAjoke = () => {

    //Get all the jokes
    let allJokes = jokesLib.allJokes();

    // Get the length of the jokes
    let numberOfJokes = allJokes.length;

    //Pick a random number between 1 and the number of jokes
    let randomNumber = mathLib.getRandomNumber(1, numberOfJokes);

    //get the joke at that position in the array(minus one)
    let selectedJoke = allJokes[randomNumber - 1];

    // Send the Joke to the console
    console.log(selectedJoke);
};

//Function that loops indefinitely, calling the printAjoke function as it goes
app.indefiniteLoop = () => {
    // create the interval, using the config variable defined above
    setInterval(app.printAjoke, app.config.timeBetweenJokes);
};


// Invoke the loop
app.indefiniteLoop();