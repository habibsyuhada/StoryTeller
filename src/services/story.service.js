import http from "../http-common";

class StoryDataService {

	getAll() {
    return http.get("/story");
  }

  get(id) {
    return http.get(`/story/${id}`);
  }

  create(data) {
    return http.post("/story", data);
  }

  update(id, data) {
    return http.put(`/story/${id}`, data);
  }

  delete(id) {
    return http.delete(`/story/${id}`);
  }

  deleteAll() {
    return http.delete(`/story`);
  }

  findByTitle(title) {
    return http.get(`/story?title=${title}`);
  }

}

export default new StoryDataService();