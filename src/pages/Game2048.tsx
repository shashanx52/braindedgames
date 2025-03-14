import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Game2048 = () => {
  const [grid, setGrid] = useState<number[][]>([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    initializeGame();
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const initializeGame = () => {
    const newGrid = Array(4).fill(0).map(() => Array(4).fill(0));
    addNewTile(newGrid);
    addNewTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
  };

  const addNewTile = (grid: number[][]) => {
    const availableSpots: { x: number; y: number }[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          availableSpots.push({ x: i, y: j });
        }
      }
    }
    if (availableSpots.length > 0) {
      const { x, y } = availableSpots[Math.floor(Math.random() * availableSpots.length)];
      grid[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const compress = (grid: number[][]) => {
    const newGrid = grid.map(row => {
      const newRow = row.filter(cell => cell !== 0);
      while (newRow.length < 4) {
        newRow.push(0);
      }
      return newRow;
    });
    return newGrid;
  };

  const merge = (grid: number[][]) => {
    let newScore = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] !== 0 && grid[i][j] === grid[i][j + 1]) {
          grid[i][j] *= 2;
          newScore += grid[i][j];
          grid[i][j + 1] = 0;
          if (grid[i][j] === 2048) {
            toast.success('Congratulations! You reached 2048! 🎉');
            setGameOver(true);
          }
        }
      }
    }
    return { grid, newScore };
  };

  const reverse = (grid: number[][]) => {
    return grid.map(row => [...row].reverse());
  };

  const transpose = (grid: number[][]) => {
    return grid[0].map((_, i) => grid.map(row => row[i]));
  };

  const moveLeft = (grid: number[][]) => {
    const compressed = compress(grid);
    const { grid: mergedGrid, newScore } = merge(compressed);
    const finalGrid = compress(mergedGrid);
    return { grid: finalGrid, newScore };
  };

  const moveRight = (grid: number[][]) => {
    const reversedGrid = reverse(grid);
    const { grid: moved, newScore } = moveLeft(reversedGrid);
    return { grid: reverse(moved), newScore };
  };

  const moveUp = (grid: number[][]) => {
    const transposed = transpose(grid);
    const { grid: moved, newScore } = moveLeft(transposed);
    return { grid: transpose(moved), newScore };
  };

  const moveDown = (grid: number[][]) => {
    const transposed = transpose(grid);
    const { grid: moved, newScore } = moveRight(transposed);
    return { grid: transpose(moved), newScore };
  };

  const canMove = (grid: number[][]) => {
    // Check for empty cells
    if (grid.some(row => row.some(cell => cell === 0))) return true;

    // Check for possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === grid[i][j + 1] || grid[j][i] === grid[j + 1][i]) {
          return true;
        }
      }
    }
    return false;
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (gameOver) return;

    let moved = false;
    let newScore = 0;
    const oldGrid = JSON.stringify(grid);
    let newGrid = JSON.parse(oldGrid) as number[][];

    switch (event.key) {
      case 'ArrowLeft':
        ({ grid: newGrid, newScore } = moveLeft(newGrid));
        moved = oldGrid !== JSON.stringify(newGrid);
        break;
      case 'ArrowRight':
        ({ grid: newGrid, newScore } = moveRight(newGrid));
        moved = oldGrid !== JSON.stringify(newGrid);
        break;
      case 'ArrowUp':
        ({ grid: newGrid, newScore } = moveUp(newGrid));
        moved = oldGrid !== JSON.stringify(newGrid);
        break;
      case 'ArrowDown':
        ({ grid: newGrid, newScore } = moveDown(newGrid));
        moved = oldGrid !== JSON.stringify(newGrid);
        break;
      default:
        return;
    }

    if (moved) {
      setScore(prev => prev + newScore);
      addNewTile(newGrid);
      setGrid(newGrid);

      if (!canMove(newGrid)) {
        toast.error('Game Over! No more moves available.');
        setGameOver(true);
      }
    }
  };

  const getTileColor = (value: number) => {
    const colors: { [key: number]: string } = {
      2: 'bg-gray-200',
      4: 'bg-gray-300',
      8: 'bg-orange-300',
      16: 'bg-orange-400',
      32: 'bg-orange-500',
      64: 'bg-yellow-400',
      128: 'bg-yellow-500',
      256: 'bg-yellow-600',
      512: 'bg-yellow-700',
      1024: 'bg-yellow-800',
      2048: 'bg-yellow-900',
    };
    return colors[value] || 'bg-gray-700';
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">2048</h1>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold text-gray-700">Score: {score}</div>
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
            <li>• Use arrow keys to move tiles</li>
            <li>• Tiles with the same number merge into one</li>
            <li>• Add them up to reach 2048!</li>
            <li>• Game ends when no moves are possible</li>
          </ul>
        </div>
      )}

      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-4 gap-2">
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`aspect-square rounded-lg flex items-center justify-center text-2xl font-bold shadow transition-all
                  ${cell === 0 ? 'bg-gray-200' : getTileColor(cell)}
                  ${cell > 4 ? 'text-white' : 'text-gray-800'}`}
              >
                {cell !== 0 && cell}
              </div>
            ))
          )}
        </div>
      </div>

      {gameOver && (
        <button
          onClick={initializeGame}
          className="mt-8 w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg 
            hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg 
            active:scale-95 font-semibold"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default Game2048;