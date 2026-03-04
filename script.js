// ===============================
// GAME CHOICES
// ===============================

// Array storing the 3 possible options
const choices = ["rock", "paper", "scissors"];


// ===============================
// GET HTML ELEMENTS
// ===============================

// Select all player choice images (rock, paper, scissors)
const playerImages = document.querySelectorAll(".choices img");

// Select the computer image
const computerImage = document.getElementById("computer-image");

// Select the result text ("You win!", etc.)
const resultText = document.getElementById("result");

// Select score display elements
const winsDisplay = document.getElementById("wins");
const lossesDisplay = document.getElementById("losses");
const tiesDisplay = document.getElementById("ties");

// Select reset button
const resetBtn = document.getElementById("reset-btn");


// ===============================
// SCORE VARIABLES
// ===============================

// These store the actual score numbers
let wins = 0;
let losses = 0;
let ties = 0;


// ===============================
// SHUFFLE CONTROL VARIABLES
// ===============================

// Stores the interval ID for shuffling animation
let shuffleInterval;

// Prevents player from clicking multiple times during thinking
let isThinking = false;


// ===============================
// DEFAULT IMAGE ON LOAD
// ===============================

// Make sure the question mark shows when the page first loads
computerImage.src = "images/question-mark.png";


// =====================================================
// PLAYER CLICK EVENTS
// =====================================================

// Add a click event to each player image
playerImages.forEach(img => {

    img.addEventListener("click", () => {

        // If computer is still thinking, ignore clicks
        if (isThinking) return;

        // Start the game using the clicked image's data-choice
        startGame(img.dataset.choice, img);
    });
});


// =====================================================
// START GAME FUNCTION
// =====================================================

function startGame(playerChoice, clickedImage) {

    // Lock clicking while game runs
    isThinking = true;

    // Remove highlight from all images
    playerImages.forEach(img => img.classList.remove("selected"));

    // Highlight the clicked image
    clickedImage.classList.add("selected");

    // Show thinking message
    resultText.textContent = "Computer is thinking...";

    // Start shuffle animation
    shuffleComputer();

    // Wait 3 seconds before deciding winner
    setTimeout(() => {

        // Stop the shuffle animation
        stopShuffle();

        // Get final random computer choice
        const computerChoice = getRandomChoice();

        // Show computer’s final choice image
        showComputerChoice(computerChoice);

        // Decide who won
        decideWinner(playerChoice, computerChoice);

        // Unlock clicking
        isThinking = false;

    }, 3000);
}


// =====================================================
// SHUFFLE COMPUTER IMAGE
// =====================================================

function shuffleComputer() {

    // Change computer image every 500ms
    shuffleInterval = setInterval(() => {

        const randomChoice = getRandomChoice();

        // Update image source dynamically
        computerImage.src = `images/${randomChoice}.png`;

    }, 500);
}


// =====================================================
// STOP SHUFFLE
// =====================================================

function stopShuffle() {

    // Stops the shuffle animation
    clearInterval(shuffleInterval);
}


// =====================================================
// GET RANDOM CHOICE
// =====================================================

function getRandomChoice() {

    // Math.random() gives 0–0.99
    // Multiply by 3 (length of array)
    // Math.floor rounds down to 0,1,2
    return choices[Math.floor(Math.random() * choices.length)];
}


// =====================================================
// SHOW FINAL COMPUTER CHOICE
// =====================================================

function showComputerChoice(choice) {

    // Set image to final chosen option
    computerImage.src = `images/${choice}.png`;
}


// =====================================================
// DECIDE WINNER
// =====================================================

function decideWinner(player, computer) {

    // If both choices are the same
    if (player === computer) {

        resultText.textContent = "It's a tie!";

        ties++;
        tiesDisplay.textContent = ties;

        return;
    }

    // Winning conditions for player
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {

        resultText.textContent = "You win!";

        wins++;
        winsDisplay.textContent = wins;

    } else {

        // Otherwise computer wins
        resultText.textContent = "Computer wins!";

        losses++;
        lossesDisplay.textContent = losses;
    }
}


// =====================================================
// RESET BUTTON
// =====================================================


resetBtn.addEventListener("click", () => {

    // Reset score values
    wins = 0;
    losses = 0;
    ties = 0;

    // Update display
    winsDisplay.textContent = 0;
    lossesDisplay.textContent = 0;
    tiesDisplay.textContent = 0;

    // Reset message
    resultText.textContent = "Make your move!";

    // Reset computer image
    computerImage.src = "images/question-mark.png";

    // Remove selection highlight
    playerImages.forEach(img => img.classList.remove("selected"));
});