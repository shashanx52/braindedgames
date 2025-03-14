import { useState } from 'react';
import { toast } from 'react-toastify';

interface Player {
  id: number;
  name: string;
  score: number;
}

interface Answer {
  playerId: number;
  text: string;
}

const questions = [
  "What's their favorite hobby?",
  "What's their dream vacation destination?",
  "What's their most used emoji?",
  "What's their biggest pet peeve?",
  "What's their go-to comfort food?",
  "What's their hidden talent?",
  "What's their favorite movie genre?",
  "What's their ideal weekend activity?",
  "What's their most memorable childhood memory?",
  "What's their biggest fear?",
  "What's their favorite type of music?",
  "What's their most used app on their phone?",
  "What's their favorite season and why?",
  "What's their dream job?",
  "What's their favorite book or author?",
];

const GuessWhoSaidIt = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentGuesser, setCurrentGuesser] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [playerInput, setPlayerInput] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [answeringPlayerId, setAnsweringPlayerId] = useState<number | null>(null);
  const [guessing, setGuessing] = useState(false);

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
    if (players.length < 3) {
      toast.error('Need at least 3 players to start!');
      return;
    }
    setGameStarted(true);
    startNewRound();
  };

  const startNewRound = () => {
    const nextGuesser = currentGuesser === null ? players[0].id : 
      players[(players.findIndex(p => p.id === currentGuesser) + 1) % players.length].id;
    setCurrentGuesser(nextGuesser);
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setAnswers([]);
    setGuessing(false);
    setAnsweringPlayerId(null);
  };

  const submitAnswer = () => {
    if (!answeringPlayerId || !answerInput.trim()) return;
    
    setAnswers([...answers, { playerId: answeringPlayerId, text: answerInput.trim() }]);
    setAnswerInput('');
    setAnsweringPlayerId(null);

    if (answers.length + 1 === players.length - 1) {
      setGuessing(true);
    }
  };

  const makeGuess = (answerId: number, guessedPlayerId: number) => {
    const answer = answers[answerId];
    if (answer.playerId === guessedPlayerId) {
      toast.success('Correct guess! +1 point');
      setPlayers(players.map(p => 
        p.id === currentGuesser ? { ...p, score: p.score + 1 } : p
      ));
    } else {
      toast.error('Wrong guess!');
    }

    if (answerId === answers.length - 1) {
      setTimeout(() => {
        if (players.every(p => p.id === currentGuesser || 
            answers.some(a => a.playerId === p.id))) {
          startNewRound();
        }
      }, 1000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Guess Who Said It?</h1>
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
            <li>• 3-6 players take turns being the "Guesser"</li>
            <li>• Others write answers about the Guesser</li>
            <li>• Guesser matches answers to players</li>
            <li>• +1 point for each correct guess</li>
            <li>• Player with most points wins!</li>
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
            disabled={players.length < 3}
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center space-y-4">
              <div className="text-xl font-semibold text-gray-700">
                Current Guesser: {players.find(p => p.id === currentGuesser)?.name}
              </div>
              <div className="text-lg text-gray-600">
                Question: {currentQuestion}
              </div>
            </div>
          </div>

          {!guessing && currentGuesser && (
            <div className="space-y-4">
              {players
                .filter(p => p.id !== currentGuesser && !answers.some(a => a.playerId === p.id))
                .map(player => (
                  <div key={player.id} className="p-4 bg-white rounded-lg shadow-md">
                    {answeringPlayerId === player.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={answerInput}
                          onChange={(e) => setAnswerInput(e.target.value)}
                          placeholder="Write your answer..."
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button
                          onClick={submitAnswer}
                          className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                        >
                          Submit Answer
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAnsweringPlayerId(player.id)}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                      >
                        Write answer as {player.name}
                      </button>
                    )}
                  </div>
                ))}
            </div>
          )}

          {guessing && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Match answers to players:</h3>
              {answers.map((answer, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-md space-y-2">
                  <div className="text-gray-700">{answer.text}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {players
                      .filter(p => p.id !== currentGuesser)
                      .map(player => (
                        <button
                          key={player.id}
                          onClick={() => makeGuess(index, player.id)}
                          className="py-2 px-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                        >
                          {player.name}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
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

export default GuessWhoSaidIt;