import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-691b8.firebaseio.com/'
});

export default instance;