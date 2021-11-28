import React from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import IndexRoutes from "./routes/IndexRoutes";


function App() {
    return (
        <main>
            <Nav/>
            <IndexRoutes/>
        </main>
    );
}

export default App;
