import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTasks, deleteTask } from "../services/taskService";

function TaskList() {
  const [tasks, setTasks] = useState([]);

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
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Actualizar el estado después de la eliminación
    } catch (error) {
      console.error("No se pudo eliminar la tarea", error);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Lista de Tareas</h2>
      <ul className="space-y-6">
        {tasks.map((task) => (
          <li key={task._id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition transform hover:scale-105 duration-300 bg-sky-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{task.title}</h3>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <label className="flex items-center gap-2 mb-4">
              <input type="checkbox" checked={task.completed} readOnly className="accent-green-500 w-5 h-5" />
              <span className={task.completed ? "text-green-600 font-semibold" : "text-gray-500"}>Completada</span>
            </label>
            <div className="flex gap-4">
              <Link to={`/task/edit/${task._id}`}>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-xl transition">
                  Editar
                </button>
              </Link>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link to="/new-task">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl transition shadow-lg">
            Crear Nueva Tarea
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TaskList;
