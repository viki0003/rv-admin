import React, { useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../../../../Components/Loader/Loader";
import { useProducts } from "../.././../../ApiContext/ProductApi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5"; // for icons
import "./productlist.css";

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const paginationNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
    .reduce((acc, page, idx, arr) => {
      if (idx > 0 && page - arr[idx - 1] > 1) {
        acc.push("dots");
      }
      acc.push(page);
      return acc;
    }, []);

  return (
    <div className="rv-inventory">
      <h3>List of RVs</h3>

      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div className="product-list">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`pagination-arrow ${currentPage === 1 ? "disabled" : ""}`}
              >
                <IoChevronBack />
              </button>

              {paginationNumbers.map((item, index) =>
                item === "dots" ? (
                  <span key={`dots-${index}`} className="pagination-dots">...</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(item)}
                    className={`pagination-number ${currentPage === item ? "active" : ""}`}
                  >
                    {item}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`pagination-arrow ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <IoChevronForward />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
