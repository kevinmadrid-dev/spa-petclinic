import { createContext, useContext, useReducer } from "react"

// Estados iniciales
const initialState = {
  user: null,
  favorites: [],
  theme: "light",
  notifications: []
}

// Tipos de acciones
export const actionTypes = {
  SET_USER: "SET_USER",
  ADD_FAVORITE: "ADD_FAVORITE",
  REMOVE_FAVORITE: "REMOVE_FAVORITE",
  TOGGLE_THEME: "TOGGLE_THEME",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION"
}

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload }

    case actionTypes.ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }

    case actionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload)
      }

    case actionTypes.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light"
      }

    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            ...action.payload
          }
        ]
      }

    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload)
      }

    default:
      return state
  }
}

// Contexto
const AppContext = createContext()

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const value = {
    state,
    dispatch,
    // Actions helpers
    setUser: (user) => dispatch({ type: actionTypes.SET_USER, payload: user }),
    addFavorite: (postId) =>
      dispatch({ type: actionTypes.ADD_FAVORITE, payload: postId }),
    removeFavorite: (postId) =>
      dispatch({ type: actionTypes.REMOVE_FAVORITE, payload: postId }),
    toggleTheme: () => dispatch({ type: actionTypes.TOGGLE_THEME }),
    addNotification: (notification) =>
      dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: notification }),
    removeNotification: (id) =>
      dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id })
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext debe ser usado dentro de AppProvider")
  }
  return context
}
