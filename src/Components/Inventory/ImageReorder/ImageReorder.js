import { useEffect, useRef, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { useRVPicsReorder } from "../../../ApiContext/RVPicsReorderContext";
import { Toast } from "primereact/toast";
import "./imagereorder.css";

const ImageReorder = ({ product }) => {
  const [images, setImages] = useState([]);
  const { reorderRVPics } = useRVPicsReorder();
  const toast = useRef(null);

  useEffect(() => {
    if (product?.rv_pics) {
      const formattedImages = product.rv_pics.map((url, index) => ({
        id: `${index}`,
        url,
      }));
      setImages(formattedImages);
    }
  }, [product]);

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(images);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    setImages(reordered);

    const newOrder = reordered.map((img) => img.url);

    try {
      const contactId = product.contact_id || product.id;
      await reorderRVPics(contactId, newOrder);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Images reordered successfully",
        life: 3000,
      });
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to reorder images",
        life: 4000,
      });
    }
  };

  return (
    <div className="image-reorder-container">
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
              {images.map((img, index) => (
                <Draggable key={img.id} draggableId={img.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`image-item ${snapshot.isDragging ? "dragging" : ""}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img src={img.url} alt={`Product Img ${img.id}`} />
                      <span className="image-order-number">{index + 1}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageReorder;
