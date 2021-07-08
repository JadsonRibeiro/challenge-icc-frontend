import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3333"
  baseURL: "https://challenge-liv-backend.herokuapp.com/"
});