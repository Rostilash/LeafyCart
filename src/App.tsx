import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import { HomePage } from "./pages/HomePage/HomePage";
import { Catalog } from "./pages/Catalog/Catalog";
import { CategoryPage } from "./pages/Catalog/CategoryComponents/CategoryPage";
import { AdminPanel } from "./pages/Admin/AdminPanel";
import { Products } from "./pages/Admin/Products/ProductsList";
import { AdminWrapper } from "./pages/Admin/AdminWrapper";
import { useAppDispatch } from "./redux/reduxTypeHook";
import { useEffect } from "react";
import { checkAuth } from "./redux/slices/authSlice";
import { Testing } from "./pages/Admin/Settings/Testing";
import { PersonalInfo } from "./pages/PersonalInfo/PersonalInfo";
import { Settings } from "./pages/Admin/Settings/Settings";
import AuthPage from "./components/AuthComponents/AuthPage";
import { NotFoundPage } from "./components/NotFoundPage";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="catalog/:category" element={<CategoryPage />} />
        <Route path="cart_rents" element={<PersonalInfo />} />
        <Route path="auth" element={<AuthPage />} />

        <Route path="admin" element={<AdminWrapper />}>
          <Route index element={<AdminPanel />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Settings />} />
          <Route path="testing" element={<Testing />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
