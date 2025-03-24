// src/components/TaskForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTask, updateTask, fetchTaskById } from "../services/taskService";

function TaskForm() {
  const [task, setTask] = useState({ title: "", description: "", completed: false });
  const [error, setError] = useState(null); // Para manejar errores
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getTask = async () => {
        try {
          const data = await fetchTaskById(id);
          setTask(data);
        } catch (error) {
          setError("Hubo un problema al cargar la tarea." , error);
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
      setError("Hubo un problema al guardar la tarea.", error);
    }
  };

  return (
    <div>
      <h2>{id ? "Editar Tarea" : "Nueva Tarea"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar el error */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>
        <div>
          <label>
            Completed:
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => setTask({ ...task, completed: e.target.checked })}
            />
          </label>
        </div>
        <button type="submit">{id ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
}

export default TaskForm;
