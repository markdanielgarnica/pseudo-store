import { Box, Button, Rating, Typography, colors } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AppContext } from "@/context/AppProvider";
import { formatNumber } from "../../utils/formatNumber";

function Product({ product, isAddedToCart, handleNavigationClick }: any) {
  const { handleAddToCart, handleRemoveFromCart } = useContext(AppContext);
  const roundedRating = Math.round(product.rating.rate);

  return (
    <Link
      href={`/product/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
      onClick={handleNavigationClick}
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
            variant="body1"
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
          <p>Price: ${formatNumber(product.price)}</p>
        </Box>
        {isAddedToCart ? (
          <Button
            variant="text"
            sx={{
              // bgcolor: colors.blueGrey[600],
              // "&:hover": {
              //   bgcolor: colors.blueGrey[900],
              // },
              borderRadius: 0,
              color: colors.blueGrey[900],
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
            Add to cart
          </Button>
        ) : (
          <Button
            fullWidth
            variant="text"
            sx={{
              bgcolor: colors.blueGrey[600],
              "&:hover": {
                bgcolor: colors.blueGrey[900],
              },
              color: "#ffff",
              borderRadius: 0,
            }}
            disableElevation
            onClick={(e) => {
              e.preventDefault();
              handleRemoveFromCart(product.id);
            }}
          >
            Remove from cart
          </Button>
        )}
      </Box>
    </Link>
  );
}

export default Product;
