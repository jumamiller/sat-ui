export default {
    to: "/dashboard/order-management",
    order: 3,
    icon: "mdi-order-bool-ascending-variant",
    title: "Order Management",
    disabled: false,
    value: 0,
    sublinks: [
        {
            to: "/dashboard/order-management/listing",
            order: 3,
            icon: "mdi-menu-open",
            title: "Listing",
            disabled: false,
            value: 0,
        },
        {
            to: "/dashboard/order-management/card",
            order: 3,
            icon: "mdi-plus-box-multiple",
            title: "Make An Order",
            disabled: false,
            value: 0,
        },
    ],
}
