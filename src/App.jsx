import { useState, useEffect } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom'; // Use Routes instead of Switch
import './App.css';

// Sample components for your routes
import Feed from './pages/Feed.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

// Firebase imports
import { auth } from './config/firebase'; // Firebase auth import
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Import DnD logo
import dnd from './assets/dnd.png';

function App() {
  const [user, setUser] = useState(null); // State to track logged-in user

  useEffect(() => {
    // Set up an observer to track the auth state (logged-in user)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="app">
      {/* Header with navigation */}
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/" exact="true" className={({ isActive }) => (isActive ? 'active' : '')}>
                Feed
              </NavLink>
            </li>
            {!user ? (
              <>
                <li>
                  <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <main>
        {/* Routing setup */}
        <Routes>
          <Route path="/" element={user ? <Feed /> : <Login />} />
          <Route path="/login" element={!user ? <Login /> : <Feed />} />
          <Route path="/signup" element={!user ? <Signup /> : <Feed />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer>
        <p>
          Click on the logo to learn more about Dungeons and Dragons.
        </p>
        <a href="https://www.dndbeyond.com/?srsltid=AfmBOoppvykMAKQQW6cxw1CeEEMNvm9i9eA0wc3USJm3lgl7qnSx6Emd" target="_blank" rel="noopener noreferrer">
          <img src={dnd} className="logo dnd" alt="DnD logo" />
        </a>
      </footer>
    </div>
  );
}

export default App;
