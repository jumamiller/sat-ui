import call from "../../../shared/service/http";
import {EventBus} from "../../../shared/utilities/event-bus";
import AuthConstants from "@/packages/auth/authConstants";
import FleetConstants from "@/packages/Fleet/FleetConstants";

export default {
    namespaced: true,
    state: {
        fleet: [],
    },
    mutations: {
        MUTATE: (state, payload) => {
            state[payload.state] = payload.data;
        },
    },
    getters: {
        FleetGetter: (state) => (setup) => state[setup],
    },
    actions: {
        /**
         *
         * @param commit
         */
        getFleet({commit}) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('get', FleetConstants.FLEET)
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        commit("MUTATE", {
                            state: "fleet",
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
        addFleet({commit},payload) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('post', AuthConstants.REGISTER,payload)
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        EventBus.$emit("ApiSuccess", res.data.message);
                        //
                        setTimeout(()=>{
                            window.location.href="/dashboard/user-management/listing"
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
