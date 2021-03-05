import axios from "axios";
require('dotenv').config()

export default axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});