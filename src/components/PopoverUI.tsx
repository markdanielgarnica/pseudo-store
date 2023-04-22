import {
  Box,
  Button,
  Popover,
  Typography,
  colors,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import ShoppingCartProduct from "./ShoppingCartProduct";
import { AppContext } from "@/context/AppProvider";
import { formatNumber } from "@/utils/formatNumber";
import TotalDetailPane from "./TotalDetailPane";

function PopoverUI({ id, openPopover, anchorEl, handlePopoverClose }: any) {
  const { cart } = useContext(AppContext);
  const theme = useTheme();
  const backgroundDefault = theme.palette.background.default;
  const [prodSubTotal, setProdSubTotal] = useState<any[]>([]);

  const overallTotal = prodSubTotal.reduce(
    (acc: any, curr: any) => acc + curr.subTotal,
    0
  );
  const formatOverallTotal = `$${formatNumber(overallTotal)}`;
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
      <Box
        px={2}
        py={1}
        maxWidth={400}
        sx={{
          bgcolor: backgroundDefault,
        }}
      >
        <Typography variant="h4" fontWeight={"bold"} marginBottom={1}>
          Shopping Cart
        </Typography>
        {cart.length ? (
          <>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={1}
              marginBottom={1}
            >
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
            <TotalDetailPane overallTotal={formatOverallTotal} />
            <Button
              fullWidth
              variant="contained"
              sx={{
                marginTop: 1,
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
