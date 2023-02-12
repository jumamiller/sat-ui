import AuthConstants from "./authConstants";
import AuthService from "./authService";
import call from "../../../shared/service/http";
import {EventBus} from "../../../shared/utilities/event-bus";

export default {
    namespaced: true,
    state: {
        terms: {},
        verification: null,
        alert: {
            status: "",
            message: "",
        },
        loading: false,
    },
    mutations: {
        MUTATE: (state, payload) => {
            state[payload.state] = payload.data;
        },
    },
    getters: {
        authGetter: (state) => (setup) => state[setup],
    },
    actions: {
        /**
         * Register user
         * @param context
         * @param data
         */
        register: ({commit}, data) => {
            commit('SET_LOADING', false, { root: true })
            call('post', AuthConstants.requestCredentials, data)
                .then(res => {
                    res.data === null
                        ? EventBus.$emit('ApiWarning', `${res.data.message}!`)
                        : EventBus.$emit('ApiSuccess', res.data.message + ' Your credentials will be sent to your email')
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((error) => {
                    EventBus.$emit('ApiError', `${error.response.data.message}!`)
                    commit('SET_LOADING', false, { root: true })
                })
        },
        /**
         * Login user
         * @param p
         * @param data
         */
        login: (p, data) => {
            EventBus.$emit('submitting',false)
            call("post", AuthConstants.login, data)
                .then(res => {
                    if (res.data.success) {
                        //save to localstorage
                        AuthService.login(res.data);
                        //emit logged in event
                        EventBus.$emit('loggedIn',true)
                        //emit toastr
                        EventBus.$emit("ApiSuccess", ` Welcome back ${res.data?.data?.username}`);
                        //redirect to dashboard after 15ms
                        setTimeout(()=>{
                            window.location.href="/"
                        },1500)
                    } else{
                        EventBus.$emit('loggedIn',false)
                        EventBus.$emit("ApiError",res.data.message);
                    }
                })
                .catch( (err) => {
                    EventBus.$emit('loggedIn',false)
                    EventBus.$emit("ApiError",err?.response?.data?.message || 'Something went wrong');
                });
        },
        /**
         * Send password reset link
         * @param commit
         * @param data
         */
        sendResetPasswordLink: ({commit},data) => {
            commit("SET_LOADING", false, { root: true });
            call('post', AuthConstants.sendResetPasswordLink, data)
                .then((res) => {
                    EventBus.$emit('ApiSuccess', res.data.message)
                })
                .catch((error) => {
                    EventBus.$emit('ApiError', error.response.data.message)
                })
        },
        /**
         * Set new password on reset
         * @param context
         * @param data
         */
        setPassword: ({commit}, data) => {
            commit('SET_LOADING', false, { root: true })
            call('post', AuthConstants.setPassword, data)
                .then((res) => {
                    EventBus.$emit('ApiSuccess', `${res.data.message}, you can now login`)
                    setTimeout(() => {
                        AuthService.login(res.data.data)
                    }, 1000)
                })
                .catch(() => {
                    EventBus.$emit('ApiError', 'You do not have permission to do this')
                })
        },
        /**
         * Get user
         * @param commit
         * @param data
         */
        user: ({ commit }) => {
            commit("SET_ALERT", null);
            call("get", AuthConstants.user)
                .then((res) => {
                    AuthService.setUser(res.data.data);
                    commit("SET_LOADING", false, { root: true });
                })
                .catch((err) => {
                    commit("SET_LOADING", false, { root: true });
                    commit("SET_ALERT", {
                        status: "error",
                        message: err.response.data.message,
                    });
                });
        },

        logout: ({ commit }) => {
            commit("SET_LOADING", true, { root: true });
            call("post", AuthConstants.logout)
                .then(() => {
                    commit("SET_LOADING", false, { root: true });
                    EventBus.$emit("ApiSuccess", `You have successfully signed out! ${AuthService.user.name}!`);
                    setTimeout(() => {
                        AuthService.logout();
                    }, 2000);
                })
                .catch((err) => {
                    commit("SET_LOADING", false, { root: true });
                    commit("SET_ALERT", {
                        status: "error",
                        message: err.response.data.message,
                    });
                });
        }
    },
};
