import { $authHost, $host } from "./index.js";

export const registration = async (email, password) => {
  const { data } = await $host.post("/user/registration", {
    email,
    password
  });
  localStorage.setItem("token", data.accessToken);
  return data.user;
};

export const login = async (email, password) => {
  try {
    const { data } = await $host.post("/user/login", { email, password });
    localStorage.setItem("token", data.accessToken);
    return data.user;
  } catch (e) {
    throw e;
  }
};

export const logout = async () => {
  const res = await $authHost.post("/user/logout", {});
  localStorage.removeItem("token");
  return res;
};
//
// export const check = async () => {
//   if (localStorage.getItem("token")) {
//     const { data } = await $authHost.get("api/auth/check");
//     localStorage.setItem("token", data.token);
//     return jwtDecode(data.token);
//   } else throw new Error();
// };
