<template>
  <div class="rich-text-input">
    <div
      class="input-box"
      contenteditable="true"
      spellcheck="false"
      id="input-box"
      :placeholder="hintContent"
    ></div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "content",
    event: "onContentChange",
  },
  props: {
    content: {
      type: String,
      default: "",
    },
  },
  data(){
    return{
      hintContent: '',
    }
  },
  methods: {
    updateContent(value) {
      let inputBox = document.getElementById("input-box");
      if (value != inputBox.innerHTML) {
        inputBox.innerHTML = value;
      }
    },
    requestFocus() {
      let inputBox = document.getElementById("input-box");
      inputBox.focus();
    },
  },
  mounted() {
    // 设置提示语
    this.hintContent = this.content;
    let inputBox = document.getElementById("input-box");
    //内容发生更新
    if (inputBox) {
      let THIS = this;
      inputBox.addEventListener("input", function () {
        this.content = inputBox.innerHTML;
        THIS.$emit("onContentChange", inputBox.innerHTML);
      });
    }
  },
  watch: {
    content(newVal) {
      this.updateContent(newVal);
    },
  },
};
</script>
<style>
.input-box {
  font-size: 14px;
  border-radius: 4xp;
  background: #f9fafb;
  min-height: 100px;
  display: block;
  outline: none;
  border: #ebedf0 solid 2px;
  padding: 10px;
  margin: 10px;
}
.input-box img {
  margin: 2px;
  vertical-align: middle;
}
.input-box .emoji {
  width: 20px;
}

.input-action-part {
  display: flex;
  justify-content: space-between;
}
.input-box:focus {
  border: #0084ff solid 2px;
}
.input-box:empty::before {
  content: attr(placeholder);
  position: absolute;
  color: #4d4d4d;
  background-color: transparent;
}
</style>
