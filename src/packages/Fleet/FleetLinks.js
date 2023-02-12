export default {
    to: "/dashboard/user-management",
    order: 3,
    icon: "mdi-car-clutch",
    title: "Fleet Management",
    disabled: false,
    value: 0,
    sublinks: [
        {
            to: "/dashboard/fleet-management/listing",
            order: 3,
            icon: "mdi-menu-open",
            title: "Listing",
            disabled: false,
            value: 0,
        },
        {
            to: "/dashboard/fleet-management/customers",
            order: 3,
            icon: "mdi-plus-box-multiple",
            title: "Add Vehicle",
            disabled: false,
            value: 0,
        },
    ],
}
