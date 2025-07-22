import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { CartDrawer } from "../components/CartDrawer";
import type { CartItem } from "../types/cartTypes";

type UpdateAction = "increment" | "decrement";

const Layout = () => {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Vegan Pizza",
      price: 1299,
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
      quantity: 1,
    },
    {
      id: 7,
      name: "Mixed Vegetables",
      price: 1299,
      img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
      quantity: 2,
    },
  ]);

  const handleUpdateQuantity = (id: number, action: UpdateAction) => {
    setCartItems((prev: CartItem[]) =>
      prev
        .map((item): CartItem | null => {
          if (item.id !== id) return item;

          const newQuantity = action === "increment" ? item.quantity + 1 : item.quantity - 1;

          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

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

      <div className={`transition-all duration-300 ease-in-out bg-[var(--leafy-moss)] shadow-lg ${isCartOpen ? "w-100" : "w-0"} overflow-hidden`}>
        <CartDrawer isCartVisible={isCartOpen} cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onClose={() => setIsCartOpen(false)} />
      </div>
    </div>
  );
};

export default Layout;
