import http from "./http";
export const baseUrl = "http://localhost:8080";
export const CODE_SUCCESS = 2000;
// 侧边栏话题
export const listTopicMenu = (count) => {
  return http.requestGet(baseUrl + '/my/topic/menu/' + count);
}
// url网址解析
export const parseUrl = (url) => {
  return http.requestPost(baseUrl + '/my/fish/ex/parse?url=' + url);
}

export const listTopices = ()=> {
  return http.requestGet(baseUrl + '/my/topic/list');
}
