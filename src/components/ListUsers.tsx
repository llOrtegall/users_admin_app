import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserListed } from '../types/User';
import axios from 'axios';

function ListUsers() {
  const [users, setUsers] = useState<UserListed[]>([])
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/users')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      return user.document.toString().includes(search.toLocaleLowerCase()) || user.names.toLowerCase().includes(search.toLocaleLowerCase())
    })
  }, [users, search])

  const handleUserInfo = (document: number) => {
    console.log(document)
    navigate(`/users/${document}`)
  }

  return (
    <main>
      <div className='max-w-md mx-auto'>
        <label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>Buscar</label>
        <div className='relative'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
            </svg>
          </div>
          <input type='search' id='default-search' className='outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='1118415127  -  Pepito perez' required value={search} onChange={ev => setSearch(ev.target.value)} />
        </div>
      </div>

      <section className='h-[80vh] overflow-y-auto mt-1'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-sm'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th className='px-6 py-3'>N°</th>
              <th className='px-6 py-3'>N° Documento</th>
              <th className='px-6 py-3'>nombres</th>
              <th className='px-6 py-3'>apellidos</th>
              <th className='px-6 py-3'>empresa</th>
              <th className='px-6 py-3'>proceso</th>
              <th className='px-6 py-3'>estado</th>
              <th className='px-6 py-3 text-center'>Opciones</th>
            </tr>
          </thead>

          <tbody>
            {
              filteredUsers?.map((user, index) =>
                <tr key={user.document} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td className='px-3'>
                    {index + 1}
                  </td>
                  <td className='px-3'>
                    {user.document}
                  </td>
                  <td className='px-3'>
                    {user.names}
                  </td>
                  <td className='px-3'>
                    {user.lastnames}
                  </td>
                  <td className='px-3'>
                    {user.company.split('Y').join(' & ')}
                  </td>
                  <td className='px-3'>
                    {user.process}
                  </td>
                  <td className='px-3'>
                    {
                      user.state
                        ? <span className='bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>Activo</span>
                        : <span className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>Inactivo</span>
                    }
                  </td>
                  <td className='px-6 py-4 flex gap-2 justify-center text-black dark:text-white'>
                    <button
                      onClick={() => handleUserInfo(user.document)}
                      className='rounded-md dark:hover:bg-green-500 dark:bg-green-700 bg-green-300 py-1 px-2 hover:bg-green-500 hover:text-white transition-all'>
                      Ver Info
                    </button>
                    <button
                      onClick={() => navigate(`/users/edit/${user.document}`)}
                      className='rounded-md dark:hover:bg-yellow-500 dark:bg-yellow-600 bg-yellow-200 py-1 px-2 hover:bg-yellow-400 hover:text-white transition-all'>
                      Editar
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    </main>

  )
}

export default ListUsers
