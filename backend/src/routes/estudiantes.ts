import { Router } from 'express';
import {
  obtenerEstudiantes,
  obtenerEstudiantePorId,
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
} from '../controllers/estudiantesController';

const router = Router();

// Rutas CRUD
router.get('/', obtenerEstudiantes);
router.get('/:id', obtenerEstudiantePorId);
router.post('/', crearEstudiante);
router.put('/:id', actualizarEstudiante);
router.delete('/:id', eliminarEstudiante);

export default router;
