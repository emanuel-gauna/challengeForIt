import React, { useState, useEffect } from 'react';
import { fetchTaskById } from '../services/taskService';

const TaskItem = ({ taskId }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const getTask = async () => {
      try {
        const fetchedTask = await fetchTaskById(taskId);
        setTask(fetchedTask);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    if (taskId) {
      getTask();
    }
  }, [taskId]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button>Edit Task</button>
    </div>
  );
};

export default TaskItem;
