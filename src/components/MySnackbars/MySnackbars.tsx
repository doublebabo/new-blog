import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {  } from '@mui/material/Alert';
import {forwardRef, useImperativeHandle} from "react";

const Snackbars = forwardRef((props: any,ref: any) => {
    const [state, setState] = React.useState<any>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: '',
        type: 'success'
    });
    const { vertical, horizontal, open } = state;
    const handleClick = (type:string, message:string) => {
        setState({...state, open: true,type,message });
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setState({...state, open: false});
    };

    useImperativeHandle(ref, () => ({
        // 暴露给父组件的方法
        message: handleClick,
        handleClose: handleClose
    }));

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open} autoHideDuration={2000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled"  severity={state.type} sx={{ width: '100%' }}>{state.message}</MuiAlert>
            </Snackbar>
        </Stack>
    );
})

export const mySnackbarsMessage: any = React.createRef();

const MySnackbars = () => (<Snackbars ref={mySnackbarsMessage}/>)
export default MySnackbars;
