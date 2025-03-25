/* peticiones http separadas pediendo la logica desde la capa de servicios */
import mongoose from "mongoose";
import Task from  "../models/task.model.js";
import {  sendCreated, 
    sendSuccess, 
    sendNotFound, 
    sendBadRequest, 
    sendServerError  } from "../utils/responseHelper.js"
/* import  * as taskServices from "../services/task.service.js"; */


/* crear nueva tarea */
export const createTask = async (req, res)=>{
    const {title , description, completed = false } = req.body;
    if( !title || !description){
        return sendBadRequest(res, "Falta campos obligatorios: titulo o descripcion");
    }
    try{
        const newTask = new Task(req.body);
        /* sino se pasa el dato completed se asume que es false */
        const savedTask = await newTask.save();
        sendCreated(res, "tarea creada con exito", savedTask);
    }catch(error){
        sendServerError(res, "Error al crear tarea", error.message);
    }
};
/* obtener todas las tareas */
export const getTasks = async (req, res) =>{
    try{
        const tasks = await Task.find();
        const taskCount = await Task.countDocuments()
        return sendSuccess(res, tasks, `Total de tareas: ${taskCount}`);
        }catch(error){
            console.error("Error al obtener las tareas:", error);
            sendServerError(res, "Error al obtener las tareas");
        }
};
/* obtener tarea por id */
export const getTaskById = async(req, res)=>{
    try {
        const taskId = req.params.id;
        /* validar si el id es valido */
        if(!mongoose.Types.ObjectId.isValid(taskId)){
            return sendBadRequest(res, "ID de tarea invalido", )
        }
        const task = await Task.findById(taskId);
        if(!task){
            return sendNotFound(res, "Tarea no encontrada");
        }
        sendSuccess(res, task , "tarea obtenida con exito");
    } catch (error) {
        sendServerError(res, "Error al obtener la tarea", error.message, );
    }
};
/* Actualizar tarea */
export const updateTask = async (req,res) =>{
    try {
        const taskId = req.params.id;
        /* validar si el id es valido */
        if(!mongoose.Types.ObjectId.isValid(taskId)){
            return sendBadRequest(res, "ID de tarea invalido");
            }
            /* Actualizar la tarea */
            const task = await Task.findByIdAndUpdate(taskId, req.body, {new: true});
            if(!task){
                return sendNotFound(res,"Tarea no encontrada");
                }
                return sendSuccess(res, "Tarea actualizada con exito", task);
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        return sendServerError(res,"Error al actualizar la tarea, inténtelo más tarde");
    }
};
/* eliminar tarea */
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id; //buscar por id en params
        /* verificar si el id es valido */ 
        if(!mongoose.Types.ObjectId.isValid(taskId)){
            return sendBadRequest(res, "ID de tarea invalido");
        }
        /* eliminar la tarea */
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if(!deletedTask){
            return sendNotFound(res, "Tarea no encontrada");
        }
        return sendSuccess(res, deletedTask, "Tarea eliminada con exito");
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        return sendServerError(res, "Error al eliminar la tarea, inténtelo más tarde");
    }
}
