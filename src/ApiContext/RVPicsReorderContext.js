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
  const BASE_URL = 'https://rvlistingbackend.campingx.net/main';

  const reorderRVPics = async (contactId, rvPics) => {
    const payload = new URLSearchParams();
    payload.append('contact_id', contactId);
    payload.append('rv_pics', JSON.stringify(rvPics));

    const response = await axios.post(`${BASE_URL}/reorder_rv_pics`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  };

  const addRVPics = async (contactId, imageFiles) => {
    const formData = new FormData();
    formData.append('contact_id', contactId);
    imageFiles.forEach((file) => formData.append('image_uploads', file));

    const response = await axios.post(`${BASE_URL}/add_images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  };

  const deleteRVPic = async (contactId, imageUrl) => {
    const response = await axios.delete(`${BASE_URL}/delete_rv_image`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        contact_id: contactId,
        image_url: imageUrl,
      },
    });

    return response.data;
  };

  const getRVPics = async (contactId) => {
    const response = await axios.get(`${BASE_URL}/get_rv_images`, {
      params: { contact_id: contactId },
    });

    return response.data.rv_pics || [];
  };

  return (
    <RVPicsReorderContext.Provider
      value={{ reorderRVPics, addRVPics, deleteRVPic, getRVPics }}
    >
      {children}
    </RVPicsReorderContext.Provider>
  );
};
