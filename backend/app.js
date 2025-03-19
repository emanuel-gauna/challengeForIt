import createError from 'http-errors';  // Usamos 'import' para importar 'http-errors'
import express from 'express';  // Usamos 'import' para importar 'express'
import path from 'path';  // Usamos 'import' para importar 'path'
import cookieParser from 'cookie-parser';  // Usamos 'import' para importar 'cookie-parser'
import logger from 'morgan';  // Usamos 'import' para importar 'morgan'
import mongoose from 'mongoose';  // Usamos 'import' para importar 'mongoose'
import {DB_URI}   from './config/config.js';

import indexRouter from './routes/index.js';  // Usamos 'import' para importar el router de index
import taskRouter from './routes/tasks.js';  // Usamos 'import' para importar el router de tasks

const app = express();  // Creamos la aplicación Express

// view engine setup
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

// Conectar a MongoDB con Mongoose
mongoose.connect(DB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión:', err));

/* rutas */
app.use('/', indexRouter);
app.use(taskRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;  // Usamos 'export default' para exportar la app
