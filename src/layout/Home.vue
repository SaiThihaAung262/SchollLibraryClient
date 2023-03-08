<template>
  <div class="page-tab">
    <router-view/>
  </div>
  <van-tabbar v-model="active">
    <van-tabbar-item
        replace
        :to="route.path"
        v-for="(route, index) in homeRouters"
        :key="index"
    >
      {{ t(route.meta.title) }}
      <template #icon>
        <van-icon class="menu-icon" :name="route.meta.icon_select" v-if="active == index"/>
        <van-icon class="menu-icon" :name="route.meta.icon" v-else/>
      </template>
    </van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">
import {onMounted, computed} from "vue";
import {homeRouters} from "../router/modules/home";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const router = useRouter();
const activeRoute = computed(() => {
  return router.currentRoute.value.path;
});

const active = computed({
  get() {
    return homeRouters.findIndex((item) => item.path === activeRoute.value);
  },
  set() {
  },
});


onMounted(() => {
});
</script>

<style lang="scss" scoped>
.page-tab {
  padding-top: var(--van-nav-bar-height);
  padding-bottom: var(--van-tabbar-height);
  position: relative;
}

.menu-icon {
  color: rgb(53, 84, 134);
}
</style>
