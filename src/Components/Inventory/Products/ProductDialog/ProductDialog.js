import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import ImageReorder from "../../ImageReorder/ImageReorder";
import { RVPicsReorderProvider } from "../../../../ApiContext/RVPicsReorderContext";
import "./productdialog.css";

const ProductDialog = ({ visible, onHide, product }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        stock_number: product.stock_number || "",
        vehicle_year: product.vehicle_year || "",
        make: product.make || "",
        series: product.series || "",
        trim_model: product.trim_model || "",
        sale_price: product.sale_price || "",
        retail_price: product.retail_price || "",
        vehicle_type: product.vehicle_type || "",
        vehicle_length: product.vehicle_length || "",
        sleeps: product.sleeps || "",
        weight: product.weight || "",
        vehicle_description: product.vehicle_description || "",
      });
      setLoading(false);
    }
  }, [product]);

  if (!product) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      contact_id: product.id,
      ...formData,
      vehicle_type_length: formData.vehicle_length, // map to backend field
    };
    delete payload.vehicle_length;

    try {
      setLoading(true);
      const response = await fetch("https://rvlistingbackend.campingx.net/main/update_rv_listing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update product");

      alert("Product updated successfully!");
      onHide();
    } catch (error) {
      console.error(error);
      alert("Error updating product.");
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, field, isTextArea = false) => (
    <div className={field === "vehicle_description" ? "vd" : ""}>
      <label>{label}</label>
      {isTextArea ? (
        <textarea
          rows={5}
          className="input-field"
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      ) : (
        <input
          className="input-field"
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      )}
    </div>
  );

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

        <div className="input-fields-container">
          <h2 className="section-heading">Input Fields</h2>
          <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
            {renderInput("Stock Number", "stock_number")}
            {renderInput("Vehicle Year", "vehicle_year")}
            {renderInput("Make", "make")}
            {renderInput("Series", "series")}
            {renderInput("Trim Model", "trim_model")}
            {renderInput("Sale Price", "sale_price")}
            {renderInput("Retail Price", "retail_price")}
            {renderInput("Vehicle Type", "vehicle_type")}
            {renderInput("Vehicle Length", "vehicle_length")}
            {renderInput("Sleeps", "sleeps")}
            {renderInput("Weight", "weight")}
            {renderInput("Vehicle Description", "vehicle_description", true)}
          </form>
        </div>

        <div className="submit-container">
          <button className="submit-button" onClick={handleSubmit} disabled={loading}>
            {loading ? <span className="spinner"></span> : "Submit"}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDialog;