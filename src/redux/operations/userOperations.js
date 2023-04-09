import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

axios.defaults.baseURL = `${REACT_APP_BASE_URL}/api`;

const searchParams = new URLSearchParams(document.location.search);
const usertoken = searchParams.get('token'); 

export const setAuthHeader = token => {
  if (token) {
    return (axios.defaults.headers.common.authorization = `Bearer ${token} `);
  }
  axios.defaults.headers.common.authorization = '';
};

const registerNewUser = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post('/auth/register', user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  'auth/update',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('/auth/update', data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await axios.post('/auth/login', user);
    return response.data;
  } catch ({ response }) {
    const error = {
      status: response.status,
      message: response.data.message,
    };
    return thunkAPI.rejectWithValue(error);
  }
});

const authVerify = createAsyncThunk('auth/verify', async (user, thunkAPI) => {
  try {
    const response = await axios.post('/auth/verify', user);
    return response.data;
  } catch ({ response }) {
    const error = {
      status: response.status,
      message: response.data.message,
    };
    return thunkAPI.rejectWithValue(error);
  }
});

const resetUserPassword = createAsyncThunk('auth/reset-password', async (user, thunkAPI) => {
  try {
    const response = await axios.post('/auth/reset-password', user);
    return response.data;
  } catch ({ response }) {
    const error = {
      status: response.status,
      message: response.data.message,
    };
    return thunkAPI.rejectWithValue(error);
  }
});

const refreshPassword = createAsyncThunk('auth/update-password', async (userInfo, thunkAPI) => {
  try {
    axios.defaults.headers.common.authorization = `Bearer ${userInfo.userToken} `
    const response = await axios.patch('/auth/update-password', userInfo.userNewPassword);
    return response.data;
  } catch ({ response }) {
    const error = {
      status: response.status,
      message: response.data.message,
    };
    return thunkAPI.rejectWithValue(error);
  }
});

const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.post('/auth/logout');
      return result;
    } catch ({ response }) {
      const error = {
        status: response.status,
        message: response.data.message,
      };
      return rejectWithValue(error);
    }
  }
);

const current = createAsyncThunk('users/current', async (_, thunkAPI) => {
  const state = thunkAPI.getState();

  const persistedToken = usertoken ? usertoken : state.auth.token;

  try {
    setAuthHeader(persistedToken);
    const response = await axios.get('/users/current');
    return response.data;
  } catch ({ response }) {
    setAuthHeader();
    const error = {
      status: response.status,
      message: response.data.message,
    };
    return thunkAPI.rejectWithValue(error);
  }
});


const updateUserAvatar = createAsyncThunk(
  'auth/update/avatar',
  async (file, { thunkAPI }) => {
    const formData = new FormData();
    formData.append('avatarURL', file);

    try {
      const response = await axios.patch(`auth/update/avatar`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const updateUser = createAsyncThunk('user/update', async (data, thunkAPI) => {
  try {
    const response = await axios.patch(
      `/auth/update?${Object.keys(data)}=${Object.values(data)}`
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const deleteAccount = createAsyncThunk('users/delete', async (_, thunkAPI) => {
  const state = thunkAPI.getState();

  const persistedToken = usertoken ? usertoken : state.auth.token;

  try {
    setAuthHeader(persistedToken);
    const response = await axios.delete('/users/current');
    return response.data;
  } catch ({ response }) {
    setAuthHeader();
    const error = {
      status: response.status,
      message: response.data.message,
    };
    return thunkAPI.rejectWithValue(error);
  }
});

const operations = {
  registerNewUser,
  login,
  authVerify,
  logout,
  current,
  updateUser,
  updateUserAvatar,
  deleteAccount,
  resetUserPassword,
  refreshPassword,
};

export default operations;
