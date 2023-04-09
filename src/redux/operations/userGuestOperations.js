import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getInfoPetsUser, getInfoUser } from './userGuestAPI';


const {REACT_APP_BASE_URL} = process.env;
axios.defaults.baseURL = `${REACT_APP_BASE_URL}/api`;

export const fetchInfoPetUser = createAsyncThunk(
  'users/:id/pets',
  async (id, thunkAPI) => {
    try {
      const data = await getInfoPetsUser(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchInfoUser = createAsyncThunk(
  'users/:id',
  async (id, thunkAPI) => {
    try {
      const data = await getInfoUser(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);