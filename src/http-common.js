import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:80/StoryTeller/rest_api",
  headers: {
    "Content-type": "application/json",
  }
});