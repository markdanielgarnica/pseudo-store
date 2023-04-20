import { HighQuality } from "@mui/icons-material";
import { Box, Button, colors } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/utils/formatNumber";
function ShoppingCartProduct({ product, handleProdSubTotal }: any) {
  const { prodId, prodImg, prodTitle, prodDesc, prodPrice } = product;
  const [quantityState, setQuantityState] = useState(1);
  const subTotal = prodPrice * quantityState;
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      gap={1}
      key={prodId}
      boxShadow={"inherit"}
      p={1}
    >
      <Box flex={"20%"} position={"relative"} height={"auto"}>
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
        flex={"80%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        gap={3}
      >
        <Box>
          <p>{prodTitle}</p>
          <p>${formatNumber(prodPrice)}</p>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <p style={{ height: "1.2rem" }}>Quantity</p>
            <Box display={"flex"} flexDirection={"row"}>
              <Button
                variant="outlined"
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
                  borderRadius: "1rem 0 0 1rem",
                  border: `1px solid ${colors.blueGrey[600]}`,
                  height: "1.2rem",
                  width: "10px",
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
                  borderLeft: 0,
                  borderRight: 0,
                  borderTop: `1px solid ${colors.blueGrey[600]}`,
                  borderBottom: `1px solid ${colors.blueGrey[600]}`,
                  outlineColor: colors.blueGrey[600],
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  width: "90px",
                  height: "1.2rem",
                  textAlign: "center",
                }}
              />
              <Button
                variant="outlined"
                sx={{
                  border: `1px solid ${colors.blueGrey[600]}`,
                  borderRadius: "0 1rem 1rem 0",
                  height: "1.2rem",
                  width: "10px",
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

        <h3 style={{ color: colors.blueGrey[900] }}>
          Sub total: ${formatNumber(subTotal)}
        </h3>
      </Box>
    </Box>
  );
}

export default ShoppingCartProduct;
