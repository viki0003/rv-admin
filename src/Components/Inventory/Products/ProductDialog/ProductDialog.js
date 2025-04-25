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
            <div>
              <label>Stock Number</label>
              <input
                className="input-field"
                defaultValue={product.stock_number || ""}
              />
            </div>
            <div>
              <label>Vehicle Year</label>
              <input
                className="input-field"
                defaultValue={product.vehicle_year || ""}
              />
            </div>
            <div>
              <label>Make</label>
              <input
                className="input-field"
                defaultValue={product.make || ""}
              />
            </div>
            <div>
              <label>Series</label>
              <input
                className="input-field"
                defaultValue={product.series || ""}
              />
            </div>
            <div>
              <label>Trim Model</label>
              <input
                className="input-field"
                defaultValue={product.trim_model || ""}
              />
            </div>
            <div>
              <label>Sale Price</label>
              <input
                className="input-field"
                defaultValue={product.sale_price || ""}
              />
            </div>
            <div>
              <label>Retail Price</label>
              <input
                className="input-field"
                defaultValue={product.retail_price || ""}
              />
            </div>
            <div>
              <label>Vehicle Type</label>
              <input
                className="input-field"
                defaultValue={product.vehicle_type || ""}
              />
            </div>
            <div>
              <label>Vehicle Type Length</label>
              <input
                className="input-field"
                defaultValue={product.vehicle_type_length || ""}
              />
            </div>
            <div>
              <label>Sleeps</label>
              <input
                className="input-field"
                defaultValue={product.sleeps || ""}
              />
            </div>
            <div>
              <label>Weight</label>
              <input
                className="input-field"
                defaultValue={product.weight || ""}
              />
            </div>
            <div className="vd">
              <label>Vehicle Description</label>
              <textarea
                rows={5}
                className="input-field"
                defaultValue={product.vehicle_description || ""}
              />
            </div>
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
