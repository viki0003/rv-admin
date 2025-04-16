import React, { createContext, useContext, useEffect, useState } from "react";

const ToggleContext = createContext();

export const useToggle = () => useContext(ToggleContext);

export const ToggleProvider = ({ children }) => {
  const defaultToggles = {
    show_social_icons: false,
    show_price_feature: false,
    pre_approved: false,
  };

  const [toggles, setToggles] = useState(defaultToggles);
  const [loading, setLoading] = useState(true);

  const fetchToggles = async () => {
    try {
      // Step 1: Try localStorage first
      const local = localStorage.getItem("toggle-settings");
      if (local) {
        setToggles(JSON.parse(local));
        setLoading(false);
        return;
      }

      // Step 2: Fetch from API if not in localStorage
      const response = await fetch("https://rvlistingbackend.campingx.net/main/get_admin_settings");
      const data = await response.json();

      const newToggles = {
        show_social_icons: data?.show_social_icons === true || data?.show_social_icons === "true",
        show_price_feature: data?.show_price_feature === true || data?.show_price_feature === "true",
        pre_approved: data?.pre_approved === true || data?.pre_approved === "true",
      };

      setToggles(newToggles);
      localStorage.setItem("toggle-settings", JSON.stringify(newToggles));
    } catch (error) {
      console.error("Failed to fetch toggle settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateToggles = async (newToggles) => {
    try {
      // Update local state immediately
      setToggles(newToggles);
      localStorage.setItem("toggle-settings", JSON.stringify(newToggles)); // persist

      await fetch("https://rvlistingbackend.campingx.net/main/update_admin_settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newToggles),
      });
    } catch (error) {
      console.error("Error updating toggle settings:", error);
    }
  };

  useEffect(() => {
    fetchToggles();
  }, []);

  return (
    <ToggleContext.Provider value={{ toggles, updateToggles, loading }}>
      {children}
    </ToggleContext.Provider>
  );
};
