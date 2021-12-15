import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import {IconButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './Nav.scss';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CreateIcon from '@mui/icons-material/Create';
import LoginDialog from "../LoginDialog/LoginDialog";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Popover from "@mui/material/Popover";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
export default function Nav() {

    const [available, setAvailable] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const loginDialog = useRef<null | any>(null);
    const [loginStatus, setLoginStatus] = useState({t: localStorage.getItem('t'), username: ''})
    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const location = useLocation();
    const params = useParams();
    const navigateFunction = useNavigate();

    const isArticlePage = location.pathname && location.pathname.startsWith('/article/');
    useEffect(() => {
        onScrollFn();
    })

    const onScrollFn = () => {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                if (!available) {
                    setAvailable(true);
                }
            } else {
                if (available) {
                    setAvailable(false);
                }
            }
        })
    }

    const onTopIcon = () => {
        window.scrollTo({top: 0})
    }

    const onModifyArticle = () => {
        navigateFunction("/writeOne/" + params.id);
    }

    const onLogin = async () => {
        setAnchorEl(null);
        loginDialog?.current.loginDialogOpen();
    }

    const onLogout = () => {
        setAnchorEl(null);
        localStorage.removeItem('t');
        window.location.reload();
    }

    const handleProfileMenuClose = () => {
        setProfileMenuAnchorEl(null);
    }
    const handleProfileMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProfileMenuAnchorEl(event.currentTarget);
    };

    const handleMbClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMbClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={"nav"}>
            <div className={"nav-container"}>
                <Link to={"/"} className={"logo"}>启小谷</Link>
                <div className={"logo-right"}>
                    <Link to={'/writeOne'}>
                        <Button color={'secondary'} className="pc">
                            <CreateIcon/>写文章
                        </Button>
                    </Link>
                    {loginStatus.t ?
                        (<Button className="pc"  aria-owns={Boolean(profileMenuAnchorEl) ? 'profile-menu' : undefined} onClick={handleProfileMenuClick}>
                            <span style={{fontSize:"1rem", color: "#333"}}>{loginStatus.username || 'anonymous'}</span><ArrowDropDownIcon color={"inherit"} fontSize={"medium"}/>
                        </Button>)
                        : (<Button onClick={onLogin} color={'inherit'} className="pc">
                            <AccountCircleIcon/>登录
                        </Button>)}
                    {/*手机图标*/}
                    <IconButton
                        onClick={handleMbClick}
                         className="phone">
                        {Boolean(anchorEl) ? <CloseIcon style={{fontSize: 33}}/> : <MenuIcon style={{fontSize: 33}}/>}
                    </IconButton>
                </div>
            </div>

            <Menu
                id="mb-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMbClose}
            >
                <MenuItem style={{justifyContent: "center"}} onClick={handleMbClose}>
                    <Link to={'/'}>
                        <HomeIcon/>
                    </Link>
                </MenuItem>
                <MenuItem style={{justifyContent: "center"}} onClick={handleMbClose}>
                    <SearchIcon/>
                </MenuItem>
                <MenuItem style={{justifyContent: "center"}} onClick={handleMbClose}>所有类别</MenuItem>
                <MenuItem style={{justifyContent: "center"}} onClick={handleMbClose}>
                    <Link to={'/writeOne'}>
                        写文章
                    </Link>
                </MenuItem>
                {loginStatus.t ? <MenuItem style={{justifyContent: "center"}} onClick={onLogout}>登出</MenuItem> :
                    <MenuItem style={{justifyContent: "center"}} onClick={onLogin}>登录</MenuItem>}
            </Menu>

            <div  className={"top-icon-show"}>
                {available && <ExpandLessIcon onClick={onTopIcon} className={'float-icon'} fontSize={"medium"}/>}
                {isArticlePage && <EditIcon onClick={onModifyArticle} className={'float-icon'} fontSize={"medium"} />}
            </div>



            <LoginDialog ref={loginDialog}/>

            <Popover
                id="profile-menu"
                open={Boolean(profileMenuAnchorEl)}
                anchorEl={profileMenuAnchorEl}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {loginStatus.t ? <MenuItem style={{justifyContent: "center"}} onClick={onLogout}>登出</MenuItem> :
                    <MenuItem style={{justifyContent: "center"}} onClick={onLogin}>登录</MenuItem>}
            </Popover>
        </div>
    );
}
