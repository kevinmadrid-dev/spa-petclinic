import { useState, useEffect, useCallback } from "react"
import { api } from "../api/api.js"

/**
 * Hook personalizado para manejar peticiones a la API
 */
export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { dependencies = [], immediate = true } = options

  const fetchData = useCallback(async () => {
    if (!url) return

    try {
      setLoading(true)
      setError(null)
      const response = await api.get(url)
      setData(response.data)
    } catch (err) {
      setError(err.message || "Error al cargar los datos")
      console.error("Error en useApi:", err)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [fetchData, immediate, ...dependencies])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

// Hooks específicos para entidades
export const usePosts = (filters = {}) => {
  let url = "/posts"

  const params = new URLSearchParams()
  if (filters.categoria) params.append("categoria", filters.categoria)
  if (filters.subcategoria) params.append("subcategoria", filters.subcategoria)

  if (params.toString()) {
    url += `?${params.toString()}`
  }

  return useApi(url, { dependencies: [filters.categoria, filters.subcategoria] })
}

export const usePost = (id) => {
  return useApi(id ? `/posts/${id}` : null)
}

export const useCategories = () => {
  return useApi("/categorias")
}

export const useCategory = (id) => {
  return useApi(id ? `/categorias?id=${id}` : null)
}
