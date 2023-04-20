import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

function AppProvider({
  children,
  serialized = JSON.stringify,
  JsonParser = JSON.parse,
}: any) {
  const [cart, setCart] = useState<any[]>([]);
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

  function handleUpdateCartData(cartData: any) {
    console.log(cartData);
    setCart(cartData);
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateCartData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
