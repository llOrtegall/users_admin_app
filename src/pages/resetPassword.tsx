import { URL_API_LOGIN } from '../utils/contants'
import { Toaster, toast } from 'sonner';
import React, { useState } from 'react';
import axios from 'axios';

export default function ResetPassword() {
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post(`${URL_API_LOGIN}/auth/forgot-password`, { document, email })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        if (error.response.status === 400) {
          toast.error('Validar Datos Ingresados', { description: `${error.response.data.message}` });
        }
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Recuperación Contraseña</h1>
        <form onSubmit={handleSubmit}>
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
      <Toaster
        position='bottom-right'
        visibleToasts={3} richColors
        closeButton
      />
    </div>
  );
}