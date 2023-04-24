// Your solution goes here 
function playGuessingGame(numToGuess, totalGuesses = 10) {
    let numGuesses = 0;
    let text = "Enter a number between 1 and 100.";
    
    while (numGuesses < totalGuesses) {
      let guess = prompt(text);
      
      if (guess === null) {
        return 0; // User pressed Cancel
      }
      
      guess = parseInt(guess);
      
      if (isNaN(guess)) {
        text = "Please enter a number.";
        continue;
      }
      
      numGuesses++;
      
      if (guess < numToGuess) {
        text = guess + " is too small. Guess a larger number.";
      } else if (guess > numToGuess) {
        text = guess + " is too large. Guess a smaller number.";
      } else {
        return numGuesses; // User guessed correctly
      }
    }
    
    return 0; // User ran out of guesses
  }