<template>
  <div class="book-details">
    <Nav title="Details" />
    <div class="top-con">
      <div class="left-con">
        <h1 class="book-title">{{ bookDetial.title }}</h1>
        <div class="foot">
          <p class="book-author">By {{ bookDetial.author }}</p>
          <!-- <p class="publish-date">Available date: Auguest 28 2022</p> -->
          <!-- <p class="available">
            Available :
            <span class="ava-count">{{
              bookDetial.available_qty - bookDetial.borrow_qty
            }}</span>
          </p> -->
        </div>
      </div>
      <div class="right-con">
        <div class="book-cover">
          <img :src="bookDetial.book_image" class="cover-img" alt="" />
        </div>
      </div>
    </div>

    <div class="mid-con">
      <div class="left-con">
        <h2 class="read">Reads</h2>
        <p class="read-count">6000</p>
      </div>
      <div class="right-con">
        <h2 class="chapter">Available</h2>
        <p class="chapter-count">
          {{ bookDetial.available_qty - bookDetial.borrow_qty }}
        </p>
      </div>
    </div>

    <div class="desc-con">
      <h1 class="title">{{ bookDetial.title }}</h1>
      <p class="summary">
        {{ bookDetial.summary }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
// @ts-ignore
import Nav from "./../../../../components/CommonNav/index.vue";
import { useRoute } from "vue-router";
import { getBookDetails } from "./../../../../api/other";
export default defineComponent({
  name: "bookDetail",
  layout: "bookDetail",
  components: {
    Nav,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      bookDetial: {} as any,
      param: {
        uuid: route.query.id,
      },
      loading: false,
    });

    const getBookDetail = () => {
      state.loading = true;
      getBookDetails(state.param).then((res) => {
        if (res.err_code == 0) {
          state.bookDetial = res.data;
          state.loading = false;
        }
      });
    };
    onMounted(() => {
      getBookDetail();
    });

    return {
      ...toRefs(state),
    };
  },
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
        //text-transform: uppercase;
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
          object-fit: cover;
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
