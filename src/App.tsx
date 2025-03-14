import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WordleGame from './pages/WordleGame';
import TicTacToe from './pages/TicTacToe';
import MemoryGame from './pages/MemoryGame';
import HandCricket from './pages/HandCricket';
import GuessWhoSaidIt from './pages/GuessWhoSaidIt';
import TypingGame from './pages/TypingGame';
import SnakeGame from './pages/SnakeGame';
import NumberGame from './pages/NumberGame';
import TruthDare from './pages/TruthDare';
import GuessSong from './pages/GuessSong';
import EmojiDecoder from './pages/EmojiDecoder';
import ScribbleGame from './pages/ScribbleGame';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-sky-200 to-pink-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wordle" element={<WordleGame />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/memory" element={<MemoryGame />} />
          <Route path="/handcricket" element={<HandCricket />} />
          <Route path="/guesswho" element={<GuessWhoSaidIt />} />
          <Route path="/typing" element={<TypingGame />} />
          <Route path="/snake" element={<SnakeGame />} />
          <Route path="/numbergame" element={<NumberGame />} />
          <Route path="/truthdare" element={<TruthDare />} />
          <Route path="/guesssong" element={<GuessSong />} />
          <Route path="/emojidecoder" element={<EmojiDecoder />} />
          <Route path="/scribble" element={<ScribbleGame />} />
        </Routes>
        <ToastContainer position="top-center" />
      </div>
    </Router>
  );
};

export default App;