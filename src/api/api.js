import axios from "axios"

// Configuración base de la API
export const api = axios.create({
  baseURL: "https://backend-spa-petclinic.onrender.com",
  timeout: 5000,
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

    if (error.code === "ECONNABORTED") {
      error.message = "La solicitud tardó demasiado tiempo"
    } else if (error.response?.status === 404) {
      error.message = "Recurso no encontrado"
    } else if (error.response?.status >= 500) {
      error.message = "Error del servidor"
    } else if (!error.response) {
      error.message = "Error de conexión"
    }

    return Promise.reject(error)
  }
)
