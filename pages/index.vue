<template>
  <div class="index-page clear-fix">
    <!-- 左部分 -->
    <div v-if="topocList" class="centent-left-part float-left">
      <div v-for="(item, index) in topocList" :key="index">
        {{ item.name }}
      </div>
    </div>
    <!-- 中间部分 -->
    <div class="centent-center-part float-left">123</div>
    <!-- 右部分 -->
    <div class="centent-right-part float-right">123</div>
  </div>
</template>

<script>
import * as api from "../api/api";

export default {
  name: "IndexPage",
  async asyncData() {
    let result = await api.listTopicMenu(9);
    if (result.code == api.CODE_SUCCESS) {
      return {
        topocList: result.obj,
      };
    }
  },
};
</script>
<style>
.index-page {
  min-height: 500px;
  margin-top: 10px;
}

.centent-center-part {
  width: 65%;
  height: 100%;
  min-height: 500px;
  background: #2ff;
  margin-right: 1%;
}

.centent-left-part {
  width: 13%;
  background: #f2f;
  margin-right: 1%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.centent-left-item {
  color: #909090;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background-color 0.2s color 0.2s;

  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  line-height: 30px;
  height: 34px;
  margin: 2px 10px;
  padding: 2px 10px;
  cursor: pointer;
}

.centent-left-item:hover {
  background: rgba(0, 132, 255, 0.1);
}
.centent-right-part {
  width: 20%;
  background: #ff2;
  height: 800px;
}
</style>
