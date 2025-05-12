import React, { useState } from "react";
import BrandIamges from "../../Components/Dashboard/BrandImages/BrandImages";
import ToggleElements from "../../Components/Dashboard/ToggleElements/ToggleElements";
import { TabView, TabPanel } from "primereact/tabview";
import "./dashboard.css";
import ProductList from "../../Components/Inventory/Products/ProductList/ProductList";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="admin-panel">
      <div className="container">
        <h1>Admin Panel</h1>
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
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
