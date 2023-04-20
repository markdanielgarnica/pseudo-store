import { Box, Button, Popover, colors } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import ShoppingCartProduct from "./ShoppingCartProduct";
import { AppContext } from "@/context/AppProvider";
import { formatNumber } from "@/utils/formatNumber";

function PopoverUI({ id, openPopover, anchorEl, handlePopoverClose }: any) {
  const { cart } = useContext(AppContext);
  const [prodSubTotal, setProdSubTotal] = useState<any[]>([]);

  const overallTotal = prodSubTotal.reduce(
    (acc: any, curr: any) => acc + curr.subTotal,
    0
  );

  useEffect(() => {
    if (openPopover) {
      setProdSubTotal(
        cart.map(({ prodId, prodPrice, quantity }: any) => {
          return { prodId, prodPrice, subTotal: prodPrice * quantity };
        })
      );
    }
  }, [openPopover]);

  function handleProdSubTotal({ prodId, quantity }: any) {
    const prodSubTotalCopy = [...prodSubTotal];
    const index = prodSubTotalCopy.findIndex((prod) => prod.prodId === prodId);
    const singleProdSubTotal = prodSubTotalCopy[index];
    const newSubTotal = singleProdSubTotal.prodPrice * quantity;
    const updatedSingleProdSubtotal = {
      ...singleProdSubTotal,
      subTotal: newSubTotal,
    };
    prodSubTotalCopy[index] = updatedSingleProdSubtotal;
    setProdSubTotal(prodSubTotalCopy);
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
                    handleProdSubTotal={handleProdSubTotal}
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
