// import React from "react";
// import "./searchbar.css";
// // Import the CSS file

// const SearchBar = () => {
//     const [isActive, setIsActive] = React.useState(false);
//     function handleActive() {
//         setIsActive(!isActive);
//     }
//     return (
//         <div className="search-bar">
//             <svg width="22" height="22" className="search-icon" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M16.5 16.5L21 21" stroke="#323135" strokeWidth="1.5" strokeLinejoin="round" />
//                 <path d="M19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10Z" stroke="#323135" strokeWidth="1.5" strokeLinejoin="round" />
//             </svg>
//             <input type="text" placeholder="Find your favorite items" onFocus={() => setIsActive(true)}
//                 onBlur={() => setIsActive(false)} />
//             <svg width="22" height="22" className={`scan-icon ${isActive ? 'hidden' : 'visible'}`} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M8.14426 1.49998H1.5V8.14425M13.8557 1.49998H20.5V8.14425M13.8557 20.5H20.5V13.8557M8.14426 20.5H1.5V13.8557" stroke="#7F7B87" strokeWidth="1.5" />
//                 <path d="M14 14L16 16M15 10.5C15 8.01472 12.9853 6 10.5 6C8.01472 6 6 8.01472 6 10.5C6 12.9853 8.01472 15 10.5 15C12.9853 15 15 12.9853 15 10.5Z" stroke="#7F7B87" strokeWidth="1.5" strokeLinejoin="round" />
//             </svg>
//             <svg width="24" height="24" className={`scan-icon ${isActive ? 'visible' : 'hidden'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M15.9991 16L8 8M8.00085 16L16 8" stroke="#323135" strokeWidth="1.5" strokeLinejoin="round" />
//                 <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#323135" strokeWidth="1.5" strokeLinejoin="round" />
//             </svg>

//         </div>
//     );
// };

// export default SearchBar;


import React, { useState } from "react";
import { AutoComplete  } from "primereact/autocomplete";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

import "./searchbar.css"; // Import CSS file

const SearchBar = () => {
    const [isActive, setIsActive] = useState(false);
    const [query, setQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const [items, setItems] = useState([
        "Keystone",
        "RV",
        "T90",
        "Traveller",
    ]);
    const removeItem = (item) => {
        const updatedItems = items.filter((i) => i !== item);
        setItems(updatedItems);
        setFilteredItems(updatedItems);
    };
    const itemTemplate = (item) => {
        return (
            <div className="autocomplete-item">
                <span>{item}</span>
                <AiOutlineClose
                    className="cancel-icon"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents selection on remove click
                        removeItem(item);
                    }}
                />
            </div>
        );
    };

    // Filter suggestions based on input
    const search = (event) => {
        const value = event.query.toLowerCase();
        setFilteredItems(items.filter(item => item.toLowerCase().includes(value)));
    };

    return (
        <>{isHomePage && <div className="search-bar">
            {/* Search Icon */}
            <svg width="22" height="22" className="search-icon" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 16.5L21 21" stroke="#323135" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10Z" stroke="#323135" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>

            {/* AutoComplete Input */}
            <AutoComplete
                value={query}
                suggestions={filteredItems}
                completeMethod={search}
                onChange={(e) => setQuery(e.value)}
                placeholder="Find your favorite items"
                className="autocomplete-input"
                itemTemplate={itemTemplate}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
            />

            {/* Scan Icon - Hidden when active */}
            <svg width="22" height="22" className={`scan-icon ${isActive ? 'hidden' : 'visible'}`} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.14426 1.49998H1.5V8.14425M13.8557 1.49998H20.5V8.14425M13.8557 20.5H20.5V13.8557M8.14426 20.5H1.5V13.8557" stroke="#7F7B87" strokeWidth="1.5" />
                <path d="M14 14L16 16M15 10.5C15 8.01472 12.9853 6 10.5 6C8.01472 6 6 8.01472 6 10.5C6 12.9853 8.01472 15 10.5 15C12.9853 15 15 12.9853 15 10.5Z" stroke="#7F7B87" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>

            {/* Clear Icon - Visible when active */}
            <svg width="24" height="24" className={`scan-icon ${isActive ? 'visible' : 'hidden'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                onClick={() => setQuery("")}>
                <path d="M15.9991 16L8 8M8.00085 16L16 8" stroke="#323135" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#323135" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </div>}
        </>
    );
};

export default SearchBar;

