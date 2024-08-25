import axios from 'axios';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Procces = [
  { id: 1, name: 'Técnologia' },
  { id: 2, name: 'Financiero' },
  { id: 3, name: 'Contabilidad' },
  { id: 4, name: 'Comercial' },
  { id: 5, name: 'Administración' },
  { id: 6, name: 'Gestión Humana' },
  { id: 7, name: 'Gerencia' },
  { id: 8, name: 'Tesoreria' },
  { id: 9, name: 'Auditoria' },
  { id: 10, name: 'Cumplimiento' },
  { id: 11, name: 'Operaciones' },
  { id: 12, name: 'Legal' },
  { id: 13, name: 'Mercadeo' }
]

const SubProcces = [
  { id: 1, name: 'Soporte' },
  { id: 2, name: 'Coordinador Soporte' },
  { id: 3, name: 'Cartera' },
  { id: 4, name: 'Aux Contable' },
  { id: 5, name: 'Aux Administrativo' },
  { id: 6, name: 'Aux Cartera' },
  { id: 7, name: 'Sub Proceso 7' },
  { id: 8, name: 'Sub Proceso 8' },
  { id: 9, name: 'Sub Proceso 9' },
  { id: 10, name: 'Sub Proceso 10' },
  { id: 11, name: 'Sub Proceso 11' }
]

function CreateNewUser() {
  const navigate = useNavigate();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const data = {
      names: formData.get('names') as string,
      lastNames: formData.get('lastNames') as string,
      document: formData.get('document') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      process: formData.get('process') as string,
      sub_process: formData.get('sub_process') as string
    }
    
    axios.post('/register', data)
      .then(res => {
        if(res.status === 201){
          toast.success('Usuario creado correctamente');
          // Limpiar campos
          ev.currentTarget.reset();
          setTimeout(() => {
            navigate('/users/list');
          }, 5000);
        }
      })
      .catch(err => {
        if(err.response.status === 400){
          toast.error('Error al crear el usuario', { description: err.response.data.error || 'Error desconocido consulte admin' });
        }
      })
  }

  return (
    <div>
      <h1 className='text-center py-2 font-bold text-2xl text-gray-700'>Create New User</h1>

      <form className='max-w-md mx-auto pt-12' onSubmit={ev => handleSubmit(ev)}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-5 group'>
            <Input type='text' name='names' id='names' placeholder=' '  />
            <Label >Nombres</Label>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <Input type='text' name='lastNames' id='lastNames' placeholder=' ' />
            <Label >Apellidos</Label>
          </div>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <Input type='number' name='document' id='document' placeholder=''  />
          <Label>N° Documento</Label>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-5 group'>
            <Input type='number' name='phone' id='phone' placeholder=' '  />
            <Label>N° Celular (123-456-7890)</Label>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <select id='company' name='company' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option >Seleccione Empresa</option>
              <option value={0}>Multired Y Servired</option>
              <option value={1}>Multired</option>
              <option value={2}>Servired</option>
            </select>
          </div>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <Input type='email' name='email' id='email' placeholder=''  />
          <Label >Correo Electronico</Label>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-5 group'>
            <select id='process' name='process' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option>Seleccione Proceso</option>
              {Procces.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <select id='sub_process' name='sub_process' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option>Seleccione Sub-Proceso</option>
              {SubProcces.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option> 
              ))}
            </select>
          </div>

          <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Crear Nuevo Usurio</button>
        </div>

      </form>

    </div>
  );
}

export default CreateNewUser;
