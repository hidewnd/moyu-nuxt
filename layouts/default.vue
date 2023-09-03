<template>
  <div>
    <!-- 导航栏 -->
    <div class="navigation-bar">
      <div class="center clear-fix">
        <!-- 左部分 -->
        <div class="left-part float-left">
          <div class="logo">
            摸鱼君
          </div>
        </div>
        <!-- 中间部分 -->
        <div class="center-part float-left">
          <div class="menu">
            <span class="menu-active">鱼塘</span>
            <span>干货</span>
            <span>我的</span>
            <span>基三</span>
            <span>我凑原</span>

          </div>
        </div>
        <!-- 右边部分 -->
        <div class="right-part clear-fix float-right">
          <div class="action-btn-part float-left">
            <span>摸一鱼</span>
          </div>
          <div class="top-bar-notification float-left" v-if="JSON.stringify(userVO) != '{}'">
            <span class="el-icon-message-solid"></span>
          </div>
          <div class="top-bar-user-avatar float-left" v-if="JSON.stringify(userVO) != '{}'">
            <el-popover placement="bottom-start" width="100" trigger="hover" >
              <div class="user-menu-list">
                <span @click="logOut">退出登录</span>
              </div>
              <el-avatar slot="reference" size="medium" :src="userVO.avatar" ></el-avatar>
            </el-popover>
          </div>
          <div class="top-bar-tips-login float-left" v-else>
            <span class="login-btn" @click="toLoginPage">登录</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 主体 -->
    <div class="main-container">
      <nuxt/>
    </div>
    <!-- 底部导航 -->
    <div class="bottom-info">
      <div class="info-container">
        <div class="copy-right">
          Copyright © hidewnd（2014-2022） 本网站由程序猿(媛)用爱驱动
        </div>
        <div class="contract">
          关于我们 | 联系我们 | 友情链接
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "../api/api";
export default {
  data(){
    return {
      userVO: {},
    }
  },
  methods: {
    toLoginPage(){
      window.location.href = api.NOT_LOGIN_PAGE + "?redirect=" + window.location.href;
    },
    logOut(){
      let THIS = this;
      api.logout()
        .then((data) => {
          if (data.code === api.CODE_SUCCESS) {
            this.$message.success("退出登录成功");
            window.localStorage.setItem("avatar", "");
            window.localStorage.setItem("userName", "");
            window.location.href = api.LOGIN_URL;
          }
        });

    },
    checkToken(){
      api.checkToken().then((data)=> {
        if (data.code == api.CODE_SUCCESS){
          let user = data.obj;
          window.localStorage.setItem("avatar", user.avatar);
          window.localStorage.setItem("userName", user.userName);
          this.userVO = user;
        } else {
          this.userVO = {};
          window.localStorage.setItem("avatar", "");
          window.localStorage.setItem("userName", "");
        }
      })
    }
  },
  mounted(){
    this.checkToken()
  }
}
</script>

<style>
.login-btn {
  font-size: 16px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 400;
  padding: 6px 18px;
  margin-left: 10px;
  line-height: 61px;
  color: #0084FF;
  border: 1px solid #0084FF;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.top-bar-notification {
  font-size: 20px;
  line-height: 61px;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;
  color: #7f828b;
}

.top-bar-notification:hover{
  opacity: .8;
}

.top-bar-user-avatar {
  line-height: 51px;
  cursor: pointer;
}

.top-bar-user-avatar:hover{
  opacity: .8;
}
.top-bar-user-avatar .el-avatar--medium {
  vertical-align: middle;
}
* {
  margin: 0;
  padding: 0;
}

body{
  background: #EBEDF0;
  font-size:14px;
}

.center{
  width: 99%;
  margin: 0 auto;
}

.main-container {
  width: 65%;
  margin: 0 auto;
}

.bottom-info{
  width: 70%;
  margin: 0 auto;
}

.info-container{
  width: 70%;
  margin: 20px auto;
  text-align: center;
}

.copy-right, .contract{
  margin-top: 10px;
}

.navigation-bar{
  height: 61px;
  background: #fff;
}

.left-part{

}

.left-part .logo{
  font-size: 32px;
  line-height: 61px;
  font-weight: 600;
  color: dodgerblue;
}

.center{
  width: 65%;
}

.center-part{
}

.center-part .menu{
  margin-left: 40px;
  line-height: 61px;
}
.center-part .menu span{
  font-size: 20px;
  font-weight: 400;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.center-part .menu span:hover{
  color: dodgerblue;
}

.action-btn-part {
  line-height: 61px;

}

.action-btn-part span{
  font-size: 16px;
  padding: 7px 18px;
  margin-left: 10px;
  background: #0084FF;
  border-radius: 4px;
  color: white;
  cursor: pointer;

}

.action-btn-part span:hover{
  opacity: .8;
}

.menu-active{
  color: dodgerblue;
}

.right-part{

}

.float-left{
  float: left;
}

.float-right{
  float: right;
}

.clear-fix{
  *zoom: 1;
}
.clear-fix:after{
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>
