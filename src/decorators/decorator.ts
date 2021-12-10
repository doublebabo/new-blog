export const  throttle = (timeout: number) => (target: any, name: string, descriptor: any) => {
    // 在2秒内反复触发 只会执行一次
    let old:any = descriptor.value;
    let prevTime = 0;
    descriptor.value = function (...args: any) {
        const curTime = +new Date();
        if (curTime - prevTime > timeout) {
            old.call(this,args);
            prevTime = curTime;
        }
    }
    return descriptor
}
