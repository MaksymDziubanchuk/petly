import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

axios.defaults.baseURL = `${REACT_APP_BASE_URL}/api`;

export const getInfoUser = async (id) => {
    const data = await axios.get(`/users/${id}`);
    return data.data;
}

export const getInfoPetsUser = async (id) => {
    const data = await axios.get(`/users/${id}/pets`);
    return data.data;
}