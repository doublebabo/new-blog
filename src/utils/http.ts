import {mySnackbarsMessage} from '../components/MySnackbars/MySnackbars';
const axios = require('axios');
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://192.168.1.102:8000/' : '/',
    timeout: 15000,
    // headers: {'X-Custom-Header': 'foobar'}
});

// request拦截器
instance.interceptors.request.use((request: any) => {
    if (localStorage.getItem('t')) {
        request.headers['Authorization'] = localStorage.getItem('t');
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

    } else {

    }
    mySnackbarsMessage.current.message("error",res.data.msg)
    return res.data
}, (error: any) => {
    return Promise.reject(error)
});

export default instance;
