// import Signup from './views/auth/signup/signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './views/login/login';
import Signup from './views/signup/signup';
import Auth from './layout/auth';
import MainPages from './layout/page';
import Home from './views/Home/Home';
import SinglePerson from './views/SinglePerson/SinglePerson';
import Message from './views/message/message';
import { loadUser } from './reducers/userReducer';
import { useDispatch } from 'react-redux';
import Setting from './views/settings/setting';
import { useEffect } from 'react';
import { SocketProvider } from './socket';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SocketProvider>
        <MainPages />
      </SocketProvider>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/person/:id',
        element: <SinglePerson />,
      },
      {
        path: '/message',
        element: <Message />,
      },
      {
        path: '/settings',
        element: <Setting />,
      },
    ],
  },
  {
    path: '/',
    element: <Auth />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('user') !== null) {
        let user = JSON.parse(localStorage.getItem('user') ?? '{}');
        dispatch(loadUser(user));
      }
    })();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
