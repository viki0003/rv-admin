import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import SearchIcon from "../../../../Assets/Icons/SearchIcon";
import { IoClose } from "react-icons/io5";

const SearchBar = ({ searchTerm, setSearchTerm, products }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    const searchProducts = (event) => {
      let query = event.query.toLowerCase();
      let filtered = products.filter((product) => {
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
  
      const formatted = filtered.map((product) => ({
        ...product,
        displayLabel: `${product.vehicle_year || ""} ${product.make || ""} ${
          product.trim_model || ""
        }`.trim(),
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
          placeholder="Search for an item"
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
