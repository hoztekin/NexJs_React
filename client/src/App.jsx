import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import WronPage from "./pages/WronPage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <RouteControl>
                <HomePage />
              </RouteControl>
            }
          />
          <Route path="/cart" exact element={<CartPage />} />
          <Route path="/bills" exact element={<BillPage />} />
          <Route path="/customers" exact element={<CustomerPage />} />
          <Route path="/statistic" exact element={<StatisticPage />} />
          <Route path="/products" exact element={<ProductPage />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="*" exact element={<WronPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
