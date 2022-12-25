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
        <div class="right-part float-right">
          <div class="action-btn-part">
            <span>摸一鱼</span>
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
          Copyright © hidewnd(2014-2022） 本网站由程序猿(媛)用爱驱动
        </div>
        <div class="contract">
          关于我们 | 联系我们 | 友情链接
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  background: #f2f2;
  width: 70%;
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

.center-part{
}

.center-part .menu{
  margin-left: 40px;
  line-height: 61px;
}
.center-part .menu span{
  font-size: 24px;
  font-weight: 500;
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
