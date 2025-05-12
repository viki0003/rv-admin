import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Dashboard from "../Pages/Dashboard";
import SearchPage from "../Components/Inventory/Products/SearchBar/SearchPage"
import { ProductsApiProvider } from "../ApiContext/ProductApi";


const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route element={
          <ProductsApiProvider>
            <Layout />
          </ProductsApiProvider>
        }>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
