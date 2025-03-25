import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTask, updateTask, fetchTaskById } from "../services/taskService";

function TaskForm() {
  const [task, setTask] = useState({ title: "", description: "", completed: false });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getTask = async () => {
        try {
          const data = await fetchTaskById(id);
          if (data) {
            setTask(data);
          } else {
            setError("La tarea no existe.");
          }
        } catch (error) {
          setError("Hubo un problema al cargar la tarea.");
        }
      };
      getTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTask(id, task);
      } else {
        await createTask(task);
      }
      navigate("/");
    } catch (error) {
      setError("Hubo un problema al guardar la tarea.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-gradient-to-br from-white via-gray-100 to-white p-8 rounded-3xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        {id ? "Editar Tarea" : "Crear Nueva Tarea"}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Título:</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="mt-1 p-3 w-full border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="Ejemplo: Comprar materiales..."
          />
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Descripción:</label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="mt-1 p-3 w-full border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none h-32"
            placeholder="Describe la tarea con más detalle..."
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => setTask({ ...task, completed: e.target.checked })}
            className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-400"
          />
          <label className="text-base font-medium text-gray-700">¿Tarea completada?</label>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-500 text-white text-lg rounded-xl hover:bg-blue-600 transition transform hover:scale-105 shadow-md"
          >
            {id ? "Actualizar Tarea" : "Crear Tarea"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
