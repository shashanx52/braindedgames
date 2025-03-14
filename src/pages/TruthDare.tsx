import { useState } from 'react';
import { toast } from 'react-toastify';

const truths = [
  "What's your biggest fear?",
  "What's the most embarrassing thing that's happened to you?",
  "What's your biggest regret?",
  "What's the worst lie you've ever told?",
  "What's your biggest secret?",
  "What's the most childish thing you still do?",
  "What's your worst habit?",
  "What's the most trouble you've ever been in?",
  "What's the most expensive thing you've broken?",
  "What's your biggest insecurity?",
  "Have you ever cheated on a test?",
  "What's the meanest thing you've ever done?",
  "What's your biggest crush?",
  "What's the most embarrassing thing in your room?",
  "What's the last lie you told?",
  "What's your biggest pet peeve?",
  "What's the worst gift you've ever received?",
  "What's your most embarrassing nickname?",
  "What's the worst thing you've ever done at school/work?",
  "What's your biggest fear about growing up?"
];

const dares = [
  "Do your best Bollywood dance move",
  "Sing a popular Bollywood song for 30 seconds",
  "Call a friend and speak in a different accent",
  "Do 10 push-ups",
  "Eat a spoonful of any spice",
  "Send a funny selfie to your family group",
  "Do your best impression of a family member",
  "Speak in reverse for the next 2 minutes",
  "Do your best animal impression",
  "Tell a joke in a different language",
  "Do the moonwalk",
  "Make up a rap about someone in the room",
  "Show your last 5 photos in your gallery",
  "Text your crush 'I love mangoes'",
  "Call someone and sing Happy Birthday",
  "Do your best cricket commentary",
  "Imitate your favorite celebrity",
  "Do the garba for 30 seconds",
  "Make a TikTok style dance",
  "Tell a story using only sound effects",
  "Last time you loved someone so hard",
  "show your screenshots first page without hiding",
  "Your college crush",
  "Go and tell your teacher leave me alone",
  "put up a insta story i am worst child",
  "Record a video saying ‘I love you’ to the person you like",
  "Tell your last breakup story",
  "2 lines about yourself you think",
  "Show your insta first 5 reels",
  "show insta saved reels",
  "message 2 random people on insta You are so fake",
  "Message your mum I LOVE YOU Qt",
  "Message your dad I LOVE YOU ",
  "Call any of your friends and ask them to send ₹500 via Paytm.",
  "Hold anyone's hand for the next two minutes, no letting go!",
  "Call your ex (or someone you liked) and say I miss you",
  "Let the group change your Instagram bio for the next 24 hours",
  "Let the group post any status on your WhatsApp without you checking it first.",
  "Send a text to your most recent chat saying I have a surprise for you!",
  "Give someone in the group a compliment, but make it sound like an insult.",
  "Let someone in the group pick your phone wallpaper for 24 hours.",
  "Take a sip of water and try to hold it in while someone makes you laugh.",
  "Make a dramatic fake proposal to the person sitting closest to you.",
  "Scroll through your WhatsApp contacts and send Hi 😘 to the 10th person.",
  "Let someone in the group DM a random celebrity from your Instagram.",
  "Swap shoes with someone for the next 10 minutes",
  "Call a random number and sing 'Twinkle Twinkle Little Star'", 
  "Act like a statue for the next 1 minutes",
  "Open your phone notes app",
  "Read the last message you received out loud",
  "Eat a piece of food without using your hands.",
  "Sing a nursery rhyme in the most dramatic way possible",
  "Say the alphabet backward in under 30 seconds.",
  "Try to balance a book on your head and walk across the room.",
  "Take a selfie making the ugliest face possible and set it as your profile picture for 1 hour.",
  "Post an embarrassing childhood photo on Instagram story", 
  
  
];

const TruthDare = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string>('');
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [choice, setChoice] = useState<'truth' | 'dare' | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerInput, setPlayerInput] = useState<string>('');

  const addPlayer = () => {
    if (playerInput.trim()) {
      if (players.length >= 5) {
        toast.error('Maximum 5 players allowed!');
        return;
      }
      if (players.includes(playerInput.trim())) {
        toast.error('Player already added!');
        return;
      }
      setPlayers([...players, playerInput.trim()]);
      setPlayerInput('');
    }
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const startGame = () => {
    if (players.length < 2) {
      toast.error('Add at least 2 players to start!');
      return;
    }
    setGameStarted(true);
    selectRandomPlayer();
  };

  const selectRandomPlayer = () => {
    const randomIndex = Math.floor(Math.random() * players.length);
    const selected = players[randomIndex];
    setCurrentPlayer(selected);
    setChoice(null);
    setCurrentPrompt('');
    toast.info(`${selected}'s turn!`);
  };

  const selectTruthOrDare = (type: 'truth' | 'dare') => {
    setChoice(type);
    const prompts = type === 'truth' ? truths : dares;
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);
  };

  const nextTurn = () => {
    setCurrentPrompt('');
    setChoice(null);
    selectRandomPlayer();
  };

  const resetGame = () => {
    setPlayers([]);
    setCurrentPlayer('');
    setCurrentPrompt('');
    setChoice(null);
    setGameStarted(false);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Truth or Dare</h1>
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
            <li>• Add up to 5 players</li>
            <li>• Game will randomly select a player</li>
            <li>• Selected player chooses Truth or Dare</li>
            <li>• Complete the challenge and pass to next player</li>
          </ul>
        </div>
      )}

      <div className="bg-white/90 rounded-lg shadow-md p-6 mb-6">
        {!gameStarted && (
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
                Add
              </button>
            </div>

            {players.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Players:</h3>
                <div className="flex flex-wrap gap-2">
                  {players.map((player, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full flex items-center space-x-2"
                    >
                      <span>{player}</span>
                      <button
                        onClick={() => removePlayer(index)}
                        className="text-purple-500 hover:text-purple-700"
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
            >
              Start Game
            </button>
          </div>
        )}

        {gameStarted && !choice && (
          <div className="text-center space-y-6">
            <div className="text-2xl font-bold text-purple-500 mb-4">
              {currentPlayer}'s Turn!
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => selectTruthOrDare('truth')}
                className="px-8 py-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 
                  transition-colors font-semibold"
              >
                Truth
              </button>
              <button
                onClick={() => selectTruthOrDare('dare')}
                className="px-8 py-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 
                  transition-colors font-semibold"
              >
                Dare
              </button>
            </div>
          </div>
        )}

        {currentPrompt && (
          <div className="text-center space-y-6">
            <div className={`text-2xl font-bold ${choice === 'truth' ? 'text-pink-500' : 'text-purple-500'}`}>
              {currentPlayer} - {choice?.toUpperCase()}
            </div>
            <p className="text-xl">{currentPrompt}</p>
            <button
              onClick={nextTurn}
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg 
                hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg 
                active:scale-95 font-semibold"
            >
              Next Turn
            </button>
          </div>
        )}

        {gameStarted && (
          <button
            onClick={resetGame}
            className="mt-6 w-full py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 
              transition-colors font-semibold"
          >
            End Game
          </button>
        )}
      </div>
    </div>
  );
};

export default TruthDare;