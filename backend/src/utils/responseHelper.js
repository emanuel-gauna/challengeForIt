
/*mensajes de respuesta de las peticiones http */
export const sendCreated = (res, message = "Recurso creado con éxito", data = null ) => {
    return res.status(201).json({
      status: 201,
      message,
      data
    });
  };
  
  export const sendSuccess = (res, data, message = "Operación exitosa") => {
    return res.status(200).json({
      status: 200,
      message: message,
      data: data
    });
  };
  
  export const sendNotFound = (res, message = "Recurso no encontrado") => {
    return res.status(404).json({
      status: 404,
      message,
    });
  };
  
  export const sendBadRequest = (res, message = "Solicitud incorrecta") => {
    return res.status(400).json({
      status: 400,
      message,
    });
  };
  
  export const sendServerError = (res, message = "Error interno del servidor", error = null) => {
    return res.status(500).json({
      status: 500,
      message,
      error,
    });
  };
  