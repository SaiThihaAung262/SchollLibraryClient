<template>
  <div class="change-lang-con">
    <van-radio-group v-model="state.language">
      <van-cell-group inset>
        <van-cell :title="t('common.english')" clickable @click="checked = '1'">
          <template #right-icon>
            <van-radio name="en"/>
          </template>
        </van-cell>
        <van-cell :title="t('common.chinese')" clickable @click="checked = '2'">
          <template #right-icon>
            <van-radio name="cn"/>
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script setup>
import {changeLang} from "../../../locales/i18n";
import {reactive, watch} from "vue";
import {useI18n} from "vue-i18n";
import {useHomeStore} from "/@/store/useHomeStore.ts";

const {t} = useI18n()
let homeStore = useHomeStore()
// console.log(homeStore)

const state = reactive({
  language: localStorage.getItem("lang") || en
});

watch(() => state.language,
    (newValue, oldValue) => {
      console.log("Here is state.changeLang", state.language)
      changeLang(state.language)
      homeStore.setLanguage(state.language)
    }
)
</script>
<style lang="scss" scoped>
.change-lang-con {
}
</style>
