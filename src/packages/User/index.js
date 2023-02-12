import UserRoutes from "@/packages/User/UserRoutes";
import UserStore from "@/packages/User/UserStore";
import UserLinks from "@/packages/User/UserLinks";

export default {
    install(Vue, options) {
        if (options.router) {
            options.router.addRoute(...UserRoutes)
        }
        if (options.store) {
            options.store.registerModule('UserManagement', UserStore)
            options.store.commit('Dashboard/SET_LINKS', UserLinks)
        }
    }
}
