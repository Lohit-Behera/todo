import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Priority = "low" | "medium" | "high"
export type TimeMode = "specific" | "duration"

export interface Todo {
  id: string
  text: string
  completed: boolean
  timeMode: TimeMode
  startTime: string
  endTime: string
  durationHours: string
  durationMinutes: string
  priority: Priority
}

interface TodosState {
  todos: Todo[]
}

// Load todos from localStorage if available
const loadTodosFromStorage = (): Todo[] => {
  if (typeof window !== "undefined") {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      return JSON.parse(storedTodos)
    }
  }
  return []
}

const initialState: TodosState = {
  todos: loadTodosFromStorage(),
}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{
        text: string
        timeMode: TimeMode
        startTime: string
        endTime: string
        durationHours: string
        durationMinutes: string
        priority: Priority
      }>,
    ) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        timeMode: action.payload.timeMode,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        durationHours: action.payload.durationHours,
        durationMinutes: action.payload.durationMinutes,
        priority: action.payload.priority,
      }
      state.todos.push(newTodo)
      localStorage.setItem("todos", JSON.stringify(state.todos))
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.completed = !todo.completed
        localStorage.setItem("todos", JSON.stringify(state.todos))
      }
    },
    updateTodo: (
      state,
      action: PayloadAction<{
        id: string
        text: string
        timeMode: TimeMode
        startTime: string
        endTime: string
        durationHours: string
        durationMinutes: string
        priority: Priority
      }>,
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.text = action.payload.text
        todo.timeMode = action.payload.timeMode
        todo.startTime = action.payload.startTime
        todo.endTime = action.payload.endTime
        todo.durationHours = action.payload.durationHours
        todo.durationMinutes = action.payload.durationMinutes
        todo.priority = action.payload.priority
        localStorage.setItem("todos", JSON.stringify(state.todos))
      }
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
      localStorage.setItem("todos", JSON.stringify(state.todos))
    },
    uncheckAllTodos: (state) => {
      state.todos.forEach((todo) => {
        todo.completed = false
      })
      localStorage.setItem("todos", JSON.stringify(state.todos))
    },
  },
})

export const { addTodo, toggleTodo, updateTodo, deleteTodo, uncheckAllTodos } = todosSlice.actions
export default todosSlice.reducer
