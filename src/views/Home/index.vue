<template>
  <div class="home">
    <Nav title="UCSL Library" :left-arrow="false" />
    <div class="filter-con">
      <van-field
        v-model="searchValue"
        class="category-field"
        is-link
        readonly
        placeholder="Choose Category"
        @click="showCategoryPicker = true"
      />
    </div>
    <div class="book-list-con">
      <div
        class="card"
        v-for="item in 4"
        :key="item"
        @click="goToBookDetail(item)"
      >
        <div class="cover-img-con">
          <img
            class="cover-img"
            src="https://josipmisko.com/img/books/Effective-TypeScript-9781492053712.jpg"
            alt=""
          />
        </div>
        <div class="card-footer">
          <h2 class="book-title">Effective-Typescript</h2>
          <p class="book-author">Josip Moskovic</p>
        </div>
      </div>
    </div>
  </div>

  <van-popup v-model:show="showCategoryPicker" round position="bottom">
    <van-picker
      title="Categories"
      confirm-button-text="Confirm"
      cancel-button-text="Cancel"
      :columns="categories"
      @cancel="showCategoryPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, computed } from "vue";
import { useHomeStore } from "../../store/useHomeStore";
import { ArticleInfo } from "../../types/index";
// @ts-ignore
import Nav from "../../components/CommonNav/index.vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "home",
  layout: "home",
  components: {
    Nav,
  },

  setup() {
    let router = useRouter();
    let route = useRoute();
    let homeStore = useHomeStore();
    const state = reactive({
      searchValue: "",
      showCategoryPicker: false,
      articleList: [] as ArticleInfo[],
      totalArticle: 0,
      categories: [
        { text: "Computer & Tech", value: "1" },
        { text: "Edu & Reference", value: "2" },
        { text: "Art & Music", value: "3" },
        { text: "Health & Fitnes", value: "4" },
        { text: "Maine", value: "5" },
      ],
    });

    const getHomeArticleList = () => {
      homeStore.getArticleData().then((res) => {
        state.articleList = res.list;
        state.totalArticle = res.total;
      });
    };

    const onConfirm = (data: any) => {
      state.showCategoryPicker = false;
      state.searchValue = data.selectedOptions[0].text;
      console.log(data.selectedValues[0]);
    };

    const goToBookDetail = (val: any) => {
      console.log(val);
      router.push({
        path: "/BookDetails",
        query: {
          id: val,
        },
      });
    };

    onMounted(() => {
      getHomeArticleList();
    });
    return {
      ...toRefs(state),
      onConfirm,
      goToBookDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: calc(100vh - var(--van-nav-bar-height) - var(--van-tabbar-height));
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  .filter-con {
    border-radius: px2rem(10);
    width: 95%;
    position: fixed;
    top: 7.7%;
    left: 50%;
    transform: translate(-50%, -50%);
    .category-field {
      border-radius: px2rem(10);
      background: rgba(239, 239, 239, 1);
    }
  }
  .book-list-con {
    width: 95%;
    margin: 0 auto;
    margin-top: px2rem(120);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .card {
      background: rgba(239, 239, 239, 1);
      width: px2rem(380);
      margin-bottom: px2rem(30);

      .cover-img-con {
        width: 100%;
        height: px2rem(500);
        .cover-img {
          width: 100%;
          height: 100%;
        }
      }

      .card-footer {
        width: 100%;
        padding: px2rem(20);
        .book-title {
          width: 90%;
          font-size: px2rem(38);
          color: rgb(66, 66, 66);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 400;
        }
        .book-author {
          width: 90%;
          margin-top: px2rem(10);
          font-size: px2rem(30);
          color: rgb(191, 191, 191);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
