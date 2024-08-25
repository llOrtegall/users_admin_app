import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../auth/AuthProvider";
import { BottonTheme } from "./ui/BottonTheme";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

const RoutesLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact', path: '/contact' }
]

function NavBar() {
  const { setIsAuthenticated } = useAuth()
  const { toggleTheme } = useTheme()

  const handleLogout = () => {
    const token = document.cookie

    axios.post('/logout', { token })
      .then((res) => {
        console.log(res.data);
        if(res.status === 200){
          setIsAuthenticated(false)
        }
      })
  }

  return (
    <nav className='dark:bg-gray-900'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='https://flowbite.com/' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img src='react.svg' className='h-8' alt='Flowbite Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>React App Test</span>
        </a>

        <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            {
              RoutesLinks.map((link, index) => (
                <li key={index}>
                  <NavLink to={link.path} className={({ isActive }) => isActive ? 'text-yellow-400' : 'text-white'}> {link.name} </NavLink>
                </li>
              ))
            }
          </ul>
        </div>

        <BottonTheme funTheme={toggleTheme}/>

        <button onClick={() => handleLogout()} className=''>
          <FiLogOut />
        </button>
      </div>
    </nav>

  )
}

export default NavBar;
