import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./utils/private-routes";
import Login from "./pages/login";

import Dashboard from "./pages/dashboard/Dashboard";

//! Astrologer
import Astrologer from "./pages/astrologer";
import AstrologerEnquiry from "./pages/astrologer/astrologer-enquiry";
import AddAstrologer from "./pages/astrologer/add-astrologer";
import ViewAstrologer from "./pages/astrologer/view-astrologer";
import WithdrawalRequest from "./pages/astrologer/withdrawal-request";

//! Customer
import Customer from "./pages/customer";
import AddCustomer from "./pages/customer/add-customer";
import ViewCustomer from "./pages/customer/view-customer";

//! LiveDarshan
import Live from "./pages/liveDarshan";
import AddLive from "./pages/liveDarshan/add-live";

//! Banner 
import Banner from "./pages/banner";
import AddBanner from "./pages/banner/add-banner";

//! Recharge 
import Recharge from "./pages/recharge";
import AddRecharge from "./pages/recharge/add-recharge";

//! Referral 
import Referral from "./pages/referral";
import ShowReferral from "./pages/referral/show-referral";

//! Temple
import TempleDarshan from "./pages/temple/darshan";
import TempleAddDarshan from "./pages/temple/darshan/add-darshan";
import TempleViewDarshan from "./pages/temple/darshan/view-darshan";
import TempleAssets from "./pages/temple/assets";
import TempleAddAssets from "./pages/temple/assets/add-assets";
import TempleAssetsItems from "./pages/temple/assets/items";
import TempleAddAssetsItems from "./pages/temple/assets/items/add-items";
import TempleLiveLink from "./pages/temple/live-link";
import TempleAddLiveLink from "./pages/temple/live-link/add-live-link";

//! Notification 
import CustomerNotification from "./pages/notification/customer-notification";
import AstrologerNotification from "./pages/notification/astrologer-notification";
import AddNotification from "./pages/notification/add-notification";

//! Skill 
import Skill from "./pages/skill";
import AddSkill from "./pages/skill/add-skill";

//! Remedies 
import Remedies from "./pages/remedies";
import AddRemedies from "./pages/remedies/add-remedies";

//! Expertise 
import Expertise from "./pages/expertise";
import AddExpertiseNew from "./pages/expertise/add-expertise";
import MainExpertise from "./pages/expertise/main-expertise";
import AddMainExpertiseNew from "./pages/expertise/main-expertise/add-main-expertise";

//! History
import ChatHistory from "./pages/history/chat-history";
import ChatSummary from "./pages/history/chat-history/chat-summary";
import CallHistory from "./pages/history/call-history";
import VideoCallHistory from "./pages/history/video-call-history";
import LiveHistory from "./pages/history/live-history";
import GiftHistory from "./pages/history/gift-history";
import MudraHistory from "./pages/history/mudra-history";
import MudraRequestHistory from "./pages/history/mudra-request-history";

//! Gift 
import Gift from "./pages/gift";
import AddGift from "./pages/gift/add-gift";

//! Mudra
import Mudra from "./pages/mudra"
import AddMudra from "./pages/mudra/add-mudra"
import MudraHistroy from "./pages/mudra/mudra-history";

//!Review 
import Review from "./pages/review";
import AddReview from "./pages/review/add-review";

//! Astroblog 
import Astroblog from "./pages/astro-blog";
import AddAstroblog from "./pages/astro-blog/add-astro-blog";

//! Language 
import Language from "./pages/language";
import AddLanguage from "./pages/language/add-language";

//! Announcement 
import Announcement from "./pages/announcement";
import AddAnnouncement from "./pages/announcement/add-announcement";

//! Pages
import PrivacyPolicy from "./pages/pages/privacy-policy";
import TermsAndConditions from "./pages/pages/terms-and-conditions";
import AboutUs from "./pages/pages/about-us";

//! Report
import AdminEarning from "./pages/reports/admin-earning";

//! Miscelleneous 
import DisplayHowToUseVideos from "./pages/pages/DisplayHowToUseVideos";
import AddHowToUseVideo from "./pages/pages/AddHowToUseVideo";
import DisplayHowToUse from "./pages/pages/DisplayHowToUse";
import AddHowToUse from "./pages/pages/AddHowToUse";
import ReceiptSummary from "./pages/reports/ReceiptSummary";
import SaleSummary from "./pages/reports/SaleSummary";
import ViewTextModal from "./components/modal/ViewTextModal";
import Testimonial from "./pages/Testimonial";
import AddTestimonial from "./pages/Testimonial/add-testimonial";

//! Religious
import ReligiousCategory from "./pages/religious/category";
import AddReligiousCategory from "./pages/religious/category/add-category";
import ReligiouSubcategory from "./pages/religious/subCategory";
import AddReligiousSubCategory from "./pages/religious/subCategory/add-subCategory";

//! Ecommerce
import EcommerceCategory from "./pages/ecommerce/category";
import AddEcommerceCategory from "./pages/ecommerce/category/add-category";
import EcommerceProduct from "./pages/ecommerce/product";
import AddEcommerceProduct from "./pages/ecommerce/product/add-product";

function App() {

  useEffect(() => {
    const handleWheel = (e) => {
      if (document.activeElement.type === 'number') {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    // Set min attribute and enforce non-negative values
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach((input) => {
      input.setAttribute('min', '0');

      input.addEventListener('input', () => {
        if (input.value < 0) {
          input.value = 0;
        }
      });
    });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      numberInputs.forEach((input) => {
        input.removeEventListener('input', () => {
          if (input.value < 0) {
            input.value = 0;
          }
        });
      });
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" exact element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<div style={{ color: "#000", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>Not Found</div>} />

          {/* Astrologer */}
          <Route path="/astrologer" element={<Astrologer />} />
          <Route path="/astrologer-enquiry" element={<AstrologerEnquiry />} />
          <Route path="/astrologer/add-astrologer" element={<AddAstrologer mode="Add" />} />
          <Route path="/astrologer/edit-astrologer" element={<AddAstrologer mode="Edit" />} />
          <Route path="/astrologer/view-astrologer" element={<ViewAstrologer />} />
          <Route path="/withdrawal-request" element={<WithdrawalRequest />} />

          {/* Customer */}
          <Route path="/customer" element={<Customer />} />
          <Route path="/customer/add-customer" element={<AddCustomer mode="Add" />} />
          <Route path="/customer/edit-customer" element={<AddCustomer mode="Edit" />} />
          <Route path="/customer/view-customer" element={<ViewCustomer />} />

          {/* LiveDarshan */}
          <Route path="/live" element={<Live />} />
          <Route path="/liveDarshan/add-live" element={<AddLive />} />

          {/* Banner */}
          <Route path="/banner" element={<Banner />} />
          <Route path="/banner/add-banner" element={<AddBanner />} />

          {/* Recharge */}
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/recharge/add-recharge" element={<AddRecharge />} />

          {/* Referral */}
          <Route path="/referral" element={<Referral />} />
          <Route path="/referral/show-referral" element={<ShowReferral />} />

          {/* Temple */}
          <Route path="/temple/darshan" element={<TempleDarshan />} />
          <Route path="/temple/darshan/:darshanId" element={<TempleViewDarshan />} />
          <Route path="/temple/darshan/add-darshan" element={<TempleAddDarshan mode={'Add'} />} />
          <Route path="/temple/darshan/edit-darshan" element={<TempleAddDarshan mode={'Edit'} />} />

          <Route path="/temple/assets" element={<TempleAssets />} />
          <Route path="/temple/assets/add-assets" element={<TempleAddAssets mode={'Add'} />} />
          <Route path="/temple/assets/edit-assets" element={<TempleAddAssets mode={'Edit'} />} />

          <Route path="/temple/assets/items" element={<TempleAssetsItems />} />
          <Route path="/temple/assets/items/add-items" element={<TempleAddAssetsItems mode={'Add'} />} />
          <Route path="/temple/assets/items/edit-items" element={<TempleAddAssetsItems mode={'Edit'} />} />

          <Route path="/temple/live-link" element={<TempleLiveLink />} />
          <Route path="/temple/live-link/add-live-link" element={<TempleAddLiveLink mode={'Add'} />} />
          <Route path="/temple/live-link/edit-live-link" element={<TempleAddLiveLink mode={'Edit'} />} />

          {/* Notification */}
          <Route path="/customer-notification" element={<CustomerNotification />} />
          <Route path="/customer-notification/add-notification" element={<AddNotification type="Customer" />} />
          <Route path="/astrologer-notification" element={<AstrologerNotification />} />
          <Route path="/astrologer-notification/add-notification" element={<AddNotification type="Astrologer" />} />

          {/* Skill */}
          <Route path="/skill" element={<Skill />} />
          <Route path="/skill/add-skill" element={<AddSkill mode="Add" />} />
          <Route path="/skill/edit-skill" element={<AddSkill mode="Edit" />} />

          {/* Testimonial  */}
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/testimonial/add-testimonial" element={<AddTestimonial mode="Add" />} />
          <Route path="/testimonial/edit-testimonial" element={<AddTestimonial mode="Edit" />} />

          {/* Religious */}
          <Route path="/religious/category" element={<ReligiousCategory />} />
          <Route path="/religious/category/add-category" element={<AddReligiousCategory mode={'Add'} />} />
          <Route path="/religious/category/edit-category" element={<AddReligiousCategory mode={'Edit'} />} />
          <Route path="/religious/sub-category" element={<ReligiouSubcategory />} />
          <Route path="/religious/sub-category/add-sub-category" element={<AddReligiousSubCategory mode={'Add'} />} />
          <Route path="/religious/sub-category/edit-sub-category" element={<AddReligiousSubCategory mode={'Edit'} />} />

          {/* Ecommerce */}
          <Route path="/ecommerce/category" element={<EcommerceCategory />} />
          <Route path="/ecommerce/category/add-category" element={<AddEcommerceCategory mode={'Add'} />} />
          <Route path="/ecommerce/category/edit-category" element={<AddEcommerceCategory mode={'Edit'} />} />
          <Route path="/ecommerce/product" element={<EcommerceProduct />} />
          <Route path="/ecommerce/product/add-product" element={<AddEcommerceProduct mode={'Add'} />} />
          <Route path="/ecommerce/product/edit-product" element={<AddEcommerceProduct mode={'Edit'} />} />

          {/* Remedies */}
          <Route path="/remedies" element={<Remedies />} />
          <Route path="/remedies/add-remedies" element={<AddRemedies mode="Add" />} />
          <Route path="/remedies/edit-remedies" element={<AddRemedies mode="Edit" />} />

          {/* History */}
          <Route path="/history/chat-history" element={<ChatHistory />} />
          <Route path="/history/chat-history/chat-summary/:name" element={<ChatSummary />} />
          <Route path="/history/call-history" element={<CallHistory />} />
          <Route path="/history/video-call-history" element={<VideoCallHistory />} />
          <Route path="/history/live-history" element={<LiveHistory />} />
          <Route path="/history/gift-history" element={<GiftHistory />} />
          <Route path="/history/mudra-history" element={<MudraHistory />} />
          <Route path="/history/mudra-request-history" element={<MudraRequestHistory />} />

          <Route path="/main-expertise" element={<MainExpertise />} />
          <Route path="/main-expertise/add-main-expertise" element={<AddMainExpertiseNew mode="Add" />} />
          <Route path="/main-expertise/edit-main-expertise" element={<AddMainExpertiseNew mode="Edit" />} />

          {/* Gift */}
          <Route path="/gift" element={<Gift />} />
          <Route path="/gift/add-gift" element={<AddGift mode="Add" />} />
          <Route path="/gift/edit-gift" element={<AddGift mode="Edit" />} />

          {/* Mudra */}
          <Route path="/mudra" element={<Mudra />} />
          <Route path="/mudra/add-mudra" element={<AddMudra mode="Add" />} />
          <Route path="/mudra/edit-mudra" element={<AddGift mode="Edit" />} />
          <Route path="/mudra/histroy" element={<MudraHistroy />} />

          {/* Review */}
          <Route path="/review" element={<Review />} />
          <Route path="/review/add-review" element={<AddReview mode="Add" />} />
          <Route path="/review/edit-review" element={<AddReview mode="Edit" />} />

          {/* Astroblog */}
          <Route path="/astro-blog" element={<Astroblog />} />
          <Route path="/astro-blog/add-astro-blog" element={<AddAstroblog mode="Add" />} />
          <Route path="/astro-blog/edit-astro-blog" element={<AddAstroblog mode="Edit" />} />

          {/* Language */}
          <Route path="/language" element={<Language />} />
          <Route path="/language/add-language" element={<AddLanguage mode="Add" />} />
          <Route path="/language/edit-language" element={<AddLanguage mode="Edit" />} />

          {/* Announcement */}
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/announcement/add-announcement" element={<AddAnnouncement mode="Add" />} />
          <Route path="/announcement/edit-announcement" element={<AddAnnouncement mode="Edit" />} />

          {/* Pages */}
          <Route path="/pages/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/pages/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/pages/about-us" element={<AboutUs />} />

          {/* Report */}
          <Route path="/reports/admin-earning" element={<AdminEarning />} />


          {/* Miscelleneous */}
          <Route path="/displayHowToUseVideos" element={<DisplayHowToUseVideos />} />
          <Route path="/AddHowToUseVideo" element={<AddHowToUseVideo />} />
          <Route path="/displayHowToUse" element={<DisplayHowToUse />} />
          <Route path="/AddHowToUse" element={<AddHowToUse />} />
          <Route path="/receiptSummary" element={<ReceiptSummary />} />
          <Route path="/saleSummary" element={<SaleSummary />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
      <ViewTextModal />
    </>
  );
}

export default App;