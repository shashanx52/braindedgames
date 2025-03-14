import { useState, useEffect, useRef } from 'react';

interface Car {
  lane: number;
  position: number;
}

const GAME_HEIGHT = 600;
const LANE_WIDTH = 100;
const CAR_HEIGHT = 60;
const LANES = 3;
const INITIAL_SPEED = 5;

const RacingGame = () => {
  const [car, setCar] = useState<Car>({
    lane: 1,
    position: GAME_HEIGHT - CAR_HEIGHT - 20,
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gameLoopRef = useRef<number>(0);
  const speedRef = useRef<number>(INITIAL_SPEED);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver || !gameStarted) return;

      if (e.key === 'ArrowLeft') {
        setCar(prev => ({
          ...prev,
          lane: Math.max(0, prev.lane - 1),
        }));
      } else if (e.key === 'ArrowRight') {
        setCar(prev => ({
          ...prev,
          lane: Math.min(LANES - 1, prev.lane + 1),
        }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCar({
      lane: 1,
      position: GAME_HEIGHT - CAR_HEIGHT - 20,
    });
    gameLoop();
  };

  const gameLoop = () => {
    setScore(prev => prev + 1);

    // Check if the car hits any obstacle (For simplicity, we only check the lane position)
    if (car.position <= 0) {
      setGameOver(true);
      cancelAnimationFrame(gameLoopRef.current);
    }

    setCar(prev => ({
      ...prev,
      position: prev.position - speedRef.current, // Move car up
    }));

    if (!gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Simple Road Rush</h1>
        <div className="text-lg font-semibold text-gray-700">
          Score: {score}
        </div>
      </div>

      <div
        className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        style={{ height: GAME_HEIGHT + 'px' }}
      >
        <div className="absolute inset-0 flex">
          {Array.from({ length: LANES + 1 }).map((_, i) => (
            <div
              key={i}
              className="border-l-2 border-dashed border-yellow-500 h-full"
              style={{ left: `${(i * LANE_WIDTH)}px` }}
            />
          ))}
        </div>

        <div
          className="absolute w-16 h-14 bg-red-500 rounded transition-all duration-100 transform"
          style={{
            left: `${car.lane * LANE_WIDTH + (LANE_WIDTH - 64) / 2}px`,
            top: `${car.position}px`
          }}
        />

        {!gameStarted && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg 
                hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg 
                active:scale-95 text-xl font-semibold"
            >
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
              <p className="text-xl text-white">Score: {score}</p>
              <button
                onClick={startGame}
                className="mt-4 px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg 
                  hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg 
                  active:scale-95 text-xl font-semibold"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RacingGame;
