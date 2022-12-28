import axios from 'axios';

console.log(process.env);
const url = process.env.REACT_APP_BASE_URL;

export default axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerServiceWorker = async () => {
    try {
        if ('serviceWorker' in navigator) {
            let baseURL = process.env.PUBLIC_URL + `/worker.js`;
            const registration = await navigator.serviceWorker.register(
                baseURL,
                { scope: '/' }
            );
            console.log(
                'Service worker registration successful with scope: ',
                registration.scope
            );
            return registration;
        } else {
            throw Error('service Worker not supported');
        }
    } catch (err) {
        console.log('Service worker registration failed, error:', err);
    }
};

export const subscribe = async (serviceWorkerReg) => {
    try {
        console.log('test12123123');
        const subscription = await serviceWorkerReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.REACT_APP_WEB_PUSH_PUBLIC,
        });
        console.log(subscription);
        axios.post('http://127.0.0.1:4000/api/v1/subscribe', subscription);
    } catch (err) {
        console.log(err);
    }
    // let subscription = await serviceWorkerReg.pushManager.getSubscription();
    // console.log(`!!!dasdasdad!!`);
    // console.log({ subscription });
    // if (subscription === null) {
    //     subscription = await serviceWorkerReg.pushManager.subscribe({
    //         userVisibleOnly: true,
    //         applicationServerKey: process.env.REACT_APP_WEB_PUSH_PUBLIC,
    //     });
    //     axios.post('http://127.0.0.1:4000/api/v1/subscribe', subscription);
};
