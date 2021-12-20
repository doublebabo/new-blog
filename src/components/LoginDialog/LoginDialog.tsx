import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@mui/material";
import {forwardRef, useImperativeHandle, useState} from "react";
import DialogContent from "@mui/material/DialogContent";
import ArticleService from "../../services/ArticleService";
import CloseIcon from '@mui/icons-material/Close';
import {mySnackbarsMessage} from "../MySnackbars/MySnackbars";
import IconButton from "@mui/material/IconButton";

const MyLoginDialog = forwardRef((props: any, ref: any) => {
    const [open, setOpen] = React.useState(false);
    const [loginObj, setLoginObj] = useState<any>({
        username: '',
        psd: ''
    });

    useImperativeHandle(ref, () => ({
        loginDialogOpen: handleClickOpen,
        loginDialogClose: handleClose,
    }));

    const handleClickOpen = () => {
        setOpen(true);
        setLoginObj({
            username: '',
            psd: '',
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onPsdChange = (event: React.ChangeEvent<any>) => {
        setLoginObj({...loginObj, psd: event.target.value});
    }

    const onUsernameChange = (event: React.ChangeEvent<any>) => {
        setLoginObj({...loginObj, username: event.target.value});
    }

    const onSubmit = async () => {
        if (!loginObj.username || !loginObj.psd) {
            mySnackbarsMessage.current.message('error', `用户名/密码都没填吖你 (●'◡'●)`);
            return
        }
        const {t,u} = (await ArticleService.login(loginObj)).data;
        if (t) {
            localStorage.setItem('t', t);
            localStorage.setItem('u', u);
            window.location.reload();
        }
    }

    const onKeyUpSubmit = (event: any) => {
        if (event.keyCode === 13) {
            onSubmit();
        }
    }

    const onRegister = async () => {
        mySnackbarsMessage.current.message('error', `还没有开放噢噢噢噢`);
        return;
        // await ArticleService.register(loginObj);
    }

    return (
        <div className={'login-dialog'}>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 0
                }}>
                    {"请登录"}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField style={{width: '100%', margin: '1rem 0'}}
                               label="用户名/邮箱" variant="outlined"
                               value={loginObj?.username}
                               onChange={onUsernameChange}
                               required
                    />
                    <TextField style={{width: '100%', margin: '1rem 0 '}} type={"password"} label="密码"
                               value={loginObj?.psd}
                               onChange={onPsdChange}
                               onKeyUp={onKeyUpSubmit}
                               required
                               variant="outlined"/>
                </DialogContent>
                <DialogActions style={{marginRight: '1.2rem'}}>
                    <Button onClick={onRegister} type="submit" size={'large'} color={"warning"} variant={"outlined"}>注册</Button>
                    <Button onClick={onSubmit} type="submit"  size={'large'} variant={"outlined"}>登录</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})

export const loginDialog: any = React.createRef();

const GlobalLoginDialog = () => (<MyLoginDialog ref={loginDialog}/>)
export default  GlobalLoginDialog;

