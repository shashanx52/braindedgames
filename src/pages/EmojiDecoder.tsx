import { useState } from 'react';
import { toast } from 'react-toastify';

interface Player {
  id: number;
  name: string;
  score: number;
}

interface Round {
  creator: number;
  guesser: number;
  emojis: string;
  answer: string;
  guessed: boolean;
  remainingGuessers: number[]; // Array of players who haven't guessed yet
}

const commonEmojis = [
  '😀', '😂', '❤️', '👍', '🎮', '🎵', '🎬', '📱', '💻', '🎨',
  '🏃', '🚗', '✈️', '🌍', '🏠', '🍕', '🍔', '🍦', '🎂', '☕',
  '🌞', '🌙', '⭐', '🌈', '🔥', '💧', '🎸', '🎹', '📚', '✏️',
  '⚽', '🏀', '🎯', '🎲', '👑', '💍', '💰', '⏰', '📷', '🎁'
];

const EmojiDecoder = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentCreator, setCurrentCreator] = useState<number | null>(null);
  const [currentGuesser, setCurrentGuesser] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [playerInput, setPlayerInput] = useState('');
  const [emojiInput, setEmojiInput] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [guessInput, setGuessInput] = useState('');
  const [currentRound, setCurrentRound] = useState<Round | null>(null);

  const addPlayer = () => {
    if (playerInput.trim()) {
      if (players.length >= 6) {
        toast.error('Maximum 6 players allowed!');
        return;
      }
      if (players.some(p => p.name.toLowerCase() === playerInput.trim().toLowerCase())) {
        toast.error('Player name already exists!');
        return;
      }
      setPlayers([...players, { id: Date.now(), name: playerInput.trim(), score: 0 }]);
      setPlayerInput('');
    }
  };

  const startGame = () => {
    if (players.length < 2) {
      toast.error('Need at least 2 players to start!');
      return;
    }
    setGameStarted(true);
    setCurrentCreator(players[0].id);
    // Set the second player as the initial guesser
    setCurrentGuesser(players[1].id);
  };

  const addEmoji = (emoji: string) => {
    setEmojiInput(prev => prev + emoji);
  };

  const submitEmojiPuzzle = () => {
    if (!emojiInput.trim() || !answerInput.trim()) {
      toast.error('Please provide both emojis and answer!');
      return;
    }

    // Create array of all players except creator for remaining guessers
    const remainingGuessers = players
      .filter(p => p.id !== currentCreator)
      .map(p => p.id);

    setCurrentRound({
      creator: currentCreator!,
      guesser: remainingGuessers[0],
      emojis: emojiInput.trim(),
      answer: answerInput.trim().toLowerCase(),
      guessed: false,
      remainingGuessers: remainingGuessers
    });

    setEmojiInput('');
    setAnswerInput('');
  };

  const moveToNextGuesser = () => {
    if (!currentRound) return;

    const remainingGuessers = currentRound.remainingGuessers.filter(
      id => id !== currentGuesser
    );

    if (remainingGuessers.length > 0) {
      // Move to next guesser
      setCurrentGuesser(remainingGuessers[0]);
      setCurrentRound({
        ...currentRound,
        guesser: remainingGuessers[0],
        remainingGuessers
      });
      toast.info(`Next guesser: ${players.find(p => p.id === remainingGuessers[0])?.name}`);
    } else {
      // No more guessers - creator wins
      toast.success('No one guessed correctly! Creator gets a point!');
      setPlayers(players.map(p =>
        p.id === currentCreator ? { ...p, score: p.score + 1 } : p
      ));
      moveToNextRound();
    }
  };

  const moveToNextRound = () => {
    // Find the next creator index
    const currentCreatorIndex = players.findIndex(p => p.id === currentCreator);
    const nextCreatorIndex = (currentCreatorIndex + 1) % players.length;
    
    // Set the next creator and their guesser
    setCurrentCreator(players[nextCreatorIndex].id);
    setCurrentGuesser(players[(nextCreatorIndex + 1) % players.length].id);
    setCurrentRound(null);
    setGuessInput('');
  };

  const makeGuess = () => {
    if (!currentRound || currentRound.guessed) return;

    if (guessInput.trim().toLowerCase() === currentRound.answer) {
      toast.success('Correct guess! +1 point');
      
      // Update guesser's score
      setPlayers(players.map(p =>
        p.id === currentGuesser ? { ...p, score: p.score + 1 } : p
      ));

      moveToNextRound();
    } else {
      toast.error('Wrong guess! Moving to next guesser...');
      moveToNextGuesser();
    }

    setGuessInput('');
  };

  const getCurrentCreatorName = () => {
    return players.find(p => p.id === currentCreator)?.name || '';
  };

  const getCurrentGuesserName = () => {
    return players.find(p => p.id === currentGuesser)?.name || '';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Emoji Decoder</h1>
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
            <li>• Players take turns creating emoji puzzles</li>
            <li>• Create a phrase using emojis from the picker</li>
            <li>• Players take turns guessing the answer</li>
            <li>• Correct guess earns +1 point for the guesser</li>
            <li>• If no one guesses correctly, creator gets +1 point</li>
            <li>• Example: 🎸🔥 = "Guitar Hero"</li>
          </ul>
        </div>
      )}

      {!gameStarted ? (
        <div className="space-y-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              placeholder="Enter player name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
            />
            <button
              onClick={addPlayer}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 
                transition-colors font-semibold"
            >
              Add Player
            </button>
          </div>

          {players.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Players:</h3>
              <div className="grid grid-cols-2 gap-4">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="p-3 bg-white rounded-lg shadow flex justify-between items-center"
                  >
                    <span>{player.name}</span>
                    <button
                      onClick={() => setPlayers(players.filter(p => p.id !== player.id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startGame}
            className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg 
              hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg 
              active:scale-95 font-semibold"
            disabled={players.length < 2}
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-pink-50 rounded-lg">
                  <div className="text-sm text-pink-600">Creator</div>
                  <div className="text-lg font-semibold text-gray-700">{getCurrentCreatorName()}</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600">Current Guesser</div>
                  <div className="text-lg font-semibold text-gray-700">{getCurrentGuesserName()}</div>
                </div>
              </div>
              {currentRound && (
                <div className="text-sm text-gray-500">
                  Remaining Guessers: {currentRound.remainingGuessers.length}
                </div>
              )}
            </div>
          </div>

          {currentCreator && (
            <div className="space-y-4">
              {!currentRound ? (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-700 mb-2">Emoji Picker:</h3>
                    <div className="grid grid-cols-8 gap-2">
                      {commonEmojis.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => addEmoji(emoji)}
                          className="text-2xl p-2 hover:bg-gray-100 rounded"
                          disabled={currentCreator !== players.find(p => p.id === currentCreator)?.id}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={emojiInput}
                    onChange={(e) => setEmojiInput(e.target.value)}
                    placeholder="Your emoji combination..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="text"
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    placeholder="Enter answer..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={submitEmojiPuzzle}
                    className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                  >
                    Submit Puzzle
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center text-4xl p-4 bg-white rounded-lg shadow">
                    {currentRound.emojis}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={guessInput}
                      onChange={(e) => setGuessInput(e.target.value)}
                      placeholder="Enter your guess..."
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      onKeyPress={(e) => e.key === 'Enter' && makeGuess()}
                      disabled={currentGuesser !== currentRound.guesser}
                    />
                    <button
                      onClick={makeGuess}
                      className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                      disabled={currentGuesser !== currentRound.guesser}
                    >
                      Guess
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {players.map(player => (
              <div key={player.id} className="p-3 bg-white rounded-lg shadow text-center">
                <div className="font-semibold">{player.name}</div>
                <div className="text-pink-500">{player.score} points</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiDecoder;