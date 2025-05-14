import React, { useState } from "react";
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
  const [expandedFilters, setExpandedFilters] = useState({});

  const getNonRedundantValues = (items) => {
    const uniqueWords = new Set();
    const filtered = [];

    for (const item of items) {
      const words = item.toLowerCase().split(/\s+/);
      const hasOverlap = words.some((w) => uniqueWords.has(w));
      if (!hasOverlap) {
        words.forEach((w) => uniqueWords.add(w));
        filtered.push(item);
      }
    }

    return filtered;
  };

  const availableFilters = {
    vehicle_year: [
      ...new Set(
        products
          ?.map((p) => p?.vehicle_year)
          .filter((v) => {
            const year = parseInt(v);
            return year >= 1900 && year <= new Date().getFullYear();
          })
          .sort((a, b) => a - b)
      ),
    ],
    vehicle_type: [
      ...new Set(products?.map((p) => p?.vehicle_type).filter(Boolean)),
    ],
    make: getNonRedundantValues(products.map((p) => p?.make).filter(Boolean)),
    series: getNonRedundantValues(
      products.map((p) => p?.series).filter(Boolean)
    ),
  };

  const hasFilters = Object.values(availableFilters).some(
    (arr) => arr?.length > 0
  );

  const onCategoryChange = (categoryKey, value) => {
    const currentValues = filters[categoryKey] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    setFilters({
      ...filters,
      [categoryKey]: newValues,
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

        {Object.entries(availableFilters).map(([key, values]) => (
          <div className="pf-list-item" key={key}>
            <h4>{key.replace(/_/g, " ").toUpperCase()}</h4>
            {values.length > 0 ? (
              <div className="pf-select-filter-list">
                {(expandedFilters[key] ? values : values.slice(0, 8)).map(
                  (val) => (
                    <div className="filter-itemm" key={val}>
                      <div className="flex align-items-center mb-1">
                        <Checkbox
                          inputId={`${key}-${val}`}
                          name={key}
                          value={val}
                          onChange={() => onCategoryChange(key, val)}
                          checked={filters[key]?.includes(val)}
                        />
                        <label htmlFor={`${key}-${val}`} className="ml-2">
                          {val}
                        </label>
                      </div>
                      <span className="filter-product-count">
                        {
                          products.filter((product) => {
                            const filtersToApply = { ...filters };
                            filtersToApply[key] = [val];
                            return Object.entries(filtersToApply).every(
                              ([fKey, fValues]) => {
                                if (!fValues.length) return true;
                                return fValues.includes(product[fKey]);
                              }
                            );
                          }).length
                        }
                      </span>
                    </div>
                  )
                )}
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
