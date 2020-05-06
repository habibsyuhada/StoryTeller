import http from "../http-common";

class TutorialDataService {

	getAll() {
    return http.get("/learn_react");
  }

  get(id) {
    return http.get(`/learn_react/${id}`);
  }

  create(data) {
    return http.post("/learn_react", data);
  }

  update(id, data) {
    return http.put(`/learn_react/${id}`, data);
  }

  delete(id) {
    return http.delete(`/learn_react/${id}`);
  }

  deleteAll() {
    return http.delete(`/learn_react`);
  }

  findByTitle(title) {
    return http.get(`/learn_react?title=${title}`);
  }

}

export default new TutorialDataService();