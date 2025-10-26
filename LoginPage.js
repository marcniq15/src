import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from 'aws-amplify/auth';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState(''); // This will be our Matrix Number
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    console.log('[LoginPage] Attempting to sign in with user:', username);
    try {
      const result = await signIn({ username, password });
      console.log('[LoginPage] Sign in successful!', result);
    } catch (err) {
      console.error('[LoginPage] Error signing in:', err);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>CommuTrade</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="Matrix Number"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
