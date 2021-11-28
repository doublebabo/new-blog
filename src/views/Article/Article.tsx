import React, {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown';
import './Article.scss';
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css';
import ArticleService from "../../services/ArticleService";
import {useParams} from "react-router-dom";
export default function Article() {
    let params = useParams();
    let [md, setMd] = useState("Loading......");

    useEffect(() => {
        ArticleService.getArticleMd({id: 'React Router 6.md'}).then((res: any) => {
            setMd(res.data)
        })
    }, []);

    return (
        <div className={"article"}>
            <div className="md-content">
                <ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
                               children={md}
                               rehypePlugins={[rehypeHighlight]}/>
            </div>
        </div>
    );
};
