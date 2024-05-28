import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

// Basic Global State
const initialState = {};


// State Updating Functions 
const userReducer = createSlice({
    name: 'person',
    initialState,
    reducers: {
        loadUser: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            localStorage.clear();
            Cookies.remove('user');
            state.value = {};
        }
    },
    
});

// Exporting All the State Updating Functions
export const { updateName, loadUser, logout } = userReducer.actions;
export default userReducer.reducer;
