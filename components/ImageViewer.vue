<template>
  <div id="image-viewer">
    <!-- 缩略图 -->
    <div class="preview clear-fix" v-show="isPreview">
      <!--遍历内容显示-->
      <div
        :class="'image-item image-item-' + targetImages.length"
        v-for="(item, index) in targetImages"
        :key="index"
      >
        <img :src="item" alt="image" @click="toDetailPage(index)" />
      </div>
    </div>
    <div class="detail" v-show="!isPreview">
      <!--顶部的控制栏-->
      <div class="iv-viewer-action-bar">
        <span class="panel-item el-icon-zoom-out" @click="toPreviewPage">收起</span>
        <span class="panel-item el-icon-search" @click="showOriginalIv">查看大图</span>
        <span class="panel-item el-icon-refresh-left" @click="doRotate(-1)">向左旋转</span>
        <span class="panel-item el-icon-refresh-right" @click="doRotate(1)">向右旋转</span>
      </div>
      <!-- 当前图 -->
      <div class="iv-detail-part" id="iv-detail-part">
        <img id="detail-iv" :src="detailSrc" @click="toPreviewPage" />
        <div id="iv-left-arrow" @click="leftMove"></div>
        <div class="toggle-zoomout" @click="toPreviewPage"></div>
        <div id="iv-right-arrow" @click="rightMove"></div>
      </div>
      <!-- 缩略图 -->
      <div class="iv-list-part">
        <img
          @click="toDetailPage(index)"
          :src="item"
          v-for="(item, index) in targetImages"
          :key="index"
          :class="
            currentActiveIndex === index
              ? 'iv-detail-list-item iv-detail-list-item-active'
              : 'iv-detail-list-item'
          "
        />
      </div>
    </div>
    <div class="original-view" v-if="isOriginalIvShow">
      <div class="image-container zoomable">
        <img :src="detailSrc" />
        <span class="image-close" @click="closeOriginalIv"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    targetImages: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      detailSrc: "",
      isPreview: true,
      currentActiveIndex: 0,
      isOriginalIvShow: false,
      currentDeg: 0,
      originalWidth: 0,
      originalHeight: 0,
    };
  },

  mounted() {
    if (this.targetImages.length > 0) {
      this.detailSrc = this.targetImages[0];
      this.updateArrowPartVisibility();
    }
  },

  methods: {
    //从预览到详情页面
    toDetailPage(index) {
      this.currentActiveIndex = index;
      this.isPreview = false;
      this.updateArrowPartVisibility();
      this.updateDetailImage();
    },
    // 旋转
    doRotate(direction) {
      let detailIv = document.getElementById("detail-iv");
      if (this.currentDeg === 0) {
        this.originalWidth = detailIv.width;
        this.originalHeight = detailIv.height;
        console.log("this.originalWidth ==> " + this.originalWidth);
        console.log("this.originalHeight ==> " + this.originalHeight);
      }
      if (direction > 0) {
        //向右转
        this.currentDeg += 90;
        if (this.currentDeg >= 360) {
          this.currentDeg = 0;
        }
      } else {
        //向左转
        this.currentDeg -= 90;
        if (this.currentDeg <= -360) {
          this.currentDeg = 0;
        }
      }
      //重新计算高度
      let detailIvContainer = document.getElementById("iv-detail-part");
      //获取当前IV的宽高，然后宽高对调，调整容器
      let ivWidth = detailIv.width;
      let ivHeight = detailIv.height;
      let ctWidth = detailIvContainer.offsetWidth;
      if (this.currentDeg === 90 || this.currentDeg === -270) {
        //横向
        //如果高度大于容器的宽度，那么需要对图片进行缩放，并且计算宽高
        if (ivHeight > ctWidth) {
          detailIv.style.height = ctWidth + "px";
          ivHeight = detailIv.height;
          ivWidth = detailIv.width;
        }
        let targetTranslate = (ivWidth - ivHeight) / 2 + 10;
        detailIv.style.transform =
          "rotate(" +
          this.currentDeg +
          "deg) translate(" +
          targetTranslate +
          "px, 0)";
        detailIvContainer.style.height = ivWidth + 10 + "px";
      } else if (this.currentDeg === 180) {
        //宽高复原
        detailIv.style.height = this.originalHeight + "px";
        ivHeight = detailIv.height;
        ivWidth = detailIv.width;
        //纵向,相反
        detailIv.style.transform = "rotate(" + this.currentDeg + "deg)";
        detailIvContainer.style.height = ivHeight + 10 + "px";
      } else if (this.currentDeg === 270 || this.currentDeg === -90) {
        //横向
        if (ivHeight > ctWidth) {
          detailIv.style.height = ctWidth + "px";
          ivHeight = detailIv.height;
          ivWidth = detailIv.width;
        }
        detailIvContainer.style.height = ivWidth + 10 + "px";
        let targetTranslate = (ivHeight - ivWidth) / 2 - 10;
        console.log("targetTranslate  ==> " + targetTranslate);
        detailIv.style.transform =
          "rotate(" +
          this.currentDeg +
          "deg) translate(" +
          targetTranslate +
          "px, 0)";
      } else {
        detailIv.style.height = this.originalHeight + "px";
        ivHeight = detailIv.height;
        ivWidth = detailIv.width;
        detailIv.style.transform = "rotate(" + this.currentDeg + "deg)";
        detailIvContainer.style.height = ivHeight + 10 + "px";
      }
    },
    // 控制左右切换的边界
    updateArrowPartVisibility() {
      //如果是第0个，左边不显示
      //如果是最后一个，右边不显示
      if (this.currentActiveIndex === 0) {
        document.getElementById("iv-left-arrow").style.display = "none";
      } else {
        document.getElementById("iv-left-arrow").style.display = "block";
      }
      if (this.currentActiveIndex === this.targetImages.length - 1) {
        document.getElementById("iv-right-arrow").style.display = "none";
      } else {
        document.getElementById("iv-right-arrow").style.display = "block";
      }
    },
    // 更新图片的显示
    updateDetailImage() {
      this.detailSrc = this.targetImages[this.currentActiveIndex];
      let detailIv = document.getElementById("detail-iv");
      let detailIvContainer = document.getElementById("iv-detail-part");
      detailIvContainer.style.height = "";
      detailIv.style.transform = "";
      detailIv.style.height = "";
      this.currentDeg = 0;
    },
    // 显示原图
    showOriginalIv() {
      this.isOriginalIvShow = true;
    },
    // 关闭原图
    closeOriginalIv() {
      this.isOriginalIvShow = false;
    },

    // 左右切换
    leftMove() {
      this.currentActiveIndex--;
      if (this.currentActiveIndex < 0) {
        this.currentActiveIndex = 0;
      }
      this.updateArrowPartVisibility();
      this.updateDetailImage();
    },
    rightMove() {
      this.currentActiveIndex++;
      if (this.currentActiveIndex > this.targetImages.length - 1) {
        this.currentActiveIndex = this.targetImages.length - 1;
      }
      this.updateArrowPartVisibility();
      this.updateDetailImage();
    },
    toPreviewPage() {
      this.isPreview = !this.isPreview
    },
  },
};
</script>

<style>
.origninal-view .image0container .image-close:hover {
  opacity: 0.8;
}
.origninal-view .image0container .image-close{
  background: #7f828b;
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  border-radius: 50%;
  color: white;
  text-align: center;
  height: 60px;
  width: 60px;
  cursor: pointer;
  line-height: 60px;
}
#image-viewer .original-view .image-container .image-close::after{
  background-color: #fff;
  content: "";
  display: block;
  height: 20px;
  left: 50%;
  position: absolute;
  top: 50%;
  width: 2px;
  transform: translate(-50%,-50%);
}
#image-viewer .original-view .image-container .image-close:before{
  background-color: #fff;
  content: "";
  display: block;
  height: 20px;
  left: 50%;
  position: absolute;
  top: 50%;
  width: 2px;
  transform: translate(-50%,-50%) rotate(90deg);
}
#image-viewer .original-view .image-container .image-close:hover{
  transform: rotate(135deg);
}
#image-viewer .original-view .image-container .image-close{
  background-color: hsla(0,0%,59%,.5);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  position: absolute;
  right: 20px;
  text-align: center;
  top: 20px;
  transform: rotate(45deg);
  transition: all .2s;
  width: 40px;
}
#image-viewer .original-view .image-container img{
  max-height: 100vh;
  max-width: 100vw;
}
#image-viewer .original-view .image-container .zoomable{
  cursor: zoom-in
}
#image-viewer .original-view .image-container{
  align-items: center;
  background-color: #222;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

#image-viewer .original-view{
  box-shadow: none;
  width: 100%;
  height: 100%;
}



#image-viewer .detail .iv-list-part .iv-detail-list-item-active, #image-viewer .detail .iv-list-part img:hover{
  border: 2px solid #027fff;
  opacity: 1;
}
#image-viewer .detail .iv-detail-part .toggle-zoomout{
  cursor: zoom-out;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
#image-viewer .detail .iv-detail-part #iv-right-arrow{
    cursor: url(data:application/octet-stream;base64,AAABAAEAEBwAAAEAIACYBwAAFgAAACgAAAAQAAAAOAAAAAEAIAAAAAAAAAcAABILAAASCwAAAAAAAAAAAAAAAAAG+fn5hfX19YEAAAAKAAAACQAAAAcAAAAFAAAAAwAAAAIAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAA+fn5gv//////////9fX1gwAAAAsAAAAJAAAABwAAAAUAAAADAAAAAgAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAP39/YL////////////////19fWEAAAACwAAAAkAAAAHAAAABQAAAAMAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAD+/v7gv////////////////X19YUAAAALAAAACQAAAAcAAAAFAAAAAwAAAAIAAAABAAAAAQAAAAEAAAAAAAAAAgAAAAP7+/uA////////////////9vb2hwAAAAsAAAAJAAAABwAAAAUAAAADAAAAAgAAAAEAAAABAAAAAQAAAAEAAAACAAAAA/v7+3/////////////////29vaIAAAACwAAAAkAAAAHAAAABQAAAAMAAAACAAAAAQAAAAEAAAABAAAAAQAAAAIAAAAD+/v7fv////////////////b29okAAAALAAAACQAAAAcAAAAFAAAAAwAAAAIAAAABAAAAAQAAAAEAAAABAAAAAgAAAAP7+/t8////////////////9vb2iwAAAAsAAAAJAAAABwAAAAUAAAADAAAAAgAAAAAAAAABAAAAAQAAAAEAAAACAAAAA/v7+3v////////////////29vaMAAAACwAAAAkAAAAHAAAABQAAAAMAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAIAAAAD+/v7ev////////////////b29o0AAAALAAAACQAAAAcAAAAFAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAAP7+/t4////////////////9vb2jwAAAAsAAAAJAAAABgAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAACAAAABPn5+Xj////////////////29vaQAAAACgAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAAQAAAAH9PT0ef////////////////j4+JAAAAAHAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAAMAAAAFAAAACAAAAAry8vJ5////////////////+/v7jwAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAAMAAAAFAAAABwAAAAkAAAAL9vb2iv////////////////v7+3QAAAAAAAAAAQAAAAEAAAABAAAAAgAAAAMAAAAFAAAABwAAAAkAAAAL9vb2iP////////////////v7+3cAAAADAAAAAQAAAAEAAAABAAAAAgAAAAMAAAAFAAAABwAAAAkAAAAL9fX1hf////////////////v7+3oAAAADAAAAAgAAAAEAAAABAAAAAgAAAAMAAAAFAAAABwAAAAkAAAAL9fX1gv////////////////v7+30AAAADAAAAAgAAAAEAAAABAAAAAgAAAAMAAAAFAAAABwAAAAkAAAAL9fX1f/////////////////v7+4AAAAADAAAAAgAAAAEAAAABAAAAAgAAAAMAAAAFAAAABwAAAAkAAAAL9fX1fP////////////////v7+4MAAAADAAAAAgAAAAEAAAABAAAAAQAAAAMAAAAFAAAABwAAAAkAAAAL9PT0ef////////////////v7+4YAAAADAAAAAgAAAAEAAAABAAAAAQAAAAAAAAAEAAAABgAAAAkAAAAK8vLyd/////////////////v7+4kAAAADAAAAAgAAAAEAAAABAAAAAQAAAAAAAAAAAAAABQAAAAgAAAAK8vLydf////////////////v7+4sAAAADAAAAAgAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAYAAAAI9PT0cf////////////////v7+44AAAADAAAAAgAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAF9vb2bf////////////////v7+5EAAAADAAAAAgAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAA+vr6af////7///////////39/ZMAAAADAAAAAgAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/Wr////+//////39/ZYAAAADAAAAAgAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/f39aP///5aAgIACAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAHAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAACAAAAAwAAAAOAAAADwAAAA8AAAAOAAAADAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAAHAAAADwAAAB8AAAA/AAAAfwAAAP8AAA==),auto;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 30%;
}
#image-viewer .detail .iv-detail-part img{
  transform-origin: top left;
  border: 2px solid #f4f5f7;
}
#image-viewer .detail .iv-detail-part{
  background-color: #f4f5f7;
  overflow: hidden;
  position: relative;
  transition: height .2s ease;
  width: 100%;
}

#image-viewer .detail .iv-list-part img {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  opacity: .6;
  transition: all .2s;
  width: 16%;
}

#image-viewer .detail .iv-list-part{
  margin-top: 8px;
}

#image-viewer .detail .iv-viewer-action-bar .panel-item{
  color: #76797e;
  cursor: pointer;
  display: inline-block;
  font-size: 13px;
  line-height: 32px;
  padding: 0 12px;
}
#image-viewer .detail .iv-viewer-action-bar{
  background-color: #f4f5f7;
  height: 32px;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

#image-viewer .detail{
  width: 100%;
}
#image-viewer .preview{
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
#image-viewer .preview img {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-right: 4px;
  margin-top: 4px;
  position: relative;
  width: 110px;
  cursor: zoom-in;

}
#image-viewer {
  width: 100%;
  background: white;
}

.clear-fix::after{
  content: "";
  display: table;
}

.clear-fix::after{
  clear: both;
}

#image-viewer img{
  max-width: 100%;
}

</style>
