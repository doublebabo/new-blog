import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import {IconButton} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from "react-router-dom";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import './Nav.scss';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import CreateIcon from '@material-ui/icons/Create';
import LoginDialog from "../LoginDialog/LoginDialog";



export default function Nav() {

    const [available, setAvailable] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const loginDialog = useRef<null | any>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                if (!available) {
                    setAvailable(true);
                }
            } else {
                if (available){
                    setAvailable(false);
                }
            }
        })
    })

    const onTopIcon = () => {
        window.scrollTo({top: 0})
    }

    const onLogin = () => {
        setAnchorEl(null);
        loginDialog?.current.loginDialogOpen();
    }

    return (
        <div className={"nav"}>
            <div className={"nav-container"}>
                <Link to={"/home"} className={"logo"}>启小谷</Link>
                <div className={"logo-right"}>
                    <Button className="pc">
                        所有类别
                    </Button>
                    <Link to={'/writeOne'}>
                        <Button className="pc">
                            <CreateIcon/>写文章
                        </Button>
                    </Link>
                    <IconButton className="pc"
                                onClick={onLogin}
                        color="primary">
                        <AccountCircleIcon style={{fontSize: 33}}/>
                    </IconButton>
                    <IconButton
                        onClick={handleClick}
                        color="primary" className="phone">
                        <MenuIcon style={{fontSize: 33}}/>
                    </IconButton>
                </div>
            </div>
            <div onClick={onTopIcon} className={available ? "top-icon-show" : "hide"}>
                <ExpandLessIcon style={{fontSize: 33}}/>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem style={{justifyContent: "center"}} onClick={handleClose}><CloseIcon/></MenuItem>
                <MenuItem style={{justifyContent: "center"}} onClick={handleClose}>
                    <Link to={'/home'}>
                        Home
                    </Link>
                </MenuItem>
                <MenuItem style={{justifyContent: "center"}} onClick={handleClose}>搜索</MenuItem>
                <MenuItem style={{justifyContent: "center"}} onClick={handleClose}>所有类别</MenuItem>
                <MenuItem style={{justifyContent: "center"}} onClick={handleClose}>
                    <Link to={'/writeOne'}>
                        写文章
                    </Link>
                </MenuItem>
                <MenuItem style={{justifyContent: "center"}} onClick={onLogin}>登录</MenuItem>
            </Menu>
            <LoginDialog ref={loginDialog}/>
        </div>
    );
}
