import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useUserStore = defineStore("user-store", {
  state: () => {
    return {
      user: useLocalStorage("user", {} as any),
    };
  },
  actions: {},
});
