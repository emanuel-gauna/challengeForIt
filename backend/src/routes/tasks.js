import express from 'express';  // Usamos 'import' para importar 'express'
const router = express.Router();  // Creamos el router de Express

/* task routes */
router.get('/tasks', (req, res, next) => {
  res.send('Obtener todas las tareas');
});

router.post('/tasks', (req, res, next) => {
  res.send('Crear una nueva tarea');
});

router.put('/tasks/:id', (req, res, next) => {
  res.send(`Actualizar tarea con ID ${req.params.id}`);
});

router.delete('/tasks/:id', (req, res, next) => {
  res.send(`Eliminar tarea con ID ${req.params.id}`);
});

export default router;  // Usamos 'export default' para exportar el router
