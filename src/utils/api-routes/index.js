export let base_url, img_url, api_url;

if (window.location.protocol === 'http:') {
    base_url = "https://astrooneapi.ksdelhi.net/";
    img_url = "https://astrooneapi.ksdelhi.net/uploads/";
    api_url = "https://astrooneapi.ksdelhi.net/api/";
} else if (window.location.protocol === 'https:') {
    base_url = "https://astrooneapi.ksdelhi.net/";
    img_url = "https://astrooneapi.ksdelhi.net/uploads/";
    api_url = "https://astrooneapi.ksdelhi.net/api/";
} else {
    console.log('Unknown protocol');
};


//! Dashboard
export const get_dashboard = 'admin/get_dashboard'
export const get_dashboard_data = "admin/get_dashboard";
export const get_earning_chart = 'admin/get_earning_chart';
export const get_earning_graph = 'admin/get_admin_earning_graph';

//! Astrologer
export const get_astrologer = 'api/admin/get-all-astrologers';
export const get_enquiry_astrologer = 'api/astrologer/get-astrologer-inquiry';
export const get_astrologer_by_id = 'api/admin/astrologer_details_by_id';
export const create_astrologer = 'api/admin/add-astrologer';
export const update_astrologer_by_id = 'api/admin/update-astrologer';
export const delete_astrologer_by_id = "api/admin/delete-astrologer-account";
export const get_chat_history_by_astrologer_id = 'api/admin/astrologer_chat_history'; //* type - chat
export const get_call_history_by_astrologer_id = 'api/admin/astrologer_chat_history'; //* type - call
export const get_video_call_history_by_astrologer_id = 'api/admin/astrologer_chat_history'; //* type - VideoCall
export const get_live_history_by_astrologer_id = 'api/admin/astrologer_chat_history'; //* type - live_video_call
export const get_gift_history_by_astrologer_id = 'api/admin/get_astrologer_gift_history';
export const get_review_by_astrologer_id = 'api/admin/get-astrologer-review';
export const get_transaction_history_by_astrologer_id = 'api/admin/astrologer_transaction_histroy';
export const get_puja_history_by_astrologer_id = 'api/admin/';
export const update_wallet_by_astrologer_id = 'api/admin/add_deduct_astrologer_wallet';
export const verify_astrologer_profile = "api/astrologer/verify-astrologer-profile";
export const change_astrologer_chat_status = 'api/astrologer/change-chat-status';
export const change_astrologer_call_status = 'api/astrologer/change-call-status';
export const change_astrologer_video_call_status = 'api/admin/change_videocall_status';
export const get_astrologer_withdrawal_request = 'api/admin/get_withdraw_request';
export const approve_astrologer_withdrawal_request_amount = 'api/admin/approve_withdraw_request';



//! Live Darshan
export const get_live_darshan = 'api/customers/get_AllDarshans';
export const delete_live = 'api/admin/delete_Darshan';


//! Customer
export const get_customer = 'api/customers/get-all-customers';
export const get_customer_by_id = 'api/admin/customer_details_by_id';
export const create_customer = "api/customers/customer-signup";
export const update_customer_by_id = 'api/admin/update-customer-data';
export const delete_customer_by_id = "api/admin/delete-customer";
export const change_customer_banned_unbanned_status = "api/admin/change-banned-status";
export const update_wallet_by_customer_id = 'api/admin/add_deduct_customer_wallet';
export const get_chat_history_by_customer_id = 'api/admin/customer_chat_history'; //* type - chat
export const get_call_history_by_customer_id = 'api/admin/customer_chat_history'; //* type - call
export const get_video_call_history_by_customer_id = 'api/admin/customer_chat_history'; //* type - VideoCall
export const get_live_history_by_customer_id = 'api/admin/customer_chat_history'; //* type - live_video_call
export const get_puja_history_by_customer_id = 'api/admin/';
export const get_order_history_by_customer_id = 'api/customers/getCustomerOrder';
export const get_following_history_by_customer_id = 'api/admin/customer_followed_list';
export const get_review_history_by_customer_id = 'api/admin/get-customer-review';
export const get_mudra_history_by_customer_id = (customerId) => `api/customers/gift-wallet-history/${customerId}`;
export const get_mudra_request_history_by_customer_id = (customerId) => `api/customers/get-wallet-request/${customerId}`;

//! Astro-Puja
export const get_puja = 'api/ecommerce/get_puja';
export const create_puja = 'api/ecommerce/create_puja';
export const update_puja = 'api/ecommerce/update_puja';
export const delete_puja = 'api/ecommerce/delete_puja';
export const get_puja_request = 'api/ecommerce/all_requested_puja';
export const assign_puja = 'api/ecommerce/puja_assign_to_astrologer';
export const change_puja_status = 'api/ecommerce/change_puja_status';
export const get_puja_booked = 'api/ecommerce/get_customer_booked_pooja';
export const get_puja_history = 'api/ecommerce/get_puja_history';

//! History
export const get_chat_history = 'api/admin/get_chat_history';
export const get_call_history = 'api/admin/get_call_history';
export const get_video_call_history = 'api/admin/all_videocall_history';
export const get_live_history = 'api/admin/all_live_videocall_history';
export const get_gift_history = 'api/admin/get_all_gift_history';
export const get_mudra_history = 'api/customers/get-All-wallet-history';
export const get_mudra_request_history = 'api/customers/get-All-request-history';

//! Skill
export const get_skill = 'api/admin/get-skill';
export const create_skill = 'api/admin/skill';
export const update_skill = 'api/admin/update-skill';
export const delete_skill = 'api/admin/delete-skill';

//! Remedies
export const get_remedies = 'api/admin/view-remedy';
export const create_remedies = 'api/admin/add-remedy';
export const update_remedies = 'api/admin/update-remedy';
export const delete_remedies = 'api/admin/delete-remedy';
// export const get_remedies = 'admin/get-all-remedies';
// export const add_remedies = 'admin/add-remedies';
// export const update_remedies = 'admin/update-remedies';
// export const delete_remedies = 'admin/delete-remedies';

//! Expertise 
export const get_expertise = 'api/admin/get-all-expertise';
export const create_expertise = 'api/admin/add-expertise';
export const update_expertise = 'api/admin/update-expertise';
export const delete_expertise = 'api/admin/delete-expertise';
export const get_main_expertise = 'api/admin/get-all-main-expertise';
export const create_main_expertise = 'api/admin/add-main-expertise';
export const update_main_expertise = 'api/admin/update-main-expertise';
export const delete_main_expertise = 'api/admin/delete-main-expertise';

//! Static Page
export const get_terms_and_conditions = 'api/admin/get-terms-condition';
export const create_terms_and_conditions = 'api/admin/add-terms-condition';
export const get_privacy_policy = 'api/admin/get-privacy-policy';
export const create_privacy_policy = 'api/admin/add-privacy-policy';
export const get_about_us = 'api/admin/get-about-us';
export const create_about_us = 'api/admin/add-about-us';

//! Temple
export const get_temple_darshan = 'api/admin/get-darshan';
export const get_temple_darshan_by_id = (id) => `api/admin/getById/${id}`;
export const create_temple_darshan = 'api/admin/create-darshan';
export const update_temple_darshan = '';
export const delete_temple_darshan = (id) => `api/admin/delete-darshan/${id}`;

//? Asset Category
export const get_temple_assets = 'api/admin/get-pooja-items';
export const create_temple_assets = 'api/admin/create-pooja-title';
export const delete_temple_assets = (id) => `api/admin/delete-pooja-item/${id}`;

//? Assets Items
export const get_temple_assets_items_by_assets_id = (assetsId) => `api/admin/get-pooja-item/${assetsId}`;
export const create_temple_assets_items = (assetsId) => `api/admin/add-items-to-pooja-title/${assetsId}`;
export const delete_temple_assets_items = (assetsId, itemId) => `api/admin/delete-item-from-pooja-title/${assetsId}/${itemId}`;

//? Live Link
export const get_temple_live_link = 'api/admin/get_Darshan';
export const create_temple_live_link = 'api/admin/add_Darshan';
export const update_temple_live_link = (id) => `api/admin/update_Darshan/${id}`;
export const delete_temple_live_link = (id) => `api/admin/delete_Darshan/${id}`;

//TODO---------------------Working-----------------------TODO// 

//! Banner 
export const get_app_banners = 'admin/get-app-banners'
export const add_banner = "admin/add-banners"
export const update_banner = "admin/update-banners"
export const delete_banner = "admin/delete-banners"
export const get_banners = 'admin/get-banners'
export const change_banner_status = 'api/admin/update_banner_status';

//! Astro-Mall
export const get_astro_mall_category = 'ecommerce/get_product_category';
export const create_astro_mall_category = 'ecommerce/create_product_category';
export const update_astro_mall_category = 'ecommerce/update_product_category';
export const delete_astro_mall_category = 'ecommerce/delete_product_category';

export const get_astro_mall_product = 'ecommerce/get_products';
export const create_astro_mall_product = 'ecommerce/create_products';
export const update_astro_mall_product = 'ecommerce/update_products';
export const delete_astro_mall_product = 'ecommerce/delete_product';

//! All-Products
export const get_all_products = 'ecommerce/get_all_products';

//! order History
export const get_order_history = 'ecommerce/order_history';
export const change_order_status = 'ecommerce/change_order_status';

//! Astro-Blog
export const add_astro_blog = 'admin/add-astro-blog';
export const get_astro_blogs = 'admin/get_astro_blogs';
export const delete_astro_blogs = 'admin/delete_astro_blogs';
export const update_astro_blog = 'admin/update_astro_blog';

//! Gift
export const add_gift = "admin/add-gift";
export const get_all_gift = "admin/get-all-gift";
export const update_gift = "admin/update-gift";
export const delete_gift = "admin/delete-gift";

//! Rewiews
export const add_review = "admin/add-review";
export const get_review = "admin/get-all-review";
export const update_review = "admin/update-review";
export const delete_review = "admin/delete-review";
export const verify_review = 'admin/verify-review'

export const add_astrologer = "admin/add-astrologer";
export const update_astrologer = "admin/update-astrologer";

export const create_recharge_plan = "admin/create_recharge_plan";
export const get_recharge_plans = "admin/get-all-recharge-plans";
export const update_recharge_plans = "admin/update-recharge-plan"
export const delete_recharge_plans = "admin/delete-recharge-plan"
export const update_recharge_plan_status = "admin/update-recharge-plan-status"

export const add_first_recharge_offer = "admin/add-first-recharge";
export const get_first_recharge_offer = "admin/get-first-recharge"
export const update_first_recharge_offer = "admin/update-first-recharge-offer"
export const delete_first_recharge_offer = "admin/delete-first-recharge-offer"

export const get_all_astrologers = "admin/get-all-astrologers";
export const verify_astrologer = "astrologer/verify-astrologer-profile";
export const delete_astrologer = "admin/delete-astrologer-account"
export const change_call_status = 'astrologer/change-call-status'
export const change_chat_status = 'astrologer/change-chat-status'
export const get_enquired_astrologer = 'astrologer/get-enquired-astrologer'
export const change_enquiry_status = 'astrologer/change_enquiry_status'
export const get_recent_live_streaming = 'customers/get_recent_live_streaming'

//! inquiry 
export const get_astrologer_inquiry = 'astrologer/get-astrologer-inquiry'

export const create_qualifications = "admin/create_qualifications";
export const get_qualifications = "admin/get_qualifications";
export const update_qualifications = "admin/update_qualifications";

export const get_request_astrologer = "admin/get_astrologer_requests";
export const update_request_astrologer = "admin/update_service_charges";

export const get_all_users = "admin/get-all-user"
export const add_notifications = "admin/add-notifications"
export const get_all_notifications = "admin/get-all-notifications"

export const get_all_customers = "customers/get-all-customers"
export const ban_customer = "admin/change-banned-status"
export const online_offline_customer = "admin/set-customer-online"
// export const create_customer = "customers/customer-signup"
export const update_customer = "admin/update-customer-data"
export const delete_customer = "admin/delete-customer"
export const customer_chat_history = "customers/customers-chat-history"
export const customer_call_history = "customers/customers-call-history"
export const customer_payment_history = "admin/customers-payment-list"

export const add_customer_recharge = 'admin/recharge-customer-wallet'

export const send_customer_notification = 'admin/send_customer_notification'
export const get_customer_notification = 'admin/get-customer-notification'
export const send_astrologer_notification = 'admin/send_astrologer_notification'
export const get_astrologer_notification = 'admin/get-astrologer-notification'

export const get_admin_earnig_history = 'admin/get_admin_earnig_history'
export const get_wallet_payments = 'admin/get_wallet_payments'

export const create_language = 'admin/create_language'
export const get_language = 'admin/get_language'
export const update_language = 'admin/update_language'
export const delete_language = 'admin/delete_language'

export const add_ask_question = 'admin/add-ask-question'
export const get_all_ask_question = 'admin/get-all-ask-question'
export const delete_ask_question = 'admin/delete-ask-question'
export const update_ask_question = 'admin/update-ask-question'

export const add_religion_spirituality = 'admin/add-religion-spirituality'
export const get_all_religion_spirituality = 'admin/get-all-religion-spirituality'
export const delete_religion_spirituality = 'admin/delete-religion-spirituality'
export const update_religion_spirituality = 'admin/update-religion-spirituality'

export const add_astro_magazine = 'admin/add-astro-magazine'
export const get_all_astro_magazine = 'admin/get-all-astro-magazine'
export const delete_astro_magazine = 'admin/delete-astro-magazine'
export const update_astro_magazine = 'admin/update-astro-magazine'

export const add_announcement = 'admin/add-announcement'
export const get_all_anouncement = 'admin/get-all-anouncement'
export const delete_announcement = 'admin/delete-announcement'
export const update_announcement = 'admin/update-announcement'

export const add_birhat_horoscope = 'admin/add-birhat-horoscope'
export const get_all_birhat_horoscope = 'admin/get-all-birhat-horoscope'
export const delete_birhat_horoscope = 'admin/delete-birhat-horoscope'
export const update_birhat_horoscope = 'admin/update-birhat-horoscope'

export const add_auspicious_time = 'admin/add-auspicious-time'
export const get_all_auspicious_time = 'admin/get-all-auspicious-time'
export const delete_auspicious_time = 'admin/delete-auspicious-time'
export const update_auspicious_time = 'admin/update-auspicious-time'

export const add_daily_panchang = 'admin/add-daily-panchang'
export const get_all_daily_panchang = 'admin/get-all-daily-panchang'
export const delete_daily_panchang = 'admin/delete-daily-panchang'
export const update_daily_panchang = 'admin/update-daily-panchang'

export const add_yellow_book = 'admin/add-yellow-book'
export const get_all_yellow_book = 'admin/get-all-yellow-book'
export const delete_yellow_book = 'admin/delete-yellow-book'
export const update_yellow_book = 'admin/update-yellow-book'

export const add_numerology = 'admin/add-numerology'
export const get_all_numerology = 'admin/get-all-numerology'
export const delete_numerology = 'admin/delete-numerology'
export const update_numerology = 'admin/update-numerology'

export const add_vivahMuhurat = 'admin/add-vivahMuhurat'
export const get_all_vivahMuhurat = 'admin/get-all-vivahMuhurat'
export const delete_vivahMuhurat = 'admin/delete-vivahMuhurat'
export const update_vivahMuhurat = 'admin/update-vivahMuhurat'

export const add_mundanMuhurat = 'admin/add-mundanMuhurat'
export const get_all_mundanMuhurat = 'admin/get-all-mundanMuhurat'
export const delete_mundanMuhurat = 'admin/delete-mundanMuhurat'
export const update_mundanMuhurat = 'admin/update-mundanMuhurat'

export const add_annaprashan = 'admin/add-annaprashan'
export const get_all_annaprashan = 'admin/get-all-annaprashan'
export const delete_annaprashan = 'admin/delete-annaprashan'
export const update_annaprashan = 'admin/update-annaprashan'

export const create_app_tutorials = 'admin/create_app_tutorials'
export const get_app_tutorials = 'admin/get_app_tutorials'
export const delete_app_tutorials = 'admin/delete_app_tutorials'

export const get_all_country = 'https://api.countrystatecity.in/v1/countries'