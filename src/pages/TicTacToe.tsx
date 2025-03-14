import { useState } from 'react';
import { toast } from 'react-toastify';

type Player = 'X' | 'O' | null;
type GameStatus = Player | 'draw' | null;
type Board = Player[];

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<GameStatus>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (squares: Board): Player => {
    for (const [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      toast.success(`Player ${newWinner} wins! 🎉`, {
        position: "top-center",
        autoClose: 3000,
      });
    } else if (!newBoard.includes(null)) {
      setWinner('draw');
      toast.info("It's a draw! 🤝", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tic Tac Toe</h1>
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
            <li>• Players take turns placing X's and O's on the board</li>
            <li>• First player to get 3 in a row (horizontally, vertically, or diagonally) wins</li>
            <li>• If all squares are filled and no one has won, the game is a draw</li>
          </ul>
        </div>
      )}

      <div className="mb-4 text-center text-xl font-semibold text-gray-700">
        {!winner && `Current Player: ${currentPlayer}`}
        {winner === 'draw' && "It's a Draw!"}
        {winner && winner !== 'draw' && `Winner: Player ${winner}`}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((square, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`h-24 text-4xl font-bold rounded-lg transition-all duration-200 
              ${!square && !winner ? 'hover:bg-pink-100' : ''} 
              ${square ? 'bg-white/90' : 'bg-white/70'} 
              shadow-md hover:shadow-lg active:scale-95`}
            disabled={!!square || !!winner}
          >
            <span className={square === 'X' ? 'text-pink-500' : 'text-sky-500'}>
              {square}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg 
          hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg 
          active:scale-95 font-semibold"
      >
        New Game
      </button>
    </div>
  );
};

export default TicTacToe;