import { Box, colors } from "@mui/material";
import React from "react";

function Layout({ children }: any) {
  return (
    <Box height={"100%"} px={5} py={4} minHeight={"100vh"}>
      {children}
    </Box>
  );
}

export default Layout;
