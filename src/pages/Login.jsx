import { useState } from "react";
import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css"; // Import the stylesheet

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCredential.user);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={login} className="login-btn">
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
