import { useEffect, useState } from "react";
import PlaceholderImage from "../../../../Assets/Images/placeholder.jpg";
import "./productitem.css";
import ProductDialog from "../ProductDialog/ProductDialog";

const ProductItem = ({ product }) => {
  const [imageSrc, setImageSrc] = useState(PlaceholderImage);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const rvImage =
      product.rv_pics && product.rv_pics.length > 0
        ? product.rv_pics[0]
        : PlaceholderImage;
    setImageSrc(rvImage);
  }, [product.rv_pics]);

  const handleProductClick = () => {
    setSelectedProduct(product);
    setVisible(true);
  };

  return (
    <>
      <div className="rv-product-item" onClick={handleProductClick} >
       
        <div className="rv-product-image">
          <img src={imageSrc} alt="RV" />
        </div>
        <div className="rv-product-content">
          <span className="stock-id">Stock #{product.stock_number || "N/A"}</span>
          <p className="product-text">
            {product.vehicle_year} {product.make}
          </p>
          <p className="product-text">{product.trim_model}</p>
          <div className="rv-product-price">
            <p>
              {product.sale_price ? `$${product.sale_price}` : "Call for Price"}
            </p>
            {product.retail_price && <span>${product.retail_price}</span>}
          </div>
          <div className="rv-product-specs">
            <div className="rv-spec-item">
              <p>Length(ft)</p>
              <span>{product.vehicle_type_length || "N/A"}</span>
            </div>
            <div className="rv-spec-item">
              <p>Sleeps</p>
              <span>{product.sleeps || "N/A"}</span>
            </div>
            <div className="rv-spec-item">
              <p>Weight(lbs)</p>
              <span>{product.weight || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      <ProductDialog
        visible={visible}
        onHide={() => setVisible(false)}
        product={selectedProduct}
        imageSrc={imageSrc}
      />
    </>
  );
};

export default ProductItem;
