import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const NumberGame = () => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(7);
  const [gameOver, setGameOver] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const difficultyRanges = {
    easy: { min: 1, max: 50 },
    medium: { min: 1, max: 100 },
    hard: { min: 1, max: 200 }
  };

  useEffect(() => {
    generateNewNumber();
  }, [difficulty]);

  const generateNewNumber = () => {
    const range = difficultyRanges[difficulty];
    const newNumber = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    setTargetNumber(newNumber);
    setGuess('');
    setAttempts(0);
    setGameOver(false);
    setHints([]);
  };

  const generateHint = () => {
    const hintTypes = [
      () => `The number is ${targetNumber % 2 === 0 ? 'even' : 'odd'}`,
      () => `The number is ${targetNumber % 3 === 0 ? '' : 'not '}divisible by 3`,
      () => `The sum of its digits is ${String(targetNumber).split('').reduce((a, b) => a + parseInt(b), 0)}`,
      () => `The number is ${targetNumber > 50 ? 'greater' : 'less'} than 50`,
      () => `The last digit is ${targetNumber % 10}`,
      () => `It's a ${String(targetNumber).length}-digit number`,
    ];

    const unusedHints = hintTypes.filter(
      (_, index) => !hints.includes(hintTypes[index]())
    );

    if (unusedHints.length > 0) {
      const randomHint = unusedHints[Math.floor(Math.random() * unusedHints.length)]();
      setHints(prev => [...prev, randomHint]);
    }
  };

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    
    if (isNaN(guessNum)) {
      toast.error('Please enter a valid number!');
      return;
    }

    const range = difficultyRanges[difficulty];
    if (guessNum < range.min || guessNum > range.max) {
      toast.error(`Please enter a number between ${range.min} and ${range.max}!`);
      return;
    }

    setAttempts(prev => prev + 1);

    if (guessNum === targetNumber) {
      toast.success('Congratulations! You got it! 🎉');
      setGameOver(true);
    } else {
      const difference = Math.abs(targetNumber - guessNum);
      let message = '';
      
      if (difference > 50) message = "You're freezing! ❄️";
      else if (difference > 30) message = "You're cold! 🥶";
      else if (difference > 20) message = "You're warm! 🌡️";
      else if (difference > 10) message = "You're hot! 🔥";
      else message = "You're burning up! 🌋";

      toast.info(`${guessNum > targetNumber ? 'Too high!' : 'Too low!'} ${message}`);
      
      if (attempts + 1 >= maxAttempts) {
        toast.error(`Game Over! The number was ${targetNumber}`);
        setGameOver(true);
      } else if (attempts + 1 === maxAttempts - 2) {
        generateHint();
      }
    }

    setGuess('');
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Number Quest</h1>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold text-gray-700">
            Attempts: {attempts}/{maxAttempts}
          </div>
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {showInstructions && (
        <div className="mb-8 p-4 bg-white/90 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">How to Play</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Guess the number within {maxAttempts} attempts</li>
            <li>• Get hints based on your guesses</li>
            <li>• The closer you are, the "hotter" you get</li>
            <li>• Choose difficulty to change number range</li>
          </ul>
        </div>
      )}

      <div className="bg-white/90 rounded-lg shadow-md p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty
          </label>
          <div className="flex space-x-4">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  difficulty === level
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your guess ({difficultyRanges[difficulty].min}-{difficultyRanges[difficulty].max})
          </label>
          <div className="flex space-x-4">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={gameOver}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
            />
            <button
              onClick={handleGuess}
              disabled={gameOver}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 
                transition-colors disabled:bg-gray-400"
            >
              Guess
            </button>
          </div>
        </div>

        {hints.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Hints:</h3>
            <ul className="space-y-2">
              {hints.map((hint, index) => (
                <li key={index} className="text-gray-700">• {hint}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {gameOver && (
        <button
          onClick={generateNewNumber}
          className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg 
            hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg 
            active:scale-95 font-semibold"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default NumberGame;