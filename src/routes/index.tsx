import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'

// TODO: Import your pages here
import Home from '../pages/Home'
import UsersPage from '../pages/Users'
import NotFound from '../pages/NotFound'
import ListUsers from '../components/ListUsers'
import CreateNewUser from '../components/CreateUser'

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
        ]
      }
    ]
  },
])

export default router