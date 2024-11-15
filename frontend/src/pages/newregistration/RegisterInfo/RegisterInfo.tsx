import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./RegisterInfo.css";

const RegisterInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      // Store data in localStorage and redirect
      localStorage.setItem("userInfo", JSON.stringify({ firstName, lastName, email }));
      navigate("/preference-setup"); 
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisible(!repeatPasswordVisible);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Register for Earlybird</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group password-container">
          <label>Password</label>
          <div className="password-input">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="eye-icon" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        <div className="input-group password-container">
          <label>Repeat Password</label>
          <div className="password-input">
            <input
              type={repeatPasswordVisible ? "text" : "password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <div className="eye-icon" onClick={toggleRepeatPasswordVisibility}>
              {repeatPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterInfo;
