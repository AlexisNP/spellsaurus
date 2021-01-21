import api from './api';

const resource = "/spells";

export default {
  getAll() {
    return api.get(`${resource}`);
  },
  getPage(page) {
    return api.get(`${resource}/page/${page}`);
  },
  getOne(id) {
    return api.get(`${resource}/${id}`);
  },
  addOne(data) {
    return api.post(`${resource}`, data);
  },
  updateOne(id, data) {
    return api.put(`${resource}/${id}`, data);
  },
  deleteOne(id) {
    return api.delete(`${resource}/${id}`);
  }
};