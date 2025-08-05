import { useState, useEffect, useCallback } from "react"
import { api } from "../api/api.js"

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
      const mensaje =
        err.custom?.message || err.message || "Error al cargar los datos"
      setError(mensaje)
      console.error("Error en useApi:", err)
    } finally {
      setLoading(false)
    }
  }, [url])

  const depsKey = JSON.stringify(dependencies)

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [fetchData, immediate, depsKey])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

// Posts
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

// Post id
export const usePost = (id) => {
  return useApi(id ? `/posts/${id}` : null)
}

// Categorías
export const useCategories = () => {
  return useApi("/categorias")
}

// Categoría id
export const useCategory = (id) => {
  return useApi(id ? `/categorias?id=${id}` : null)
}
