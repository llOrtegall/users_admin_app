import { useAuth } from '../auth/AuthProvider'
import { FormEvent, useState } from 'react'
import { toast, Toaster } from 'sonner'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { setIsAuthenticated } = useAuth()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    axios.post('/login', { username, password, app: 'web-test' })
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true)
        }
      })
      .catch((err) => {
        if (err.response.status === 400){
          toast.error(err.response.data || 'Error')
        }
      })
  }

  return (
    <section className='h-screen w-screen flex items-center justify-center'>
      <form className='w-96 flex flex-col' onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900'>Nombre Usuario:</label>
          <input type='text' id='username' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='CP*****' required value={username} onChange={(ev) => setUsername(ev.target.value)} />
        </div>
        <div className='mb-5'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>Contraseña:</label>
          <input type='password' id='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500' required value={password} onChange={(ev) => setPassword(ev.target.value)} />
        </div>
        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Ingresar</button>
      </form>

      <Toaster position='top-right' richColors duration={5000} />
    </section>
  )
}

export default Login
