import './Header.css';
import { NavLink } from 'react-router-dom';

import logo from '../assets/BardChirpLogo.svg';

function Header({ user, handleLogout }) {
  return (
    <header>
      <nav>
        <ul>
          {/* Show the logo only when no user is logged in */}
          {user && (
            <li>
              <img 
                src={logo} 
                alt="Bard Chirp Logo" 
                className="bardchirp-logo"
              />
            </li>
          )}

          {/* Feed link */}
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Feed
            </NavLink>
          </li>

          {/* Show the Profile link only when the user is logged in */}
          {user && (
            <li>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Profile
              </NavLink>
            </li>
          )}

          {/* Show Login and Sign Up only when no user is logged in */}
          {!user ? (
            <>
              <li>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/signup" 
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
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
  );
}

export default Header;
