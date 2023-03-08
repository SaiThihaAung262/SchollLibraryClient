<template>
  <van-nav-bar
    class="navbar"
    :title="title"
    :left-text="leftText"
    :left-arrow="leftArrow"
    @click-left="onClickLeft()"
    :right-text="rightText"
    @click-right="onClickRight()"
    :fixed="fixed"
    :style="{ fontFamily: 'SF Pro', zIndex: '100' }"
  >
    >
    <template #right v-if="!rightText">
      <slot></slot>
    </template>
  </van-nav-bar>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const props = defineProps({
  title: {
    default: "",
    type: String,
  },
  leftText: {
    default: "",
    type: String,
  },
  back: {
    default: true,
    type: Boolean,
  },
  leftArrow: {
    default: true,
    type: Boolean,
  },
  rightText: {
    default: "",
    type: String,
  },
  fixed: {
    default: true,
    type: Boolean,
  },
  return: {
    default: "",
    type: String,
  },
  backToThat: {
    default: null,
    type: Object,
  },
});
const router = useRouter();
const emit = defineEmits(["onClickLeft", "onClickRight"]);
const onClickLeft = () => {
  if (props.return !== "") {
    router.push(props.return);
  } else if (props.backToThat !== null) {
    let orderDetail = {
      order_number: "",
      own_order: true,
    };
    router.push(props.backToThat);
  } else {
    window.history.go(-1);
  }
  emit("onClickLeft");
};
const onClickRight = () => {
  emit("onClickRight");
};
</script>

<style lang="scss" scoped>
.navbar {
  //background: rgb(53, 84, 134);

  :deep(.van-nav-bar__title) {
    color: #111;
    font-family: DIN;
    font-weight: bold;
    letter-spacing: px2rem(1);
  }

  :deep(.van-icon) {
    color: #fff;
  }
}
.van-hairline--bottom:after {
  border-bottom-width: 0px !important;
}
</style>
