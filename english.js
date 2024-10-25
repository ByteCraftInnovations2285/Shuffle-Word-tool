// english.js

// Select elements
const vocabularyInput = document.querySelectorAll('input')[0];
const numbersInput = document.querySelectorAll('input')[1];
const submitButton = document.querySelector('button');
const shuffledList = document.querySelector('ul');
const answerButton = document.querySelectorAll('button')[1];

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let selectedPairs = [];  // Store selected pairs for answer reveal

// Handle submit action
submitButton.addEventListener('click', () => {
    // Get user input and parse the list
    const vocabString = vocabularyInput.value;
    const numWords = parseInt(numbersInput.value);
    if (!vocabString || isNaN(numWords)) {
        alert("Please enter a valid vocabulary list and number.");
        return;
    }

    // Split vocabulary input and create pairs
    const vocabPairs = vocabString.split(',').map(item => {
        const pair = item.split(':');
        return { english: pair[0].trim(), vietnamese: pair[1].trim() };
    });

    // Randomly select n words and shuffle the Vietnamese meanings
    selectedPairs = vocabPairs.slice(0, numWords);  // Store the selected pairs for answer
    const shuffledMeanings = shuffleArray(selectedPairs.map(pair => pair.vietnamese));

    // Display shuffled meanings
    shuffledList.innerHTML = "";
    shuffledMeanings.forEach(meaning => {
        const listItem = document.createElement('li');
        listItem.textContent = meaning;
        shuffledList.appendChild(listItem);
    });

    answerButton.style.display = 'block';
});

// Handle answer reveal
answerButton.addEventListener('click', () => {
    shuffledList.innerHTML = ""; // Clear shuffled list
    selectedPairs.forEach(pair => {
        const listItem = document.createElement('li');
        listItem.textContent = `${pair.vietnamese} : ${pair.english}`;  // Show Vietnamese with English meaning
        shuffledList.appendChild(listItem);
    });
});
