import DashboardLayout from "@/packages/dashboard/views/DashboardLayout";
import {Auth} from "@/packages/auth";
import OrderCard from "@/packages/Order/components/OrderCard.vue";
import Order from "@/packages/Order/view/Order.vue";

const OrderRoutes =[
    {
        path: '/dashboard/order-management',
        component: DashboardLayout,
        children: [
            {
                path: 'listing',
                component: Order,
                name: "OrderManagement",
                meta: { middleware: [Auth]}
            },
            {
                path: 'card/:code?',
                component: OrderCard,
                name: "FleetCard",
                meta: { middleware: [Auth]}
            },
        ]
    }
];
export default OrderRoutes;
