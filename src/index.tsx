import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

const loader = document.querySelector('#load');

// if you want to show the loader when React loads data again
const showLoader = () => {
    loader && loader.classList.remove('loader--hide')
};

const hideLoader = () => {
    loader && loader.classList.add('loader--hide');
};

setTimeout(() => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App
                    hideLoader={hideLoader}
                    showLoader={showLoader}/>
            </BrowserRouter>
        </React.StrictMode>
        ,
        document.getElementById('root'))
}, 1800);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
