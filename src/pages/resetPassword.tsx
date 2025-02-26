import { URL_API_LOGIN } from '../utils/contants'
import { Toaster, toast } from 'sonner';
import React, { useState } from 'react';
import axios from 'axios';

export default function ResetPassword() {
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');

  const [steps, setSteps] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post(`${URL_API_LOGIN}/auth/forgot-password`, { document, email })
      .then(res => {
        console.log(res);
        toast.success('Solicitud Enviada', { description: 'Por favor revisa tu correo para continuar con el proceso' });
        setTimeout(() => {
          setSteps(2);
        }, 2000);
      })
      .catch(error => {
        if (error.response.status === 400) {
          toast.error('Validar Datos Ingresados', { description: `${error.response.data.message}` });
        }
      });
  };

  return (
    <div className='flex min-h-screen bg-gray-100 p-2 justify-center'>

      <div className='px-2'>
        <div className='h-full w-2 overflow-hidden rounded-md bg-gray-300'>
          <div
            className='h-full bg-blue-600'
            style={{ height: 'calc(100% * 1 / 3)' }}
          >
          </div>
        </div>
      </div>

      <div className='p-8 flex flex-col justify-center items-center pb-20'>
        {
          steps === 1 && (
            <div className='bg-blue-200 px-8 py-4 border border-gray-200 rounded-lg'>
              <h1 className='text-xl font-bold mb-4'>Recuperación Contraseña</h1>
              <form onSubmit={handleSubmit} className=''>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    N° Documento
                  </label>
                  <input
                    type='text'
                    id='document'
                    placeholder='1118********'
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Correo Electronico
                  </label>
                  <input
                    type='email'
                    id='email'
                    placeholder='correo@grupoempresarial.com.co'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    required
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Enviar Solicitud
                </button>
              </form>
            </div>
          )
        }
        {
          steps === 2 && (
            <div className='bg-blue-200 px-8 py-4 border border-gray-200 rounded-lg'>
              <h1 className='text-xl font-bold mb-4'>Recuperación Contraseña</h1>
              <p className='text-center'>Por favor revisa tu correo electronico para continuar con el proceso</p>
            </div>
          )
        }
        {
          steps === 3 && (
            <div className='bg-blue-200 px-8 py-4 border border-gray-200 rounded-lg'>
              <h1 className='text-xl font-bold mb-4'>Recuperación Contraseña</h1>
              <form className=''>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Token de Verificación
                  </label>
                  <input
                    type='password'
                    id='password'
                    placeholder='********'
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                    '
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Nueva Contraseña
                  </label>
                  <input
                    type='password'
                    id='password'
                    placeholder='********'
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                    '
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Confirmar Contraseña
                  </label>
                  <input
                    type='password'
                    id='password'
                    placeholder='********'
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                    '
                    required
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Cambiar Contraseña
                </button>
              </form>
            </div>
          )
        }
      </div>

      <Toaster
        position='bottom-right'
        visibleToasts={3}
        richColors
        closeButton
      />

    </div>
  );
}