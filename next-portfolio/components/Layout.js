import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

function Layout({children}) {
    return (
        <div className="bg-primary">
            <Header/>
            <div>{children}</div>
            <Footer/>
        </div>
    );
}

export default Layout;