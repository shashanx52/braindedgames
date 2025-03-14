import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = 'RIGHT';
const GAME_SPEED = 150;

const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const generateFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  }, [snake]);

  const checkCollision = (head: Position): boolean => {
    // Check wall collision
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }

    // Check self collision (excluding the tail which will move)
    return snake.slice(0, -1).some(
      segment => segment.x === head.x && segment.y === head.y
    );
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(currentSnake => {
      const head = currentSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP':
          newHead.y -= 1;
          break;
        case 'DOWN':
          newHead.y += 1;
          break;
        case 'LEFT':
          newHead.x -= 1;
          break;
        case 'RIGHT':
          newHead.x += 1;
          break;
      }

      if (checkCollision(newHead)) {
        setIsGameOver(true);
        toast.error('Game Over!');
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      // Check if snake ate food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prev => prev + 1);
        generateFood();
        return newSnake;
      }

      // Remove tail if no food was eaten
      newSnake.pop();
      return newSnake;
    });
  }, [direction, food, generateFood, isGameOver, isPaused]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isGameOver) return;

      switch (event.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isGameOver]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    generateFood();
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Snake Game</h1>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold text-gray-700">
            Score: {score}
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
            <li>• Use arrow keys to control the snake</li>
            <li>• Eat food to grow longer</li>
            <li>• Avoid hitting walls and yourself</li>
            <li>• Press Space to pause/resume</li>
          </ul>
        </div>
      )}

      <div className="relative bg-gray-100 rounded-lg shadow-lg overflow-hidden" 
           style={{ width: '100%', height: '500px' }}>
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            gap: '1px',
            background: '#ddd',
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnake = snake.some(segment => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;
            const isHead = snake[0].x === x && snake[0].y === y;

            return (
              <div
                key={index}
                className={`${
                  isSnake
                    ? isHead
                      ? 'bg-green-600'
                      : 'bg-green-500'
                    : isFood
                    ? 'bg-red-500'
                    : 'bg-white'
                }`}
              />
            );
          })}
        </div>

        {(isGameOver || isPaused) && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center space-y-4">
              {isGameOver ? (
                <>
                  <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
                  <p className="text-xl text-white">Final Score: {score}</p>
                </>
              ) : (
                <h2 className="text-3xl font-bold text-white mb-4">Paused</h2>
              )}
              <button
                onClick={isGameOver ? resetGame : () => setIsPaused(false)}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg 
                  hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg 
                  active:scale-95 text-xl font-semibold"
              >
                {isGameOver ? 'Play Again' : 'Resume'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;