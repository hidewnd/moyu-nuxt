import http from "./http";
export const baseUrl = "http://localhost:8080";
export const CODE_SUCCESS = 2000;

export const listTopicMenu = (count) => {
  return http.requestGet(baseUrl + '/my/topic/menu/' + count);
}
