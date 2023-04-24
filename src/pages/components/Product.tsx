import {
  Box,
  Button,
  Rating,
  Typography,
  colors,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AppContext } from "@/context/AppProvider";
import { formatNumber } from "../../utils/formatNumber";
import { ScrollContext } from "@/context/ScrollProvider";
function Product({ product, isAddedToCart, handleNavigationClick }: any) {
  const { handleAddToCart, handleRemoveFromCart } = useContext(AppContext);
  const { handleSetScrollPosition } = useContext(ScrollContext);
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const hover = theme.palette.action.hover;
  const roundedRating = Math.round(product.rating.rate);

  return (
    <Link
      href={`/product/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
      onClick={() => handleSetScrollPosition(window.scrollY)}
    >
      <Box
        position={"relative"}
        height={"max-content"}
        width={"12.5rem"}
        key={product.id}
        bgcolor={"#ffffff"}
        borderRadius={".5rem"}
        paddingTop={".5rem"}
        sx={{
          "&:hover": {
            transition: "box-shadow .2s ease-in-out",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          },
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <Box width={"100%"} position={"relative"} height={"200px"}>
          <Image
            src={product.image}
            alt={product.description}
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
        <Box px={2}>
          <Typography
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              fontWeight: "bold",
            }}
          >
            {product.title}
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Rating name="Rate" value={roundedRating} readOnly size="small" />
            <Box fontWeight={"light"} fontSize={".7rem"}>
              {roundedRating}
            </Box>
          </Box>
          <Typography>${formatNumber(product.price)}</Typography>
        </Box>
        {isAddedToCart ? (
          <Button
            variant="text"
            sx={{
              borderRadius: 0,

              fontWeight: "bold",
            }}
            startIcon={<AddShoppingCartIcon />}
            disableElevation
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart({
                prodId: product.id,
                prodTitle: product.title,
                prodPrice: product.price,
                prodImg: product.image,
                prodDesc: product.description,
              });
            }}
            fullWidth
          >
            <Typography variant="h6">Add to cart</Typography>
          </Button>
        ) : (
          <Button
            fullWidth
            variant="text"
            sx={{
              // bgcolor: colors.blueGrey[600],
              // color: "#ffff",
              // bgcolor: "primary",
              borderRadius: 0,
              bgcolor: primaryMain,
              color: "#fff",
              "&:hover": {
                bgcolor: hover,
              },
            }}
            disableElevation
            onClick={(e) => {
              e.preventDefault();
              handleRemoveFromCart(product.id);
            }}
          >
            <Typography variant="h6">Remove from cart</Typography>
          </Button>
        )}
      </Box>
    </Link>
  );
}

export default Product;
