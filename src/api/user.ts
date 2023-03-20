import { post, get } from "./axios/reques";

export const login = (data: any) => {
  return post("/client/login", data);
};

export function getUserDetail(params: any) {
  return get("/user/get-user", params);
}

export const changePassword = (data: any) => {
  return post("/user/change-password", data);
};
