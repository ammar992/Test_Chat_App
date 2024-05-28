import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer.jsx'
import miscReducer from './reducers/misc.jsx'
import chatReducer from "./reducers/chat.jsx";


const store = configureStore({
  reducer:{userReducer,miscReducer,chatReducer}
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider >
    <App />
    </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
