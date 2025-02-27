import { Toaster, toast } from 'sonner';
import React, { useState } from 'react';
import axios from 'axios';

function Calculate(step: number, totalSteps: number = 4): string {
  if (step < 1 || step > totalSteps) {
    throw new Error(`Step must be between 1 and ${totalSteps}`);
  }
  return `calc(100% * ${step} / ${totalSteps})`;
}

function CalculateColorProgress(step: number): string {
  if (step === 1) return 'bg-red-400';
  if (step === 2) return 'bg-orange-300';
  if (step === 3) return 'bg-blue-500';
  if (step === 4) return 'bg-green-600';
  return 'bg-gray-400';
}

export default function ResetPassword() {
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');

  const [loader, setLoader] = useState<boolean>(false);

  const [steps, setSteps] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);

    axios.post('api_v1/auth/forgot-password', { document, email })
      .then(res => {
        console.log(res);
        setLoader(false);
        setSteps(2);
        toast.success('Solicitud Enviada', { description: 'Por favor revisa tu correo para continuar con el proceso' });
      })
      .catch(error => {
        setLoader(false);
        if (error.response.status === 400) {
          toast.error('Validar Datos Ingresados', { description: `${error.response.data.message}` });
        }
      });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const fields = Object.fromEntries(new window.FormData(e.target as HTMLFormElement));

    if (fields.password !== fields.confirmPassword) {
      toast.error('Error en Contraseñas', { description: 'Las contraseñas no coinciden' });
      return;
    }

    axios.post('api_v1/auth/reset-password', { token: fields.token, password: fields.password, confirmPassword: fields.confirmPassword })
      .then(res => {
        console.log(res);
        setSteps(4);
        toast.success('Contraseña Restablecida', { description: 'Tu contraseña ha sido cambiada exitosamente' });
      })
      .catch(error => {
        if (error.response.status === 400) {
          toast.error('Validar Datos Ingresados', { description: `${error.response.data.message}` });
        }
      });
  }

  return (
    <div className='flex min-h-screen bg-gray-50 p-2 justify-center'>

      <div className='flex flex-col justify-between py-12'>
        <div className={`p-12 py-10 rounded-full shadow-md ${steps === 1 ? 'bg-red-400 text-white' : 'bg-gray-100 text-gray-500'}`}>
          <span className='font-semibold'>
            1
          </span>
        </div>
        <div className={`p-12 py-10 rounded-full shadow-md ${steps === 2 ? 'bg-orange-300 text-white' : 'bg-gray-100 text-gray-500'}`}>
          <span className='font-semibold'>
            2
          </span>
        </div>
        <div className={`p-12 py-10 rounded-full shadow-md ${steps === 3 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
          <span className='font-semibold'>
            3
          </span>
        </div>
        <div className={`p-12 py-10 rounded-full shadow-md ${steps === 4 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
          <span className='font-semibold'>
            4
          </span>
        </div>
      </div>

      <div className='px-2'>
        <div className='h-full w-2.5 overflow-hidden rounded-md bg-gray-300 transition-all duration-300 ease-in-out shadow-lg border border-gray-100'>
          <div
            className={`h-full bg-blue-600 transition-all duration-500 ease-in-out ${CalculateColorProgress(steps)}`}
            style={{ height: `${Calculate(steps)}` }}
          >
          </div>
        </div>
      </div>

      <div className='p-8 flex flex-col justify-center items-center pb-20'>
        {
          steps === 1 && (
            <div className='w-[450px] bg-slate-200 px-8 py-6 rounded-lg border border-gray-300 shadow-lg relative'>
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
                  disabled={loader}
                  className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                >
                  Enviar Solicitud
                </button>
              </form>
              {
                loader && (
                  <div className='bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center me-2 items-center absolute -bottom-20 right-0 left-0 '>

                    <svg aria-hidden='true' role='status' className='inline w-6 h-6 me-4 text-blue-600 animate-spin' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='#E5E7EB' />
                      <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentColor' />
                    </svg>

                    <span>
                      Realizando Solicitud, Espere un momento
                    </span>
                  </div>
                )
              }
            </div>
          )
        }
        {
          steps === 2 && (
            <div className='w-[450px] bg-slate-200 px-8 py-6 rounded-lg border border-gray-300 shadow-lg'>
              <h1 className='text-xl font-bold mb-4'>Recuperación Contraseña</h1>
              <p className=''>Por favor revise su correo electrónico. Se le enviará un código para continuar con el proceso </p>

              <button
                onClick={() => setSteps(3)}
                className='w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4'
              >
                Código Verificación Recibido
              </button>

              <p className='text-sm mt-4 text-center'>
                <span className='font-bold'>Nota: </span>Si no recibes el correo en tu bandeja de entrada, por favor revisa la bandeja de spam o correo no deseado.

              </p>

              <button
                onClick={() => setSteps(1)}
                className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4'
              >
                Volver a Solicitar Código
              </button>
            </div>
          )
        }
        {
          steps === 3 && (
            <div className='w-[450px] bg-slate-200 px-8 py-6 rounded-lg border border-gray-300 shadow-lg'>
              <h1 className='text-xl font-bold mb-4'>Recuperación Contraseña</h1>
              <form className='' onSubmit={handleResetPassword}>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Token Verificación
                  </label>
                  <input
                    type='password'
                    id='token'
                    name='token'
                    placeholder='********'
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
                    name='password'
                    placeholder='********'
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Confirmar Contraseña
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    placeholder='********'
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    required
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                >
                  Restablecer Contraseña
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