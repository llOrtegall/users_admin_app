import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserListed } from '../types/User';
import { toast, Toaster } from 'sonner';
import axios from 'axios';

export function EditUserForm() {
  const { id } = useParams();
  const [user, setUser] = useState<UserListed>({
    id: '',
    company: '',
    createdAt: '',
    document: 0,
    lastnames: '',
    names: '',
    phone: 0,
    process: '',
    state: false,
    sub_process: '',
    updatedAt : '',
    username: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/user/${id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
        toast.error('Error al cargar los datos del usuario');
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    axios.put(`/user/${id}`, user)
      .then(res => {
        console.log(res);
        toast.success('Usuario actualizado correctamente');
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Error al actualizar el usuario');
        setLoading(false);
      });
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6'>Editar Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Nombre</label>
            <input
              type='text'
              id='name'
              name='name'
              value={user.names}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Correo Electrónico</label>
            <input
              type='email'
              id='email'
              name='email'
              value={user.email}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='role' className='block text-sm font-medium text-gray-700'>Rol</label>
            <select
              id='role'
              name='role'
              value={user.process}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            >
              <option value=''>Seleccione un rol</option>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
              <option value='guest'>Guest</option>
            </select>
          </div>
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            {loading ? 'Actualizando...' : 'Actualizar Usuario'}
          </button>
        </form>
        <Toaster position='top-right' richColors duration={5000} />
      </div>
    </div>
  );
}