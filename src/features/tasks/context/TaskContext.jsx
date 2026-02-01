import { useReducer, useCallback } from 'react';
import { TaskContext } from './context';
import taskService from '../api/taskService';

const initialState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
  successMessage: null,
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_SUCCESS: 'SET_SUCCESS',
  CLEAR_SUCCESS: 'CLEAR_SUCCESS',
  SET_TASKS: 'SET_TASKS',
  SET_SELECTED_TASK: 'SET_SELECTED_TASK',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    case ACTIONS.SET_SUCCESS:
      return { ...state, successMessage: action.payload };
    case ACTIONS.CLEAR_SUCCESS:
      return { ...state, successMessage: null };
    case ACTIONS.SET_TASKS:
      return { ...state, tasks: action.payload, loading: false };
    case ACTIONS.SET_SELECTED_TASK:
      return { ...state, selectedTask: action.payload };
    case ACTIONS.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload], loading: false };
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        loading: false,
      };
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
}

export default function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.CLEAR_ERROR });
    try {
      const tasks = await taskService.getAllTasks();
      dispatch({ type: ACTIONS.SET_TASKS, payload: tasks });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, []);

  const fetchTaskById = useCallback(async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.CLEAR_ERROR });
    try {
      const task = await taskService.getTaskById(id);
      dispatch({ type: ACTIONS.SET_SELECTED_TASK, payload: task });
      return task;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return null;
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.CLEAR_ERROR });
    try {
      const newTask = await taskService.createTask(taskData);
      dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
      dispatch({ type: ACTIONS.SET_SUCCESS, payload: 'Task created successfully!' });
      return newTask;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return null;
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.CLEAR_ERROR });
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      dispatch({ type: ACTIONS.UPDATE_TASK, payload: updatedTask });
      dispatch({ type: ACTIONS.SET_SUCCESS, payload: 'Task updated successfully!' });
      return updatedTask;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return null;
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.CLEAR_ERROR });
    try {
      await taskService.deleteTask(id);
      dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
      dispatch({ type: ACTIONS.SET_SUCCESS, payload: 'Task deleted successfully!' });
      return true;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return false;
    }
  }, []);

  const toggleTaskComplete = useCallback(async (task) => {
    return updateTask(task.id, {
      ...task,
      isCompleted: !task.isCompleted,
    });
  }, [updateTask]);

  const setSelectedTask = useCallback((task) => {
    dispatch({ type: ACTIONS.SET_SELECTED_TASK, payload: task });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  }, []);

  const clearSuccess = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_SUCCESS });
  }, []);

  const value = {
    ...state,
    fetchTasks,
    fetchTaskById,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    setSelectedTask,
    clearError,
    clearSuccess,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
