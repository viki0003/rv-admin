import React, { createContext, useContext, useEffect, useState } from "react";


const ToggleContext = createContext();


export const useToggle = () => useContext(ToggleContext);

export const ToggleProvider = ({ children }) => {
  const [toggles, setToggles] = useState({
    show_social_icons: false,
    show_price_feature: false,
  });
  const [loading, setLoading] = useState(true);

  const fetchToggles = async () => {
    try {
      const response = await fetch("https://rvlistingbackend.campingx.net/main/get_admin_settings");
      const data = await response.json();

      console.log("Fetched toggles:", data);

      setToggles({
        show_social_icons: data?.show_social_icons ?? false,
        show_price_feature: data?.show_price_feature ?? false,
      });
    } catch (error) {
      console.error("Failed to fetch toggle settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateToggles = async (newToggles) => {
    try {
      const response = await fetch("https://rvlistingbackend.campingx.net/main/update_admin_settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newToggles),
      });

      if (!response.ok) {
        throw new Error("Failed to update toggle settings.");
      }

      setToggles(newToggles);
      console.log("Toggles updated successfully:", newToggles);
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
