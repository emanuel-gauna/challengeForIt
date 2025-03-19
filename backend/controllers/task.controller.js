/* peticiones http separadas pediendo la logica desde la capa de servicios */
import Task from  "../models/task.model.js";
/* import  * as taskServices from "../services/task.service.js"; */


/* crear nueva tarea */

export const createTask = async (req, res)=>{
    const {title , description, completed } = req.body;
    if( !title || !description){
        return res.status(400).json({message: "Falta titulo o descripcion"});
    }
    try{
        const newTask = new Task({title, description, completed: completed || false,

        });
        /* sino se pasa el dato completed se asume que es false */
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }catch(error){
        res.status(500).json({message: "Error al crear la tarea:" + error.message});
    }
};
