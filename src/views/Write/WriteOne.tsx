import * as React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useEffect, useState} from "react";
import remarkGfm from "remark-gfm";
import './WriteOne.scss'
import {Button} from "@material-ui/core";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PublishIcon from '@material-ui/icons/Publish';
import ArticleService from "../../services/ArticleService";
import 'highlight.js/styles/github.css';
import rehypeHighlight from "rehype-highlight";

export default function WriteOne() {
    const [value, setValue] = useState("");
    const [selectedTab, setSelectedTab] = useState("write");

    useEffect(() => {
        ArticleService.getArticleMd({id: 'React Router 6.md'}).then((res: any) => {
            setValue(res.data)
        })
    }, []);

    const save = async function* (data: any) {
        // Promise that waits for "time" milliseconds
        const wait = function (time: any) {
            return new Promise((a: any, r) => {
                setTimeout(() => a(), time);
            });
        };

        // Upload "data" to your server
        // Use XMLHttpRequest.send to send a FormData object containing
        // "data"
        // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

        await wait(2000);
        // yields the URL that should be inserted in the markdown
        yield "https://picsum.photos/300";
        await wait(2000);

        // returns true meaning that the save was successful
        return false;
    };
    const onDraft = () => {
        console.log(value)
    }

    const onPublish = () => {
        console.log(value)
    }

    return (
        <div className="write-one">
            <div className="operation">
                <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    startIcon={<SaveOutlinedIcon />}
                    onClick={onDraft}
                >
                    存为草稿
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<PublishIcon />}
                    onClick={onPublish}
                >
                    发布
                </Button>
            </div>
            <div className="md-container">
                <ReactMde
                    value={value}
                    onChange={setValue}
                    selectedTab={selectedTab as any}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(markdown:string) =>
                        Promise.resolve(<ReactMarkdown children={markdown}
                                                       rehypePlugins={[rehypeHighlight]}
                                                       remarkPlugins={[[remarkGfm, {singleTilde: false}]]} />)
                    }
                    paste={{
                        saveImage: save
                    }}
                />
            </div>
        </div>
    );
}
