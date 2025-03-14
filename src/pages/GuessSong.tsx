import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Song {
  lyrics: string;
  options: string[];
  correct: number;
}

const songs: Song[] = [
  {
    lyrics: "Tum paas aaye, yun muskuraaye\nTumne na jaane kya sapne dikhaye",
    options: ["Kuch Kuch Hota Hai", "DDLJ", "Hum Aapke Hain Koun", "Dil To Pagal Hai"],
    correct: 0
  },
  {
    lyrics: "Mehndi laga ke rakhna\nDoli saja ke rakhna",
    options: ["DDLJ", "Dilwale", "Raja Hindustani", "Hum Dil De Chuke Sanam"],
    correct: 0
  },
  {
    lyrics: "Ae mere humsafar, ek zara intezar\nSun sadaye de kar, pyar ki rahguzar",
    options: ["Qayamat Se Qayamat Tak", "Baazigar", "Veer-Zaara", "Refugee"],
    correct: 2
  },
  {
    lyrics: "Dil to pagal hai, dil deewana hai\nDil to pagal hai",
    options: ["Dil", "Dil To Pagal Hai", "Dilwale", "Dil Hai Ki Manta Nahin"],
    correct: 1
  },
  {
    lyrics: "Tujhe dekha to yeh jana sanam\nPyar hota hai deewana sanam",
    options: ["Kuch Kuch Hota Hai", "DDLJ", "Mohabbatein", "Kabhi Khushi Kabhie Gham"],
    correct: 1
  },
  {
    lyrics: "Hum tum ek kamre mein band hon\nAur chaabi kho jaye",
    options: ["Bobby", "Chandni", "Aandhi", "Dharam Veer"],
    correct: 0
  },
  {
    lyrics: "Ek ladki ko dekha to aisa laga\nJaise khilta gulab",
    options: ["1942: A Love Story", "Saajan", "Dil", "Beta"],
    correct: 0
  },
  {
    lyrics: "Kuch kuch hota hai, Rahul\nTum nahi samjhoge",
    options: ["Kuch Kuch Hota Hai", "Dil To Pagal Hai", "DDLJ", "Mohabbatein"],
    correct: 0
  },
  {
    lyrics: "Mere khwabon mein jo aaye\nEk shakhs mujhe tadpaye",
    options: ["Gupt", "Darr", "Baazigar", "Anjaam"],
    correct: 1
  },
  {
    lyrics: "Chura ke dil mera, goriya chali\nO ram ji, o ram ji",
    options: ["Main Khiladi Tu Anari", "Coolie No. 1", "Hero No. 1", "Raja Babu"],
    correct: 1
  }
];

const GuessSong = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [usedSongs, setUsedSongs] = useState<number[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  const getRandomSong = () => {
    const availableSongs = songs.filter((_, index) => !usedSongs.includes(index));
    if (availableSongs.length === 0) {
      endGame();
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableSongs.length);
    const songIndex = songs.findIndex(song => song === availableSongs[randomIndex]);
    setUsedSongs(prev => [...prev, songIndex]);
    setCurrentSong(songs[songIndex]);
    setTimeLeft(20);
  };

  const handleAnswer = (index: number) => {
    if (!currentSong) return;
    if (index === currentSong.correct) {
      setScore(prev => prev + 1);
      toast.success("Correct!");
    } else {
      toast.error("Wrong Answer!");
    }
    getRandomSong();
  };

  const handleTimeout = () => {
    toast.warn("Time's up!");
    getRandomSong();
  };

  const startGame = () => {
    setGameStarted(true);
    setUsedSongs([]);
    setScore(0);
    getRandomSong();
  };

  const endGame = () => {
    setGameStarted(false);
    setCurrentSong(null);
    toast.info(`Game Over! Your final score: ${score}`);
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Guess the Bollywood Song</h2>
      {!gameStarted ? (
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <>
          <p className="text-lg font-semibold mb-2">{currentSong?.lyrics}</p>
          <div className="flex flex-col space-y-2">
            {currentSong?.options.map((option, index) => (
              <button key={index} className="bg-gray-700 text-white px-4 py-2 rounded" onClick={() => handleAnswer(index)}>
                {option}
              </button>
            ))}
          </div>
          <p className="mt-4">Time Left: {timeLeft}s</p>
          <p>Score: {score}</p>
        </>
      )}
    </div>
  );
};

export default GuessSong;