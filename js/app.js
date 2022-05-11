// ELEMENT REFERENCES
// MOVIE API
const MOVIEURL = 'http://www.omdbapi.com/?apikey=18427c60&t=';
const $movieOnlyInput = $('#movie-only-input');
const $movieOnlyButton = $('#movie-only-button');
const $movieOnlyResults = $('#movie-only-results');

// BOOK API
const BOOKURL1 = 'https://www.googleapis.com/books/v1/volumes?q=';
const BOOKURL2 = '&key=AIzaSyCaHzs19q5vLpvTyOOBoIYIf0sfFKbA7zY';
const $bookOnlyInput = $('#book-only-input');
const $bookOnlyButton = $('#book-only-button');
const $bookOnlyResults = $('#book-only-results');

// BOOK AND MOVIE (BAM) API
const $bamInput = $('#bam-input');
const $bamButton = $('#bam-button');
const $bamResults = $('#bam-results')

// EVENT LISTENERS
$movieOnlyButton.click(renderMovieData);
$bookOnlyButton.click(renderBookData);
$bamButton.click(renderMovieAndBookData)

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

        // Add variables and line breaks to the DOM if the filters are checked.
        if ($('#movieTitleCB').is(":checked")){
            $movieOnlyResults.append("Title: " + movieTitle);
            lineBreak = document.createElement("br");
            $movieOnlyResults.append(lineBreak);
        }
        if ($('#movieReleaseCB').is(":checked")){
            $movieOnlyResults.append("Movie Release: " + movieRelease);
            lineBreak = document.createElement("br");
            $movieOnlyResults.append(lineBreak);
        }
        if ($('#movieRatingCB').is(":checked")){
            $movieOnlyResults.append("Movie Rating: " + movieRating);
            lineBreak = document.createElement("br");
            $movieOnlyResults.append(lineBreak);
        }
        if ($('#movieGenreCB').is(":checked")){
            $movieOnlyResults.append("Movie Genre: " + movieGenre);
            lineBreak = document.createElement("br");
            $movieOnlyResults.append(lineBreak);
        }
        if ($('#movieActorsCB').is(":checked")){
            $movieOnlyResults.append("Movie Actors: " + movieActors);
            lineBreak = document.createElement("br");
            $movieOnlyResults.append(lineBreak);
        }
        if ($('#moviePlotCB').is(":checked")){
            $movieOnlyResults.append("Movie Plot: " + moviePlot);
            lineBreak = document.createElement("br");
            $movieOnlyResults.append(lineBreak);
        }
        if ($('#moviePosterCB').is(":checked")){
            $movieOnlyResults.append(moviePoster);
            lineBreak = document.createElement("br")
            $movieOnlyResults.append(lineBreak);
        }
    })
}

// BOOK-ONLY DATA
function renderBookData(event) {
    // Prevent page from refreshing upon form submission
    event.preventDefault;
    
    // Get user input from the input form
    let userInput = $bookOnlyInput.val();
    userInput = userInput.toLowerCase();
    console.log(userInput);
    
    // Pull data from API
    $.ajax(BOOKURL1 + userInput + BOOKURL2).then(function (data) {
        // Cycle through books to find english version w/ an author and poster.
        bookNumber = 0;
        let bookTitle = data.items[bookNumber].volumeInfo.title;

        while (data.items[bookNumber].volumeInfo.language != "en"){
            bookNumber++;
        }

        while (data.items[bookNumber].volumeInfo.authors == undefined){
            bookNumber++;
        }

        while (data.items[bookNumber].volumeInfo.imageLinks.thumbnail == undefined){
            bookNumber++;
        }

        console.log(bookTitle);
        const bookAuthor = data.items[bookNumber].volumeInfo.authors;
        // console.log(bookAuthor);
        const bookYear = data.items[bookNumber].volumeInfo.publishedDate;
        // console.log(bookYear);     
        const bookGenre = data.items[bookNumber].volumeInfo.categories;
        // console.log(bookGenre);
        const bookPlot = data.items[bookNumber].volumeInfo.description;
        // console.log(bookPlot);
        const bookPoster = `<img src="${data.items[bookNumber].volumeInfo.imageLinks.thumbnail}"/>` // don't forget to check for the poster existance before appending
        // console.log(bookPoster);

        // Add variables and linebreaks to the DOM
        if ($('#bookTitleCB').is(":checked")){
            $bookOnlyResults.append("Book Title: " + bookTitle);
            lineBreak = document.createElement("br");
            $bookOnlyResults.append(lineBreak);
        }
        if ($('#bookAuthorCB').is(":checked")){
            $bookOnlyResults.append("Book Author: " + bookAuthor);
            lineBreak = document.createElement("br");
            $bookOnlyResults.append(lineBreak);
        }
        if ($('#bookYearCB').is(":checked")){
            $bookOnlyResults.append("Book Year: " + bookYear);
            lineBreak = document.createElement("br");
            $bookOnlyResults.append(lineBreak);
        }
        if ($('#bookGenreCB').is(":checked")){
            $bookOnlyResults.append("Book Genre: " + bookGenre);
            lineBreak = document.createElement("br");
            $bookOnlyResults.append(lineBreak);
        }
        if ($('#bookPlotCB').is(":checked")){
            $bookOnlyResults.append("Book Plot: " + bookPlot);
            lineBreak = document.createElement("br");
            $bookOnlyResults.append(lineBreak);
        }
        if ($('#bookPosterCB').is(":checked")){
            $bookOnlyResults.append(bookPoster);
            lineBreak = document.createElement("br");
            $bookOnlyResults.append(lineBreak);
        }
    })
}

// Contact Form
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


// Movie and Book Data Render

function renderMovieAndBookData(event) {
    // Prevent screen refresh
    event.preventDefault();

    // Get user input from the input form
    const userInput = $bamInput.val()
    console.log(userInput);

    // Pull data from Movie API
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

        // Add variables and line breaks to the DOM if the filters are checked.
        if ($('#movieTitleCB').is(":checked")){
            $bamResults.append("Movie Title: " + movieTitle);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
        if ($('#movieReleaseCB').is(":checked")){
            $bamResults.append("Movie Release: " + movieRelease);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
        if ($('#movieRatingCB').is(":checked")){
            $bamResults.append("Movie Rating: " + movieRating);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
        if ($('#movieGenreCB').is(":checked")){
            $bamResults.append("Movie Genre: " + movieGenre);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
        if ($('#movieActorsCB').is(":checked")){
            $bamResults.append("Movie Actors: " + movieActors);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
        if ($('#moviePlotCB').is(":checked")){
            $bamResults.append("Movie Plot: " + moviePlot);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
        if ($('#moviePosterCB').is(":checked")){
            $bamResults.append(moviePoster);
            lineBreak = document.createElement("br")
            $bamResults.append(lineBreak);
        }
    })

    // Pull book data and put it on the DOM
    $.ajax(BOOKURL1 + userInput + BOOKURL2).then(function (data) {
        // Cycle through books to find english version w/ an author and poster.
        bookNumber = 0;
        let bookTitle = data.items[bookNumber].volumeInfo.title;

        while (data.items[bookNumber].volumeInfo.language != "en"){
            bookNumber++;
        }

        while (data.items[bookNumber].volumeInfo.authors == undefined){
            bookNumber++;
        }

        while (data.items[bookNumber].volumeInfo.imageLinks.thumbnail == undefined){
            bookNumber++;
        }

        console.log(bookTitle);
        const bookAuthor = data.items[bookNumber].volumeInfo.authors;
        // console.log(bookAuthor);
        const bookYear = data.items[bookNumber].volumeInfo.publishedDate;
        // console.log(bookYear);     
        const bookGenre = data.items[bookNumber].volumeInfo.categories;
        // console.log(bookGenre);
        const bookPlot = data.items[bookNumber].volumeInfo.description;
        // console.log(bookPlot);
        const bookPoster = `<img src="${data.items[bookNumber].volumeInfo.imageLinks.thumbnail}"/>` // don't forget to check for the poster existance before appending
        // console.log(bookPoster);

        // Add variables and linebreaks to the DOM
        if ($('#bookTitleCB').is(":checked")){
            $bamResults.append("Book Title: " + bookTitle);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
        if ($('#bookAuthorCB').is(":checked")){
            $bamResults.append("Book Author: " + bookAuthor);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
        if ($('#bookYearCB').is(":checked")){
            $bamResults.append("Book Year: " + bookYear);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
        if ($('#bookGenreCB').is(":checked")){
            $bamResults.append("Book Genre: " + bookGenre);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
        if ($('#bookPlotCB').is(":checked")){
            $bamResults.append("Book Plot: " + bookPlot);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
        if ($('#bookPosterCB').is(":checked")){
            $bamResults.append(bookPoster);
            lineBreak = document.createElement("br");
            $bamResults.append(lineBreak);
        }
    })
}

// Google Books API Key: AIzaSyCaHzs19q5vLpvTyOOBoIYIf0sfFKbA7zY