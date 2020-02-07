export const RIGHT_MENU = [{
    title: 'Home'
}, {
    title: 'Sell',
}, {
    title: 'Orders',
}];
export const PRODUCTS_CATEGORIES = ['All', 'Veg Starter', 'Non Veg Starter', 'Veg Main Course', 'Non Veg Main Course']
export const SETUP_MENU = ['Shop', 'Products', 'Variants', 'AddOns', 'Notes', 'Offers', 'Tax', 'Additional Charges', 'PosUser', 'Account Info'];
export const ORDER_TAB_MENU = ['Restaurant', 'Take_Away', 'Online'];
export const PAYMENTOPTIOMS = ['CASH', 'CARD'];
export const ORDER_TYPE = {
    IN_HOUSE: 'IN_HOUSE',
    TAKE_AWAY: 'TAKE_AWAY'
}
export const SUB_TABS = [{ label: 'Restaurant', value: 'Dine In' },
{ label: 'Take Away', value: 'Take Away' },
{ label: 'Online', value: 'Channel Order' }];

export const ORDER_TAB_MENU_PREF = {
    Restaurant: 'show_restaurant',
    Take_Away: 'show_take_away',
    Online: 'show_online'
};

export const EXPENSE_CATEGORIES = [{ label: 'All', value: 'ALL' },
{ label: 'Product', value: 'PRODUCT' },
{ label: 'Employee', value: 'EMPLOYEE' },
{ label: 'Miscellaneous', value: 'MISCELLANEOUS' }];

export const PUSHER_DETAILS = {
    CHANNEL_ID: '794a24b2-f7e1-4fb0-9632-629645fd8dd6',
    NEW_ORDER_EVENT: 'order_relay',
    ORDER_UPDATE_EVENT: 'order_update',
    RIDER_UPDATE: 'rider_update',
    CLUSTER: "ap2",
    ID: "ce5d7930cad1664748fb",
    ORDER_SYNC: "order_sync",
    PRINT_BILL: "print_bill",
    STORE_TOGGLE:'store_toggle',
    PRODUCT_TOGGLE:'product_toggle'
}

export const PUSHER_DETAILS_1 = {
    "appId": "740558",
    "key": "ce5d7930cad1664748fb",
    "secret": "fdacfb37a150b4b5e7d7",
    "cluster": "ap2",
    "encrypted": true,
}

export const CHANNEL_TYPE_KEYS = {
    "f9ee7e8f-497f-48f6-89f7-27a4db425cf9": "foodpanda",
    "edb3480c-be5b-4108-9dad-cd9b39d66721": "scootsy",
    "f14f303d-0bd2-4c05-b034-93afc7e22a2c": "urbanpiper",
    "af4399a4-fdf3-4c51-8307-3e34740622fd": "swiggy",
    "4cf9c608-9a2e-46d8-8e01-d4f49b57b1c9": "uber eats",
    "52e90028-a67a-4a8e-b9d2-845ccdd3e8be": "zomato",
}

export const CHANNEL_TYPES = {
    "foodpanda": "f9ee7e8f-497f-48f6-89f7-27a4db425cf9",
    "scootsy": "edb3480c-be5b-4108-9dad-cd9b39d66721",
    "urbanpiper": "f14f303d-0bd2-4c05-b034-93afc7e22a2c",
    "swiggy": "af4399a4-fdf3-4c51-8307-3e34740622fd",
    "uber_eats": "4cf9c608-9a2e-46d8-8e01-d4f49b57b1c9",
    "zomato": "52e90028-a67a-4a8e-b9d2-845ccdd3e8be"
}

export const ORDER_STATUS = {
    "Placed": 'Accept Pending',
    "Acknowledged": "Order Accepted",
    "Food Ready": "Waiting for Delivery",
    "Dispatched": "Dispatched",
    "Completed": "Completed",
    "Cancelled": "Cancelled",
    "unknown": "Call the customer support"
}


export const ORDER_STATUS_COLORS = {
    "Placed": 'orange',
    "Acknowledged": "orange",
    "Food Ready": "orange",
    "Dispatched": "orange",
    "Completed": "green",
    "Cancelled": "red",
    "unknown": "Call the customer support"
}

export const ORDER_ACTION_BUTTONS = {
    "Placed": 'Accept',
    "Acknowledged": "Food Ready",
    "Food Ready": "Dispatch",
    "Dispatched": "Cancel Delivery",
    "Completed": "Delivered",
    "Cancelled": "Delivery Cancelled",
    "unknown": "Call the customer support"
}
export const ONLINE_ORDER_STATES = ["Placed", "Acknowledged", "Food Ready", "Dispatched", "Completed"]

export const LIST_OF_ONLINE_OPTIONS = [{
    value: 'f9ee7e8f-497f-48f6-89f7-27a4db425cf9',
    label: 'Food Panda'
}, {
    value: 'edb3480c-be5b-4108-9dad-cd9b39d66721',
    label: 'Scootsy'
}, {
    value: 'f14f303d-0bd2-4c05-b034-93afc7e22a2c',
    label: 'Urbanpiper'
}, {
    value: 'af4399a4-fdf3-4c51-8307-3e34740622fd',
    label: 'Swiggy'
}, {
    value: '4cf9c608-9a2e-46d8-8e01-d4f49b57b1c9',
    label: 'Ubereats'
}, {
    value: '52e90028-a67a-4a8e-b9d2-845ccdd3e8be',
    label: 'Zomato'
}];

export const TIMEZONES = [
    { "label": "(GMT-12:00) International Date Line West", "value": "Etc/GMT+12" },
    { "label": "(GMT-11:00) Midway Island, Samoa", "value": "Pacific/Midway" },
    { "label": "(GMT-10:00) Hawaii", "value": "Pacific/Honolulu" },
    { "label": "(GMT-09:00) Alaska", "value": "US/Alaska" },
    { "label": "(GMT-08:00) Pacific Time (US & Canada)", "value": "America/Los_Angeles" },
    { "label": "(GMT-08:00) Tijuana, Baja California", "value": "America/Tijuana" },
    { "label": "(GMT-07:00) Arizona", "value": "US/Arizona" },
    { "label": "(GMT-07:00) Chihuahua, La Paz, Mazatlan", "value": "America/Chihuahua" },
    { "label": "(GMT-07:00) Mountain Time (US & Canada)", "value": "US/Mountain" },
    { "label": "(GMT-06:00) Central America", "value": "America/Managua" },
    { "label": "(GMT-06:00) Central Time (US & Canada)", "value": "US/Central" },
    { "label": "(GMT-06:00) Guadalajara, Mexico City, Monterrey", "value": "America/Mexico_City" },
    { "label": "(GMT-06:00) Saskatchewan", "value": "Canada/Saskatchewan" },
    { "label": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco", "value": "America/Bogota" },
    { "label": "(GMT-05:00) Eastern Time (US & Canada)", "value": "US/Eastern" },
    { "label": "(GMT-05:00) Indiana (East)", "value": "US/East-Indiana" },
    { "label": "(GMT-04:00) Atlantic Time (Canada)", "value": "Canada/Atlantic" },
    { "label": "(GMT-04:00) Caracas, La Paz", "value": "America/Caracas" },
    { "label": "(GMT-04:00) Manaus", "value": "America/Manaus" },
    { "label": "(GMT-04:00) Santiago", "value": "America/Santiago" },
    { "label": "(GMT-03:30) Newfoundland", "value": "Canada/Newfoundland" },
    { "label": "(GMT-03:00) Brasilia", "value": "America/Sao_Paulo" },
    { "label": "(GMT-03:00) Buenos Aires, Georgetown", "value": "America/Argentina/Buenos_Aires" },
    { "label": "(GMT-03:00) Greenland", "value": "America/Godthab" },
    { "label": "(GMT-03:00) Montevideo", "value": "America/Montevideo" },
    { "label": "(GMT-02:00) Mid-Atlantic", "value": "America/Noronha" },
    { "label": "(GMT-01:00) Cape Verde Is.", "value": "Atlantic/Cape_Verde" },
    { "label": "(GMT-01:00) Azores", "value": "Atlantic/Azores" },
    { "label": "(GMT+00:00) Casablanca, Monrovia, Reykjavik", "value": "Africa/Casablanca" },
    { "label": "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London", "value": "Etc/Greenwich" },
    { "label": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", "value": "Europe/Amsterdam" },
    { "label": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", "value": "Europe/Belgrade" },
    { "label": "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris", "value": "Europe/Brussels" },
    { "label": "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb", "value": "Europe/Sarajevo" },
    { "label": "(GMT+01:00) West Central Africa", "value": "Africa/Lagos" },
    { "label": "(GMT+02:00) Amman", "value": "Asia/Amman" },
    { "label": "(GMT+02:00) Athens, Bucharest, Istanbul", "value": "Europe/Athens" },
    { "label": "(GMT+02:00) Beirut", "value": "Asia/Beirut" },
    { "label": "(GMT+02:00) Cairo", "value": "Africa/Cairo" },
    { "label": "(GMT+02:00) Harare, Pretoria", "value": "Africa/Harare" },
    { "label": "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius", "value": "Europe/Helsinki" },
    { "label": "(GMT+02:00) Jerusalem", "value": "Asia/Jerusalem" },
    { "label": "(GMT+02:00) Minsk", "value": "Europe/Minsk" },
    { "label": "(GMT+02:00) Windhoek", "value": "Africa/Windhoek" },
    { "label": "(GMT+03:00) Kuwait, Riyadh, Baghdad", "value": "Asia/Kuwait" },
    { "label": "(GMT+03:00) Moscow, St. Petersburg, Volgograd", "value": "Europe/Moscow" },
    { "label": "(GMT+03:00) Nairobi", "value": "Africa/Nairobi" },
    { "label": "(GMT+03:00) Tbilisi", "value": "Asia/Tbilisi" },
    { "label": "(GMT+03:30) Tehran", "value": "Asia/Tehran" },
    { "label": "(GMT+04:00) Abu Dhabi, Muscat", "value": "Asia/Muscat" },
    { "label": "(GMT+04:00) Baku", "value": "Asia/Baku" },
    { "label": "(GMT+04:00) Yerevan", "value": "Asia/Yerevan" },
    { "label": "(GMT+04:30) Kabul", "value": "Asia/Kabul" },
    { "label": "(GMT+05:00) Yekaterinburg", "value": "Asia/Yekaterinburg" },
    { "label": "(GMT+05:00) Islamabad, Karachi, Tashkent", "value": "Asia/Karachi" },
    { "label": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi", "value": "Asia/Calcutta" },
    // {"label":"(GMT+05:30) Sri Jayawardenapura","value":"Asia/Calcutta"},
    { "label": "(GMT+05:45) Kathmandu", "value": "Asia/Katmandu" },
    { "label": "(GMT+06:00) Almaty, Novosibirsk", "value": "Asia/Almaty" },
    { "label": "(GMT+06:00) Astana, Dhaka", "value": "Asia/Dhaka" },
    { "label": "(GMT+06:30) Yangon (Rangoon)", "value": "Asia/Rangoon" },
    { "label": "(GMT+07:00) Bangkok, Hanoi, Jakarta", "value": "Asia/Bangkok" },
    { "label": "(GMT+07:00) Krasnoyarsk", "value": "Asia/Krasnoyarsk" },
    { "label": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi", "value": "Asia/Hong_Kong" },
    { "label": "(GMT+08:00) Kuala Lumpur, Singapore", "value": "Asia/Kuala_Lumpur" },
    { "label": "(GMT+08:00) Irkutsk, Ulaan Bataar", "value": "Asia/Irkutsk" },
    { "label": "(GMT+08:00) Perth", "value": "Australia/Perth" },
    { "label": "(GMT+08:00) Taipei", "value": "Asia/Taipei" },
    { "label": "(GMT+09:00) Osaka, Sapporo, Tokyo", "value": "Asia/Tokyo" },
    { "label": "(GMT+09:00) Seoul", "value": "Asia/Seoul" },
    { "label": "(GMT+09:00) Yakutsk", "value": "Asia/Yakutsk" },
    { "label": "(GMT+09:30) Adelaide", "value": "Australia/Adelaide" },
    { "label": "(GMT+09:30) Darwin", "value": "Australia/Darwin" },
    { "label": "(GMT+10:00) Brisbane", "value": "Australia/Brisbane" },
    { "label": "(GMT+10:00) Canberra, Melbourne, Sydney", "value": "Australia/Canberra" },
    { "label": "(GMT+10:00) Hobart", "value": "Australia/Hobart" },
    { "label": "(GMT+10:00) Guam, Port Moresby", "value": "Pacific/Guam" },
    { "label": "(GMT+10:00) Vladivostok", "value": "Asia/Vladivostok" },
    { "label": "(GMT+11:00) Magadan, Solomon Is., New Caledonia", "value": "Asia/Magadan" },
    { "label": "(GMT+12:00) Auckland, Wellington", "value": "Pacific/Auckland" },
    { "label": "(GMT+12:00) Fiji, Kamchatka, Marshall Is.", "value": "Pacific/Fiji" },
    { "label": "(GMT+13:00) Nuku'alofa", "value": "Pacific/Tongatapu" }
]

export const POSCMD = {
    left: '\x1B' + '\x61' + '\x30',
    right: '\x1B' + '\x61' + '\x32',
    center: '\x1B' + '\x61' + '\x31',
    bold_on: '\x1B' + '\x45' + '\x0D',
    bold_off: '\x1B' + '\x45' + '\x0A',
}
