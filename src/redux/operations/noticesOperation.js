import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './noticesAPI';
import axios from 'axios';
import { setAuthHeader } from "redux/operations/userOperations";


const searchParams = new URLSearchParams(document.location.search);
const usertoken = searchParams.get('token');

export const fetchCategoryNotices = createAsyncThunk(
  'notices/fetchNotices',
  async (value, thunkAPI) => {
    try {
      const {data} = await api.getCategoryNotices(value);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addNoticeToFavorite = createAsyncThunk(
  'notices/favoriteNotice',
  async (noticeId, thunkAPI) => {
    try {
      const {data} = await api.addNoticeToFavorite(noticeId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteFavoriteNotice = createAsyncThunk(
  'notices/deleteFavorites',
  async (noticeId, thunkAPI) => {
    try {
      await api.deleteNoticeFromFavorite(noticeId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteNotice = createAsyncThunk(
  'notices/deleteNotice',
  async (noticeId, thunkAPI) => {
    try {
      await api.deleteNotice(noticeId);
      return noticeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllFavorites = createAsyncThunk(
  'notices/getFavorite',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = usertoken ? usertoken : state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const response = await axios.get(`/notices/favorite`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSearch = createAsyncThunk(
  'notices/search',
  async (search, thunkAPI) => {
    try {
      const response = await api.getSearch(search);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addNotice = createAsyncThunk(
  'notices/notice',
  async (dataNotice, thunkAPI) => {
    try {
      const response = await axios.post('/notices/notice', dataNotice);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editNotice = createAsyncThunk(
  'notices/editNotice',
  async (dataNotice, thunkAPI) => {
    try {
      const {data} = await api.edithNotice(dataNotice);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);