import routes from "./authRoutes";
import store from "./authStore";

export { default as Auth } from "./middleware/Auth";
export { default as AuthService } from "./authService";

export default {
  install(Vue, options) {
    options.router.addRoute("/", ...routes);
    options.store.registerModule("Auth", store);
  },
};
