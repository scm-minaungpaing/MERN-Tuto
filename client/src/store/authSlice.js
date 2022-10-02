import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: {}
    },
    reducers: {
        getUser: (state, payload) => {
            state.user =  payload.payload.user
            state.isAuthenticated = true
        },
        clearUser: (state) => {
            state.user = {}
            state.isAuthenticated = false
        }
    }
})

export const { getUser, clearUser } = authSlice.actions

export default authSlice.reducer;