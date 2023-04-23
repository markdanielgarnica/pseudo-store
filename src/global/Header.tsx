import { Shop } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Popover,
  Toolbar,
  Typography,
  colors,
  useTheme,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppProvider";
import ShoppingCartProduct from "./ShoppingCartProduct";
import PopoverUI from "./PopoverUI";

function Header() {
  const { cart } = useContext(AppContext);
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return (
    <Box
      borderBottom={1}
      borderColor={primary}
      sx={{
        paddingX: 5,
        paddingY: 3,
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        maxWidth={"1280px"}
        marginX={"auto"}
      >
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h4" fontWeight={"bold"}>
            PseudoShop
          </Typography>
        </Link>

        <Button
          aria-describedby={id}
          variant="text"
          onClick={handlePopoverClick}
        >
          <Badge badgeContent={cart.length} color="warning">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </Button>
        <PopoverUI
          id={id}
          anchorEl={anchorEl}
          openPopover={openPopover}
          handlePopoverClose={handlePopoverClose}
        />
      </Box>
    </Box>
  );
}

export default Header;
