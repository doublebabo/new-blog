import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import MySnackbars from "./components/MySnackbars/MySnackbars";
import {Outlet} from "react-router-dom";
import GlobalLoginDialog from "./components/LoginDialog/LoginDialog";
import MyChattingRoom from "./components/ChatingRoom/ChattingRoom";


export const ScrollDirectionContext = createContext('down');

function App({hideLoader}: {hideLoader: any, showLoader?: any}) {
    const [scrollDirection, setScrollDirection] = useState('down');
    useEffect(() => {
        const threshold = 170; // 移动偏移量，在一定范围内的滚动不会触发事件
        let lastScrollY = window.pageYOffset || window.scrollY;

        const onScroll = () => {
            const currentScrollY = window.pageYOffset || window.scrollY;
            if (Math.abs(currentScrollY - lastScrollY) < threshold) {
                return;
            }
            const currentDirection = currentScrollY > lastScrollY ? 'up' : 'down';
            if (currentDirection === scrollDirection) {
                lastScrollY = currentScrollY;
                return;
            }
            setScrollDirection(currentDirection); // up：页面网上滚动
            lastScrollY = currentScrollY;
        }
        window.addEventListener('scroll',onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll)
        };
    },[scrollDirection])

    useEffect(hideLoader,[]);
    return (
        <main>
            <ScrollDirectionContext.Provider value={scrollDirection}>
                <div style={{marginTop: '4rem', flex: '1', display:'flex', flexDirection: 'column'}}>
                    <Nav/>
                    <Outlet />
                    <Footer/>
                    <MySnackbars/>
                    <GlobalLoginDialog/>
                    <MyChattingRoom/>
                </div>
            </ScrollDirectionContext.Provider>
        </main>
    );
}

export default App;
