import DashboardLayout from "@/packages/dashboard/views/DashboardLayout";
import {Auth} from "@/packages/auth";
import User from "@/packages/User/view/User";
import Customers from "@/packages/User/components/Customers.vue";
import UserCard from "@/packages/User/components/UserCard.vue";
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
                path: 'customers',
                component: Customers,
                name: "Customers",
                meta: { middleware: [Auth]}
            },
            {
                path: 'customers/card/:code?',
                component: UserCard,
                name: "UserCard",
                meta: { middleware: [Auth]}
            },
        ]
    }
];
export default UserRoutes;
