import React, { useState, useEffect } from "react";
import BrandIamges from "../../Components/Dashboard/BrandImages/BrandImages";
import ToggleElements from "../../Components/Dashboard/ToggleElements/ToggleElements";
import { TabView, TabPanel } from "primereact/tabview";
import "./dashboard.css";
import ProductList from "../../Components/Inventory/Products/ProductList/ProductList";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Load saved tab index on component mount
  useEffect(() => {
    const savedIndex = localStorage.getItem("dashboardActiveTab");
    if (savedIndex !== null) {
      setActiveIndex(parseInt(savedIndex, 10));
    }
  }, []);

  // Save tab index to localStorage on change
  const handleTabChange = (e) => {
    setActiveIndex(e.index);
    localStorage.setItem("dashboardActiveTab", e.index);
  };

  return (
    <div className="admin-panel">
      <div className="container">
        <h1>Admin Panel</h1>
        <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
          <TabPanel header="Elements">
            <div className="toggle-btns">
              <h2>Display Elements in Website</h2>
              <ToggleElements />
            </div>
            <BrandIamges />
          </TabPanel>

          <TabPanel header="Inventory">
            <div className="inventory">
              <h2>Update Inventory</h2>
              <div className="inventory-lists">
                <ProductList />
              </div>
            </div>
          </TabPanel>

          <TabPanel header="RV Website">
            <div className="iframe-container">
              <iframe
                src="https://staging.d13ngs1xcza78.amplifyapp.com/"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="Website Preview"
                allowFullScreen
                scrolling="auto"
              />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Dashboard;
