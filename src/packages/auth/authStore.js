import AuthConstants from "./authConstants";
import AuthService from "./authService";
import call from "../../../shared/service/http";

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
                        ? Event.$emit('ApiWarning', `${res.data.message}!`)
                        : Event.$emit('ApiSuccess', res.data.message + ' Your credentials will be sent to your email')
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((error) => {
                    Event.$emit('ApiError', `${error.response.data.message}!`)
                    commit('SET_LOADING', false, { root: true })
                })
        },
        /**
         * Login user
         * @param p
         * @param data
         */
        login: (p, data) => {
            Event.$emit('submitting',false)
            call("post", AuthConstants.login, data)
                .then(res => {
                    if (res.data.status) {
                        AuthService.login(res.data);
                        Event.$emit('loggedIn',true)
                        Event.$emit("ApiSuccess", ` Welcome back ${res.data?.staff?.user?.last_name}`);
                        //
                        setTimeout(()=>{
                            window.location.href="/"
                        },1500)
                    } else{
                        Event.$emit('loggedIn',false)
                        Event.$emit("ApiError",res.data.message);
                    }
                })
                .catch( (err) => {
                    Event.$emit('loggedIn',false)
                    Event.$emit("ApiError",err?.response?.data?.message || 'Something went wrong');
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
                    Event.$emit('ApiSuccess', res.data.message)
                })
                .catch((error) => {
                    Event.$emit('ApiError', error.response.data.message)
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
                    Event.$emit('ApiSuccess', `${res.data.message}, you can now login`)
                    setTimeout(() => {
                        AuthService.login(res.data.data)
                    }, 1000)
                })
                .catch(() => {
                    Event.$emit('ApiError', 'You do not have permission to do this')
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
                    Event.$emit("ApiSuccess", `You have successfully signed out! ${AuthService.user.name}!`);
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
