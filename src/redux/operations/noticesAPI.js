import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

axios.defaults.baseURL = `${REACT_APP_BASE_URL}/api`;

export const getCategoryNotices = async (value) => {
  const {categoryName, page, limit} = value
    const data = await axios.get(`/notices/${categoryName}?page=${page}&limit=${limit}`);
    return data;
}

export const addNoticeToFavorite = async (noticeId) => {
    const data = await axios.patch(`/notices/favorites/${noticeId}`);
    return data;
}

export const deleteNoticeFromFavorite = async (noticeId) => {
  const data = await axios.delete(`/notices/favorites/${noticeId}`);
  return data;
}

export const deleteNotice = async (noticeId) => {
    const data = await axios.delete(`/notices/${noticeId}`);
    return data;
}

export const getSearch = async (items) => {
  const {value, categoryName, page, limit} = items;
  const data = await axios.get(`/notices/search?keyword=${value}&category=${categoryName}&page=${page}&limit=${limit}`);
  return data;
};

export const edithNotice = async (dataNotice) => {
  const data = await axios.put(`/notices/notice/${dataNotice.id}`, dataNotice.data);
  return data;
};