import $ from 'jquery'

$(document).ready(() => {
  fetchTopWords()
  listenForText();
})

function fetchTopWords() {
  var url = " https://wordwatch-api.herokuapp.com/api/v1/top_word"
  fetch(url)
  .then(response => {
    return response.json()
  })
  .then(words => {
    displayWords(words);
  })
  .catch(error => {
    console.log(error)
  });
}

function displayWords(words) {
  var word = Object.keys(words.word)[0]
  var count = words.word[word]
  var wordPlace = document.getElementById("word")
  wordPlace.innerHTML = word
  var countPlace = document.getElementById("count")
  countPlace.innerHTML = count
  var place = document.getElementById('word-article')
  place.appendChild(wordPlace)
  place.appendChild(countPlace);
}

function listenForText() {
  var button = document.getElementById("button")
  var input = document.getElementById("input")
  button.addEventListener("click", function() {
    sendUserInput(input.value)
    fetchTopWords()
  })
}

function sendUserInput(text) {
  var textArray = text.split(' ')
  var words = {}
  for (var i = 0; i < textArray; i++){
    fetch("https://wordwatch-api.herokuapp.com/api/v1/words", {
      method: 'POST',
      body: {
        word: {value: textArray[i]}
      }
    })
  }
}
