import { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useRVPicsReorder } from "../../../ApiContext/RVPicsReorderContext";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import "./imagereorder.css";
import { FaTimes } from "react-icons/fa";

const ImageReorder = ({ product }) => {
  const [images, setImages] = useState([]);
  // const [uploading, setUploading] = useState(false);
  const [deletingIds, setDeletingIds] = useState([]);
  const [globalLoading, setGlobalLoading] = useState(false);
  const { reorderRVPics, addRVPics, deleteRVPic } = useRVPicsReorder();
  const toast = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (product?.rv_pics) {
      setImages(product.rv_pics.map((url, idx) => ({ id: String(idx), url })));
    }
  }, [product]);

  

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(images);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setImages(reordered);
    try {
      setGlobalLoading(true);
      await reorderRVPics(
        product.contact_id || product.id,
        reordered.map((i) => i.url)
      );
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Reorder saved",
        life: 3000,
      });
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Reorder failed",
        life: 4000,
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
  
    const tempImageObjects = files.map((file, idx) => ({
      id: `temp-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      isTemporary: true,
    }));
  
    // Show the selected images immediately
    setImages((prev) => [...prev, ...tempImageObjects]);
  
    // setUploading(true);
    setGlobalLoading(true);
  
    try {
      const data = await addRVPics(product.contact_id || product.id, files);
      const newUrls = data.new_images || [];
  
      // Replace temporary images with real ones
      setImages((prev) =>
        prev
          .filter((img) => !img.isTemporary)
          .concat(
            newUrls.map((url, idx) => ({
              id: `new-${Date.now()}-${idx}`,
              url,
            }))
          )
      );
  
      toast.current.show({
        severity: "success",
        summary: "Uploaded",
        detail: "Images added",
        life: 3000,
      });
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Upload failed",
        life: 4000,
      });
  
      // Roll back: remove temporary previews
      setImages((prev) => prev.filter((img) => !img.isTemporary));
    } finally {
      // setUploading(false);
      setGlobalLoading(false);
      e.target.value = null;
    }
  };
  

  const handleDelete = async (img) => {
    setDeletingIds((ids) => [...ids, img.id]);
    setGlobalLoading(true);
    try {
      await deleteRVPic(product.contact_id || product.id, img.url);
      setImages((prev) => prev.filter((i) => i.id !== img.id));
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Image removed",
        life: 3000,
      });
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Delete failed",
        life: 4000,
      });
    } finally {
      setDeletingIds((ids) => ids.filter((id) => id !== img.id));
      setGlobalLoading(false);
    }
  };

  return (
    <div className="image-reorder-container">
     
      {globalLoading && (
        <div className="full-page-loader">
          <ProgressSpinner />
        </div>
      )}
      <Toast ref={toast} />
      <h2>Reorganize Images</h2>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <div
              className="image-grid"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.map((img, idx) => (
                <Draggable key={img.id} draggableId={img.id} index={idx}>
                  {(prov, snap) => (
                    <div
                      className={`image-item ${
                        snap.isDragging ? "dragging" : ""
                      }`}
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      {...prov.dragHandleProps}
                    >
                      <img src={img.url} alt={`Img ${idx + 1}`} />
                      <span className="image-order-number">{idx + 1}</span>
                      <Button
                        className="p-button-rounded p-button-text delete-btn"
                        loading={deletingIds.includes(img.id)}
                        onClick={() => handleDelete(img)}
                      >
                        <FaTimes />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              <div
                className="image-item upload-slot"
                onClick={() => fileInputRef.current.click()}
              >
                <span className="upload-label">Click to add image</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFilesSelected}
                />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageReorder;
