import React from 'react';
import {Route, Routes} from 'react-router-dom';
// import Home from "../views/Home/Home";
import NotFound from "../views/404/NotFound";
import Article from "../views/Article/Article";
import WriteOne from "../views/Write/WriteOne";

const Login = React.lazy(() => import("../views/Login/Login"));
const Home = React.lazy(() => import("../views/Home/Home"));

export default function IndexRoutes() {
    return (
        <Routes>
            <Route path="/home" element={
                <React.Suspense fallback={<>...</>}>
                    <Home/>
                </React.Suspense>
            }/>
            <Route path="/login" element={
                <React.Suspense fallback={<>...</>}>
                    <Login/>
                </React.Suspense>
            }/>
            <Route path="/article/:id" element={
                <Article/>
            }/>
            <Route path="/writeOne" element={
                <WriteOne/>
            }/>
            <Route
                path="*"
                element={<NotFound/>}
            />
        </Routes>
    );
}
