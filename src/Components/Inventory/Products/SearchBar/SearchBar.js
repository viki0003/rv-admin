import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import SearchIcon from "../../../../Assets/Icons/SearchIcon";
import { IoClose } from "react-icons/io5";

const SearchBar = ({ searchTerm, setSearchTerm, products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchProducts = (event) => {
    const query = event.query.toLowerCase();

    const filtered = products.filter((product) =>
      Object.values(product).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );

    const formatted = filtered.map((product) => ({
      ...product,
      displayLabel: `${product.vehicle_year || ""} ${product.make || ""} ${product.series || ""} ${product.trim_model || ""} | Stock: ${product.stock_number || ""} | Sale: $${product.sale_price || ""} | Retail: $${product.retail_price || ""} | Length: ${product.vehicle_type_length || ""}ft`
    }));

    setFilteredProducts(formatted);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredProducts([]);
  };

  return (
    <div className="header-search-bar md">
      <div className="header-search-icon">
        <SearchIcon />
      </div>

      <AutoComplete
        value={searchTerm}
        suggestions={filteredProducts}
        completeMethod={searchProducts}
        field="displayLabel"
        onChange={(e) => setSearchTerm(e.value)}
        onSelect={(e) => setSearchTerm(e.value.displayLabel)}
        placeholder="Search for stock number, make, price, or description"
        className="header-search-input"
      />

      {searchTerm && (
        <button
          className="search-reset-btn"
          onClick={handleReset}
          aria-label="Reset search"
        >
          <IoClose size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
