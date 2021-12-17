import * as React from "react";
import ReactMde, {L18n} from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import remarkGfm from "remark-gfm";
import './WriteOne.scss'
import {Button, SelectChangeEvent} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import 'highlight.js/styles/github.css';
import rehypeHighlight from "rehype-highlight";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {mySnackbarsMessage} from "../../components/MySnackbars/MySnackbars";
import ArticleService from "../../services/ArticleService";

export default function WriteOne() {
    const [value, setValue] = useState(""); // markdownn内容
    const [name, setName] = useState(""); // 文章名字
    const [category, setCategory] = useState(""); // 文章类别
    const [selectedTab, setSelectedTab] = useState("write");
    const [categories, setCategories] = useState<Array<any>>([]);
    let [searchParams, setSearchParams] = useSearchParams();
    const navigateFunction = useNavigate();
    let params = useParams();

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
        } else {
            setValue('')
            setName('')
            setCategory('')
        }
        getCategories();
    }, [params]);

    const save = async function* (data: any) {
        const form = new FormData();
        form.append('image', new Blob([data]), 'img')
        try {
            const src = await ArticleService.uploadImage(form)
            yield "http://192.168.1.102:8000/image-store/" + src.data;
            return true;
        } catch (e) {
            return false;
        }
    };

    const onDraft = async (e: any) => {
        e.preventDefault();
        if (!value || !category || !name) {
            mySnackbarsMessage.current.message('warning', '空的地方都要填哦(⊙o⊙)');
            return;
        }
        const postData: any = {
            content: value,
            author: 'qi-xiao-gu',
            categoryId: category,
            abstract: value.substring(0, 200),
            name: name
        }
        try {
            if (params.id) {
                postData.id = params.id
                await ArticleService.updateDraft(postData)
            } else {
                await ArticleService.saveArticleAsDraft(postData)
            }
            mySnackbarsMessage.current.message('success', '保存成功');
            navigateFunction('/')
        } catch (e) {
        }
    }


    const onPublish = async (e: any) => {
        e.preventDefault();
        if (!value || !category || !name) {
            mySnackbarsMessage.current.message('warning', '空的地方都要填哦(⊙o⊙)');
            return;
        }
        const postData: any = {
            content: value,
            author: 'qi-xiao-gu',
            categoryId: category,
            abstract: value.substring(0, 200),
            name: name
        }
        try {
            if (params.id) {
                postData.id = params.id
                await ArticleService.updateArticleAndPublish(postData)
            } else {
                await ArticleService.publishArticle(postData)
            }
            mySnackbarsMessage.current.message('success', '保存成功');
            navigateFunction('/article/' + params.id)
        } catch (e) {
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
            <div className={'write-one-container'}>
                <div className={'header'}>
                    <FormControl variant="standard" className={"header-item"}>
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
                    <TextField variant="standard" id="outlined-basic" label="标题" className={"header-item"} value={name}
                               onChange={onNameChange}/>
                    <div style={{marginLeft: 'auto'}}>
                        <Button className={"header-item-obj"}
                                variant={'outlined'}
                                onClick={onPublish}
                                color={"success"}
                        >
                            发布
                        </Button>
                        <Button className={"header-item-obj"}
                                variant={'outlined'}
                                onClick={onDraft}
                        >
                            存为草稿
                        </Button>
                    </div>
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
                        l18n={{
                            write: <EditIcon/> ,
                            preview: <VisibilityIcon/>,
                            pasteDropSelect: '点我上传照片（*PC端支持图片拖拽 / 截图粘贴 / 文件选择）',
                        } as L18n}
                    />
                </div>
            </div>
        </div>
    );
}
