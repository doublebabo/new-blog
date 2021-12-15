import React from 'react';
import {MemoryRouter, Route, Routes, useInRouterContext} from 'react-router-dom';
import NotFound from "../views/404/NotFound";
import App from "../App";

const Login = React.lazy(() => import("../views/Login/Login"));
const Home = React.lazy(() => import("../views/Home/Home"));
const WriteOne = React.lazy(() => import("../views/Write/WriteOne"));
const Article = React.lazy(() => import("../views/Article/Article"));
const loader = document.querySelector('#load');



export default function IndexRoutes() {
    useInRouterContext();
    const renderChildren = (props: any) => {
        const {match} = props;
        return (
            <div style={match ? {} : {position: 'absolute', zIndex: -10}}>
                {/*// 如果匹配到了就直接渲染出来，如果没有匹配到，就直接隐藏掉该组件，但是此时组件是不会销毁的，这样就能保证在返回后页面状态的保留*/}
                {/*<Component /> // 这个就是该路由下对应的组件*/}
            </div>
        )
    }
    // if you want to show the loader when React loads data again
    const showLoader = () => {
        loader && loader.classList.remove('loader--hide')
    };

    const hideLoader = () => {
        loader && loader.classList.add('loader--hide');
    };
    return (
        <Routes>
            <Route path="/" element={<App hideLoader={hideLoader} showLoader={showLoader}/>}>
                {/*<Route index element={*/}
                {/*    <React.Suspense fallback={<>...</>}>*/}
                {/*        <Home/>*/}
                {/*    </React.Suspense>*/}
                {/*}/>*/}
                <Route index element={
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
