export const SHOP_ENDPOINTS = {
    LOGIN: 'rentalcart/api/login',
    CATEGORIES: 'rentalcart/api/categoryList',
    PRODUCTS: 'rentalcart/api/itemList',
    CREATE_ORDER:'rentalcart/api/createOrder',
    ORDERS:"rentalcart/api/orders",



    GETSHOP: 'core/restaurant/get/',
    CRETAESHOP: 'core/restaurant/add/',
    ADD_PRODUCT: 'core/inventory/product/',
    GET_PRODUCT: 'core/inventory/product/getall/',    
    VARIANTS_GET: 'core/inventory/variant/getall/',
    GET_ADDONS: 'core/inventory/addons/getall/',
    GET_VARIANTS: 'core/inventory/variant/getall/',
    VARIANTS: 'core/inventory/variant/',
    ADDONS: 'core/inventory/addons/',
    NOTES: 'core/inventory/notes/',
    GET_USERS: 'core/users/getuser/',
    CUSTOMER: 'core/restaurant/customer/',
    CUSTOMER_ORDERS: 'core/orders/customer/',
    GET_CUSTOMER: 'core/restaurant/customers/getall/',
    GET_TAX: 'core/restaurant/tax/all/',
    TAX: 'core/restaurant/tax/',
    RECEIPTS: 'core/orders/getall/',
    SALES_REPORT: 'reports/orders/order_summary/',
    SUPPORTED_TYPES: 'reports/orders/supportedtypes/',
    EXPENSE_SUPPORTED_TYPES: 'reports/expense/supportedtypes/',
    EXPENSE_REPORT: 'reports/expense/current_month/',
    ADDITIONAL_CHARGES: 'core/configuration/additionalcharge/',
    GET_EXPENSE: 'core/expense/all/',
    EXPENSE: 'core/expense/add/',
    UPDATE_EXPENSE: 'core/expense/update/',
    POSUSER_ALL: 'core/posusers/getall/',
    UPDATE_ONLINE_ORDER: 'core/orders/aggregator/orderupdate/',
    OFFERS: 'core/restaurant/offer/',//post to add new offers and method PUT to  edit
    GET_OFFERS: 'core/restaurant/alloffers/',
    DELETE_OFFERS: 'core/restaurant/offer/',
    GET_POS: 'core/posusers/getall/',
    POS: 'core/posusers/posuser/',
    GET_DASH_INFO: 'core/dashboard/getinfo/',
    GET_SALES_TREND: 'core/dashboard/getsalestrend/',
    ADD_USER: 'core/users/adduser/',
    GET_USER: 'core/users/getuser/',
    ADD_RESTAURANT: 'core/restaurant/add/',
    UPDATE_RESTAURANT: 'core/restaurant/updaterestaurant/',
    UPLOAD_PRODUCTS: 'core/inventory/product/upload/',
    CHANGE_PASSWORD: 'core/users/changepassword/',
    UPLOAD_CUSTOMERS: 'core/configuration/uploadcustomers/',
    ACCESS_PREF: 'core/configuration/accesspref/',
    GET_SELL_PRODUCT: 'core/inventory/product/getall/',
    CHANGE_STATUS: 'core/inventory/category/changestatus/',
    ONLINE_ORDERS: 'core/orders/activeonlineorders/',
    PAST_ONLINE_ORDERS: 'core/orders/pastonlineorders/',
    TOGGLE_ONLINE: "core/restaurant/aggregators/toggle/",
    BULK_UPDATE: "core/inventory/category/changestatus/",
    ONLINE_STATUS: "core/restaurant/store/online/status/",
    PUSH_TOKENS: "core/users/push-token",
    SYNC: 'notification/sync/'
}
const STAGING_DOMAIN_NAME = 'https://rentalcart-dev.herokuapp.com/'
const PRODUCTION_DOMAIN_NAME = 'https://rentalcart.herokuapp.com/';

export const DOMAIN_NAME = STAGING_DOMAIN_NAME;


