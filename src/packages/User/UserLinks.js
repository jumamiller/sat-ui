export default {
    to: "/dashboard/user-management",
    order: 3,
    icon: "mdi-account-multiple-check",
    title: "User Management",
    disabled: false,
    value: 0,
    sublinks: [
        {
            to: "/dashboard/user-management/listing",
            order: 3,
            icon: "mdi-account",
            title: "Users",
            disabled: false,
            value: 0,
        },
        {
            to: "/dashboard/user-management/customers",
            order: 3,
            icon: "mdi-account-group",
            title: "Customers",
            disabled: false,
            value: 0,
        },
        {
            to: "/dashboard/user-management/drivers",
            order: 3,
            icon: "mdi-car-back",
            title: "Drivers",
            disabled: false,
            value: 0,
        },
    ],
}
