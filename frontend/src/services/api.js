import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post('/uploads/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Announcements
export const getAnnouncements = () => api.get('/announcements');
export const createAnnouncement = (data) => api.post('/announcements', data);
export const updateAnnouncement = (id, data) => api.put(`/announcements/${id}`, data);
export const deleteAnnouncement = (id) => api.delete(`/announcements/${id}`);

// Events
export const getEvents = () => api.get('/events');
export const createEvent = (data) => api.post('/events', data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// Staff
export const getStaff = () => api.get('/staff');
export const createStaff = (data) => api.post('/staff', data);
export const updateStaff = (id, data) => api.put(`/staff/${id}`, data);
export const deleteStaff = (id) => api.delete(`/staff/${id}`);

// Gallery
export const getGallery = () => api.get('/gallery');

// OVERRIDE WRITTEN HERE: Changes the Content-Type to multipart/form-data for files
export const createGalleryItem = (formData) => api.post('/gallery', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const updateGalleryItem = (id, formData) => {
  return api.put(`/gallery/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};export const deleteGalleryItem = (id) => api.delete(`/gallery/${id}`);

// Facilities
export const getFacilities = () => api.get('/facilities');
export const getFacility = (id) => api.get(`/facilities/${id}`);
export const createFacility = (data) => api.post('/facilities', data);
export const updateFacility = (id, data) => api.put(`/facilities/${id}`, data);
export const deleteFacility = (id) => api.delete(`/facilities/${id}`);

// Clubs
export const getClubs = () => api.get('/clubs');
export const getClub = (id) => api.get(`/clubs/${id}`);
export const createClub = (data) => api.post('/clubs', data);
export const updateClub = (id, data) => api.put(`/clubs/${id}`, data);
export const deleteClub = (id) => api.delete(`/clubs/${id}`);

export default api;