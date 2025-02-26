import { URL_API_LOGIN } from '../utils/contants'
import { Toaster, toast } from 'sonner';
import React, { useState } from 'react';
import axios from 'axios';

function Calculate(step: number, totalSteps: number = 4): string {
  if (step < 1 || step > totalSteps) {
    throw new Error(`Step must be between 1 and ${totalSteps}`);
  }
  return `calc(100% * ${step} / ${totalSteps})`;
}

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
        <div className='h-full w-2 overflow-hidden rounded-md bg-gray-300 transition-all duration-300 ease-in-out'>
          <div
            className='h-full bg-blue-600 transition-all duration-500 ease-in-out'
            style={{ height: `${Calculate(steps)}` }}
          >
          </div>
        </div>
      </div>

      <div className='p-8 flex flex-col justify-center items-center pb-20'>
        {
          steps === 1 && (
            <div className='w-[450px] bg-slate-200 px-8 py-6 rounded-lg border border-gray-300 shadow-lg'>
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
            <div className='w-[450px] bg-slate-200 px-8 py-6 rounded-lg border border-gray-300 shadow-lg'>
              <h1 className='text-xl font-bold mb-4'>Recuperación Contraseña</h1>
              <p className=''>Por favor revisa tu correo electronico donde se recepcionará un código válido por 10 min para continuar el restablecimiento de contraseña.</p>


              <button
                onClick={() => setSteps(3)}
                className='w-full bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4'
              >
                Código Verificación Recibido
              </button>

              <p className='text-sm mt-4 text-center'>
                <span className='font-bold'>Nota: </span>Si no recibes el correo en tu bandeja de entrada, por favor revisa la bandeja de spam o correo no deseado.

              </p>


              <button
                onClick={() => setSteps(1)}
                className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4'
              >
                Volver a Solcitar Código
              </button>
            </div>
          )
        }
        {
          steps === 3 && (
            <div className='w-[450px] bg-slate-200 px-8 py-6 rounded-lg border border-gray-300 shadow-lg'>
              <h1 className='text-xl font-bold mb-4'>Recuperación Contraseña</h1>
              <form className=''>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Token Verificación
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
        {
          steps === 4 && (
            <div className='w-[450px] bg-green-200 px-8 py-6 rounded-lg border border-gray-300 shadow-lg'>
              <h1 className='text-xl font-bold mb-4'>Recuperación Contraseña</h1>
              <p className=''>Tu contraseña ha sido cambiada exitosamente. ya puedes ingresar en los diferentes aplicativos en la cual estás credenciales sean requeridas.</p>
            </div>
          )
        }
      </div>

      <Toaster
        position='top-right'
        visibleToasts={3}
        richColors
        closeButton
      />

    </div>
  );
}