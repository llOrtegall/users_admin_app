import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserListed } from '../types/User'

function UserInfo() {
  const { id } = useParams()
  const [user, setUser] = useState<UserListed>()

  useEffect(() => {
    axios.get(`/user/${id}`)
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [id])

  const formatDateTime = (dateTime: string) => {
    const [date, time] = dateTime.split('T');
    return { date, time: time.split('.')[0] }; // Eliminar la parte de los milisegundos
  };

  const createdAt = user?.createdAt ? formatDateTime(user.createdAt) : '';
  const updatedAt = user?.updatedAt ? formatDateTime(user.updatedAt) : '';


  return (
    <main className="p-6 ">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Información Del usuario</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700"><span className="font-bold">Nombres:</span> {user?.names}</h2>
            <h2 className="text-xl font-semibold text-gray-700"><span className="font-bold">Apellidos:</span> {user?.lastnames}</h2>
          </div>
          <div>
            <p className="text-lg text-gray-600"><span className="font-medium">Documento:</span> {user?.document}</p>
            <p className="text-lg text-gray-600"><span className="font-medium">Correo:</span> {user?.email}</p>
          </div>
          <div>
            <p className="text-lg text-gray-600"><span className="font-medium">Usuario:</span> {user?.username}</p>
            <p className="text-lg text-gray-600"><span className="font-medium">Teléfono:</span> {user?.phone}</p>
          </div>
          <div>
            <p className="text-lg text-gray-600"><span className="font-medium">Empresa:</span> {user?.company}</p>
            <p className="text-lg text-gray-600"><span className="font-medium">Proceso:</span> {user?.process}</p>
          </div>
          <div>
            <p className="text-lg text-gray-600"><span className="font-medium">Subproceso:</span> {user?.sub_process}</p>
            <p className="text-lg text-gray-600"><span className="font-medium">Estado:</span> <span className={`font-bold ${user?.state ? 'text-green-600' : 'text-red-600'}`}>{user?.state ? 'Activo' : 'Inactivo'}</span></p>
          </div>
          <div>
            <p className="text-lg text-gray-600"><span className="font-medium">Id:</span> {user?.id}</p>
            <p className="text-lg text-gray-600"><span className="font-medium">Creado:</span> <span className="text-blue-600">{createdAt ? `${createdAt.date.split('-').reverse().join('/')} - ${createdAt.time}` : ''}</span></p>
            <p className="text-lg text-gray-600"><span className="font-medium">Actualizado:</span> <span className="text-blue-600">{updatedAt ? `${updatedAt.date.split('-').reverse().join('/')} - ${updatedAt.time}` : ''}</span></p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default UserInfo

