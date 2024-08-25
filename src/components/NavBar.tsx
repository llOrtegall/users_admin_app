import { useTheme } from '../context/ThemeProvider';
import { useAuth } from '../auth/AuthProvider';
import { BottonTheme } from './ui/BottonTheme';
import { NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import axios from 'axios';

const RoutesLinks = [
  { name: 'Home', path: '/' },
  { name: 'Users', path: '/users' },
]

function NavBar() {
  const { setIsAuthenticated } = useAuth()
  const { toggleTheme } = useTheme()

  const handleLogout = () => {
    const token = document.cookie

    axios.post('/logout', { token })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setIsAuthenticated(false)
        }
      })
  }

  return (
    <nav className='bg-transparent/5 flex flex-wrap items-center justify-between mx-auto p-4'>
      <a className='flex items-center space-x-3 rtl:space-x-reverse'>
        <img src='react.svg' className='h-8' alt='Flowbite Logo' />
        <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>React App Test</span>
      </a>

      <ul className='flex gap-2 font-semibold'>
        {
          RoutesLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.path} className={({ isActive }) => isActive ? 'text-yellow-400' : 'text-white'}> {link.name} </NavLink>
            </li>
          ))
        }
      </ul>

      <BottonTheme funTheme={toggleTheme} />

      <button onClick={() => handleLogout()} className=''>
        <FiLogOut />
      </button>

    </nav>

  )
}

export default NavBar;
