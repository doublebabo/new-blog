import * as React from "react";
import './Index.scss';
import {Link} from "react-router-dom";

export default function Index() {

    return (
        <div className="page-index">
            <h1>
                <span>春风得意马蹄疾</span>
                <span>一日看尽长安花</span>
            </h1>
            <Link to={"home"}>
                <h2>进入博客</h2>
            </Link>
        </div>
    );
}
