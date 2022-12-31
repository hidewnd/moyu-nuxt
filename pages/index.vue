<template>
  <div class="index-page clear-fix">
    <!-- 左部分 -->
    <div v-if="topocList" class="centent-left-part float-left">
      <!-- 默认标签 -->
      <div class="centent-left-item moment-main-item-active">
        <span class="iconfont icontime_fill">推 荐</span>
      </div>
      <!-- 数据库标签 -->
      <div
        v-for="(item, index) in topocList"
        :key="index"
        class="centent-left-item"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 中间部分 -->
    <div class="centent-center-part float-left">
      <div class="post-part">
        <div class="post-box">
          <rich-text-input
            ref="richTextInput"
            v-model="inputContent"
          ></rich-text-input>
        </div>
        <div class="post-btn-part clear-fix">
          <div class="ex-content-btn float-left">
            <span><i class="iconfont icon-tianjiatupian"></i>图片</span>
            <span  @click="showEmoji=!showEmoji"><i class="iconfont icon-hanhan-01-01"></i>表情</span>
            <span><i class="iconfont icon-biaoqian-"></i>链接</span>
            <span><i class="iconfont icon-huati"></i>话题</span>
          </div>
          <div class="float-right">
            <el-button size="small" :disabled="true" type="primary">
              发布
            </el-button>
          </div>
        </div>
        <div class="emoji-part" v-if="showEmoji">
          <emoji-panel-vue @emojiClick="onEmojiClick"></emoji-panel-vue>
        </div>
      </div>
    </div>
    <!-- 右部分 -->
    <div class="centent-right-part float-right">123</div>
  </div>
</template>

<script>
import * as api from "../api/api";
import EmojiPanelVue from "../components/EmojiPanel.vue";
import RichTextInput from "../components/RichTextInput.vue";

export default {
  name: "IndexPage",
  data() {
    return {
      inputContent: "来摸个鱼吧",
      showEmoji: false,
    };
  },
  components: {
    EmojiPanelVue,
    RichTextInput,
  },
  async asyncData() {
    let result = await api.listTopicMenu(9);
    if (result.code == api.CODE_SUCCESS) {
      return {
        topocList: result.obj,
      };
    }
  },
  methods: {
    onEmojiClick(emojiUrl){
      let inputBox = this.$refs.richTextInput;
      if(document.activeElement !== inputBox){
        inputBox.requestFocus();
      }
      let imgTag = `<img src="${emojiUrl}" class="emoji">`;
      document.execCommand('insertHTML', false, imgTag);
    }
  }
};
</script>
<style>
.emoji-part{
  padding-top: 20px;
}
.ex-content-btn i {
  margin-right: 4px;
}
.ex-content-btn span {
  margin-right: 30px;
  cursor: pointer;
  font-size: 14px;
  color: #909090;
  line-height: 30px;
}
.ex-content-btn span:hover {
  opacity: 0.8;
}
.post-btn-part {
  padding: 10px 10px 0px;
}
.post-btn span {
  background: dodgerblue;
  color: white;
  padding: 6px 26px;
  border-radius: 4px;
}

.post-part {
  background: white;
  padding: 10px 10px 20px;
  border-radius: 4px;
}

.index-page {
  min-height: 500px;
  margin-top: 10px;
}

.centent-center-part {
  width: 64%;
  height: 100%;
  min-height: 500px;
  margin-right: 1%;
}

.centent-left-part {
  width: 14%;
  background: #fff;
  margin-right: 1%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
}

.centent-left-item {
  color: #909090;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background-color 0.2s color 0.2s;

  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  line-height: 30px;
  height: 34px;
  margin: 2px 10px;
  padding: 2px 10px;
  cursor: pointer;
}

.moment-main-item-active {
  background: #eaf2ff !important;
  color: #0084ff !important;
  font-size: 14px;
  border-radius: 4px;
  line-height: 30px;
  height: 34px;
  margin: 4px 10px;
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
