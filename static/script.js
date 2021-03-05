var video = document.getElementById('video-el');
var itemsBox = document.getElementById('search-results');
var errorBox = document.getElementsByClassName('err')[0];
var searchBar = document.getElementById('search-bar');
var downloadButton = document.getElementById('download-button');
var resultsBox = document.getElementById('results-area');


function search() {
    let t = searchBar.value;

    if (t.startsWith("https://") || t.startsWith("www")) {
        return window.location = window.location.href.split('?')[0] + '?ref=' + t;
    }

    // Make sure search box is empty. This is also handled on the server but client side does it first to increase performance.
    if (t === '') return errorBox.innerHTML = 'Cannot leave empty';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            showResults(this.responseText);
        } else if (this.status == 404) { // To fix referral errors
            errorBox.innerHTML = 'Make a search and press go. Select an item from the list.';
        } else if (this.status == 437) { // Custom error code for empty search box.
            hideWindow();
            errorBox.innerHTML = 'Cannot leave empty';
        }
    };

    xhttp.open("GET", "./search?q=" + t, true); // Make request to server
    xhttp.send();

    resultsBox.innerHTML = 'Loading results...'; // To enhance UI
    showWindow();
}

function showResults(result) { // Upon receiving results...

    result = JSON.parse(result);

    let resultsHTML = '';

    for (let key in result.items) {
        if (result.items[key].type != 'video') continue; // Skip over any channels/playlists etc.

        resultsHTML += `<a href="${window.location.href.split('?')[0] + '?ref=' + result.items[key].link}">
      <div class='yt-result'>

      <div class="result-text">
        <h1>${result.items[key].title}</h1>
        <h2>Uploaded by: ${result.items[key].author.name}</h2>
        <h2>${result.items[key].description}</h2>
        <h3>${result.items[key].duration}</h3>
        </div>
        <img class='result-img' src="${result.items[key].thumbnail}">
      </div>
      <hr>
    </a>`; // Present the JSON cleanly


    }
    resultsBox.innerHTML = resultsHTML;

}

function hideWindow() {
    itemsBox.style.display = 'none';
    video.style.display = 'block';
}

function showWindow() {
    itemsBox.style.display = 'block';
    video.style.display = 'none';
}


const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('ref') !== undefined) {
    video.src = window.location.href.split('?')[0] + 'video/?q=' + urlParams.get('ref');
    downloadButton.href = video.src;
    video.load();
}

