import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import HistoryIcon from '@mui/icons-material/History';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CallIcon from '@mui/icons-material/Call';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddLinkIcon from '@mui/icons-material/AddLink';
import MedicationIcon from '@mui/icons-material/Medication';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import FluorescentIcon from '@mui/icons-material/Fluorescent';
import PreviewIcon from '@mui/icons-material/Preview';
import RateReviewIcon from '@mui/icons-material/RateReview';
import RedeemIcon from '@mui/icons-material/Redeem';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import DescriptionIcon from '@mui/icons-material/Description';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CampaignIcon from '@mui/icons-material/Campaign';
import { FaHome, } from "react-icons/fa";
import { BiAbacus, BiUser, BiUserPlus } from "react-icons/bi";

export const RouteName = [
    {
        path: "/",
        name: "Dashboard",
        icon: <FaHome size={24} />,
    },
    {
        name: "Astrologer",
        icon: <GroupsIcon />,
        subRoutes: [
            {
                path: "/astrologer",
                name: " List Of Astrologers",
                icon: <PersonIcon />,
            },
            {
                path: "/astrologer-enquiry",
                name: "Astrologer Enquiry",
                icon: <PersonIcon />,
            },
            {
                path: "/withdrawal-request",
                name: "Withdrawal Request",
                icon: <PersonIcon />,
            },
        ],
    },
    {
        path: "/customer",
        name: "Customer",
        icon: <PersonPinIcon />,
    },
    {
        path: "/banner",
        name: "Banner",
        icon: <ViewCarouselIcon />,
    },
    {
        path: "/recharge",
        name: "Recharge",
        icon: <TextSnippetIcon />,
    },
    {
        name: "Astro Mall",
        icon: <LightbulbCircleIcon />,
        subRoutes: [
            {
                path: "/astro-mall/category",
                name: "Category",
                icon: <FluorescentIcon />,
            },
            {
                path: "/astro-mall/product",
                name: "Product",
                icon: <FluorescentIcon />,
            },
            {
                path: "/astro-mall/order-history",
                name: "Order History",
                icon: <FluorescentIcon />,
            },
        ],
    },
    {
        name: "Astro Puja",
        icon: <LightbulbCircleIcon />,
        subRoutes: [
            {
                path: "/astro-puja/puja",
                name: "Puja",
                icon: <FluorescentIcon />,
            },
            {
                path: "/astro-puja/puja-request",
                name: "Puja Request",
                icon: <FluorescentIcon />,
            },
            {
                path: "/astro-puja/puja-booked",
                name: "Puja Booked",
                icon: <FluorescentIcon />,
            },
            {
                path: "/astro-puja/puja-history",
                name: "Puja History",
                icon: <FluorescentIcon />,
            },
        ],
    },
    {
        name: "Notification",
        icon: <NotificationsNoneIcon />,
        subRoutes: [
            {
                path: "/customer-notification",
                name: "Customer Notification",
                icon: <FaceRetouchingNaturalIcon />,
            },
            {
                path: "/astrologer-notification",
                name: "Astrologer Notification",
                icon: <AcUnitIcon />,
            },
        ],
    },
    {
        path: "/skill",
        name: "Skill",
        icon: <AddLinkIcon />,
    },
    {
        path: "/remedies",
        name: "Remedies",
        icon: <MedicationIcon />,
    },
    {
        path: "/main-expertise",
        name: "Main Expertise",
        icon: <FluorescentIcon />,
    },
    // {
    //   name: "Expertise",
    //   icon: <LightbulbCircleIcon />,
    //   subRoutes: [
    //     {
    //       path: "/expertise",
    //       name: "Expertise",
    //       icon: <FluorescentIcon />,
    //     },
    //     {
    //       path: "/main-expertise",
    //       name: "Main Expertise",
    //       icon: <FluorescentIcon />,
    //     }
    //   ],
    // },
    {
        path: "/history",
        name: "History",
        icon: <HistoryIcon />,
        subRoutes: [
            {
                path: "/history/chat-history",
                name: "Chat History",
                icon: <ChatBubbleOutlineIcon />,
            },
            {
                path: "/history/call-history",
                name: "Call History",
                icon: <CallIcon />,
            },
            {
                path: "/history/video-call-history",
                name: "V.Call History",
                icon: <RedeemIcon />,
            },
            {
                path: "/history/live-history",
                name: "Live History",
                icon: <VideocamIcon />,
            },
            {
                path: "/history/gift-history",
                name: "Gift History",
                icon: <RedeemIcon />,
            },
        ],
    },
    {
        path: "/gift",
        name: "Gift",
        icon: <RedeemIcon />,
    },
    {
        path: "/review",
        name: "Review",
        icon: <PreviewIcon />,
    },
    {
        path: "/astro-blog",
        name: "AstroBlog",
        icon: <RateReviewIcon />,
    },
    {
        path: "/pages",
        name: "Pages",
        icon: <DescriptionIcon />,
        subRoutes: [
            {
                path: "/pages/terms-and-conditions",
                name: "Terms and Conditions",
                icon: <BiAbacus />,
            },
            {
                path: "/pages/privacy-policy",
                name: "Privacy Policy",
                icon: <BiAbacus />,
            },
            {
                path: "/pages/about-us",
                name: "About Us",
                icon: <BiAbacus />,
            },
            {
                path: "/displayHowToUse",
                name: "How to use- ScreenShots",
                icon: <BiAbacus />,
            },
            {
                path: "/displayHowToUseVideos",
                name: "How to use - Videos",
                icon: <BiAbacus />,
            },
        ],
    },
    {
        path: "/reports/admin-earning",
        name: "Admin Earning",
        icon: <ReportGmailerrorredIcon />,
    },
    {
        path: "/language",
        name: "Language",
        icon: <BiAbacus />,
    },
    {
        path: "/announcement",
        name: "Announcement",
        icon: <CampaignIcon fontSize="30px" />,
    },
];