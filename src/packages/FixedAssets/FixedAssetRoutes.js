import DashboardLayout from "@/packages/dashboard/views/DashboardLayout";
import {Auth} from "@/packages/auth";
import FixedAsset from "@/packages/FixedAssets/view/FixedAsset";
import FixedAssetCard from "@/packages/FixedAssets/components/FixedAssetCard.vue";
import FixedAssetCardInfo from "@/packages/FixedAssets/components/FixedAssetCardInfo.vue";
import FixedAssetsReadyForTransfer from "@/packages/FixedAssets/components/FixedAssetsReadyForTransfer.vue";
import FixedAssetsPendingApproval from "@/packages/FixedAssets/components/FixedAssetsPendingApproval.vue";
import FixedAssetsRejectedTransfer from "@/packages/FixedAssets/components/FixedAssetsRejectedTransfer.vue";
import FixedAssetsCompleteCheckout from "@/packages/FixedAssets/components/FixedAssetsCompleteCheckout.vue";
//
const FixedAssetRoutes =[
    {
        path: '/dashboard',
        component: DashboardLayout,
        children: [
            {
                path: 'assets/listing',
                component: FixedAsset,
                name: "FixedAsset",
                meta: { middleware: [Auth]}
            },
            {
                path: 'assets/ready-for-transfer/listing',
                component: FixedAssetsReadyForTransfer,
                name: "FixedAsset",
                meta: { middleware: [Auth]}
            },
            {
                path: 'assets/pending-for-transfer-approval/listing',
                component: FixedAssetsPendingApproval,
                name: "FixedAsset",
                meta: { middleware: [Auth]}
            },
            {
                path: 'assets/rejected-transfer/listing',
                component: FixedAssetsRejectedTransfer,
                name: "FixedAsset",
                meta: { middleware: [Auth]}
            },
            {
                path: 'assets/complete-transfer/listing',
                component: FixedAssetsCompleteCheckout,
                name: "FixedAsset",
                meta: { middleware: [Auth]}
            },
            {
                path: 'assets/card/:code?',
                component: FixedAssetCard,
                name: "FixedAssetCard",
                meta: { middleware: [Auth]}
            },
            {
                path: 'assets/card/:code',
                component: FixedAssetCardInfo,
                name: "FixedAssetCardInfo",
                meta: { middleware: [Auth]}
            },
        ]
    }
];
export default FixedAssetRoutes;
