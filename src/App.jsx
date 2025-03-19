import { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';

// Sample components for your routes (replace with actual components)
import Feed from './Feed';
import Login from './Login';
import Signup from './Signup';

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
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
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
