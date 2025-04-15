import React from "react";
import { useAdminSettings } from "../../../ApiContext/AdminSettingsContext";
import "./togglestyle.css";

const TogglePriceFeature = () => {
  const { settings, updateSettings, loading, error } = useAdminSettings();

  const handleToggle = () => {
    updateSettings((prevSettings) => ({
      ...prevSettings,
      show_price_feature: !prevSettings.show_price_feature
    }));
  };
  

  if (loading || !settings) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="toggle-price-feature">
      <h2>Display Price Feature</h2>
      <label className="switch">
        <input
          type="checkbox"
          checked={settings.show_price_feature}
          onChange={handleToggle}
          disabled={loading}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default TogglePriceFeature;
