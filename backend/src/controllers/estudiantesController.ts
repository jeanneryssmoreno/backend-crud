import { Request, Response } from 'express';
import { prisma } from '../index';

// GET: Obtener todos los estudiantes
export const obtenerEstudiantes = async (req: Request, res: Response) => {
  try {
    const estudiantes = await prisma.estudiante.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(estudiantes);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};

// GET: Obtener un estudiante por ID
export const obtenerEstudiantePorId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const estudiante = await prisma.estudiante.findUnique({
      where: { id },
    });

    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.json(estudiante);
  } catch (error) {
    console.error('Error al obtener estudiante:', error);
    res.status(500).json({ error: 'Error al obtener estudiante' });
  }
};

// POST: Crear un nuevo estudiante
export const crearEstudiante = async (req: Request, res: Response) => {
  try {
    const { nombre, email, telefono, nivel, especialidad, estado } = req.body;

    // Validar campos requeridos
    if (!nombre || !email) {
      return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }

    // Verificar si el email ya existe
    const existente = await prisma.estudiante.findUnique({
      where: { email },
    });

    if (existente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const nuevoEstudiante = await prisma.estudiante.create({
      data: {
        nombre,
        email,
        telefono: telefono || null,
        nivel: nivel || 'Principiante',
        especialidad: especialidad || 'Soprano',
        estado: estado || 'Activo',
      },
    });

    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(500).json({ error: 'Error al crear estudiante' });
  }
};

// PUT: Actualizar un estudiante
export const actualizarEstudiante = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { nombre, email, telefono, nivel, especialidad, estado } = req.body;

    // Verificar si el estudiante existe
    const estudiante = await prisma.estudiante.findUnique({
      where: { id },
    });

    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Si el email cambió, verificar que no esté duplicado
    if (email && email !== estudiante.email) {
      const emailExistente = await prisma.estudiante.findUnique({
        where: { email },
      });
      if (emailExistente) {
        return res.status(400).json({ error: 'El email ya está en uso' });
      }
    }

    const estudianteActualizado = await prisma.estudiante.update({
      where: { id },
      data: {
        nombre: nombre || estudiante.nombre,
        email: email || estudiante.email,
        telefono: telefono !== undefined ? telefono : estudiante.telefono,
        nivel: nivel || estudiante.nivel,
        especialidad: especialidad || estudiante.especialidad,
        estado: estado || estudiante.estado,
      },
    });

    res.json(estudianteActualizado);
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
};

// DELETE: Eliminar un estudiante
export const eliminarEstudiante = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    // Verificar si el estudiante existe
    const estudiante = await prisma.estudiante.findUnique({
      where: { id },
    });

    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    const estudianteEliminado = await prisma.estudiante.delete({
      where: { id },
    });

    res.json({
      message: 'Estudiante eliminado correctamente',
      estudiante: estudianteEliminado,
    });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
};
