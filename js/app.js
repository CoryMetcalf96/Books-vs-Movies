// ELEMENT REFERENCES
// MOVIE API
const MOVIEURL = 'http://www.omdbapi.com/?apikey=18427c60&t=';
const $movieOnlyInput = $('#movie-only-input');
const $movieOnlyButton = $('#movie-only-button')
const $movieOnlyResults = $('#movie-only-results')

// BOOK API
const BOOKURL1 = 'https://www.googleapis.com/books/v1/volumes?q='
const BOOKURL2 = '&key=AIzaSyCaHzs19q5vLpvTyOOBoIYIf0sfFKbA7zY'
const $bookOnlyInput = $('#book-only-input')
const $bookOnlyButton = $('#book-only-button')
const $bookOnlyResults = $('#book-only-results')


// EVENT LISTENERS
$movieOnlyButton.click(renderMovieData);
$bookOnlyButton.click(renderBookData);

// FUNCTIONS
// MOVIE-ONLY-DATA
function renderMovieData(event) {
    // Prevent screen refresh
    event.preventDefault();

    // Get user input from the input form
    const userInput = $movieOnlyInput.val();
    console.log(userInput);

    // Pull data from API
    $.ajax(MOVIEURL + userInput).then(function (data) {
        console.log(data);
        // Assign the data from the API to set preset variables for filter.
        const moviePoster = `<img src="${data.Poster}"/>`;
        const movieTitle = data.Title;
        const movieRelease = data.Released;
        const movieRating = data.Rated;
        const movieGenre = data.Genre;
        const movieActors = data.Actors;
        const moviePlot = data.Plot;
        // Add variables and line breaks to the DOM
        $movieOnlyResults.append("Title: " + movieTitle);
        lineBreak = document.createElement("br");
        $movieOnlyResults.append(lineBreak);
        $movieOnlyResults.append("Release: " + movieRelease);
        lineBreak = document.createElement("br");
        $movieOnlyResults.append(lineBreak);
        $movieOnlyResults.append("Rating: " + movieRating);
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
        lineBreak = document.createElement("br")
        $movieOnlyResults.append(lineBreak);
    })
}

// BOOK-ONLY DATA
function renderBookData(event) {
    // Prevent page from refreshing upon form submission
    event.preventDefault;
    
    // Get user input from the input form
    const userInput = $bookOnlyInput.val();
    
    // Pull data from API
    $.ajax(BOOKURL1 + userInput + BOOKURL2).then(function (data) {
        console.log(data)
        // Assign data to preset variables for filter check later on.
        const bookTitle = data.items[0].volumeInfo.title;
        console.log(bookTitle);
        const bookYear = data.items[0].volumeInfo.publishedDate;
        console.log(bookYear);     
        const bookRating = data.items[0].volumeInfo.maturityRating;
        console.log(bookRating);
        const bookGenre = data.items[0].volumeInfo.categories;
        console.log(bookGenre);
        const bookPlot = data.items[0].volumeInfo.description;
        console.log(bookPlot);
        const bookPoster = `<img src="${data.items[0].volumeInfo.imageLinks.thumbnail}"/>`
        console.log(bookPoster);
    })
}

function sendEmail() {
    Email.send({
        Host : "smtp.gmail.com",
        Username : "corymetcalftest@gmail.com",
        Password : "Someday2234",
        To : 'corymetcalf96@gmail.com',
        From : document.getElementById("email").ariaValueMax,
        Subject : "Books vs. Movies Contact Form",
        Body : "Name: " + document.getElementById("name").value + "<br> Email:" + document.getElementById("email").value + "<br> Phone: " + 
        document.getElementById("phone").value + "<br> Message" + 
        document.getElementById("message").value 
    }).then(
      message => alert("Message Sent Successfully")
    );
}

// Google Books API Key: AIzaSyCaHzs19q5vLpvTyOOBoIYIf0sfFKbA7zY