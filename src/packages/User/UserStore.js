import call from "../../../shared/service/http";
import UserConstants from "@/packages/User/UserConstants";
import {EventBus} from "../../../shared/utilities/event-bus";
import AuthConstants from "@/packages/auth/authConstants";

export default {
    namespaced: true,
    state: {
        users: [],
        customers: [],
    },
    mutations: {
        MUTATE: (state, payload) => {
            state[payload.state] = payload.data;
        },
    },
    getters: {
        UserGetter: (state) => (setup) => state[setup],
    },
    actions: {
        /**
         *
         * @param commit
         */
        users({commit}) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('get', UserConstants.USERS)
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        commit("MUTATE", {
                            state: "users",
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
        addUser({commit},payload) {
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
        /**
         *
         * @param commit
         */
        getCustomers({commit}) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('get', UserConstants.CUSTOMERS)
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        commit("MUTATE", {
                            state: "customers",
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
    }
}
