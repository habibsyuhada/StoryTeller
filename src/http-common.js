import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:811/StoryTeller/rest_api",
  headers: {
    "Content-type": "application/json",
  }
});