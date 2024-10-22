import React, { useState, FormEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import './loginPage.css'; 
import { useStudent } from '../../components/useStudent/useStudent'; 

const LoginPage: React.FC = () => {
  console.log("Login Page rendered?");

  const { updateStudent } = useStudent(); 

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    // Mock login response
    const result = { id: '1', name: 'Test Student', username }; // Mocked successful login
    if (result.id) {
      console.log('Login Successful');
      updateStudent(result); // Saves the student information
      navigate('/homePage'); // Navigate to student home page
    } else {
      setPassword('');
      setError('Login Error');
      console.log('Login Error');
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-group password-container">
        <label>Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="eye-icon" onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      <div className="forgot-password-error">
        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <div className="error-message">
          {error && <span>{error}</span>}
        </div>
      </div>
      <button className="submit-button" type="submit">Sign In</button>
    </form>
  );
};

export default LoginPage;
