import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@material-ui/core";
import {forwardRef, useImperativeHandle, useState} from "react";
import DialogContent from "@material-ui/core/DialogContent";
import ArticleService from "../../services/ArticleService";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {mySnackbarsMessage} from "../MySnackbars/MySnackbars";

function LoginDialog(props: any, ref: any) {
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
        const {data} = await ArticleService.login(loginObj);
        if (data) {
            localStorage.setItem('t', data);
            mySnackbarsMessage.current.message('success', '登录成功');
            handleClose();
        }
    }

    const onRegister = async () => {
        mySnackbarsMessage.current.message('error', `还没有开放噢噢噢噢`);
        return;
        await ArticleService.register(loginObj);
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
                    {"登录"}
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
                               required
                               variant="outlined"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onSubmit} type="submit" size={'large'}>登录</Button>
                    <Button onClick={onRegister} type="submit" size={'large'}>注册</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default forwardRef(LoginDialog);
