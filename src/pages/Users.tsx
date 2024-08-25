import { NavLink, Outlet } from "react-router-dom";

function UsersPage () {
  return (
    <main className='cont_main flex'>
      <nav className='w-2/12 px-4 bg-transparent/10 dark:text-white'>
        <h1 className='text-center py-2 font-semibold'>Acciones</h1>
        <ul>
          <li className='py-1 border-b border-gray-500'>
            <NavLink to='/users/create'>Crear usuario</NavLink>
          </li>
          <li className='py-1 border-b border-gray-500'>
            <NavLink to='/users/list'>Listar usuarios</NavLink>
          </li>
        </ul>
      </nav>
      <section className='w-full p-1'>
        { <Outlet /> }
      </section>
    </main>
  )
}

export default UsersPage;