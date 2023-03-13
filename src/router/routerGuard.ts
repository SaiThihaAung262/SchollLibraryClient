import { Router } from "vue-router";
import { useUserStore } from "../store/useUserStore";
import { pinia } from "../store";

const userStore = useUserStore(pinia);

// const list = ["/home", "/login", "/register"];
const list = ["/login"];

export function createRouterGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    const { path } = to;
    const token = userStore.user.token;
    const isWhite = list.includes(path);
    if (!token) {
      if (!isWhite) {
        next("/login");
      }
    }
    next();
  });
}
