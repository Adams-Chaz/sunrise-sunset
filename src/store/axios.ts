import axios from "axios";

/**
 * Define a new instance of AXIOS;
 */
const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

export { instance };

