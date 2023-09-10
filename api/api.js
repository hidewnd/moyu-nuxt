import http from "./http";
export const baseUrl = "http://localhost:8080";
// export const baseUrl = "http://192.168.3.4:8080";
export const NOT_LOGIN_PAGE = "http://localhost:8000/login";
export const LOGIN_URL = "http://localhost:3000";
export const CODE_SUCCESS = 2000;
const API_MOYU = '/my';
const API_UCENTER = '/uc';
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

// 摸鱼列表
export const listFish = (obj) => {
  return http.requestPost(baseUrl + API_MOYU + '/my/fish/list', obj);
}

// 提交评论
export const doCommentAdd = (obj) => {
  return http.requestPost(baseUrl + API_MOYU + '/comment/', obj);
}

// 获取评论列表
export const listCommentById = (obj) => {
  return http.requestPost(baseUrl + API_MOYU + '/comment/list', obj);
}

// 提交子评论
export const doSubCommentAdd = (obj) => {
  return http.requestPost(baseUrl + API_MOYU + '/comment-sub/', obj);
}


// 检查Token
export const checkToken = (obj) => {
  return http.requestPost(baseUrl + API_UCENTER + '/user/token', obj);
}

// 退出登录
export const logout = (obj) => {
  return http.requestPost(baseUrl + API_UCENTER + '/user/logout', obj);
}
