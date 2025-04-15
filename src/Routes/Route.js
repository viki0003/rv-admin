import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Dashboard from "../Pages/Dashboard";


const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
