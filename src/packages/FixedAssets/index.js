import FixedAssetRoutes from "@/packages/FixedAssets/FixedAssetRoutes";
import FixedAssetStore from "@/packages/FixedAssets/FixedAssetStore";
import FixedAssetLinks from "@/packages/FixedAssets/FixedAssetLinks";

export default {
    install(Vue, options) {
        if (options.router) {
            options.router.addRoute(...FixedAssetRoutes)
        }
        if (options.store) {
            options.store.registerModule('FixedAsset', FixedAssetStore)
            options.store.commit('Dashboard/SET_LINKS', FixedAssetLinks)
        }
    }
}
