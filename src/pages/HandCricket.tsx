import { useState } from 'react';
import { toast } from 'react-toastify';

type GameState = 'toss' | 'batting' | 'bowling' | 'gameOver';
type TossChoice = 'heads' | 'tails';
type BattingTeam = 'player' | 'computer';

const HandCricket = () => {
  const [gameState, setGameState] = useState<GameState>('toss');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [currentBattingTeam, setCurrentBattingTeam] = useState<BattingTeam>('player');
  const [target, setTarget] = useState<number | null>(null);
  const [lastPlayerMove, setLastPlayerMove] = useState<number | null>(null);
  const [lastComputerMove, setLastComputerMove] = useState<number | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const numbers = [1, 2, 3, 4, 5, 6];

  const handleToss = (choice: TossChoice) => {
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const wonToss = choice === result;
    
    if (wonToss) {
      toast.success('You won the toss! You\'ll bat first!');
      setCurrentBattingTeam('player');
    } else {
      toast.info('Computer won the toss and chose to bat first!');
      setCurrentBattingTeam('computer');
    }
    setGameState('batting');
  };

  const getComputerMove = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const handlePlayerMove = (number: number) => {
    setLastPlayerMove(number);
    const computerMove = getComputerMove();
    setLastComputerMove(computerMove);

    if (currentBattingTeam === 'player') {
      if (number === computerMove) {
        toast.error('Out! 🏏');
        if (target === null) {
          setTarget(playerScore + 1);
          setCurrentBattingTeam('computer');
        } else {
          setGameState('gameOver');
        }
      } else {
        setPlayerScore(prev => prev + number);
        if (target !== null && playerScore + number >= target) {
          setGameState('gameOver');
        }
      }
    } else {
      if (number === computerMove) {
        toast.success('Wicket! 🎯');
        if (target === null) {
          setTarget(computerScore + 1);
          setCurrentBattingTeam('player');
        } else {
          setGameState('gameOver');
        }
      } else {
        setComputerScore(prev => prev + computerMove);
        if (target !== null && computerScore + computerMove >= target) {
          setGameState('gameOver');
        }
      }
    }
  };

  const getGameResult = () => {
    if (target === null) return null;
    if (currentBattingTeam === 'player') {
      return playerScore >= target ? 'Player wins! 🎉' : 'Computer wins! 🤖';
    } else {
      return computerScore >= target ? 'Computer wins! 🤖' : 'Player wins! 🎉';
    }
  };

  const resetGame = () => {
    setGameState('toss');
    setPlayerScore(0);
    setComputerScore(0);
    setCurrentBattingTeam('player');
    setTarget(null);
    setLastPlayerMove(null);
    setLastComputerMove(null);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hand Cricket</h1>
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
            <li>• Win the toss to choose batting/bowling</li>
            <li>• Pick numbers 1-6 to score runs</li>
            <li>• Match opponent's number to take wicket</li>
            <li>• Score more runs to win the match</li>
          </ul>
        </div>
      )}

      <div className="bg-white/90 rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between mb-4">
          <div className="text-lg font-semibold">
            Player: {playerScore}
          </div>
          <div className="text-lg font-semibold">
            Computer: {computerScore}
          </div>
        </div>
        
        {target && (
          <div className="text-center mb-4 text-lg font-semibold text-pink-600">
            Target: {target}
          </div>
        )}

        {lastPlayerMove !== null && lastComputerMove !== null && (
          <div className="flex justify-center space-x-8 mb-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Your move</div>
              <div className="text-2xl font-bold">{lastPlayerMove}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Computer's move</div>
              <div className="text-2xl font-bold">{lastComputerMove}</div>
            </div>
          </div>
        )}
      </div>

      {gameState === 'toss' && (
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold mb-4">Choose Heads or Tails</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleToss('heads')}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Heads
            </button>
            <button
              onClick={() => handleToss('tails')}
              className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Tails
            </button>
          </div>
        </div>
      )}

      {(gameState === 'batting' || gameState === 'bowling') && (
        <div className="grid grid-cols-3 gap-4">
          {numbers.map(num => (
            <button
              key={num}
              onClick={() => handlePlayerMove(num)}
              className="aspect-square text-2xl font-bold bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            >
              {num}
            </button>
          ))}
        </div>
      )}

      {gameState === 'gameOver' && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold mb-4">{getGameResult()}</h2>
          <button
            onClick={resetGame}
            className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg 
              hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg 
              active:scale-95 font-semibold"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default HandCricket;