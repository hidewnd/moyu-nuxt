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
        <span class="cm-nickname" v-text="item.userName"></span>
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
          >
            回复</span
          >
        </div>
        <div class="cm-sub-comment-list">
          <div
            class="cm-sub-comment-item"
            v-for="(subItem, subIndex) in item.subList"
            :key="subIndex"
          >
            <div class="cm-user-info-part">
              <img class="cm-avatar" :src="subItem.avatar" />
              <span class="cm-nickname" v-text="subItem.userName"></span>
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
                <a
                  :href="'https://www.sunofbeach.net/u/' + subItem.targetUserId"
                  >@{{ subItem.targetUserName }}</a
                >
                :
                <span v-text="item.content"></span>
              </div>
              <div class="cm-action-part">
                <span v-text="item.createTime"></span>
                <span class="cm-comment-response el-icon-chat-round">
                  回复</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="cm-input-box" :id="'cm-input-' + item.id">
          <el-input resize="none" class="cm-reply-box" type="textarea">
          </el-input>
          <span class="cm-reply-btn">回复</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
      commentList: Array
    },
    data() {
      return {
        comment: {
          commendId: '',
          content: '',
          momentId: ''
        },
        subComment: {
          commendId: '',
          content: '',
          momentId: ''
        },
        isSubReply: false
      }
    },
    methods: {
      doReply(boxId) {
        let inputBox = document.getElementById('cm-input-box-' + boxId);
        if (this.isSubReply) {
          this.subComment.content = inputBox.value;
          //通知外部
          this.$emit('onSubReply', this.subComment);
        } else {
          this.comment.content = inputBox.value;
          this.$emit('onReply', this.comment);
        }
      },
      onSubItemReply(subItem) {
        this.isSubReply = true;
        let commentId = subItem.commentId;
        this.handleInputBox(commentId, subItem.userName);
        //赋值给到评论
        this.subComment.commendId = subItem.id;
        this.subComment.momentId = subItem.momentId;
      },
      handleInputBox(id, userName) {
        let inputBoxContainer = document.getElementById('cm-input-' + id);
        if (inputBoxContainer) {
          inputBoxContainer.style.display = 'block';
        }
        let inputBox = document.getElementById('cm-input-box-' + id);
        if (inputBox) {
          inputBox.focus();
          inputBox.value = '';
          inputBox.setAttribute('placeholder', '回复@' + userName);
        }
      },
      onItemReply(item) {
        this.isSubReply = false;
        let commentId = item.id;
        this.handleInputBox(commentId, item.userName);
        //赋值给到评论
        this.comment.commendId = commentId;
        this.comment.momentId = item.momentId;
      }
    }
  }
</script>
<style>
.cm-input-box {
  display: none;
  margin-top: 10px;
  margin-bottom: 10px;
}

.cm-reply-box {
  width: 610px;
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
}

.cm-action-part {
  display: flex;
  margin-right: 30px;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 10px;
  align-items: center;
}

.cm-content {
  font-size: 14px;
}

.cm-content-part {
  margin-left: 40px;
}

.comment-list {
  background: white;
}

.comment-item {
  padding: 10px 10px 0;
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
  margin-left: 5px;
  margin-right: 5px;
}
</style>
