import { useState, useCallback, useEffect } from 'react';
import { useTaskContext } from './useTaskContext';

export function useTaskPresenter() {
  const {
    tasks,
    selectedTask,
    loading,
    error,
    successMessage,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    setSelectedTask,
    clearError,
    clearSuccess,
  } = useTaskContext();

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteConfirmStep, setDeleteConfirmStep] = useState(1);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        clearSuccess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccess]);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.isCompleted) ||
      (filter === 'pending' && !task.isCompleted);

    const matchesSearch =
      searchTerm === '' ||
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.isCompleted).length,
    pending: tasks.filter((t) => !t.isCompleted).length,
    completionRate: tasks.length > 0 
      ? Math.round((tasks.filter((t) => t.isCompleted).length / tasks.length) * 100) 
      : 0,
  };

  const handleOpenCreateForm = useCallback(() => {
    setSelectedTask(null);
    setEditMode(false);
    setShowForm(true);
  }, [setSelectedTask]);

  const handleOpenEditForm = useCallback((task) => {
    setSelectedTask(task);
    setEditMode(true);
    setShowForm(true);
  }, [setSelectedTask]);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditMode(false);
    setSelectedTask(null);
  }, [setSelectedTask]);

  const handleSubmitForm = useCallback(async (formData) => {
    let result;
    if (editMode && selectedTask) {
      result = await updateTask(selectedTask.id, formData);
    } else {
      result = await createTask(formData);
    }
    if (result) {
      handleCloseForm();
    }
    return result;
  }, [editMode, selectedTask, createTask, updateTask, handleCloseForm]);

  const handleToggleComplete = useCallback(async (task) => {
    await toggleTaskComplete(task);
  }, [toggleTaskComplete]);

  const handleRequestDelete = useCallback((task) => {
    setTaskToDelete(task);
    setDeleteConfirmStep(1);
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDeleteStep1 = useCallback(() => {
    setDeleteConfirmStep(2);
  }, []);

  const handleConfirmDeleteStep2 = useCallback(async () => {
    if (taskToDelete) {
      const result = await deleteTask(taskToDelete.id);
      if (result) {
        setShowDeleteModal(false);
        setTaskToDelete(null);
        setDeleteConfirmStep(1);
      }
    }
  }, [taskToDelete, deleteTask]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
    setDeleteConfirmStep(1);
  }, []);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    selectedTask,
    loading,
    error,
    successMessage,
    stats,
    showForm,
    editMode,
    showDeleteModal,
    taskToDelete,
    deleteConfirmStep,
    filter,
    searchTerm,
    handleOpenCreateForm,
    handleOpenEditForm,
    handleCloseForm,
    handleSubmitForm,
    handleToggleComplete,
    handleRequestDelete,
    handleConfirmDeleteStep1,
    handleConfirmDeleteStep2,
    handleCancelDelete,
    setFilter,
    setSearchTerm,
    clearError,
    clearSuccess,
    refreshTasks: fetchTasks,
  };
}

export default useTaskPresenter;
