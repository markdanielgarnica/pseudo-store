import Layout from "@/components/Layout";
import Header from "@/components/Header";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Button,
  Modal,
  Paper,
  Rating,
  colors,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { MouseEvent, useContext, useState } from "react";
import { AppContext } from "@/context/AppProvider";
import { formatNumber } from "@/utils/formatNumber";

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
  const primaryMain = theme.palette.primary.main;
  const isAddedToCart =
    cart.findIndex((cartContent: any) => cartContent.prodId === id) === -1;

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const roundedRating = Math.round(rating.rate);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Layout>
        <Box p={2} bgcolor={"#ffff"} borderRadius={"1rem"}>
          <Link href="/">
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              sx={{
                color: "#000",
              }}
            >
              Go back
            </Button>
          </Link>
          <Box display="flex" flexDirection={"row"} gap={2}>
            <Box flex={1} position={"relative"} height={"450px"}>
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
                <h2>{title}</h2>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Rating
                    name="Rate"
                    value={roundedRating}
                    readOnly
                    size="medium"
                  />
                  <Box fontWeight={"light"} fontSize={".8rem"}>
                    {roundedRating}
                  </Box>
                </Box>

                <h1 style={{ color: colors.blueGrey[900] }}>
                  ${formatNumber(price)}
                </h1>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                  Quantity
                  <Box display={"flex"} flexDirection={"row"}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setQuantity(quantity === 1 ? quantity : quantity - 1)
                      }
                      sx={{
                        borderRadius: "1rem 0 0 1rem",
                        border: `1px solid ${colors.blueGrey[600]}`,
                      }}
                    >
                      -
                    </Button>

                    <input
                      min={1}
                      type="number"
                      value={quantity}
                      onChange={(e: any) => {
                        if (e.target.value === "") return setQuantity(1);
                        setQuantity(parseInt(e.target.value));
                      }}
                      style={{
                        borderLeft: 0,
                        borderRight: 0,
                        borderTop: `1px solid ${colors.blueGrey[600]}`,
                        borderBottom: `1px solid ${colors.blueGrey[600]}`,
                        outlineColor: colors.blueGrey[600],
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        width: "100px",
                        textAlign: "center",
                      }}
                    />
                    <Button
                      variant="outlined"
                      sx={{
                        border: `1px solid ${colors.blueGrey[600]}`,
                        borderRadius: "0 1rem 1rem 0",
                      }}
                      onClick={() => setQuantity(parseInt(quantity) + 1)}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box display={"flex"} flexDirection={"row"} gap={1}>
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
                      borderRadius: 0,
                      fontWeight: "bold",
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
                      bgcolor: "background.paper",
                      border: "none",
                      boxShadow: 2,
                      p: 4,
                    }}
                  >
                    Total: {price * quantity}
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
