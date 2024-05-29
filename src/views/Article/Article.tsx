import React, {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown';
import './Article.scss';
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css';
import ArticleService from "../../services/ArticleService";
import {useParams} from "react-router-dom";
import {dateFormat} from "../../utils/tools";

export default function Article() {
    let params = useParams();
    let [md, setMd] = useState<any>({});

    useEffect(() => {
        window.scrollTo({top: 0})
        ArticleService.getArticleObj({id: params.id}).then((res: any) => {
            const {content, name, author, createTime} = res.data;
            setMd({
                content: content || 'NOTHING',
                name: name,
                author: author,
                createTime: createTime,
            });
        })
    }, [params]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        Array.from(document.images).forEach((img: any) => {
            img.addEventListener('click', function () {
                let myModal = document.getElementById("myModal");
                let myModalImg = document.getElementById("myModalImg");
                let myModalClose = document.getElementsByClassName("myModalClose")[0];
                window.onclick = function(event) {
                    if (event.target === myModal) {
                        // @ts-ignore
                        myModal.style.display = "none";
                    }
                }
                // @ts-ignore
                myModalClose.onclick = function() {
                    // @ts-ignore
                    myModal.style.display = "none";
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                // @ts-ignore
                myModal.style.display = "block";
                // @ts-ignore
                myModalImg.src = this.src;
            })
        });
    }, [md]);

    return (
        <div className={"article"}>
            {md.content ? (
                <div className="md-content">
                    <div className={'md-title'}>{md.name}</div>
                    <div className={'md-author'}>
{/*                         <span>{dateFormat(md.createTime)}</span> */}
                        By <span>{md.author}</span></div>
                    <ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
                                   children={md.content}
                                   rehypePlugins={[rehypeHighlight]}/>
                </div>
            ) : <div className="md-loading">Loading.....</div>}
            <div id="myModal" className="modal">
                <span className="myModalClose">&times;</span>
                <img className="modal-content" alt="img" id="myModalImg"/>
            </div>
        </div>
    );
};
