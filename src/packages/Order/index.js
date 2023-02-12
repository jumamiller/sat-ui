import OrderRoutes from "@/packages/Order/OrderRoutes";
import OrderStore from "@/packages/Order/OrderStore";
import OrderLinks from "@/packages/Order/OrderLinks";

export default {
    install(Vue, options) {
        if (options.router) {
            options.router.addRoute(...OrderRoutes)
        }
        if (options.store) {
            options.store.registerModule('OrderManagement', OrderStore)
            options.store.commit('Dashboard/SET_LINKS', OrderLinks)
        }
    }
}
