import type { ChangeEvent } from "react";
import { Badge } from "../../pages/Catalog/Badge";
import type { CartItem } from "../../types/cartTypes";
import { matchPrice } from "../../utils/convertMoney";
import type { UpdateAction } from "./CartDrawer";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, type: UpdateAction) => void;
  onChangeQuantity: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
}

export const CartItemElement = ({ item, onUpdateQuantity, onChangeQuantity }: CartItemProps) => {
  const discountedPrice = item.price && item.discountPercentage ? item.price * (1 - item.discountPercentage / 100) : item.price;
  return (
    <article
      key={item.id}
      className="grid grid-cols-[84px_1fr_auto] items-center gap-4 border p-4 bg-[var(--leafy-white)] rounded-xl shadow-sm relative "
    >
      <img src={item.img} alt="" className="icon_images_l shadow-[2px_8px_24px_rgba(0,0,0,0.6)] rounded-xl" />
      {Number(item.discountPercentage) > 0 && <Badge position="top-0 left-0" text={`Знижка: ${item.discountPercentage}%`} />}
      <div className="flex flex-col">
        <span className="pl-4">{item.name.length > 10 ? item.name.slice(0, 10) + "..." : item.name}</span>
        <span className="pl-6"> {matchPrice(discountedPrice, item.quantity)} ₴</span>
      </div>

      <div>
        <div className="flex items-center space-x-2">
          <button onClick={() => onUpdateQuantity(item.id, "decrement")} className="px-2.5 py-1 bg-[var(--leafy-moss)] rounded text-sm  btn_hover">
            -
          </button>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => onChangeQuantity(e, item.id)}
            className="w-12 text-center border rounded"
          />
          <button
            onClick={() => onUpdateQuantity(item.id, "increment")}
            className="px-2 py-1 bg-[var(--leafy-green)] text-white rounded text-sm btn_hover"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
};
