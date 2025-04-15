import React from "react";
import "../TogglePriceFeature/togglestyle.css";
import { useToggle } from "../../../ApiContext/ToggleContext"; // adjust path as needed

const ToggleElements = () => {
  const { toggles, updateToggles, loading } = useToggle();

  const handleChange = (e) => {
    const { name, checked } = e.target;
    updateToggles({
      ...toggles,
      [name]: checked,
    });
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="toggle-btn-items">
      <div className="toggle-price-feature">
        <h2>Display Social Icons</h2>
        <label className="switch">
          <input
            type="checkbox"
            name="show_social_icons"
            checked={toggles.show_social_icons}
            onChange={handleChange}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="toggle-price-feature">
        <h2>Display Price Feature</h2>
        <label className="switch">
          <input
            type="checkbox"
            name="show_price_feature"
            checked={toggles.show_price_feature}
            onChange={handleChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default ToggleElements;
