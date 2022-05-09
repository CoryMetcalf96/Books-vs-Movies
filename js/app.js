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
        $movieOnlyResults.append(data.Title);
    })
}