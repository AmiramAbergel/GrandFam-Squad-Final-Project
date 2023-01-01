import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/Auth.js';

//import classes from './MainNavigation.module.css';
import {
    Container,
    StyledActiveLink,
    StyledLogin,
} from '../../Themes/NavBar.styles.js';

const NavBar = () => {
    const { loggedUser, logout } = useAuth();
    return (
        <Container>
            <nav>
                <ul>
                    <li>
                        <StyledActiveLink
                            to='/score'
                            className={({ isActive }) =>
                                isActive ? 'active' : undefined
                            }
                        >
                            Score Table
                        </StyledActiveLink>
                    </li>
                    <li>
                        <StyledActiveLink
                            to='/map'
                            className={({ isActive }) =>
                                isActive ? 'active' : undefined
                            }
                        >
                            Where is grandma?
                        </StyledActiveLink>
                    </li>
                    <li>
                        <StyledActiveLink
                            to='/schedule'
                            className={({ isActive }) =>
                                isActive ? 'active' : undefined
                            }
                        >
                            Schedule Your Visit
                        </StyledActiveLink>
                    </li>
                    <li>
                        <NavLink
                            to='/assistance'
                            className={({ isActive }) =>
                                isActive ? 'active' : undefined
                            }
                        >
                            Who can assist?
                        </NavLink>
                    </li>
                    <StyledLogin>
                        <div>{loggedUser?.email}</div>
                        <button onClick={logout}>Logout</button>
                    </StyledLogin>
                </ul>
            </nav>
        </Container>
    );
};

export default NavBar;
