import React, { createContext, useEffect, useState } from "react";
interface AppContextValue {
  cart: any[];
  handleAddToCart: React.Dispatch<React.SetStateAction<any>>;
  handleRemoveFromCart: React.Dispatch<React.SetStateAction<any>>;
  selectedCategory: string;
  handleCategoryClick: React.Dispatch<React.SetStateAction<any>>;
}

export const AppContext = createContext<AppContextValue>({
  cart: [],
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
  selectedCategory: "All",
  handleCategoryClick: () => {},
});

function AppProvider({
  children,
  serialized = JSON.stringify,
  JsonParser = JSON.parse,
}: any) {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JsonParser(storedCart));
    }
  }, []);
  function handleAddToCart({
    prodId,
    prodImg,
    prodTitle,
    prodDesc,
    prodPrice,
    quantity = 1,
  }: any) {
    if (
      cart.findIndex((cartContent: any) => cartContent.prodId === prodId) === -1
    ) {
      setCart((prev) => {
        const updatedCart = [
          ...prev,
          {
            prodId,
            prodImg,
            prodTitle,
            prodDesc,
            prodPrice,
            quantity,
          },
        ];

        try {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        } catch (err) {
          console.error("Unable to save cart to localStorage:", err);
        }
        return updatedCart;
      });
    }
  }

  function handleRemoveFromCart(productId: any) {
    const updatedCart = cart.filter(
      (prodCart) => prodCart.prodId !== productId
    );
    setCart(updatedCart);
    localStorage.setItem("cart", serialized(updatedCart));
  }

  function handleCategoryClick(name: any) {
    if (selectedCategory === name) {
      setSelectedCategory("All");
    } else {
      setSelectedCategory(name);
    }
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        selectedCategory,
        handleCategoryClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
