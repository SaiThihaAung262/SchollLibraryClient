<template>
  <div class="login">
    <div class="content">
      <div class="logo">
        <img src="./../../assets/images/logo.jpeg" />
      </div>
      <div class="form">
        <div class="type-input">
          <van-radio-group v-model="form.type" direction="horizontal">
            <van-radio :name="1"
              ><span style="color: #fff">Teacher</span></van-radio
            >
            <van-radio :name="2"
              ><span style="color: #fff">Student</span></van-radio
            >
            <van-radio :name="3"
              ><span style="color: #fff">Staff</span></van-radio
            >
          </van-radio-group>
        </div>
        <div class="custom-input">
          <div class="icon">
            <img src="./../../assets/images/user_icon.png" />
          </div>
          <div class="input">
            <input type="text" v-model="form.email" placeholder="Email" />
          </div>
        </div>
        <div class="custom-input">
          <div class="icon">
            <img src="./../../assets/images/password_icon.png" />
          </div>
          <div class="input">
            <input
              type="password"
              v-model="form.password"
              placeholder="Password"
            />
          </div>
        </div>
        <van-button
          :loading="loading"
          loading-type="spinner"
          @click="loginHandler"
          :disabled="loginDisable"
          class="btn"
        >
          Login
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, onUpdated } from "vue";
import { useHomeStore } from "../../store/useHomeStore";
import { LoginData } from "../../types/index";
import { useUserStore } from "../../store/useUserStore";
import { login } from "./../../api/user";
import { useRouter } from "vue-router";
import { showNotify } from "vant";

export default defineComponent({
  name: "login",
  layout: "login",
  components: {},

  setup() {
    let userStore = useUserStore();
    const router = useRouter();
    const state = reactive({
      form: {
        type: 1,
        email: "",
        password: "",
      },
      loading: false,
      loginDisable: true,
    });

    const loginHandler = () => {
      console.log("hee hee login");
      login(state.form).then((res) => {
        console.log(res);
        if (res.err_code == 0) {
          userStore.user = res.data;
          showNotify({ type: "success", message: "Login Successful" });
          router.push("/");
        }
      });
    };

    onUpdated(() => {
      if (state.form.email && state.form.password.length) {
        state.loginDisable = false;
      } else {
        state.loginDisable = true;
      }
    });
    onMounted(() => {});
    return {
      ...toRefs(state),
      loginHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  position: relative;

  .content {
    width: 100%;
    position: absolute;
    z-index: 100;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

    position: relative;
    filter: brightness(0.8);
    .logo {
      text-align: center;
      img {
        width: px2rem(185);
      }
    }
    .form {
      margin: px2rem(72) px2rem(80) 0 px2rem(80);
      .type-input {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: px2rem(44);
      }
      .custom-input {
        height: px2rem(104);
        border-radius: px2rem(12);
        background-color: #fff;
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
    }
    .msg {
      text-align: center;
      color: rgba(255, 255, 255, 1);
      font-family: PingFang SC;
      font-size: px2rem(36);
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

.login::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("./../../assets/images/lib_bg.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 1;
}
</style>
