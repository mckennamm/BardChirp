import { useState } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom'; // Use Routes instead of Switch
import './App.css';

// Sample components for your routes
import Feed from './pages/Feed.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

import dnd from './assets/dnd.png';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      {/* Header with navigation */}
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/" exact="true" activeClassName="active">
                Feed
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" activeClassName="active">
                Sign Up
              </NavLink>
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
          Click on the logo to learn more about Dungeons and Dragons.
        </p>
        <a href="https://www.dndbeyond.com/?srsltid=AfmBOoppvykMAKQQW6cxw1CeEEMNvm9i9eA0wc3USJm3lgl7qnSx6Emd" target="_blank" rel="noopener noreferrer">
          <img src="/src/assets/dnd.png" className="logo dnd" alt="DnD logo" />
        </a>
      </footer>
    </div>
  );
}

export default App;
