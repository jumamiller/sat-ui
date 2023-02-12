import FleetRoutes from "@/packages/Fleet/FleetRoutes";
import FleetStore from "@/packages/Fleet/FleetStore";
import FleetLinks from "@/packages/Fleet/FleetLinks";

export default {
    install(Vue, options) {
        if (options.router) {
            options.router.addRoute(...FleetRoutes)
        }
        if (options.store) {
            options.store.registerModule('FleetManagement', FleetStore)
            options.store.commit('Dashboard/SET_LINKS', FleetLinks)
        }
    }
}
