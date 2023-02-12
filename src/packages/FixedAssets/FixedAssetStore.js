import call from "../../../shared/service/http";
import FixedAssetConstants from "@/packages/FixedAssets/FixedAssetConstants";

export default {
    namespaced: true,
    state: {
        submitting:false,
        //
        assets: [],
        asset: {},
        assetsReadyForTransfer:[],
        assetsPendingApproval:[],
        assetsRejectedTransfer:[],
        assetsCheckoutCompleted:[],
        suppliers:[],
        locations:[],
        classes:[],
        subClasses:[],
        conditions:[]
    },
    mutations: {
        MUTATE: (state, payload) => {
            state[payload.state] = payload.data;
        },
    },
    getters: {
        FixedAssetGetter: (state) => (setup) => state[setup],
    },
    actions: {
        /**
         * GET assets
         * @param commit
         */
        getAssets({commit}) {
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('get', FixedAssetConstants.FIXED_ASSETS)
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "assets",
                            data: res.data.data,
                        });
                    }
                    else{
                        Event.$emit("ApiError", 'Something went wrong');
                    }
                })
                .catch(err=>{
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         * Get an asset
         * @param commit
         * @param payload
         */
        getAsset({commit},payload) {
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('get', FixedAssetConstants.FIXED_ASSET(payload))
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    commit("MUTATE", {
                        state: "asset",
                        data: res.data['asset'],
                    });
                    // if (res.data.status) {
                    //     commit("MUTATE", {
                    //         state: "asset",
                    //         data: res.data['asset'],
                    //     });
                    // }
                    // else{
                    //     Event.$emit("ApiError", 'Something went wrong');
                    // }
                })
                .catch(err=>{
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         * GET assets ready
         * @param commit
         */
        getAssetsReadyForTransfer({commit}) {
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('get', FixedAssetConstants.FIXED_ASSETS_READY_FOR_TRANSFER)
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "assetsReadyForTransfer",
                            data: res.data.data,
                        });
                    }
                    else{
                        Event.$emit("ApiError", 'Something went wrong');
                    }
                })
                .catch(err=>{
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         * Pending approval
         * @param commit
         */
        getAssetsPendingApproval({commit}) {
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('get', FixedAssetConstants.FIXED_ASSETS_PENDING_APPROVALS)
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "assetsPendingApproval",
                            data: res.data.data,
                        });
                    }
                    else{
                        Event.$emit("ApiError", 'Something went wrong');
                    }
                })
                .catch(err=>{
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         * Pending approval
         * @param commit
         */
        getAssetsCompleteCheckout({commit}) {
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('get', FixedAssetConstants.FIXED_ASSETS_COMPLETE_CHECKOUT)
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "assetsCheckoutCompleted",
                            data: res.data.data,
                        });
                    }
                    else{
                        Event.$emit("ApiError", 'Something went wrong');
                    }
                })
                .catch(err=>{
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         * Rejected
         * @param commit
         */
        getAssetsRejectedTransfer({commit}) {
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('get', FixedAssetConstants.FIXED_ASSETS_REJECTED_TRANSFERS)
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "assetsRejectedTransfer",
                            data: res.data.data,
                        });
                    }
                    else{
                        Event.$emit("ApiError", 'Something went wrong');
                    }
                })
                .catch(err=>{
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         * Get suppliets
         * @param commit
         */
        getSuppliers({commit}) {
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('get', FixedAssetConstants.SUPPLIERS)
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "suppliers",
                            data: res.data.data,
                        });
                    }
                    else{
                        Event.$emit("ApiError", 'Something went wrong');
                    }
                })
                .catch(err=>{
                    Event.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         * Get suppliets
         * @param commit
         */
        getLocations({commit}) {
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('get', FixedAssetConstants.LOCATIONS)
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "locations",
                            data: res.data.data,
                        });
                    }
                    else{
                        Event.$emit("ApiError", 'Something went wrong');
                    }
                })
                .catch(err=>{
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         * GET classes
         * @param commit
         */
        getClasses({commit}) {
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('get', FixedAssetConstants.CLASSES)
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "classes",
                            data: res.data.data,
                        });
                    }
                    else{
                        Event.$emit("ApiError", 'Something went wrong');
                    }
                })
                .catch(err=>{
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         *
         * @param commit
         */
        getSubClasses({commit}) {
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('get', FixedAssetConstants.SUB_CLASSES)
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "subClasses",
                            data: res.data.data,
                        });
                    }
                    else{
                        Event.$emit("ApiError", 'Something went wrong');
                    }
                })
                .catch(err=>{
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         * GET Conditions
         * @param commit
         */
        getConditions({commit}) {
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('get', FixedAssetConstants.CONDITIONS)
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "conditions",
                            data: res.data.condition,
                        });
                    }
                    else{
                        Event.$emit("ApiError", 'Something went wrong');
                    }
                })
                .catch(err=>{
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         *
         * @param commit
         * @param payload
         */
        createAsset({commit},payload){
            commit('Dashboard/SET_LOADING', true, { root: true })
            call('post', FixedAssetConstants.CREATE_ASSET,payload)
                .then(res=> {
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("submitting",false)
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "conditions",
                            data: res.data.data,
                        });
                        Event.$emit("ApiSuccess", res.data.message);
                    }
                    else{
                        Event.$emit("ApiError", 'Something went wrong');
                    }
                })
                .catch(err=>{
                    commit('Dashboard/SET_LOADING', false, { root: true })
                    Event.$emit("submitting",false)
                    //
                    Event.$emit("ApiError", err.response.data.message);
                })
        }
    }
}
