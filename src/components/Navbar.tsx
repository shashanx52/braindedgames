import { Link } from 'react-router-dom';
import { FaBrain, FaGithub, FaLinkedin, FaInstagram, FaCoffee } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Navbar = () => {
  const handleCoffeeClick = () => {
    toast.info("Men don't drink coffee Qt 😉", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <FaBrain className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
                BrainDed Games
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/shashanx52"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/shashanx/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/shashanx_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <button
                onClick={handleCoffeeClick}
                className="text-gray-600 hover:text-gray-900"
              >
                <FaCoffee className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="fixed bottom-0 left-0 right-0 text-center text-sm text-gray-500 py-2 bg-white/80 backdrop-blur-sm shadow-lg">
        Made with <span className="text-red-500 animate-pulse inline-block">❤️</span> by Shashank
      </div>
    </>
  );
};

export default Navbar;