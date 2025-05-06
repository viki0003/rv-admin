import { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useRVPicsReorder } from "../../../ApiContext/RVPicsReorderContext";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import "./imagereorder.css";
import { FaTimes } from "react-icons/fa";
import { Dialog } from "primereact/dialog";
import { Galleria } from "primereact/galleria";

const ImageReorder = ({ product }) => {
  const [deletingIds, setDeletingIds] = useState([]);
  const [globalLoading, setGlobalLoading] = useState(false);
  const { images, reorderRVPics, addRVPics, deleteRVPic, getRVPics } =
    useRVPicsReorder();
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (product?.id) {
      getRVPics(product.id);
    }
  }, [product, getRVPics]);

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(images);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    try {
      setGlobalLoading(true);
      await reorderRVPics(product.id, reordered);
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

    setGlobalLoading(true);

    try {
      await addRVPics(product.id, files);
      toast.current.show({
        severity: "success",
        summary: "Uploaded",
        detail: "Images added",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Upload failed",
        life: 4000,
      });
    } finally {
      setGlobalLoading(false);
      e.target.value = null;
    }
  };

  const handleDelete = async (img) => {
    setDeletingIds((ids) => [...ids, img.id]);
    setGlobalLoading(true);
    try {
      await deleteRVPic(product.id, img.url);
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

  const openCarousel = (index) => {
    setActiveIndex(index);
    setCarouselVisible(true);
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
              {images.map((url, idx) => (
                <Draggable key={url} draggableId={url} index={idx}>
                  {(prov, snap) => (
                    <div
                      className={`image-item ${
                        snap.isDragging ? "dragging" : ""
                      }`}
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      {...prov.dragHandleProps}
                    >
                      <img
                        src={url}
                        alt={`Img ${idx + 1}`}
                        onClick={() => openCarousel(idx)}
                      />
                      <span className="image-order-number">{idx + 1}</span>
                      <Button
                        className="p-button-rounded p-button-text delete-btn"
                        loading={deletingIds.includes(url)}
                        onClick={() => handleDelete({ id: url, url })}
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

      <Dialog
  visible={carouselVisible}
  onHide={() => setCarouselVisible(false)}
  header="RV Images"
  style={{ width: '90vw', maxWidth: '1200px' }}
  modal
  className="custom-carousel-dialog"
>
  <Galleria
    value={images.map((url) => ({ itemImageSrc: url }))}
    activeIndex={activeIndex}
    onItemChange={(e) => setActiveIndex(e.index)}
    showThumbnails
    showItemNavigators
    showItemNavigatorsOnHover
    circular
    numVisible={5}
    item={(item) => (
      <img
        src={item.itemImageSrc}
        alt="carousel"
        style={{
          width: '100%',
          maxHeight: '450px',
          objectFit: 'contain',
          borderRadius: '12px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.15)',
        }}
      />
    )}
    thumbnail={(item) => (
      <img
        src={item.itemImageSrc}
        alt="thumb"
        style={{
          width: 100,
          height: 60,
          objectFit: 'cover',
          borderRadius: '8px',
          margin: '0 4px',
          cursor: 'pointer',
        }}
      />
    )}
  />
</Dialog>

    </div>
  );
};

export default ImageReorder;
