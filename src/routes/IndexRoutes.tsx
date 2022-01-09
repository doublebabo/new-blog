import React from 'react';
import {Route, Routes, useInRouterContext} from 'react-router-dom';
import NotFound from "../views/404/NotFound";
import App from "../App";
import Index from "../views/Index/Index";
const Login = React.lazy(() => import("../views/Login/Login"));
const Home = React.lazy(() => import("../views/Home/Home"));
const WriteOne = React.lazy(() => import("../views/Write/WriteOne"));
const Article = React.lazy(() => import("../views/Article/Article"));

export default function IndexRoutes() {
    useInRouterContext();
    const loader = document.querySelector('#load');
    const showLoader = () => {
        loader && loader.classList.remove('loader--hide')
    };

    const hideLoader = () => {
        loader && loader.classList.add('loader--hide');
    };
    return (
        <Routes>
            <Route path="/" element={<App hideLoader={hideLoader} showLoader={showLoader}/>}>
                <Route index element={
                    <Index/>
                }/>
                <Route path="home" element={
                    <React.Suspense fallback={<>...</>}>
                        <Home/>
                    </React.Suspense>
                }/>
                <Route path="login" element={
                    <React.Suspense fallback={<>...</>}>
                        <Login/>
                    </React.Suspense>
                }/>
                <Route path="article/:id" element={
                    <React.Suspense fallback={<>...</>}>
                        <Article/>
                    </React.Suspense>
                }/>
                <Route path="writeOne" element={
                    <React.Suspense fallback={<>...</>}>
                        <WriteOne/>
                    </React.Suspense>
                }>
                    <Route
                        index
                        element={
                            <React.Suspense fallback={<>...</>}>
                                <WriteOne/>
                            </React.Suspense>}
                    />
                    <Route path=":id" element={
                        <React.Suspense fallback={<>...</>}>
                            <WriteOne/>
                        </React.Suspense>
                    }/>
                </Route>

                <Route
                    path="*"
                    element={<NotFound/>}
                />
            </Route>
        </Routes>
    );
}
