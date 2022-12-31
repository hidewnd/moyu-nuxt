<template>
  <div class="emoji-panel-container">
    <div class="title" v-show="history.length !== 0">
      <span>最近使用</span>
      <span class="delete-history-btn float-right" @click="removeHistory">删除历史</span>
    </div>
    <div class="emoji-history-container">
      <img
        v-for="i in history"
        :key="i"
        :src="'https://cdn.sunofbeaches.com/emoji/' + i + '.png'"
        class="emoji-item"
        @click="appendEmoji(i)"
      />
    </div>
    <div class="emoji-title">全部标签</div>
    <div class="emoji-all-container">
      <img
        v-for="i in 130"
        :key="i"
        :src="'https://cdn.sunofbeaches.com/emoji/' + i + '.png'"
        class="emoji-item"
        @click="appendEmoji(i)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: [1, 23, 45, 3, 4, 5],
    };
  },
  methods: {
    appendEmoji(i) {
      // let inputIndex = document.getElementById("input-box");
      // if (document.activeElement !== inputIndex) {
      //   inputIndex.focus();
      // }
      let targetUrl = "https://cdn.sunofbeaches.com/emoji/" + i + ".png";
      this.$emit('emojiClick', targetUrl);
      // let imgTag = `<img src="${targetUrl}" class="emoji"`;
      // document.execCommand("insertHTML", false, imgTag);
      this.saveHistory(i);
      this.reStoreHistory();
    },
    removeHistory() {
      window.localStorage.removeItem("emoji-history");
      this.reStoreHistory();
    },
    reStoreHistory() {
      let record = window.localStorage.getItem("emoji-history");
      if (record) {
        this.history = record.split(",");
      } else {
        this.history = [];
      }
    },
    saveHistory(emojiIndex) {
      let record = window.localStorage.getItem("emoji-history");
      let targetSaveStr = emojiIndex;
      let count = 1;
      if (record) {
        let splitArray = record.split(",");
        for (let i = 0; i < splitArray.length; i++) {
          let item = splitArray[i];
          if (emojiIndex.toString() !== item) {
            targetSaveStr += ",";
            targetSaveStr += item;
            count++;
            if (count > 5) {
              break;
            }
          }
        }
      }
      console.log("targetSaveStr ==>", targetSaveStr);
      window.localStorage.setItem("emoji-history", targetSaveStr);
    },
  },
  mounted(){
    this.reStoreHistory();
  }
};
</script>
<style>
.delete-history-btn {
  color: #0084ff;
  cursor: pointer;
}
.emoji-title {
  display: flex;
  justify-content: space-between;
}

.emoji-item,
.emoji-item {
  width: 45px;
  transition: all 0.3s linear;
  height: 45px;
  padding: 10px;
  cursor: pointer;
}
.emoji-item:hover {
  transform: scale(1.3);
  transition: transform 0.3s;
}
.emoji-panel-container {
  overflow-x: scroll;
  overflow-y: hidden;
  height: 300px;
}
.emoji-panel-container::-webkit-scrollbar-track {
  background-color: #f9fafb;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.emoji-panel-container::-webkit-scrollbar-thumb {
  background-color: #f9fafb;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.emoji-panel-container::-webkit-scrollbar {
  width: 10px;
}
</style>
