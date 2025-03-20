import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase'; // Import your Firebase auth and db instances
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods
import { updateProfile } from 'firebase/auth'; // Import the updateProfile method

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to sign up the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the displayName (username) in Firebase Authentication
      await updateProfile(user, {
        displayName: username, // This stores the username as the display name
      });

      // Save the username and email to Firestore in the 'users' collection
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
      });

      // Redirect to login page on success
      navigate('/login'); 
    } catch (error) {
      // Handle known error codes
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try logging in or use a different email.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {/* Display error message if there's an error */}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
