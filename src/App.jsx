import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';


// Import pages
import Feed from './pages/Feed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
// Firebase imports
import { auth } from './config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="app">
      <Header user={user} handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={user ? <Feed /> : <Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route path="/login" element={!user ? <Login /> : <Feed />} />
          <Route path="/signup" element={!user ? <Signup /> : <Feed />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
