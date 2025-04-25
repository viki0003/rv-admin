import { Dialog } from "primereact/dialog";
import ImageReorder from "../../ImageReorder/ImageReorder";
import { RVPicsReorderProvider } from "../../../../ApiContext/RVPicsReorderContext";
import "./productdialog.css";

const ProductDialog = ({ visible, onHide, product }) => {
  if (!product) return null;

  return (
    <Dialog
      header="Product Details"
      visible={visible}
      style={{ width: "60vw" }}
      onHide={onHide}
      draggable={false}
      resizable={false}
    >
      <div className="dialog-container">
        <RVPicsReorderProvider>
          <ImageReorder product={product} />
        </RVPicsReorderProvider>

        {/* Input Fields */}
        <div className="input-fields-container">
          <h2 className="section-heading">Input Fields</h2>
          <form className="form-grid">
            <input
              className="input-field"
              placeholder="Stock Number"
              defaultValue={product.stock_number || ""}
            />
            <input
              className="input-field"
              placeholder="Vehicle Year"
              defaultValue={product.vehicle_year || ""}
            />
            <input
              className="input-field"
              placeholder="Make"
              defaultValue={product.make || ""}
            />
            <input
              className="input-field"
              placeholder="Series"
              defaultValue={product.series || ""}
            />
            <input
              className="input-field"
              placeholder="Trim Model"
              defaultValue={product.trim_model || ""}
            />
            <input
              className="input-field"
              placeholder="Sale Price"
              defaultValue={product.sale_price || ""}
            />
            <input
              className="input-field"
              placeholder="Retail Price"
              defaultValue={product.retail_price || ""}
            />
            <input
              className="input-field"
              placeholder="Vehicle Type"
              defaultValue={product.vehicle_type || ""}
            />
            <input
              className="input-field"
              placeholder="Vehicle Type Length"
              defaultValue={product.vehicle_type_length || ""}
            />
            <input
              className="input-field"
              placeholder="Sleeps"
              defaultValue={product.sleeps || ""}
            />
            <input
              className="input-field"
              placeholder="Weight"
              defaultValue={product.weight || ""}
            />
            <input
              className="input-field"
              placeholder="Vehicle Description"
              defaultValue={product.vehicle_description || ""}
            />
          </form>
        </div>

        {/* Submit Button */}
        <div className="submit-container">
          <button className="submit-button">Submit</button>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDialog;
