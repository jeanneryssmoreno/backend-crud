import axios from 'axios'
import { Estudiante, CreateEstudianteInput, UpdateEstudianteInput } from '../types/estudiante'

const API_BASE_URL = '/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const estudianteAPI = {
  getAll: async (): Promise<Estudiante[]> => {
    const { data } = await apiClient.get('/estudiantes')
    return data
  },

  getById: async (id: string): Promise<Estudiante> => {
    const { data } = await apiClient.get(`/estudiantes/${id}`)
    return data
  },

  create: async (input: CreateEstudianteInput): Promise<Estudiante> => {
    const { data } = await apiClient.post('/estudiantes', input)
    return data
  },

  update: async (id: string, input: UpdateEstudianteInput): Promise<Estudiante> => {
    const { data } = await apiClient.put(`/estudiantes/${id}`, input)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/estudiantes/${id}`)
  },
}
