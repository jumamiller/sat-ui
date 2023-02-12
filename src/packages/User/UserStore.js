import call from "../../../shared/service/http";
import UserConstants from "@/packages/User/UserConstants";
import {EventBus} from "../../../shared/utilities/event-bus";

export default {
    namespaced: true,
    state: {
        users: [],
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
            call('get', UserConstants.USERS)
                .then(res=> {
                    if (res.data.status) {
                        commit("MUTATE", {
                            state: "users",
                            data: res.data.data,
                        });
                        EventBus.$emit("ApiSuccess", res.data.message);
                    }
                    else{
                        EventBus.$emit("ApiError", res.data.message);
                    }
                })
                .catch(err=>{
                    EventBus.$emit("ApiError", err.response.data.message);
                })
        },
    }
}
