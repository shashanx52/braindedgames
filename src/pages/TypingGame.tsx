import { useState, useEffect, useCallback } from 'react';

const words = [
  'accuracy', 'fraction', 'calculate', 'expand', 'broadcast', 'conservation', 'enthusiasm', 'economy', 'prediction', 'reliability', 'entire', 'proficiency', 'hypothesis', 'microphone', 'advice', 'tournament', 'concept', 'adjustment', 'explanation', 'comparison', 'literature', 'society', 'frequency', 'industrial', 'statistics', 'background', 'happiness', 'positive', 'beneficial', 'variation', 'negotiation', 'customer', 'potential', 'investigation', 'personality', 'dynamic', 'continuous', 'authentic', 'networking', 'artificial', 'engineering', 'biological', 'performance', 'exponential', 'technological', 'elementary', 'competition', 'celebrate', 'corporate', 'mechanical', 'investment', 'academy', 'understanding', 'prevention', 'opportunity', 'characteristic', 'availability', 'comprehensive', 'recognition', 'software', 'migration', 'verification', 'enforcement', 'improvement', 'database', 'entertainment', 'productivity', 'flexibility', 'architecture', 'evidence', 'encourage', 'achievement', 'execution', 'identification', 'discipline', 'guideline', 'finance', 'environment', 'satisfaction', 'enlighten', 'observation', 'communication', 'interpretation', 'realization', 'education', 'compliance', 'commitment', 'fabrication', 'criminal', 'situation', 'algorithm', 'partnership', 'mathematical', 'reputation', 'investment', 'theory', 'resource', 'network', 'evaluation', 'strategy', 'leadership', 'innovation', 'sustainability', 'integration', 'management', 'collaboration', 'efficiency', 'scientific', 'measurement', 'optimization', 'accuracy', 'fraction', 'calculate', 'expand', 'broadcast', 'conservation', 'enthusiasm', 'economy', 'prediction', 'reliability', 'entire', 'proficiency', 'hypothesis', 'microphone', 'advice', 'tournament', 'concept', 'adjustment', 'explanation', 'comparison', 'literature', 'society', 'frequency', 'industrial', 'statistics', 'background', 'happiness', 'positive', 'beneficial', 'variation', 'negotiation', 'customer', 'potential', 'investigation', 'personality', 'dynamic', 'continuous', 'authentic', 'networking', 'artificial', 'engineering', 'biological', 'performance', 'exponential', 'technological', 'elementary', 'competition', 'celebrate', 'corporate', 'mechanical', 'investment', 'academy', 'understanding', 'prevention', 'opportunity', 'characteristic', 'availability', 'comprehensive', 'recognition', 'software', 'migration', 'verification', 'enforcement', 'improvement', 'database', 'entertainment', 'productivity', 'flexibility', 'architecture', 'evidence', 'encourage', 'achievement', 'execution', 'identification', 'discipline', 'guideline', 'finance', 'environment', 'satisfaction', 'enlighten', 'observation', 'communication', 'interpretation', 'realization', 'education', 'compliance', 'commitment', 'fabrication', 'criminal', 'situation', 'algorithm', 'partnership', 'mathematical', 'reputation', 'investment', 'theory', 'resource', 'network', 'evaluation', 'strategy', 'leadership', 'innovation', 'sustainability', 'integration', 'management', 'collaboration', 'efficiency', 'scientific', 'measurement', 'optimization', 'accuracy', 'fraction', 'calculate', 'expand', 'broadcast', 'conservation', 'enthusiasm', 'economy', 'prediction', 'reliability', 'entire', 'proficiency', 'hypothesis', 'microphone', 'advice', 'tournament', 'concept', 'adjustment', 'explanation', 'comparison', 'literature', 'society', 'frequency', 'industrial', 'statistics', 'background', 'happiness', 'positive', 'beneficial', 'variation', 'negotiation', 'customer', 'potential', 'investigation', 'personality', 'dynamic', 'continuous', 'authentic', 'networking', 'artificial', 'engineering', 'biological', 'performance', 'exponential', 'technological', 'elementary', 'competition', 'celebrate', 'corporate', 'mechanical', 'investment', 'academy', 'understanding', 'prevention', 'opportunity', 'characteristic', 'availability', 'comprehensive', 'recognition', 'software', 'migration', 'verification', 'enforcement', 'improvement', 'database', 'entertainment', 'productivity', 'flexibility', 'architecture', 'evidence', 'encourage', 'achievement', 'execution', 'identification', 'discipline', 'guideline', 'finance', 'environment', 'satisfaction', 'enlighten', 'observation', 'communication', 'interpretation', 'realization', 'education', 'compliance', 'commitment', 'fabrication', 'criminal', 'situation', 'algorithm', 'partnership', 'mathematical', 'reputation', 'investment', 'theory', 'resource', 'network', 'evaluation', 'strategy', 'leadership', 'innovation', 'sustainability', 'integration', 'management', 'collaboration', 'efficiency', 'scientific', 'measurement', 'optimization', 'accuracy', 'fraction', 'calculate', 'expand', 'broadcast', 'conservation', 'enthusiasm', 'economy', 'prediction', 'reliability', 'entire', 'proficiency', 'hypothesis', 'microphone', 'advice', 'tournament', 'concept', 'adjustment', 'explanation', 'comparison', 'literature', 'society', 'frequency', 'industrial', 'statistics', 'background', 'happiness', 'positive', 'beneficial', 'variation', 'negotiation', 'customer', 'potential', 'investigation', 'personality', 'dynamic', 'continuous', 'authentic', 'networking', 'artificial', 'engineering', 'biological', 'performance', 'exponential', 'technological', 'elementary', 'competition', 'celebrate', 'corporate', 'mechanical', 'investment', 'academy', 'understanding', 'prevention', 'opportunity', 'characteristic', 'availability', 'comprehensive', 'recognition', 'software', 'migration', 'verification', 'enforcement', 'improvement', 'database', 'entertainment', 'productivity', 'flexibility', 'architecture', 'evidence', 'encourage', 'achievement', 'execution', 'identification', 'discipline', 'guideline', 'finance', 'environment', 'satisfaction', 'enlighten', 'observation', 'communication', 'interpretation', 'realization', 'education', 'compliance', 'commitment', 'fabrication', 'criminal', 'situation', 'algorithm', 'partnership', 'mathematical', 'reputation', 'investment', 'theory', 'resource', 'network', 'evaluation', 'strategy', 'leadership', 'innovation', 'sustainability', 'integration', 'management', 'collaboration', 'efficiency', 'scientific', 'measurement', 'optimization', 'accuracy', 'fraction', 'calculate', 'expand', 'broadcast', 'conservation', 'enthusiasm', 'economy', 'prediction', 'reliability', 'entire', 'proficiency', 'hypothesis', 'microphone', 'advice', 'tournament', 'concept', 'adjustment', 'explanation', 'comparison', 'literature', 'society', 'frequency', 'industrial', 'statistics', 'background', 'happiness', 'positive', 'beneficial', 'variation', 'negotiation', 'customer', 'potential', 'investigation', 'personality', 'dynamic', 'continuous', 'authentic', 'networking', 'artificial', 'engineering', 'biological', 'performance', 'exponential', 'technological', 'elementary', 'competition', 'celebrate', 'corporate', 'mechanical', 'investment', 'academy', 'understanding', 'prevention', 'opportunity', 'characteristic', 'availability', 'comprehensive', 'recognition', 'software', 'migration', 'verification', 'enforcement', 'improvement', 'database', 'entertainment', 'productivity', 'flexibility', 'architecture', 'evidence', 'encourage', 'achievement', 'execution', 'identification', 'discipline', 'guideline', 'finance', 'environment', 'satisfaction', 'enlighten', 'observation', 'communication', 'interpretation', 'realization', 'education', 'compliance', 'commitment', 'fabrication', 'criminal', 'situation', 'algorithm', 'partnership', 'mathematical', 'reputation', 'investment', 'theory', 'resource', 'network', 'evaluation', 'strategy', 'leadership', 'innovation', 'sustainability', 'integration', 'management', 'collaboration', 'efficiency', 'scientific', 'measurement', 'optimization', 'accuracy', 'fraction', 'calculate', 'expand', 'broadcast', 'conservation', 'enthusiasm', 'economy', 'prediction', 'reliability', 'entire', 'proficiency', 'hypothesis', 'microphone', 'advice', 'tournament', 'concept', 'adjustment', 'explanation', 'comparison', 'literature', 'society', 'frequency', 'industrial', 'statistics', 'background', 'happiness', 'positive', 'beneficial', 'variation', 'negotiation', 'customer', 'potential', 'investigation', 'personality', 'dynamic', 'continuous', 'authentic', 'networking', 'artificial', 'engineering', 'biological', 'performance', 'exponential', 'technological', 'elementary', 'competition', 'celebrate', 'corporate', 'mechanical', 'investment', 'academy', 'understanding', 'prevention', 'opportunity', 'characteristic', 'availability', 'comprehensive', 'recognition', 'software', 'migration', 'verification', 'enforcement', 'improvement', 'database', 'entertainment', 'productivity', 'flexibility', 'architecture', 'evidence', 'encourage', 'achievement', 'execution', 'identification', 'discipline', 'guideline', 'finance', 'environment', 'satisfaction', 'enlighten', 'observation', 'communication', 'interpretation', 'realization', 'education', 'compliance', 'commitment', 'fabrication', 'criminal', 'situation', 'algorithm', 'partnership', 'mathematical', 'reputation', 'investment', 'theory', 'resource', 'network', 'evaluation', 'strategy', 'leadership', 'innovation', 'sustainability', 'integration', 'management', 'collaboration', 'efficiency', 'scientific', 'measurement', 'optimization', 'accuracy', 'fraction', 'calculate', 'expand', 'broadcast', 'conservation', 'enthusiasm', 'economy', 'prediction', 'reliability', 'entire', 'proficiency', 'hypothesis', 'microphone', 'advice', 'tournament', 'concept', 'adjustment', 'explanation', 'comparison', 'literature', 'society', 'frequency', 'industrial', 'statistics', 'background', 'happiness', 'positive', 'beneficial', 'variation', 'negotiation', 'customer', 'potential', 'investigation', 'personality', 'dynamic', 'continuous', 'authentic', 'networking', 'artificial', 'engineering', 'biological', 'performance', 'exponential', 'technological', 'elementary', 'competition', 'celebrate', 'corporate', 'mechanical', 'investment', 'academy', 'understanding', 'prevention', 'opportunity', 'characteristic', 'availability', 'comprehensive', 'recognition', 'software', 'migration', 'verification', 'enforcement', 'improvement', 'database', 'entertainment', 'productivity', 'flexibility', 'architecture', 'evidence', 'encourage', 'achievement', 'execution', 'identification', 'discipline', 'guideline', 'finance', 'environment', 'satisfaction', 'enlighten', 'observation', 'communication', 'interpretation', 'realization', 'education', 'compliance', 'commitment', 'fabrication', 'criminal', 'situation', 'algorithm', 'partnership', 'mathematical', 'reputation', 'investment', 'theory', 'resource', 'network', 'evaluation', 'strategy', 'leadership', 'innovation', 'sustainability', 'integration', 'management', 'collaboration', 'efficiency', 'scientific', 'measurement', 'optimization', 'accuracy', 'fraction', 'calculate', 'expand', 'broadcast', 'conservation', 'enthusiasm', 'economy', 'prediction', 'reliability', 'entire', 'proficiency', 'hypothesis', 'microphone', 'advice', 'tournament', 'concept', 'adjustment', 'explanation', 'comparison', 'literature', 'society', 'frequency', 'industrial', 'statistics', 'background', 'happiness', 'positive', 'beneficial', 'variation', 'negotiation', 'customer', 'potential', 'investigation', 'personality', 'dynamic', 'continuous', 'authentic', 'networking', 'artificial', 'engineering', 'biological', 'performance', 'exponential', 'technological', 'elementary', 'competition', 'celebrate', 'corporate', 'mechanical', 'investment', 'academy', 'understanding', 'prevention', 'opportunity', 'characteristic', 'availability', 'comprehensive', 'recognition', 'software', 'migration', 'verification', 'enforcement', 'improvement', 'database', 'entertainment', 'productivity', 'flexibility', 'architecture', 'evidence', 'encourage', 'achievement', 'execution', 'identification', 'discipline', 'guideline', 'finance', 'environment', 'satisfaction', 'enlighten', 'observation', 'communication', 'interpretation', 'realization', 'education', 'compliance', 'commitment', 'fabrication', 'criminal', 'situation', 'algorithm', 'partnership', 'mathematical', 'reputation', 'investment', 'theory', 'resource', 'network', 'evaluation', 'strategy', 'leadership', 'innovation', 'sustainability', 'integration', 'management', 'collaboration', 'efficiency', 'scientific', 'measurement', 'optimization', 'accuracy', 'fraction', 'calculate', 'expand', 'broadcast', 'conservation', 'enthusiasm', 'economy', 'prediction', 'reliability', 'entire', 'proficiency', 'hypothesis', 'microphone', 'advice', 'tournament', 'concept', 'adjustment', 'explanation', 'comparison', 'literature', 'society', 'frequency', 'industrial', 'statistics', 'background', 'happiness', 'positive', 'beneficial', 'variation', 'negotiation', 'customer', 'potential', 'investigation', 'personality', 'dynamic', 'continuous', 'authentic', 'networking', 'artificial', 'engineering', 'biological', 'performance', 'exponential', 'technological', 'elementary', 'competition', 'celebrate', 'corporate', 'mechanical', 'investment', 'academy', 'understanding', 'prevention', 'opportunity', 'characteristic', 'availability', 'comprehensive', 'recognition', 'software', 'migration', 'verification'
];

const TypingGame = () => {
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [wpm, setWpm] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [errors, setErrors] = useState<number[]>([]);

  const generateWords = useCallback(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 50);
  }, []);

  useEffect(() => {
    setCurrentWords(generateWords());
  }, [generateWords]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            setGameStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!gameStarted && value.length === 1) {
      setGameStarted(true);
      setStartTime(Date.now());
    }

    if (value.endsWith(' ')) {
      const word = value.trim();
      if (word === currentWords[0]) {
        const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
        const wordsTyped = 50 - currentWords.length + 1;
        const currentWpm = Math.round(wordsTyped / (timeElapsed || 1));
        setWpm(currentWpm);

        setCurrentWords(prev => prev.slice(1));
        setUserInput('');
        setErrors([]); // Clear errors on correct input
      } else {
        setErrors([...errors, currentWords.length]); // Track errors
      }
    } else {
      setUserInput(value);
    }
  };

  const resetGame = () => {
    setCurrentWords(generateWords());
    setUserInput('');
    setStartTime(null);
    setTimeLeft(30);
    setWpm(0);
    setGameStarted(false);
    setGameOver(false);
    setErrors([]);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Speed Typer</h1>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold text-gray-700">
            Time: {timeLeft}s
          </div>
          <div className="text-lg font-semibold text-gray-700">
            WPM: {wpm}
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
            <li>• Type the words as they appear</li>
            <li>• Press space after each word</li>
            <li>• Timer starts when you begin typing</li>
            <li>• Complete as many words as possible in 30 seconds</li>
          </ul>
        </div>
      )}

      <div className="bg-white/90 rounded-lg shadow-md p-6 mb-6">
        <div className="mb-6 text-lg leading-relaxed break-words whitespace-pre-wrap">
          {currentWords.slice(0, 10).map((word, index) => (
            <span
              key={index}
              className={`mr-2 inline-block ${
                index === 0
                  ? 'text-pink-500 font-semibold'
                  : errors.includes(index)
                  ? 'text-red-500 line-through'
                  : 'text-gray-600'
              }`}
            >
              {word}
            </span>
          ))}
        </div>

        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={gameOver}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder={gameStarted ? "Type here..." : "Type to start..."}
        />
      </div>

      {gameOver && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold mb-4">Time's up!</h2>
          <p className="text-xl">Your typing speed: {wpm} WPM</p>
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

export default TypingGame;