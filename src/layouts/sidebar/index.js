import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../assets/images/logo.png";
import SidebarMenu from "../../components/features/SidebarMenu";
import "../../assets/styles/sidebar.css";
import { RouteName } from "../../utils/route-name";

const showAnimation = {
  hidden: { width: 0, opacity: 0, transition: { duration: 0.5 } },
  show: { opacity: 1, width: "auto", transition: { duration: 0.5 } },
};

const SideBar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector(state => state?.dashboard);

  const [hiddenSidebarWidth, setHiddenSidebarWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) setHiddenSidebarWidth(65);
      else setHiddenSidebarWidth(0);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <motion.div animate={{ width: isSidebarOpen ? "250px" : `${hiddenSidebarWidth}px` }} className={`sidebar`}>
        {isSidebarOpen ? (
          <div className="top_section" style={{ marginBottom: "-15px", padding: '10px 0' }}>
            <img src={logo} style={{ width: 80, height: 80 }} />
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "-20px", padding: '10px 0' }}>
            <img src={logo} style={{ width: 30, height: 30 }} />
          </div>
        )}

        <section className="routes">
          {RouteName.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu route={route} key={index} showAnimation={showAnimation} />
              );
            }

            return (
              <div key={index} className="side_Bar">
                <NavLink to={route.path} className="link" activeclassname="active">
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="link_text">
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              </div>
            );
          })}
        </section>
      </motion.div>
    </>
  );
};

export default SideBar;