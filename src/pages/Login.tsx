// import { loginService, NetworkError } from '../services/loginServices';
import { BottonTheme } from '../components/ui/BottonTheme';
import { useTheme } from '../context/ThemeProvider';
import { BgLight } from '../components/ui/BgLight';
import { BgDark } from '../components/ui/BgDark';
import { useAuth } from '../auth/AuthProvider';
import { FormEvent, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { APP_NAME } from '../main';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { darkMode, toggleTheme } = useTheme()
  const { setIsAuthenticated } = useAuth()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    axios.post('api_v1/login', { username, password, app: APP_NAME })
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true)
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          toast.error('Usuario o contraseña incorrectos')
        } else {
          toast.error('Error inesperado')
        }
      })
  }

  return (
    <section className='h-screen w-screen flex items-center justify-center pb-12 relative'>

      <div className='absolute top-2 right-2'>
        <BottonTheme funTheme={toggleTheme} />
      </div>

      {darkMode ? <BgDark /> : <BgLight />}

      <form className='lg:w-5/12 xl:w-4/12 2xl:w-3/12 flex flex-col border-2 border-gray-300 dark:border-gray-500 px-20 py-12 rounded-md bg-transparent/5 shadow-md'
        onSubmit={handleSubmit}>
        <figure className='flex justify-center pb-12'>
          <img src='gane.webp' alt='logo de gane' width={150} />
        </figure>
        <div className='mb-5'>
          <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white border-none'>Nombre Usuario:</label>
          <input type='text' id='username' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none' placeholder='CP*****' required value={username} onChange={(ev) => setUsername(ev.target.value)} />
        </div>
        <div className='mb-5'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white border-none'>Contraseña:</label>
          <input type='password' id='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none' placeholder='***************' required value={password} onChange={(ev) => setPassword(ev.target.value)} />
        </div>
        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Ingresar</button>
      </form>

      <Toaster position='top-right' richColors duration={5000} />
    </section>
  )
}

export default Login
