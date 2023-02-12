import DashboardLayout from "@/packages/dashboard/views/DashboardLayout";
import DashboardCard from "@/packages/dashboard/components/DashboardCard";
import {Auth} from "@/packages/auth";
export default [
  {
    path: "/dashboard",
    component: DashboardLayout,
    name:'Dashboard',
    children: [
      {
        path:'statistics',
        name:'DashboardCard',
        component: DashboardCard,
        meta: { middleware: [Auth]}
      },
    ],
  },
];
