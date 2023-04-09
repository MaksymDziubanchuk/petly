import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const { REACT_APP_BASE_URL } = process.env;

axios.defaults.baseURL = `${REACT_APP_BASE_URL}/api`;



const addPet = createAsyncThunk('user/addPet', async (dataPet, thunkAPI) => {
    try {
      const response = await axios.post('/users/addPet', dataPet);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });

const getUserPet = createAsyncThunk(
  'users/current/pets',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('users/current/pets')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  });

  const deletePet = createAsyncThunk(
    'users/{petId}',
    async (petId, thunkAPI) => {
      try {
        const data = await axios.delete(`/users/${petId}`);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);
  const updatePet = createAsyncThunk(
    'users/{petId}',
    async ({ formData, petId}, thunkAPI) => {
   
      try {
        const response = await axios.put(`/users/${petId}`, formData);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );


const operationsPets = {
  addPet,
  getUserPet,
  deletePet,
  updatePet,
}

export default operationsPets;
