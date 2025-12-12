import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { CartDrawer } from "../components/CartDrawer/CartDrawer";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypeHook";
import { Modal } from "../components/Modal";
import { setSelectedProduct } from "../redux/slices/productSlice";
import { ProductPreviewModal } from "../pages/Catalog/ProductPreviewModal";
import { useRecentProducts } from "../hook/useRecentProducts";
import { useCartTotals } from "../hook/useCartTotals";
import { Loader } from "../components/Loader";

const Layout = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

  const [isNavOpened, setIsNavOpened] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // localStorage Hook set Products
  useRecentProducts();

  // Custom hook getting all totals
  const { totalPrice, totalQuantity, totalDiscount } = useCartTotals();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" h-screen sm:min-h-screen flex bg-[var(--leafy-light)]">
      {/* SideBar */}
      <Sidebar isVisible={isNavOpened} onClose={() => setIsNavOpened(false)} />

      {/* Main menu */}
      <main className="flex-1 bg-[var(--leafy-bg)] md:pt-[100px] lg:pt-[80px] overflow-auto px-2 sm:px-0">
        <Header setIsNavOpened={setIsNavOpened} isNavOpened={isNavOpened} setIsCartOpen={setIsCartOpen} quantity={totalQuantity} />
        <Outlet />
      </main>

      {/* Cart drawer */}
      <CartDrawer isCartVisible={isCartOpen} onClose={() => setIsCartOpen(false)} totalPrice={totalPrice} totalDiscount={totalDiscount} />

      {/* Product preview modal */}
      {selectedProduct && (
        <Modal isOpen={!!selectedProduct} onClose={() => dispatch(setSelectedProduct(null))}>
          <ProductPreviewModal product={selectedProduct} />
        </Modal>
      )}
    </div>
  );
};

export default Layout;
