
/* eslint-disable react/prop-types */

import { createContext, useMemo, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socketContext = createContext();

const useSocket = () => useContext(socketContext);

const SocketProvider = ({ children }) => {
  const selector = useSelector((state) => state);

  const token = selector?.userReducer?.value?.token;

  useEffect(() => {
    console.log("Current Token:", token); // Add this line to log the current token
  }, [token]);

  const socket = useMemo(
    () =>
      io('http://localhost:3000/', {
        auth: {
          token: token,
        },
        withCredentials: true,
      }),
    [token] // Ensure token is in the dependency array
  );

  socket.on("connect_error", (err) => {
    console.error(`Connection error: ${err.message}`);
  });

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

export { useSocket, SocketProvider };
