import { HighQuality } from "@mui/icons-material";
import { Box, Button, Typography, colors } from "@mui/material";

import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { formatNumber } from "@/utils/formatNumber";
import { AppContext } from "@/context/AppProvider";
function ShoppingCartProduct({ product, handleProdSubTotal }: any) {
  const { handleRemoveFromCart } = useContext(AppContext);
  const { prodId, prodImg, prodTitle, prodDesc, prodPrice } = product;
  const [quantityState, setQuantityState] = useState<number>(1);

  const subTotal = prodPrice * quantityState;

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      gap={1}
      key={prodId}
      boxShadow={"inherit"}
      p={1}
      sx={{
        bgcolor: "#fff",
      }}
      borderRadius={2}
    >
      <Box flex={"25%"} position={"relative"} height={"auto"}>
        <Image
          src={prodImg}
          alt={prodDesc}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box
        flex={"65%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        gap={3}
      >
        <Box>
          <Typography fontSize={".9rem"}>{prodTitle}</Typography>
          <Typography>${formatNumber(prodPrice)}</Typography>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography>Qty</Typography>
            <Box display={"flex"} flexDirection={"row"} gap={1}>
              <Button
                disableElevation
                variant="contained"
                onClick={() => {
                  if (quantityState === 1) {
                    setQuantityState(quantityState);
                    return;
                  }
                  const quantity = quantityState - 1;
                  setQuantityState(quantity);
                  handleProdSubTotal({ prodId, quantity });
                }}
                sx={{
                  minWidth: "2rem",
                  height: "1.5rem",
                }}
              >
                -
              </Button>

              <input
                min={1}
                type="number"
                value={quantityState}
                onChange={(e: any) => {
                  const inputValue = e.target.value;
                  const parsedValue = parseInt(inputValue);
                  if (inputValue === "") {
                    setQuantityState(1);
                    handleProdSubTotal({
                      prodId,
                      quantity: 1,
                    });
                  } else if (parsedValue < 1) {
                    const convertToPositive = Math.abs(parseInt(inputValue));
                    setQuantityState(convertToPositive);
                    handleProdSubTotal({
                      prodId,
                      quantity: convertToPositive,
                    });
                  } else {
                    setQuantityState(parsedValue);
                    handleProdSubTotal({
                      prodId,
                      quantity: parsedValue,
                    });
                  }
                }}
                style={{
                  border: 0,
                  outlineColor: colors.blueGrey[600],
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  width: 50,
                  height: "1.5rem",
                  textAlign: "center",
                }}
              />
              <Button
                disableElevation
                variant="contained"
                sx={{
                  minWidth: "2rem",
                  height: "1.5rem",
                }}
                onClick={() => {
                  const quantity = quantityState + 1;
                  setQuantityState(quantity);
                  handleProdSubTotal({
                    prodId,
                    quantity,
                  });
                }}
              >
                +
              </Button>
            </Box>
          </Box>
        </Box>
        <Typography fontWeight={"bold"} fontSize={15}>
          Sub total: ${formatNumber(subTotal)}
        </Typography>
      </Box>
      <Box flex={"10%"}>
        <Button
          sx={{
            minWidth: 4,
          }}
        >
          <CloseIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={() => handleRemoveFromCart(prodId)}
          />
        </Button>
      </Box>
    </Box>
  );
}

export default ShoppingCartProduct;
