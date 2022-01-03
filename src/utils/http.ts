import {mySnackbarsMessage} from '../components/MySnackbars/MySnackbars';
import {loginDialog} from "../components/LoginDialog/LoginDialog";

const axios = require('axios');
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : '/api',
    timeout: 15000,
    // headers: {'X-Custom-Header': 'foobar'}
});
// request拦截器
instance.interceptors.request.use((request: any) => {
    if (localStorage.getItem('t')) {
        request.headers['Authorization'] = localStorage.getItem('t');
    } else {
        if (request.url.startsWith('actions/') ) {
            loginDialog.current.loginDialogOpen();
            return;
        }
    }
    return request
}, (error: any) => {
    // Do something with request error
    Promise.reject(error)
});

// response拦截器
instance.interceptors.response.use((res: any) => {
    // 如果是特定status code 则页面进行对应的跳转处理
    if (res.data.code === '200') {
        // 正常
        return res.data
    } else if (res.data.code === '500') {

    } else if (res.data.code === '300') {
        localStorage.removeItem('t');
        localStorage.removeItem('u');
        loginDialog.current.loginDialogOpen();
    }
    mySnackbarsMessage.current.message("error", res.data.msg)
    throw new Error(res.data.msg)
}, (error: any) => {
    return Promise.reject(error)
});

export default instance;
