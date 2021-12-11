import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {forwardRef, useImperativeHandle} from "react";

function Snackbars(props: any,ref: any) {
    const [state, setState] = React.useState<any>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    const handleClick = () => {
        setState({...state, open: true});
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        // if (reason === 'clickaway') {
        //     return;
        // }
        setState({...state, open: false});
    };

    useImperativeHandle(ref, () => ({
        // 暴露给父组件的方法
        handleClick: handleClick,
        handleClose: handleClose
    }));

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled"  severity={props.type} sx={{ width: '100%' }}>{props.message}</MuiAlert>
            </Snackbar>
        </Stack>
    );
}
export default forwardRef(Snackbars)
