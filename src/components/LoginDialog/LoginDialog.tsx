import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@material-ui/core";
import {forwardRef, useImperativeHandle, useState} from "react";
import DialogContent from "@material-ui/core/DialogContent";
import ArticleService from "../../services/ArticleService";

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

    const onSubmit =async () => {
        await ArticleService.login(loginObj);

    }
    const onRegister =async () => {
        await ArticleService.register(loginObj);
    }

    return (
        <div className={'login-dialog'}>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"登录"}
                </DialogTitle>
                <DialogContent style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField style={{width: '100%', margin: '1rem 0'}}
                               label="用户名/邮箱" variant="outlined"
                               value={loginObj?.username}
                               onChange={onUsernameChange}
                    />
                    <TextField style={{width: '100%', margin: '1rem 0 '}} type={"password"} label="密码"
                               value={loginObj?.psd}
                               onChange={onPsdChange}
                               variant="outlined"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onSubmit} size={'large'}>登录</Button>
                    <Button onClick={onRegister} size={'large'}>注册</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default forwardRef(LoginDialog);
