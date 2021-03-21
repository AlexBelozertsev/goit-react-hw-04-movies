import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/base.scss';
import routes from '../../routes';

const AppBar = () => {
    return ( 
        <nav className='Nav'>
            <NavLink exact to={routes.homePage} className='NavLink' activeClassName='NavLink_active' >Home</NavLink>
            <NavLink to={routes.moviesPage} className='NavLink' activeClassName='NavLink_active' >Movies</NavLink>
        </nav>
    );
}
 
export default AppBar;