import axios from 'axios';

const API_URL = 'http://localhost:5189/api/Job';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    return { headers: { Authorization: `Bearer ${token}` } };
};  

const handleError = (error) => {
    if (error.response) {
        console.error("Backend error response:", error.response);
        if (error.response.data && error.response.data.errors) {
            console.error("Validation Errors:", error.response.data.errors);
        }
        alert(`Error: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
        console.error("No response from server:", error.request);
        alert("Error: No response from server. Please try again later.");
    } else {
        console.error("Error in setting up request:", error.message);
        alert("An error occurred while creating the job. Please try again later.");
    }
};

const JobService = {
  getJobs: async (jobId) => {
    try {
      const response = await axios.get(`${API_URL}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleError(error, 'Loading jobs');
    }
  },

  createJob: async (jobData) => {
    try {
      const response = await axios.post(API_URL, jobData, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleError(error, 'Creating job');
    }
  },

  updateJob: async (jobId, jobData) => {
    try {
      const response = await axios.put(`${API_URL}/${jobId}`, jobData, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleError(error, 'Updating job');
    }
  },

  deleteJob: async (jobId) => {
    try {
      await axios.delete(`${API_URL}/${jobId}`, getAuthHeaders());
    } catch (error) {
      handleError(error, 'Deleting job');
    }
  }
};

export default JobService;
