import React, {useEffect, useState} from "react";
import './Home.scss';
import {Link} from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Button} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import ArticleService from "../../services/ArticleService";
import {throttle} from "../../decorators/decorator";
import MyButton from "../../components/MyButton/MyButton";

interface ArticleModel {
    id: number,
    name: string,
    author: string,
    clicks: number,
    create_time: string,
    abstract: string,
    comment_counts: number
}

interface HomeState {
    list: Array<ArticleModel>
}

export default class Home2 extends React.Component<any, HomeState>{
    constructor(props: any) {
        super(props);
        this.state = {
            list: []
        };
    }

    queryObj = {
        pageIndex: 1,
        pageSize: 10
    }

    noDataAnyMore: boolean = false;
    dateFormat(s: string) {
        const date = new Date(s)
        return date.getFullYear() + '-' + (date.getMonth() + 1) +'-'+ date.getDate();
    }

    componentDidMount() {
        this.getArticles();
        this.listenScroll();
    }

    @throttle(1000)
    getArticles() {
        if (this.noDataAnyMore) return;
        ArticleService.getArticles(this.queryObj).then((res: any) => {
            if (!res.data.length) {
                this.noDataAnyMore = true;
            }
            this.setState({
                list: this.state.list.concat(res.data)
            });
            this.queryObj.pageIndex = this.queryObj.pageIndex + 1;
        })
    }

    listenScroll() {
        window.onscroll = () => {
            if (document.documentElement.offsetHeight - (window.screen.height + window.scrollY) <= 300) {
                this.getArticles();
            }
        }
    }

    render() {
        return (
            <div className={"home"}>
                <div className={'home-l'}>
                    {
                        this.state.list.map(item => (
                            <Link to={`/article/${item.id}`} className={"art-card"} key={item.id}>
                                <div className={"art-title"}>{item.name}</div>
                                <div className={"art-abstract"}>{item.abstract}</div>
                                <div className={"art-bottom"}>
                                    <Button
                                        size="small"
                                        className={"art-bottom-item read"}
                                        startIcon={<VisibilityIcon />}
                                    >
                                        {item.clicks}
                                    </Button>
                                    {/*<Button*/}
                                    {/*    size="small"*/}
                                    {/*    className={"art-bottom-item time"}*/}
                                    {/*    startIcon={<AccessTimeIcon />}*/}
                                    {/*>*/}
                                    {/*    {this.dateFormat(item.create_time)}*/}
                                    {/*</Button>*/}
                                    <Button
                                        size="small"
                                        className={"art-bottom-item comments"}
                                        startIcon={<ModeCommentIcon />}
                                    >
                                        {item.comment_counts || 0}
                                    </Button>
                                    {/*<Button*/}
                                    {/*    variant="outlined"*/}
                                    {/*    size="small"*/}
                                    {/*    className={"art-bottom-item tag"}*/}
                                    {/*>*/}
                                    {/*    {item.tag}*/}
                                    {/*</Button>*/}
                                </div>
                            </Link>
                        ))
                    }
                </div>
                {/*<div className="home-r">*/}
                {/*    <Link to={'/writeOne'}>*/}
                {/*        <MyButton name={'写文章'}>*/}
                {/*        </MyButton>*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </div>
        )
    }
}

// export function Home() {
//     let [list, setList] = useState<ArticleModel[]>([]);
//     let articleService = new ArticleService();
//
//     let [query, setQuery] = useState<any>({
//         pageIndex: 1,
//         pageSize: 10
//     });
//
//     // document.
//
//
//     useEffect(() => {
//         window.onscroll = () => {
//             if (document.documentElement.offsetHeight - (document.documentElement.clientHeight + window.scrollY) <= 20) {
//                 loadingMoreArticles();
//             }
//         }
//         articleService.getArticles(query).then((res: any) => {
//             console.log(list.concat(res.data))
//             setList([...list,...res.data]);
//         })
//     }, [query]);
//
//     // @throttle(1000)
//     function loadingMoreArticles() {
//         setQuery({
//             pageIndex: query.pageIndex + 1,
//             pageSize: query.pageSize
//         })
//     }
//
//     function dateFormat(s: string) {
//         const date = new Date(s)
//         return date.getFullYear() + '-' + (date.getMonth() + 1) +'-'+ date.getDate();
//     }
//
//     return (
//         <div className={"home"}>
//             <div className={'home-l'}>
//                 {
//                     list.map(item => (
//                         <Link to={`/article/${item.id}`} className={"art-card"} key={item.id}>
//                             <div className={"art-title"}>{item.name}</div>
//                             <div className={"art-abstract"}>{item.abstract}</div>
//                             <div className={"art-bottom"}>
//                                 <Button
//                                     size="small"
//                                     className={"art-bottom-item read"}
//                                     startIcon={<VisibilityIcon />}
//                                 >
//                                     {item.clicks}
//                                 </Button>
//                                 <Button
//                                     size="small"
//                                     className={"art-bottom-item time"}
//                                     startIcon={<AccessTimeIcon />}
//                                 >
//                                     {dateFormat(item.create_time)}
//                                 </Button>
//                                 <Button
//                                     size="small"
//                                     className={"art-bottom-item comments"}
//                                     startIcon={<ModeCommentIcon />}
//                                 >
//                                     {item.comment_counts || 0}
//                                 </Button>
//                                 {/*<Button*/}
//                                 {/*    variant="outlined"*/}
//                                 {/*    size="small"*/}
//                                 {/*    className={"art-bottom-item tag"}*/}
//                                 {/*>*/}
//                                 {/*    {item.tag}*/}
//                                 {/*</Button>*/}
//                             </div>
//                         </Link>
//                     ))
//                 }
//             </div>
//             <div className="home-r">
//                 <Link to={'/writeOne'}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         size="large"
//                         className="home-r-add"
//                         startIcon={<CreateIcon />}
//                     >
//                         写文章
//                     </Button>
//                 </Link>
//
//             </div>
//         </div>
//     );
// }
