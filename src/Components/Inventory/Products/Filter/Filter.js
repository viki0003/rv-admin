import React, { useState, useEffect } from "react";
import { Slider } from "primereact/slider";
import { Checkbox } from "primereact/checkbox";
import "./filter.css";

const ProductFilter = ({
  value,
  setValue,
  products = [],
  filters = {},
  setFilters,
}) => {
  const [selectedCategories, setSelectedCategories] = useState({
    vehicle_type: [],
    make: [],
    series: [],
    vehicle_year: [],
  });

  const [expandedFilters, setExpandedFilters] = useState({});

  // Update selectedCategories when filters change
  useEffect(() => {
    setSelectedCategories(filters);
  }, [filters]);

  const availableFilters = {
    vehicle_type: [
      ...new Set(products?.map((p) => p?.vehicle_type).filter(Boolean)),
    ],
    make: [...new Set(products?.map((p) => p?.make).filter(Boolean))],
    series: [...new Set(products?.map((p) => p?.series).filter(Boolean))],
    vehicle_year: [
      ...new Set(
        products?.map((p) => p?.vehicle_year).filter((v) => v != null)
      ),
    ],
  };

  const hasFilters = Object.values(availableFilters).some(
    (arr) => arr?.length > 0
  );

  const onCategoryChange = (categoryKey, value) => {
    setSelectedCategories((prev) => {
      const currentValues = prev[categoryKey] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      const updated = {
        ...prev,
        [categoryKey]: newValues,
      };
      setFilters(updated);
      return updated;
    });
  };

  const toggleShowMore = (key) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!hasFilters) {
    return <div className="text-center text-gray-500 text-sm">No Filters</div>;
  }

  return (
    <div className="product-filter">
      <div className="pf-list">
        {/* LENGTH Range Slider */}
        <div className="pf-list-item">
          <h4>LENGTH</h4>
          <div className="pf-range-filter">
            <div className="pf-range-term">
              <span>Range</span>
              <p>
                {value[0]} - {value[1]}
              </p>
            </div>
            <Slider
              value={value}
              onChange={(e) => setValue(e.value)}
              className="w-14rem"
              range
              min={0}
              max={100}
            />
          </div>
        </div>

        {/* Render each dynamic filter section */}
        {Object.entries(availableFilters).map(([key, values]) => (
          <div className="pf-list-item" key={key}>
            <h4>{key.replace(/_/g, " ").toUpperCase()}</h4>
            {values.length > 0 ? (
              <div className="pf-select-filter-list">
                {(expandedFilters[key] ? values : values.slice(0, 8)).map((val) => (
                  <div key={val} className="flex align-items-center mb-1">
                    <Checkbox
                      inputId={`${key}-${val}`}
                      name={key}
                      value={val}
                      onChange={() => onCategoryChange(key, val)}
                      checked={selectedCategories[key]?.includes(val)}
                    />
                    <label htmlFor={`${key}-${val}`} className="ml-2">
                      {val}
                    </label>
                  </div>
                ))}

                {values.length > 8 && (
                  <button
                    type="button"
                    className="expand-filter-btn"
                    onClick={() => toggleShowMore(key)}
                  >
                    {expandedFilters[key] ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No filter here</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
