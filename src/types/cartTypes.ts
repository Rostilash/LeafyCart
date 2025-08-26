export type UpdateAction = "increment" | "decrement";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  discountPercentage?: number;
  img: string;
  quantity: number;
};

export type CartDrawerProps = {
  isCartVisible: boolean;
  setCheckoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  totalPrice: number;
  totalDiscount: number;
};
