import DashboardRoutes from "@/packages/dashboard/DashboardRoutes";
import AuthRoutes from "@/packages/auth/authRoutes";
import nextFactory from "@/packages/auth/middleware/MiddlewareFactory";
import DashboardStore from "@/packages/dashboard/DashboardStore";
import AuthStore from "@/packages/auth/authStore";

export default {
  install (Vue, options) {
    if (options.router) {
      options.router.addRoute(...DashboardRoutes)
      options.router.addRoute(...AuthRoutes)

      options.router.beforeEach((to, from, next) => {
        if (to.meta.middleware) {
          const middleware = Array.isArray(to.meta.middleware)
              ? to.meta.middleware
              : [to.meta.middleware]

          const context = {
            from,
            next,
            router: options.router
          }

          const nextMiddleware = nextFactory(context, middleware, 1)
          return middleware[0]({ ...context, next: nextMiddleware })
        }
        return next()
      })
    }

    if (options.store) {
      options.store.registerModule('Dashboard', DashboardStore)
      options.store.registerModule('Auth', AuthStore)
    }
  }
}

