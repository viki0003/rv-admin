import React, { createContext, useContext } from 'react';
import axios from 'axios';

const RVPicsReorderContext = createContext();

export const useRVPicsReorder = () => {
  const context = useContext(RVPicsReorderContext);
  if (!context) {
    throw new Error('useRVPicsReorder must be used within a RVPicsReorderProvider');
  }
  return context;
};

export const RVPicsReorderProvider = ({ children }) => {
  const reorderRVPics = async (contactId, rvPics) => {
    try {
      const payload = new URLSearchParams();
      payload.append('contact_id', contactId);
      payload.append('rv_pics', JSON.stringify(rvPics));

      const response = await axios.post(
        'https://rvlistingbackend.campingx.net/main/reorder_rv_pics',
        payload,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log('RV pics reordered successfully:', response.data);
    } catch (error) {
      console.error('Failed to reorder RV pics:', error.response?.data || error.message);
    }
  };

  return (
    <RVPicsReorderContext.Provider value={{ reorderRVPics }}>
      {children}
    </RVPicsReorderContext.Provider>
  );
};
