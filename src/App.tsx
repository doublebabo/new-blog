import React, {useEffect} from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import MySnackbars from "./components/MySnackbars/MySnackbars";
import {Outlet} from "react-router-dom";
import GlobalLoginDialog from "./components/LoginDialog/LoginDialog";


function App({hideLoader,showLoader}: {hideLoader: any, showLoader: any}) {
    useEffect(hideLoader,[]);
    return (
        <main>
            <Nav/>
            <Outlet />
            <Footer/>
            <MySnackbars/>
            <GlobalLoginDialog/>
        </main>
    );
}

export default App;
