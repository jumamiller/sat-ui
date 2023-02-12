import _ from "lodash";
import call from "../../../shared/service/http";
import {EventBus} from "../../../shared/utilities/event-bus";
import DashboardConstants from "@/packages/dashboard/DashboardConstants";

export default {
    namespaced: true,
    state: {
        statistics:[],
        //
        loading: false,
        state: { loading: false },
        links: [
            {
                to: "/dashboard/statistics",
                order: 1,
                icon: "mdi-gauge",
                title: "Dashboard",
                disabled: false,
            },
        ],
        actions: [],
        menus: [],
        companies: [],
    },
    mutations: {
        SET_LINKS: (state, payload) => {
            if (_.findIndex(state.links, payload) === -1) {
                state.links.push(payload);
            }
        },
        SET_LOADING: (state, payload) => {
            state.loading = payload;
        },
        MUTATE: (state, payload) => {
            state[payload.state] = payload.data;
        },
    },

    getters: {
        loading: (state) => state.loading,
        links: (state) => {
            return _.orderBy(state.links, (link) => link.order);
        },
        DashboardGetter: (state) => (setup) => state[setup],
    },

    actions: {
        /**
         *
         * @param commit
         */
        getStatistics({commit}) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('get', DashboardConstants.STATISTICS)
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        commit("MUTATE", {
                            state: "statistics",
                            data: res.data.data,
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
    },
};
