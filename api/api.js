import http from "./http";
export const baseUrl = "http://localhost:8080";
export const CODE_SUCCESS = 2000;
const API_MOYU = '/my';
// 侧边栏话题
export const listTopicMenu = (count) => {
  return http.requestGet(baseUrl + API_MOYU + '/topic/menu/' + count);
}
// url网址解析
export const parseUrl = (url) => {
  return http.requestPost(baseUrl + API_MOYU + '/fish/ex/parse?url=' + url);
}

export const listTopices = ()=> {
  return http.requestGet(baseUrl + API_MOYU + '/topic/list');
}

// 提交摸鱼
export const doFishAdd = (obj) => {
  return http.requestPost(baseUrl + API_MOYU + '/my/fish/', obj);
}
