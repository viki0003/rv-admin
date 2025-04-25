import ProductItem from "../ProductItem/ProductItem";
import Loader from "../../../../Components/Loader/Loader";
import { useProducts } from "../.././../../ApiContext/ProductApi";
import "./productlist.css";

const ProductList = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className="rv-inventory">
      <h3>List of RVs</h3>
      <div className="product-list">
        {loading && <Loader />}
        {error && <p>{error}</p>}
        {!loading && !error && products.length > 0
          ? products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          : !loading && !error && <p>No products available.</p>}
      </div>
    </div>
  );
};
export default ProductList;
