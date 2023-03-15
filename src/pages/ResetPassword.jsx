import { useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const {token} = useParams()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  console.log("TOKEN",token)


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5005/auth/user/reset-password', { token, password });
      setSuccess(true);
    } catch (error) {
      console.error("ERROR",error);
    }
  };



  return (
    <div>
      {success ? (
        <p>Your password has been reset successfully</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          {error && <p>{error}</p>}
          <div>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )} 
    </div>
  );
};

export default ResetPassword;




