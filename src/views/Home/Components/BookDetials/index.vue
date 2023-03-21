<template>
  <div class="book-details">
    <Nav title="Details" />
    <div class="top-con">
      <div class="left-con">
        <h1 class="book-title">{{ bookDetial.title }}</h1>
        <div class="foot">
          <p class="book-author">By {{ bookDetial.author }}</p>
          <p class="publish-date">
            Punlish date: {{ bookDetial.publish_date }}
          </p>
          <p class="available" v-if="bookDetial.download_link != ''">
            <a class="link" :href="bookDetial.download_link">Download here</a>
          </p>
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
        <p class="read-count">{{ borrow_count }}</p>
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
        <!-- Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. -->
      </p>
    </div>
    <van-submit-bar
      :loading="loading"
      button-color="rgb(95, 130, 245)"
      button-text="Borrow"
      @submit="onClickBorrow"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
// @ts-ignore
import Nav from "./../../../../components/CommonNav/index.vue";
import { useRoute } from "vue-router";
import { getBookDetails, borrowBook } from "./../../../../api/other";
import { showConfirmDialog, showSuccessToast } from "vant";
import { useUserStore } from "./../../../../store/useUserStore";

export default defineComponent({
  name: "bookDetail",
  layout: "bookDetail",
  components: {
    Nav,
  },
  setup() {
    const userStore = useUserStore();

    const route = useRoute();
    const state = reactive({
      bookDetial: {} as any,
      borrow_count: 0,
      param: {
        uuid: route.query.id,
      },
      loading: false,
      form: {
        user_uuid: userStore.user.uuid,
        book_uuid: route.query.id,
        type: userStore.user.user_type,
      },
    });

    const getBookDetail = () => {
      state.loading = true;
      getBookDetails(state.param).then((res) => {
        if (res.err_code == 0) {
          state.bookDetial = res.data.book_data;
          state.borrow_count = res.data.borrow_count;
          state.loading = false;
        }
      });
    };

    const onClickBorrow = () => {
      state.loading = true;
      showConfirmDialog({
        title: "Borrow Book",
        message: "Are you sure want to borrow?",
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        cancelButtonColor: "red",
      })
        .then(() => {
          // on confirm
          console.log(state.form);
          borrowBook(state.form)
            .then((res) => {
              if (res.err_code == 0) {
                showSuccessToast("Success");
                state.loading = false;
              }
            })
            .catch(() => {
              state.loading = false;
            });
        })
        .catch(() => {
          state.loading = false;
        });
    };
    onMounted(() => {
      getBookDetail();
    });

    return {
      ...toRefs(state),
      onClickBorrow,
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
        font-size: px2rem(66);
        line-height: px2rem(80);
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
          .link {
            color: rgb(28, 28, 255);
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
          box-shadow: 0px px2rem(5) px2rem(40) rgb(183, 183, 183);
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
    padding-bottom: px2rem(150);
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

  :deep(.van-submit-bar__bar) {
    box-shadow: 0px px2rem(5) px2rem(40) rgb(183, 183, 183);
    padding: px2rem(10) px2rem(15) px2rem(15) px2rem(15) !important;
  }
}
</style>
