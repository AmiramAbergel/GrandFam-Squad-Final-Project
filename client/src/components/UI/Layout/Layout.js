import React from 'react';
import NavBar from '../NavBar/NavBar.js';
const Layout = (props) => {
    return (
        <>
            <NavBar />
            <main>{props.children}</main>
        </>
    );
};

export default Layout;
