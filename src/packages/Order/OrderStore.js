import call from "../../../shared/service/http";
import {EventBus} from "../../../shared/utilities/event-bus";
import FleetConstants from "@/packages/Fleet/FleetConstants";
import UserConstants from "@/packages/User/UserConstants";
import OrderConstants from "@/packages/Order/OrderConstants";

export default {
    namespaced: true,
    state: {
        orders: [],
        order: {},
    },
    mutations: {
        MUTATE: (state, payload) => {
            state[payload.state] = payload.data;
        },
    },
    getters: {
        OrderGetter: (state) => (setup) => state[setup],
    },
    actions: {
        /**
         *
         * @param commit
         */
        getOrders({commit}) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('get', OrderConstants.ORDERS)
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        commit("MUTATE", {
                            state: "orders",
                            data: res.data.data.data,
                        });
                    }
                    else{
                        EventBus.$emit("ApiError", res.data.message);
                    }
                })
                .catch(err=>{
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    EventBus.$emit("ApiError", err.response.data.message);
                })
        },
        /**
         *
         * @param commit
         * @param payload
         */
        makeAnOrder({commit},payload) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('post', OrderConstants.ORDERS,payload)
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        EventBus.$emit("ApiSuccess", res.data.message);
                        //
                        setTimeout(()=>{
                            window.location.href="/dashboard/order-management/listing"
                        },1500)
                    }
                    else{
                        EventBus.$emit("ApiError", res.data.message);
                    }
                })
                .catch(err=>{
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    EventBus.$emit("ApiError", err.response.data.message);
                })
        },
    }
}
