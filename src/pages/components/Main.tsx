import {
  Box,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Paper,
  Rating,
  Stack,
  Typography,
  colors,
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { AppContext } from "@/context/AppProvider";
import Product from "./Product";

function Main({ data }: any) {
  const { cart } = useContext(AppContext);
  const [products, setProducts] = useState(() =>
    data.map((prod: any) => ({ ...prod, isAddedToCart: false }))
  );

  const categories = [
    "All",
    ...new Set(products.map((el: any) => el.category)),
  ];
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scrollPosition, setScrollPosition] = useState(0);

  const filteredProducts = filterProducts(products);
  useEffect(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    const previousScrollPosition = sessionStorage.getItem("scrollPosition");
    if (previousScrollPosition !== null) {
      window.scrollTo(0, parseInt(previousScrollPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

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

    localStorage.setItem("category", name);
  }
  function handleSearch(e: any) {
    setSearchTerm(e.target.value);
  }
  function handleNavigationClick() {
    sessionStorage.setItem("scrollPosition", window.scrollY);
  }

  return (
    <Layout>
      <Box width={"100%"} maxWidth={"1280px"} marginX={"auto"}>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search product name"
          style={{
            padding: ".5rem 1rem",
            borderRadius: "5px",
            marginBottom: "1rem",
            fontSize: "1rem",
            border: "1px solid gray",
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
                  width={"150px"}
                  textAlign={"center"}
                  sx={{
                    backgroundColor: `${
                      isSelected ? colors.blueGrey[600] : "white"
                    }`,
                    fontWeight: `${isSelected ? "bold" : "normal"}`,
                    borderRadius: ".5rem",
                    cursor: "pointer",
                    userSelect: "none",
                    color: `${isSelected ? "white" : "black"}`,
                  }}
                >
                  {capitalizedName}
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
