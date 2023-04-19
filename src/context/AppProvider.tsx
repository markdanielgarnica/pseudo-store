import React, { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }: any) {
  const [cart, setCart] = useState<any[]>([]);
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
      setCart((prev) => [
        ...prev,
        {
          prodId,
          prodImg,
          prodTitle,
          prodDesc,
          prodPrice,
          quantity,
        },
      ]);
    }
  }

  function handleRemoveFromCart(productId: any) {
    setCart(cart.filter((prodCart) => prodCart.prodId !== productId));
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
