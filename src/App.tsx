import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { HomePage } from "./pages/HomePage/HomePage";
import { Catalog } from "./pages/Catalog/Catalog";
import { CategoryPage } from "./pages/Catalog/CategoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="catalog/:category" element={<CategoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
