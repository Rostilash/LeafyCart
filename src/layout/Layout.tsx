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
import { useRecentProducts } from "../hook/useRecentProducts";

const Layout = () => {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

  // localStorage Hook set Products
  useRecentProducts();

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      // item.discountPercentage !== undefined
      //   ? acc + item.price * (1 - item.discountPercentage / 100) * item.quantity
      acc + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalDiscount = cartItems.reduce((acc, item) => {
    if (item.discountPercentage) {
      const discountPerItem = item.price * (item.discountPercentage / 100);
      return acc + discountPerItem * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <div className="min-h-screen flex bg-[var(--leafy-light)]">
      <div
        className={`transition-all duration-300 ease-in-out bg-[var(--leafy-moss)] shadow-lg ${isNavOpened ? "w-64" : "w-0"} overflow-visible z-10`}
      >
        <Sidebar isVisible={isNavOpened} />
      </div>

      <main className="flex-1 bg-[var(--leafy-white)] overflow-auto" onMouseEnter={() => setIsNavOpened(false)}>
        <Header setIsNavOpend={setIsNavOpened} isNavOpened={isNavOpened} setIsCartOpen={setIsCartOpen} quantity={totalQuantity} />
        <Outlet />
      </main>

      {/* Cart drawer */}
      {/* {cartItems.length >= 1 && ( */}
      <div className="transition-all duration-300 ease-in-out bg-[var(--leafy-moss)] shadow-lg overflow-y-auto">
        <CartDrawer
          isCartVisible={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          setCheckoutModalOpen={setCheckoutModalOpen}
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
        />
      </div>
      {/* )} */}

      {/* Cart confirm modal */}
      <Modal isOpen={isCheckoutModalOpen} onClose={() => setCheckoutModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Підтвердження замовлення</h2>
        <p>Ви хочете оформити замовлення на {totalQuantity} товар(ів)?</p>
        <ConfirmBuyoutInfo totalPrice={totalPrice} totalDiscount={totalDiscount} />
      </Modal>
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
