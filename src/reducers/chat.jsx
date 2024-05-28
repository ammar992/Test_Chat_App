import { createSlice } from "@reduxjs/toolkit";

// Basic Global State
const initialState = {
    notification:0,
    newMessagesAlert:[
        {
            chatId:"",
            count:0
        }
    ]
};


// State Updating Functions 
const chatReducer = createSlice({
    name: 'chat',
    initialState,
    reducers: {
    increamentNotification:(state)=>{
        state.notification = state.notification+1;
    },
    resetNotification:(state)=>{
        state.notification = 0;
    },
    setNewMessagesAlert:(state,action)=>{
        const index = state.newMessagesAlert.findIndex((item)=>item.chatId === action.payload.chatId);
        if(index !== -1){
            state.newMessagesAlert[index].count +=1;
        }else{
            console.log("else condition")
            state.newMessagesAlert.push({
                chatId:action.payload.chatId,
                count:1
            })
        }
    },
    clearOpenMessageAlert: (state, action) => {
        state.newMessagesAlert = state.newMessagesAlert.filter(item => item.chatId !== action.payload);
      }
    },
    
});

// Exporting All the State Updating Functions
export const { increamentNotification,resetNotification,setNewMessagesAlert,clearOpenMessageAlert} = chatReducer.actions;
export default chatReducer.reducer;
