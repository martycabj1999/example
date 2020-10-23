import Repository from "../Repository";
const resource = "/users";

export default {
    post(DTO) {
        console.log(DTO);
        return Repository.post(`${resource}`, DTO);
    },
    recoverPassword(email) {
        return Repository.get(`${resource}/recover/${email}`);
    },
    getUsers() {
        return Repository.get(`${resource}/admin`);
    },
    addUser(data) {
        return Repository.post(`${resource}/user`, data);
    },
    updateUser(data) {
        return Repository.put(`${resource}/user/${data.id}`, data);
    },
    updatePasswordUser(data) {
        return Repository.put(`${resource}/password/${data.id}`, data);
    },
    updatePassword(data) {
        return Repository.put(`${resource}/password`, data);
    },
    getRoles() {
        return Repository.get(`${resource}/roles`);
    },
    getAvatar() {
        return Repository.get(`${resource}/avatar`);
    },
    setAvatar(data) {
        return Repository.post(`${resource}/avatar`, data);
    },
};
