import axios from "axios"

// Configuración base de la API
export const api = axios.create({
  baseURL: "https://backend-spa-petclinic.onrender.com",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json"
  }
})

// Interceptores para manejo de errores
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error("❌ API Request Error:", error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error("❌ API Response Error:", error)

    let message = "Error desconocido"
    let status = null

    if (error.code === "ECONNABORTED") {
      message =
        "El servidor está tardando en responder. Intenta nuevamente en unos segundos."
    } else if (error.response) {
      status = error.response.status
      if (status >= 500) {
        message = "Error interno del servidor. Estamos trabajando en ello."
      } else if (status === 404) {
        message = "Recurso no encontrado."
      } else {
        message = `Error del servidor: ${status}`
      }
    } else if (error.request) {
      message =
        "No se pudo conectar con el servidor. Revisa tu conexión o intenta más tarde."
    }

    // Inyectar detalles en el error para manejarlo desde el hook
    error.custom = { message, status }
    return Promise.reject(error)
  }
)
