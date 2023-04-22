import { Box, Typography, colors } from "@mui/material";
import React from "react";

function TotalDetailPane({ overallTotal }: any) {
  return (
    <Box
      borderRadius={2}
      sx={{ bgcolor: "#fff" }}
      p={1}
      display={"flex"}
      flexDirection={"row"}
    >
      <Typography flex={1} fontWeight={"bold"}>
        Overall Total:
      </Typography>

      <Typography fontWeight={"bold"}>{overallTotal}</Typography>
    </Box>
  );
}

export default TotalDetailPane;
