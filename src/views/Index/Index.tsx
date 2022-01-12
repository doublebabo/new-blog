import * as React from "react";
import './Index.scss';
import {Link} from "react-router-dom";

export default function Index() {

    return (
        <div className="page-index">
            <h1>
                <span>出不入兮往不反</span>
                <span>平原忽兮路超远</span>
            </h1>
            <Link to={"home"}>
                <h2>进入博客</h2>
            </Link>
        </div>
    );
}
