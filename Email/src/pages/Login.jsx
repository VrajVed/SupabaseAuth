import React, { useState } from 'react'
import supabase from '../helper/supabaseClient';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    }
    if (data) {
      setMessage("Login successful!");
      navigate('/dashboard');
    }

    setEmail("");
    setPassword("");
  }


  return (
    <div>
          <h1>Login</h1>
          <br/>
          {message && <span>{message}</span>}
          <form onSubmit={handleSubmit}>
            <input 
              type='email' 
              placeholder='Email...'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type='password' 
              placeholder='Password...' 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          <button type='submit'>Login</button> 
        </form>
        <br />
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
  )
}

export default Login