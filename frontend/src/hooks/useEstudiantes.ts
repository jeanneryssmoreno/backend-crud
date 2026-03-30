import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Estudiante, CreateEstudianteInput, UpdateEstudianteInput } from '../types/estudiante'
import { estudianteAPI } from '../services/api'

const ESTUDIANTES_KEY = ['estudiantes']

export const useEstudiantes = () => {
  return useQuery({
    queryKey: ESTUDIANTES_KEY,
    queryFn: () => estudianteAPI.getAll(),
  })
}

export const useEstudianteById = (id: string) => {
  return useQuery({
    queryKey: [...ESTUDIANTES_KEY, id],
    queryFn: () => estudianteAPI.getById(id),
    enabled: !!id,
  })
}

export const useCreateEstudiante = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateEstudianteInput) => estudianteAPI.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ESTUDIANTES_KEY })
    },
  })
}

export const useUpdateEstudiante = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEstudianteInput }) =>
      estudianteAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ESTUDIANTES_KEY })
    },
  })
}

export const useDeleteEstudiante = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => estudianteAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ESTUDIANTES_KEY })
    },
  })
}
