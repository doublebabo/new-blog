import * as React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import remarkGfm from "remark-gfm";
import './WriteOne.scss'
import {Button, SelectChangeEvent} from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PublishIcon from '@mui/icons-material/Publish';
import ArticleService from "../../services/ArticleService";
import 'highlight.js/styles/github.css';
import rehypeHighlight from "rehype-highlight";
import {useParams, useSearchParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {mySnackbarsMessage} from "../../components/MySnackbars/MySnackbars";

export default function WriteOne() {
    const [value, setValue] = useState(""); // markdownn内容
    const [name, setName] = useState(""); // 文章名字
    const [category, setCategory] = useState(""); // 文章类别

    const [selectedTab, setSelectedTab] = useState("write");
    const [categories, setCategories] = useState<Array<any>>([]);
    // const childRef = useRef();
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
                setValue(res.data.content)
                setName(res.data.name)
                setCategory(res.data.categoryId)
                window.scrollTo({top: 0})
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
        if (!value || !category || !name) {
            mySnackbarsMessage.current.message('warning', '空的地方都要填哦(⊙o⊙)');
            return;
        }
        if (params.id) {
            // todo
        } else {
            const id = await ArticleService.saveArticleAsDraft({
                content: value,
                author: 'qi-xiao-gu',
                categoryId: category,
                abstract: value.substring(0, 200),
                name: name
            });
        }
    }


    const onPublish = async (e: any) => {
        if (!value || !category || !name) {
            mySnackbarsMessage.current.message('warning', '空的地方都要填哦(⊙o⊙)');
            return;
        }
        e.preventDefault();
        if (params.id) {
            // todo
        } else {
            await ArticleService.publishArticle({
                content: value,
                author: 'qi-xiao-gu',
                categoryId: category,
                abstract: value.substring(0, 200),
                name: name
            });
        }

    }

    const onCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value)
    }

    const onNameChange = (event: React.ChangeEvent<any>) => {
        setName(event.target.value)
    }



    return (
        <div className="write-one">
            <form id='form'>
                <div className={'header'}>
                    <FormControl  variant="standard" className={"header-item"}>
                        <InputLabel>分类</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={category}
                            onChange={onCategoryChange}
                        >
                            {
                                categories.map(item => (
                                    <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField  variant="standard" id="outlined-basic" label="标题" className={"header-item"} value={name}
                               onChange={onNameChange}/>
                    <Button className={"header-item"}
                            size="large"
                            variant="contained"
                            startIcon={<PublishIcon/>}
                            onClick={onPublish}
                            color={"success"}
                    >
                        发布
                    </Button>
                    <Button className={"header-item"}
                            size="large"
                            variant="contained"
                            startIcon={<SaveOutlinedIcon/>}
                            onClick={onDraft}
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
