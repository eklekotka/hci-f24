
import { NavLink } from 'react-router-dom'; 


const WelcomePage: React.FC = () => {


  return (
    <li>
        <p>will be welcome page</p>
    <NavLink 
        to="/login"
        className={({ isActive }) => (isActive ? 'active' : '')}
    >

        Go to Login
    </NavLink>
</li> 
  );
};

export default WelcomePage;
