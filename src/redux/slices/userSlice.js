import { createSlice } from "@reduxjs/toolkit";
import operationsPets from "redux/operations/userPetsApi";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const initialState = {
    error: null,
    loading: false,
    pets: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [operationsPets.addPet.pending] (state) {
            state.loading = true;
          },
        [operationsPets.addPet.fulfilled] (state, action) {
            state.loading = false;
            state.pets.push(action.payload);
            Notify.success(`${action.payload.name} added successfully.`, {
              distance: '100px',
              opacity: '0.8',
              useIcon: false,
              fontSize: '18px',
              borderRadius: '20px',
              showOnlyTheLastOne: true})
          },
        [operationsPets.addPet.rejected] (state) {
            state.loading = false;
            Notify.failure('Something went wrong:(', {
              distance: '100px',
              opacity: '0.8',
              useIcon: false,
              fontSize: '18px',
              borderRadius: '20px',
              showOnlyTheLastOne: true})
        },
        [operationsPets.getUserPet.pending] (state) {
           state.loading = false;
        },
        [operationsPets.getUserPet.fulfilled] (state, {payload}) {
            state.loading = false;
          state.pets = payload;
        },
        [operationsPets.getUserPet.rejected] (state, {payload}) {
            state.loading = false;
            state.error = payload;
        },

        [operationsPets.deletePet.pending] (state) {
            state.loading = true;
        },
        [operationsPets.deletePet.fulfilled] (state, action) {
          state.loading = false;
          state.pets = state.pets.filter(pet => pet._id !== action.payload);
        },
        [operationsPets.deletePet.rejected] (state, {payload}) {
            state.loading = false;
            state.error = payload;
      },
        
        [operationsPets.updatePet.pending] (state) {
          state.loading = true;
    
          },
        [operationsPets.updatePet.fulfilled] (state, action) {
          state.loading = false;
          state.pets = action.payload;
        },
        [operationsPets.updatePet.rejected] (state) {
            state.loading = false;
        },
    },
})


export const userReducer = userSlice.reducer;