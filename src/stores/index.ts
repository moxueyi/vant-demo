import { createPinia } from "pinia";
import { App } from "vue";
import useGradeStore from "./student";

const pinia = createPinia();

const setupStore = (app: App) => {
    app.use(pinia);
}

export {
    setupStore,
    useGradeStore,
};