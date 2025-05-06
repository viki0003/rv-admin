import React, { createContext, useContext, useState } from 'react';
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
  const [images, setImages] = useState([]);
  const BASE_URL = 'https://rvlistingbackend.campingx.net/main';

  const refreshImages = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/get_contact_details`, {
        params: { contact_id: id },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.data?.data) {
        console.error('Invalid response format:', response.data);
        return [];
      }

      const contactData = response.data.data.find(contact => contact.id === id);
      if (!contactData) {
        console.error('Contact not found:', id);
        return [];
      }

      const newImages = contactData.rv_pics || [];
      setImages(newImages);
      return newImages;
    } catch (error) {
      console.error('Error refreshing images:', error.response?.data || error.message);
      return [];
    }
  };

  const reorderRVPics = async (id, reorderedImages) => {
    try {
      // Optimistically update UI with the reordered images
      setImages(reorderedImages);

      const payload = new URLSearchParams();
      payload.append('contact_id', id);
      payload.append('rv_pics', JSON.stringify(reorderedImages));

      const response = await axios.post(`${BASE_URL}/reorder_rv_pics`, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
      });

      // Refresh images after reordering
      await refreshImages(id);
      return response.data;
    } catch (error) {
      // Revert to previous state on error
      await refreshImages(id);
      console.error('Error reordering images:', error.response?.data || error.message);
      throw error;
    }
  };

  const addRVPics = async (id, imageFiles) => {
    try {
      const formData = new FormData();
      formData.append('contact_id', id);
      
      // Append each file directly to FormData
      Array.from(imageFiles).forEach((file) => {
        formData.append('image_uploads', file);
      });

      const response = await axios.post(`${BASE_URL}/add_images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        },
      });

      // Refresh images after adding
      await refreshImages(id);
      return response.data;
    } catch (error) {
      console.error('Error adding images:', error.response?.data || error.message);
      throw error;
    }
  };

  const deleteRVPic = async (id, imageUrl) => {
    try {
      // Optimistically update UI
      setImages(prevImages => prevImages.filter(img => img !== imageUrl));

      await axios.delete(`${BASE_URL}/delete_rv_image`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: {
          contact_id: id,
          image_url: imageUrl
        }
      });

      // Refresh images after deletion
      await refreshImages(id);
      return true;
    } catch (error) {
      // Revert to previous state on error
      await refreshImages(id);
      console.error('Error deleting image:', error.response?.data || error.message);
      throw error;
    }
  };

  const getRVPics = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/get_contact_details`, {
        params: { contact_id: id },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.data?.data) {
        console.error('Invalid response format:', response.data);
        return [];
      }

      const contactData = response.data.data.find(contact => contact.id === id);
      if (!contactData) {
        console.error('Contact not found:', id);
        return [];
      }

      const newImages = contactData.rv_pics || [];
      setImages(newImages);
      return newImages;
    } catch (error) {
      console.error('Error getting images:', error.response?.data || error.message);
      return [];
    }
  };

  return (
    <RVPicsReorderContext.Provider
      value={{ 
        images, 
        setImages, 
        reorderRVPics, 
        addRVPics, 
        deleteRVPic, 
        getRVPics,
        refreshImages 
      }}
    >
      {children}
    </RVPicsReorderContext.Provider>
  );
};
