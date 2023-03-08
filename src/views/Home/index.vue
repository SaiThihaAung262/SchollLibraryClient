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
    <div class="book-list-con"></div>
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

export default defineComponent({
  name: "home",
  layout: "home",
  components: {
    Nav,
  },

  setup() {
    let homeStore = useHomeStore();
    const state = reactive({
      searchValue: "",
      showCategoryPicker: false,
      articleList: [] as ArticleInfo[],
      totalArticle: 0,
      categories: [
        { text: "Delaware", value: "1" },
        { text: "Florida", value: "2" },
        { text: "Wenzhou", value: "3" },
        { text: "Indiana", value: "4" },
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

    onMounted(() => {
      getHomeArticleList();
    });
    return {
      ...toRefs(state),
      onConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  .filter-con {
    //background: rgb(241, 224, 224);
    padding: px2rem(20);
    .category-field {
      border-radius: px2rem(10);
      background: rgb(243, 239, 239);
    }
  }
}
</style>
