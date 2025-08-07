export const convertMoney = (price: number) => {
  return (price / 100).toFixed(2);
};

export const matchPrice = (price: number, quantity: number): string => {
  return ((price / 100) * quantity).toFixed(2);
};
