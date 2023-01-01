import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const Container = styled.header`
    width: 100%;
    height: 5rem;
    background-color: #044599;
    padding: 0 10%;
    .logo {
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
        font-size: 1.5rem;
        text-decoration: none;
        color: #ffffff;
    }
    nav li {
        margin: 0 1rem;
        width: 5rem;
    }
`;
export const StyledActiveLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    &:hover,
    &.active {
        padding-bottom: 0.25rem;
        border-bottom: 4px solid #95bcf0;
    }
    &.active {
        color: #95bcf0;
    }
`;

export const StyledLogin = styled.li`
    color: white;
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
        color: white;
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
        border-bottom: 4px solid #95bcf0;
    }
    &.active {
        color: #95bcf0;
    }
`;
