import {createApp} from "vue";
import App from "./App.vue";
import {setupRouter} from "./router";
import {setupPlugins} from "./plugins";
import {pinia} from "./store";
import i18n from "./locales/i18n";

const app = createApp(App);

setupRouter(app);
setupPlugins(app);
app.use(i18n);
app.use(pinia);

app.mount("#app");
