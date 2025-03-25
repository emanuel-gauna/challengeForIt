// src/components/TaskItem.jsx
import React from "react";
import { Link } from "react-router-dom";

function TaskItem({ taskId, title, description, completed, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <span className={`text-sm ${completed ? 'text-green-500' : 'text-red-500'}`}>
          {completed ? "Completada" : "Pendiente"}
        </span>
      </div>
      <div className="flex space-x-4">
        <Link
          to={`/task/edit/${taskId}`}
          className="text-blue-500 hover:text-blue-600"
        >
          Editar
        </Link>
        <button
          onClick={() => onDelete(taskId)}
          className="text-red-500 hover:text-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
