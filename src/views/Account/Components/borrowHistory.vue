<template>
  <div class="book-details">
    <Nav title="Borrow History" />
    <div class="container">
      <van-list
        v-model="loading"
        finish-text="No more data"
        :immediate-check="false"
        @load="onload"
      >
        <div class="card" v-for="item in borrowHistory" :key="item">
          <div class="left-con">
            <img class="image" :src="item.book_data.book_image" alt="" />
          </div>
          <div class="mid-con">
            <p class="book-title">{{ item.book_data.title }}</p>
            <p class="borrow-time">{{ setOriginDate(item.created_at) }}</p>
          </div>
          <div class="right-con">
            <van-tag type="warning" size="large" v-if="item.status == 1"
              >Borrowing</van-tag
            >
            <van-tag type="success" size="large" v-if="item.status == 2"
              >Returned</van-tag
            >
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
// @ts-ignore
import Nav from "./../../../components/CommonNav/index.vue";
import { useRoute } from "vue-router";
import { getBorrowHistory } from "./../../../api/other";
import { useUserStore } from "./../../../store/useUserStore";
import { setOriginDate } from "./../../../utils/timeformat";

export default defineComponent({
  name: "bookDetail",
  layout: "bookDetail",
  components: {
    Nav,
  },
  setup() {
    const route = useRoute();
    const userStore = useUserStore();

    const state = reactive({
      param: {
        page: 1,
        page_size: 10,
        user_uuid: userStore.user.uuid,
      },
      loading: false,
      borrowHistory: [] as any,
      allowLoad: true,
      totalPage: 0,
    });

    const getBorrowHistoryList = () => {
      state.loading = true;
      getBorrowHistory(state.param).then((res) => {
        if (res.err_code == 0) {
          state.borrowHistory = state.borrowHistory.concat(res.data.list || []);
          state.totalPage =
            (res.data.total + state.param.page_size - 1) /
            state.param.page_size;
          state.allowLoad = true;
          state.loading = false;
        }
      });
    };

    const onload = () => {
      console.log("here is on load");
      if (state.allowLoad) {
        state.loading = true;
        if (state.param.page < state.totalPage) {
          state.param.page++;
          getBorrowHistoryList();
          return;
        } else {
          state.loading = false;
        }
      }
    };
    onMounted(() => {
      getBorrowHistoryList();
    });

    return {
      ...toRefs(state),
      onload,
      setOriginDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.book-details {
  width: 100%;
  padding-top: calc(var(--van-nav-bar-height) + px2rem(40));
  height: calc(100vh - var(--van-nav-bar-height) - px2rem(40));
  .container {
    width: 95%;
    margin: 0 auto;
    .card {
      display: flex;
      width: 100%;
      border-radius: px2rem(10);
      padding: px2rem(20) px2rem(0);
      background: rgb(241, 241, 248);
      margin-bottom: px2rem(40);
      .left-con {
        width: 20%;
        // background: blue;
        display: flex;
        align-items: center;
        justify-content: center;
        .image {
          width: px2rem(100);
          height: px2rem(130);
          object-fit: cover;
          border-radius: px2rem(10);
        }
      }
      .mid-con {
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: top;
        // background: red;
        .book-title {
          font-size: px2rem(44);
          font-weight: 300;
          line-height: px2rem(55);
        }
        .borrow-time {
          font-size: px2rem(28);
          font-weight: 300;
          line-height: px2rem(55);
        }
      }
      .right-con {
        // background: green;
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
