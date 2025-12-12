export type HeaderProps = {
  isNavOpened: boolean;
  quantity?: number;
  setIsNavOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
