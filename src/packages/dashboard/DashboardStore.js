import _ from "lodash";

export default {
    namespaced: true,
    state: {
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
    },

    getters: {
        loading: (state) => state.loading,
        links: (state) => {
            return _.orderBy(state.links, (link) => link.order);
        },
    },

    actions: {   },
};
