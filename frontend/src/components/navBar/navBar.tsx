
import React from 'react';
import { NavLink } from 'react-router-dom'; // using so that we can determine if link is active


const NavBar = () => {


    return (
        <nav className='navbar'>
            <h1>Will be Nav bar</h1>
            <ul className='nav-links'>
               <li>
                    <NavLink 
                        to="/profilePage"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                       
                        Your Profile
                    </NavLink>
                </li> 
                <li>
                    <NavLink 
                        to="/homePage"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                       
                        HomePage
                    </NavLink>
                </li> 
               <li>
                    <NavLink 
                        to="/calendar"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                       
                        Calendar
                    </NavLink>
                </li> 
 
               <li>
                    <NavLink 
                        to="/"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                       
                        Log Out
                    </NavLink>
                </li> 
            </ul>
        </nav>
    );
}

export default NavBar;
