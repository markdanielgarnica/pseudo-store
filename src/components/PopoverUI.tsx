import { Box, Button, Popover, colors } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ShoppingCartProduct from "./ShoppingCartProduct";
import { AppContext } from "@/context/AppProvider";
import { formatNumber } from "@/utils/formatNumber";

function PopoverUI({ id, openPopover, anchorEl, handlePopoverClose }: any) {
  const { cart } = useContext(AppContext);
  const [overallTotal, setOverallTotal] = useState(0);

  useEffect(() => {
    if (openPopover) {
      setOverallTotal(
        cart.reduce((acc: any, curr: any) => {
          console.log(acc, curr.prodPrice, acc + curr.prodPrice, "awehe");
          return acc + curr.prodPrice;
        }, 0)
      );
    } else {
      setOverallTotal(0);
    }
  }, [openPopover]);

  function handleDecreaseQuantity(id: any) {
    // const cartCopy = [...cart];
    // const index = cart.findIndex((prod: any) => prod.prodId === id);
    // const shoppingCartProduct = cartCopy[index];
    // const updatedQuantity =
    //   shoppingCartProduct.quantity === 1
    //     ? shoppingCartProduct.quantity
    //     : shoppingCartProduct.quantity - 1;
    // const updatedCart = { ...shoppingCartProduct, quantity: updatedQuantity };
    // cartCopy[index] = updatedCart;
    // handleUpdateCartData(cartCopy);
  }
  function handleIncreaseQuantity(id: any) {
    // const cartCopy = [...cart];
    // const index = cart.findIndex((prod: any) => prod.prodId === id);
    // const shoppingCartProduct = cartCopy[index];
    // const updatedQuantity = shoppingCartProduct.quantity + 1;
    // const updatedCart = { ...shoppingCartProduct, quantity: updatedQuantity };
    // cartCopy[index] = updatedCart;
    // handleUpdateCartData(cartCopy);
  }
  function handleOverallTotal(total: any) {
    setOverallTotal(total);
  }

  return (
    <Popover
      id={id}
      open={openPopover}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box px={2} py={1} maxWidth={500}>
        <h3 style={{ color: colors.blueGrey[900] }}>Shopping Cart</h3>
        {cart.length ? (
          <>
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              {cart.map((prod: any) => {
                return (
                  <ShoppingCartProduct
                    key={prod.prodId}
                    product={prod}
                    handleDecreaseQuantity={handleDecreaseQuantity}
                    handleIncreaseQuantity={handleIncreaseQuantity}
                    handleOverallTotal={handleOverallTotal}
                    setOverallTotal={setOverallTotal}
                  />
                );
              })}
            </Box>
            <Box
              px={1}
              py={2}
              bgcolor={colors.grey[200]}
              borderRadius={2}
              marginBottom={1}
            >
              <h3>Total: ${formatNumber(overallTotal)}</h3>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: colors.blueGrey[600],
                "&:hover": {
                  bgcolor: colors.blueGrey[900],
                },
              }}
            >
              Checkout
            </Button>
          </>
        ) : (
          "Your cart is empty"
        )}
      </Box>
    </Popover>
  );
}

export default PopoverUI;
