import DashboardLayout from "@/packages/dashboard/views/DashboardLayout";
import {Auth} from "@/packages/auth";
import User from "@/packages/User/view/User";
import HandOvers from "@/packages/User/components/HandOvers.vue";
const UserRoutes =[
    {
        path: '/dashboard/user-management',
        component: DashboardLayout,
        children: [
            {
                path: 'listing',
                component: User,
                name: "UserManagement",
                meta: { middleware: [Auth]}
            },
            {
                path: 'hand-overs',
                component: HandOvers,
                name: "HandOver",
                meta: { middleware: [Auth]}
            },
        ]
    }
];
export default UserRoutes;
