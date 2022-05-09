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
        // Add variables to the DOM
        $movieOnlyResults.append("\n\n\nTitle: " + movieTitle)
        $movieOnlyResults.append(". Year: " + movieYear)
        $movieOnlyResults.append(". Rating: " + movieRating)
        $movieOnlyResults.append(". Release: " + movieRelease)
        $movieOnlyResults.append(". Genre: " + movieGenre)
        $movieOnlyResults.append(". Actors: " + movieActors)
        $movieOnlyResults.append(". Plot: " + moviePlot)
        $movieOnlyResults.append(moviePoster)
    })
}