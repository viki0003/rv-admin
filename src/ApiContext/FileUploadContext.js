import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create context
const FileUploadContext = createContext();

// Provider component
export const FileUploadProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const API_BASE = 'https://rvlistingbackend.campingx.net/main/file_upload';

  // GET files
  const getFiles = async () => {
    try {
      const response = await axios.get(API_BASE);
      setFiles(response.data); // assuming the API returns a list
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // POST file
  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      const response = await axios.post(API_BASE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // DELETE file
  const deleteFile = async (id) => {
    try {
      await axios.delete(API_BASE, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { id },
      });
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <FileUploadContext.Provider value={{ files, getFiles, uploadFile, deleteFile }}>
      {children}
    </FileUploadContext.Provider>
  );
};

// Hook to use the context
export const useFileUpload = () => useContext(FileUploadContext);
