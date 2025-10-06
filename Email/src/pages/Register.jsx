import React, { useState } from 'react'
import supabase from '../helper/supabaseClient';
import { Link } from 'react-router';

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const {data, error} = await supabase.auth.signUp({ email, password });
    if(error) {
      setMessage(error.message);
    }
    if(data) {
      setMessage("Account created!");
    }

    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <h1>Register</h1>
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
      <button type='submit'>Create Account</button> 
    </form>
    <br />
    <p>Already have an account? <Link to="/login">Login</Link></p>
  </div>
)
}

export default Register