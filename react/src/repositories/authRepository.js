import Repository from "../Repository";
const resource = "/auth";

export default {
  auth(data) {
    return Repository.post(`${resource}`, data);
  },
  register(data) {
    return Repository.post(`/users/create`, data);
  },
  sendEmail(email) {
    return Repository.post(`/forgibben-password`, { email });
  },
};
