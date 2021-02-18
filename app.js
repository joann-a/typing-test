const testWords = document.querySelector(".test-words");
const testInput = document.querySelector(".test-input");
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const mainContent = document.querySelector(".main-content");
const timer = document.querySelector(".timer");

// EventListeners
document.addEventListener("DOMContentLoaded", generateWords);
testInput.addEventListener("input", startTest);
resetBtn.addEventListener("click", restartTest);

function getWords() {
  return fetch("http://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => data.content);
}

async function generateWords() {
  let words = await getWords();
  console.log(words);
  words = words.split(" ");
  words.forEach((word, index) => {
    wordSpan = document.createElement("span");
    wordSpan.innerText = word + " ";
    testWords.appendChild(wordSpan);
  });
}

function restartTest() {
  testWords.innerText = "";
  testInput.value = "hi there";
  // testInput.innerText = "";
  generateWords();
}

function startTest() {
  console.log("called");
  testInput.removeEventListener("input", startTest);
  startCountDown();

  // loop through each word in the test to see if it's been written successfully
  document.addEventListener("keyup", checkWord);
  words = testWords.getElementsByTagName("span");
}

function startCountDown() {
  timer.innerText = 60 + ":" + "0000";
}

function checkWord(e) {
  console.log("Called checkword");
  testInputWords = testInput.value.split(" ").filter((word) => word != "");
  console.log(testInputWords);
  console.log(testInputWords[0]);

  if (e.code == "Space") {
    for (i = 0; i < words.length; i++) {
      console.log("word " + words[i].innerText);
      console.log("input " + testInputWords[i]);

      if (testInputWords[i] == null) {
        words[i].classList.remove("correct");
        words[i].classList.remove("incorrect");
      } else if (words[i].innerText.trim() === testInputWords[i]) {
        console.log("CORRECT");
        words[i].classList.remove("incorrect");
        words[i].classList.add("correct");
      } else {
        words[i].classList.remove("correct");
        words[i].classList.add("incorrect");
      }
    }
  }
}
