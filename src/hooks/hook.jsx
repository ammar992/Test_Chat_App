import { useEffect } from 'react';

const useSocketEvents = (socket, handlers) => {
    useEffect(() => {
      const addSocketListeners = () => {
        Object.keys(handlers).forEach((event) => {
          socket.on(event, handlers[event]);
        });
      };

      const removeSocketListeners = () => {
        Object.keys(handlers).forEach((event) => {
          socket.off(event, handlers[event]);
        });
      };

      addSocketListeners();

      return removeSocketListeners;
    }, [socket, handlers]);
};

export { useSocketEvents };
