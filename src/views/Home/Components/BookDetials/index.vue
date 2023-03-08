<template>
  <div class="book-details">
    <Nav title="Details" />
    <div class="top-con">
      <div class="left-con">
        <h1 class="book-title">The Song of Achilles</h1>
        <div class="foot">
          <p class="book-author">By Madeline Miller</p>
          <p class="publish-date">Published Auguest 28 2022</p>
          <p class="available">Available : <span class="ava-count">0</span></p>
        </div>
      </div>
      <div class="right-con">
        <div class="book-cover">
          <img
            src="https://m.media-amazon.com/images/I/81msb6gUBTL._AC_UF1000,1000_QL80_.jpg"
            class="cover-img"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="mid-con">
      <div class="left-con">
        <h2 class="read">Reads</h2>
        <p class="read-count">6000</p>
      </div>
      <div class="right-con">
        <h2 class="chapter">Chapter</h2>
        <p class="chapter-count">24</p>
      </div>
    </div>

    <div class="desc-con">
      <h1 class="title">The Song of Achilles</h1>
      <p class="summary">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import Nav from "../../../../components/CommonNav/index.vue";
export default defineComponent({
  name: "login",
  layout: "login",
  components: {
    Nav,
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
.book-details {
  width: 100%;
  height: calc(100vh - var(--van-nav-bar-height));
  .top-con {
    width: 95%;
    margin: 0 auto;
    padding-top: calc(var(--van-nav-bar-height) + px2rem(40));
    display: flex;
    .left-con {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: px2rem(40) 0;
      .book-title {
        color: rgb(66, 66, 66);
        font-weight: 500;
        font-size: px2rem(70);
        line-height: px2rem(90);
      }
      .foot {
        .available {
          font-size: px2rem(28);
          color: rgb(191, 191, 191);
          margin-top: px2rem(20);
          .ava-count {
            color: blue;
            font-size: px2rem(30);
            font-weight: bold;
          }
        }
        .book-author {
          color: rgb(191, 191, 191);
          font-size: px2rem(34);
          margin-top: px2rem(20);
        }
        .publish-date {
          color: rgb(191, 191, 191);
          font-size: px2rem(28);
          margin-top: px2rem(20);
        }
      }
    }
    .right-con {
      width: 50%;
      .book-cover {
        width: 100%;
        height: px2rem(470);
        .cover-img {
          width: 90%;
          height: 100%;
          display: block;
          margin: 0 auto;
          object-fit: contain;
        }
      }
    }
  }
  .mid-con {
    width: 95%;
    margin: 0 auto;
    margin-top: px2rem(100);
    display: flex;
    .left-con {
      width: 50%;
      border-right: px2rem(1) solid rgb(191, 191, 191);
      text-align: center;
      .read {
        color: rgb(66, 66, 66);
        font-size: px2rem(50);
      }
      .read-count {
        color: rgb(191, 191, 191);
        font-size: px2rem(40);
        margin-top: px2rem(20);
      }
    }
    .right-con {
      width: 50%;
      text-align: center;
      .chapter {
        font-size: px2rem(50);
        color: rgb(66, 66, 66);
      }
      .chapter-count {
        color: rgb(191, 191, 191);
        font-size: px2rem(40);
        margin-top: px2rem(20);
      }
    }
  }
  .desc-con {
    width: 95%;
    margin: 0 auto;
    .title {
      font-size: px2rem(40);
      color: rgb(66, 66, 66);
      font-weight: 400;
      line-height: px2rem(50);
      margin-top: px2rem(70);
    }
    .summary {
      font-size: px2rem(30);
      color: rgb(191, 191, 191);
      line-height: px2rem(50);
      margin-top: px2rem(30);
    }
  }
}
</style>
