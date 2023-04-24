import { Box, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "@/global/Layout";
import { AppContext } from "@/context/AppProvider";
import Product from "./Product";
import { useRouter } from "next/router";
import { ScrollContext } from "@/context/ScrollProvider";

function Main({ data }: any) {
  const { cart } = useContext(AppContext);
  const { scrollPosition } = useContext(ScrollContext);
  const theme = useTheme();

  const primary = theme.palette.primary.main;
  const hover = theme.palette.action.hover;
  const products = data;
  const categories = [
    "All",
    ...new Set(products.map((el: any) => el.category)),
  ];
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts = filterProducts(products);

  function filterProducts(products: any) {
    if (!searchTerm && selectedCategory === "All") return products;

    return products.filter((prod: any) => {
      const title = prod.title.toLowerCase().trim();
      const term = searchTerm.toLowerCase().trim();

      if (searchTerm && selectedCategory !== "All") {
        return prod.category === selectedCategory && title.includes(term);
      } else if (searchTerm || selectedCategory === "All") {
        return title.includes(term);
      } else if (selectedCategory) {
        return prod.category === selectedCategory;
      }
    });
  }

  function handleCategoryClick(name: any) {
    if (selectedCategory === name) {
      setSelectedCategory("All");
    } else {
      setSelectedCategory(name);
    }
  }
  function handleSearch(e: any) {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    if (scrollPosition === 0) return;
    window.scrollTo(0, scrollPosition);
  }, []);
  return (
    <Layout>
      <Box width={"100%"} maxWidth={"1280px"} marginX={"auto"}>
        <Typography variant="h2" fontWeight={"bold"} marginBottom={"1rem"}>
          Products
        </Typography>
        <input
          type="text"
          placeholder="Search product name"
          style={{
            padding: ".8rem 1rem",
            borderRadius: "5px",
            marginBottom: "1rem",
            fontSize: "1rem",
            border: "1px solid gray",
            width: 300,
          }}
          value={searchTerm}
          onChange={handleSearch}
        />
        <Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={4}
            marginBottom={"1.5rem"}
            position={"relative"}
          >
            {categories.map((categoryName: any, idx) => {
              const capitalizedName =
                categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
              const isSelected = selectedCategory === categoryName;
              return (
                <Box
                  py={1}
                  fontSize={".9rem"}
                  fontWeight={"light"}
                  onClick={() => handleCategoryClick(categoryName)}
                  width={"120px"}
                  textAlign={"center"}
                  sx={{
                    backgroundColor: `${isSelected ? primary : "white"}`,
                    borderRadius: ".5rem",
                    cursor: "pointer",
                    userSelect: "none",
                    color: `${isSelected ? "white" : "black"}`,
                    "&:hover": {
                      bgcolor: hover,
                      color: "#fff",
                      transition: "background-color .2s ease-in-out",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={isSelected ? "bold" : "normal"}
                  >
                    {capitalizedName}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={2}>
            {filteredProducts.length ? (
              filteredProducts.map((product: any) => {
                return (
                  <Product
                    isAddedToCart={
                      cart.findIndex(
                        (cartContent: any) => cartContent.prodId === product.id
                      ) === -1
                    }
                    // handleNavigationClick={handleNavigationClick}
                    key={product.id}
                    product={product}
                  />
                );
              })
            ) : (
              <h3>No products to show</h3>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default Main;
