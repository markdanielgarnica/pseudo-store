import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "@/global/Layout";
import { AppContext } from "@/context/AppProvider";
import Product from "./Product";
import { useRouter } from "next/router";
import { ScrollContext } from "@/context/ScrollProvider";

function Main({ data }: any) {
  const {
    cart,
    selectedCategory,
    handleCategoryClick,
    scrollCategoryList,
    handleScrollCategoryList,
  } = useContext(AppContext);
  const { scrollPosition } = useContext(ScrollContext);
  const theme = useTheme();
  const match = useMediaQuery("(max-width: 385px");
  const match2 = useMediaQuery("(max-width: 825px");
  const divs = useRef<any>([]);
  const ContainerCategoryListRef = useRef<any>(null);
  const primary = theme.palette.primary.main;
  const hover = theme.palette.action.hover;
  const products = data;
  const categories: any[] = [
    "All",
    ...new Set(products.map((el: any) => el.category)),
  ];
  const [searchTerm, setSearchTerm] = useState<any>("");
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

  function handleSearch(e: any) {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    if (scrollPosition === 0) return;
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);
  useEffect(() => {
    if (!match2) return;
    const activeDiv = divs.current[selectedCategory];
    const rect = activeDiv?.getBoundingClientRect();
    const containerRect = activeDiv.parentNode.getBoundingClientRect();

    if (rect.left < containerRect.left || rect.right > containerRect.right) {
      const value =
        activeDiv.offsetLeft -
        (containerRect.width - activeDiv.offsetWidth) / 2;
      activeDiv.parentNode.scrollLeft = value;
      handleScrollCategoryList(value);
    }
  }, [selectedCategory]);
  useEffect(() => {
    if (ContainerCategoryListRef.current === null) return;
    ContainerCategoryListRef.current.scrollLeft = scrollCategoryList;
  }, [match2, handleScrollCategoryList, scrollCategoryList]);
  // const handleClick = (index) => {
  //   setActiveIndex(index);
  // };
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
            width: match ? "100%" : 300,
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
            pb={2}
            overflow={"auto"}
          >
            {categories.map((categoryName: string, idx) => {
              const capitalizedName =
                categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
              const isSelected = selectedCategory === categoryName;
              return (
                <Box
                  key={idx}
                  ref={(el) => (divs.current[categoryName] = el)}
                  py={1}
                  fontSize={".9rem"}
                  fontWeight={"light"}
                  onClick={() => {
                    handleCategoryClick(categoryName);
                  }}
                  minWidth={"120px"}
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
