import DashboardLayout from "@/packages/dashboard/views/DashboardLayout";
import {Auth} from "@/packages/auth";
import Fleet from "@/packages/Fleet/view/Fleet.vue";
import FleetCard from "@/packages/Fleet/components/FleetCard.vue";

const FleetRoutes =[
    {
        path: '/dashboard/fleet-management',
        component: DashboardLayout,
        children: [
            {
                path: 'listing',
                component: Fleet,
                name: "FleetManagement",
                meta: { middleware: [Auth]}
            },
            {
                path: 'card/:code?',
                component: FleetCard,
                name: "FleetCard",
                meta: { middleware: [Auth]}
            },
        ]
    }
];
export default FleetRoutes;
