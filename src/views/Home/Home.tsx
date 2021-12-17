import React, {useEffect, useState} from "react";
import './Home.scss';
import {Link} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Button} from "@mui/material";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ArticleService from "../../services/ArticleService";
import {throttle} from "../../decorators/decorator";
import FaceIcon from '@mui/icons-material/Face';
import StarsIcon from '@mui/icons-material/Stars';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import {mySnackbarsMessage} from "../../components/MySnackbars/MySnackbars";

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
    categories: Array<any>,
    activeTag: string,
    websiteLatestComments: Array<any>,
    recommendArticles: Array<any>,
    open: boolean,
    comment: string,
}

export default class Home2 extends React.Component<any, HomeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: [],
            categories: [],
            activeTag: "全部",
            websiteLatestComments: [],
            recommendArticles: [],
            open: false,
            comment: '听君一席话 如听一席话'
        };
    }

    queryObj = {
        pageIndex: 1,
        pageSize: 10,
        categoryId: ''
    }

    noDataAnyMore: boolean = false;
    loadingData: boolean = false;


    async componentDidMount() {
        const categoriesData = ArticleService.getCategories();
        const recommendArticlesData = ArticleService.getRecommendArticles();
        const websiteLatestCommentsData = ArticleService.getWebsiteLatestComments();
        this.listenScroll();
        this.setState(
            {
                categories: [{
                    id: '',
                    name: '全部'
                }].concat((await categoriesData).data?.filter((item: any) => item.parentId !== -1) || []),
                recommendArticles: (await recommendArticlesData).data || [],
                websiteLatestComments: (await websiteLatestCommentsData).data || [],
            }
        )
        const cacheViews = sessionStorage.getItem('cacheViews')
        if (cacheViews) {
            const data: any = JSON.parse(cacheViews)
            sessionStorage.removeItem('cacheViews');
            this.queryObj = {...this.queryObj, ...data.queryObj};
            this.setState(
                {
                    list: data.list,
                    activeTag: data.activeTag,
                }
            )
            window.scrollTo({top: data.scrollTop});
        } else {
            const listData = ArticleService.getArticles(this.queryObj);
            this.queryObj.pageIndex++;
            this.setState(
                {
                    list: (await listData).data || [],
                }
            )
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    @throttle(500)
    async getArticles(reset = false) {
        this.loadingData = true;
        const {data} = await ArticleService.getArticles(this.queryObj);
        this.loadingData = false;
        this.noDataAnyMore = !data.length;
        this.queryObj.pageIndex = this.queryObj.pageIndex + 1;
        this.setState({
            list: reset ? data : this.state.list.concat(data)
        });
    }

    listenScroll() {
        window.addEventListener('scroll', () => {
            if (document.documentElement.offsetHeight - (window.screen.height + window.scrollY) <= 300) {
                if (this.noDataAnyMore || this.loadingData) return;
                this.getArticles();
            }
        })
    }

    @throttle(500)
    onClickNavTag(e: any) {
        if (this.loadingData) return
        this.setState({
            activeTag: e.name,
            // categories: this.state.categories.filter(i => i.id === e.id).concat(this.state.categories.filter(i => i.id != e.id))
        });
        this.queryObj.categoryId = e.id || '';
        this.queryObj.pageIndex = 1;
        window.scrollTo({top: 0})
        this.getArticles(true);
    }


    handleCommentDialogOpen = () => {
        this.setState({
            comment: '君问归期未有期'
        })
        this.setState({open: true})
    }

    handleCommentDialogClose = () => {
        this.setState({open: false})
    }

    onLeaveComment = async () => {
        if (!this.state.comment) return
        await ArticleService.addNewWebsiteComment({
            username: 'Nobody',
            message: this.state.comment,
        });
        mySnackbarsMessage.current.message('success', '哔哔成功！')
        this.handleCommentDialogClose();
        this.setState({
            websiteLatestComments: (await ArticleService.getWebsiteLatestComments()).data || [],
        })
    }

    onCommentChange = (e: any) => {
        this.setState({
            comment: e.target.value
        })
    }

    onclickArticle = () => {
        sessionStorage.setItem('cacheViews', JSON.stringify({
            list: this.state.list,
            activeTag: this.state.activeTag,
            scrollTop: window.scrollY,
            queryObj: this.queryObj
        }));
    }

    loadMore = () => {
        if (this.noDataAnyMore || this.loadingData) return;
        this.getArticles();
    }


    render() {
        // @ts-ignore
        return (
            <div className={"home-outer"}>
                <div className={"home"}>
                    <div className="nav-tags">
                        {
                            this.state.categories.map((item: any) => (
                                <div onClick={() => this.onClickNavTag({id: item.id, name: item.name})}
                                     className={this.state.activeTag === item.name ? 'nav-tag active' : 'nav-tag'}
                                     key={item.id}>
                                    {`${item.name}`}
                                </div>
                            ))
                        }
                    </div>
                    <div className={'home-l'}>
                        {
                            !this.state.list.length ? (<div className="no-data">
                                {`暂无${this.state.activeTag}内容`}
                            </div>) : this.state.list.map(item => (
                                <Link target={'_blank'} to={`/article/${item.id}`} onClick={this.onclickArticle} className={"art-card"}
                                      key={item.id}>
                                    <div className={"art-title"}>{item.name}</div>
                                    <div className={"art-abstract"}>{item.abstract}</div>
                                    <div className={"art-bottom"}>
                                        <Button
                                            size="small"
                                            className={"art-bottom-item read"}
                                            startIcon={<VisibilityIcon color={"action"}/>}
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
                                            startIcon={<ModeCommentIcon color={"action"}/>}
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
                        <div className={"more-btn"} onClick={this.loadMore}>
                            <hr/>
                            {this.loadingData ? '用命加载中'
                                : this.noDataAnyMore ? '一滴都没有了┭┮﹏┭┮' : '(●ˇ∀ˇ●)点我加载更多'}
                        </div>

                    </div>
                    <div className={'home-r'}>
                        <div className={"r-card"}>
                            <div className={"r-card-title"}>推荐使用</div>
                            {
                                !this.state.recommendArticles.length ? '暂无推荐' : (
                                    this.state.recommendArticles.map((item: any) => (
                                        <Link key={item.id} target={'_blank'} to={`/Article/${item.id}`} className={'r-card-content'}>
                                            <StarsIcon/>
                                            <div className={"r-card-content-msg"}>{item.name}</div>
                                        </Link>
                                    ))
                                )
                            }
                        </div>
                        <div className={"r-card-btn"} onClick={this.handleCommentDialogOpen}>
                            <div className={"r-card-btn-title"}>我要口吐芬芳</div>
                            <ChildCareIcon fontSize={'large'}/>
                        </div>
                        <div className={"r-card"}>
                            <div className={"r-card-title"}>哔哔区</div>
                            {
                                !this.state.websiteLatestComments.length ? '暂无哔哔' : (
                                    this.state.websiteLatestComments.map((item: any) => (
                                        <Link key={item.id} className={'r-card-msg'} to={"#"}>
                                            <FaceIcon/>
                                            <div className={'long-msg'} title={item.message}>
                                                <span>{item.username}</span>
                                                <span
                                                    style={{color: '#ff5722'}}> From </span> {item.ip || 'nowhere'} ：
                                                <div className={'long-msg-content'}>{item.message}</div>
                                            </div>
                                        </Link>
                                    ))
                                )
                            }
                        </div>
                        <div className={"r-card"}>
                            <div className={"r-card-title"}>骚扰方式!</div>
                            <div className={'r-card-content'}>Email：1436667237@qq.com</div>
                            <div className={'r-card-content'}>WeChat：wp143666</div>
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.open} onClose={this.handleCommentDialogClose}
                        aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="留言"
                            multiline
                            rows={4}
                            variant="outlined"
                            style={{minWidth: '500px'}}
                            value={this.state.comment}
                            onChange={this.onCommentChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCommentDialogClose} color="primary">
                            下次一定
                        </Button>
                        <Button onClick={this.onLeaveComment} color="primary">
                            提交留言
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
