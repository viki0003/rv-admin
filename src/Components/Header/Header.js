import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../ApiContext/ProductApi";
import AdminLogo from "../../Assets/Images/RVLogo.png";
import './header.css';
import SearchIcon from "../../Assets/Icons/SearchIcon";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const searchProducts = (event) => {
    let query = event.query.toLowerCase();
    let filtered = products.filter((product) =>
      Object.values(product).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(query)
      )
    );
    setFilteredProducts(filtered);
  };

  const onProductSelect = (selectedProduct) => {
    setSearchTerm(selectedProduct.make);
    navigate(`/search?q=${selectedProduct.make}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredProducts([]);
    navigate(-1); // Go back to previous page
  };

  return (
    <header>
      <div className="header">
        <img src={AdminLogo} alt="logo" width={200} />
        <div className="header-search-bar md">
          <div className="header-search-icon">
            <SearchIcon />
          </div>

          <AutoComplete
            value={searchTerm}
            suggestions={filteredProducts}
            completeMethod={searchProducts}
            field="make"
            onChange={(e) => setSearchTerm(e.value)}
            onSelect={(e) => onProductSelect(e.value)}
            placeholder="Search for an item"
            className="header-search-input"
            onKeyDown={handleKeyPress}
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
      </div>
    </header>
  );
};

export default Header;
