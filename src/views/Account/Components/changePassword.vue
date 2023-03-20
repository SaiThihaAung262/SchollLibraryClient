<template>
  <div class="chagne-pass">
    <Nav title="Change Password" />
    <div class="change-pass-con">
      <div class="form">
        <div class="custom-input">
          <div class="icon">
            <img src="./../../../assets/images/password_icon.png" />
          </div>
          <div class="input">
            <input
              type="password"
              v-model="state.form.password"
              placeholder="Current Password"
            />
          </div>
        </div>
        <div class="custom-input">
          <div class="icon">
            <img src="./../../../assets/images/password_icon.png" />
          </div>
          <div class="input">
            <input
              type="password"
              v-model="state.form.new_password"
              placeholder="New Password"
            />
          </div>
        </div>
        <div class="custom-input">
          <div class="icon">
            <img src="./../../../assets/images/password_icon.png" />
          </div>
          <div class="input">
            <input
              type="password"
              v-model="state.confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <van-button
          :loading="state.loading"
          loading-type="spinner"
          @click="chagnePasswordHandler"
          class="btn"
        >
          <!-- :disabled="loginDisable" -->
          Change Password
        </van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch, reactive } from "vue";
import { useUserStore } from "./../../../store/useUserStore";
import { useRouter } from "vue-router";
// @ts-ignore
import Nav from "./../../../components/CommonNav/index.vue";
import { showNotify } from "vant";
import { getUserDetail, changePassword } from "./../../../api/user";

const userStore = useUserStore();
const router = useRouter();

const state = reactive({
  confirmPassword: "",
  param: {
    uuid: userStore.user.uuid,
    type: userStore.user.user_type,
  },

  form: {
    type: 0,
    id: 0,
    email: "",
    password: "",
    new_password: "",
  },

  loading: false,
  userDetails: {} as any,
});

const getUserDetailData = () => {
  state.loading = true;
  getUserDetail(state.param).then((res) => {
    if (res.err_code == 0) {
      state.userDetails = res.data.user_data;

      state.form.type = res.data.type;
      state.form.id = state.userDetails.id;
      state.form.email = state.userDetails.email;

      state.loading = false;
    }
  });
};

const chagnePasswordHandler = () => {
  if (state.form.new_password !== state.confirmPassword) {
    showNotify({ type: "warning", message: "Password not same!" });
    return;
  }
  changePassword(state.form).then((res) => {
    if (res.err_code == 0) {
      showNotify({ type: "success", message: "Change password successful" });
      router.push("/account");
    }
  });
};
onMounted(() => {
  getUserDetailData();
});
</script>
<style lang="scss" scoped>
.chagne-pass {
  width: 100%;
  height: 100vh;
  position: relative;
  .change-pass-con {
    width: 100%;
    position: absolute;
    z-index: 100;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    .form {
      margin: px2rem(72) px2rem(80) 0 px2rem(80);

      .custom-input {
        height: px2rem(104);
        border-radius: px2rem(12);
        background-color: rgb(205, 205, 205);
        display: flex;
        align-items: center;
        margin-bottom: px2rem(44);
        gap: px2rem(50);
        z-index: 1000;
        .icon {
          margin-left: px2rem(50);
          img {
            width: px2rem(45);
          }
        }
        input {
          width: px2rem(400);
          color: #000;
          font-family: PingFang SC;
          font-size: px2rem(36);
        }
        input::placeholder {
          color: rgba(150, 150, 150, 1);
        }
      }
      .secure-code {
        display: flex;
        align-items: cneter;
        position: relative;
        .icons {
          margin-left: px2rem(158);
          img {
            width: px2rem(45);
          }
        }
        .inputs {
          width: px2rem(270);
          input {
            width: px2rem(270);
          }
        }
        canvas {
          position: absolute;
          right: px2rem(10);
          top: 26%;
        }
      }
      .btn {
        display: block;
        margin: 0 auto;
        margin-top: px2rem(40);
        width: px2rem(692);
        height: px2rem(94);
        border-radius: px2rem(12);
        background: rgb(95, 130, 245);
        border: none;
        color: rgba(255, 255, 255, 1);
        font-family: PingFang SC;
        font-size: px2rem(36);
      }
      .btn:disabled {
        opacity: 0.5;
      }
    }
  }
}
</style>
