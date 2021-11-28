import React, {useState} from "react";
import {IconButton} from "@material-ui/core";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import {Link} from "react-router-dom";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import './Nav.scss';

export default function Nav() {

    const [available, setAvailable] = useState(false);

    window.onscroll = function () {
        if (window.scrollY > document.documentElement.clientHeight) {
            if (!available) {
                setAvailable(true);
            }
        } else {
            if (available){
                setAvailable(false);
            }
        }
    }

    const onTopIcon = () => {
        window.scrollTo({top: 0})
    }

    return (
        <div className={"nav"}>
            <div className={"nav-container"}>
                <Link to={"/home"} className={"logo"}>启小谷</Link>
                <div className={"logo-right"}>
                    <div className={"search-box"}>
                        <InputBase className={"search-box-input"} placeholder="Search" />
                        <IconButton type="submit">
                            <SearchIcon/>
                        </IconButton>
                    </div>
                    <IconButton className="msg" color="primary">
                        <NotificationsNoneIcon style={{fontSize: 33}}/>
                    </IconButton>
                    <IconButton
                        color="primary">
                        <AccountCircleIcon style={{fontSize: 33}}/>
                    </IconButton>
                </div>
            </div>
            <IconButton onClick={onTopIcon} color="primary" className={available ? "top-icon-show" : "hide"}>
                <ArrowUpwardIcon style={{fontSize: '4rem'}}/>
            </IconButton>
        </div>
    );
}
