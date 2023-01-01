import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const Container = styled.header`
    width: 100%;
    height: 5rem;
    background-color: #1e1e1e;
    padding: 0 10%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    font-family: 'Roboto', sans-serif;
    .logo {
        font-family: 'Open Sans', sans-serif;
        font-size: 2rem;
        color: white;
    }
    nav {
        height: 100%;
    }
    nav ul {
        height: 100%;
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0;
        align-items: center;
        justify-content: flex-start;
    }
    nav a {
        font-family: 'Open Sans', sans-serif;
        font-size: 1.5rem;
        text-decoration: none;
        color: #ffffff;
    }
    nav li {
        margin: 0 1rem;
    }
    @media (max-width: 800px) {
        height: 4rem;
        font-size: 1.2rem;
    }
`;
export const StyledActiveLink = styled(NavLink)`
    color: #67eeaa;
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover,
    &.active {
        color: #39e991;
    }
    &.active {
        color: #39e991;
    }
    @media (max-width: 800px) {
        font-size: 1.2rem;
    }
`;

export const StyledLogin = styled.li`
    color: #ffffff;
    text-decoration: none;
    display: flex;

    div {
        padding-top: 15px;
    }
    button {
        cursor: pointer;
        font: inherit;
        border: none;
        background-color: #ffffff60;
        color: #3c3f50;
        padding: 0.1rem 2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 25px;
        font-weight: bold;
    }
    &:hover,
    &.active {
        padding-bottom: 0.25rem;
        border-bottom: 4px solid #39e991;
    }
    &.active {
        color: #39e991;
    }
    @media (max-width: 800px) {
        font-size: 1.2rem;
    }
`;
