// src/components/TaskList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTasks, deleteTask } from "../services/taskService";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Cargar las tareas
  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    getTasks();
  }, []);

  // Eliminar tarea
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);  // Llamada al servicio para eliminar la tarea
      setTasks(tasks.filter((task) => task._id !== id)); // Actualizar el estado después de la eliminación
    } catch (error) {
      console.error("No se pudo eliminar la tarea", error);
    }
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <label>
              <input type="checkbox" checked={task.completed} readOnly />
              Completada
            </label>
            <div>
              <Link to={`/task/edit/${task._id}`}>
                <button>Editar</button>
              </Link>
              <button onClick={() => handleDelete(task._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/new-task">
        <button>Crear Nueva Tarea</button>
      </Link>
    </div>
  );
}

export default TaskList;
