export const useConvertMoney = (price: number) => {
  return (price / 100).toFixed(2);
};
