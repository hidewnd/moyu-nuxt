<template>
  <div class="index-page clear-fix">
    <!-- 左部分 -->
    <div v-if="topicMenuList" class="centent-left-part float-left">
      <!-- 默认标签 -->
      <div class="centent-left-item moment-main-item-active">
        <span class="iconfont icontime_fill">推 荐</span>
      </div>
      <!-- 数据库标签 -->
      <div
        v-for="(item, index) in topicMenuList"
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
            v-model="fish.content"
          ></rich-text-input>
        </div>
        <div class="post-btn-part clear-fix" id="post-btn-part">
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
            <el-popover
              placement="bottom-start"
              width="400"
              trigger="click"
              v-model="isUrlInputShow"
            >
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
                  @click="onTopicItemClick(item.id, item.name)"
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
            <!-- 话题预览模块 -->
            <el-tag
              v-if="selectedTopicName !== ''"
              closable
              @close="onTagClose"
              size="medium"
              effect="plain"
              class="selected-topic"
              >{{ selectedTopicName }}
            </el-tag>
          </div>
          <!-- 提交按钮 -->
          <div class="float-right">
            <el-button
              size="small"
              :disabled="fish.content.length === 0"
              @click="doFishAdd"
              type="primary"
            >
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
                <span
                  class="el-icon-zoom-in"
                  @click="doPreviewShow(item)"
                ></span>
                <span
                  class="el-icon-delete"
                  @click="doImageItemDelete(index)"
                ></span>
              </div>
            </div>
            <!-- 上传图标 -->
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
      <!-- 内容列表 -->
      <div class="content-list-part">
        <div
          class="content-item"
          v-for="(item, index) in myContentList"
          :key="index"
        >
          <div class="my-user-info clear-fix">
            <div class="user-avator float-left">
              <img :src="item.avatar" />
            </div>
            <div class="user-info float-left">
              <div class="user-name">{{ item.userName }}</div>
              <div class="user-info-detail">
                <span>{{ item.positon }}</span>
                <span>@</span>
                <span>{{ item.company }}</span>
                <span>{{ item.createTime }}</span>
              </div>
            </div>
          </div>
          <div class="my-content">
            <div class="content-detail" v-html="item.content"></div>
            <div class="my-images">
              <image-viewer :target-images="item.images"></image-viewer>
            </div>
            <div class="my-content-topic" v-if="item.topicName !== null">
              <span class="topic-name">{{ item.topicName }}</span>
            </div>
          </div>
          <div class="my-action-part clear-fix">
            <!-- 评论数量 -->
            <div class="float-felt iconfont icon-huifu" @click="showCommentList(item.id)"> {{ item.commentCount }}</div>
            <div class="float-felt my-thumb-up iconfont icon-dianzan"> {{ item.thumbUpCount }}</div>
            <div class="float-felt iconfont icon-fenxiang"> 分享</div>
          </div>
          <!-- 评论模块 -->
          <div class="my-comment-part" :id="'my-comment-part_' + item.id" style="display:none;">
            <div class="comment-box">
              <!-- 头像 -->
              <el-avatar size="medium" :src="circleUrl"></el-avatar>
              <!-- 输入框 -->
              <textarea class="comment-input-box" :id="'comment-input-box' + item.id"></textarea>
              <!-- 提交按钮 -->
              <el-button type="primary" @click="onCommentReply(item.id)">回复</el-button>
            </div>
            <div class="sub-comment-box">
              <CommentListView
                :ref="'commentListView_' + item.id"
                @onSubReply="onSubReply"
                @onReply="onReply" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右部分 -->
    <div class="centent-right-part float-right">123</div>
    <div class="dialog-part">
      <el-dialog :visible.sync="imagePreviewShow">
        <img width="100%" :src="imagePreviewurl" alt="预览图片" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as api from "../api/api";
import EmojiPanelVue from "../components/EmojiPanel.vue";
import RichTextInput from "../components/RichTextInput.vue";
import ImageViewer from "../components/ImageViewer.vue";
import CommentListView from "../components/CommentListView.vue";

export default {
  name: "IndexPage",
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      isUrlInputShow: false,
      imagePreviewurl: "",
      imagePreviewShow: false,
      imageUploadUrl: api.baseUrl + "/my/image/moyu",
      isImageUploadShow: false,
      isImagePartShow: false,
      fish: {
        url: "",
        content: "来摸个鱼吧",
        topicId: "",
        urlTitle: "",
        urlCover: "",
        images: [],
      },
      pageFish: {
        size: 10,
      },
      topicList: [],
      fishList: [],
      isTopicListShow: false,
      selectedTopicName: "",
    };
  },
  components: {
    EmojiPanelVue,
    RichTextInput,
    ImageViewer,
    CommentListView,
  },
  async asyncData() {
    let result = await api.listTopicMenu(9);
    let myContent = await api.listFish({});
    let topicMenuList = [];
    let myContentList = [];
    if (result.code == api.CODE_SUCCESS && myContent.code == api.CODE_SUCCESS) {
      topicMenuList = result.obj;
      myContentList = myContent.obj.element;
    }
    return {
      topicMenuList: topicMenuList,
      myContentList: myContentList,
    };
  },
  methods: {
    listCommentById(myId){
      this.checkUserAvatar();
      let query = {
        "query": {
          "myId": myId
        }
      }
      let THIS = this;
      api.listCommentById(query).then((res) => {
        if(res.code == api.CODE_SUCCESS){
          let taregtView = THIS.$refs['commentListView_'+ myId][0];
          if(taregtView){
            taregtView.commentList = res.obj.element
          }
        }
      })
    },
    onSubReply(){

    },
    onReply(){

    },
    onCommentReply(MyId){
      let commentInputBox = document.getElementById('comment-input-box' + MyId);
      if(commentInputBox){
        let text = commentInputBox.value;
        console.log('text ==>', text)
      }

    },
    doFishAdd() {
      if (this.fish.content.length === 0) {
        this.$message.error("摸鱼没有内容不行的呀");
        return;
      }
      api.doFishAdd(this.fish).then((res) => {
        if (res.code === api.CODE_SUCCESS) {
          this.$message.success(res.msg);
          this.fish.url = "";
          this.fish.content = "来摸个鱼吧";
          this.fish.topicId = "";
          this.fish.urlTitle = "";
          this.fish.urlCover = "";
          this.fish.images = [];
          this.selectedTopicName = "";
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    onTagClose() {
      this.fish.topicId = "";
      this.selectedTopicName = "";
    },
    doImageItemDelete(index) {
      this.fish.images.splice(index, 1);
      if (this.fish.images.length < 9) {
        this.isImageUploadShow = true;
      }
    },
    doPreviewShow(url) {
      this.imagePreviewShow = true;
      this.imagePreviewurl = url;
    },
    onImageMouseEnter(index) {
      let cover = document.getElementById("image-cvoer" + index);
      if (cover) {
        cover.style.display = "block";
      }
    },
    onImageMouseLeave(index) {
      let cover = document.getElementById("image-cvoer" + index);
      if (cover) {
        cover.style.display = "none";
      }
    },
    showImageUpload() {
      this.isImagePartShow = !this.isImagePartShow;
      if (this.fish.images.length < 9) {
        this.isImageUploadShow = true;
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
    onTopicItemClick(topicItemId, topicName) {
      this.fish.topicId = topicItemId;
      this.isTopicListShow = false;
      this.selectedTopicName = topicName;
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
          this.isUrlInputShow = false;
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
    showCommentList(myId) {
      let element = document.getElementById('my-comment-part_' + myId)
      if(element) {
        element.style.display = element.style.display == 'block' ? 'none' : 'block';
      }
      this.listCommentById(myId)
    },
    checkUserAvatar(){
      let avatar = window.localStorage.getItem('avatar');
      if(avatar) {
        this.circleUrl = avatar;
      }
    },
  },
  mounted() {

    this.loadTopicList();
    let postBtnPart = document.getElementById("post-btn-part");
    if (postBtnPart) {
      postBtnPart.addEventListener("mousedown", function (event) {
        event.preventDefault();
      });
    }
  },
};
</script>
<style>
.comment-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment-input-box:focus{
  outline: none;
  border-color: #409eff;
}
.comment-input-box {
  resize: vertical;
  width: 80%;
  min-height: 50px;
  display: block;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color .2s cubic-bezier(.645, .045,.355, 1);

}
.my-comment-part {
  width: 100%;
  border-top: #f3f3f3 solid 3px;
  padding: 10px 0;
}
.my-action-part .my-thumb-up{
  border-left: 1px solid #f3f3f3;
  border-right: 1px solid #f3f3f3;
}
.my-action-part div:hover {
  opacity: .8;
}

.my-action-part div{
  text-align: center;
  width: 33%;
  font-size: 18px;
  line-height: 30px;
  color: #8a93a0;
  cursor: pointer;
  user-select: none;
}
.my-action-part{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f3f3f3;
  width: 100%;
}
.my-content-topic {
  margin-top: 20px;
}
.my-content-topic .topic-name {
  color: #0084ff;
  border: 1px solid #0084ff;
  font-size: 14px;
  line-height: 28px;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 8px;
}
.my-content .content-detail img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-left: 2px;
}
.my-content {
  margin-left: 55px;
  padding: 10px;
}
.my-content .my-images {
  margin-top: 10px;
}
.my-content .content-detail {
  font-size: 15px;
  line-height: 26px;
  text-decoration: none;
  color: #909090;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.user-info .user-info-detail {
  color: #8a9aa9;
  font-size: 13px;
  line-height: 18px;
}
.user-info .user-name {
  color: #666;
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
  margin-top: 3px;
}
.user-avator img {
  width: 55px;
  border-radius: 50%;
  margin-right: 10px;
}
.content-item {
  background: white;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 5px;
  padding: 20px 20px 0;
}
.content-list-part {
  margin-top: 20px;
}
.selected-topic {
  cursor: pointer;
}
.dialog-part .el-dialog_headerbtn {
  right: -20px;
}
.dialog-part .el-icon-close {
  color: white;
  font-size: 18px;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 50%;
  margin-right: -45px;
  margin-top: 10px;
}
.dialog-part .el-dialog {
  background: transparent;
  box-shadow: none;
}
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
.image-upload-part .image-item .image-cvoer {
  position: absolute;
  width: 148px;
  height: 148px;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  display: none;
  text-align: center;
  line-height: 148px;
}

.image-cvoer span {
  color: white;
  padding: 10px;
}
.image-cvoer span:hover {
  opacity: 0.6;
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
