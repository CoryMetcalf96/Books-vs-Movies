// ELEMENT REFERENCES
const MOVIEURL = 'http://www.omdbapi.com/?apikey=18427c60&t=';
const $movieOnlyInput = $('.search-bar');
const $movieOnlyButton = $('#movie-only-button')
const $movieOnlyResults = $('#movie-only-results')


// EVENT LISTENERS
$movieOnlyButton.click(renderMovieData)

// FUNCTIONS
function renderMovieData(event) {
    event.preventDefault();
    console.log("Hello");

    // Get user input from the input form
    const userInput = $movieOnlyInput.val()
    console.log(userInput)

    // Pull data from log, using .then to stall.
    $.ajax(MOVIEURL + userInput).then(function (data) {
        // Assign the data from the API to set variables.
        const moviePoster = `<img src="${data.Poster}"/>`
        const movieTitle = data.Title;
        const movieYear = data.Year;
        const movieRating = data.Rated;
        const movieRelease = data.Released;
        const movieGenre = data.Genre;
        const movieActors = data.Actors;
        const moviePlot = data.Plot;
        // Add variables and line breaks to the DOM
        $movieOnlyResults.append("Title: " + movieTitle);
        lineBreak = document.createElement("br");
        $movieOnlyResults.append(lineBreak);
        $movieOnlyResults.append("Year: " + movieYear);
        lineBreak = document.createElement("br");
        $movieOnlyResults.append(lineBreak);
        $movieOnlyResults.append("Rating: " + movieRating);
        lineBreak = document.createElement("br");
        $movieOnlyResults.append(lineBreak);
        $movieOnlyResults.append("Release: " + movieRelease);
        lineBreak = document.createElement("br");
        $movieOnlyResults.append(lineBreak);
        $movieOnlyResults.append("Genre: " + movieGenre);
        lineBreak = document.createElement("br");
        $movieOnlyResults.append(lineBreak);
        $movieOnlyResults.append("Actors: " + movieActors);
        lineBreak = document.createElement("br");
        $movieOnlyResults.append(lineBreak);
        $movieOnlyResults.append("Plot: " + moviePlot);
        lineBreak = document.createElement("br");
        $movieOnlyResults.append(lineBreak);
        $movieOnlyResults.append(moviePoster);
    })
}

function sendEmail() {
    Email.send({
        Host : "smtp.yourisp.com",
        Username : "username",
        Password : "password",
        To : 'corymetcalf96@gmail.com',
        From : "you@isp.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}