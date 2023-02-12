import { AuthService } from "../index";

export default function auth({ next, router }) {
  if (!AuthService.check() || AuthService.user.isAdmin === 0) {
    return router.push({ name: "AdminLogin" });
  }
  return next();
}
