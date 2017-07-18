import axios from 'axios';

export default {
  async getAll(url) {
    return await axios.get(url);
  },

  async get(url, params = {}) {
    return await axios.get(url, params);
  }
};
