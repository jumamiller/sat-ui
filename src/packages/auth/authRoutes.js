import AuthLayout from "./views/authLayout";
import ForgotPassword from "./components/forgotPassword";
import Password from "./components/password";
import Login from "./components/login";

export default [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "sign-in",
        name: "Login",
        component: Login,
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
      },
      {
        path: "set-password/:auth_token",
        name: "setPassword",
        component: Password,
      },
    ],
  },
];
