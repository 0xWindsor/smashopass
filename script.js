const amazonUrl = 'https://m.media-amazon.com/images/M/';

// celebes.json : 
// {{
//   "name": "...",
//   "image_id": "..."
//   "imdb_url": "...""
// }, ...}
var celebs = [];
fetch('celebs.json').then(response => response.json()).then(data => {
    celebs = data;
    console.log(celebs);
    displayRandomCeleb();
});

var currentCeleb = null;

function displayRandomCeleb() {
    var index = Math.floor(Math.random() * celebs.length);
    var celeb = celebs[index];

    celebImage.src = amazonUrl + celeb.image_id;
    celebName.innerText = celeb.name;
    celebImage.onclick = function () {
        window.open(celeb.imdb_url, '_blank');
    };

    currentCeleb = celeb;

    celebs.splice(index, 1);
}

function smash() {
    updateSmashListOnDOM();
    displayRandomCeleb();
}

function updateSmashListOnDOM() {
    var div = document.createElement('div');
    var img = document.createElement('img');
    var p = document.createElement('p');

    div.className = 'smashListDiv';

    div.appendChild(img);
    div.appendChild(p);

    img.src = amazonUrl + currentCeleb.image_id;
    p.innerText = currentCeleb.name;
    let imdbUrl = currentCeleb.imdb_url

    img.onclick = function () {
        window.open(imdbUrl, '_blank');
    };

    smashListDom.appendChild(div);
}




// HTML elements
const celebImage = document.getElementById('celebImg');
const celebName = document.getElementById('celebName');
const smashButton = document.getElementById('smashButton');
const passButton = document.getElementById('passButton');
const smashListDom = document.getElementById('smashList');

// event listeners
smashButton.addEventListener('click', smash);
passButton.addEventListener('click', displayRandomCeleb);

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        smash();
    }
    if (event.key === 'ArrowLeft') {
        displayRandomCeleb();
    }
});
