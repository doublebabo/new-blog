import React, {useEffect} from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import IndexRoutes from "./routes/IndexRoutes";
import Footer from "./components/Footer/Footer";


function App({hideLoader,showLoader}: {hideLoader: any, showLoader: any}) {
    useEffect(hideLoader,[]);
    return (
        <main>
            <Nav/>
            <IndexRoutes/>
            <Footer/>
        </main>
    );
}

export default App;
