/* componente de todas las tareas */
import React, {useEffect, useState} from "react";
import {fethTasks} from "../services/taskService";
import TaskItem from "./TaskItem";

function TaskList() {
    const [task, setTask] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const getTask = async () =>{
            try {
                const data = await fethTasks();
                setTask(data);
        } catch (error){
            setError("Hubo un problema al cargar las tareas", error);
        }
};
getTask();
}, []);

return (
    <div>
        <h2>Lista de Tareas</h2>
        {error && <p style={{color:"red"}}>{error}</p>}
        {task.length < 0 ? (
            task.map((task) => <TaskItem key={task._id} task={task} />)
        ): (
            <p>No hay tareas disponibles.</p>
        )}
    </div>
)
}

export default TaskList