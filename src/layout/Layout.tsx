import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { CartDrawer } from "../components/CartDrawer";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypeHook";
import { Modal } from "../components/Modal";
import { setSelectedProduct } from "../redux/slices/productSlice";
import { ProductPreviewModal } from "../pages/Catalog/ProductPreviewModal";
import { ConfirmBuyoutInfo } from "../components/Modal/ConfirmBuyoutInfo";

const Layout = () => {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex bg-[var(--leafy-light)]">
      <div
        className={`transition-all duration-300 ease-in-out bg-[var(--leafy-moss)] shadow-lg ${isNavOpened ? "w-64" : "w-0"} overflow-visible z-10`}
      >
        <Sidebar isVisible={isNavOpened} />
      </div>

      <main className="flex-1 bg-[var(--leafy-white)] overflow-auto">
        <Header setIsNavOpend={setIsNavOpened} isNavOpened={isNavOpened} setIsCartOpen={setIsCartOpen} quantity={totalQuantity} />
        <Outlet />
      </main>

      {/* Cart drawer */}
      {cartItems.length >= 1 && (
        <div className={`transition-all duration-300 ease-in-out bg-[var(--leafy-moss)] shadow-lg ${isCartOpen ? "w-100" : "w-0"} overflow-hidden`}>
          <CartDrawer isCartVisible={isCartOpen} onClose={() => setIsCartOpen(false)} setCheckoutModalOpen={setCheckoutModalOpen} />

          <Modal isOpen={isCheckoutModalOpen} onClose={() => setCheckoutModalOpen(false)}>
            <h2 className="text-xl font-semibold mb-4">Підтвердження замовлення</h2>
            <p>Ви хочете оформити замовлення на {totalQuantity} товар(ів)?</p>
            <ConfirmBuyoutInfo />
          </Modal>
        </div>
      )}
      {/* Preview modal */}
      {selectedProduct && (
        <Modal isOpen={!!selectedProduct} onClose={() => dispatch(setSelectedProduct(null))}>
          <ProductPreviewModal product={selectedProduct} />
        </Modal>
      )}
    </div>
  );
};

export default Layout;
