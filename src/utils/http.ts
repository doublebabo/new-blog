const axios = require('axios');

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://192.168.1.102:8080/' : '/',
    timeout: 15000,
    // headers: {'X-Custom-Header': 'foobar'}
});

// request拦截器
instance.interceptors.request.use((request: any) => {
    // if (Cookie.get('token')) {
    //     request.headers['token'] = Cookie.get('token');
    // }
    return request
}, (error: any) => {
    // Do something with request error
    Promise.reject(error)
});

// response拦截器
instance.interceptors.response.use((res: any) => {
    // 如果是特定status code 则页面进行对应的跳转处理
    return res;
}, (error: any) => {
    return Promise.reject(error)
});

export default instance;
