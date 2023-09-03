<template>
  <!--
  需要的数据：
  - 评论列表
  对外暴露的数据:
  - 评论数据
  - 加载更多
  -->
  <div class="comment-list">
    <div class="comment-item" v-for="(item, index) in commentList" :key="index">
      <div class="cm-user-info-part">
        <img class="cm-avatar" :src="item.avatar" />
        <a class="cm-nickname" :href="'/u/' + item.userId" target="_blank" v-text="item.userName"></a>
        <span
          class="cm-position"
          v-text="item.position ? item.position : '无业'"
        ></span>
        <span
          class="cm-company"
          v-text="item.company ? '@' + item.company : '@游民'"
        ></span>
      </div>
      <div class="cm-content-part">
        <div class="cm-content">
          <p v-text="item.content"></p>
        </div>
        <div class="cm-action-part">
          <span v-text="item.createTime"></span>
          <span
            class="cm-comment-response el-icon-chat-round"
            @click="onItemReply(item)"
          >回复</span>
        </div>
        <div class="cm-sub-comment-list">
          <div
            class="cm-sub-comment-item"
            v-for="(subItem, subIndex) in item.subList"
            :key="subIndex"
          >
            <div class="cm-user-info-part">
              <img class="cm-avatar" :src="subItem.avatar" />
              <span class="cm-nickname">
                <a :href="'/u/' + subItem.userId" target="_blank" v-text="subItem.userName"></a>
              </span>
              <span
                class="cm-position"
                v-text="subItem.position ? subItem.position : '无业'"
              ></span>
              <span
                class="cm-company"
                v-text="subItem.company ? '@' + subItem.company : '@游民'"
              ></span>
            </div>
            <div class="cm-sub-content-part">
              <div class="cm-content">
                <span>回复</span>
                <a :href="'/u/' + subItem.targetUserId">@{{ subItem.targetUserName }}</a >
                :<span v-text="item.content"></span>
              </div>
              <div class="cm-action-part">
                <span v-text="item.createTime"></span>
                <!-- 子评论回复 -->
                <span class="cm-comment-response el-icon-chat-round" @click="onSubItemReply(subItem)">
                  回复
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="cm-input-box" :id="'cm-input-' + item.id">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <textarea class="cm-reply-box" :id="'cm-input-box-' + item.id" resize="none" type="textarea" ></textarea>
            <el-button type="primary" class="cm-reply-btn" @click="doReply(item.id)" >回复</el-button>
          </div>
        </div>
      </div>
      <div class="cm-bottom-box">
          <div class="cm-no-more" v-if="!hasMore">~没有更多内容了~</div>
          <div class="cm-loader-more" v-else>加载更多...</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommentListView",
  data() {
    return {
      comment: {
        commendId: "",
        content: "",
        momentId: "",
      },
      subComment: {
        commendId: "",
        content: "",
        momentId: "",
      },
      commentList: [],
      isSubReply: false,
      hasMore: false,
    };
  },
  methods: {
    doReply(boxId) {
      let inputBox = document.getElementById("cm-input-box-" + boxId);
      if (this.isSubReply) {
        this.subComment.content = inputBox.value;
        //通知外部
        this.$emit("onSubReply", this.subComment);
      } else {
        this.comment.content = inputBox.value;
        this.$emit("onReply", this.comment);
      }
    },
    onSubItemReply(subItem) {
      this.isSubReply = true;
      let commentId = subItem.commentId;
      this.handleInputBox(commentId, subItem.userName, subItem.id);
      //赋值给到评论
      this.subComment.commendId = subItem.id;
      this.subComment.momentId = subItem.momentId;
    },
    handleInputBox(id, userName, subId) {
      let inputBoxContainer = document.getElementById('cm-input-' + id);
      if (inputBoxContainer && subId) {
        inputBoxContainer.style.display = "block";
        // this.$emit("changeDisplay", 'cm-input-' + id, subId);
      }else {
        inputBoxContainer.style.display = inputBoxContainer.style.display == 'block' ? 'none' : "block";
      }
      let inputBox = document.getElementById("cm-input-box-" + id);
      if (inputBox) {
        inputBox.focus();
        inputBox.value = "";
        inputBox.setAttribute("placeholder", "回复@" + userName);
      }
    },
    onItemReply(item, subItem) {
      this.isSubReply = false;
      let commentId = item.id;
      let userName = subItem ? subItem.userName : item.userName;
      this.handleInputBox(commentId, userName);
      //赋值给到评论
      this.comment.commendId = commentId;
      this.comment.momentId = item.momentId;
    },
  },
};
</script>
<style>
.cm-bottom-box{
  text-align: center;
  margin-bottom: 10px;
}
.cm-reply-btn {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  float: right;
}
.cm-input-box {
  display: none;
  margin-top: 10px;
  margin-bottom: 10px;
}
.cm-reply-box:focus{
  outline: none;
  border-color: #409eff;
}
.cm-reply-box {
  resize: vertical;
  width: 85%;
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

.comment-list {
  background: white;
}
.cm-has-more:hover {
  opacity: 0.6;
}

.cm-has-more {
  cursor: pointer;
}

.cm-has-more,
.cm-no-more {
  text-align: center;
  padding: 10px;
  color: #999999;
}

body {
  background: #ebedf0;
}

.cm-sub-content-part {
  margin-left: 40px;
  margin-bottom: 10px;
}

.cm-sub-comment-list {
  margin-top: 10px;
  background: #fafbfc;
}

.cm-comment-response:hover {
  opacity: 0.8;
}

.cm-comment-response {
  cursor: pointer;
  padding-bottom: 5px;
}

.cm-action-part {
  display: flex;
  margin-right: 30px;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 10px;
  align-items: center;
}

.cm-content a {
  text-decoration: none;
  color: #0084ff;
  font-size: 14px;
}
.cm-content {
  font-size: 14px;
}

.cm-content-part {
  margin-left: 50px;
}

.comment-list {
  color: #999999;
  background: white;
}

.comment-list a{
  text-decoration: none;
  color: #409eff;
}

.comment-item {
  padding: 10px 10px 0;
  border-bottom: 1px solid #f1f1f1;
}

.cm-user-info-part .cm-position,
.cm-user-info-part .cm-company {
  font-size: 13px;
}

.cm-user-info-part .cm-nickname {
  font-size: 16px;
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
}

.cm-sub-comment-item .cm-user-info-part {
  line-height: 30px;
}

.cm-user-info-part {
  line-height: 40px;
}

.cm-user-info-part .cm-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle !important;
}

.cm-sub-comment-item .cm-avatar {
  width: 30px;
  height: 30px;
}

.cm-sub-comment-item .cm-nickname {
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
