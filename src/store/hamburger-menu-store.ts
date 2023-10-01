import { create } from "zustand";

type HamburgerMenuType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (state: boolean) => void;
};

const useHamburgerMenuStore = create<HamburgerMenuType>((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (state) => set(() => ({ isMenuOpen: state })),
}));

export default useHamburgerMenuStore;
