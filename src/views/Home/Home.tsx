import React from "react";
import './Home.scss';
import {Link} from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Button} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import CreateIcon from '@material-ui/icons/Create';
export default function Home() {
    const list = new Array(20).fill(0).map(i => ({
        time: ('time'+ Math.random() * 100).slice(0,10),
        read: Math.random() * 100,
        title: ('title'+ Math.random() * 100).slice(0,10),
        abstract: ('abstract'+ Math.random() * 100).slice(0,10),
        tag: ('tag'+ Math.random() * 100).slice(0,10),
        comments: Math.random() * 100,
    }))

    return (
        <div className={"home"}>
            <div className={'home-l'}>
                {
                    list.map(item => (
                        <Link to={`/article/${item.time}`} className={"art-card"} key={item.read}>
                            <div className={"art-title"}>{item?.title || 'title'}</div>
                            <div className={"art-abstract"}>{item?.abstract.substring(0,200) || 'abstract'}</div>
                            <div className={"art-bottom"}>
                                <Button
                                    color="primary"
                                    size="small"
                                    className={"art-bottom-item read"}
                                    startIcon={<VisibilityIcon />}
                                >
                                    {+String(item.read*1000).substring(0,6)}
                                </Button>
                                <Button
                                    color="primary"
                                    size="small"
                                    className={"art-bottom-item time"}
                                    startIcon={<AccessTimeIcon />}
                                >
                                    2021/1/2
                                </Button>
                                <Button
                                    color="primary"
                                    size="small"
                                    className={"art-bottom-item comments"}
                                    startIcon={<ModeCommentIcon />}
                                >
                                    {item.comments}
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={"art-bottom-item tag"}
                                >
                                    {item.tag}
                                </Button>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <div className="home-r">
                <Link to={'/writeOne'}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className="home-r-add"
                        startIcon={<CreateIcon />}
                    >
                        写文章
                    </Button>
                </Link>

            </div>
        </div>
    );
}
