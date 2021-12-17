import React from "react";
import './Footer.scss';
import {Link} from "react-router-dom";

export default function Footer() {

    const onLogoClick = () => {
        sessionStorage.removeItem('cacheViews');
    }

    return (
        <div className={"footer"}>
            <div className={"content"}>
                <div>
                    <p>时间总把最好的人留在最后</p>
                    <p>Email:1436667237@qq.com</p>
                </div>
                <Link to={'/'} onClick={onLogoClick}>
                    <div className={"logo"}>
                        启小谷
                    </div>
                </Link>
            </div>
        </div>
    );
}
