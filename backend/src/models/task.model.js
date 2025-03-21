// /models/task.model.js
import mongoose from 'mongoose';

// Definición del esquema para la tarea
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false }
},{timestamps: true});

// Crear el modelo de tarea
const Task = mongoose.model('Task', taskSchema);

export default Task;  // Exportamos el modelo de tarea
