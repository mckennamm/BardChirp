import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Updated for react-router-dom v6
import './App.css';

// Sample components for your routes (replace with actual components)
import Feed from './pages/Feed';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      {/* Header with navigation */}
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Feed</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Routing setup */}
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer>
        <p>
          Click on the logos to learn more about Vite and React.
        </p>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src="/assets/react.svg" className="logo react" alt="React logo" />
        </a>
      </footer>
    </div>
  );
}

export default App;
