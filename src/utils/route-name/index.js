import { AnnouncementRouteSvg, AstrologerRouteSvg, BannerRouteSvg, BlogsRouteSvg, CustomerRouteSvg, GiftRouteSvg, HistoryRouteSvg, LanguageRouteSvg, LiveRouteSvg, MainExpertiesRouteSvg, NotificationRouteSvg, OtherRouteSvg, PoojaRouteSvg, RatingRouteSvg, RechargeRouteSvg, RemediesRouteSvg, SkillRouteSvg, LetterToGodSvg } from '../../assets/svg';

export const RouteName = [
    {
        path: "/",
        name: "Dashboard",
        icon: <OtherRouteSvg />,
    },
    {
        path: "/customer",
        name: "Customer",
        icon: <CustomerRouteSvg />,
    },
    {
        name: "Astrologer",
        icon: <AstrologerRouteSvg />,
        subRoutes: [
            {
                path: "/astrologer",
                name: " List Of Astrologers",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/astrologer-enquiry",
                name: "Astrologer Enquiry",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/withdrawal-request",
                name: "Withdrawal Request",
                icon: <OtherRouteSvg />,
            },
        ],
    },
    {
        path: "/banner",
        name: "Banner",
        icon: <BannerRouteSvg />,
    },
    {
        path: "/recharge",
        name: "Recharge",
        icon: <RechargeRouteSvg />,
    },
    {
        path: "/referral",
        name: "Referral",
        icon: <OtherRouteSvg />,
    },
    {
        name: "Ecommerce",
        icon: <GiftRouteSvg />,
        subRoutes: [
            {
                path: "/ecommerce/category",
                name: "Category",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/ecommerce/product",
                name: "Product",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/ecommerce/order-history",
                name: "Order History",
                icon: <OtherRouteSvg />,
            },
        ],
    },
    {
        name: "Temple",
        icon: <PoojaRouteSvg />,
        subRoutes: [
            {
                path: "/temple/darshan",
                name: "Darshan",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/temple/assets",
                name: "Assets",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/temple/vr_assets/items",
                name: "VR Assets",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/temple/live-link",
                name: "Live Link",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/temple/vardani-shivalya",
                name: "Vardani Shivalya",
                icon: <OtherRouteSvg />,
            }
        ],
    },
    {
        name: "Notification",
        icon: <NotificationRouteSvg />,
        subRoutes: [
            {
                path: "/customer-notification",
                name: "Customer Notification",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/astrologer-notification",
                name: "Astrologer Notification",
                icon: <OtherRouteSvg />,
            },
        ],
    },


    // Letter To God

     {
        name: "Letter To God-Chatbot",
        icon: <LetterToGodSvg />,
        subRoutes: [
            {
                path: "/letter-to-god/welcome-message",
                name: "Welcome Message",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/letter-to-god/tags",
                name: "Tags",
                icon: <OtherRouteSvg />,
            },
             {
                path: "/letter-to-god/qa",
                name: "QA",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/letter-to-god/ai-qa",
                name: "AI-QA",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/letter-to-god/manage-plan",
                name: "Manage-Plan",
                icon: <OtherRouteSvg />,
            },

            {
                path:'/letter-to-god/Purhcased-history',
                name:"Purchased-History",
                icon: <OtherRouteSvg/>
            }
        ],
    },


    // Letter To God
    {
        path: "/skill",
        name: "Skill",
        icon: <SkillRouteSvg />,
    },
    {
        path: "/remedies",
        name: "Remedies",
        icon: <RemediesRouteSvg />,
    },
    {
        path: "/main-expertise",
        name: "Main Expertise",
        icon: <MainExpertiesRouteSvg />,
    },
    {
        path: "/testimonial",
        name: "Testimonial",
        icon: <OtherRouteSvg />,
    },
    {
        name: "Religious",
        icon: <OtherRouteSvg />,
        subRoutes: [
            {
                path: "/religious/category",
                name: "Category",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/religious/sub-category",
                name: "Sub-Category",
                icon: <OtherRouteSvg />,
            }
        ],
    },
    {
        path: "/history",
        name: "History",
        icon: <HistoryRouteSvg />,
        subRoutes: [
            {
                path: "/history/chat-history",
                name: "Chat History",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/history/call-history",
                name: "Call History",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/history/divya-history",
                name: "Divya Rashi History",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/history/divya-request-history",
                name: "Divya Rashi Request History",
                icon: <OtherRouteSvg />,
            },
        ],
    },
    {
        path: "/review",
        name: "Review",
        icon: <RatingRouteSvg />,
    },
    // {
    //     path: "/astro-blog",
    //     name: "AstroBlog",
    //     icon: <BlogsRouteSvg />,
    // },
    {
        name: "Astroblog",
        icon: <BlogsRouteSvg />,
        subRoutes: [
            {
                path: "/astro-blog/category",
                name: "Category",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/astro-blog/blog",
                name: "Blog",
                icon: <OtherRouteSvg />,
            },
        ],
    },
    {

        path: "/pages",
        name: "Pages",
        icon: <OtherRouteSvg />,
        subRoutes: [
            {
                path: "/pages/terms-and-conditions",
                name: "Terms and Conditions",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/pages/privacy-policy",
                name: "Privacy Policy",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/pages/about-us",
                name: "About Us",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/displayHowToUse",
                name: "How to use- ScreenShots",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/displayHowToUseVideos",
                name: "How to use - Videos",
                icon: <OtherRouteSvg />,
            },
        ],
    },
    {
        path: "/reports/admin-earning",
        name: "Admin Earning",
        icon: <OtherRouteSvg />,
    },
    {
        path: "/language",
        name: "Language",
        icon: <LanguageRouteSvg />,
    },
    {
        path: "/announcement",
        name: "Announcement",
        icon: <AnnouncementRouteSvg fontSize="30px" />,
    },
];