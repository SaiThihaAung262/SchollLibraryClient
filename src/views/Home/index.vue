<template>
  <div class="home">
    <Nav title="UCS(Lashio) Library" :left-arrow="false" />
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
    <van-list
      v-model="loading"
      finish-text="No more data"
      :immediate-check="false"
      @load="onload"
    >
      <div class="book-list-con">
        <div
          class="card"
          v-for="item in bookLists"
          :key="item"
          @click="goToBookDetail(item.uuid)"
        >
          <div class="cover-img-con">
            <img class="cover-img" :src="item.book_image" alt="" />
          </div>
          <div class="card-footer">
            <h2 class="book-title">{{ item.title }}</h2>
            <p class="book-author">{{ item.author }}</p>
          </div>
        </div>
      </div>
    </van-list>
  </div>

  <van-popup v-model:show="showCategoryPicker" round position="bottom">
    <van-picker
      title="Categories"
      confirm-button-text="Confirm"
      cancel-button-text="Cancel"
      :columns="categoryLists"
      @cancel="showCategoryPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, computed } from "vue";
import { useHomeStore } from "../../store/useHomeStore";
import { ArticleInfo } from "../../types/index";
import { getHomeBooks, getBookSubCategories } from "../../api/other";
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
      totalArticle: 0,
      categories: [] as any,
      params: {
        page: 1,
        page_size: 6,
        category_id: 0,
      },
      cateParam: {
        page: 1,
        page_size: 100,
      },
      bookLists: [] as any,
      categoryLists: [] as any,
      loading: false,
      allowLoad: true,
      totalPage: 0,
    });

    const getHomeBookLists = () => {
      state.allowLoad = false;
      state.loading = true;
      getHomeBooks(state.params).then((res) => {
        if (res.err_code == 0) {
          state.bookLists = state.bookLists.concat(res.data.list || []);
          state.totalPage =
            (res.data.total + state.params.page_size - 1) /
            state.params.page_size;
          state.allowLoad = true;
          state.loading = false;
        }
      });
    };

    const getCategoryLists = () => {
      getBookSubCategories(state.cateParam).then((res) => {
        state.categories = res.data.list;
        state.categories.map((item: any) => {
          state.categoryLists.push({
            value: item.id,
            text: item.sub_category_name,
          });
        });
      });
    };

    const onConfirm = (data: any) => {
      state.bookLists = [];
      state.showCategoryPicker = false;
      state.searchValue = data.selectedOptions[0].text;
      state.params.category_id = data.selectedValues[0];
      console.log(data.selectedValues[0]);
      getHomeBookLists();
    };

    const goToBookDetail = (val: any) => {
      console.log(val);
      router.push({
        path: "/bookDetails",
        query: {
          id: val,
        },
      });
    };

    const onload = () => {
      console.log("here is on load");
      if (state.allowLoad) {
        state.loading = true;
        if (state.params.page < state.totalPage) {
          state.params.page++;
          getHomeBookLists();
          return;
        } else {
          state.loading = false;
        }
      }
    };

    onMounted(() => {
      getHomeBookLists();
      getCategoryLists();
    });
    return {
      ...toRefs(state),
      onConfirm,
      goToBookDetail,
      onload,
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
    width: 100%;
    position: fixed;
    top: 7.6%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--home-bg);

    .category-field {
      width: 95%;
      margin: 0 auto;
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
      border-radius: px2rem(10);

      .cover-img-con {
        width: 100%;
        height: px2rem(400);
        border-radius: px2rem(10) px2rem(10) px2rem(0) px2rem(0);
        .cover-img {
          width: 100%;
          height: 100%;
          border-radius: px2rem(10) px2rem(10) px2rem(0) px2rem(0);
          object-fit: contain;
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
