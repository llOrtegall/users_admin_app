import { Link } from 'react-router-dom';

function NotFound (){
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>Not Found</h1>
        <p className='text-gray-500'>Oops! Al parecer la página no existe, o no está disponible</p>
        <Link to='/' className='text-blue-500 hover:underline'>Volver al inicio</Link>
      </div>
    </div>
  )
}

export default NotFound
