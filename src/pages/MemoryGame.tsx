import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaStar, FaHeart, FaMoon, FaSun, FaLeaf, FaBolt, FaSnowflake, FaFire } from 'react-icons/fa';

type IconType = {
  id: string;
  icon: React.ReactElement;
  color: string;
};

type Card = {
  id: number;
  iconId: string;
  icon: React.ReactElement;
  isFlipped: boolean;
  isMatched: boolean;
};

const icons: IconType[] = [
  { id: 'star', icon: <FaStar className="w-8 h-8" />, color: 'text-yellow-500' },
  { id: 'heart', icon: <FaHeart className="w-8 h-8" />, color: 'text-red-500' },
  { id: 'moon', icon: <FaMoon className="w-8 h-8" />, color: 'text-purple-500' },
  { id: 'sun', icon: <FaSun className="w-8 h-8" />, color: 'text-orange-500' },
  { id: 'leaf', icon: <FaLeaf className="w-8 h-8" />, color: 'text-green-500' },
  { id: 'bolt', icon: <FaBolt className="w-8 h-8" />, color: 'text-yellow-400' },
  { id: 'snowflake', icon: <FaSnowflake className="w-8 h-8" />, color: 'text-blue-500' },
  { id: 'fire', icon: <FaFire className="w-8 h-8" />, color: 'text-red-600' },
];

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedIcons = [...icons, ...icons];
    const shuffledCards = duplicatedIcons
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        iconId: item.id,
        icon: <div className={item.color}>{item.icon}</div>,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards;

      // Compare cards using their iconId instead of React elements
      if (cards[firstCard].iconId === cards[secondCard].iconId) {
        // Match found
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstCard].isMatched = true;
          updatedCards[secondCard].isMatched = true;
          setCards(updatedCards);
          setFlippedCards([]);

          // Check if all cards are matched
          if (updatedCards.every(card => card.isMatched)) {
            toast.success(`Congratulations! You won in ${moves + 1} moves! 🎉`, {
              position: "top-center",
              autoClose: 3000,
            });
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstCard].isFlipped = false;
          updatedCards[secondCard].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Memory Game</h1>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold text-gray-700">
            Moves: {moves}
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
            <li>• Click cards to reveal their symbols</li>
            <li>• Match pairs of identical symbols</li>
            <li>• Complete the game with as few moves as possible</li>
            <li>• All pairs must be matched to win</li>
          </ul>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-lg transition-all duration-300 transform 
              ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''} 
              ${!card.isFlipped && !card.isMatched ? 'hover:scale-105' : ''}`}
            disabled={card.isFlipped || card.isMatched}
          >
            <div className={`w-full h-full rounded-lg shadow-md flex items-center justify-center 
              ${card.isFlipped || card.isMatched ? 'bg-white' : 'bg-gradient-to-br from-pink-500 to-purple-500'}`}>
              {(card.isFlipped || card.isMatched) ? card.icon : null}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={initializeGame}
        className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg 
          hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg 
          active:scale-95 font-semibold"
      >
        New Game
      </button>
    </div>
  );
};

export default MemoryGame;