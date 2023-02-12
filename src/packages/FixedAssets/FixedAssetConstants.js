export default {
    FIXED_ASSETS: 'assets/',
    FIXED_ASSET:({code})=> `assets/${code}`,
    FIXED_ASSETS_READY_FOR_TRANSFER: 'assets/ready-for-transfer/',
    FIXED_ASSETS_PENDING_APPROVALS: 'assets/pending-transfer-approval/',
    FIXED_ASSETS_REJECTED_TRANSFERS: 'assets/rejected-transfers/',
    FIXED_ASSETS_COMPLETE_CHECKOUT: 'assets/complete-transfers/',
    CREATE_ASSET: 'assets/create/',
    LOCATIONS: 'attributes/locations/',
    CLASSES: 'attributes/asset-class/',
    SUB_CLASSES: 'attributes/sub-class/',
    SUPPLIERS:`attributes/suppliers/`,
    CONDITIONS:`/attributes/conditions/`,
}
