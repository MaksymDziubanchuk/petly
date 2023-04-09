import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryNotices, deleteNotice, getAllFavorites, getSearch, addNoticeToFavorite, deleteFavoriteNotice, addNotice } from "../operations/noticesOperation";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const initialState = {
    items: [],
    loading: false,
    error: null,
    notice: null,
    favoriteNotices: [],
    totalNotices: 0,
    nameCategory: []
}

const noticesSlice = createSlice({
    name: "notices",
    initialState,
    reducers: {
        setNameCategory: (state, action) => {
          state.nameCategory = action.payload;
        }
    },
    extraReducers: {
        [fetchCategoryNotices.pending] (state) {
            state.loading = true;
        },
        [fetchCategoryNotices.fulfilled] (state, action) {
            state.loading = false;
            state.error = null;
            state.totalNotices = action.payload.countNotices;
            if(state.nameCategory[0] === 'own') {
              state.nameCategory[1] === 1 
              ? state.items = action.payload.notices 
              : state.items.push(...action.payload.notices)
              return
            } else if(state.nameCategory[0] === 'favorite') {
              state.nameCategory[1] === 1 
              ? state.items = action.payload.notices 
              : state.items.push(...action.payload.notices)
              return
            }
            state.nameCategory[1] === 1
              ? state.items = action.payload.notices
              : state.items.push(...action.payload.notices)
        },
        [fetchCategoryNotices.rejected] (state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        [getAllFavorites.pending] (state) {
            state.loading = true;
          },
        [getAllFavorites.fulfilled] (state, action) {
            state.loading = false;
            state.favoriteNotices = action.payload.notices;
          },
        [getAllFavorites.rejected] (state, action) {
            state.loading = false;
            state.error = action.payload;
            Notify.failure('Something went wrong:(', 
            { distance: '100px',
              opacity: '0.8',
              useIcon: false,
              fontSize: '18px',
              borderRadius: '20px',
              showOnlyTheLastOne: true})
          },
          [addNoticeToFavorite.rejected] (state, action) {
            state.error = action.payload;
          },
        [deleteFavoriteNotice.rejected] (state, action) {
            state.error = action.payload;
        },
        [deleteNotice.pending] (state) {
            state.loading = true;
        },
        [deleteNotice.fulfilled] (state, action) {
            state.loading = false;
            state.error = null;
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        [deleteNotice.rejected] (state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        [getSearch.pending] (state, action) {
            state.loading = true;
        },
        [getSearch.fulfilled] (state, action) {
          state.loading = false;
          if(action.payload.countNotices === 0) {
            Notify.failure('Ooops, your query is not found', 
            { distance: '100px',
              opacity: '0.8',
              useIcon: false,
              fontSize: '18px',
              borderRadius: '20px',
              showOnlyTheLastOne: true});
              return
                }
          state.totalNotices = action.payload.countNotices;
          state.nameCategory[2] === 1 ? state.items = action.payload.result : state.items.push(...action.payload.result);
          },
        [getSearch.rejected] (state, action) {
            state.loading = false;
            state.error = action.payload;
            Notify.failure('Something went wrong:(', 
            { distance: '100px',
              opacity: '0.8',
              useIcon: false,
              fontSize: '18px',
              borderRadius: '20px',
              showOnlyTheLastOne: true})
        },

        [addNotice.pending] (state) {
            state.loading = true;
        },
        [addNotice.fulfilled] (state, action) {
          state.loading = false;
          state.nameCategory[0] === action.payload.category && state.items.unshift(action.payload);
        },
        [addNotice.rejected] (state, action) {
          state.loading = false;
          state.error = action.payload;
          Notify.failure('Something went wrong:(', 
          { distance: '100px',
            opacity: '0.8',
            useIcon: false,
            fontSize: '18px',
            borderRadius: '20px',
            showOnlyTheLastOne: true})
        }
    }
})

export const { setNameCategory } = noticesSlice.actions;

export default noticesSlice.reducer;
