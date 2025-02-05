export const drawLetters = () => {
  const letterBank = {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1,
  };
  function getRandomLetter(letterBank) {
    // get an array of letters by accessing the keys in the object
    const letters = Object.keys(letterBank);
    // Math.floor rounds down to the int and Math.random picks a random number in the range of 0 - 0.999
    // multiply the random number by the lenth of the letters array to return a random letter
    return letters[Math.floor(Math.random() * letters.length)];
  }

  const hand = [];
  while (hand.length < 10) {
    const randomLetter = getRandomLetter(letterBank);
    const occurance = hand.filter((x) => x === randomLetter).length;
    if (occurance < letterBank[randomLetter]) {
      hand.push(randomLetter);
    }
  }

  return hand;
};

export const usesAvailableLetters = (input, drawn) => {
  for (let inputLetter of input) {
    const index = drawn.indexOf(inputLetter);
    if (index > -1) {
      drawn.splice(index, 1);
    } else {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  const scoreChart = {
    AEIOULNRST: 1,
    DG: 2,
    BCMP: 3,
    FHVWY: 4,
    K: 5,
    JX: 8,
    QZ: 10,
  };

  let total = 0;
  for (let letter of word.toUpperCase()) {
    let key = Object.keys(scoreChart).filter(function (key) {
      return key.includes(letter);
    });
    const score = scoreChart[key];
    total += score;
  }
  if (word.length > 6) {
    total += 8;
  }
  return total;
};

export const highestScoreFrom = (words) => {
  // calculate score for each word and store it in a hash table, push it to an array
  // calculate the highest score
  let scoredWords = [];
  let maxScore = 0;

  for (const word of words) {
    let wordHash = {};
    wordHash.word = word;
    wordHash.score = scoreWord(word);
    scoredWords.push(wordHash);
    if (wordHash.score > maxScore) {
      maxScore = wordHash.score;
    }
  }

  // tiebreakers based on word length
  let minLength = 10;
  let bestWord = "";
  for (const wordObj of scoredWords) {
    if (wordObj.score === maxScore) {
      if (wordObj.word.length === 10) {
        bestWord = wordObj.word;
        {
          break;
        }
      } else if (wordObj.word.length < minLength) {
        bestWord = wordObj.word;
        minLength = wordObj.word.length;
      }
    }
  }

  // iterate over array of word objects and return the best one
  for (const wordObj of scoredWords) {
    if (wordObj.word === bestWord) {
      return wordObj;
    }
  }
};
