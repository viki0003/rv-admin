import BrandIamges from "../../Components/Dashboard/BrandImages/BrandImages";
import ToggleElements from "../../Components/Dashboard/ToggleElements/ToggleElements";


import "./dashboard.css";
const Dashboard = () => {
  return (
    <div className="admin-panel">
      <div className="container">
        <h1>Admin Panel</h1>
        <div className="toggle-btns">
          <h2>Display Elements in Website</h2>
          
            <ToggleElements />
          
        </div>
        <BrandIamges />
      </div>
    </div>
  );
};
export default Dashboard;
