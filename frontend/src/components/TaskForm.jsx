// src/components/TaskForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTask, updateTask, fetchTaskById } from "../services/taskService";

function TaskForm() {
  const [task, setTask] = useState({ title: "", description: "", completed: false });
  const [error, setError] = useState(null); // Para manejar errores
  const [loading, setLoading] = useState(false); // Estado de carga
  const { id } = useParams(); // Obtener el id de la URL
  const navigate = useNavigate(); // Usar navigate para redirigir

  // Cargar la tarea si estamos en modo edición
  useEffect(() => {
    if (id) {
      const getTask = async () => {
        try {
          setLoading(true);
          const data = await fetchTaskById(id);
          if (data) {
            setTask(data); // Establecer los datos de la tarea
          } else {
            setError("La tarea no existe.");
          }
        } catch (error) {
          setError("Hubo un problema al cargar la tarea.", error);
        } finally {
          setLoading(false);
        }
      };
      getTask();
    }
  }, [id]);

  // Manejo de la creación y edición de la tarea
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    // Validación de campos obligatorios
    if (!task.title || !task.description) {
      setError("El título y la descripción son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      if (id) {
        await updateTask(id, task); // Actualizar la tarea si estamos en edición
      } else {
        await createTask(task); // Crear una nueva tarea si no hay id
      }
      navigate("/"); // Redirigir a la lista de tareas después de guardar
    } catch (error) {
      setError("Hubo un problema al guardar la tarea.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? "Editar Tarea" : "Nueva Tarea"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar el error */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>
        <div>
          <label>
            Completado:
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => setTask({ ...task, completed: e.target.checked })}
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
      {loading && <p>Cargando...</p>} {/* Mostrar mensaje de carga */}
    </div>
  );
}

export default TaskForm;
