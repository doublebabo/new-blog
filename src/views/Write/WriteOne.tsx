import * as React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import remarkGfm from "remark-gfm";
import './WriteOne.scss'
import {Button} from "@material-ui/core";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PublishIcon from '@material-ui/icons/Publish';
import ArticleService from "../../services/ArticleService";
import 'highlight.js/styles/github.css';
import rehypeHighlight from "rehype-highlight";
import {useParams, useSearchParams} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import MySnackbars from "../../components/MySnackbars/MySnackbars";

export default function WriteOne() {
    const [value, setValue] = useState(""); // markdownn内容
    const [name, setName] = useState(""); // 文章名字
    const [category, setCategory] = useState(""); // 文章类别

    const [selectedTab, setSelectedTab] = useState("write");
    const [categories, setCategories] = useState<Array<any>>([]);
    const childRef = useRef();
    let [searchParams, setSearchParams] = useSearchParams();
    let params = useParams();

    const handlerSubmit = () => {
        // @ts-ignore
        // childRef.current.handleClick();
    }

    const getCategories = async () => {
        const {data} = await ArticleService.getCategories();
        setCategories(data.filter((i: any) => i.parentId !== -1))
    }

    useEffect(() => {
        if (params.id) {
            ArticleService.getArticleObj({id: params.id}).then((res: any) => {
                setValue(res.data)
            })
        }
        getCategories();
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

    const onDraft = async (e: any) => {
        e.preventDefault();
        if (!value) return;
        const id = await ArticleService.saveArticleAsDraft({
            content: value,
            author: 'qi-xiao-gu',
            categoryId: category,
            abstract: value.substring(0, 200),
            name: name
        });
    }


    const onPublish = async (e: any) => {
        e.preventDefault();
        // handlerSubmit();
        if (!value) return;
        await ArticleService.publishArticle({
            content: value,
            author: 'qi-xiao-gu',
            categoryId: category,
            abstract: value.substring(0, 200),
            name: name
        });
    }

    const onCategoryChange = (event: React.ChangeEvent<any>) => {
        setCategory(event.target.value)
    }

    const onNameChange = (event: React.ChangeEvent<any>) => {
        setName(event.target.value)
    }



    return (
        <div className="write-one">
            <MySnackbars ref={childRef} type={'warning'} message={'存在必填项未填'}/>
            <form id='form'>
                <div className={'header'}>
                    <FormControl className={"header-item"}>
                        <InputLabel htmlFor="grouped-select">分类</InputLabel>
                        <Select defaultValue="" required id="grouped-select" name={"category"} value={category}
                                onChange={onCategoryChange}>
                            {
                                categories.map(item => (
                                    <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField className={"header-item"}
                               name={"name"}
                               id="standard-textarea"
                               label="标题" required
                               value={name}
                               onChange={onNameChange}
                    />
                    <Button className={"header-item"}
                            size="large"
                            variant="outlined"
                            startIcon={<PublishIcon/>}
                            onClick={onPublish}
                            type="submit"
                            color={"primary"}
                    >
                        发布
                    </Button>
                    <Button className={"header-item"}
                            variant="outlined"
                            size="large"
                            startIcon={<SaveOutlinedIcon/>}
                            onClick={onDraft}
                            type="submit"
                    >
                        存为草稿
                    </Button>
                </div>

                <div className="md-container">
                    <ReactMde
                        value={value}
                        onChange={setValue}
                        selectedTab={selectedTab as any}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown: string) =>
                            Promise.resolve(<ReactMarkdown children={markdown}
                                                           rehypePlugins={[rehypeHighlight]}
                                                           remarkPlugins={[[remarkGfm, {singleTilde: false}]]}/>)
                        }
                        paste={{
                            saveImage: save
                        }}
                    />
                </div>
            </form>
        </div>
    );
}
