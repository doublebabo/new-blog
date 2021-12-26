import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import './ChattingRoom.scss';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import {Button} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {dateFormatForChat, trim} from "../../utils/tools";
import socket from "../../utils/socket";
import ArticleService from "../../services/ArticleService";

interface ChatBase {
    username: string,
    time: number,
    text: string,
    flag?: number,// 如果是1 则说明是系统消息
    ip?: number,
    location?: number,
}

const ChattingRoom = forwardRef((props: any, ref: any) => {

    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');
    const [chatData, setChatData] = useState<ChatBase[]>([]);
    const [userCount, setUserCount] = useState(0);
    const loginUsername = localStorage.getItem('u') || 'anonymous';

    useImperativeHandle(ref, () => ({
        close: onClose,
        click: () => {
            setVisible(!visible)
        }
    }));
    useEffect(() => {
        if (localStorage.getItem('cD')) {
            const chatDataStorage: any = JSON.parse(localStorage.getItem('cD') || '');
            setChatData(chatDataStorage);
        }
        ArticleService.getIpInfo(()=>{});
        // const overlayClick = (e: any) => {
        //     if (e.target.className === "chatting-room-box visible") {
        //         onClose();
        //     }
        // }
        // window.addEventListener('click', overlayClick);
        return () => {
            // window.removeEventListener('click', overlayClick)
        }
    }, []);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('body-overlay');
            socketInstance();
            const chatScroll = document.getElementsByClassName('room-context')[0];
            chatScroll.scrollTo({top: chatScroll.scrollHeight});
        } else {
            document.body.style.overflow = 'auto';
            document.body.classList.remove('body-overlay');
        }
    }, [visible]);

    useEffect(() => {
        const chatScroll = document.getElementsByClassName('room-context')[0];
        if (chatScroll.scrollHeight > chatScroll.clientHeight) {
            chatScroll.scrollTo({top: chatScroll.scrollHeight});
        }
    }, [chatData]);



    const socketInstance = () => {
        if (socket.connected) return;
        socket.connect();
        socket.emit('addUser', {
            username: loginUsername,
            ip: localStorage.getItem('ip'),
            location: localStorage.getItem('location')
        })
        socket.on('userList', (ev) => {
            setUserCount(ev)
        });
        socket.on('chart:message', (ev) => {
            onReceiveMsg(ev);
        });
        socket.on('gTalk', (ev) => {
            onReceiveMsg({...ev, flag: 1});
        });
    }

    const onReceiveMsg = (i: any) => {
        setChatData((prevState) => [...prevState, i]);
    }

    const onClose = (event?: any) => {
        setVisible(false)
    };

    const onMsgChange = (event: React.ChangeEvent<any>) => {
        setText(event.target.value);
    };

    const onSendMsg = async () => {
        if (!trim(text)) return;
        socket.emit("chart:message", {text: trim(text), username: loginUsername, ip: localStorage.getItem('ip'), location: localStorage.getItem('location')})
        localStorage.setItem('cD', JSON.stringify(chatData.filter(i => !i.flag)));
        setText('');
        setChatData((pre) => [...pre, {username: loginUsername, time: new Date().getTime(), text: trim(text)}]);
    }

    const onEnter = (event:any) => {
        if (13 === event.keyCode && !event.shiftKey){
            onSendMsg();
        }
    }

    return (
        <div className={visible ? "chatting-room-box visible" : "chatting-room-box"} >
            {
                (<div className={"chatting-room"}>
                    <div className={"room-title"}><span>全站聊天室<span className='bubble'>{userCount}人在线</span></span><IconButton
                        onClick={onClose}><CloseIcon/></IconButton></div>
                    <ul className={"room-context"}>
                        {chatData.length ? chatData.map(item => (
                            <div key={item.username + item.time}>
                                {item.flag ? (
                                    <li className="room-notification">
                                        <span>系统消息 {dateFormatForChat(item.time)}</span>
                                        <div>{item.text}</div>
                                    </li>
                                ) : (
                                    <li
                                        className={item.username === loginUsername ? 'chat-box self' : 'chat-box'}>
                                        <div className={'user'}>{item.username} {dateFormatForChat(item.time)}</div>
                                        <div className={'user-msg'}>
                                            <div className={"msg-detail"}>{item.text}</div>
                                        </div>
                                    </li>
                                )}
                            </div>
                        )) : <div className={'system-msg'}>暂时没人聊天欸.......................</div>}
                    </ul>
                    <div className={"room-bottom"}>
                        <textarea className={"room-input"} value={text} onKeyUp={onEnter} onChange={onMsgChange}/>
                        <Button className={'room-btn'} onClick={onSendMsg} >
                            <SendIcon/>
                        </Button>
                    </div>
                </div>)
            }
        </div>
    );
})
export const myChattingRoom: any = React.createRef();

const MyChattingRoom = () => (<ChattingRoom ref={myChattingRoom}/>)
export default MyChattingRoom;
