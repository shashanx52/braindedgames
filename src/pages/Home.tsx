import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaBrain, FaBaseballBall, FaKeyboard, FaDice, FaMusic, FaHeart, FaSmile, FaQuestion, FaDesktop, FaUsers, FaLock, FaInfoCircle, FaBook, FaCookieBite } from 'react-icons/fa';
import { GiSnake, GiPencilBrush } from 'react-icons/gi';

const games = [
  {
    id: 1,
    title: 'Word Guess',
    icon: <FaGamepad className="w-12 h-12" />,
    path: '/wordle',
    available: true,
  },
  {
    id: 2,
    title: 'Tic Tac Toe',
    icon: <FaGamepad className="w-12 h-12" />,
    path: '/tictactoe',
    available: true,
  },
  {
    id: 3,
    title: 'Memory Game',
    icon: <FaBrain className="w-12 h-12" />,
    path: '/memory',
    available: true,
  },
  {
    id: 4,
    title: 'Hand Cricket',
    icon: <FaBaseballBall className="w-12 h-12" />,
    path: '/handcricket',
    available: true,
  },
  {
    id: 5,
    title: 'Guess Who Said It?',
    icon: <FaQuestion className="w-12 h-12" />,
    path: '/guesswho',
    available: true,
  },
  {
    id: 6,
    title: 'Speed Typer',
    icon: <FaKeyboard className="w-12 h-12" />,
    path: '/typing',
    available: true,
  },
  {
    id: 7,
    title: 'Snake Game',
    icon: <GiSnake className="w-12 h-12" />,
    path: '/snake',
    available: true,
  },
  {
    id: 8,
    title: 'Number Quest',
    icon: <FaDice className="w-12 h-12" />,
    path: '/numbergame',
    available: true,
  },
  {
    id: 9,
    title: 'Truth or Dare',
    icon: <FaHeart className="w-12 h-12" />,
    path: '/truthdare',
    available: true,
  },
  {
    id: 10,
    title: 'Guess the Song',
    icon: <FaMusic className="w-12 h-12" />,
    path: '/guesssong',
    available: true,
  },
  {
    id: 11,
    title: 'Emoji Decoder',
    icon: <FaSmile className="w-12 h-12" />,
    path: '/emojidecoder',
    available: true,
  },
  {
    id: 12,
    title: 'Scribble',
    icon: <GiPencilBrush className="w-12 h-12" />,
    path: '/scribble',
    available: true,
  }
];

const features = [
  {
    icon: <FaDice className="w-8 h-8" />,
    title: "10+ games",
    description: "Fun collection of games"
  },
  {
    icon: <FaDesktop className="w-8 h-8" />,
    title: "No install needed",
    description: "Play directly in browser"
  },
  {
    icon: <FaUsers className="w-8 h-8" />,
    title: "Multiplayer games",
    description: "Play with friends"
  },
  {
    icon: <FaLock className="w-8 h-8" />,
    title: "All for free",
    description: "No hidden charges"
  }
];

const Home = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
  
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</Link>
                <button onClick={() => setShowAbout(true)} className="text-gray-700 hover:text-gray-900 font-medium">About</button>
                <button onClick={() => setShowTerms(true)} className="text-gray-700 hover:text-gray-900 font-medium">Contact</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-12 text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to BrainDed Games</h1>
            <p className="text-xl opacity-90 max-w-2xl">
              Your ultimate destination for fun and engaging browser games. Challenge your friends, test your skills, and enjoy hours of entertainment!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white/10 rounded-lg p-6 backdrop-blur-sm transform hover:scale-105 transition-all">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm opacity-90">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="flex-grow bg-gradient-to-b from-white to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <Link
                key={game.id}
                to={game.path}
                className={`block p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl 
                  ${game.available 
                    ? 'bg-white hover:bg-white cursor-pointer' 
                    : 'bg-gray-100 cursor-not-allowed'}`}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className={`${game.available ? 'text-pink-500' : 'text-gray-400'}`}>
                    {game.icon}
                  </div>
                  <h2 className={`text-xl font-semibold 
                    ${game.available ? 'text-gray-800' : 'text-gray-500'}`}>
                    {game.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BrainDed Games</h3>
              <p className="text-gray-400">
                Your go-to platform for casual gaming fun with friends and family.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowAbout(true)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaInfoCircle />
                  <span>About</span>
                </button>
                <button
                  onClick={() => setShowTerms(true)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaBook />
                  <span>Terms</span>
                </button>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaLock />
                  <span>Privacy</span>
                </button>
                <button
                  onClick={() => setShowCookies(true)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaCookieBite />
                  <span>Cookies</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            Made with <span className="text-red-500 animate-pulse inline-block">❤️</span> by Shashank
          </div>
        </div>
      </footer>

      {/* Modal Dialogs */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-gray-700">
              Welcome to BrainDed Games - a fun project created to bring joy and entertainment! This platform offers various casual games that you can enjoy with friends and family. No sign-ups required, just pure gaming fun!
            </p>
            <button
              onClick={() => setShowAbout(false)}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Terms</h2>
            <p className="text-gray-700">
              By using BrainDed Games, you agree to play fair, have fun, and spread positivity. These games are for entertainment purposes only.
            </p>
            <button
              onClick={() => setShowTerms(false)}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Privacy</h2>
            <p className="text-gray-700">
              We respect your privacy! BrainDed Games does not collect any personal information. Play with peace of mind.
            </p>
            <button
              onClick={() => setShowPrivacy(false)}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showCookies && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Cookies</h2>
            <p className="text-gray-700">
              We use minimal cookies to enhance your gaming experience. No personal data is stored.
            </p>
            <button
              onClick={() => setShowCookies(false)}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;