import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:4000/api/v1';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
