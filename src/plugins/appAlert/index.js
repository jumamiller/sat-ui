import appAlert from "./appAlert";
import {EventBus} from "../../../shared/utilities/event-bus";

const alertPlugin = {
  install(Vue) {
    Vue.component("app-alert", appAlert);

    Vue.prototype.$alert = (params) => {
      EventBus.$emit("show-app-alert", params);
    };
  },
};

export default alertPlugin;
