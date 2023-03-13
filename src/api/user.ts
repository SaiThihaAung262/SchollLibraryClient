import { post, get } from "./axios/reques";

export const login = (data: any) => {
  return post("/client/login", data);
};

export function getUserDetail(params: any) {
  return get("/user/get-user", params);
}
