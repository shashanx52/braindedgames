import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchWords } from '../data/fetchWords';
import fallbackWords from '../data/words'; // Keep the original words as fallback

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

const WordleGame = () => {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState<string[]>(Array(MAX_ATTEMPTS).fill(''));
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [usedLetters, setUsedLetters] = useState<{ [key: string]: string }>({});
  const [showInstructions, setShowInstructions] = useState(false);
  const [wordList, setWordList] = useState<string[]>(fallbackWords);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWords = async () => {
      setLoading(true);
      const words = await fetchWords();
      if (words.length > 0) {
        setWordList(words);
      }
      setLoading(false);
    };

    loadWords();
  }, []);

  useEffect(() => {
    if (!loading && wordList.length > 0) {
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
      setSolution(randomWord);
    }
  }, [loading, wordList]);

  const handleKeyInput = (key: string) => {
    if (gameOver || loading) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        toast.error('Word must be 5 letters!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-pink-500 text-white",
        });
        return;
      }
      if (!wordList.includes(currentGuess.toLowerCase())) {
        toast.error('Not in word list!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-pink-500 text-white",
        });
        return;
      }

      const newUsedLetters = { ...usedLetters };
      for (let i = 0; i < currentGuess.length; i++) {
        const letter = currentGuess[i];
        if (letter === solution[i]) {
          newUsedLetters[letter] = 'correct';
        } else if (solution.includes(letter)) {
          if (newUsedLetters[letter] !== 'correct') {
            newUsedLetters[letter] = 'present';
          }
        } else {
          if (!newUsedLetters[letter]) {
            newUsedLetters[letter] = 'absent';
          }
        }
      }
      setUsedLetters(newUsedLetters);

      const newGuesses = [...guesses];
      newGuesses[currentAttempt] = currentGuess;
      setGuesses(newGuesses);

      if (currentGuess === solution) {
        toast.success('Congratulations! You won! 🎉', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-green-500 text-white",
        });
        setGameOver(true);
        return;
      }

      if (currentAttempt === MAX_ATTEMPTS - 1) {
        toast.error(`Game Over! The word was ${solution}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-red-500 text-white",
        });
        setGameOver(true);
        return;
      }

      setCurrentAttempt(currentAttempt + 1);
      setCurrentGuess('');
    } else if (key === '⌫') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH && key.match(/^[A-Z]$/)) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKeyInput('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyInput('⌫');
      } else {
        const key = e.key.toUpperCase();
        if (key.match(/^[A-Z]$/)) {
          handleKeyInput(key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, currentAttempt, guesses, solution, gameOver, usedLetters]);

  const getLetterColor = (letter: string, index: number, guess: string) => {
    if (!letter) return 'bg-white/90 border-gray-300';
    if (guess[index] === solution[index]) {
      return 'bg-green-500 text-white border-transparent animate-flip';
    }
    if (solution.includes(letter)) {
      return 'bg-yellow-500 text-white border-transparent animate-flip';
    }
    return 'bg-gray-500 text-white border-transparent animate-flip';
  };

  const getKeyboardButtonColor = (key: string) => {
    if (!usedLetters[key]) return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
    switch (usedLetters[key]) {
      case 'correct':
        return 'bg-green-500 text-white hover:bg-green-600';
      case 'present':
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      case 'absent':
        return 'bg-gray-500 text-white hover:bg-gray-600';
      default:
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Word Guess</h1>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {showInstructions && (
            <div className="mb-8 p-4 bg-white/90 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">How to Play</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Guess the word in 6 tries</li>
                <li>• Each guess must be a valid 5-letter word</li>
                <li>• Color of the tiles will change to show how close your guess was:</li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <span>Letter is in the correct spot</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                  <span>Letter is in the word but wrong spot</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-500 rounded"></div>
                  <span>Letter is not in the word</span>
                </li>
              </ul>
            </div>
          )}

          {/* Game Grid */}
          <div className="space-y-2 mb-8">
            {guesses.map((guess, i) => (
              <div key={i} className="flex justify-center space-x-2">
                {Array.from({ length: WORD_LENGTH }).map((_, j) => {
                  const letter = i === currentAttempt ? currentGuess[j] : guess[j];
                  return (
                    <div
                      key={j}
                      className={`w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded
                        transition-colors duration-500 ${getLetterColor(guess[j], j, guess)}`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Keyboard */}
          <div className="space-y-2">
            {KEYBOARD_ROWS.map((row, i) => (
              <div key={i} className="flex justify-center space-x-1">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyInput(key)}
                    className={`${
                      key.length > 1 ? 'px-4 w-auto' : 'w-10'
                    } h-14 font-bold rounded transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${getKeyboardButtonColor(key)}`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}
          </div>
          
          {gameOver && (
            <button
              onClick={() => window.location.reload()}
              className="mt-8 w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg 
                hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg 
                active:scale-95 font-semibold"
            >
              Play Again
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default WordleGame;