import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserListed } from '../types/User'

function UserInfo () {
  const { id } = useParams()
  const [user, setUser] = useState<UserListed>()

  useEffect(() => {
    axios.get(`/user/${id}`)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [id])

  return (
    <div>
      User info
    </div>
  )
}

export default UserInfo

