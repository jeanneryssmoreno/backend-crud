export interface Estudiante {
  id: string
  nombre: string
  email: string
  telefono?: string
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado'
  especialidad: 'Soprano' | 'Contralto' | 'Tenor' | 'Bajo'
  fechaInscripcion: string
  estado: 'Activo' | 'Inactivo'
  createdAt: string
  updatedAt: string
}

export interface CreateEstudianteInput {
  nombre: string
  email: string
  telefono?: string
  nivel?: 'Principiante' | 'Intermedio' | 'Avanzado'
  especialidad?: 'Soprano' | 'Contralto' | 'Tenor' | 'Bajo'
  estado?: 'Activo' | 'Inactivo'
}

export interface UpdateEstudianteInput {
  nombre?: string
  email?: string
  telefono?: string
  nivel?: 'Principiante' | 'Intermedio' | 'Avanzado'
  especialidad?: 'Soprano' | 'Contralto' | 'Tenor' | 'Bajo'
  estado?: 'Activo' | 'Inactivo'
}
