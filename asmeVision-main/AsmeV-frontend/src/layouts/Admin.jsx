import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminNavbar from "../adminPages/Navbars/AdminNavbar";
import Footer from "../adminPages/Footer/Footer";
import Sidebar from "../adminPages/Sidebar/Sidebar";

import routes from "../routes";

function Admin() {
  const [image, setImage] = React.useState(null);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const mainPanel = React.useRef(null);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.path}
            element={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, []);

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Routes>
              {getRoutes(routes)}
              <Route
                path="/"
                element={<Navigate to="/admin/dashboard" replace />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;