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
            <span class="ex-btn-item" @click="showImageUpload()">
              <i class="iconfont icon-tianjiatupian"></i>图片
            </span>
            <!-- 表情选择 -->
            <el-popover placement="bottom-start" width="400" trigger="click">
              <!-- 表情面板 -->
              <div class="emoji-part">
                <emoji-panel-vue @emojiClick="onEmojiClick"></emoji-panel-vue>
              </div>
              <span class="ex-btn-item" slot="reference">
                <i class="iconfont icon-hanhan-01-01"></i>表情
              </span>
            </el-popover>
            <!-- 链接输入 -->
            <el-popover placement="bottom-start" width="400" trigger="click">
              <div class="link-input-part">
                <el-input
                  class="link-input"
                  placeholder="eg:https://www.baidu.com"
                  size="small"
                  v-model="fish.url"
                ></el-input>
                <el-button
                  size="small"
                  type="primary"
                  :disabled="fish.url == ''"
                  @click="parseUrl"
                  >添加</el-button
                >
              </div>
              <span class="ex-btn-item" slot="reference">
                <i class="iconfont icon-biaoqian-"></i>链接
              </span>
            </el-popover>
            <!-- 话题选择 -->
            <el-popover
              placement="bottom-start"
              width="250"
              trigger="click"
              v-model="isTopicListShow"
            >
              <div class="topic-list-part" v-if="topicList">
                <div
                  class="topic-item clear-fix"
                  v-for="(item, index) in topicList"
                  :key="index"
                  @click="onTopicItemClick(item.id)"
                >
                  <img :src="item.cover" alt="话题图标" />
                  <div class="topic-content">
                    <div class="topic-info" float-left>
                      <div class="topic-title">{{ item.name }}</div>
                    </div>
                    <div class="topic-ex-info">
                      <span>内容量{{ item.contentCount }}</span>
                      <span>关注量{{ item.followCount }}</span>
                    </div>
                    <div class="topic-ex-info">
                      <span> {{ item.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <span class="ex-btn-item" slot="reference">
                <i class="iconfont icon-huati"></i>话题
              </span>
            </el-popover>
          </div>
          <div class="float-right">
            <el-button size="small" :disabled="true" type="primary">
              发布
            </el-button>
          </div>
        </div>
        <!-- 链接解析面板 -->
        <div class="url-info-part clear-fix" v-if="fish.url && fish.urlTitle">
          <div class="url-left-part float-left">
            <img :src="fish.urlCover" />
          </div>
          <div class="url-right-part float-left">
            <div class="url-title">{{ fish.urlTitle }}</div>
            <div class="url-link">{{ fish.url }}</div>
          </div>
          <i class="el-icon-close link-close" @click="closeLink"></i>
        </div>
        <!-- 图片上传预览面板 -->
        <div class="image-upload-part" v-if="isImagePartShow">
          <div class="image-list clear-fix">
            <div
              class="image-item float-left"
              v-for="(item, index) in fish.images"
              :key="index"
              @mouseenter="onImageMouseEnter(index)"
              @mouseleave="onImageMouseLeave(index)"
            >
              <img :src="item" :alt="'上传图片' + index" />
              <div class="image-cvoer" :id="'image-cvoer' + index">
                <span class="el-icon-zoom-in"></span>
                <span class="el-icon-delete"></span>
              </div>
            </div>
            <div class="upload-btn-box float-left" v-if="isImageUploadShow">
              <el-upload
                :action="imageUploadUrl"
                name="file"
                :show-file-list="false"
                :with-credentials="true"
                class="avatar-uploader"
                :on-success="onImageUploadSuccess"
                list-type="picture-card"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
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
      imageUploadUrl: api.baseUrl + "/my/image/moyu",
      isImageUploadShow: false,
      isImagePartShow: false,
      inputContent: "来摸个鱼吧",
      fish: {
        url: "",
        content: "",
        topicId: "",
        urlTitle: "",
        urlCover: "",
        images: [],
      },
      topicList: [],
      isTopicListShow: false,
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
    onImageMouseEnter(index){
      let cover = document.getElementById('image-cvoer' + index);
      if(cover){
        cover.style.display = 'block';
      }


    },
    onImageMouseLeave(index){
      let cover = document.getElementById('image-cvoer' + index);
      if(cover){
        cover.style.display = 'none';
      }
    },
    showImageUpload() {
      this.isImagePartShow = !this.isImagePartShow;
      if (this.fish.images.length < 9){
        this.isImageUploadShow = !this.isImageUploadShow;
      }
    },
    onImageUploadSuccess(response, file, fileList) {
      if (!response.success) {
        this.$message.error(response.msg);
        for (let index = 0; index < fileList.length; index++) {
          if (fileList[index].name === file.name) {
            fileList.splice(index, 1);
          }
        }
      } else {
        this.fish.images.push(response.obj);
        this.$message.success(response.msg);
        if (this.fish.images.length >= 9) {
          this.isImageUploadShow = false;
        }
      }
    },
    onTopicItemClick(topicItemId) {
      this.fish.topicId = topicItemId;
      this.isTopicListShow = false;
    },
    closeLink() {
      this.fish.url = "";
      this.fish.urlTitle = "";
      this.fish.urlCover = "";
    },
    parseUrl() {
      api.parseUrl(this.fish.url).then((result) => {
        if (result.code == api.CODE_SUCCESS) {
          this.fish.urlTitle = result.obj.title;
          this.fish.urlCover = result.obj.cover;
          this.$message.success(result.msg);
        } else {
          this.$message.error(result.msg);
        }
      });
    },
    onEmojiClick(emojiUrl) {
      let inputBox = this.$refs.richTextInput;
      if (document.activeElement !== inputBox) {
        inputBox.requestFocus();
      }
      let imgTag = `<img src="${emojiUrl}" class="emoji">`;
      document.execCommand("insertHTML", false, imgTag);
    },
    loadTopicList() {
      api.listTopices().then((result) => {
        if (api.CODE_SUCCESS == result.code) {
          this.topicList = result.obj;
        }
      });
    },
  },
  mounted() {
    this.loadTopicList();
  },
};
</script>
<style>
.image-upload-part .image-item {
  cursor: pointer;
  position: relative;
}
.image-upload-part .image-item img {
  width: 148px;
  height: 148px;
  box-sizing: border-box;
  border-radius: 6px;
  margin-right: 10px;
  margin-bottom: 5px;
  object-fit: cover;

}
.image-upload-part .image-item .image-cvoer{
  position: absolute;
  width: 148px;
  height: 148px;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, .3);
  display: none;
  text-align: center;
  line-height: 148px;
}

.image-cvoer span {
  color: white;
  padding: 10px;
}
.image-cvoer span:hover{
  opacity: .6;
}

.image-upload-part {
  padding: 10px 10px 0;
}
.topic-list-part .topic-item:hover {
  cursor: pointer;
  background: hsla(0, 0%, 59.2%, 0.1);
}
.topic-list-part .topic-item .topic-content {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 14px;
  letter-spacing: normal;
}
.topic-list-part .topic-item {
  display: flex;
  flex-grow: 0;
  margin: 0;
  padding: 10px 0;
  cursor: pointer;
  align-items: flex-start;
}
.topic-list-part .topic-item img {
  width: 55px;
  border-radius: 4px;
}

.topic-list-part .topic-item .topic-ex-info {
  color: #8a9aa9;
  font-size: 13px;
}
.topic-list-part {
  max-height: 320px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.topic-list-part::-webkit-scrollbar-track {
  background-color: #f9fafb;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.topic-list-part::-webkit-scrollbar-thumb {
  background-color: #e5e6eb;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.topic-list-part::-webkit-scrollbar {
  width: 10px;
}

.url-info-part .link-close {
  position: absolute;
  bottom: 5px;
  right: 5px;
  opacity: 0.3;
  cursor: pointer;
  font-size: 18px;
}
.url-info-part .link-close:hover {
  opacity: 0.9;
}
.url-info-part {
  position: relative;
  border: #f5f5f5 solid 1px;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
}
.url-left-part img {
  width: 120px;
  margin-right: 10px;
}
.url-right-part .url-title {
  line-height: 26px;
  font-size: 16px;
  color: #8a93a0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  padding-right: 10px;
}
.url-right-part .url-link {
  color: #0084ff;
  font-size: 14px;
  margin-top: 6px;
  opacity: 0.6;
  line-height: 24px;
}
.link-input {
  width: 329px;
  margin-right: 10px;
}
.ex-content-btn i {
  margin-right: 4px;
}
.ex-content-btn .ex-btn-item {
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
  width: 54%;
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
  width: 30%;
  background: #ff2;
  height: 800px;
}
</style>
