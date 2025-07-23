import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { CartDrawer } from "../components/CartDrawer";
import { useAppSelector } from "../redux/reduxTypeHook";
import { Modal } from "../components/Modal";

const Layout = () => {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex bg-[var(--leafy-light)]">
      <div className={`transition-all duration-300 ease-in-out bg-[var(--leafy-moss)] shadow-lg ${isNavOpened ? "w-64" : "w-0"} overflow-hidden`}>
        <Sidebar isVisible={isNavOpened} />
      </div>

      <main className="flex-1 bg-[var(--leafy-white)] overflow-auto">
        <Header setIsNavOpend={setIsNavOpened} isNavOpened={isNavOpened} setIsCartOpen={setIsCartOpen} quantity={totalQuantity} />
        <Outlet />
      </main>

      {cartItems.length >= 1 && (
        <div className={`transition-all duration-300 ease-in-out bg-[var(--leafy-moss)] shadow-lg ${isCartOpen ? "w-100" : "w-0"} overflow-hidden`}>
          <CartDrawer isCartVisible={isCartOpen} onClose={() => setIsCartOpen(false)} setCheckoutModalOpen={setCheckoutModalOpen} />

          <Modal isOpen={isCheckoutModalOpen} onClose={() => setCheckoutModalOpen(false)}>
            <h2 className="text-xl font-semibold mb-4">Підтвердження замовлення</h2>
            <p>Ви хочете оформити замовлення на {totalQuantity} товар(ів)?</p>
            <button className="btn-primary btn_hover  mt-4">Так, замовити</button>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Layout;
