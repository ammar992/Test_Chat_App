import { createSlice } from "@reduxjs/toolkit";

// Basic Global State
const initialState = {
    isCreate:false,
    isNotification:false
};


// State Updating Functions 
const miscReducer = createSlice({
    name: 'misc',
    initialState,
    reducers: {
    setIsCreate:(state,action)=>{
        state.isCreate = action.payload;
    },
    setIsNotification:(state,action)=>{
        state.isNotification = action.payload;
    }
    },
    
});

// Exporting All the State Updating Functions
export const { setIsCreate, setIsNotification } = miscReducer.actions;
export default miscReducer.reducer;
