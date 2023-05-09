import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DeliveryPage from "./pages/delivery-page/DeliveryPage";
import ConfirmationPage from "./pages/confirmation-page/ConfirmationPage";

import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/delivery" className="nav-link">
              Delivery Page
            </Link>
          </li>
          <li>
            <Link to="/confirmation" className="nav-link">
              Confirmation Page
            </Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/" element={<DeliveryPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
