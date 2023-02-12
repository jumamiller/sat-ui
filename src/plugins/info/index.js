const InfoPlugin = {
  install(Vue) {
    Vue.prototype.$info = {
      show(params) {
        Event.$emit("show", params);
      },
    };
  },
};

export default InfoPlugin;
