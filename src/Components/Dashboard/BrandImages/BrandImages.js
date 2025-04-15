import React, { useEffect, useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { BiTrash } from "react-icons/bi";
import "./brandimages.css";

import { useFileUpload } from "../../../ApiContext/FileUploadContext";
import Loader from "../../Loader/Loader";

const BrandImages = () => {
  const { files, getFiles, uploadFile, deleteFile } = useFileUpload();

  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  const [loading, setLoading] = useState(false); // ⬅️ Loading state

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  
    // Cleanup in case the component unmounts while loading
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);
  
  const handleUpload = async ({ files }) => {
    setLoading(true);
    for (const file of files) {
      await uploadFile(file);
    }

    await getFiles();

    toast.current?.show({
      severity: "success",
      summary: "Upload Success",
      detail: "Images uploaded successfully!",
      life: 3000,
    });

    fileUploadRef.current?.clear();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteFile(id);
    await getFiles();
    setLoading(false);
  };

  return (
    <div className="brand-images-container relative">
      <Toast ref={toast} />
      <h2>Upload Brand Images</h2>

      <FileUpload
        ref={fileUploadRef}
        mode="advanced"
        chooseLabel="Choose Images"
        uploadLabel="Add"
        cancelLabel="Clear"
        customUpload
        uploadHandler={handleUpload}
        accept="image/*"
        multiple
        maxFileSize={1000000}
        emptyTemplate={
          <p className="m-0">Drag and drop image files here to upload.</p>
        }
      />

      {/* Loader overlay */}
      {loading && (
        <div className="progress-spinner">
           <Loader />
        </div>
      )}
     
      {files.length > 0 && (
        <div className="brand-images-list relative z-0">
          {files.map((img, idx) => (
            <Card key={img.id || idx} className="shadow-md relative">
              <Image
                src={img.file}
                alt={`Brand ${idx}`}
                imageStyle={{ width: "100%" }}
              />
              <Button
                icon={<BiTrash />}
                className="p-button-danger p-button-sm absolute top-2 right-2"
                onClick={() => handleDelete(img.id)}
                tooltip="Delete"
                tooltipOptions={{ position: "top" }}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandImages;
