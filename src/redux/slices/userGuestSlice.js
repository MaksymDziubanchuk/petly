import { createSlice } from '@reduxjs/toolkit';
import { fetchInfoPetUser, fetchInfoUser } from 'redux/operations/userGuestOperations';

let initialState = {
    user: { },
    pets: [],
    loading: false,
    error: null,
}

const userGuestSlice = createSlice({
    name: 'guest',
    initialState,
    extraReducers: {
        [fetchInfoUser.pending] (state) {
            state.loading = true;
        },
        [fetchInfoUser.fulfilled] (state, {payload}) {
            state.loading = false;
            state.user = payload;
        },
        [fetchInfoUser.rejected] (state, {payload}) {
            state.loading = false;
            state.error = payload;
        },
        [fetchInfoPetUser.pending] (state) {
            state.loading = true;
        },
        [fetchInfoPetUser.fulfilled] (state, {payload}) {
            state.loading = false;
            state.pets = payload;
        },
        [fetchInfoPetUser.rejected] (state, {payload}) {
            state.loading = false;
            state.error = payload;
        }
    }
  });

  export const userGuestReducer = userGuestSlice.reducer;