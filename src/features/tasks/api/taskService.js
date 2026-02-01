import axiosClient from '../../../api/axiosClient';

const TASKS_ENDPOINT = '/tasks';

const taskService = {
  /**
   * @returns {Promise<Array>}
   */
  getAllTasks: async () => {
    const response = await axiosClient.get(TASKS_ENDPOINT);
    return response?.data?.tasks || response?.tasks || response || [];
  },

  /**
   * @param {number|string} id
   * @returns {Promise<Object>}
   */
  getTaskById: async (id) => {
    const response = await axiosClient.get(`${TASKS_ENDPOINT}/${id}`);
    return response?.data?.task || response?.task || response;
  },

  /**
   * @param {Object} taskData
   * @param {string} taskData.title
   * @param {string} taskData.description
   * @returns {Promise<Object>}
   */
  createTask: async (taskData) => {
    const response = await axiosClient.post(TASKS_ENDPOINT, {
      title: taskData.title,
      description: taskData.description,
    });
    return response?.data?.task || response?.task || response;
  },

  /**
   * @param {number|string} id
   * @param {Object} taskData
   * @param {string} taskData.title
   * @param {string} taskData.description
   * @param {boolean} taskData.isCompleted
   * @returns {Promise<Object>}
   */
  updateTask: async (id, taskData) => {
    const response = await axiosClient.put(`${TASKS_ENDPOINT}/${id}`, {
      title: taskData.title,
      description: taskData.description,
      isCompleted: taskData.isCompleted,
    });
    return response?.data?.task || response?.task || response;
  },

  /**
   * @param {number|string} id
   * @returns {Promise<void>}
   */
  deleteTask: async (id) => {
    return axiosClient.delete(`${TASKS_ENDPOINT}/${id}`);
  },
};

export default taskService;
