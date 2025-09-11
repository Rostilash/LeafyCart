import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import { HomePage } from "./pages/HomePage/HomePage";
import { Catalog } from "./pages/Catalog/Catalog";
import { CategoryPage } from "./pages/Catalog/CategoryComponents/CategoryPage";
import { AdminPanel } from "./pages/Admin/AdminPanel";
import { Products } from "./pages/Admin/Products/ProductsList";
import { AdminWrapper } from "./pages/Admin/AdminWrapper";
import { useAppDispatch, useAppSelector } from "./redux/reduxTypeHook";
import { useEffect } from "react";
import { checkAuth } from "./redux/slices/authSlice";
import { Testing } from "./pages/Admin/Settings/Testing";
import { PersonalInfo } from "./pages/PersonalInfo/PersonalInfo";
import { Settings } from "./pages/Admin/Settings/Settings";
import AuthPage from "./components/AuthComponents/AuthPage";
import { NotFoundPage } from "./components/NotFoundPage";
import { AdminOrdersPage } from "./pages/Admin/Orders/AdminOrdersPage";
import { MapOrdrers } from "./pages/Admin/Map/MapOrdrers";
import { ConfirmBuyoutInfo } from "./pages/Checkout/ConfirmBuyoutInfo";
import { useCartTotals } from "./hook/useCartTotals";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const { totalPrice, totalDiscount } = useCartTotals();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="catalog/:category" element={<CategoryPage />} />
        <Route path="cart_rents" element={<PersonalInfo />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="checkout" element={<ConfirmBuyoutInfo totalPrice={totalPrice} totalDiscount={totalDiscount} />} />

        <Route path="admin" element={<AdminWrapper />}>
          <Route index element={<AdminPanel />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="map_orders" element={<MapOrdrers />} />
          <Route path="testing" element={<Testing />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
