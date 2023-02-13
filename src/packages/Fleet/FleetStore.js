import call from "../../../shared/service/http";
import {EventBus} from "../../../shared/utilities/event-bus";
import FleetConstants from "@/packages/Fleet/FleetConstants";
import UserConstants from "@/packages/User/UserConstants";

export default {
    namespaced: true,
    state: {
        fleet: [],
        fleetDetails: {},
        drivers: [],
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
        getFleetDetails({commit},payload) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('get', FleetConstants.FLEET_DETAILS(payload))
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        commit("MUTATE", {
                            state: "fleetDetails",
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
        /**
         *
         * @param commit
         * @param payload
         */
        addFleet({commit},payload) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('post', FleetConstants.FLEET,payload)
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        EventBus.$emit("ApiSuccess", res.data.message);
                        //
                        setTimeout(()=>{
                            window.location.href="/dashboard/fleet-management/listing"
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
         * @param dispatch
         * @param payload
         */
        updateFleet({commit,dispatch},payload) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('patch', FleetConstants.UPDATE_FLEET(payload),payload)
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        EventBus.$emit("ApiSuccess", res.data.message);
                        //
                        setTimeout(()=>{
                            dispatch("getFleetDetails",payload.id)
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
         * @param dispatch
         * @param payload
         */
        removeVehicle({commit},payload) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('delete', FleetConstants.FLEET_DETAILS(payload))
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        EventBus.$emit("ApiSuccess", res.data.message);
                        //
                        setTimeout(()=>{
                            window.location.href="/dashboard/fleet-management"
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
         * Drivers
         * @param commit
         */
        getDrivers({commit}) {
            commit("Dashboard/SET_LOADING",true,{root:true})
            call('get', UserConstants.DRIVERS)
                .then(res=> {
                    commit("Dashboard/SET_LOADING",false,{root:true})
                    if (res.data.success) {
                        commit("MUTATE", {
                            state: "drivers",
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
