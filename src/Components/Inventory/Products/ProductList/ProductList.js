import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../../../../Components/Loader/Loader";
import { useProducts } from "../.././../../ApiContext/ProductApi";
import ProductFilter from "../Filter/Filter";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "./productlist.css";

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    vehicle_type: [],
    make: [],
    series: [],
    vehicle_year: [],
  });
  const [rangeValue, setRangeValue] = useState([0, 100]);
  const productsPerPage = 9;

  // Set initial range based on available products
  useEffect(() => {
    if (products.length > 0) {
      const lengths = products
        .map(p => Number(p.vehicle_type_length))
        .filter(length => !isNaN(length));
      
      if (lengths.length > 0) {
        const minLength = Math.min(...lengths);
        const maxLength = Math.max(...lengths);
        setRangeValue([minLength, maxLength]);
      }
    }
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, rangeValue]);

  const filteredProducts = products.filter((product) => {
    if (!product) return false;

    const { vehicle_type, make, series, vehicle_year } = filters;

    // Check if any filters are active
    const hasActiveFilters = 
      vehicle_type.length > 0 || 
      make.length > 0 || 
      series.length > 0 || 
      vehicle_year.length > 0;

    // Check each filter category
    const matchesVehicleType = 
      vehicle_type.length === 0 || 
      vehicle_type.includes(product.vehicle_type);

    const matchesMake = 
      make.length === 0 || 
      make.includes(product.make);

    const matchesSeries = 
      series.length === 0 || 
      series.includes(product.series);

    const matchesYear = 
      vehicle_year.length === 0 || 
      vehicle_year.includes(product.vehicle_year);

    // Convert vehicle_type_length to number for comparison
    const productLength = Number(product.vehicle_type_length);
    const matchesRange =
      !isNaN(productLength) &&
      productLength >= rangeValue[0] &&
      productLength <= rangeValue[1];

    // If no category filters are active, only check length range
    if (!hasActiveFilters) {
      return matchesRange;
    }

    // If category filters are active, check both category filters and length range
    return (
      matchesVehicleType &&
      matchesMake &&
      matchesSeries &&
      matchesYear &&
      matchesRange
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const paginationNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(
      (page) =>
        page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
    )
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
      <div className="all-products-ui">
        <ProductFilter
          value={rangeValue}
          setValue={setRangeValue}
          products={products}
          filters={filters}
          setFilters={setFilters}
        />
        <div>
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
                  <div className="no-products">
                    <p>No products available matching the current filters.</p>
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="pagination-container">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`pagination-arrow ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <IoChevronBack />
                  </button>

                  {paginationNumbers.map((item, index) =>
                    item === "dots" ? (
                      <span key={`dots-${index}`} className="pagination-dots">
                        ...
                      </span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => setCurrentPage(item)}
                        className={`pagination-number ${
                          currentPage === item ? "active" : ""
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`pagination-arrow ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <IoChevronForward />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
