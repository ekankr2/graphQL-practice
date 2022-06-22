import React from 'react';
import Header from "./header";
import Footer from "./footer";

function Layout({children}) {
    return (
        <>
            <Header/>
            <h1>레이아웃</h1>
            <div>{children}</div>
            <Footer/>
        </>
    );
}

export default Layout;