import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'

// TODO: Import your pages here
import CreateNewUser from '../components/CreateUser'
import ResetPassword from '../pages/resetPassword'
import ListUsers from '../components/ListUsers'
import UserInfo from '../components/UserInfo'
import NotFound from '../pages/NotFound'
import UsersPage from '../pages/Users'
import Home from '../pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'users',
        element: <UsersPage />,
        children: [
          {
            index: true,
            element: <ListUsers />
          },
          {
            path: 'create',
            element: <CreateNewUser />
          },
          {
            path: ':id',
            element: <UserInfo />
          }
        ]
      }
    ]
  },{
    path: '/reset-password',
    element: <ResetPassword />
  }
])

export default router