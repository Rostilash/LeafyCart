import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { HomePage } from "./pages/HomePage/HomePage";
import { Catalog } from "./pages/Catalog/Catalog";
import { CategoryPage } from "./pages/Catalog/CategoryPage";
import { AdminPanel } from "./pages/Admin/AdminPanel";
import { Products } from "./pages/Admin/Products/Products";
import { AdminWrapper } from "./pages/Admin/AdminWrapper";
import { useAppDispatch } from "./redux/reduxTypeHook";
import { useEffect } from "react";
import { checkAuth } from "./redux/slices/authSlice";

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
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="admin" element={<AdminWrapper />}>
          <Route index element={<AdminPanel />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
