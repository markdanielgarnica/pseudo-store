import Layout from "@/global/Layout";
import Header from "@/global/Header";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Button,
  Modal,
  Paper,
  Rating,
  Typography,
  colors,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { MouseEvent, useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppProvider";
import { formatNumber } from "@/utils/formatNumber";
import { useRouter } from "next/router";

function Product({ singleProduct }: any) {
  const {
    id,
    title,
    image,
    description,
    price,
    rating,
    quantity: initQuantity,
  } = singleProduct;
  const { cart, handleAddToCart, handleRemoveFromCart } =
    useContext(AppContext);
  const theme = useTheme();
  const match = useMediaQuery("(max-width: 768px)");
  const primaryMain = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const isAddedToCart =
    cart.findIndex((cartContent: any) => cartContent.prodId === id) === -1;
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const formatPrice = `$${formatNumber(price)}`;
  const total = `$${formatNumber(price * quantity)}`;
  const roundedRating = Math.round(rating.rate);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Layout>
        <Box
          p={2}
          bgcolor={"#ffff"}
          borderRadius={"1rem"}
          maxWidth={"1200px"}
          marginX={"auto"}
        >
          <Link href="/">
            <Button variant="text" startIcon={<ArrowBackIcon />}>
              <Typography>Go back</Typography>
            </Button>
          </Link>
          <Box display="flex" flexDirection={match ? "column" : "row"} gap={2}>
            <Box
              flex={1}
              position={"relative"}
              width={match ? "250px" : "100%"}
              alignSelf={"center"}
              height={match ? "300px" : "450px"}
            >
              <Image
                src={image}
                alt={description}
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
              flex={1}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <Box>
                <Typography variant="h3">{title}</Typography>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Rating
                    name="Rate"
                    value={roundedRating}
                    readOnly
                    size="medium"
                  />
                  <Box fontWeight={"light"} fontSize={".8rem"}>
                    <Typography>{roundedRating}</Typography>
                  </Box>
                </Box>

                <Typography variant="h2">{formatPrice}</Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={2}
                  marginTop={2}
                  flexDirection={match ? "column" : "row"}
                >
                  <Typography variant="h5">Quantity</Typography>
                  <Box display={"flex"} flexDirection={"row"} gap={1}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        setQuantity(quantity === 1 ? quantity : quantity - 1)
                      }
                      sx={{
                        minWidth: "2rem",
                        height: "2rem",
                      }}
                      disableElevation
                    >
                      -
                    </Button>

                    <input
                      min={1}
                      type="number"
                      value={quantity}
                      onChange={(e: any) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseInt(inputValue);
                        if (inputValue === "") {
                          setQuantity(1);
                        } else if (parsedValue < 1) {
                          const convertToPositive = Math.abs(
                            parseInt(inputValue)
                          );
                          setQuantity(convertToPositive);
                        } else {
                          setQuantity(parsedValue);
                        }
                      }}
                      style={{
                        border: 0,
                        width: "100px",
                        textAlign: "center",
                      }}
                    />
                    <Button
                      variant="contained"
                      // size="small"
                      sx={{
                        minWidth: "2rem",
                        height: "2rem",
                      }}
                      disableElevation
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box
                display={"flex"}
                flexDirection={match ? "column" : "row"}
                gap={1}
                marginTop={match ? 4 : ""}
              >
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
                        prodId: id,
                        prodTitle: title,
                        prodPrice: price,
                        prodImg: image,
                        prodDesc: description,
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
                      fontWeight: "bold",
                      bgcolor: secondary,

                      "&:hover": {
                        bgcolor: secondary,
                      },
                    }}
                    disableElevation
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFromCart(id);
                    }}
                  >
                    Remove from cart
                  </Button>
                )}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: primaryMain,
                    "&:hover": {
                      bgcolor: colors.blueGrey[900],
                    },
                  }}
                  onClick={handleOpen}
                >
                  Buy
                </Button>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute" as "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      border: "none",
                      bgcolor: "#fff",
                      boxShadow: 2,
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Typography variant="h4">Order Summary</Typography>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      marginTop={1}
                    >
                      <Box>
                        <Typography fontSize={16} textAlign={"center"}>
                          {title}
                        </Typography>
                        <Box position={"relative"} height={"150px"}>
                          <Image
                            src={image}
                            alt={description}
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
                          display={"flex"}
                          flexDirection={"column"}
                          p={1}
                          color={"black"}
                          bgcolor={secondary}
                          borderRadius={2}
                          marginTop={1}
                        >
                          <Box display={"flex"} flexDirection={"row"}>
                            <Box flex={1}>
                              <Typography fontSize={15}>Price:</Typography>
                            </Box>
                            <Box>
                              <Typography fontSize={15}>
                                {formatPrice}
                              </Typography>
                            </Box>
                          </Box>
                          <Box display={"flex"} flexDirection={"row"}>
                            <Box flex={1}>
                              <Typography fontSize={15}>Quantity: </Typography>
                            </Box>
                            <Box>
                              <Typography fontSize={15}>{quantity}</Typography>
                            </Box>
                          </Box>
                          <Box display={"flex"} flexDirection={"row"}>
                            <Box flex={1}>
                              <Typography fontWeight={"bold"}>
                                Total:
                              </Typography>
                            </Box>
                            <Box>
                              <Typography fontWeight={"bold"}>
                                {total}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box marginTop={2} marginLeft={"auto"}>
                        <Button
                          variant="text"
                          sx={{ marginRight: 1 }}
                          onClick={handleClose}
                          size="small"
                        >
                          <Typography variant="h6">Cancel</Typography>
                        </Button>
                        <Button variant="contained" size="small">
                          <Typography variant="h6">Checkout</Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { productId } = context.query;
  const { data: singleProduct } = await axios.get(
    `https://fakestoreapi.com/products/${productId}`
  );

  return {
    props: {
      singleProduct,
    },
  };
}
export default Product;
