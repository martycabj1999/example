import axios from "axios";
import Swal from 'sweetalert2'
const baseURL = "http://localhost:8000/api";

const repository = axios.create({
  baseURL,
});

let user = JSON.parse(localStorage.getItem("user"));
const token = user?.token ? "Bearer " + user?.token : null;

if (token) {
  repository.defaults.headers.common["Authorization"] = token;
}

repository.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function removeSidebars() {
  const sidebars = document.getElementsByClassName("vs-content-sidebar");
  sidebars.forEach((sidebar) => {
    sidebar.remove();
  });
}

repository.interceptors.response.use(

  function (response) {
    return response.data;
  },

  function (error) {
    console.log("response error: ", error.response);
    if (error.response.status === 422) {
      const firstErrorKey = error.response.data.errors;
      Swal.fire({
        title: 'Error!',
        text: `Params: ${error.response.data.errors[0].param}, Error: ${error.response.data.errors[0].msg}`,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    } else if (error.response.status === 404) {
      // redirect to 404
      removeSidebars();
      window.location.href = "/pages/404";
    } else if (error.response.status === 500) {
      removeSidebars();
      window.location.href = "/pages/500";
    } else if (error.response.status === 401) {
      if (error.response.data.message !== "Incorrect email and password") {
        window.location.href = "/pages/unauthorized";
      }
    }

    return Promise.reject(error);
  }
);

export default repository;
