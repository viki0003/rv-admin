import React from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../../../ApiContext/ProductApi";
import ProductItem from "../ProductItem/ProductItem";
import NotFound from "../../../NotFound/index";
import "./searchbar.css"

const SearchPage = () => {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredProducts = products.filter((product) => {
    const combined = `${product.vehicle_year || ""} ${product.make || ""} ${
      product.trim_model || ""
    }`.toLowerCase();

    const matchesCombined = combined.includes(query);
    const matchesAnyField = Object.values(product).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(query)
    );

    return matchesCombined || matchesAnyField;
  });

  return (
    <div className="search-page-container">
      <div className="container">
        <div className="heading">
          <h2>Search Results for "{query}"</h2>
          <span className="divider"></span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-list">
            {filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
