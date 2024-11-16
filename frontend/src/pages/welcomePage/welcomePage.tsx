import { NavLink } from 'react-router-dom';
import './welcomePage.css'; // Import the CSS file

const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Our Earlybird!</h1>
      <p>Please choose an option below:</p>
      <div className="button-container">
        <NavLink to="/login" className="button">
          Existing User Log In
        </NavLink>
        <NavLink to="/create-user" className="button">
          Create New User
        </NavLink>
      </div>
    </div>
  );
};

export default WelcomePage;
