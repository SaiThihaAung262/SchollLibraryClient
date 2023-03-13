import { post, get } from "./axios/reques";

export function getHomeBooks(params: any) {
  return get("/user/get-books", params);
}

export function getBookCategories(params: any) {
  return get("/user/get-categories", params);
}

export function getBookDetails(params: any) {
  return get("/user/get-book-detail", params);
}

export function getBorrowHistory(params: any) {
  return get("/user/get-borrow-history", params);
}
