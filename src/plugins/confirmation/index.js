import confirmation from "./Confirmation";

const ConfirmPlugin = {
  install(Vue) {
    Vue.component("confirmation", confirmation);
    Vue.prototype.$confirm = {
      show(params) {
        Event.$emit("show", params);
      },
    };
  },
};

export default ConfirmPlugin;
