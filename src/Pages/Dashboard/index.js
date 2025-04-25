import BrandIamges from "../../Components/Dashboard/BrandImages/BrandImages";
import ToggleElements from "../../Components/Dashboard/ToggleElements/ToggleElements";
import { ProductsApiProvider } from "../../ApiContext/ProductApi";
import { TabView, TabPanel } from "primereact/tabview";

import "./dashboard.css";
import ProductList from "../../Components/Inventory/Products/ProductList/ProductList";
const Dashboard = () => {
  return (
    <div className="admin-panel">
      <div className="container">
        <h1>Admin Panel</h1>
        <TabView>
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
                <ProductsApiProvider>
                  <ProductList />
                </ProductsApiProvider>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
export default Dashboard;
