// src/routes/taskRoutes.js
import express from 'express';
import { createTask, getTaskById, getTasks, updateTask, deleteTask } from '../controllers/task.controller.js';

const router = express.Router();

// Definir las rutas para las tareas
router.post('/tasks', createTask); // Crear tarea
router.get('/tasks', getTasks); // Obtener todas las tareas
router.get('/tasks/:id', getTaskById); // Obtener tarea por id
router.put('/tasks/:id', updateTask); // Actualizar tarea
router.delete('/tasks/:id', deleteTask); // Eliminar tarea

export default router;
