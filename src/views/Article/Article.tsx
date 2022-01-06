import React, {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown';
import './Article.scss';
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css';
import ArticleService from "../../services/ArticleService";
import {useParams} from "react-router-dom";
import {dateFormat} from "../../utils/tools";

export default function Article() {
    let params = useParams();
    let [md, setMd] = useState<any>({});

    useEffect(() => {
        ArticleService.getArticleObj({id: params.id}).then((res: any) => {
            const {content, name, author, createTime} = res.data;
            setMd({
                content: content ||'NOTHING',
                name: name,
                author: author,
                createTime: createTime,
            })
        })
    }, [params]);

    return (
        <div className={"article"}>
            {md.content ? (
                <div className="md-content">
                    <div className={'md-title'}>{md.name}</div>
                    <div className={'md-author'}><span>{dateFormat(md.createTime)}</span> By <span>{md.author}</span></div>
                    <ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
                                   children={md.content}
                                   rehypePlugins={[rehypeHighlight]}/>
                </div>
            ) : <div className="md-loading">Loading.....</div>}
        </div>
    );
};
