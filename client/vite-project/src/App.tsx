
import { useEffect, useState } from 'react'
import './App.css'

export interface SimpleUser {
  nombre:          string
  genero:          string
  ubicacion:       string
  correo:          string
  fechaNacimiento: string
  fotografia:      string
}

function App() {
  const [users, setUsers] = useState<SimpleUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(async res => {
        if (!res.ok) {
          throw new Error('Error al obtener los usuarios')
        }
        return res.json() as Promise<SimpleUser[]>
      })
      .then(data => setUsers(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Cargando usuarios…</p>
  if (error)   return <p className="text-red-600">Error: {error}</p>

  return (
    <>
      {
        users.map(user => (
          <div key={user.correo} className="flex flex-col items-center p-4 border rounded-lg shadow-md">
            <img src={user.fotografia} alt={user.nombre} className="w-32 h-32 rounded-full mb-4" />
            <h2 className="text-xl font-bold">{user.nombre}</h2>
            <p className="text-gray-600">{user.genero}</p>
            <p className="text-gray-600">{user.ubicacion}</p>
            <p className="text-gray-600">{user.correo}</p>
            <p className="text-gray-600">{user.fechaNacimiento}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
