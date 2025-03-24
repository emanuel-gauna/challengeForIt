/* llamada de la API */
const API_URL = "http://localhost:3000/api/tasks";

export const fetchTasks = async ()=>{
    try {
        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data.message;
} catch(error){
    console.error("Error fetching task", error);
    throw error;// relanzarmois el error para manejarlo en dodne se llame a la funcion
}
};

export const fetchTaskById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.message;
    } catch (error) {
        console.error("Error fetching task by id", error);
        throw error;// relanzarmos el error para manejarlo en donde se llame a la funcion
    }
};

export const createTask = async(task) =>{
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
                });
                if (!response.ok) {
                    throw new Error("Error al crear la tarea");
                    }
                    const data = await response.json();
                    return data.message;
                }catch(error){
                    console.error("Error creating task", error);
                    throw error;// relanzarmos el error para manejarlo en donde se llame a la funcion
                }
}

export const updateTask = async (id, task)=>{
    try {
        const response = await fetch(`${API_URL}/${id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
                });
                if(!response){
                    throw new Error("Error al actualizar la tarea");
                    }
                    const data = await response.json();
                    return data.message;
                }catch(error){
                    console.error(`Error updating task with id ${id}:`, error);
                    throw error;// relanzarmos el error para manejarlo en donde se llame a la funcion
                    }
};