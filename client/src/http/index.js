import axios from "axios";

const $host = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL
});

const $authHost = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL
});

const authInterceptor = config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const originalReq = err.config;
    if (err.response.status === 401 && originalReq && !originalReq._isretry) {
      originalReq._isretry = true;
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/refresh`,
          {
            withCredentials: true
          }
        );
        localStorage.setItem("token", res.data.accessToken);
        return await $authHost.request(originalReq);
      } catch (e) {}
    } else {
      throw err;
    }
  }
);

export { $host, $authHost };
