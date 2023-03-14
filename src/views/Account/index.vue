<template>
  <div class="account">
    <Nav title="Account" :left-arrow="false" />
    <div class="profile-con">
      <div class="profile-img-con">
        <img
          class="profile-img"
          src="./../../assets/images/profile.gif"
          alt=""
        />
      </div>
      <h2 class="name">{{ userDetails.name }}</h2>
      <p class="user-id">ID : {{ userDetails.uuid }}</p>
    </div>

    <div class="menu">
      <div class="menu-content">
        <div v-for="(item, index) in menuItem" :key="index">
          <van-row @click="goToPage(item.to)">
            <van-col span="2"> <img :src="item.icon" /> </van-col>
            <van-col span="21">
              <div class="cell-title">{{ item.name }}</div>
            </van-col>
            <van-col span="1">
              <van-icon name="arrow" />
            </van-col>
          </van-row>
          <div class="divider"></div>
        </div>
      </div>
    </div>

    <div class="logout-con">
      <button class="logout-btn" @click="logOut">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted } from "vue";
// @ts-ignore
import Nav from "../../components/CommonNav/index.vue";
// @ts-ignore
import ChangeLang from "./Components/changeLang.vue";
// @ts-ignore
import SwitchTheme from "./Components/switchTheme.vue";

import { getUserDetail } from "./../../api/user";
import { useUserStore } from "./../../store/useUserStore";
import { useRouter } from "vue-router";
import { showConfirmDialog } from "vant";

export default defineComponent({
  name: "home",
  layout: "home",
  components: {
    Nav,
    ChangeLang,
    SwitchTheme,
  },

  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const state = reactive({
      menuItem: [
        {
          name: "Borrow History",
          icon: new URL(`./../../assets/images/history.png`, import.meta.url)
            .href,
          to: "/borrowHistory",
        },
        {
          name: "Change Languages",
          icon: new URL(`./../../assets/images/language.png`, import.meta.url)
            .href,
          to: "/languages",
        },
        {
          name: "Change Theme",
          icon: new URL(`./../../assets/images/theme.png`, import.meta.url)
            .href,
          to: "/changeTheme",
        },
        {
          name: "Change password",
          icon: new URL(
            `./../../assets/images/password_icon.png`,
            import.meta.url
          ).href,
          to: "/changeTheme",
        },
      ],
      param: {
        uuid: userStore.user.uuid,
        type: userStore.user.user_type,
      },

      loading: false,
      userDetails: {} as any,
    });

    const goToPage = (val: any) => {
      console.log(val);
      router.push(val);
    };

    const getUserDetailData = () => {
      state.loading = true;
      getUserDetail(state.param).then((res) => {
        if (res.err_code == 0) {
          state.userDetails = res.data.user_data;
          state.loading = false;
        }
      });
    };

    const logOut = () => {
      showConfirmDialog({
        title: "LogOut",
        message: "Are you sure want to logout?",
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        cancelButtonColor: "red",
      })
        .then(() => {
          // on confirm
          localStorage.clear();
          router.push("/login");
          userStore.user = {};
        })
        .catch(() => {
          // on cancel
        });
    };
    onMounted(() => {
      getUserDetailData();
    });
    return {
      ...toRefs(state),
      goToPage,
      logOut,
    };
  },
});
</script>

<style lang="scss" scoped>
.account {
  .profile-con {
    width: 100%;
    .profile-img-con {
      display: block;
      margin: 0 auto;
      background: rgb(239, 239, 239);
      width: px2rem(176);
      height: px2rem(176);
      border-radius: 100%;
      border: px2rem(1) solid gray;
      .profile-img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .name {
      text-align: center;
      color: rgb(66, 66, 66);
      font-size: px2rem(48);
      line-height: px2rem(64);
      font-weight: 300;
      margin-top: px2rem(32);
    }
    .user-id {
      text-align: center;
      color: rgb(66, 66, 66);
      font-size: px2rem(28);
      line-height: px2rem(32);
      margin-top: px2rem(16);
    }
  }

  .menu {
    margin-top: px2rem(50);
    border-radius: px2rem(12);
    background: rgba(255, 255, 255, 1);
    .van-row {
      align-items: center;
    }
    .van-icon {
      font-size: px2rem(35);
      color: rgba(168, 160, 193, 1);
    }
    .menu-content {
      padding-top: px2rem(32);
      margin: 0 px2rem(42);
      img {
        width: px2rem(52);
        height: px2rem(52);
        margin-left: px2rem(4);
      }
      .cell-title {
        color: rgb(66, 66, 66);
        font-family: PingFang SC;
        font-weight: 300;
        font-size: px2rem(36);
        padding-left: px2rem(15);
        margin-top: px2rem(-7);
      }
      .divider {
        margin: px2rem(18) 0 px2rem(44) 0;
        transform: rotate(-0.172259deg);
        border-bottom: px2rem(2) solid rgba(244, 250, 250, 1);
      }
    }
  }
  .logout-con {
    margin-top: px2rem(100);
    width: 100%;
    .logout-btn {
      display: block;
      margin: 0 auto;
      background: rgb(238, 90, 90);
      width: px2rem(400);
      color: #fff;
      padding: px2rem(16) px2rem(10);
      border-radius: px2rem(10);
      font-size: px2rem(30);
    }
  }
}
</style>
