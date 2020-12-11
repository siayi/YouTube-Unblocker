var video = document.getElementById('video-el');
var itemsBox = document.getElementById('search-results');
var errorBox = document.getElementsByClassName('err')[0];


function search() {
  let t = document.getElementById('search-bar').value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
      showResults(this.responseText);
    } else if (this.status == 404) {
      errorBox.innerHTML = 'Make a search and press go. Select an item from the list.';
    } else if (this.status == 437) {
      errorBox.innerHTML = 'Cannot leave empty';
    }
  };

  document.getElementById('results-area').innerHTML = 'Loading results...';
  showWindow();
  xhttp.open("GET", "./search?q=" + t, true);
  xhttp.send();
}

function showResults(result) {

  result = JSON.parse(result);

  let resultsHTML = '';

  for (let key in result.items) {
    if (result.items[key].type != 'video') continue;

    resultsHTML += `<a href="${window.location.href + '?ref=' + result.items[key].link}">
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
    </a>`;


  }
  document.getElementById('results-area').innerHTML = resultsHTML;

}

function hideWindow() {
  itemsBox.style.display = 'none';
  video.style.display = 'block';
}

function showWindow() {
  itemsBox.style.display = 'block';
  video.style.display = 'none';
}

document.body.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get('ref') !== undefined) {
    video.src = window.location.href + 'video/?q=' + urlParams.get('ref');

    video.load();
  }
}
