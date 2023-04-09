import { createSlice } from '@reduxjs/toolkit';
import operations from '../operations/userOperations';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchParams = new URLSearchParams(document.location.search);
const usertoken = searchParams.get('token');


export const authSlice = createSlice({
    name: 'auth',
    initialState: {      
      user: {
        name: "",
        email: "",
        phone: "",
        city: "",
        userId: "",
        avatar: null,
      },
      token: null,
      isLogin: false,
      loading: false,
      error: null,

    },
    extraReducers: {
      [operations.registerNewUser.pending](state) {
        state.loading = true;
      },
      [operations.registerNewUser.fulfilled](state, action) {
       state.loading = false; 
       Notify.success(`${action.payload.name}, you have successfully registered, the verification has been sent to your mail.`, 
       {distance: '100px',
       opacity: '0.8',
       useIcon: false,
       fontSize: '18px',
       borderRadius: '20px',
       showOnlyTheLastOne: true})
       state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.phone = action.payload.phone;
        state.user.city = action.payload.city;
        if(usertoken) {
            state.token = usertoken;
            state.isLogin = true;
        }
      },
      [operations.registerNewUser.rejected](state) {
        state.loading = false;
        Notify.failure('Something went wrong or user with this name already exists!', 
        { distance: '100px',
          opacity: '0.8',
          useIcon: false,
          fontSize: '18px',
          borderRadius: '20px',
          showOnlyTheLastOne: true})
      },

      [operations.login.pending](state, { payload }) {
        state.loading = true;
        state.error = payload;
      },
      [operations.login.fulfilled] (state, { payload }) {
        state.loading = false;
        state.user.email = payload.email;
        state.user.userId = payload.userId;
        state.token = usertoken ? usertoken : payload.token;
        state.isLogin = true;
      },
      [operations.login.rejected] (state, { payload }) {
        state.loading = false;
        state.error = payload;
        Notify.failure(`${state.error.message}`, 
        { distance: '100px',
          opacity: '0.8',
          useIcon: false,
          fontSize: '18px',
          borderRadius: '20px',
          showOnlyTheLastOne: true})
      },
        [operations.authVerify.pending](state, { payload }) {
            state.loading = true
            state.error = payload
        },
        [operations.authVerify.fulfilled](state, { payload }) {
            state.loading = false
            Notify.success(
                'You have successfully registered, the verification has been sent to your mail.',
                {
                    distance: '100px',
                    opacity: '0.8',
                    useIcon: false,
                    fontSize: '18px',
                    borderRadius: '20px',
                    showOnlyTheLastOne: true,
                }
            )
        },
        [operations.authVerify.rejected](state, { payload }) {
            state.loading = false
            state.error = payload
            Notify.failure(`${state.error.message}`, {
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        },

        [operations.resetUserPassword.pending](state, { payload }) {
            state.loading = true
        },
        [operations.resetUserPassword.fulfilled](state, { payload }) {
            state.loading = false
            Notify.success('Please check your mail.', {
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        },
        [operations.resetUserPassword.rejected](state, { payload }) {
            state.loading = false
            Notify.failure(`${payload.message} this email.`, {
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        },
        [operations.refreshPassword.pending](state, { payload }) {
            state.loading = true
        },
        [operations.refreshPassword.fulfilled](state, { payload }) {
            state.loading = false
            Notify.success('Your password has been successfully changed.', {
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        },
        [operations.refreshPassword.rejected](state, { payload }) {
            state.loading = false
            Notify.failure(`Your ${payload.message}.`, {
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        },

        [operations.logout.pending](state, { payload }) {
            state.loading = true
            state.error = payload
        },
        [operations.logout.fulfilled](state) {
            state.loading = false
            state.user = {}
            state.token = ''
            state.isLogin = false
        },
        [operations.logout.rejected](state, { payload }) {
            state.loading = false
            state.error = payload
        },
      [operations.current.pending] (state, {payload}) {
        state.loading = true;
      },
      [operations.current.fulfilled] (state, { payload }) {
        state.loading = false;
        if(usertoken) {
            state.token = usertoken;
        }
        state.user.avatar = payload.avatarURL;
        state.user.city = payload.city;
        state.user.email = payload.email;
        state.user.name = payload.name;
        state.user.phone = payload.phone;
        state.user.userId = payload.userId;
        state.isLogin = true;
      },
      [operations.current.rejected] (state, { payload }) {
        state.loading = false;
        state.error = payload;
        state.isLogin = false;
      },
        [operations.updateUser.fulfilled](state, action) {
            for (const key in action.payload) {
                switch (key) {
                    case 'name':
                        state.user.name = action.payload.name
                        break

                    case 'birthday':
                        state.user.birthday = action.payload.birthday
                        break
                    case 'email':
                        state.user.email = action.payload.email
                        break

                    case 'phone':
                        state.user.phone = action.payload.phone
                        break

                    case 'city':
                        state.user.city = action.payload.city
                        break
                    default:
                        return
                }
            }
        },
        [operations.updateUser.rejected]() {
            Notify.failure(
                'Something went wrong or user with this name already exists!',
                {
                    distance: '100px',
                    opacity: '0.8',
                    useIcon: false,
                    fontSize: '18px',
                    borderRadius: '20px',
                    showOnlyTheLastOne: true,
                }
            )
        },
        [operations.updateUserAvatar.fulfilled](state, { payload }) {
            state.user.avatar = payload.avatarURL
        },
        [operations.updateUserAvatar.rejected]: (state, { payload }) => {
            state.error = payload
        },

        [operations.deleteAccount.pending](state) {
            state.loading = true
        },
        [operations.deleteAccount.fulfilled](state, { payload }) {
            state.loading = false
            state.user = payload
            Notify.success('Your account deleted:(', {
                distance: '100px',
                opacity: '0.8',
                useIcon: false,
                fontSize: '18px',
                borderRadius: '20px',
                showOnlyTheLastOne: true,
            })
        },
        [operations.deleteAccount.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    },
})

export const authReducer = authSlice.reducer
