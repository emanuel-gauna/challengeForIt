import express from 'express';  // Usamos 'import' para importar 'express'
const router = express.Router();  // Creamos el router de Express

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

export default router;  // Usamos 'export default' para exportar el router
