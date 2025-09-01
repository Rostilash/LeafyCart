import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { CartDrawer } from "../components/CartDrawer/CartDrawer";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypeHook";
import { Modal } from "../components/Modal";
import { setSelectedProduct } from "../redux/slices/productSlice";
import { ProductPreviewModal } from "../pages/Catalog/ProductPreviewModal";
import { ConfirmBuyoutInfo } from "../components/Modal/ConfirmBuyoutInfo";
import { useRecentProducts } from "../hook/useRecentProducts";
import { useCartTotals } from "../hook/useCartTotals";

const Layout = () => {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

  // localStorage Hook set Products
  useRecentProducts();

  // Custom hook getting all totals
  const { totalPrice, totalQuantity, totalDiscount } = useCartTotals();

  return (
    <div className=" h-screen sm:min-h-screen flex bg-[var(--leafy-light)]">
      {/* SideBar */}
      <div
        className={`transition-all duration-300 ease-in-out bg-[var(--leafy-moss)] shadow-lg ${
          isNavOpened ? "w-screen sm:w-64" : "w-0"
        } overflow-visible  z-100`}
      >
        <Sidebar isVisible={isNavOpened} onClose={() => setIsNavOpened(false)} />
      </div>

      {/* Main menu */}
      <main className="flex-1 bg-[var(--leafy-bg)] md:pt-[100px] lg:pt-[80px] overflow-auto px-2 sm:px-0">
        <Header setIsNavOpend={setIsNavOpened} isNavOpened={isNavOpened} setIsCartOpen={setIsCartOpen} quantity={totalQuantity} />
        <Outlet />
      </main>

      {/* Modals */}
      {/* Cart drawer */}
      <div className="transition-all duration-300 ease-in-out bg-[var(--leafy-moss)] shadow-lg overflow-y-auto">
        <CartDrawer
          isCartVisible={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          setCheckoutModalOpen={setCheckoutModalOpen}
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
        />
      </div>
      {/* Cart confirm modal */}
      <Modal isOpen={isCheckoutModalOpen} onClose={() => setCheckoutModalOpen(false)}>
        <ConfirmBuyoutInfo totalPrice={totalPrice} totalDiscount={totalDiscount} />
      </Modal>
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
